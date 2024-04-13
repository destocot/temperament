import "server-only";
import z from "zod";
import {
  ChatGoogleGenerativeAI,
  GoogleGenerativeAIEmbeddings,
} from "@langchain/google-genai";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { Document } from "@langchain/core/documents";
import { JournalRecord } from "@prisma/client";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { loadQARefineChain } from "langchain/chains";

const schema = z.object({
  temperament: z
    .string()
    .describe("the temperament of the person who wrote the record."),
  summary: z
    .string()
    .describe("quick summary of the entire record (should be one sentence)."),
  subject: z.string().describe("the subject of the journal record."),
  color: z
    .string()
    .describe(
      "a hexadecimal color code that represents the temperament of the record.",
    ),
  negative: z
    .boolean()
    .describe(
      "is the journal entry negative? (i.e. does it contain negative emotions?).",
    ),
  sentimentScore: z
    .number()
    .describe(
      "sentiment of the text and rated on a scale from -10 to 10, where -10 is extremely negative, 0 is neutral, and 10 is extremely positive.",
    ),
});

const parser = StructuredOutputParser.fromZodSchema(schema);

export const evaluate = async (content: string) => {
  const formatted_instructions = parser.getFormatInstructions();

  const prompt = new PromptTemplate({
    template: `Analyze the following journal record. Follow the instructions and format your response to match the format instructions, no matter what! \n {formatted_instructions}\n {content}`,
    inputVariables: ["content"],
    partialVariables: { formatted_instructions },
  });

  const model = new ChatGoogleGenerativeAI({
    model: "gemini-pro",
    maxOutputTokens: 2048,
    temperature: 0,
  });

  const chain = RunnableSequence.from([prompt, model, parser]);

  try {
    const res = await chain.invoke({ content });
    const parsedRes = schema.safeParse(res);
    if (parsedRes.success) {
      console.log(parsedRes.data);
      return parsedRes.data;
    }
  } catch (err) {
    console.log(err);
  }
};

// TODO: refactor with mongodb vector search
export const qa = async (
  question: string,
  records: Array<Pick<JournalRecord, "id" | "content" | "createdAt">>,
) => {
  const docs = records.map((record) => {
    return new Document({
      pageContent: record.content,
      metadata: {
        id: record.id,
        createdAt: record.createdAt,
      },
    });
  });

  const model = new ChatGoogleGenerativeAI({
    model: "gemini-pro",
    maxOutputTokens: 2048,
    temperature: 0,
  });

  const chain = loadQARefineChain(model);
  const embeddings = new GoogleGenerativeAIEmbeddings();
  const store = await MemoryVectorStore.fromDocuments(docs, embeddings);

  const relevantDocs = await store.similaritySearch(question);

  const res = await chain.invoke({
    input_documents: relevantDocs,
    question,
  });

  return res.output_text;
};

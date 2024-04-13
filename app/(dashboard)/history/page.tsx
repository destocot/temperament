import { HistoryChart } from "@/components/history-chart";
import { getUserIdFromKindeId } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function HistoryPage() {
  const { id: userId } = await getUserIdFromKindeId();

  const sentimentScores = await prisma.evaluation.findMany({
    where: {
      record: {
        userId,
      },
    },
    select: { sentimentScore: true, createdAt: true, temperament: true },
    orderBy: { createdAt: "asc" },
  });
  const totalSentimentScore = sentimentScores.reduce(
    (acc, { sentimentScore }) => acc + sentimentScore,
    0,
  );
  const avgSentimentScore = totalSentimentScore / sentimentScores.length;

  return (
    <main className="max-w-7xl grow p-5">
      <h2 className="text-3xl font-bold">History</h2>
      <p className="text-lg font-semibold">
        Average Sentiment Score: {avgSentimentScore.toFixed(2)}
      </p>
      <div className="h-[90%]">
        <HistoryChart data={sentimentScores} />
      </div>
    </main>
  );
}

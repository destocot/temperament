import { Evaluation as TEvaluation } from "@prisma/client";

type EvaluationProps = {
  evaluation: TEvaluation | null;
};

export const Evaluation = ({ evaluation }: EvaluationProps) => {
  const evaluationData = [
    { name: "Summary", value: evaluation?.summary ?? "" },
    { name: "Subject", value: evaluation?.subject ?? "" },
    { name: "Temperament", value: evaluation?.temperament ?? "" },
    { name: "Negative", value: evaluation?.negative ? "Yes" : "No" },
  ];

  if (evaluation?.color === "#000000") {
    evaluation.color = "#FFFFFF";
  }

  return (
    <section
      className="flex flex-col border text-sm md:flex-row md:text-base"
      style={{ borderColor: evaluation?.color ?? "rgba(255, 255, 255, 0.1)" }}
    >
      <div
        style={{ backgroundColor: evaluation?.color ?? "transparent" }}
        className="flex items-center justify-center p-1"
      >
        <h2 className="rounded bg-black/50 px-1 text-xl font-semibold tracking-tight md:text-2xl">
          Evaluation
        </h2>
      </div>
      <ul className="flex grow flex-col md:flex-row">
        {evaluationData.map((item) => (
          <li
            className="border-b p-1 last-of-type:border-0 md:w-1/4 md:border-b-0 md:border-r"
            key={item.name}
            style={{
              borderColor: evaluation?.color ?? "rgba(255, 255, 255, 0.1)",
            }}
          >
            <span className="text-lg font-semibold">{item.name}</span>
            <span className="line-clamp-2">{item.value}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

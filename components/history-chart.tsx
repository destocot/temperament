"use client";
import { Evaluation } from "@prisma/client";
import { LineChart } from "@tremor/react";

type HistoryChartProps = {
  data: Array<Pick<Evaluation, "sentimentScore" | "createdAt" | "temperament">>;
};

const customTooltip = (props: any) => {
  const { payload, active } = props;
  if (!active || !payload) return null;

  return (
    <div className="rounded-tremor-default border-tremor-border bg-tremor-background text-tremor-default shadow-tremor-dropdown w-56 border p-2">
      {payload.map((category: any, idx: number) => (
        <div key={idx} className="flex flex-1 space-x-2.5">
          <div
            className={`flex w-1 flex-col bg-${category.color}-500 rounded`}
          />
          <div className="space-y-1">
            <p className="text-tremor-content">
              {category.dataKey} ({category.value})
            </p>
            <p className="text-tremor-content-emphasis font-medium">
              {category.payload.createdAt.toDateString()}
            </p>
            <div className="flex items-center gap-3">
              <p className="text-tremor-content-emphasis font-medium">
                {category.payload.temperament}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const HistoryChart = ({ data }: HistoryChartProps) => {
  return (
    <LineChart
      className="h-full"
      data={data.map((item) => ({
        date: item.createdAt.toISOString().slice(5, 10),
        createdAt: item.createdAt,
        "Sentiment Score": item.sentimentScore,
        temperament: item.temperament,
      }))}
      index="date"
      categories={["Sentiment Score"]}
      colors={["orange"]}
      minValue={-10}
      maxValue={10}
      yAxisWidth={60}
      showXAxis
      showGridLines
      curveType="monotone"
      customTooltip={customTooltip}
    />
  );
};

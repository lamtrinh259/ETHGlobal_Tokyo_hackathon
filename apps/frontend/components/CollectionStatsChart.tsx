import React from "react";
import {
  Area,
  AreaChart,
  Label,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ICollectionStat } from "~/utils/interfaces";

interface CollectionStatsChartProps {
  collectionStats: ICollectionStat[];
}

const CustomTooltip: React.FC = ({ payload: payloadArr }: any) => {
  if (payloadArr && payloadArr.length > 0) {
    const { payload } = payloadArr[0];
    return (
      <div className="w-[250px] bg-slate-700 p-4 text-white outline-none">
        <p className="text-sm font-semibold">
          {new Date(payload.firstTransactionBlockTimestamp).toLocaleDateString(
            "en-US"
          )}
        </p>
        <p className="text-sm">
          {payload.averageSalePriceInUSDC.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2,
          })}
        </p>
      </div>
    );
  }
  return null;
};

const CollectionStatsChart: React.FC<CollectionStatsChartProps> = ({
  collectionStats,
}) => {
  const data = collectionStats.map(
    ({ firstTransactionBlockTimestamp, averageSalePriceInUSDC }) => ({
      firstTransactionBlockTimestamp: new Date(firstTransactionBlockTimestamp),
      averageSalePriceInUSDC,
    })
  );

  return (
    <div className="h-[500px] w-full">
      <ResponsiveContainer>
        <LineChart data={data}>
          <Tooltip content={<CustomTooltip />} />
          <YAxis
            stroke="white"
            tickFormatter={(value) =>
              new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0,
              }).format(value)
            }
            label={{}}
            tick={{ fontSize: 12 }}
            width={80}
          >
            <Label
              value="Average Sales Price"
              angle={-90}
              position="insideLeft"
              offset={10}
              fill="white"
              dy={50}
              style={{ fontSize: 12 }}
            />
          </YAxis>
          <XAxis
            dataKey="firstTransactionBlockTimestamp"
            stroke="white"
            scale="time"
            domain={["dataMin", "dataMax"]}
            tick={{ fontSize: 12 }}
            tickFormatter={(value) =>
              new Date(value).toLocaleDateString("en-US")
            }
          />
          <Line dataKey="averageSalePriceInUSDC" stroke="#64748b" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CollectionStatsChart;

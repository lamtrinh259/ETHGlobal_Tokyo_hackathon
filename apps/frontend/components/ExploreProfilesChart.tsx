import React, { useCallback } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Label,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { IItems } from "~/utils/interfaces";

interface ExploreProfilesChartProps {
  items: IItems[];
}

const CustomTooltip: React.FC = ({ payload: payloadArr }: any) => {
  if (payloadArr && payloadArr.length > 0) {
    const { payload } = payloadArr[0];
    return (
      <div className="w-[250px] bg-slate-700 p-4 text-white outline-none">
        <p className="text-sm font-semibold">{payload.totalFollowers}</p>
      </div>
    );
  }
  return null;
};

const ExploreProfilesChart: React.FC<ExploreProfilesChartProps> = ({
  items,
}) => {
  const data = items.map(({ handle, stats }) => ({
    handle,
    totalFollowers: stats["totalFollowers"],
  }));

  return (
    <div className="h-[500px] w-full">
      <ResponsiveContainer>
        <BarChart data={data}>
          <Tooltip content={<CustomTooltip />} />
          <YAxis
            stroke="white"
            tickFormatter={(value) => value}
            label={{}}
            tick={{ fontSize: 12 }}
            width={80}
          >
            <Label
              value="Total Followers"
              angle={-90}
              position="insideLeft"
              offset={10}
              fill="white"
              dy={50}
              style={{ fontSize: 12 }}
            />
          </YAxis>
          <XAxis
            dataKey="handle"
            stroke="white"
            scale="auto"
            // domain={["dataMin", "dataMax"]}

            tick={{ fontSize: 8 }}
            tickFormatter={(value) => value}
          />
          <Bar dataKey="totalFollowers" fill="#d1d5db" stroke="#64748b" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExploreProfilesChart;

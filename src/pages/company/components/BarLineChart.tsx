import React from "react";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Text,
} from "recharts";

interface DataBar {
  name: string;
  total: number;
  average: number;
}

interface BarLineChartProps {
  data: Record<string, number | null>;
  amountFormat?: boolean;
}

const mapDataBar = (data: Record<string, number | null>): DataBar[] => {
  return Object.entries(data).map(([key, value]) => ({
    name: key.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase()),
    total: value ?? 0,
    average: (value ?? 0) / 2,
  }));
};

const BarLineChart: React.FC<BarLineChartProps> = ({ data, amountFormat }) => {
  const dataPeriod = mapDataBar(data);

  return (
    <ResponsiveContainer width="100%" height="100%">
      {dataPeriod.length > 0 ? (
        <ComposedChart
          data={dataPeriod}
          margin={{
            top: 20,
            right: 60,
            bottom: 20,
            left: 0,
          }}
        >
          <CartesianGrid stroke="#E0E0E0" />
          <XAxis dataKey="name" scale="auto" fontSize={10} />
          <YAxis
            fontSize={10}
            tickFormatter={(value) =>
              amountFormat
                ? `${value.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    maximumFractionDigits: 0,
                  })}`
                : value
            }
          />
          <Tooltip />
          <Bar dataKey="total" barSize={24} fill="#1A857D" />
          <Line
            type="linear"
            dataKey="average"
            strokeWidth={5}
            stroke="#95DB56"
            dot={false}
          />
        </ComposedChart>
      ) : (
        <div className="flex justify-center items-center h-full">
          <Text
            x={0}
            y={0}
            textAnchor="middle"
            dominantBaseline="middle"
            style={{ fontSize: 20, fill: "#888" }}
          >
            No Data Available
          </Text>
        </div>
      )}
    </ResponsiveContainer>
  );
};

export default BarLineChart;

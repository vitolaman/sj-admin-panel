import { PieChart, Pie, Cell, ResponsiveContainer, Text } from "recharts";

interface PieChartComponentProps {
  success: number;
  failed: number;
  pending: number;
}

const COLORS = ["#3AC4A0", "#DD2525", "#FDBA22"];
const RADIAN = Math.PI / 180;

interface LabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: LabelProps) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const PieChartComponent: React.FC<PieChartComponentProps> = ({
  success,
  failed,
  pending,
}) => {
  const data = [
    { name: "Success", value: success },
    { name: "Failed", value: failed },
    { name: "Pending", value: pending },
  ];

  const filteredData = data.filter((entry) => entry.value ?? 0 > 0);

  return (
    <ResponsiveContainer width="100%" height={180}>
      {filteredData.length > 0 ? (
        <PieChart>
          <Pie
            data={filteredData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius="80"
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      ) : (
        <div className="flex justify-center items-center h-full">
          <Text
            x={0}
            y={0}
            textAnchor="middle"
            dominantBaseline="middle"
            style={{ fontSize: 14, fill: "#888" }}
          >
            No Data Available
          </Text>
        </div>
      )}
    </ResponsiveContainer>
  );
};

export default PieChartComponent;

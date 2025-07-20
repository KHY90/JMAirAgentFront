"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface DataItem {
  name: string;
  count: number;
}

export default function StatsChart({ data }: { data: DataItem[] }) {
  return (
    <div className="bg-white rounded shadow p-4 mb-4 h-64">
      <h2 className="text-xl font-semibold mb-3">통계</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#3182CE" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

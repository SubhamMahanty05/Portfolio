import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";

const chartColors = ["#22d3ee", "#38bdf8", "#8b5cf6", "#d946ef"];

function TooltipPanel({ active, payload, label }) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/90 px-3 py-2 text-xs text-slate-200 shadow-[0_0_20px_rgba(15,23,42,0.55)] backdrop-blur-xl">
      {label ? <div className="mb-1 text-slate-400">{label}</div> : null}
      {payload.map((item) => (
        <div key={item.name} className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
          <span>{item.name}: {item.value}</span>
        </div>
      ))}
    </div>
  );
}

function ChartsPanel({ trainingCurve, distribution, scatter, compareCurve, compareLabel }) {
  return (
    <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/45 p-4">
        <div className="mb-4">
          <div className="text-xs uppercase tracking-[0.28em] text-slate-500">Training Progress</div>
          <div className="mt-2 text-lg font-semibold text-white">
            {compareCurve ? "Model Progress Comparison" : "Accuracy vs Loss"}
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trainingCurve}>
              <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
              <XAxis dataKey="epoch" tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="right" orientation="right" tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip content={<TooltipPanel />} />
              <Legend wrapperStyle={{ color: "#cbd5e1", fontSize: 12 }} />
              <Line yAxisId="left" type="monotone" dataKey="accuracy" stroke="#22d3ee" strokeWidth={3} dot={{ r: 3 }} activeDot={{ r: 5 }} />
              {compareCurve ? (
                <Line
                  yAxisId="left"
                  type="monotone"
                  data={compareCurve}
                  dataKey="accuracy"
                  name={compareLabel || "Compare Accuracy"}
                  stroke="#38bdf8"
                  strokeWidth={2.4}
                  strokeDasharray="6 4"
                  dot={false}
                />
              ) : null}
              <Line yAxisId="right" type="monotone" dataKey="loss" stroke="#a855f7" strokeWidth={3} dot={{ r: 3 }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid gap-4">
        <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/45 p-4">
          <div className="mb-4">
            <div className="text-xs uppercase tracking-[0.28em] text-slate-500">Data Distribution</div>
            <div className="mt-2 text-lg font-semibold text-white">Class Breakdown</div>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={distribution} dataKey="value" nameKey="name" innerRadius={48} outerRadius={76} paddingAngle={4}>
                  {distribution.map((entry, index) => (
                    <Cell key={entry.name} fill={chartColors[index % chartColors.length]} />
                  ))}
                </Pie>
                <Tooltip content={<TooltipPanel />} />
                <Legend wrapperStyle={{ color: "#cbd5e1", fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/45 p-4">
          <div className="mb-4">
            <div className="text-xs uppercase tracking-[0.28em] text-slate-500">Prediction Space</div>
            <div className="mt-2 text-lg font-semibold text-white">Scatter Mapping</div>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" />
                <XAxis dataKey="x" type="number" tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis dataKey="y" type="number" tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
                <ZAxis dataKey="z" type="number" range={[60, 220]} />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} content={<TooltipPanel />} />
                <Scatter data={scatter} fill="#22d3ee" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChartsPanel;

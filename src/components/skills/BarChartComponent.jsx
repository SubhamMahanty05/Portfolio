import { motion } from "framer-motion";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const colors = ["#22d3ee", "#38bdf8", "#8b5cf6", "#6366f1", "#d946ef", "#f59e0b"];

function TooltipPanel({ active, payload }) {
  if (!active || !payload?.length) {
    return null;
  }

  const skill = payload[0].payload;
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/90 px-3 py-3 text-xs text-slate-200 shadow-[0_0_20px_rgba(15,23,42,0.55)] backdrop-blur-xl">
      <div className="text-sm font-semibold text-white">{skill.name}</div>
      <div className="mt-1 text-slate-400">{skill.summary}</div>
      <div className="mt-2">Experience: {skill.experience}</div>
      <div>Projects: {skill.projects}</div>
      <div>Confidence: {skill.confidence}</div>
    </div>
  );
}

function BarChartComponent({ data, onSelectSkill }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -18 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55 }}
      className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 shadow-[0_0_34px_rgba(15,23,42,0.4)] backdrop-blur-2xl"
    >
      <div className="mb-4">
        <div className="text-xs uppercase tracking-[0.35em] text-cyan-200/75">Skill Distribution</div>
        <div className="mt-2 text-2xl font-semibold text-white">Proficiency Signals</div>
      </div>

      <div className="h-[22rem]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ left: 10, right: 12 }}
            onMouseMove={(state) => {
              const skillName = state?.activePayload?.[0]?.payload?.name;
              if (skillName) {
                onSelectSkill(skillName);
              }
            }}
          >
            <CartesianGrid stroke="rgba(255,255,255,0.08)" horizontal={false} />
            <XAxis type="number" domain={[0, 100]} tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis dataKey="name" type="category" tick={{ fill: "#cbd5e1", fontSize: 12 }} axisLine={false} tickLine={false} width={110} />
            <Tooltip content={<TooltipPanel />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
            <Bar dataKey="level" radius={[0, 12, 12, 0]}>
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

export default BarChartComponent;

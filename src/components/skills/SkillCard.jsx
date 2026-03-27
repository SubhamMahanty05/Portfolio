import { motion } from "framer-motion";

function SkillCard({ item, onSelectSkill }) {
  const glowStrength = Math.max(0.12, item.level / 100 * 0.35);
  const trend = item.trend ?? [28, 40, 52, 64, item.level];
  const maxValue = Math.max(...trend);
  const minValue = Math.min(...trend);
  const points = trend
    .map((value, index) => {
      const x = (index / (trend.length - 1)) * 100;
      const y = 42 - ((value - minValue) / Math.max(1, maxValue - minValue)) * 28;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <motion.button
      type="button"
      data-cursor="interactive"
      onMouseEnter={() => onSelectSkill(item.name)}
      whileHover={{ y: -4 }}
      className="group rounded-[1.4rem] border border-white/10 bg-slate-950/45 p-4 text-left transition hover:border-cyan-300/20 hover:bg-cyan-300/[0.04]"
      style={{ boxShadow: `0 0 28px rgba(34,211,238,${glowStrength})` }}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="text-lg font-semibold text-white">{item.name}</div>
        <div className="text-sm text-cyan-100">{item.level}%</div>
      </div>
      <p className="mt-2 text-sm leading-6 text-slate-400">{item.detail}</p>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/6">
        <motion.div
          className="h-full rounded-full bg-[linear-gradient(90deg,#22d3ee_0%,#38bdf8_55%,#8b5cf6_100%)]"
          initial={{ width: 0 }}
          whileInView={{ width: `${item.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        />
      </div>
      <div className="mt-4 overflow-hidden rounded-xl border border-white/8 bg-slate-950/55 px-3 py-3 opacity-80 transition duration-300 group-hover:opacity-100">
        <div className="mb-2 text-[0.62rem] uppercase tracking-[0.22em] text-slate-500">Hover Signal</div>
        <svg viewBox="0 0 100 44" className="h-12 w-full">
          <polyline
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="8"
            points="0,42 100,42"
          />
          <motion.polyline
            fill="none"
            stroke="#22d3ee"
            strokeWidth="3"
            points={points}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ filter: "drop-shadow(0 0 8px rgba(34,211,238,0.45))" }}
          />
        </svg>
      </div>
      <div className="mt-4 grid gap-1 text-xs uppercase tracking-[0.22em] text-slate-500">
        <span>Experience {item.experience}</span>
        <span>Confidence {item.confidence}</span>
      </div>
    </motion.button>
  );
}

export default SkillCard;

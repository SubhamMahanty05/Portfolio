import { motion } from "framer-motion";

function CircularSkill({ skill, onSelectSkill }) {
  const circumference = 2 * Math.PI * 42;
  const offset = circumference * (1 - skill.value / 100);
  const glow = Math.max(0.16, skill.value / 100 * 0.38);

  return (
    <motion.button
      type="button"
      data-cursor="interactive"
      onMouseEnter={() => onSelectSkill(skill.name === "ML" ? "Machine Learning" : skill.name)}
      whileHover={{ y: -4, scale: 1.02 }}
      className="rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-4 text-center shadow-[0_0_28px_rgba(15,23,42,0.35)] backdrop-blur-2xl"
      style={{ boxShadow: `0 0 30px rgba(34,211,238,${glow})` }}
    >
      <div className="relative mx-auto h-24 w-24">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
          <motion.circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke={skill.color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: offset }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            style={{ filter: `drop-shadow(0 0 10px ${skill.color})` }}
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <div>
            <div className="text-lg font-semibold text-white">{skill.value}%</div>
            <div className="text-[0.65rem] uppercase tracking-[0.25em] text-slate-400">{skill.name}</div>
          </div>
        </div>
      </div>
    </motion.button>
  );
}

export default CircularSkill;

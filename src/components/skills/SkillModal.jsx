import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { X } from "lucide-react";

function MiniTrend({ trend = [], percentage }) {
  const values = trend.length ? trend : [Math.max(24, percentage - 30), Math.max(40, percentage - 16), percentage];
  const max = Math.max(...values);
  const min = Math.min(...values);
  const points = values
    .map((value, index) => {
      const x = (index / Math.max(1, values.length - 1)) * 100;
      const y = 38 - ((value - min) / Math.max(1, max - min)) * 24;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg viewBox="0 0 100 42" className="h-16 w-full">
      <polyline
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="8"
        points="0,40 100,40"
      />
      <polyline
        fill="none"
        stroke="#67e8f9"
        strokeWidth="3"
        points={points}
        style={{ filter: "drop-shadow(0 0 8px rgba(34,211,238,0.45))" }}
      />
    </svg>
  );
}

function SkillModal({ skill, onClose }) {
  useEffect(() => {
    if (!skill) {
      return undefined;
    }

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [skill, onClose]);

  return (
    <AnimatePresence>
      {skill ? (
        <motion.div
          className="fixed inset-0 z-[99990] flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 10 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            onClick={(event) => event.stopPropagation()}
            className="relative w-full max-w-md overflow-hidden rounded-[1.8rem] border border-cyan-300/24 bg-[rgba(5,12,24,0.82)] p-6 shadow-[0_0_0_1px_rgba(34,211,238,0.1),0_20px_60px_rgba(2,6,23,0.55),0_0_34px_rgba(34,211,238,0.16)] backdrop-blur-2xl"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(99,102,241,0.1),transparent_28%)]" />

            <div className="relative">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-[0.35em] text-cyan-200/75">Skill Insight</div>
                  <h3 className="mt-2 text-2xl font-semibold text-white">{skill.name}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{skill.description}</p>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:border-cyan-300/25 hover:text-cyan-100"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-[1.2rem] border border-white/10 bg-slate-950/50 px-4 py-4">
                  <div className="text-xs uppercase tracking-[0.22em] text-slate-500">Experience</div>
                  <div className="mt-2 text-lg font-semibold text-white">{skill.level}</div>
                </div>
                <div className="rounded-[1.2rem] border border-white/10 bg-slate-950/50 px-4 py-4">
                  <div className="text-xs uppercase tracking-[0.22em] text-slate-500">Projects</div>
                  <div className="mt-2 text-lg font-semibold text-white">{skill.projects}</div>
                </div>
              </div>

              <div className="mt-5 rounded-[1.2rem] border border-white/10 bg-slate-950/50 px-4 py-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="text-xs uppercase tracking-[0.22em] text-slate-500">Proficiency</div>
                  <div className="text-sm text-cyan-100">{skill.percentage}%</div>
                </div>
                <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/6">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.percentage}%` }}
                    transition={{ duration: 0.55, ease: "easeOut" }}
                    className="h-full rounded-full bg-[linear-gradient(90deg,#22d3ee_0%,#38bdf8_60%,#8b5cf6_100%)] shadow-[0_0_16px_rgba(34,211,238,0.24)]"
                  />
                </div>
                <div className="mt-4">
                  <MiniTrend trend={skill.trend} percentage={skill.percentage} />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default SkillModal;

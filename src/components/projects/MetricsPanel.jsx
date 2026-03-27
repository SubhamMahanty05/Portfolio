import { motion } from "framer-motion";
import AnimatedCounter from "./AnimatedCounter";

function MetricsPanel({ metrics, datasetSize, trainingTime, progress, trainingStatus }) {
  const items = [
    { label: "Accuracy", value: metrics.accuracy, suffix: "%", decimals: 1 },
    { label: "Precision", value: metrics.precision, suffix: "%", decimals: 1 },
    { label: "Recall", value: metrics.recall, suffix: "%", decimals: 1 },
    { label: "F1 Score", value: metrics.f1, suffix: "%", decimals: 1 },
  ];

  return (
    <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: index * 0.05 }}
            className="rounded-[1.5rem] border border-white/10 bg-slate-950/45 p-4"
          >
            <div className="text-xs uppercase tracking-[0.28em] text-slate-500">{item.label}</div>
            <div className="mt-3 text-3xl font-semibold text-white">
              <AnimatedCounter value={item.value} suffix={item.suffix} decimals={item.decimals} />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.15 }}
        className="rounded-[1.5rem] border border-white/10 bg-slate-950/45 p-4"
      >
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.28em] text-slate-500">
          <span>Training Status</span>
          <span className="text-cyan-100">{trainingStatus}</span>
        </div>

        <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/5">
          <motion.div
            className="h-full rounded-full bg-[linear-gradient(90deg,#22d3ee_0%,#38bdf8_48%,#8b5cf6_82%,#d946ef_100%)] shadow-[0_0_25px_rgba(34,211,238,0.32)]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.95, ease: "easeOut" }}
          />
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div>
            <div className="text-xs uppercase tracking-[0.28em] text-slate-500">Dataset Size</div>
            <div className="mt-2 text-lg font-semibold text-white">{datasetSize}</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.28em] text-slate-500">Training Time</div>
            <div className="mt-2 text-lg font-semibold text-white">{trainingTime}</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default MetricsPanel;

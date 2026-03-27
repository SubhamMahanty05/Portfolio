import { motion } from "framer-motion";
import { Brain, Code2, Database, Layers3, Rocket } from "lucide-react";

const iconMap = {
  code: Code2,
  database: Database,
  brain: Brain,
  layers: Layers3,
  rocket: Rocket,
};

function TimelineItem({ item, index, isActive, setRef }) {
  const Icon = iconMap[item.icon] || Brain;
  const isRight = index % 2 === 1;

  return (
    <div ref={setRef} className={`timeline-item relative flex ${isRight ? "md:justify-end" : "md:justify-start"}`}>
      <div
        className={`timeline-node absolute left-1/2 top-10 z-10 hidden h-5 w-5 -translate-x-1/2 rounded-full border md:block ${
          isActive
            ? "border-cyan-200/80 bg-cyan-300 shadow-[0_0_28px_rgba(34,211,238,0.65)]"
            : "border-cyan-300/35 bg-slate-950 shadow-[0_0_18px_rgba(34,211,238,0.28)]"
        }`}
      />

      <motion.article
        initial={{ opacity: 0, x: isRight ? 28 : -28, y: 20 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        whileHover={{ y: -2 }}
        className={`group ml-0 w-full rounded-[1.8rem] border p-5 backdrop-blur-2xl md:w-[calc(50%-2.7rem)] ${
          isActive
            ? "border-cyan-300/24 bg-[linear-gradient(145deg,rgba(255,255,255,0.09),rgba(15,23,42,0.6),rgba(34,211,238,0.09))] shadow-[0_0_50px_rgba(34,211,238,0.14)]"
            : "border-white/10 bg-white/[0.04] shadow-[0_0_32px_rgba(15,23,42,0.38)]"
        }`}
      >
        <div className={`mb-4 inline-flex rounded-2xl bg-gradient-to-br ${item.accent} p-[1px]`}>
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-950/90">
            <Icon className="h-5 w-5 text-cyan-100" />
          </div>
        </div>

        <div className="text-xs uppercase tracking-[0.28em] text-cyan-200/75">{item.stage}</div>
        <h3 className={`mt-3 text-2xl font-semibold ${isActive ? "text-cyan-50" : "text-white"}`}>{item.title}</h3>
        <p className="mt-4 text-sm leading-7 text-slate-300">{item.description}</p>
      </motion.article>
    </div>
  );
}

export default TimelineItem;

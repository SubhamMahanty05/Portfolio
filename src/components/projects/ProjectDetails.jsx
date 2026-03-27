import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, FolderGit2 } from "lucide-react";
import { playClickTone } from "../../lib/sound";

function MetricCard({ label, value }) {
  return (
    <div className="rounded-[1.2rem] border border-white/10 bg-slate-950/50 px-4 py-4">
      <div className="text-xs uppercase tracking-[0.22em] text-slate-500">{label}</div>
      <div className="mt-2 text-lg font-semibold text-white">{value}%</div>
    </div>
  );
}

function MiniAccuracyChart({ data }) {
  const points = data
    .slice(-6)
    .map((item, index, array) => {
      const x = (index / Math.max(1, array.length - 1)) * 100;
      const y = 42 - ((item.accuracy - 55) / 45) * 30;
      return `${x},${Math.max(6, Math.min(42, y))}`;
    })
    .join(" ");

  return (
    <div className="rounded-[1.4rem] border border-white/10 bg-slate-950/50 p-4">
      <div className="mb-3 flex items-center justify-between gap-4">
        <div className="text-xs uppercase tracking-[0.24em] text-cyan-200/75">Preview Signal</div>
        <div className="text-xs text-slate-400">Accuracy trend</div>
      </div>
      <svg viewBox="0 0 100 44" className="h-20 w-full">
        <polyline
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="8"
          points="0,42 100,42"
        />
        <polyline
          fill="none"
          stroke="#67e8f9"
          strokeWidth="3"
          points={points}
          style={{ filter: "drop-shadow(0 0 8px rgba(34,211,238,0.4))" }}
        />
      </svg>
    </div>
  );
}

function ProjectDetails({ project, soundEnabled }) {
  if (!project) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.article
        key={project.id}
        initial={{ opacity: 0, y: 18, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.99 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_0_34px_rgba(15,23,42,0.35)] backdrop-blur-2xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.35em] text-cyan-200/75">{project.name}</div>
            <h3 className="mt-3 text-3xl font-semibold text-white">{project.title}</h3>
          </div>
          <div className="rounded-full border border-cyan-300/16 bg-cyan-300/8 px-3 py-1 text-xs text-cyan-100">
            {project.status}
          </div>
        </div>

        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">{project.description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.slice(0, 5).map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/10 bg-slate-950/55 px-3 py-2 text-xs text-slate-200"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          <MetricCard label="Accuracy" value={project.metrics.accuracy} />
          <MetricCard label="Precision" value={project.metrics.precision} />
          <MetricCard label="Recall" value={project.metrics.recall} />
        </div>

        <div className="mt-6">
          <MiniAccuracyChart data={project.trainingCurve} />
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={project.live}
            data-cursor="interactive"
            onClick={() => playClickTone(soundEnabled)}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 px-4 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_28px_rgba(34,211,238,0.22)] transition hover:scale-[1.02]"
          >
            Live Demo
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <a
            href={project.github}
            data-cursor="interactive"
            onClick={() => playClickTone(soundEnabled)}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition hover:border-cyan-300/22 hover:bg-cyan-300/8 hover:text-cyan-100"
          >
            GitHub
            <FolderGit2 className="h-4 w-4" />
          </a>
        </div>
      </motion.article>
    </AnimatePresence>
  );
}

export default ProjectDetails;

import { motion } from "framer-motion";
import { Activity, BrainCircuit, ChartColumnBig, CheckCircle2 } from "lucide-react";

const iconMap = {
  vision: BrainCircuit,
  forecast: ChartColumnBig,
  cluster: Activity,
};

function statusClasses(status) {
  if (status === "Active") return "bg-emerald-400 shadow-[0_0_18px_rgba(74,222,128,0.65)]";
  return "bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.65)]";
}

function ProjectSidebar({ projects, selectedId, onSelect }) {
  return (
    <aside className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_0_36px_rgba(15,23,42,0.45)] backdrop-blur-2xl">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.35em] text-cyan-200/75">Project Nodes</div>
          <div className="mt-2 text-xl font-semibold text-white">ML Workspace</div>
        </div>
        <div className="rounded-full border border-cyan-300/18 bg-cyan-300/8 px-3 py-1 text-xs text-cyan-100">
          {projects.length} models
        </div>
      </div>

      <div className="space-y-3">
        {projects.map((project, index) => {
          const Icon = iconMap[project.icon] || BrainCircuit;
          const selected = selectedId === project.id;

          return (
            <motion.button
              key={project.id}
              type="button"
              onClick={() => onSelect(project.id)}
              data-cursor="interactive"
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              whileHover={{ scale: 1.015, x: 3 }}
              className={`group relative w-full overflow-hidden rounded-[1.5rem] border p-4 text-left transition duration-300 ${
                selected
                  ? "border-cyan-300/28 bg-[linear-gradient(135deg,rgba(34,211,238,0.14),rgba(59,130,246,0.08),rgba(168,85,247,0.14))] shadow-[0_0_30px_rgba(34,211,238,0.16)]"
                  : "border-white/8 bg-slate-950/45 hover:border-cyan-300/16 hover:bg-cyan-300/[0.05]"
              }`}
            >
              {selected ? (
                <motion.span
                  layoutId="project-sidebar-highlight"
                  className="absolute inset-0 rounded-[1.5rem] border border-cyan-300/24"
                  transition={{ type: "spring", stiffness: 280, damping: 30 }}
                />
              ) : null}

              <div className="relative flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl border border-cyan-300/18 bg-cyan-300/10">
                    <Icon className="h-5 w-5 text-cyan-100" />
                  </div>
                  <div>
                    <div className="text-base font-semibold text-white">{project.name}</div>
                    <div className="mt-1 text-sm text-slate-400">{project.trainingStatus}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${statusClasses(project.status)}`} />
                  <span className="text-xs uppercase tracking-[0.28em] text-slate-400">{project.status}</span>
                </div>
              </div>

              <div className="relative mt-4 flex items-center justify-between text-xs text-slate-400">
                <span>{project.datasetSize}</span>
                <span className="inline-flex items-center gap-1 text-cyan-100">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {project.progress}%
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </aside>
  );
}

export default ProjectSidebar;

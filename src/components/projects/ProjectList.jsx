import { motion } from "framer-motion";

function ProjectList({ projects, selectedId, onSelect }) {
  return (
    <aside className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_0_34px_rgba(15,23,42,0.32)] backdrop-blur-2xl">
      <div className="mb-4 px-2">
        <div className="text-xs uppercase tracking-[0.35em] text-cyan-200/75">Project Index</div>
        <h3 className="mt-3 text-2xl font-semibold text-white">Selected work</h3>
      </div>

      <div className="grid gap-3">
        {projects.map((project, index) => {
          const isActive = project.id === selectedId;

          return (
            <motion.button
              key={project.id}
              type="button"
              onClick={() => onSelect(project.id)}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              whileHover={{ x: 4 }}
              className={`relative rounded-[1.5rem] border px-4 py-4 text-left transition ${
                isActive
                  ? "border-cyan-300/28 bg-[linear-gradient(135deg,rgba(34,211,238,0.14),rgba(15,23,42,0.72),rgba(59,130,246,0.08))] shadow-[0_0_28px_rgba(34,211,238,0.14)]"
                  : "border-white/10 bg-slate-950/45 hover:border-cyan-300/18 hover:bg-cyan-300/[0.05]"
              }`}
            >
              {isActive ? (
                <div className="pointer-events-none absolute inset-y-4 left-0 w-px bg-gradient-to-b from-transparent via-cyan-300 to-transparent shadow-[0_0_12px_rgba(34,211,238,0.5)]" />
              ) : null}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className={`text-sm font-semibold ${isActive ? "text-white" : "text-slate-200"}`}>
                    {project.name}
                  </div>
                  <div className="mt-1 text-xs text-slate-400">{project.title}</div>
                </div>
                <div
                  className={`rounded-full border px-2.5 py-1 text-[0.68rem] uppercase tracking-[0.16em] ${
                    isActive
                      ? "border-cyan-300/22 bg-cyan-300/10 text-cyan-100"
                      : "border-white/10 bg-white/[0.03] text-slate-400"
                  }`}
                >
                  {project.status}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </aside>
  );
}

export default ProjectList;

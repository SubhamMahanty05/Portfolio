import { motion } from "framer-motion";

function SkillTagCloud({ skills, onSelectSkill }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_0_34px_rgba(15,23,42,0.36)] backdrop-blur-2xl"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.08),transparent_24%),radial-gradient(circle_at_80%_70%,rgba(99,102,241,0.1),transparent_24%)]" />

      <div className="relative mx-auto max-w-4xl text-center">
        <div className="text-xs uppercase tracking-[0.35em] text-cyan-200/75">Skill Cloud</div>
        <h3 className="mt-3 text-2xl font-semibold text-white">Tap a skill to inspect it</h3>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-300">
          Minimal by default, detailed only when you want it.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {skills.map((skill, index) => (
            <motion.button
              key={skill.name}
              type="button"
              onClick={() => onSelectSkill(skill)}
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              animate={{ y: [0, -4 - (index % 3), 0] }}
              transition={{
                duration: 5 + (index % 4),
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="group rounded-full border border-cyan-300/16 bg-slate-950/55 px-4 py-2.5 text-sm text-slate-200 shadow-[0_0_16px_rgba(34,211,238,0.06)] transition hover:border-cyan-300/35 hover:bg-cyan-300/10 hover:text-cyan-100 hover:shadow-[0_0_24px_rgba(34,211,238,0.18)]"
            >
              {skill.name}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default SkillTagCloud;

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import { educationTimeline } from "../data/portfolio";

function Education() {
  return (
    <section id="education" className="mx-auto max-w-7xl px-5 py-24 md:px-8">
      <SectionHeading
        eyebrow="Education"
        title="Academic background."
        description="Focused on computer science, data science, and machine learning."
      />

      <div className="mx-auto grid max-w-5xl gap-6">
        {educationTimeline.map((item, index) => (
          <motion.article
            key={`${item.year}-${item.title}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="rounded-[1.8rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_0_30px_rgba(15,23,42,0.35)] backdrop-blur-2xl"
          >
            <div className="flex items-start gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10">
                <GraduationCap className="h-5 w-5 text-cyan-100" />
              </div>
              <div>
                <div className="text-s uppercase tracking-[0.28em] text-cyan-200/75">{item.year}</div>
                <h3 className="mt-2 text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-xl text-slate-400">{item.place}</p>
                <p className="mt-4 text-xl leading-7 text-slate-300">{item.description}</p>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export default Education;

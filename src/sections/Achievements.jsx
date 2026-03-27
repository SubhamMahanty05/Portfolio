import { motion } from "framer-motion";
import { Award, Rocket } from "lucide-react";
import { achievements } from "../data/portfolio";
import SectionHeading from "../components/SectionHeading";

function Achievements() {
  return (
    <section id="achievements" className="mx-auto max-w-7xl px-5 py-24 md:px-8">
      <div id="certifications" aria-hidden="true" className="scroll-mt-32" />
      <SectionHeading
        eyebrow="Experience & Achievements"
        title="A reveal-on-scroll timeline for growth, milestones, and momentum."
        description="This final storytelling arc highlights practical progress across projects, experimentation, and technical maturity."
      />

      <div className="relative mx-auto max-w-4xl">
        <div className="absolute left-[22px] top-0 h-full w-px bg-gradient-to-b from-cyan-300 via-fuchsia-300 to-transparent sm:left-1/2" />

        <div className="space-y-10">
          {achievements.map((item, index) => (
            <motion.div
              key={item.year}
              className={`relative flex ${index % 2 === 0 ? "sm:justify-start" : "sm:justify-end"}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7 }}
            >
              <div className="absolute left-3 top-8 grid h-8 w-8 place-items-center rounded-full border border-cyan-300/30 bg-slate-950 sm:left-1/2 sm:-translate-x-1/2">
                {index % 2 === 0 ? (
                  <Award className="h-4 w-4 text-cyan-300" />
                ) : (
                  <Rocket className="h-4 w-4 text-fuchsia-200" />
                )}
              </div>

              <article className="ml-14 w-full rounded-[1.8rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:ml-0 sm:w-[calc(50%-2.5rem)]">
                <div className="text-sm font-medium text-cyan-300">{item.year}</div>
                <h3 className="mt-3 text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p>
              </article>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Achievements;

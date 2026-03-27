import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import SectionHeading from "../SectionHeading";
import { categorizedSkills, skillDistributionData, skillTagCloud, skillsRadarData } from "../../data/portfolio";
import RadarChartComponent from "./RadarChartComponent";
import SkillModal from "./SkillModal";
import SkillTagCloud from "./SkillTagCloud";

function formatExperienceLevel(experience) {
  if (!experience) {
    return "Intermediate";
  }

  const normalized = experience.toLowerCase();
  if (normalized.includes("advanced") || normalized.includes("4 year")) {
    return "Advanced";
  }
  if (normalized.includes("strong") || normalized.includes("3 year")) {
    return "Intermediate";
  }
  return "Intermediate";
}

function buildSkillMap() {
  const map = new Map();

  skillDistributionData.forEach((skill) => {
    map.set(skill.name, {
      name: skill.name,
      description: skill.summary,
      level: formatExperienceLevel(skill.experience),
      projects: skill.projects,
      percentage: skill.level,
      trend: skill.trend,
    });
  });

  categorizedSkills.forEach((group) => {
    group.items.forEach((item) => {
      if (!map.has(item.name)) {
        map.set(item.name, {
          name: item.name,
          description: item.detail,
          level: formatExperienceLevel(item.experience),
          projects: item.projects.length,
          percentage: item.level,
          trend: [Math.max(20, item.level - 26), Math.max(35, item.level - 14), item.level],
        });
      }
    });
  });

  skillTagCloud.forEach((tag, index) => {
    if (!map.has(tag)) {
      map.set(tag, {
        name: tag,
        description: `${tag} used across data and ML workflows.`,
        level: "Intermediate",
        projects: 3 + (index % 5),
        percentage: 68 + (index % 4) * 5,
        trend: [42 + (index % 3) * 6, 58 + (index % 4) * 5, 68 + (index % 4) * 5],
      });
    }
  });

  return map;
}

function CoreStrengths({ skills }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_0_34px_rgba(15,23,42,0.36)] backdrop-blur-2xl"
    >
      <div>
        <div>
          <div className="text-xs uppercase tracking-[0.35em] text-cyan-200/75">Core Strengths</div>
          <h3 className="mt-3 text-2xl font-semibold text-white">Focused capabilities</h3>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {skills.map((skill, index) => (
            <motion.article
              key={skill.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              whileHover={{ y: -3, scale: 1.01 }}
              className="rounded-[1.5rem] border border-white/10 bg-slate-950/50 p-4 shadow-[0_0_18px_rgba(34,211,238,0.06)] transition hover:border-cyan-300/24 hover:shadow-[0_0_28px_rgba(34,211,238,0.12)]"
            >
              <div className="flex items-center justify-between gap-3">
                <h4 className="text-base font-semibold text-white">{skill.name}</h4>
                <span className="rounded-full border border-cyan-300/16 bg-cyan-300/8 px-3 py-1 text-xs text-cyan-100">
                  {skill.level}
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-300">{skill.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function SkillsSection() {
  const [selectedSkill, setSelectedSkill] = useState(null);

  const skillMap = useMemo(() => buildSkillMap(), []);

  const radarSkills = useMemo(
    () =>
      skillsRadarData.filter((skill) =>
        ["Python", "Machine Learning", "Data Analysis", "SQL", "Deep Learning", "NLP"].includes(skill.skill),
      ),
    [],
  );

  const cloudSkills = useMemo(
    () =>
      skillTagCloud.slice(0, 14).map((tag) => {
        const detail = skillMap.get(tag);
        return detail ?? {
          name: tag,
          description: `${tag} used in projects and experimentation.`,
          level: "Intermediate",
          projects: 4,
          percentage: 72,
          trend: [44, 58, 72],
        };
      }),
    [skillMap],
  );

  const topSkills = useMemo(
    () =>
      [...skillMap.values()]
        .sort((left, right) => right.percentage - left.percentage)
        .slice(0, 4),
    [skillMap],
  );

  return (
    <section id="skills" className="mx-auto max-w-7xl px-5 py-24 md:px-8">
      <SectionHeading
        eyebrow="Skills"
        title="Clean skill insights with detail on demand."
        description="Explore core strengths, click any tag for a quick breakdown, and keep the interface focused."
      />

      <div className="mx-auto grid max-w-6xl gap-6 md:gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
          transition={{ staggerChildren: 0.12 }}
          className="flex h-full items-center"
        >
          <div className="w-full">
            <RadarChartComponent data={radarSkills} onSelectSkill={() => {}} />
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
          transition={{ staggerChildren: 0.12, delayChildren: 0.06 }}
          className="grid gap-6"
        >
          <div>
            <SkillTagCloud skills={cloudSkills} onSelectSkill={setSelectedSkill} />
          </div>
          <div className="mt-1">
            <CoreStrengths skills={topSkills} />
          </div>
        </motion.div>
      </div>

      <SkillModal skill={selectedSkill} onClose={() => setSelectedSkill(null)} />
    </section>
  );
}

export default SkillsSection;

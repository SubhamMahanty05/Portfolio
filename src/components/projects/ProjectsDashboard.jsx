import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { projectsDashboardData } from "../../data/portfolio";
import ProjectList from "./ProjectList";
import ProjectDetails from "./ProjectDetails";

function ProjectsDashboard({ soundEnabled }) {
  const [selectedProjectId, setSelectedProjectId] = useState(projectsDashboardData[0]?.id);

  const selectedProject = useMemo(
    () => projectsDashboardData.find((project) => project.id === selectedProjectId) ?? projectsDashboardData[0],
    [selectedProjectId],
  );

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.34fr_0.66fr] lg:gap-8">
      <motion.div
        initial={{ opacity: 0, x: -18 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45 }}
      >
        <ProjectList
          projects={projectsDashboardData}
          selectedId={selectedProjectId}
          onSelect={setSelectedProjectId}
        />
      </motion.div>

      <ProjectDetails project={selectedProject} soundEnabled={soundEnabled} />
    </div>
  );
}

export default ProjectsDashboard;

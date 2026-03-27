import SectionHeading from "../components/SectionHeading";
import ProjectsDashboard from "../components/projects/ProjectsDashboard";

function Projects({ soundEnabled }) {
  return (
    <section id="projects" className="mx-auto max-w-7xl px-5 py-24 md:px-8">
      <SectionHeading
        eyebrow="Projects"
        title="Selected machine learning and data projects."
        description="A compact view of project results, metrics, and tools."
      />

      <ProjectsDashboard soundEnabled={soundEnabled} />
    </section>
  );
}

export default Projects;

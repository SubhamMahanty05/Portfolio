import SectionHeading from "../components/SectionHeading";
import CertificatesSection from "../components/certificates/CertificatesSection";

function Certifications() {
  return (
    <section id="certifications" className="mx-auto max-w-7xl px-5 py-24 md:px-8">
      <SectionHeading
        eyebrow="Certifications"
        title="Professional Certifications."
        description=""
      />

      <CertificatesSection />
    </section>
  );
}

export default Certifications;

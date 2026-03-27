import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import CertificateCard from "./CertificateCard";
import CertificateFocusView from "./CertificateFocusView";

const certificates = [
  { title: "UI/UX Design", issuer: "Design Course", date: "2023", file: "/uiUX.pdf" },
  { title: "Operating Systems", issuer: "Systems Course", date: "2026", file: "/Os.pdf" },
  { title: "Python", issuer: "IIT Program", date: "2025", file: "/PythonIIT.pdf" },
  { title: "Hackathon", issuer: "Hackathon Event", date: "2025", file: "/Hackathon.pdf" },
  { title: "C Programming", issuer: "Programming Course", date: "2024", file: "/C_Programming.pdf" },
  { title: "Data Visualisation", issuer: "Visualization Program", date: "2024", file: "/Data_Visualisation.pdf" },
  { title: "Flutter", issuer: "App Development Course", date: "2024", file: "/Flutter.pdf" },
  { title: "Certificate", issuer: "Learning Platform", date: "2023", file: "/free.pdf" },
  
];

function CertificatesSection() {
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef(null);

  useEffect(() => {
    if (!selectedCertificate) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedCertificate(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedCertificate]);

  const scrollToIndex = (index) => {
    const container = trackRef.current;
    if (!container) {
      return;
    }

    const cards = container.querySelectorAll("[data-certificate-card]");
    const target = cards[index];
    if (!target) {
      return;
    }

    target.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
    setActiveIndex(index);
  };

  const handleArrow = (direction) => {
    const nextIndex = (activeIndex + direction + certificates.length) % certificates.length;
    scrollToIndex(nextIndex);
  };

  const handleScroll = () => {
    const container = trackRef.current;
    if (!container) {
      return;
    }

    const cards = Array.from(container.querySelectorAll("[data-certificate-card]"));
    if (!cards.length) {
      return;
    }

    const containerCenter = container.scrollLeft + container.clientWidth / 2;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    cards.forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const distance = Math.abs(containerCenter - cardCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  };

  return (
    <>
      <div className="rounded-[2.4rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(2,6,23,0.34))] p-5 shadow-[0_18px_48px_rgba(2,6,23,0.38)] backdrop-blur-2xl md:p-7">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.34em] text-cyan-200/72">
              {certificates.length} Certifications
            </div>
            {/* <h2 className="mt-2 text-3xl font-semibold text-white">Professional Certifications</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Drag, scroll, or use the controls to move through the certificates, with the center card always taking focus.
            </p> */}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleArrow(-1)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:border-cyan-300/24 hover:text-cyan-100"
              aria-label="Previous certificate"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => handleArrow(1)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-cyan-300/18 bg-cyan-300/8 text-cyan-100 transition hover:border-cyan-300/32 hover:bg-cyan-300/12"
              aria-label="Next certificate"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="mt-10"
        >
          <div
            ref={trackRef}
            onScroll={handleScroll}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-[max(0px,calc(50%-14rem))] pb-4 pt-3 [scrollbar-color:rgba(34,211,238,0.35)_transparent] [scrollbar-width:thin]"
          >
            {certificates.map((certificate, index) => (
              <div key={certificate.file} data-certificate-card className="shrink-0">
                <CertificateCard
                  certificate={certificate}
                  index={index}
                  isActive={activeIndex === index}
                  isSelected={selectedCertificate?.file === certificate.file}
                  onSelect={() => scrollToIndex(index)}
                  onPreview={(selected) => setSelectedCertificate(selected)}
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedCertificate ? (
          <CertificateFocusView
            certificate={selectedCertificate}
            onClose={() => setSelectedCertificate(null)}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default CertificatesSection;

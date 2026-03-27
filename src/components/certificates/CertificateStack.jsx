import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Eye, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

const certificates = [
  { title: "C Programming", issuer: "Programming Course", date: "2026", file: "/C_Programming.pdf" },
  { title: "Data Visualisation", issuer: "Visualization Program", date: "2026", file: "/Data_Visualisation.pdf" },
  { title: "Flutter", issuer: "App Development Course", date: "2026", file: "/Flutter.pdf" },
  { title: "Hackathon", issuer: "Hackathon Event", date: "2026", file: "/Hackathon.pdf" },
  { title: "Operating Systems", issuer: "Systems Course", date: "2026", file: "/Os.pdf" },
  { title: "Python", issuer: "IIT Program", date: "2026", file: "/PythonIIT.pdf" },
  { title: "Certificate", issuer: "Learning Platform", date: "2026", file: "/free.pdf" },
];

function CertificateStack() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [previewFile, setPreviewFile] = useState(null);
  const wheelLockRef = useRef(false);

  const orderedCards = useMemo(
    () =>
      certificates.map((_, index) => certificates[(activeIndex + index) % certificates.length]).slice(0, 3),
    [activeIndex],
  );

  const shiftCard = (direction) => {
    setActiveIndex((current) => {
      if (direction > 0) {
        return (current + 1) % certificates.length;
      }
      return (current - 1 + certificates.length) % certificates.length;
    });
  };

  const handleWheel = (event) => {
    if (wheelLockRef.current || Math.abs(event.deltaY) < 12) {
      return;
    }

    wheelLockRef.current = true;
    shiftCard(event.deltaY > 0 ? 1 : -1);

    window.setTimeout(() => {
      wheelLockRef.current = false;
    }, 420);
  };

  useEffect(() => {
    if (!previewFile) {
      return undefined;
    }

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setPreviewFile(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [previewFile]);

  return (
    <>
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <div className="text-xs uppercase tracking-[0.35em] text-cyan-200/75">Certificate Stack</div>
          <h3 className="mt-3 text-3xl font-semibold text-white">A layered reveal of recent certificates</h3>
          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">
            Scroll on the stack or use the controls to bring each certificate forward, one at a time.
          </p>

          <div className="mt-6 flex items-center gap-3">
            <button
              type="button"
              onClick={() => shiftCard(-1)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:border-cyan-300/24 hover:text-cyan-100"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => shiftCard(1)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-cyan-300/18 bg-cyan-300/8 text-cyan-100 transition hover:border-cyan-300/32 hover:bg-cyan-300/12"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div
          onWheel={handleWheel}
          className="relative mx-auto h-[28rem] w-full max-w-md rounded-[2.4rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(15,23,42,0.5))] p-4 shadow-[0_0_40px_rgba(15,23,42,0.42)] backdrop-blur-2xl"
        >
          <div className="pointer-events-none absolute inset-0 rounded-[2.4rem] bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.1),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(99,102,241,0.12),transparent_26%)]" />

          <div className="relative h-full">
            {orderedCards
              .slice()
              .reverse()
              .map((certificate) => {
                const visibleIndex = orderedCards.findIndex((item) => item.file === certificate.file);
                const isFront = visibleIndex === 0;

                return (
                  <motion.article
                    key={`${certificate.file}-${activeIndex}-${visibleIndex}`}
                    initial={{
                      opacity: isFront ? 0 : 0.5,
                      x: isFront ? 40 : 0,
                      y: 24 + visibleIndex * 16,
                      scale: 0.95 - visibleIndex * 0.03,
                      rotate: visibleIndex === 0 ? 1.6 : visibleIndex === 1 ? -1.8 : 1.2,
                    }}
                    animate={{
                      opacity: 1 - visibleIndex * 0.22,
                      x: 0,
                      y: visibleIndex * 20,
                      scale: 1 - visibleIndex * 0.05,
                      rotate: visibleIndex === 0 ? 0 : visibleIndex === 1 ? -2.2 : 2.2,
                      filter: visibleIndex === 0 ? "blur(0px)" : `blur(${visibleIndex * 1.8}px)`,
                    }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="absolute inset-x-0 top-0 h-[22rem] overflow-hidden rounded-[2rem] border border-cyan-300/18 bg-[rgba(5,12,24,0.72)] p-6 shadow-[0_0_0_1px_rgba(34,211,238,0.08),0_18px_40px_rgba(2,6,23,0.45),0_0_28px_rgba(34,211,238,0.1)] backdrop-blur-2xl"
                    style={{ zIndex: 10 - visibleIndex }}
                  >
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.02)_34%,rgba(255,255,255,0)_100%)]" />
                    <div className="relative flex h-full flex-col justify-between">
                      <div>
                        <div className="text-xs uppercase tracking-[0.3em] text-cyan-200/75">{certificate.date}</div>
                        <h4 className="mt-4 text-2xl font-semibold text-white">{certificate.title}</h4>
                        <p className="mt-3 text-sm text-slate-400">{certificate.issuer}</p>
                      </div>

                      <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/50 p-4">
                        <div className="text-xs uppercase tracking-[0.22em] text-slate-500">Certificate Preview</div>
                        <div className="mt-4 h-24 rounded-[1rem] border border-cyan-300/14 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.14),transparent_40%),linear-gradient(135deg,rgba(15,23,42,0.8),rgba(8,47,73,0.48),rgba(17,24,39,0.85))]" />
                      </div>

                      <div className="flex items-center justify-between gap-3">
                        <div className="text-xs uppercase tracking-[0.22em] text-slate-500">
                          {visibleIndex === 0 ? "Active Card" : "Queued"}
                        </div>
                        <button
                          type="button"
                          onClick={() => setPreviewFile(certificate.file)}
                          className="inline-flex items-center gap-2 rounded-full border border-cyan-300/16 bg-cyan-300/8 px-4 py-2 text-sm text-cyan-100 transition hover:border-cyan-300/28 hover:bg-cyan-300/12"
                        >
                          <Eye className="h-4 w-4" />
                          View Certificate
                        </button>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {previewFile ? (
          <motion.div
            className="fixed inset-0 z-[99990] grid place-items-center bg-slate-950/70 px-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewFile(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              onClick={(event) => event.stopPropagation()}
              className="relative flex h-[min(86vh,52rem)] w-full max-w-5xl flex-col overflow-hidden rounded-[1.8rem] border border-cyan-300/22 bg-[rgba(5,12,24,0.88)] shadow-[0_20px_60px_rgba(2,6,23,0.55),0_0_34px_rgba(34,211,238,0.14)] backdrop-blur-2xl"
            >
              <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4">
                <div>
                  <div className="text-xs uppercase tracking-[0.35em] text-cyan-200/75">Certificate Preview</div>
                  <div className="mt-1 text-lg font-semibold text-white">View Certificate</div>
                </div>
                <button
                  type="button"
                  onClick={() => setPreviewFile(null)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:border-cyan-300/25 hover:text-cyan-100"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex-1 bg-slate-950/55 p-3">
                <iframe
                  src={previewFile}
                  title="Certificate Preview"
                  className="h-full w-full rounded-[1.2rem] border border-white/10 bg-white"
                />
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default CertificateStack;

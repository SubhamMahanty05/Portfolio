import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, Bot, Download, Eye, Sparkles, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { personalInfo } from "../data/portfolio";
import useMouseParallax from "../hooks/useMouseParallax";
import useScrollAnimation from "../hooks/useScrollAnimation";
import { playClickTone } from "../lib/sound";

const heroLoop = [
  "Building intelligent systems...",
  "Turning data into insights...",
  "Designing neural interfaces...",
];

function Hero({ onOpenAssistant, soundEnabled }) {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const visualRef = useRef(null);
  const { parallax } = useMouseParallax();
  const scrollProgress = useScrollAnimation(sectionRef, textRef, visualRef);
  const [copyIndex, setCopyIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [showCvPreview, setShowCvPreview] = useState(false);
  const cvUrl = "/SubhamCV.pdf";

  useEffect(() => {
    const activeText = heroLoop[copyIndex];
    let currentIndex = 0;

    const interval = window.setInterval(() => {
      currentIndex += 1;
      setTypedText(activeText.slice(0, currentIndex));

      if (currentIndex >= activeText.length) {
        window.clearInterval(interval);
        window.setTimeout(() => {
          setTypedText("");
          setCopyIndex((current) => (current + 1) % heroLoop.length);
        }, 1400);
      }
    }, 65);

    return () => window.clearInterval(interval);
  }, [copyIndex]);

  const sceneStyle = useMemo(
    () => ({
      transform: `translate3d(${parallax.x}px, ${parallax.y}px, 0)`,
    }),
    [parallax.x, parallax.y],
  );

  const magneticTransform = useMemo(
    () => ({
      transform: `translate3d(${parallax.x * 0.18}px, ${parallax.y * 0.18}px, 0)`,
    }),
    [parallax.x, parallax.y],
  );

  const profileImage = "/SubhamP.jpeg";

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative mx-auto flex min-h-screen max-w-7xl items-center overflow-hidden px-5 pb-24 pt-28 md:px-8"
    >
      <div className="absolute inset-x-0 top-12 h-56 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.16),transparent_42%)] blur-3xl" />
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#030711]/90 to-transparent" />
      </div>

      <div className="relative z-10 grid w-full items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div ref={textRef} className="relative z-10">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/18 bg-cyan-300/8 px-4 py-2 text-[0.7rem] uppercase tracking-[0.38em] text-cyan-100/90 shadow-[0_0_24px_rgba(34,211,238,0.14)]">
            <Sparkles className="h-4 w-4" />
            AI System Interface
          </div>

          <p className="mb-5 text-sm uppercase tracking-[0.5em] text-slate-400">
            {personalInfo.name}
          </p>

          <h1 className="max-w-4xl text-4xl font-semibold leading-[1.05] text-white sm:text-5xl md:text-6xl xl:text-[5.25rem]">
            Data Science &amp; Machine Learning Engineer
          </h1>

          <div className="mt-6 min-h-[2rem] text-lg font-medium text-cyan-200 sm:text-xl">
            {typedText}
            <span className="ml-1 inline-block h-5 w-px animate-pulse bg-cyan-200 align-middle" />
          </div>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
            I build ML and data products with clean, interactive interfaces.
          </p>

          {/* <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { label: "Neural Workflows", value: "24+" },
              { label: "Insight Modules", value: "16" },
              { label: "Interactive Layers", value: "08" },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 + index * 0.12 }}
                className="rounded-[1.6rem] border border-white/10 bg-white/5 p-4 shadow-[0_0_28px_rgba(15,23,42,0.45)] backdrop-blur-xl"
              >
                <div className="text-2xl font-semibold text-white">{item.value}</div>
                <div className="mt-1 text-sm text-slate-400">{item.label}</div>
              </motion.div>
            ))}
          </div> */}

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <div style={magneticTransform}>
              <button
                type="button"
                data-cursor="interactive"
                onClick={() => {
                  playClickTone(soundEnabled);
                  setShowCvPreview(true);
                }}
                className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_40px_rgba(34,211,238,0.3)] transition duration-300 hover:scale-[1.02]"
              >
                Preview CV
                <Eye className="h-4 w-4 transition group-hover:scale-110" />
              </button>
            </div>

            <button
              type="button"
              data-cursor="interactive"
              onClick={() => {
                playClickTone(soundEnabled);
                onOpenAssistant();
              }}
              className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white backdrop-blur-xl transition hover:border-fuchsia-300/30 hover:bg-fuchsia-300/10 hover:text-cyan-100"
            >
              <Bot className="h-4 w-4 text-cyan-300" />
              Open AI Assistant
            </button>
          </div>

          <motion.a
            href="#about"
            data-cursor="interactive"
            className="mt-10 inline-flex items-center gap-3 text-sm uppercase tracking-[0.35em] text-slate-400 transition hover:text-cyan-100"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY }}
          >
            Scroll
            <ArrowDown className="h-4 w-4 text-cyan-300" />
          </motion.a>
        </div>

        <motion.div
          ref={visualRef}
          className="relative order-first flex justify-center lg:order-none lg:justify-end"
          initial={{ opacity: 0, y: 18, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <div className="absolute inset-8 rounded-[2rem] bg-cyan-400/10 blur-3xl sm:inset-10" />
          <div className="absolute -inset-2 rounded-[2.8rem] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.18),transparent_58%)] blur-3xl sm:-inset-4" />

          <motion.div
            animate={{ y: [0, -6, 0] }}
            whileHover={{ scale: 1.03, y: -10 }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="group relative w-[240px] sm:w-[280px] lg:w-[320px]"
          >
            <div className="pointer-events-none absolute -inset-6 rounded-[2.2rem] bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.35),rgba(14,165,233,0.05),transparent_55%)] blur-xl opacity-80 animate-pulse" />
            <div className="pointer-events-none absolute -inset-1 rounded-[1.8rem] bg-gradient-to-br from-cyan-300/55 via-sky-400/20 to-blue-500/55 opacity-80 blur-md transition duration-300 group-hover:opacity-100 group-hover:blur-lg" />
            <div className="pointer-events-none absolute inset-0 rounded-[1.8rem] border border-cyan-100/30 bg-gradient-to-br from-cyan-200/15 via-blue-200/10 to-indigo-400/10 shadow-[0_0_0_1px_rgba(34,211,238,0.15),0_24px_70px_rgba(2,6,23,0.55),0_0_36px_rgba(34,211,238,0.18)]" />

            <div className="relative overflow-hidden rounded-[1.6rem] p-1 bg-gradient-to-br from-cyan-300/35 via-sky-400/20 to-blue-400/35 shadow-[0_0_24px_rgba(59,130,246,0.22)]">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent" />
              <div className="relative overflow-hidden rounded-[1.4rem] border border-cyan-100/30 bg-slate-950/55 p-2 backdrop-blur-2xl">
                <div className="relative overflow-hidden rounded-[1.15rem] border border-cyan-300/22 bg-slate-950/55">
                  <img
                    src={profileImage}
                    alt={`${personalInfo.name} profile`}
                    className="aspect-[4/5] w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                  />
                </div>
              </div>

              <div className="mt-4 flex items-start justify-between gap-3">
                <div className="ml-3">
                  {/* <div className="text-[0.62rem] uppercase tracking-[0.32em] text-cyan-200/75">Profile</div> */}
                  <div className="mt-1 text-base font-semibold text-white">{personalInfo.name}</div>
                  <div className="mt-1 text-sm leading-6 text-slate-400">{personalInfo.shortTitle}</div>
                </div>
                {/* <div className="rounded-full border border-cyan-300/18 bg-cyan-300/8 px-3 py-1 text-xs text-cyan-100">
                  Sync {Math.round(scrollProgress * 100)}%
                </div> */}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showCvPreview ? (
          <motion.div
            className="fixed inset-0 z-[99990] grid place-items-start bg-slate-950/70 px-4 pb-4 pt-28 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.28 }}
              className="relative mx-auto flex h-[min(calc(100vh-9rem),52rem)] w-full max-w-5xl flex-col overflow-hidden rounded-[1.8rem] border border-cyan-300/22 bg-[rgba(5,12,24,0.88)] shadow-[0_20px_60px_rgba(2,6,23,0.55),0_0_34px_rgba(34,211,238,0.14)] backdrop-blur-2xl"
            >
              <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4">
                <div>
                  <div className="text-xs uppercase tracking-[0.35em] text-cyan-200/75">CV Preview</div>
                  <div className="mt-1 text-lg font-semibold text-white">Subham Resume</div>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={cvUrl}
                    download="SubhamCV.pdf"
                    data-cursor="interactive"
                    onClick={() => playClickTone(soundEnabled)}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-[0_0_28px_rgba(34,211,238,0.25)] transition hover:scale-[1.02]"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </a>
                  <button
                    type="button"
                    data-cursor="interactive"
                    onClick={() => setShowCvPreview(false)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:border-cyan-300/25 hover:text-cyan-100"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex-1 bg-slate-950/55 p-3">
                <iframe
                  src={cvUrl}
                  title="Subham CV Preview"
                  className="h-full w-full rounded-[1.2rem] border border-white/10 bg-white"
                />
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

export default Hero;

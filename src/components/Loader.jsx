import { AnimatePresence, motion } from "framer-motion";
import { BrainCircuit, Volume2, VolumeX } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { personalInfo } from "../data/portfolio";
import { playClickTone } from "../lib/sound";

const LOADER_STEPS = [
  "Initializing Intelligence...",
  "Loading Neural Systems...",
  `Welcome to ${personalInfo.name}'s AI Portfolio`,
];

function NeuralLoaderCore({ progress }) {
  const nodes = useMemo(
    () => [
      { id: 1, x: 110, y: 110, size: 12, color: "#22d3ee" },
      { id: 2, x: 56, y: 76, size: 7, color: "#a855f7" },
      { id: 3, x: 162, y: 74, size: 8, color: "#38bdf8" },
      { id: 4, x: 38, y: 134, size: 6, color: "#67e8f9" },
      { id: 5, x: 184, y: 136, size: 7, color: "#c084fc" },
      { id: 6, x: 72, y: 174, size: 8, color: "#22d3ee" },
      { id: 7, x: 150, y: 176, size: 8, color: "#8b5cf6" },
      { id: 8, x: 111, y: 42, size: 5, color: "#7dd3fc" },
    ],
    [],
  );

  const links = useMemo(
    () => [
      [1, 2],
      [1, 3],
      [1, 4],
      [1, 5],
      [1, 6],
      [1, 7],
      [2, 8],
      [3, 8],
      [4, 6],
      [5, 7],
      [2, 4],
      [3, 5],
      [6, 7],
    ],
    [],
  );

  const visibleLinks = Math.max(1, Math.round((progress / 100) * links.length));

  return (
    <div className="relative mx-auto grid h-[18rem] w-[18rem] place-items-center sm:h-[22rem] sm:w-[22rem]">
      <motion.div
        className="absolute inset-0 rounded-full bg-cyan-400/10 blur-3xl"
        animate={{ scale: [0.92, 1.06, 0.92], opacity: [0.45, 0.8, 0.45] }}
        transition={{ duration: 3.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-[15%] rounded-full border border-cyan-300/15"
        animate={{ rotate: 360 }}
        transition={{ duration: 14, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-[8%] rounded-full border border-fuchsia-300/12"
        animate={{ rotate: -360 }}
        transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />

      <svg viewBox="0 0 220 220" className="relative z-10 h-full w-full">
        <defs>
          <radialGradient id="loaderGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(34,211,238,0.55)" />
            <stop offset="100%" stopColor="rgba(34,211,238,0)" />
          </radialGradient>
        </defs>

        <circle cx="110" cy="110" r="92" fill="url(#loaderGlow)" opacity="0.55" />

        {links.slice(0, visibleLinks).map(([fromId, toId], index) => {
          const from = nodes.find((node) => node.id === fromId);
          const to = nodes.find((node) => node.id === toId);

          return (
            <motion.line
              key={`${fromId}-${toId}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke={index % 2 === 0 ? "#22d3ee" : "#a855f7"}
              strokeWidth="1.6"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: [0.15, 0.9, 0.25] }}
              transition={{
                pathLength: { duration: 0.45, delay: index * 0.04 },
                opacity: {
                  duration: 2.1,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: index * 0.06,
                },
              }}
            />
          );
        })}

        {nodes.map((node, index) => (
          <g key={node.id}>
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={node.size * 2.2}
              fill={node.color}
              opacity="0.12"
              animate={{ scale: [0.9, 1.3, 0.95], opacity: [0.08, 0.24, 0.08] }}
              transition={{ duration: 2.2 + index * 0.14, repeat: Number.POSITIVE_INFINITY }}
              style={{ transformOrigin: `${node.x}px ${node.y}px` }}
            />
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={node.size}
              fill={node.color}
              animate={{ scale: [0.95, 1.15, 0.95], opacity: [0.75, 1, 0.75] }}
              transition={{ duration: 1.8 + index * 0.12, repeat: Number.POSITIVE_INFINITY }}
              style={{ transformOrigin: `${node.x}px ${node.y}px` }}
            />
          </g>
        ))}
      </svg>

      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 26, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      >
        {Array.from({ length: 12 }, (_, index) => (
          <span
            key={index}
            className="absolute h-1.5 w-1.5 rounded-full bg-cyan-300/70 shadow-[0_0_14px_rgba(34,211,238,0.7)]"
            style={{
              left: `${50 + Math.cos((index / 12) * Math.PI * 2) * 42}%`,
              top: `${50 + Math.sin((index / 12) * Math.PI * 2) * 42}%`,
            }}
          />
        ))}
      </motion.div>

      <div className="absolute inset-0 grid place-items-center">
        <div className="grid h-16 w-16 place-items-center rounded-full border border-cyan-300/20 bg-slate-950/60 shadow-[0_0_30px_rgba(34,211,238,0.16)] backdrop-blur-xl">
          <BrainCircuit className="h-7 w-7 text-cyan-200" />
        </div>
      </div>
    </div>
  );
}

function Loader({ soundEnabled, onToggleSound, onComplete }) {
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    let current = 0;
    const progressInterval = window.setInterval(() => {
      current += Math.random() * 4 + 2;
      const nextValue = Math.min(100, Math.round(current));
      setProgress(nextValue);

      if (nextValue >= 100) {
        window.clearInterval(progressInterval);
        window.setTimeout(() => {
          onComplete();
        }, 700);
      }
    }, 180);

    return () => window.clearInterval(progressInterval);
  }, [onComplete]);

  useEffect(() => {
    const computedStep = progress < 34 ? 0 : progress < 76 ? 1 : 2;
    setStepIndex(computedStep);
  }, [progress]);

  useEffect(() => {
    const text = LOADER_STEPS[stepIndex];
    let index = 0;
    setTypedText("");

    const typingInterval = window.setInterval(() => {
      index += 1;
      setTypedText(text.slice(0, index));
      if (index >= text.length) {
        window.clearInterval(typingInterval);
      }
    }, 34);

    return () => window.clearInterval(typingInterval);
  }, [stepIndex]);

  return (
    <motion.div
      className="fixed inset-0 z-[90] overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.12),_transparent_28%),radial-gradient(circle_at_80%_20%,_rgba(139,92,246,0.18),_transparent_24%),linear-gradient(180deg,_#040814_0%,_#02040c_52%,_#030711_100%)]"
      initial={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.04, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:72px_72px]" />

      {Array.from({ length: 22 }, (_, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-cyan-300/30 shadow-[0_0_24px_rgba(34,211,238,0.55)]"
          style={{
            width: `${4 + (index % 4) * 3}px`,
            height: `${4 + (index % 4) * 3}px`,
            left: `${(index * 19) % 100}%`,
            top: `${(index * 13) % 100}%`,
          }}
          animate={{
            y: [0, -36, 0],
            opacity: [0.15, 0.6, 0.12],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: 4 + (index % 5),
            delay: index * 0.08,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="relative flex min-h-screen flex-col items-center justify-center px-5 py-10 text-center">
        <motion.button
          type="button"
          data-cursor="interactive"
          onClick={() => {
            playClickTone(soundEnabled);
            onToggleSound();
          }}
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="absolute right-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.25em] text-slate-200 backdrop-blur-xl transition hover:border-cyan-300/30 hover:text-cyan-100"
        >
          {soundEnabled ? <Volume2 className="h-4 w-4 text-cyan-300" /> : <VolumeX className="h-4 w-4 text-slate-400" />}
          Sound
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="loader-panel relative w-full max-w-4xl overflow-hidden rounded-[2.4rem] border border-white/10 px-6 py-8 shadow-[0_0_70px_rgba(34,211,238,0.12)] backdrop-blur-2xl md:px-10 md:py-10"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.08),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.1),_transparent_26%)]" />

          <div className="relative">
            <div className="mb-5 text-xs uppercase tracking-[0.55em] text-cyan-200/75">
              Neural Entry Sequence
            </div>

            <NeuralLoaderCore progress={progress} />

            <div className="mx-auto mt-8 max-w-2xl">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={stepIndex}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                  className="min-h-[3.5rem] text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-4xl"
                >
                  {typedText}
                  <span className="ml-1 inline-block h-5 w-px animate-pulse bg-cyan-200 align-middle" />
                </motion.h1>
              </AnimatePresence>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.7 }}
                className="mt-4 text-sm leading-7 text-slate-300 md:text-base"
              >
                Entering a cinematic machine learning interface designed around data, intelligence, and immersive interaction.
              </motion.p>
            </div>

            <div className="mx-auto mt-8 max-w-xl">
              <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-400">
                <span>System Sync</span>
                <span>{progress}%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full border border-white/10 bg-slate-950/70">
                <motion.div
                  className="h-full rounded-full bg-[linear-gradient(90deg,#22d3ee_0%,#38bdf8_40%,#8b5cf6_75%,#d946ef_100%)] shadow-[0_0_24px_rgba(34,211,238,0.4)]"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Loader;

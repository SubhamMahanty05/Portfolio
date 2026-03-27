import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Brain, ChartNoAxesCombined, Rocket, Volume2, VolumeX } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  aboutJourneyStages,
  aboutMilestones,
  beyondCodeProfile,
  journeyGrowthData,
} from "../../data/portfolio";
import Timeline from "./Timeline";

const stageBackgrounds = [
  {
    aura:
      "bg-[radial-gradient(circle_at_20%_18%,rgba(34,211,238,0.18),transparent_28%),radial-gradient(circle_at_80%_25%,rgba(59,130,246,0.14),transparent_32%),linear-gradient(180deg,rgba(2,6,23,0.1),rgba(2,6,23,0.32))]",
    surface:
      "bg-[linear-gradient(135deg,rgba(34,211,238,0.08),rgba(15,23,42,0.58),rgba(59,130,246,0.04))]",
  },
  {
    aura:
      "bg-[radial-gradient(circle_at_18%_30%,rgba(14,165,233,0.18),transparent_28%),radial-gradient(circle_at_82%_20%,rgba(34,211,238,0.12),transparent_30%),linear-gradient(180deg,rgba(2,6,23,0.12),rgba(2,6,23,0.34))]",
    surface:
      "bg-[linear-gradient(135deg,rgba(14,165,233,0.1),rgba(15,23,42,0.6),rgba(34,211,238,0.05))]",
  },
  {
    aura:
      "bg-[radial-gradient(circle_at_24%_16%,rgba(168,85,247,0.18),transparent_26%),radial-gradient(circle_at_78%_30%,rgba(217,70,239,0.14),transparent_30%),linear-gradient(180deg,rgba(2,6,23,0.14),rgba(2,6,23,0.36))]",
    surface:
      "bg-[linear-gradient(135deg,rgba(168,85,247,0.1),rgba(15,23,42,0.6),rgba(217,70,239,0.06))]",
  },
  {
    aura:
      "bg-[radial-gradient(circle_at_16%_24%,rgba(16,185,129,0.18),transparent_28%),radial-gradient(circle_at_82%_20%,rgba(34,211,238,0.14),transparent_32%),linear-gradient(180deg,rgba(2,6,23,0.13),rgba(2,6,23,0.34))]",
    surface:
      "bg-[linear-gradient(135deg,rgba(16,185,129,0.1),rgba(15,23,42,0.6),rgba(34,211,238,0.05))]",
  },
  {
    aura:
      "bg-[radial-gradient(circle_at_18%_18%,rgba(217,70,239,0.16),transparent_27%),radial-gradient(circle_at_82%_20%,rgba(99,102,241,0.15),transparent_32%),linear-gradient(180deg,rgba(2,6,23,0.12),rgba(2,6,23,0.35))]",
    surface:
      "bg-[linear-gradient(135deg,rgba(217,70,239,0.08),rgba(15,23,42,0.58),rgba(99,102,241,0.08))]",
  },
];

function HighlightWord({ children, delay = 0 }) {
  return (
    <motion.span
      initial={{ backgroundSize: "0% 100%", opacity: 0.78 }}
      whileInView={{ backgroundSize: "100% 100%", opacity: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.7, delay }}
      className="mx-1 inline rounded-md bg-[linear-gradient(120deg,rgba(34,211,238,0.22),rgba(168,85,247,0.18))] bg-no-repeat px-2 py-0.5 text-cyan-100 shadow-[0_0_20px_rgba(34,211,238,0.12)]"
    >
      {children}
    </motion.span>
  );
}

function SoundToggle({ enabled, onToggle }) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group inline-flex items-center gap-3 rounded-full border border-cyan-300/16 bg-slate-950/50 px-4 py-2 text-xs uppercase tracking-[0.3em] text-slate-200 shadow-[0_0_28px_rgba(34,211,238,0.08)] backdrop-blur-xl transition-colors hover:border-cyan-200/28"
      aria-pressed={enabled}
      aria-label={enabled ? "Disable ambient story sound" : "Enable ambient story sound"}
    >
      {enabled ? <Volume2 className="h-4 w-4 text-cyan-100" /> : <VolumeX className="h-4 w-4 text-slate-300" />}
      <span>{enabled ? "Ambient On" : "Ambient Off"}</span>
    </motion.button>
  );
}

function BeyondCodeCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55 }}
      className="relative overflow-hidden rounded-[2rem] border border-cyan-300/16 bg-[linear-gradient(135deg,rgba(34,211,238,0.08),rgba(15,23,42,0.58),rgba(168,85,247,0.08))] p-5 shadow-[0_0_30px_rgba(34,211,238,0.08)] backdrop-blur-2xl"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.08),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.1),transparent_30%)]" />
      <div className="relative">
        <div className="text-xs uppercase tracking-[0.35em] text-cyan-200/75">{beyondCodeProfile.title}</div>
        <p className="mt-4 text-sm leading-7 text-slate-300">{beyondCodeProfile.description}</p>

        <div className="mt-5 flex flex-wrap gap-3">
          {beyondCodeProfile.traits.map((trait) => (
            <span key={trait} className="rounded-full border border-white/10 bg-slate-950/45 px-3 py-2 text-xs text-slate-100">
              {trait}
            </span>
          ))}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            { icon: Brain, label: "Mindset" },
            { icon: ChartNoAxesCombined, label: "Storytelling" },
            { icon: Rocket, label: "Ambition" },
          ].map(({ icon: Icon, label }, index) => (
            <motion.div
              key={label}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.2 + index * 0.4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className="rounded-[1.4rem] border border-white/10 bg-slate-950/45 p-4"
            >
              <Icon className="h-5 w-5 text-cyan-100" />
              <div className="mt-3 text-sm font-medium text-white">{label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function JourneyGraph() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55 }}
      className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 shadow-[0_0_34px_rgba(15,23,42,0.38)] backdrop-blur-2xl"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-[0.35em] text-cyan-200/75">Journey Graph</div>
          <div className="mt-2 text-2xl font-semibold text-white">Growth vs Confidence</div>
        </div>
        <div className="rounded-full border border-cyan-300/16 bg-cyan-300/8 px-3 py-1 text-xs text-cyan-100">
          2022 to 2026
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={journeyGrowthData}>
            <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
            <XAxis dataKey="year" tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                background: "rgba(2,6,23,0.92)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "16px",
                color: "#e2e8f0",
              }}
            />
            <Line type="monotone" dataKey="skill" stroke="#22d3ee" strokeWidth={3} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="confidence" stroke="#a855f7" strokeWidth={3} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

function MilestonesPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55 }}
      className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 shadow-[0_0_34px_rgba(15,23,42,0.38)] backdrop-blur-2xl"
    >
      <div className="text-xs uppercase tracking-[0.35em] text-cyan-200/75">Milestones</div>
      <div className="mt-2 text-2xl font-semibold text-white">Moments that changed the path</div>

      <div className="mt-5 grid gap-3">
        {aboutMilestones.map((milestone, index) => (
          <motion.div
            key={milestone}
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
            className="rounded-[1.3rem] border border-white/8 bg-slate-950/45 px-4 py-4 text-sm text-slate-100"
          >
            {milestone}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function AboutSection() {
  const sectionRef = useRef(null);
  const audioRef = useRef(null);
  const [activeStage, setActiveStage] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const activeStageTheme = useMemo(
    () => stageBackgrounds[activeStage] ?? stageBackgrounds[0],
    [activeStage],
  );

  useEffect(() => {
    if (!soundEnabled) {
      if (audioRef.current) {
        audioRef.current.pause();
      }

      return undefined;
    }

    const AudioContextClass = window.AudioContext || window.webkitAudioContext;

    if (!AudioContextClass) {
      return undefined;
    }

    const context = new AudioContextClass();
    const master = context.createGain();
    const oscillator = context.createOscillator();
    const modulator = context.createOscillator();
    const modGain = context.createGain();

    oscillator.type = "sine";
    oscillator.frequency.value = 164.81;
    modulator.type = "sine";
    modulator.frequency.value = 0.12;
    modGain.gain.value = 8;
    master.gain.value = 0.015;

    modulator.connect(modGain);
    modGain.connect(oscillator.frequency);
    oscillator.connect(master);
    master.connect(context.destination);

    oscillator.start();
    modulator.start();

    audioRef.current = {
      pause: () => {
        master.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.2);
        window.setTimeout(() => {
          oscillator.stop();
          modulator.stop();
          context.close();
        }, 260);
      },
    };

    return () => {
      audioRef.current?.pause?.();
      audioRef.current = null;
    };
  }, [soundEnabled]);

  const toggleSound = () => {
    setSoundEnabled((current) => !current);
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative mx-auto max-w-7xl overflow-hidden px-5 py-24 md:px-8"
    >
      <motion.div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 ${activeStageTheme.aura}`}
        animate={{ opacity: 1, scale: [1, 1.008, 1] }}
        transition={{ duration: 2.4, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-8 top-14 h-[22rem] rounded-[3rem] blur-3xl ${activeStageTheme.surface}`}
        animate={{ opacity: [0.62, 0.74, 0.62], y: [0, -4, 0] }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 18 }, (_, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full bg-cyan-300/30 shadow-[0_0_20px_rgba(34,211,238,0.4)]"
            style={{
              width: `${4 + (index % 3) * 4}px`,
              height: `${4 + (index % 3) * 4}px`,
              left: `${(index * 17) % 94}%`,
              top: `${(index * 13) % 88}%`,
            }}
            animate={{ y: [0, -8, 0], opacity: [0.14, 0.34, 0.14] }}
            transition={{ duration: 5.5 + (index % 4), repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, filter: "blur(14px)", y: 24 }}
        whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="relative mx-auto mb-16 max-w-4xl text-center"
      >
        <div className="mb-4 flex items-center justify-center gap-4">
          <div className="text-xs uppercase tracking-[0.5em] text-cyan-200/75">About</div>
          <SoundToggle enabled={soundEnabled} onToggle={toggleSound} />
        </div>

        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
          My Journey Into Data &amp; Intelligence
        </h2>

        <p className="mx-auto mt-5 max-w-3xl text-sm leading-8 text-slate-300 sm:text-base">
          This is a cinematic path through curiosity, systems thinking, and the gradual pull toward
          <HighlightWord delay={0.15}>AI</HighlightWord>
          ,
          <HighlightWord delay={0.25}>Data</HighlightWord>
          , and
          <HighlightWord delay={0.35}>ML</HighlightWord>
          . Each stage reflects how code became experimentation, how experimentation became products, and how products
          became a vision for building intelligent systems that feel useful and human.
        </p>

        <motion.div
          key={aboutJourneyStages[activeStage]?.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mx-auto mt-8 max-w-2xl rounded-[1.6rem] border border-white/10 bg-slate-950/45 px-5 py-4 shadow-[0_0_32px_rgba(34,211,238,0.08)] backdrop-blur-xl"
        >
          <div className="text-xs uppercase tracking-[0.35em] text-cyan-200/75">Current Chapter</div>
          <div className="mt-2 text-xl font-semibold text-white">{aboutJourneyStages[activeStage]?.title}</div>
          <p className="mt-2 text-sm text-slate-300">{aboutJourneyStages[activeStage]?.description}</p>
        </motion.div>
      </motion.div>

      <Timeline items={aboutJourneyStages} activeIndex={activeStage} onActiveIndexChange={setActiveStage} />

      <div className="mt-16 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        {/* <JourneyGraph /> */}
        <MilestonesPanel />
        <BeyondCodeCard />
      </div>
    </section>
  );
}

export default AboutSection;

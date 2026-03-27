import { motion } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { insightCards, lineSeries, pieSegments, scatterPoints } from "../data/portfolio";
import SectionHeading from "../components/SectionHeading";

function LineChart() {
  const width = 420;
  const height = 220;
  const step = width / (lineSeries.length - 1);
  const path = lineSeries
    .map((value, index) => {
      const x = index * step;
      const y = height - (value / 100) * (height - 30) - 10;
      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  return (
    <div className="rounded-[1.8rem] border border-white/10 bg-slate-950/55 p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="text-sm text-slate-400">Prediction Confidence</div>
          <div className="text-xl font-semibold text-white">Line Signal</div>
        </div>
        <div className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs text-cyan-200">
          +27.4%
        </div>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} className="h-56 w-full">
        <defs>
          <linearGradient id="lineFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(34,211,238,0.45)" />
            <stop offset="100%" stopColor="rgba(34,211,238,0.02)" />
          </linearGradient>
        </defs>

        {[0, 1, 2, 3].map((line) => (
          <line
            key={line}
            x1="0"
            x2={width}
            y1={25 + line * 48}
            y2={25 + line * 48}
            stroke="rgba(255,255,255,0.08)"
          />
        ))}

        <path d={`${path} L ${width} ${height} L 0 ${height} Z`} fill="url(#lineFill)" />
        <path d={path} fill="none" stroke="#22d3ee" strokeWidth="3" strokeLinecap="round" />

        {lineSeries.map((value, index) => {
          const x = index * step;
          const y = height - (value / 100) * (height - 30) - 10;
          return <circle key={index} cx={x} cy={y} r="4.5" fill="#a855f7" />;
        })}
      </svg>
    </div>
  );
}

function PieChart() {
  let cumulative = 0;
  const radius = 68;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="rounded-[1.8rem] border border-white/10 bg-slate-950/55 p-5">
      <div className="mb-4">
        <div className="text-sm text-slate-400">Pipeline Allocation</div>
        <div className="text-xl font-semibold text-white">Circular Load Split</div>
      </div>
      <div className="flex flex-col items-center gap-6 md:flex-row">
        <svg viewBox="0 0 200 200" className="h-56 w-56 -rotate-90">
          <circle cx="100" cy="100" r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="26" />
          {pieSegments.map((segment) => {
            const dash = (segment.value / 100) * circumference;
            const offset = circumference - (cumulative / 100) * circumference;
            cumulative += segment.value;
            return (
              <circle
                key={segment.label}
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                stroke={segment.color}
                strokeWidth="26"
                strokeDasharray={`${dash} ${circumference - dash}`}
                strokeDashoffset={offset}
                strokeLinecap="round"
              />
            );
          })}
        </svg>
        <div className="space-y-3">
          {pieSegments.map((segment) => (
            <div key={segment.label} className="flex items-center gap-3 text-sm text-slate-300">
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: segment.color }} />
              <span className="min-w-24">{segment.label}</span>
              <span className="font-medium text-white">{segment.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ScatterChart() {
  return (
    <div className="rounded-[1.8rem] border border-white/10 bg-slate-950/55 p-5">
      <div className="mb-4">
        <div className="text-sm text-slate-400">Feature Space</div>
        <div className="text-xl font-semibold text-white">Cluster Scatter Map</div>
      </div>
      <svg viewBox="0 0 360 240" className="h-56 w-full">
        {[0, 1, 2, 3, 4].map((line) => (
          <line
            key={`h-${line}`}
            x1="20"
            y1={20 + line * 45}
            x2="340"
            y2={20 + line * 45}
            stroke="rgba(255,255,255,0.08)"
          />
        ))}
        {[0, 1, 2, 3, 4].map((line) => (
          <line
            key={`v-${line}`}
            x1={30 + line * 70}
            y1="20"
            x2={30 + line * 70}
            y2="210"
            stroke="rgba(255,255,255,0.08)"
          />
        ))}
        {scatterPoints.map((point, index) => (
          <motion.circle
            key={`${point.x}-${point.y}`}
            cx={point.x * 3.5}
            cy={220 - point.y * 2}
            r={point.size}
            fill={index % 2 === 0 ? "#22d3ee" : "#a855f7"}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 0.8 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
          />
        ))}
      </svg>
    </div>
  );
}

function DataVizDashboard() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  cardsRef.current = [];

  const addCardRef = (element) => {
    if (element && !cardsRef.current.includes(element)) {
      cardsRef.current.push(element);
    }
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current,
        { y: 45, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
          },
        },
      );
    }, sectionRef);

    return () => context.revert();
  }, []);

  const dashboardGrid = useMemo(
    () => [
      <LineChart key="line" />,
      <PieChart key="pie" />,
      <ScatterChart key="scatter" />,
    ],
    [],
  );

  return (
    <section id="dashboard" ref={sectionRef} className="mx-auto max-w-7xl px-5 py-24 md:px-8">
      <SectionHeading
        eyebrow="Data Visualization"
        title="A live-feeling ML dashboard with fake sample intelligence."
        description="This is the signature section: simulated datasets, animated insights, and dashboard widgets that feel like an active machine learning monitoring surface."
      />

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-6">
          {dashboardGrid.map((chart, index) => (
            <div key={index} ref={addCardRef}>
              {chart}
            </div>
          ))}
        </div>

        <div className="grid gap-6">
          {insightCards.map((insight) => (
            <div
              key={insight.title}
              ref={addCardRef}
              className="relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(34,211,238,0.12),_transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(168,85,247,0.12),_transparent_30%)]" />
              <div className="relative">
                <div className="text-sm uppercase tracking-[0.28em] text-slate-400">{insight.title}</div>
                <div className="mt-3 text-4xl font-semibold text-white">{insight.value}</div>
                <p className="mt-4 text-sm leading-7 text-slate-300">{insight.note}</p>
              </div>
            </div>
          ))}

          <div
            ref={addCardRef}
            className="rounded-[1.8rem] border border-cyan-300/15 bg-slate-950/65 p-6 shadow-[0_0_35px_rgba(34,211,238,0.12)]"
          >
            <div className="text-sm uppercase tracking-[0.28em] text-cyan-200/80">ML Ops Feed</div>
            <div className="mt-3 text-2xl font-semibold text-white">Automated insight stream</div>
            <div className="mt-6 space-y-4">
              {[
                "Feature normalization improved stability across the latest validation cycle.",
                "Scatter clusters indicate three strong pattern groups in simulated user behavior.",
                "Forecast line suggests upward confidence with mild saturation near final epochs.",
              ].map((item, index) => (
                <motion.div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm leading-7 text-slate-300"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DataVizDashboard;

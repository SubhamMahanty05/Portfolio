import React from "react";

const orbs = [
  {
    id: "orb-cyan",
    className: "left-[-12rem] top-[6rem] h-[26rem] w-[26rem] bg-cyan-300/10",
    animation: "background-drift 20s ease-in-out infinite",
  },
  {
    id: "orb-sky",
    className: "right-[-10rem] top-[30%] h-[22rem] w-[22rem] bg-sky-400/10",
    animation: "background-drift 24s ease-in-out infinite reverse",
  },
  {
    id: "orb-violet",
    className: "left-1/2 top-[58%] h-[24rem] w-[24rem] -translate-x-1/2 bg-fuchsia-400/8",
    animation: "background-drift 28s ease-in-out infinite",
  },
];

const signalLines = Array.from({ length: 5 }, (_, index) => ({
  id: `signal-${index}`,
  top: `${18 + index * 15}%`,
  width: `${18 + index * 4}rem`,
  delay: `${index * 2.2}s`,
  duration: `${16 + index * 1.8}s`,
  rotate: `${-10 + index * 4}deg`,
}));

function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,_#050816_0%,_#02040c_55%,_#030711_100%)]" />
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.08),transparent_34%),radial-gradient(circle_at_82%_22%,rgba(139,92,246,0.08),transparent_28%),radial-gradient(circle_at_50%_100%,rgba(56,189,248,0.06),transparent_30%)]" />

      {orbs.map((orb) => (
        <div
          key={orb.id}
          className={`absolute rounded-full blur-3xl ${orb.className}`}
          style={{ animation: orb.animation }}
        />
      ))}

      <div className="absolute inset-0 overflow-hidden opacity-55">
        {signalLines.map((line) => (
          <div
            key={line.id}
            className="absolute h-px bg-gradient-to-r from-transparent via-cyan-300/28 to-transparent"
            style={{
              top: line.top,
              left: "-22rem",
              width: line.width,
              transform: `rotate(${line.rotate})`,
              animation: `background-signal ${line.duration} linear infinite`,
              animationDelay: line.delay,
            }}
          />
        ))}
      </div>

      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(255,255,255,0.05),transparent_18%),radial-gradient(circle_at_76%_30%,rgba(34,211,238,0.06),transparent_22%),radial-gradient(circle_at_55%_72%,rgba(168,85,247,0.05),transparent_18%)] opacity-35"
        style={{ animation: "background-grid-pulse 14s ease-in-out infinite" }}
      />
    </div>
  );
}

export default React.memo(AnimatedBackground);

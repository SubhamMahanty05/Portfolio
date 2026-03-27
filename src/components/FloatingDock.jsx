import { Volume2, VolumeX } from "lucide-react";
import { playClickTone } from "../lib/sound";

function FloatingDock({ items, soundEnabled, onToggleSound }) {
  return (
    <div className="fixed bottom-5 left-1/2 z-40 w-[calc(100%-1.5rem)] max-w-3xl -translate-x-1/2 rounded-[2rem] border border-white/10 bg-slate-950/65 px-3 py-3 shadow-[0_0_40px_rgba(15,23,42,0.75)] backdrop-blur-2xl">
      <div className="flex items-center justify-between gap-2 overflow-x-auto">
        <div className="flex items-center gap-2">
          {items.map((item) => {
            const Icon = item.icon;

            if (item.href) {
              return (
                <a
                  key={item.label}
                  href={item.href}
                  data-cursor="interactive"
                  onClick={() => playClickTone(soundEnabled)}
                  className="group flex items-center gap-2 rounded-full border border-white/8 bg-white/5 px-3 py-2 text-xs text-slate-200 transition hover:border-cyan-300/40 hover:bg-cyan-300/10"
                >
                  <Icon className="h-4 w-4 text-cyan-300 transition group-hover:scale-110" />
                  <span className="hidden sm:inline">{item.label}</span>
                </a>
              );
            }

            return (
              <button
                key={item.label}
                type="button"
                data-cursor="interactive"
                onClick={() => {
                  playClickTone(soundEnabled);
                  item.onClick();
                }}
                className={`group flex items-center gap-2 rounded-full border px-3 py-2 text-xs transition ${
                  item.active
                    ? "border-fuchsia-300/40 bg-fuchsia-400/15 text-white"
                    : "border-white/8 bg-white/5 text-slate-200 hover:border-cyan-300/40 hover:bg-cyan-300/10"
                }`}
              >
                <Icon className="h-4 w-4 text-cyan-300 transition group-hover:scale-110" />
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          data-cursor="interactive"
          onClick={() => {
            playClickTone(soundEnabled);
            onToggleSound();
          }}
          className="ml-2 flex shrink-0 items-center gap-2 rounded-full border border-white/8 bg-white/5 px-3 py-2 text-xs text-slate-200 transition hover:border-cyan-300/40 hover:bg-cyan-300/10"
        >
          {soundEnabled ? (
            <Volume2 className="h-4 w-4 text-cyan-300" />
          ) : (
            <VolumeX className="h-4 w-4 text-slate-400" />
          )}
          <span className="hidden sm:inline">{soundEnabled ? "Sound On" : "Sound Off"}</span>
        </button>
      </div>
    </div>
  );
}

export default FloatingDock;

import { motion } from "framer-motion";
import {
  Award,
  FolderKanban,
  GraduationCap,
  Home,
  Mail,
  ScanSearch,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { key: "home", label: "Home", href: "#hero", targetId: "hero", icon: Home },
  { key: "about", label: "About", href: "#about", targetId: "about", icon: ScanSearch },
  { key: "skills", label: "Skills", href: "#skills", targetId: "skills", icon: Sparkles },
  { key: "projects", label: "Projects", href: "#projects", targetId: "projects", icon: FolderKanban },
  {
    key: "certifications",
    label: "Certifications",
    href: "#certifications",
    targetId: "certifications",
    icon: Award,
  },
  {
    key: "education",
    label: "Education",
    href: "#education",
    targetId: "education",
    icon: GraduationCap,
  },
  { key: "contact", label: "Contact", href: "#contact", targetId: "contact", icon: Mail },
];

function Navbar({ isLoading = false }) {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => {
      const element = document.getElementById(item.targetId);
      return element ? { key: item.key, element } : null;
    }).filter(Boolean);

    if (sections.length === 0) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visibleEntry?.target?.id) {
          return;
        }

        const matchingItem = NAV_ITEMS.find((item) => item.targetId === visibleEntry.target.id);
        if (matchingItem) {
          setActiveSection(matchingItem.key);
        }
      },
      {
        rootMargin: "-35% 0px -45% 0px",
        threshold: [0.01, 0.2, 0.4, 0.65],
      },
    );

    sections.forEach(({ element }) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed left-1/2 top-5 z-[99999] isolate w-[min(calc(100vw-1.25rem),90rem)]"
      style={{ x: "-50%" }}
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? -16 : 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: isLoading ? 0 : 0.2 }}
    >
      <div className="pointer-events-auto relative overflow-hidden rounded-full border border-cyan-300/32 bg-[rgba(2,8,20,0.84)] shadow-[0_16px_38px_rgba(15,23,42,0.52),0_0_0_1px_rgba(34,211,238,0.14),0_0_40px_rgba(34,211,238,0.18)] backdrop-blur-2xl">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.16),rgba(255,255,255,0.03)_34%,rgba(255,255,255,0)_100%)]" />
        <div className="pointer-events-none absolute inset-0 rounded-full border border-cyan-300/18 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_24px_rgba(56,189,248,0.16)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(34,211,238,0.18),transparent_22%),radial-gradient(circle_at_80%_50%,rgba(59,130,246,0.18),transparent_22%)]" />
        <div className="navbar-noise pointer-events-none absolute inset-0 opacity-30" />

        <nav
          aria-label="Primary navigation"
          className="relative flex items-center justify-between gap-3 px-3 py-2.5 sm:px-5 sm:py-3"
        >
          <motion.a
            href="#hero"
            data-cursor="interactive"
            whileHover={{ y: -1, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="group relative shrink-0 overflow-hidden rounded-full border border-cyan-300/24 bg-[linear-gradient(135deg,rgba(34,211,238,0.18),rgba(56,189,248,0.1),rgba(168,85,247,0.14))] px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.34em] text-white shadow-[0_0_24px_rgba(34,211,238,0.16)] sm:px-6 sm:py-3 sm:text-[0.95rem]"
          >
            <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.18),rgba(255,255,255,0)_55%)] opacity-70" />
            <span className="pointer-events-none absolute left-3 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-cyan-200/18 blur-xl transition duration-300 group-hover:bg-cyan-200/28" />
            <span className="relative bg-[linear-gradient(90deg,#ecfeff_0%,#a5f3fc_45%,#c4b5fd_100%)] bg-clip-text text-transparent">
              SUBHAM
            </span>
          </motion.a>

          <div className="flex min-w-0 items-center gap-1.5 overflow-x-auto">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.key;

              return (
                <motion.a
                  key={item.key}
                  href={item.href}
                  aria-label={item.label}
                  title={item.label}
                  data-cursor="interactive"
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActiveSection(item.key)}
                  className={`group relative flex shrink-0 items-center justify-center gap-2 rounded-full border px-3.5 py-3 text-xs font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/30 sm:px-4.5 sm:py-3.5 sm:text-sm ${
                    isActive
                      ? "border-cyan-300/40 text-white shadow-[0_0_24px_rgba(34,211,238,0.2)]"
                      : "border-transparent text-slate-300 hover:border-cyan-300/20 hover:bg-cyan-300/8 hover:text-cyan-100 hover:shadow-[0_0_18px_rgba(34,211,238,0.12)]"
                  }`}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="floating-bottom-navbar-active-pill"
                      className="absolute inset-0 rounded-full border border-cyan-300/45 bg-[linear-gradient(135deg,rgba(34,211,238,0.22),rgba(59,130,246,0.16),rgba(14,165,233,0.2))] shadow-[0_0_28px_rgba(34,211,238,0.22)]"
                      transition={{ type: "spring", stiffness: 280, damping: 28 }}
                    />
                  ) : null}
                  <Icon className={`relative z-10 h-4 w-4 transition-transform duration-300 group-hover:scale-110 ${isActive ? "text-cyan-100" : ""}`} />
                  <span className="relative z-10 hidden whitespace-nowrap sm:inline">{item.label}</span>
                </motion.a>
              );
            })}
          </div>
        </nav>
      </div>
    </motion.div>
  );
}

export default Navbar;

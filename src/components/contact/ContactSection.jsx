import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, Mail, MapPin, Sparkles, MessageSquare, FormInput } from "lucide-react";
import { useMemo, useState } from "react";
import { contactProfile } from "../../data/portfolio";
import { playClickTone } from "../../lib/sound";
import ContactForm from "./ContactForm";
import SocialLinks from "./SocialLinks";
import AIChatInterface from "./AIChatInterface";

function ContactSection({ soundEnabled }) {
  const [contactMode, setContactMode] = useState("form");
  const [inputEnergy, setInputEnergy] = useState(0.12);

  const socialItems = [
    { label: "LinkedIn", href: contactProfile.linkedin },
    { label: "GitHub", href: contactProfile.github },
    { label: "Email", href: `mailto:${contactProfile.email}` },
  ];

  const reactiveParticles = useMemo(
    () =>
      Array.from({ length: 14 }, (_, index) => ({
        id: index,
        size: 3 + (index % 3) * 2,
        left: `${8 + ((index * 11) % 84)}%`,
        top: `${10 + ((index * 17) % 76)}%`,
        duration: 6 + (index % 5) * 0.8,
      })),
    [],
  );

  return (
    <section id="contact" className="relative mx-auto max-w-7xl px-5 pb-40 pt-24 md:px-8">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ opacity: 0.26 + inputEnergy * 0.45, scale: 1 + inputEnergy * 0.03 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="absolute inset-x-0 top-8 h-52 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_36%)] blur-3xl"
        />
        <motion.div
          animate={{
            x: [`${-10 - inputEnergy * 5}%`, `${6 + inputEnergy * 12}%`, `${-10 - inputEnergy * 5}%`],
            opacity: 0.2 + inputEnergy * 0.65,
          }}
          transition={{ duration: 16, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="absolute left-[-10%] top-1/3 h-px w-[60%] bg-gradient-to-r from-transparent via-cyan-300/26 to-transparent"
        />
        <motion.div
          animate={{
            x: [`${80 - inputEnergy * 8}%`, `${44 - inputEnergy * 12}%`, `${80 - inputEnergy * 8}%`],
            opacity: 0.18 + inputEnergy * 0.52,
          }}
          transition={{ duration: 14, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="absolute top-[56%] h-px w-[48%] bg-gradient-to-r from-transparent via-fuchsia-300/20 to-transparent"
        />

        {reactiveParticles.map((particle) => (
          <motion.div
            key={particle.id}
            animate={{
              y: [0, -12 - inputEnergy * 26, 0],
              x: [0, inputEnergy * (particle.id % 2 === 0 ? 12 : -12), 0],
              opacity: [0.14, 0.28 + inputEnergy * 0.52, 0.14],
              scale: [1, 1 + inputEnergy * 0.55, 1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: particle.id * 0.12,
            }}
            className="absolute rounded-full bg-cyan-300/40 shadow-[0_0_22px_rgba(34,211,238,0.28)]"
            style={{
              width: particle.size,
              height: particle.size,
              left: particle.left,
              top: particle.top,
            }}
          />
        ))}
      </div>

      <div className="relative mb-12 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-cyan-300/14 bg-cyan-300/6 px-4 py-2 text-xs uppercase tracking-[0.32em] text-cyan-100"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Contact
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20, filter: "blur(12px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.75, delay: 0.05 }}
          className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl"
        >
          {contactProfile.heading}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base"
        >
          {contactProfile.description}
        </motion.p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
        <motion.div
          initial={{ opacity: 0, x: -18, filter: "blur(12px)" }}
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(160deg,rgba(15,23,42,0.84),rgba(15,23,42,0.58),rgba(34,211,238,0.08))] p-6 shadow-[0_0_44px_rgba(15,23,42,0.36)] backdrop-blur-2xl md:p-8"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.1),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.12),transparent_28%)]" />

          <div className="relative">
            <div className="text-xs uppercase tracking-[0.35em] text-cyan-200/75">Collaboration Interface</div>
            <h3 className="mt-4 text-3xl font-semibold text-white">Simple ways to get in touch.</h3>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Reach out for internships, collaborations, or project discussions.
            </p>

            <div className="mt-8 grid gap-4">
              <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/45 p-4">
                <div className="flex items-start gap-3">
                  <Mail className="mt-1 h-5 w-5 text-cyan-200" />
                  <div>
                    <div className="text-xs uppercase tracking-[0.28em] text-slate-400">Primary Channel</div>
                    <div className="mt-2 text-sm text-white">{contactProfile.email}</div>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/45 p-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-1 h-5 w-5 text-fuchsia-200" />
                    <div>
                      <div className="text-xs uppercase tracking-[0.28em] text-slate-400">Location</div>
                      <div className="mt-2 text-sm text-white">{contactProfile.location}</div>
                    </div>
                  </div>
                </div>

                <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/45 p-4">
                  <div className="flex items-start gap-3">
                    <CalendarDays className="mt-1 h-5 w-5 text-cyan-200" />
                    <div>
                      <div className="text-xs uppercase tracking-[0.28em] text-slate-400">Availability</div>
                      <div className="mt-2 text-sm text-white">{contactProfile.availability}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <div className="mb-4 text-xs uppercase tracking-[0.3em] text-cyan-200/75">Connect</div>
              <SocialLinks items={socialItems} onTone={() => playClickTone(soundEnabled)} />
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {contactProfile.quickActions.map((action) => (
                <motion.a
                  key={action.label}
                  href={action.href}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onMouseEnter={() => playClickTone(soundEnabled)}
                  className="inline-flex items-center gap-2 rounded-full border border-cyan-300/14 bg-cyan-300/8 px-4 py-3 text-sm text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,0.08)] transition hover:border-cyan-300/28 hover:bg-cyan-300/12"
                >
                  {action.label}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 18, filter: "blur(14px)" }}
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[2rem] border border-cyan-300/16 bg-[linear-gradient(160deg,rgba(8,47,73,0.16),rgba(15,23,42,0.88),rgba(76,29,149,0.12))] p-6 shadow-[0_0_52px_rgba(34,211,238,0.12)] backdrop-blur-2xl md:p-8"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.14),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.12),transparent_24%)]" />

          <div className="relative">
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.35em] text-cyan-200/75">Contact </div>
                <h3 className="mt-3 text-2xl font-semibold text-white">Let's Connect</h3>
              </div>

              <div className="flex rounded-full border border-white/10 bg-white/5 p-1">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    playClickTone(soundEnabled);
                    setContactMode("form");
                    setInputEnergy(0.12);
                  }}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                    contactMode === "form"
                      ? "bg-cyan-300/20 text-cyan-100 shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                      : "text-slate-400 hover:text-slate-300"
                  }`}
                >
                  <FormInput className="h-4 w-4" />
                  Form
                </motion.button>
                {/* <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    playClickTone(soundEnabled);
                    setContactMode("chat");
                    setInputEnergy(0.22);
                  }}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                    contactMode === "chat"
                      ? "bg-fuchsia-300/20 text-fuchsia-100 shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                      : "text-slate-400 hover:text-slate-300"
                  }`}
                >
                  <MessageSquare className="h-4 w-4" />
                  AI Chat
                </motion.button> */}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {contactMode === "form" ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <ContactForm
                    contactProfile={contactProfile}
                    soundEnabled={soundEnabled}
                    onActivityChange={setInputEnergy}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="chat"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <AIChatInterface soundEnabled={soundEnabled} onActivityChange={setInputEnergy} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default ContactSection;

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";

function SuccessAnimation({ email }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, filter: "blur(16px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.96, filter: "blur(12px)" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="relative overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-[linear-gradient(160deg,rgba(8,47,73,0.34),rgba(15,23,42,0.88),rgba(76,29,149,0.22))] p-8 shadow-[0_0_55px_rgba(34,211,238,0.14)] backdrop-blur-2xl"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.14),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.12),transparent_28%)]" />

      <div className="relative flex min-h-[26rem] flex-col items-center justify-center text-center">
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 180, damping: 14 }}
          className="relative grid h-24 w-24 place-items-center rounded-full border border-cyan-300/30 bg-cyan-300/10 shadow-[0_0_48px_rgba(34,211,238,0.2)]"
        >
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2.4, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full border border-cyan-300/20"
          />
          <Check className="h-10 w-10 text-cyan-100" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.45 }}
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.28em] text-cyan-100"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Transmission Complete
        </motion.div>

        <h3 className="mt-5 text-3xl font-semibold text-white">Message Sent Successfully</h3>
        <p className="mt-4 max-w-md text-sm leading-7 text-slate-300">
          Your message has been queued into the portfolio signal channel. A thoughtful reply will land at {email}.
        </p>
      </div>
    </motion.div>
  );
}

export default SuccessAnimation;

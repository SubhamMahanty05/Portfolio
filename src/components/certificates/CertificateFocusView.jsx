import { motion } from "framer-motion";
import { ExternalLink, X } from "lucide-react";

function CertificateFocusView({ certificate, onClose }) {
  return (
    <motion.div
      className="fixed inset-0 z-[99990] bg-slate-950/74 px-4 pb-6 pt-32 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="mx-auto flex h-full max-w-5xl items-center justify-center">
        <motion.div
          onClick={(event) => event.stopPropagation()}
          className="relative flex h-[min(80vh,54rem)] w-full flex-col overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-[rgba(5,12,24,0.92)] shadow-[0_24px_70px_rgba(2,6,23,0.58),0_0_36px_rgba(34,211,238,0.16)] backdrop-blur-2xl"
        >
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.02)_28%,rgba(255,255,255,0)_100%)]" />

          <div className="relative flex items-start justify-between gap-4 border-b border-white/10 px-5 py-5">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/72">{certificate.date}</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">{certificate.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{certificate.issuer}</p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:border-cyan-300/25 hover:text-cyan-100"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="relative flex-1 p-3">
            <iframe
              src={certificate.file}
              title={certificate.title}
              className="h-full w-full rounded-[1.4rem] border border-white/10 bg-white"
            />
          </div>

          <div className="relative flex items-center justify-between gap-4 border-t border-white/10 px-5 py-4">
            <div className="text-sm text-slate-400">Focused certificate preview</div>
            <a
              href={certificate.file}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-cyan-300/18 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-100 transition hover:border-cyan-300/28 hover:bg-cyan-300/14"
            >
              <ExternalLink className="h-4 w-4" />
              View Certificate
            </a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default CertificateFocusView;

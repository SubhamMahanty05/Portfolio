import { motion } from "framer-motion";
import { Eye } from "lucide-react";

function CertificateCard({ certificate, index, isActive, isSelected, onSelect, onPreview }) {
  return (
    <motion.article
      role="button"
      tabIndex={0}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.42, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onSelect(certificate)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect(certificate);
        }
      }}
      whileHover={{ y: -6, scale: isActive ? 1.06 : 0.94 }}
      className={`group relative w-[min(82vw,28rem)] shrink-0 snap-center overflow-hidden rounded-[1.8rem] border text-left backdrop-blur-2xl transition duration-300 md:w-[28rem] ${
        isSelected ? "pointer-events-none opacity-0" : ""
      }`}
      animate={{
        scale: isActive ? 1.05 : 0.9,
        opacity: isActive ? 1 : 0.58,
        y: isActive ? 0 : 8,
      }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div
        className={`absolute inset-0 rounded-[1.8rem] border ${
          isActive ? "border-cyan-300/28" : "border-cyan-300/12"
        } bg-[rgba(5,12,24,0.72)] shadow-[0_18px_42px_rgba(2,6,23,0.42)] transition duration-300 ${
          isActive
            ? "shadow-[0_0_0_1px_rgba(34,211,238,0.16),0_24px_54px_rgba(2,6,23,0.52),0_0_38px_rgba(34,211,238,0.2)]"
            : "shadow-[0_0_0_1px_rgba(34,211,238,0.06),0_14px_34px_rgba(2,6,23,0.34),0_0_18px_rgba(34,211,238,0.08)]"
        }`}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.03)_32%,rgba(255,255,255,0)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.14),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.1),transparent_26%)]" />

      <div className="relative p-4 sm:p-5">
        <div className="overflow-hidden rounded-[1.35rem] border border-white/10 bg-slate-950/60">
          <iframe
            src={certificate.file}
            title={certificate.title}
            className="pointer-events-none h-56 w-full bg-white sm:h-64"
          />
        </div>

        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-white">{certificate.title}</h3>
            <p className="mt-1 text-sm text-slate-400">{certificate.issuer}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.24em] text-cyan-200/72">{certificate.date}</p>
          </div>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onPreview(certificate);
            }}
            className="shrink-0 rounded-full border border-cyan-300/16 bg-cyan-300/10 px-3 py-2 text-xs font-medium text-cyan-100 transition hover:border-cyan-300/28 hover:bg-cyan-300/14"
          >
            <span className="inline-flex items-center gap-2">
              <Eye className="h-3.5 w-3.5" />
              View Certificate
            </span>
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export default CertificateCard;

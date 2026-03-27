import { motion } from "framer-motion";
import { Globe, Mail } from "lucide-react";

const iconMap = {
  LinkedIn: Globe,
  GitHub: Globe,
  Email: Mail,
};

function SocialLinks({ items = [], onTone }) {
  return (
    <div className="flex flex-wrap gap-3">
      {items.map((item, index) => {
        const Icon = iconMap[item.label] || Mail;

        return (
          <motion.a
            key={item.label}
            href={item.href}
            target={item.href.startsWith("http") ? "_blank" : undefined}
            rel={item.href.startsWith("http") ? "noreferrer" : undefined}
            whileHover={{ y: -3, scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            onMouseEnter={onTone}
            className="group inline-flex items-center gap-3 rounded-full border border-white/10 bg-slate-950/45 px-4 py-3 text-sm text-slate-200 shadow-[0_0_20px_rgba(34,211,238,0.06)] backdrop-blur-xl transition hover:border-cyan-300/30 hover:text-cyan-100 hover:shadow-[0_0_28px_rgba(34,211,238,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-white/[0.05] text-cyan-200 transition group-hover:bg-cyan-300/10 group-hover:text-cyan-100">
              <Icon className="h-4 w-4" />
            </span>
            <span>{item.label}</span>
          </motion.a>
        );
      })}
    </div>
  );
}

export default SocialLinks;

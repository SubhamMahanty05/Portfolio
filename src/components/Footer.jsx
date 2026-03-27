import { motion } from "framer-motion";
import { personalInfo } from "../data/portfolio";

function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="relative border-t border-white/10 bg-[#030711] px-6 py-7 text-center before:pointer-events-none before:absolute before:left-1/2 before:top-0 before:h-px before:w-40 before:-translate-x-1/2 before:bg-cyan-300/20 before:blur-md"
    >
      <p className="text-xs tracking-[0.22em] text-slate-500 sm:text-sm">
        © 2026 {personalInfo.name}. All rights reserved.
      </p>
    </motion.footer>
  );
}

export default Footer;

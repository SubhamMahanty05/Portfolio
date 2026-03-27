import { motion, useScroll, useSpring } from "framer-motion";

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-gradient-to-r from-cyan-400 via-sky-400 to-fuchsia-500 shadow-[0_0_25px_rgba(34,211,238,0.7)]"
      style={{ scaleX }}
    />
  );
}

export default ScrollProgress;

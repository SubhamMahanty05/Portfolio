import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 260, damping: 22 });
  const springY = useSpring(cursorY, { stiffness: 260, damping: 22 });
  const [pressed, setPressed] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const onMove = (event) => {
      cursorX.set(event.clientX - 12);
      cursorY.set(event.clientY - 12);
      const target = event.target;
      const interactive =
        target instanceof HTMLElement &&
        !!target.closest("a, button, input, textarea, [data-cursor='interactive']");
      setHovering(interactive);
    };

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        className="custom-cursor hidden md:block"
        style={{ translateX: springX, translateY: springY }}
        animate={{
          scale: pressed ? 0.8 : hovering ? 1.45 : 1,
          opacity: hovering ? 0.95 : 0.72,
        }}
      />
      <motion.div
        className="custom-cursor-trail hidden md:block"
        style={{ translateX: springX, translateY: springY }}
        animate={{
          scale: pressed ? 1.4 : hovering ? 2.3 : 1.8,
          opacity: hovering ? 0.35 : 0.22,
        }}
        transition={{ duration: 0.25 }}
      />
    </>
  );
}

export default CustomCursor;

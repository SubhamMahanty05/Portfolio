import { useEffect, useState } from "react";

function AnimatedCounter({ value, suffix = "", decimals = 0, duration = 900 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const start = performance.now();
    let frameId;

    const tick = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      setCount(value * progress);

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    frameId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frameId);
  }, [value, duration]);

  return `${count.toFixed(decimals)}${suffix}`;
}

export default AnimatedCounter;

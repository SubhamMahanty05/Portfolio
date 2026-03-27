import { useEffect, useRef, useState } from "react";

function useMouseParallax() {
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const frameRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const commitPointer = () => {
      frameRef.current = null;
      const nextPointer = pointerRef.current;

      setPointer((current) =>
        current.x === nextPointer.x && current.y === nextPointer.y ? current : nextPointer,
      );
      setParallax((current) => {
        const nextParallax = {
          x: nextPointer.x * 10,
          y: nextPointer.y * 8,
        };

        return current.x === nextParallax.x && current.y === nextParallax.y
          ? current
          : nextParallax;
      });
    };

    const onMove = (event) => {
      pointerRef.current = {
        x: Number((((event.clientX / window.innerWidth) * 2 - 1)).toFixed(3)),
        y: Number((((event.clientY / window.innerHeight) * 2 - 1)).toFixed(3)),
      };

      if (!frameRef.current) {
        frameRef.current = window.requestAnimationFrame(commitPointer);
      }
    };

    const onLeave = () => {
      pointerRef.current = { x: 0, y: 0 };
      if (!frameRef.current) {
        frameRef.current = window.requestAnimationFrame(commitPointer);
      }
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);

    return () => {
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return { parallax, pointer };
}

export default useMouseParallax;

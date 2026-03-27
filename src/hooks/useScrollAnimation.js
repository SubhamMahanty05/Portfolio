import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function useScrollAnimation(sectionRef, textRef, visualRef) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const progressFrameRef = useRef(null);
  const progressValueRef = useRef(0);

  useEffect(() => {
    if (!sectionRef.current) {
      return undefined;
    }

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      if (textRef.current) {
        gsap.fromTo(
          textRef.current.children,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.1,
            ease: "power3.out",
          },
        );
      }

      if (visualRef.current) {
        gsap.fromTo(
          visualRef.current,
          { opacity: 0, x: 38, scale: 0.94 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1.1,
            ease: "power3.out",
          },
        );
      }

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.45,
        onUpdate: (self) => {
          progressValueRef.current = Number(self.progress.toFixed(3));

          if (!progressFrameRef.current) {
            progressFrameRef.current = window.requestAnimationFrame(() => {
              progressFrameRef.current = null;
              setScrollProgress((current) =>
                current === progressValueRef.current ? current : progressValueRef.current,
              );
            });
          }
        },
      });
    }, sectionRef);

    return () => {
      if (progressFrameRef.current) {
        window.cancelAnimationFrame(progressFrameRef.current);
      }
      context.revert();
    };
  }, [sectionRef, textRef, visualRef]);

  return scrollProgress;
}

export default useScrollAnimation;

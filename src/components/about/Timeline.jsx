import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TimelineItem from "./TimelineItem";

function Timeline({ items, activeIndex = 0, onActiveIndexChange }) {
  const sectionRef = useRef(null);
  const lineFillRef = useRef(null);
  const itemRefs = useRef([]);
  itemRefs.current = [];

  const setItemRef = (element) => {
    if (element && !itemRefs.current.includes(element)) {
      itemRefs.current.push(element);
    }
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      gsap.fromTo(
        lineFillRef.current,
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 30%",
            end: "bottom 75%",
            scrub: true,
          },
        },
      );

      itemRefs.current.forEach((item, index) => {
        const node = item.querySelector(".timeline-node");
        const card = item.querySelector("article");

        if (node) {
          gsap.fromTo(
            node,
            {
              boxShadow: "0 0 14px rgba(34,211,238,0.2)",
              backgroundColor: "#020617",
              scale: 1,
            },
            {
              boxShadow: "0 0 24px rgba(34,211,238,0.42)",
              backgroundColor: "#67e8f9",
              scale: 1.12,
              scrollTrigger: {
                trigger: item,
                start: "top 58%",
                end: "top 44%",
                scrub: 0.8,
              },
            },
          );
        }

        if (card) {
          gsap.fromTo(
            card,
            { opacity: 0.55, y: 22, scale: 0.985 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              scrollTrigger: {
                trigger: item,
                start: "top 72%",
                end: "top 52%",
                scrub: 0.9,
              },
            },
          );
        }

        ScrollTrigger.create({
          trigger: item,
          start: "top center",
          end: "bottom center",
          onEnter: () => onActiveIndexChange?.(index),
          onEnterBack: () => onActiveIndexChange?.(index),
        });
      });
    }, sectionRef);

    return () => context.revert();
  }, [onActiveIndexChange]);

  return (
    <div ref={sectionRef} className="relative mx-auto max-w-6xl">
      <div className="absolute left-5 top-0 h-full w-px bg-gradient-to-b from-cyan-300/20 via-fuchsia-300/18 to-transparent md:left-1/2 md:-translate-x-1/2" />
      <div ref={lineFillRef} className="absolute left-5 top-0 h-full w-px bg-gradient-to-b from-cyan-300 via-sky-400 to-fuchsia-400 shadow-[0_0_22px_rgba(34,211,238,0.35)] md:left-1/2 md:-translate-x-1/2" />

      <div className="space-y-10 md:space-y-14">
        {items.map((item, index) => (
          <TimelineItem
            key={item.id}
            item={item}
            index={index}
            isActive={activeIndex === index}
            setRef={setItemRef}
          />
        ))}
      </div>
    </div>
  );
}

export default Timeline;

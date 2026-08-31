import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Workflow() {
  const triggerRef = useRef(null);
  const cardRefs = useRef([]);

  const steps = [
    {
      num: "01",
      title: "DESIGN",
      tag: "FIGMA / UI",
      desc: "Architecting responsive layouts, fluid grid systems, and structural styling logic.",
      direction: { x: -300, y: -150, rotate: -20 },
    },
    {
      num: "02",
      title: "DEVELOPMENT",
      tag: "REACT / VITE",
      desc: "Building clean, reusable component hierarchies and modular hook structures.",
      direction: { x: 300, y: -180, rotate: 18 },
    },
    {
      num: "03",
      title: "TESTING",
      tag: "QA / RESPONSIVE",
      desc: "Stress-testing layout integrity across device breakpoints and refining interactivity.",
      direction: { x: -350, y: 150, rotate: -15 },
    },
    {
      num: "04",
      title: "DEPLOYMENT",
      tag: "VERCEL / GIT",
      desc: "Optimizing bundle chunks and pushing production-ready frontend builds live.",
      direction: { x: 350, y: 180, rotate: 20 },
    },
    {
      num: "05",
      title: "MAINTENANCE",
      tag: "PERFORMANCE",
      desc: "Auditing metrics, updating packages, and refining smooth motion performance.",
      direction: { x: 0, y: 350, rotate: -10 },
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          pin: true,
          scrub: 0.8,
          start: "top top",
          end: "+=2500",
          pinSpacing: true,
          invalidateOnRefresh: true,
        },
      });

      cards.forEach((card, i) => {
        const initial = steps[i].direction;
        const finalTilt = i === 0 ? 0 : i % 2 === 0 ? 6 : -6;

        tl.fromTo(
          card,
          {
            x: initial.x,
            y: initial.y,
            scale: 0.7,
            opacity: 0,
            rotate: initial.rotate,
          },
          {
            x: 0,
            y: 0,
            scale: 1,
            opacity: 1,
            rotate: finalTilt,
            ease: "power2.out",
          },
          i * 0.5,
        );
      });
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={triggerRef}
      className="relative z-20 w-full h-screen flex flex-col justify-center items-center overflow-hidden bg-transparent px-4"
    >
      <div className="w-full max-w-6xl mx-auto mb-6 px-6">
        <h2
          className="text-4xl sm:text-7xl font-black uppercase tracking-tight text-black dark:text-white"
          style={{ fontFamily: "Impact, 'Arial Black', sans-serif" }}
        >
          MY WORKFLOW
        </h2>
      </div>

      <div className="relative w-full max-w-6xl h-[460px] sm:h-[420px] flex justify-center items-center">
        <div className="relative w-[92vw] sm:w-[800px] h-[340px] sm:h-[320px] flex justify-center items-center">
          {steps.map((step, index) => {
            return (
              <div
                key={step.num}
                ref={(el) => (cardRefs.current[index] = el)}
                className="workflow-card absolute w-full h-[340px] sm:h-[320px] rounded-[28px] border-2 border-black/80 dark:border-white/80 bg-[#faf9f5] dark:bg-[#12161c] text-black dark:text-white p-8 sm:p-10 flex flex-col justify-between shadow-2xl transition-colors duration-300 will-change-transform opacity-0"
                style={{
                  zIndex: index + 10,
                }}
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-xs font-bold tracking-widest opacity-60">
                      {step.num}.
                    </span>
                    <span className="font-mono text-[10px] px-3 py-1 rounded-full border border-black/20 dark:border-white/20 bg-black/5 dark:bg-white/10 uppercase tracking-widest">
                      {step.tag}
                    </span>
                  </div>

                  <h3
                    className="text-4xl sm:text-6xl font-black uppercase tracking-tight leading-none"
                    style={{ fontFamily: "Impact, 'Arial Black', sans-serif" }}
                  >
                    {step.title}
                  </h3>

                  <p className="font-mono text-sm sm:text-base font-light leading-relaxed max-w-xl opacity-75">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-black/15 dark:border-white/15">
                  <span className="font-mono text-[10px] uppercase tracking-widest opacity-50">
                    Frontend Pipeline Stage
                  </span>
                  <span className="font-mono text-xs font-bold tracking-widest opacity-60">
                    0{index + 1} / 05
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

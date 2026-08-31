import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../data/projects";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current?.children) {
        gsap.fromTo(
          headerRef.current.children,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      cardRefs.current.filter(Boolean).forEach((card, index) => {
        const direction = index % 2 === 0 ? -40 : 40;
        gsap.fromTo(
          card,
          { x: direction, opacity: 0, scale: 0.97 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative z-20 w-full flex flex-col items-center bg-transparent px-4 max-w-7xl mx-auto -mt-8 sm:-mt-12 mb-20"
    >
      <div
        ref={headerRef}
        className="w-full max-w-6xl mx-auto mb-10 px-6 flex flex-col md:flex-row md:items-end justify-between border-b-2 border-black dark:border-white/20 pb-4 transition-colors duration-300"
      >
        <div className="text-left flex-1 min-w-0">
          <h3 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase text-black dark:text-white leading-none">
            Stuff I Actually Built.
          </h3>
        </div>

        <div className="md:text-right shrink-0 mt-2 md:mt-0">
          <p className="text-xs sm:text-sm font-mono text-black/70 dark:text-white/70 uppercase tracking-widest max-w-[280px] md:ml-auto">
            PROVING IT WORKED ON MY LOCALHOST BEFORE SHIPPING IT ANYWHERE.
          </p>
        </div>
      </div>

      <div className="w-full max-w-6xl flex flex-col gap-8 px-6">
        {projects.map((project, index) => {
          const isFlipped = index % 2 !== 0;
          const projectNum = `0${index + 1}`;

          return (
            <div
              key={project.id}
              ref={(el) => (cardRefs.current[index] = el)}
              className="relative w-full rounded-[24px] border-2 border-black/80 dark:border-white/80 bg-[#faf9f5] dark:bg-[#12161c] text-black dark:text-white p-5 sm:p-8 flex flex-col lg:grid lg:grid-cols-12 gap-6 items-center shadow-lg transition-colors duration-300 overflow-hidden"
            >
              <div
                className={`absolute ${
                  isFlipped ? "left-6 sm:left-8" : "right-6 sm:right-8"
                } top-2 sm:top-3 text-[3.5rem] sm:text-[6rem] font-black text-black/[0.04] dark:text-white/[0.04] leading-none select-none pointer-events-none`}
                style={{
                  fontFamily: "Impact, 'Arial Black', sans-serif",
                }}
              >
                {projectNum}
              </div>

              <div
                className={`w-full lg:col-span-6 flex justify-center items-center relative z-10 py-1 order-1 ${
                  isFlipped ? "lg:order-2" : "lg:order-1"
                }`}
              >
                <div className="relative w-full max-w-[460px] aspect-[16/10] bg-[#1e2229] rounded-lg border-[3px] border-[#2c313a] shadow-xl overflow-hidden flex flex-col">
                  <div className="w-full h-4 bg-[#2c313a] flex items-center px-2.5 gap-1.5 shrink-0">
                    <div className="w-2 h-2 rounded-full bg-[#ff5f56]" />
                    <div className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
                    <div className="w-2 h-2 rounded-full bg-[#27c93f]" />
                  </div>
                  <div className="relative w-full flex-1 bg-black overflow-y-auto">
                    <img
                      src={project.previewUrl}
                      alt={project.title}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>
              </div>

              <div
                className={`w-full lg:col-span-6 flex flex-col justify-between space-y-3 sm:space-y-4 relative z-10 order-2 ${
                  isFlipped ? "lg:order-1" : "lg:order-2"
                }`}
              >
                <div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-black/15 dark:border-white/20 bg-black/[0.04] dark:bg-white/[0.06] text-black/70 dark:text-white/85 inline-block">
                    Web Application
                  </span>

                  <h4 className="text-xl sm:text-3xl font-black tracking-tight text-black dark:text-white mt-2">
                    {project.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-black/75 dark:text-white/75 font-light leading-relaxed mt-1.5 max-w-xl">
                    {project.description}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.tech.map((t, idx) => (
                      <span
                        key={idx}
                        className="tech-pill text-[10px] font-mono uppercase px-3 py-1 rounded-full border border-black/15 dark:border-white/20 bg-black/[0.03] dark:bg-white/[0.05] text-black dark:text-white font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 sm:gap-5 pt-3 border-t border-black/15 dark:border-white/15">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold uppercase tracking-wider px-4 py-2 rounded-full bg-black text-white dark:bg-white dark:text-black shadow-sm hover:opacity-85 transition-all"
                    >
                      <span>Live Demo</span>
                      <span>↗</span>
                    </a>

                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] font-mono font-bold uppercase tracking-wider underline underline-offset-4 text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white transition-colors"
                    >
                      Source Code
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

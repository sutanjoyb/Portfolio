import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../data/projects";
import { MacBookMockup } from "./DeviceMockups";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const totalProjects = projects.length;

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, totalProjects - 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  // Auto-play loop effect every 5 seconds (pauses on hover)
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalProjects);
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovered, totalProjects]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current.children, {
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
        },
        y: 25,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (sliderRef.current) {
      gsap.to(sliderRef.current, {
        xPercent: -100 * currentIndex,
        duration: 0.6,
        ease: "power3.out",
      });
    }
  }, [currentIndex]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="scroll-mt-28 mt-24 sm:mt-36 mb-16 relative z-10 w-full px-4 sm:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      <div
        ref={headerRef}
        className="flex flex-col md:flex-row md:items-end justify-between border-b-2 border-black dark:border-white/20 pb-5 mb-10 gap-4 transition-colors duration-300"
      >
        <div className="text-left flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs uppercase tracking-[0.25em] text-black dark:text-white font-mono font-bold">
              ✦ 02 FEATURED ARCHIVE
            </span>
          </div>
          <h3 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase text-black dark:text-white leading-none">
            Stuff I Actually Built.
          </h3>
        </div>

        <div className="md:text-right shrink-0">
          <p className="text-xs sm:text-sm font-mono text-black/70 dark:text-white/70 uppercase tracking-widest max-w-[280px] md:ml-auto">
            PROVING IT WORKED ON MY LOCALHOST BEFORE SHIPPING IT ANYWHERE.
          </p>
        </div>
      </div>

      <div
        className="relative flex items-center gap-1 sm:gap-6 w-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="shrink-0 w-6 sm:w-12 flex items-center justify-center z-20">
          {currentIndex > 0 && (
            <div className="relative group">
              <div className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-black dark:bg-white text-white dark:text-black font-mono text-[10px] font-bold uppercase tracking-wider opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 pointer-events-none shadow-lg whitespace-nowrap z-30 hidden sm:block">
                Previous
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-solid border-t-black dark:border-t-white border-t-4 border-x-transparent border-x-4 border-b-0" />
              </div>

              <button
                onClick={handlePrev}
                aria-label="Previous Project"
                className="group/btn relative w-8 h-8 sm:w-12 sm:h-12 rounded-full border-2 border-black dark:border-white/30 bg-[#faf9f5] dark:bg-[#12161c] text-black dark:text-white font-bold flex items-center justify-center text-sm sm:text-lg overflow-hidden shadow-md hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                <span className="absolute inset-0 bg-black dark:bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10 group-hover/btn:text-white dark:group-hover/btn:text-black transition-colors duration-300">
                  ←
                </span>
              </button>
            </div>
          )}
        </div>

        <div className="overflow-hidden w-full flex-1">
          <div ref={sliderRef} className="flex w-full">
            {projects.map((project, index) => {
              const isFlipped = index % 2 !== 0;

              return (
                <div key={project.id} className="w-full shrink-0 px-1">
                  <div className="relative rounded-2xl sm:rounded-[32px] border-2 bg-[#fdfdfc] dark:bg-[#12161c] p-4 sm:p-10 lg:p-12 transition-all duration-300 overflow-hidden flex flex-col lg:grid lg:grid-cols-12 gap-5 sm:gap-8 lg:gap-12 items-center border-black/15 dark:border-white/20 shadow-sm">
                    <div
                      className={`absolute ${
                        isFlipped ? "left-4 sm:left-10" : "right-4 sm:right-10"
                      } top-3 sm:top-4 text-[3.5rem] sm:text-[7rem] font-black text-black/[0.04] dark:text-white/[0.04] leading-none select-none pointer-events-none`}
                      style={{
                        fontFamily: "Impact, 'Arial Black', sans-serif",
                      }}
                    >
                      0{index + 1}
                    </div>

                    <div
                      className={`w-full lg:col-span-6 flex justify-center items-center py-1 sm:py-4 relative z-10 order-1 ${
                        isFlipped ? "lg:order-2" : "lg:order-1"
                      }`}
                    >
                      <div className="relative w-full flex justify-center items-center scale-90 sm:scale-100 max-h-[180px] sm:max-h-none overflow-hidden">
                        <MacBookMockup
                          imageUrl={project.previewUrl}
                          title={project.title}
                        />
                      </div>
                    </div>

                    <div
                      className={`w-full lg:col-span-6 flex flex-col justify-between space-y-3 sm:space-y-6 relative z-10 order-2 ${
                        isFlipped ? "lg:order-1" : "lg:order-2"
                      }`}
                    >
                      <div>
                        <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border border-black/15 dark:border-white/20 bg-black/[0.04] dark:bg-white/[0.06] text-black/70 dark:text-white/85 inline-block">
                          Web Application
                        </span>

                        <h4 className="text-xl sm:text-4xl md:text-5xl font-black tracking-tight text-black dark:text-white mt-2 sm:mt-3">
                          {project.title}
                        </h4>

                        <p className="text-xs sm:text-base text-black/75 dark:text-white/75 font-light leading-relaxed mt-2 sm:mt-3 max-w-xl">
                          {project.description}
                        </p>
                      </div>

                      <div>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-6">
                          {project.tech.map((t, idx) => (
                            <span
                              key={idx}
                              className="tech-pill text-[10px] sm:text-xs font-mono uppercase px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-black/15 dark:border-white/20 bg-black/[0.03] dark:bg-white/[0.05] text-black dark:text-white font-medium"
                            >
                              {t}
                            </span>
                          ))}
                        </div>

                        <div className="flex flex-wrap items-center gap-3 sm:gap-6 pt-3 sm:pt-4 border-t border-black/10 dark:border-white/10">
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-mono font-semibold uppercase tracking-wider px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-black text-white dark:bg-white dark:text-black shadow-sm hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all"
                          >
                            <span>Live Demo</span>
                            <span>↗</span>
                          </a>

                          <a
                            href={project.github}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider underline underline-offset-4 text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white transition-colors"
                          >
                            Source Code
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="shrink-0 w-6 sm:w-12 flex items-center justify-center z-20">
          {currentIndex < totalProjects - 1 && (
            <div className="relative group">
              <div className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-black dark:bg-white text-white dark:text-black font-mono text-[10px] font-bold uppercase tracking-wider opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 pointer-events-none shadow-lg whitespace-nowrap z-30 hidden sm:block">
                Next
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-solid border-t-black dark:border-t-white border-t-4 border-x-transparent border-x-4 border-b-0" />
              </div>

              <button
                onClick={handleNext}
                aria-label="Next Project"
                className="group/btn relative w-8 h-8 sm:w-12 sm:h-12 rounded-full border-2 border-black dark:border-white/30 bg-[#faf9f5] dark:bg-[#12161c] text-black dark:text-white font-bold flex items-center justify-center text-sm sm:text-lg overflow-hidden shadow-md hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                <span className="absolute inset-0 bg-black dark:bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10 group-hover/btn:text-white dark:group-hover/btn:text-black transition-colors duration-300">
                  →
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../data/projects";
import { MacBookMockup, IPhoneMockup } from "./DeviceMockups";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardRefs = useRef([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleMouseMove = (e, index) => {
    const card = cardRefs.current[index];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

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

      cardRefs.current.forEach((card) => {
        if (!card) return;
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
          y: 40,
          opacity: 0,
          duration: 0.65,
          ease: "power3.out",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="mt-24 sm:mt-36 mb-16 relative z-10 w-full px-4 sm:px-8 max-w-7xl mx-auto"
    >
      <div
        ref={headerRef}
        className="flex flex-col md:flex-row md:items-end justify-between border-b-2 border-black dark:border-white/20 pb-5 mb-12 gap-4 transition-colors duration-300"
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

      <div className="space-y-12">
        {projects.map((project, index) => {
          const isHovered = hoveredIndex === index;
          const isSiblingHovered = hoveredIndex !== null && !isHovered;
          const isFlipped = index % 2 !== 0;

          return (
            <div
              key={project.id}
              ref={(el) => (cardRefs.current[index] = el)}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`group relative rounded-[28px] sm:rounded-[32px] border-2 bg-[#fdfdfc] dark:bg-[#12161c] p-6 sm:p-10 lg:p-12 transition-all duration-300 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center will-change-transform ${
                isHovered
                  ? "border-black dark:border-white shadow-2xl scale-[1.008] z-20"
                  : "border-black/15 dark:border-white/20 shadow-sm hover:border-black/40 dark:hover:border-white/40"
              } ${isSiblingHovered ? "opacity-35 blur-[0.2px]" : "opacity-100"}`}
            >
              <div
                className="pointer-events-none absolute inset-0 rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(550px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.03), transparent 65%)`,
                }}
              />

              <div
                className={`absolute ${
                  isFlipped ? "left-6 sm:left-10" : "right-6 sm:right-10"
                } top-4 text-[4rem] sm:text-[7rem] font-black text-black/[0.04] dark:text-white/[0.04] leading-none select-none pointer-events-none`}
                style={{ fontFamily: "Impact, 'Arial Black', sans-serif" }}
              >
                0{index + 1}
              </div>

              <div
                className={`lg:col-span-6 flex justify-center items-center py-4 relative z-10 ${
                  isFlipped ? "order-2 lg:order-2" : "order-2 lg:order-1"
                }`}
              >
                <div className="relative w-full flex justify-center items-center">
                  {project.deviceType === "iphone" ? (
                    <IPhoneMockup
                      imageUrl={project.previewUrl}
                      title={project.title}
                    />
                  ) : (
                    <MacBookMockup
                      imageUrl={project.previewUrl}
                      title={project.title}
                    />
                  )}
                </div>
              </div>

              <div
                className={`lg:col-span-6 flex flex-col justify-between space-y-6 relative z-10 ${
                  isFlipped ? "order-1 lg:order-1" : "order-1 lg:order-2"
                }`}
              >
                <div>
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-black/15 dark:border-white/20 bg-black/[0.04] dark:bg-white/[0.06] text-black/70 dark:text-white/80 inline-block">
                    {project.deviceType === "iphone"
                      ? "Mobile Interface"
                      : "Web Application"}
                  </span>

                  <h4 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-black dark:text-white mt-3">
                    {project.title}
                  </h4>

                  <p className="text-sm sm:text-base text-black/75 dark:text-white/75 font-light leading-relaxed mt-3 max-w-xl">
                    {project.description}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((t, idx) => (
                      <span
                        key={idx}
                        className="tech-pill text-xs font-mono uppercase px-3.5 py-1.5 rounded-full border border-black/15 dark:border-white/20 bg-black/[0.03] dark:bg-white/[0.05] text-black dark:text-white font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-4 border-t border-black/10 dark:border-white/10">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2.5 text-xs font-mono font-semibold uppercase tracking-wider px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-black text-white dark:bg-white dark:text-black shadow-sm hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all"
                    >
                      <span>Live Demo</span>
                      <span>↗</span>
                    </a>

                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-mono font-bold uppercase tracking-wider underline underline-offset-4 text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white transition-colors"
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

import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../data/projects";

gsap.registerPlugin(ScrollTrigger);

export default function LatestProjects() {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = sectionRef.current;
      const amountToScroll = track.scrollWidth - window.innerWidth;

      const scrollTween = gsap.to(track, {
        x: -amountToScroll,
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          pin: true,
          scrub: 0.8,
          start: "top top",
          end: () => `+=${amountToScroll}`,
          pinSpacing: true,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      return () => {
        scrollTween.kill();
      };
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={triggerRef}
      className="bg-transparent relative z-20 w-screen h-screen flex flex-col justify-center overflow-hidden left-1/2 -translate-x-1/2"
    >
      {/* Section Header */}
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-12 mb-8 flex items-end justify-between flex-shrink-0">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-black/40 dark:text-white/40 font-bold block mb-2">
            ✦ RECENT WORK
          </span>
          <h2
            className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-black dark:text-white"
            style={{ fontFamily: "Impact, 'Arial Black', sans-serif" }}
          >
            LATEST BUILDS & PROJECTS
          </h2>
        </div>
        <Link
          to="/projects"
          className="font-mono text-xs uppercase tracking-wider font-bold underline underline-offset-4 text-black dark:text-white hover:opacity-60 transition-opacity"
        >
          View All Projects ↗
        </Link>
      </div>

      {/* Horizontal Scrolling Track */}
      <div className="w-full flex overflow-visible items-center">
        <div
          ref={sectionRef}
          className="flex gap-10 pl-[100vw] pr-[100vw] will-change-transform items-center"
        >
          {projects.map((project, index) => {
            const paddedNum = String(index + 1).padStart(2, "0");

            return (
              <div
                key={project.id || paddedNum}
                className="w-[450px] sm:w-[480px] h-[440px] flex-shrink-0 bg-transparent border-2 border-black/15 dark:border-white/20 p-8 sm:p-10 rounded-[36px] flex flex-col justify-between group hover:border-black dark:hover:border-white transition-colors duration-300 shadow-2xl"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-xs font-bold text-black/40 dark:text-white/40 tracking-widest">
                      {paddedNum}
                    </span>
                    <span className="font-mono text-xs px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 text-black dark:text-white">
                      {project.tech?.[0] || "Web Application"}
                    </span>
                  </div>
                  <h3
                    className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-black dark:text-white group-hover:translate-x-1 transition-transform"
                    style={{ fontFamily: "Impact, 'Arial Black', sans-serif" }}
                  >
                    {project.title}
                  </h3>
                  <p className="font-mono text-sm text-black/70 dark:text-white/70 font-light leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>

                <div className="pt-6 flex items-center justify-between border-t border-black/10 dark:border-white/10 mt-4">
                  <span className="font-mono text-xs uppercase tracking-widest text-black/50 dark:text-white/50">
                    Explore Case Study
                  </span>
                  <Link
                    to="/projects"
                    className="w-12 h-12 rounded-full border border-black/20 dark:border-white/20 flex items-center justify-center text-black dark:text-white group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors"
                  >
                    ↗
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroDetails() {
  const containerRef = useRef(null);
  const rowRefs = useRef([]);
  const btnRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      rowRefs.current.forEach((el, index) => {
        if (!el) return;
        const direction = index % 2 === 0 ? -150 : 150;

        gsap.fromTo(
          el,
          { x: direction, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      if (btnRef.current) {
        gsap.fromTo(
          btnRef.current,
          { y: 40, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: btnRef.current,
              start: "top 90%",
            },
          },
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const sections = [
    {
      num: "01",
      title: "BUILDING THINGS THAT ACTUALLY MAKE SENSE.",
      desc: "I don't just write code to fill up lines; I like to figure out how people actually interact with websites and build interfaces that feel smooth, fast, and completely natural to use.",
      align: "text-left items-start mr-auto lg:max-w-2xl",
    },
    {
      num: "02",
      title: "FROM FRONTEND PIXEL TO BACKEND LOGIC.",
      desc: "Whether I'm tweaking CSS animations with Tailwind and Framer Motion or structuring secure FastAPI endpoints, I care about what's happening both on the screen and behind the scenes.",
      align: "text-right items-end ml-auto lg:max-w-2xl",
    },
    {
      num: "03",
      title: "ALWAYS LEARNING, ALWAYS BREAKING STUFF.",
      desc: "Half my day is spent building cool features, and the other half is figuring out why a semicolon broke the entire build. Honestly wouldn't trade it for anything else.",
      align: "text-left items-start mr-auto lg:max-w-2xl",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-24 sm:py-36 space-y-32 sm:space-y-48 relative z-10 overflow-hidden"
    >
      {sections.map((item, index) => (
        <div
          key={item.num}
          ref={(el) => (rowRefs.current[index] = el)}
          className={`flex flex-col ${item.align} relative z-10 space-y-4`}
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-black/40 dark:text-white/40 font-bold block">
            ✦ {item.num}
          </span>

          <h2
            className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter text-black dark:text-white leading-[1.05]"
            style={{ fontFamily: "Impact, 'Arial Black', sans-serif" }}
          >
            {item.title}
          </h2>

          <p className="font-mono text-sm sm:text-lg text-black/70 dark:text-white/70 font-light leading-relaxed max-w-xl">
            {item.desc}
          </p>
        </div>
      ))}

      {/* Styled Interactive 'Explore My Journey' Button */}
      <div ref={btnRef} className="flex justify-center pt-16">
        <Link
          to="/about"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group relative inline-flex items-center gap-6 px-10 py-5 rounded-2xl border-2 border-black dark:border-white bg-black dark:bg-white text-white dark:text-black font-mono text-sm sm:text-base uppercase tracking-widest font-black shadow-[6px_6px_0px_0px_rgba(16,185,129,0.9)] hover:shadow-none hover:translate-x-1.5 hover:translate-y-1.5 transition-all duration-200 cursor-pointer overflow-hidden"
        >
          <span className="absolute inset-0 bg-emerald-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
          <span className="relative z-10">Dive Into My Story</span>
          <span className="relative z-10 w-8 h-8 rounded-full bg-white/20 dark:bg-black/10 flex items-center justify-center text-xs group-hover:translate-x-1 transition-transform">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}

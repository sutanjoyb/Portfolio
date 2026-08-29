import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./Navbar";

gsap.registerPlugin(ScrollTrigger);

export default function Hero({
  roles = [
    "Full Stack Developer",
    "Professional Div Centerer",
    "Turns Coffee Into Bugs",
  ],
  imageSrc = "",
}) {
  const codeLetters = "<h1>Hello, World!</h1>".split("");
  const nameLetters = "I'M SUTANJOY.".split("");

  const codeLettersRef = useRef([]);
  const nameLettersRef = useRef([]);
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const rolesRef = useRef(null);
  const socialButtonsRef = useRef([]);

  const handleCodeLetterHover = (el) => {
    if (!el) return;
    gsap
      .timeline()
      .to(el, {
        y: -6,
        color: "#059669",
        scale: 1.12,
        skewX: gsap.utils.random(-15, 15),
        duration: 0.1,
        ease: "power2.out",
      })
      .to(el, {
        y: 0,
        color: "inherit",
        scale: 1,
        skewX: 0,
        duration: 0.35,
        ease: "power3.out",
      });
  };

  const handleNameLetterHover = (el) => {
    if (!el) return;
    gsap
      .timeline()
      .to(el, {
        y: -25,
        rotate: gsap.utils.random(-12, 12),
        scale: 1.2,
        duration: 0.15,
        ease: "power2.out",
      })
      .to(el, {
        y: 0,
        rotate: 0,
        scale: 1,
        duration: 0.6,
        ease: "elastic.out(1.4, 0.35)",
      });
  };

  const handleSocialMouseMove = (e, index) => {
    const btn = socialButtonsRef.current[index];
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    gsap.to(btn, {
      x: x * 0.35,
      y: y * 0.35,
      rotate: x * 0.1,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  const handleSocialMouseLeave = (index) => {
    const btn = socialButtonsRef.current[index];
    if (!btn) return;
    gsap.to(btn, {
      x: 0,
      y: 0,
      rotate: 0,
      duration: 0.5,
      ease: "elastic.out(1.2, 0.4)",
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const allLetters = [
        ...codeLettersRef.current.filter(Boolean),
        ...nameLettersRef.current.filter(Boolean),
      ];

      gsap.fromTo(
        allLetters,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.025,
          duration: 0.6,
          ease: "power3.out",
        },
      );

      if (rolesRef.current) {
        gsap.fromTo(
          rolesRef.current.children,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.6,
            ease: "power3.out",
            delay: 0.15,
          },
        );
      }

      gsap.fromTo(
        socialButtonsRef.current.filter(Boolean),
        { scale: 0.4, opacity: 0, y: 20 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.6,
          ease: "back.out(2.2)",
          delay: 0.25,
        },
      );

      if (headlineRef.current && containerRef.current) {
        gsap.to(headlineRef.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
          y: -20,
          opacity: 0.35,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/sutanjoyb",
      icon: (
        <svg
          className="w-4 h-4 fill-current transition-transform duration-300 group-hover:scale-110"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/bsutanjoy",
      icon: (
        <svg
          className="w-4 h-4 fill-current transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110"
          viewBox="0 0 24 24"
        >
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 0 0 1.64-1.64 1.64 1.64 0 1 0-3.28 0 1.64 1.64 0 0 0 1.64 1.64m1.39 9.74v-8.37H5.07v8.37h2.78z" />
        </svg>
      ),
    },
    {
      name: "X",
      href: "https://twitter.com/sutanjoyb",
      icon: (
        <svg
          className="w-4 h-4 fill-current transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
          viewBox="0 0 24 24"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "https://instagram.com/_sutanjoy.here",
      icon: (
        <svg
          className="w-4 h-4 fill-none stroke-current stroke-2 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
          viewBox="0 0 24 24"
        >
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      ),
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen min-h-[560px] max-h-[900px] flex flex-col justify-between select-none p-0 m-0 overflow-hidden"
    >
      <Navbar name="Sutanjoy Bhattacharjee" />

      <div
        ref={headlineRef}
        className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none px-4 pt-10"
      >
        <div className="flex flex-col items-center justify-center text-center w-full max-w-4xl">
          <div className="flex flex-wrap items-center justify-center font-mono font-bold text-black/70 text-[clamp(1rem,3.8vw,3.2rem)] tracking-normal pointer-events-auto">
            {codeLetters.map((char, i) => {
              const isTag = char === "<" || char === ">" || char === "/";
              return (
                <span
                  key={`code-${i}`}
                  ref={(el) => (codeLettersRef.current[i] = el)}
                  onMouseEnter={() =>
                    handleCodeLetterHover(codeLettersRef.current[i])
                  }
                  className={`inline-block transition-colors duration-150 will-change-transform cursor-pointer ${
                    isTag ? "text-black/40" : "text-black"
                  }`}
                  style={{ marginRight: char === " " ? "0.25em" : "0" }}
                >
                  {char}
                </span>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-center font-black uppercase text-black text-[clamp(2.4rem,9.5vw,9.5rem)] leading-none tracking-tighter pointer-events-auto mt-2">
            {nameLetters.map((char, i) => (
              <span
                key={`name-${i}`}
                ref={(el) => (nameLettersRef.current[i] = el)}
                onMouseEnter={() =>
                  handleNameLetterHover(nameLettersRef.current[i])
                }
                className="inline-block transition-colors duration-150 will-change-transform cursor-pointer hover:text-black/80 opacity-100"
                style={{
                  fontFamily:
                    "Impact, 'Arial Black', -apple-system, sans-serif",
                  marginRight: char === " " ? "0.25em" : "0",
                }}
              >
                {char}
              </span>
            ))}
          </div>

          <p className="font-mono text-xs sm:text-sm text-black/60 uppercase tracking-widest mt-3 pointer-events-auto max-w-xs sm:max-w-md px-2">
            I write code that works on the first try (rarely) and spend the rest
            of the day asking why.
          </p>
        </div>
      </div>

      <div className="z-30 relative flex flex-col sm:flex-row justify-between items-center sm:items-end w-full mt-auto px-4 sm:px-8 pb-4 sm:pb-8 gap-3 pointer-events-auto">
        <div className="flex items-center gap-2.5">
          {socialLinks.map((item, idx) => (
            <div key={item.name} className="relative group">
              <a
                ref={(el) => (socialButtonsRef.current[idx] = el)}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                onMouseMove={(e) => handleSocialMouseMove(e, idx)}
                onMouseLeave={() => handleSocialMouseLeave(idx)}
                className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-black/20 bg-white/90 backdrop-blur-sm flex items-center justify-center text-black shadow-sm transition-colors duration-200 hover:bg-black hover:text-white hover:border-black active:scale-95 will-change-transform"
                aria-label={item.name}
              >
                {item.icon}
              </a>
              <span className="absolute left-1/2 -translate-x-1/2 -top-8 px-2 py-0.5 bg-black text-white text-[10px] font-mono rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-200 whitespace-nowrap shadow-md hidden sm:block">
                {item.name}
              </span>
            </div>
          ))}
        </div>

        <div
          ref={rolesRef}
          className="flex flex-col items-center sm:items-end text-center sm:text-right"
        >
          {roles.map((role, idx) => (
            <h2
              key={idx}
              className="text-xs sm:text-xl md:text-2xl font-light tracking-tight leading-snug text-black"
            >
              {role}
            </h2>
          ))}
        </div>
      </div>
    </section>
  );
}

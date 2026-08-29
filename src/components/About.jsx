import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import profileImg from "../assets/profile.jpg";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const contentRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const imageRef = useRef(null);
  const glareRef = useRef(null);
  const marqueeTrackRef = useRef(null);
  const marqueeTweenRef = useRef(null);

  const skills = [
    {
      name: "HTML5",
      svg: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 17.56l4.07-1.13.56-6.28H7.37l.21 2.37h5.92l-.19 2.15-2.31.62-2.31-.62-.15-1.68H6.28l.29 3.51L12 17.56zM3 2l1.64 18.45L12 23l7.36-2.55L21 2H3zm15.75 6H5.25L4.8 4h14.4l-.45 4z" />
        </svg>
      ),
    },
    {
      name: "CSS3",
      svg: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 2l1.64 18.45L12 23l7.36-2.55L21 2H3zm15.75 6l-.45 4h-8.8l.21 2.37h8.38l-.56 6.28L12 21.78l-4.57-1.27-.29-3.51h2.26l.15 1.68 2.31.62 2.31-.62.19-2.15H5.82L5.25 4h13.95l-.45 4z" />
        </svg>
      ),
    },
    {
      name: "Bootstrap",
      svg: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4.5 3h15A1.5 1.5 0 0 1 21 4.5v15a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 19.5v-15A1.5 1.5 0 0 1 4.5 3zm5.75 4.5v9h3.75c1.75 0 2.75-.85 2.75-2.25 0-1-.6-1.75-1.5-2 .75-.3 1.25-.95 1.25-1.85 0-1.3-.95-2.9-2.75-2.9h-3.5zm2 1.75h1.3c.75 0 1.2.35 1.2 1 0 .7-.45 1.05-1.2 1.05h-1.3v-2.05zm0 3.75h1.55c.85 0 1.45.4 1.45 1.15 0 .8-.6 1.2-1.45 1.2h-1.55V13z" />
        </svg>
      ),
    },
    {
      name: "Tailwind CSS",
      svg: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.335 6.182 14.974 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.335 13.382 8.974 12 6.001 12z" />
        </svg>
      ),
    },
    {
      name: "JavaScript",
      svg: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 3h18v18H3V3zm13.72 13.5c.84 0 1.53-.41 1.95-1.07.13-.21.05-.48-.16-.6l-.91-.55c-.19-.11-.44-.06-.57.13-.23.36-.57.59-.97.59-.72 0-1.19-.48-1.19-1.25V9.45c0-.28-.22-.5-.5-.5h-1.3c-.28 0-.5.22-.5.5v4.39c0 1.9 1.13 3.16 2.95 3.16zm-5.78-.18c.8 0 1.34-.36 1.71-.85.12-.16.1-.38-.05-.51l-.81-.66c-.16-.13-.4-.11-.53.05-.2.25-.45.42-.77.42-.51 0-.84-.28-.84-.68 0-.44.33-.61 1.09-.92.99-.41 1.69-.97 1.69-2.06 0-1.33-1.04-2.26-2.52-2.26-1.1 0-1.89.44-2.36 1.19-.11.18-.07.41.09.53l.87.64c.16.12.39.09.52-.07.24-.31.54-.49.88-.49.43 0 .7.22.7.54 0 .37-.28.52-.94.79-1.13.46-1.84.97-1.84 2.2 0 1.45 1.08 2.31 2.58 2.31z" />
        </svg>
      ),
    },
    {
      name: "React.js",
      svg: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="2" />
          <ellipse
            cx="12"
            cy="12"
            rx="9"
            ry="3.8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <ellipse
            cx="12"
            cy="12"
            rx="9"
            ry="3.8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            transform="rotate(60 12 12)"
          />
          <ellipse
            cx="12"
            cy="12"
            rx="9"
            ry="3.8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            transform="rotate(120 12 12)"
          />
        </svg>
      ),
    },
    {
      name: "Responsive Web Design",
      svg: (
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
    },
    {
      name: "C",
      svg: (
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M18 10a6 6 0 0 0-12 0v4a6 6 0 0 0 12 0" />
        </svg>
      ),
    },
    {
      name: "C++",
      svg: (
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
    },
    {
      name: "Python",
      svg: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.91 2C6.93 2 7.25 4.16 7.25 4.16L7.26 6.39H12v.74H4.82S2 6.81 2 11.85c0 5.04 2.47 4.87 2.47 4.87h1.47v-2.07s-.08-2.47 2.43-2.47h4.86s2.35.04 2.35-2.27V4.28S15.93 2 11.91 2zm-2.08 1.47c.45 0 .82.37.82.82s-.37.82-.82.82-.82-.37-.82-.82.37-.82.82-.82zm2.26 18.53c4.98 0 4.66-2.16 4.66-2.16l-.01-2.23H12v-.74h7.18s2.82.32 2.82-4.72c0-5.04-2.47-4.87-2.47-4.87h-1.47v2.07s.08 2.47-2.43 2.47H10.9s-2.35-.04-2.35 2.27v5.63s-.35 2.28 3.67 2.28zm2.08-1.47c-.45 0-.82-.37-.82-.82s.37-.82.82-.82.82.37.82.82-.37.82-.82.82z" />
        </svg>
      ),
    },
    {
      name: "Java",
      svg: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8.85 16.84c0 .03-.02.06-.02.09 1.05.3 2.22.46 3.44.46s2.39-.16 3.44-.46c0-.03-.02-.06-.02-.09-1.04.28-2.2.43-3.42.43s-2.38-.15-3.42-.43zm7.04-3.1c-.05-.03-.1-.05-.16-.07-.98.32-2.19.51-3.48.51s-2.5-.19-3.48-.51c-.06.02-.11.04-.16.07.96.35 2.2.57 3.64.57s2.68-.22 3.64-.57zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.67 7.02c.38.31.57.7.57 1.18 0 .8-.56 1.48-1.68 2.05-.12.06-.25.12-.39.18-.32.14-.66.26-1.01.37-1.12-.34-1.89-.9-1.89-1.58 0-.4.27-.75.76-1.05.23-.14.51-.27.84-.39.54-.19 1.15-.31 1.8-.46.33-.08.67-.18 1-.3zm-3.34 7.62c-1.82 0-3.3-1.48-3.3-3.3 0-.8.29-1.54.77-2.11-.12.3-.18.63-.18.97 0 1.44 1.17 2.61 2.61 2.61.54 0 1.04-.16 1.46-.44-.45 1.34-1.72 2.27-3.36 2.27z" />
        </svg>
      ),
    },
    {
      name: "MySQL",
      svg: (
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
      ),
    },
    {
      name: "Supabase",
      svg: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21.362 9.354H12V.316a.316.316 0 0 0-.549-.211L2.247 11.233a.856.856 0 0 0 .614 1.413H12v9.038a.316.316 0 0 0 .549.211l9.204-11.128a.856.856 0 0 0-.614-1.413h.223z" />
        </svg>
      ),
    },
    {
      name: "Git",
      svg: (
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="18" cy="18" r="3" />
          <circle cx="6" cy="6" r="3" />
          <path d="M13 6h3a2 2 0 0 1 2 2v7" />
          <line x1="6" y1="9" x2="6" y2="21" />
        </svg>
      ),
    },
    {
      name: "GitHub",
      svg: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      ),
    },
  ];

  const milestones = [
    {
      year: "2026 — Present",
      title: "Open Source Contributor & Reviewer",
      desc: "Contributing to collaborative repositories, conducting code audits, identifying security vulnerabilities, and refining software architectures.",
    },
    {
      year: "2025 — Present",
      title: "Full-Stack & Frontend Engineering",
      desc: "Architecting interactive web applications, modular component libraries, and performant user experiences.",
    },
    {
      year: "Core Focus",
      title: "Systems & Visual Development",
      desc: "Bridging algorithmic problem-solving with smooth, kinetic frontend design.",
    },
  ];

  const handleMouseEnter = () => {
    if (marqueeTweenRef.current) marqueeTweenRef.current.pause();
  };

  const handleMouseLeave = () => {
    if (marqueeTweenRef.current) marqueeTweenRef.current.play();
  };

  const handlePhotoMouseMove = (e) => {
    const card = imageWrapperRef.current;
    if (!card) return;

    const { left, top, width, height } = card.getBoundingClientRect();
    const x = (e.clientX - (left + width / 2)) / (width / 2);
    const y = (e.clientY - (top + height / 2)) / (height / 2);

    gsap.to(card, {
      rotateY: x * 6,
      rotateX: -y * 6,
      transformPerspective: 1200,
      ease: "power2.out",
      duration: 0.25,
    });

    if (imageRef.current) {
      gsap.to(imageRef.current, {
        scale: 1.04,
        x: x * 4,
        y: y * 4,
        duration: 0.25,
        ease: "power2.out",
      });
    }

    if (glareRef.current) {
      gsap.to(glareRef.current, {
        opacity: 0.35,
        x: e.clientX - left - width / 2,
        y: e.clientY - top - height / 2,
        duration: 0.2,
        ease: "power2.out",
      });
    }
  };

  const handlePhotoMouseLeave = () => {
    if (imageWrapperRef.current) {
      gsap.to(imageWrapperRef.current, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.6,
        ease: "elastic.out(1.2, 0.4)",
      });
    }

    if (imageRef.current) {
      gsap.to(imageRef.current, {
        scale: 1,
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      });
    }

    if (glareRef.current) {
      gsap.to(glareRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      if (headerRef.current?.children) {
        tl.fromTo(
          headerRef.current.children,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power3.out" },
        );
      }

      if (imageWrapperRef.current) {
        tl.fromTo(
          imageWrapperRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.3",
        );
      }

      if (contentRef.current?.children) {
        tl.fromTo(
          contentRef.current.children,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.12,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.5",
        );
      }

      const marquee = marqueeTrackRef.current;
      if (marquee) {
        marqueeTweenRef.current = gsap.to(marquee, {
          xPercent: -50,
          repeat: -1,
          duration: 32,
          ease: "none",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="mt-28 sm:mt-36 mb-16 relative z-10 w-full"
    >
      <div
        ref={headerRef}
        className="flex flex-col md:flex-row md:items-end justify-between border-b-2 border-black pb-5 mb-12 gap-4"
      >
        <div className="text-left">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs uppercase tracking-[0.25em] text-black font-mono font-bold">
              ✦ 01 DOSSIER
            </span>
          </div>
          <h3 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter uppercase text-black leading-none">
            Want The Lore, Huh?
          </h3>
        </div>

        <div className="md:text-right">
          <p className="text-xs sm:text-sm font-mono text-black/70 uppercase tracking-widest max-w-xs md:ml-auto">
            Turning coffee into code & auditing breaking bugs since day one.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        <div className="lg:col-span-5 flex flex-col justify-stretch">
          <div
            ref={imageWrapperRef}
            onMouseMove={handlePhotoMouseMove}
            onMouseLeave={handlePhotoMouseLeave}
            className="group relative w-full h-full min-h-[460px] rounded-3xl overflow-hidden will-change-transform cursor-pointer shadow-lg bg-[#e5e4de] border border-black/10"
            style={{ transformStyle: "preserve-3d" }}
          >
            <img
              ref={imageRef}
              src={profileImg}
              alt="Sutanjoy Bhattacharjee"
              className="w-full h-full object-cover object-center grayscale-[20%] contrast-105 group-hover:grayscale-0 group-hover:contrast-110 transition-all duration-500 will-change-transform"
            />

            <div
              ref={glareRef}
              className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/50 to-white/0 opacity-0 pointer-events-none rounded-3xl transition-opacity duration-300"
            />
          </div>
        </div>

        <div
          ref={contentRef}
          className="lg:col-span-7 flex flex-col justify-between space-y-8 lg:pl-2"
        >
          <div>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-black leading-snug">
              I build{" "}
              <span className="bg-black text-white px-3 py-0.5 rounded-xl font-bold inline-block shadow-md hover:-translate-y-1 hover:rotate-1 hover:shadow-xl transition-all duration-200 cursor-default">
                clean, fast, and responsive
              </span>{" "}
              web interfaces and contribute to open-source software ecosystems.
            </p>
          </div>

          <div className="space-y-3 border-t border-black/15 pt-6">
            <span className="text-xs font-mono uppercase tracking-widest text-black/50 block font-bold">
              The Background
            </span>
            <p className="text-base sm:text-lg text-black/80 font-light leading-relaxed">
              My engineering approach prioritizes clean architecture, modular
              component structure, and polished interaction design. Whether
              building complete frontend ecosystems or optimizing web
              performance, I focus on delivering seamless end-user experiences.
            </p>
            <p className="text-sm text-black/65 font-light leading-relaxed">
              Beyond frontend development, I have experience working with
              Python, C, C++, and Java to solve real-world problems
              systematically and audit codebase logic for performance and
              security.
            </p>
          </div>

          <div
            id="experience"
            className="space-y-3 border-t border-black/15 pt-6"
          >
            <span className="text-xs font-mono uppercase tracking-widest text-black/50 block font-bold">
              Experience & Milestones
            </span>
            <div className="space-y-4">
              {milestones.map((item) => (
                <div
                  key={item.title}
                  className="relative border-l-2 border-black pl-5 space-y-0.5 hover:pl-7 transition-all duration-300 cursor-default group"
                >
                  <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-black opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300" />

                  <span className="text-xs font-mono text-black/50 group-hover:text-black uppercase tracking-wider transition-colors duration-200">
                    {item.year}
                  </span>
                  <h4 className="text-base font-bold text-black group-hover:translate-x-1 transition-transform duration-200">
                    {item.title}
                  </h4>
                  <p className="text-sm text-black/70 font-light leading-relaxed group-hover:text-black/90 transition-colors">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-black/15 mt-16 pt-10 overflow-hidden text-center">
        <div className="flex justify-center items-center mb-6">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-black/60 font-bold">
            ✦ Technical Arsenal ✦
          </span>
        </div>

        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
        >
          <div
            ref={marqueeTrackRef}
            className="flex items-center gap-4 w-max will-change-transform py-2"
          >
            {[...skills, ...skills].map((skill, index) => (
              <div
                key={index}
                className="flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-black/15 bg-[#faf9f5] font-mono text-xs sm:text-sm text-black font-semibold shadow-sm shrink-0 hover:bg-black hover:text-white hover:border-black hover:scale-105 transition-all duration-200 cursor-pointer"
              >
                <span className="shrink-0">{skill.svg}</span>
                <span>{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

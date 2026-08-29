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
      name: "Python",
      svg: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.91 2C6.93 2 7.25 4.16 7.25 4.16L7.26 6.39H12v.74H4.82S2 6.81 2 11.85c0 5.04 2.47 4.87 2.47 4.87h1.47v-2.07s-.08-2.47 2.43-2.47h4.86s2.35.04 2.35-2.27V4.28S15.93 2 11.91 2zm-2.08 1.47c.45 0 .82.37.82.82s-.37.82-.82.82-.82-.37-.82-.82.37-.82.82-.82zm2.26 18.53c4.98 0 4.66-2.16 4.66-2.16l-.01-2.23H12v-.74h7.18s2.82.32 2.82-4.72c0-5.04-2.47-4.87-2.47-4.87h-1.47v2.07s.08 2.47-2.43 2.47H10.9s-2.35-.04-2.35 2.27v5.63s-.35 2.28 3.67 2.28zm2.08-1.47c-.45 0-.82-.37-.82-.82s.37-.82.82-.82.82.37.82.82-.37.82-.82.82z" />
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
      className="mt-24 sm:mt-36 mb-16 relative z-10 w-full px-4 sm:px-8 max-w-7xl mx-auto"
    >
      <div
        ref={headerRef}
        className="flex flex-col md:flex-row md:items-end justify-between border-b-2 border-black pb-5 mb-10 gap-4"
      >
        <div className="text-left">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs uppercase tracking-[0.25em] text-black font-mono font-bold">
              ✦ 01 DOSSIER
            </span>
          </div>
          <h3 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase text-black leading-none">
            Want The Lore, Huh?
          </h3>
        </div>

        <div className="md:text-right">
          <p className="text-xs sm:text-sm font-mono text-black/70 uppercase tracking-widest max-w-xs md:ml-auto">
            Turning coffee into code & auditing breaking bugs since day one.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
        <div className="lg:col-span-5 flex flex-col justify-center items-center">
          <div
            ref={imageWrapperRef}
            onMouseMove={handlePhotoMouseMove}
            onMouseLeave={handlePhotoMouseLeave}
            className="group relative w-48 h-64 sm:w-60 sm:h-80 lg:w-full lg:h-full lg:min-h-[460px] rounded-2xl sm:rounded-3xl overflow-hidden will-change-transform cursor-pointer shadow-lg bg-[#e5e4de] border border-black/10 mx-auto"
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
            <p className="text-xl sm:text-2xl lg:text-3xl font-medium tracking-tight text-black leading-snug">
              I build{" "}
              <span className="bg-black text-white px-2.5 py-0.5 rounded-xl font-bold inline-block shadow-md">
                clean, fast, and responsive
              </span>{" "}
              web interfaces and contribute to open-source software ecosystems.
            </p>
          </div>

          <div className="space-y-3 border-t border-black/15 pt-6">
            <span className="text-xs font-mono uppercase tracking-widest text-black/50 block font-bold">
              The Background
            </span>
            <p className="text-sm sm:text-base text-black/80 font-light leading-relaxed">
              My engineering approach prioritizes clean architecture, modular
              component structure, and polished interaction design. Whether
              building complete frontend ecosystems or optimizing web
              performance, I focus on delivering seamless end-user experiences.
            </p>
            <p className="text-xs sm:text-sm text-black/65 font-light leading-relaxed">
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
                  className="relative border-l-2 border-black pl-4 sm:pl-5 space-y-0.5 group"
                >
                  <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-black opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  <span className="text-xs font-mono text-black/50 uppercase tracking-wider">
                    {item.year}
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-black">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-black/70 font-light leading-relaxed">
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
                className="flex items-center gap-2.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-black/15 bg-[#faf9f5] font-mono text-xs sm:text-sm text-black font-semibold shadow-sm shrink-0"
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

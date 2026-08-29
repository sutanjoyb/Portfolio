import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FooterOutro() {
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const dialogueCardRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);
  const rippleRef = useRef(null);

  const dialogues = [
    "Bro, the website is over. There is no post-credit scene.",
    "Stop inspecting my elements. My CSS is clean enough.",
    "Click this again and your browser cache clears.",
    "I spent 4 hours fixing a semicolon just for you to scroll past.",
    "The sun is outside waiting for you. Close the tab.",
    "My search history is just Stack Overflow and coffee recipes.",
    "Look at you, still clicking. Truly an unpaid QA tester.",
    "You broke my patience. Go send an email or close the tab.",
  ];

  const [quoteIndex, setQuoteIndex] = useState(0);

  const handleMagneticMove = (e, targetRef, strength = 0.28) => {
    const el = targetRef?.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = e.clientX - (left + width / 2);
    const y = e.clientY - (top + height / 2);

    gsap.to(el, {
      x: x * strength,
      y: y * strength,
      rotateX: -y * 0.1,
      rotateY: x * 0.1,
      transformPerspective: 600,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  const handleMagneticLeave = (targetRef) => {
    const el = targetRef?.current;
    if (!el) return;
    gsap.to(el, {
      x: 0,
      y: 0,
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "elastic.out(1.2, 0.4)",
    });
  };

  const handleNextDialogue = (e) => {
    const nextIdx = (quoteIndex + 1) % dialogues.length;

    if (rippleRef.current && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gsap.fromTo(
        rippleRef.current,
        { x, y, scale: 0, opacity: 0.6 },
        { scale: 4, opacity: 0, duration: 0.5, ease: "power2.out" },
      );
    }

    if (dialogueCardRef.current && textRef.current) {
      const tl = gsap.timeline();

      tl.to(dialogueCardRef.current, {
        rotateX: 90,
        opacity: 0,
        scale: 0.95,
        duration: 0.15,
        ease: "power2.in",
        onComplete: () => {
          setQuoteIndex(nextIdx);
        },
      }).to(dialogueCardRef.current, {
        rotateX: 0,
        opacity: 1,
        scale: 1,
        duration: 0.35,
        ease: "back.out(2)",
      });

      gsap.fromTo(
        textRef.current,
        { filter: "blur(6px)", y: 6 },
        {
          filter: "blur(0px)",
          y: 0,
          duration: 0.3,
          delay: 0.15,
          ease: "power2.out",
        },
      );
    } else {
      setQuoteIndex(nextIdx);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineRef.current,
        { scale: 0.92, opacity: 0, y: 30 },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
          },
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "back.out(1.5)",
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={containerRef}
      className="relative w-full pt-16 sm:pt-20 pb-24 sm:pb-28 mt-20 sm:mt-24 border-t-2 border-black dark:border-white/20 select-none overflow-hidden px-4 sm:px-8 transition-colors duration-300"
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[clamp(3.5rem,12vw,14rem)] font-black text-black/[0.03] dark:text-white/[0.03] uppercase tracking-tighter pointer-events-none whitespace-nowrap leading-none transition-transform duration-700"
        style={{ fontFamily: "Impact, 'Arial Black', sans-serif" }}
      >
        GO TOUCH GRASS
      </div>

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10 space-y-6">
        <div className="flex items-center justify-center gap-2">
          <span className="text-xs uppercase tracking-[0.25em] text-black dark:text-white font-mono font-bold">
            ✦ 04 FINAL WARNING
          </span>
        </div>

        <div ref={headlineRef} className="space-y-4 w-full">
          <h2
            className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-black dark:text-white leading-none transition-all duration-300 cursor-default hover:text-neutral-800 dark:hover:text-neutral-300 hover:scale-[1.02] hover:[text-shadow:4px_4px_0px_rgba(0,0,0,0.15)] dark:hover:[text-shadow:4px_4px_0px_rgba(255,255,255,0.15)]"
            style={{ fontFamily: "Impact, 'Arial Black', sans-serif" }}
          >
            Still scrolling down? <br />
            <span className="bg-black text-white dark:bg-white dark:text-black px-3 sm:px-4 py-0.5 rounded-2xl inline-block mt-2 sm:mt-3 shadow-md hover:-translate-y-1 hover:rotate-1 transition-transform duration-200">
              Go touch some grass.
            </span>
          </h2>

          <p className="text-xs sm:text-sm font-mono text-black/60 dark:text-white/60 uppercase tracking-widest max-w-md mx-auto pt-2 px-2">
            You hit the absolute bottom of the DOM tree. Nothing to see here
            except questionable life choices.
          </p>

          <div
            ref={dialogueCardRef}
            className="relative flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 bg-white/95 dark:bg-[#12161c]/95 border-2 border-black dark:border-white/20 p-4 sm:px-5 sm:py-3 rounded-2xl shadow-[4px_4px_0px_#000000] dark:shadow-[4px_4px_0px_#ffffff20] w-full max-w-2xl mx-auto text-left will-change-transform mt-6 overflow-hidden transition-colors duration-300"
            style={{ transformStyle: "preserve-3d" }}
          >
            <span className="font-mono text-[11px] sm:text-xs text-black dark:text-white font-black shrink-0 uppercase tracking-wider bg-black/10 dark:bg-white/10 px-2 py-0.5 rounded">
              SUTANJOY:
            </span>
            <p
              ref={textRef}
              className="text-xs sm:text-sm font-mono text-black dark:text-white font-medium w-full whitespace-normal sm:whitespace-nowrap overflow-hidden text-ellipsis flex-1 leading-relaxed"
            >
              "{dialogues[quoteIndex]}"
            </p>
            <span className="hidden sm:inline-block w-1.5 h-3.5 bg-black dark:bg-white animate-pulse shrink-0" />
          </div>
        </div>

        <div className="pt-4">
          <button
            ref={buttonRef}
            type="button"
            onClick={handleNextDialogue}
            onMouseMove={(e) => handleMagneticMove(e, buttonRef, 0.28)}
            onMouseLeave={() => handleMagneticLeave(buttonRef)}
            className="relative overflow-hidden group px-6 sm:px-8 py-3.5 sm:py-4 rounded-full border-2 border-black dark:border-white bg-black text-white dark:bg-white dark:text-black font-mono text-xs uppercase tracking-wider font-bold shadow-[3px_3px_0px_#000] dark:shadow-[3px_3px_0px_#fff] hover:shadow-[1px_1px_0px_#000] dark:hover:shadow-[1px_1px_0px_#fff] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150 active:scale-95 cursor-pointer will-change-transform inline-flex items-center gap-2.5 sm:gap-3"
          >
            <span
              ref={rippleRef}
              className="absolute w-8 h-8 -top-4 -left-4 bg-white/40 dark:bg-black/20 rounded-full pointer-events-none opacity-0"
            />

            <span>Bother Sutanjoy Again</span>
            <span className="font-mono text-[10px] text-white/50 dark:text-black/50 group-hover:text-white/80 dark:group-hover:text-black/80 transition-colors">
              [{quoteIndex + 1}/{dialogues.length}]
            </span>
            <span className="inline-block transition-transform duration-300 group-hover:rotate-180 text-white/70 dark:text-black/70">
              ✦
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}

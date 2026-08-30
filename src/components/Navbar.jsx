import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ThemeToggleBtn from "./ThemeToggleBtn";

export default function Navbar({ name = "Sutanjoy Bhattacharjee" }) {
  const navRef = useRef(null);
  const brandRef = useRef(null);
  const tmRef = useRef(null);
  const ctaRef = useRef(null);
  const resumeBtnRef = useRef(null);
  const linksRef = useRef([]);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        brandRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
      )
        .fromTo(
          linksRef.current.filter(Boolean),
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.08, duration: 0.6 },
          "-=0.4",
        )
        .fromTo(
          ctaRef.current.children,
          { y: -18, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.08, duration: 0.5 },
          "-=0.45",
        );
    }, navRef);

    return () => ctx.revert();
  }, []);

  const handleBrandEnter = () => {
    if (!tmRef.current) return;
    const isDark = document.documentElement.classList.contains("dark");
    gsap
      .timeline()
      .to(tmRef.current, {
        y: -4,
        scale: 1.35,
        rotate: -12,
        color: isDark ? "#ffffff" : "#000000",
        duration: 0.15,
        ease: "power2.out",
      })
      .to(tmRef.current, {
        y: 0,
        scale: 1,
        rotate: 0,
        color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)",
        duration: 0.45,
        ease: "elastic.out(1.4, 0.4)",
      });
  };

  const handleMagneticMove = (e, elementRef, strength = 0.35) => {
    const el = elementRef?.current || elementRef;
    if (!el) return;

    const { left, top, width, height } = el.getBoundingClientRect();
    const x = e.clientX - (left + width / 2);
    const y = e.clientY - (top + height / 2);

    gsap.to(el, {
      x: x * strength,
      y: y * strength,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  const handleMagneticLeave = (elementRef) => {
    const el = elementRef?.current || elementRef;
    if (!el) return;

    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.45,
      ease: "elastic.out(1.2, 0.4)",
    });
  };

  const handleNavLinkClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;

    // Click micro-animation effect
    const el = e.currentTarget;
    gsap
      .timeline()
      .to(el, { scale: 0.9, y: 3, duration: 0.1, ease: "power2.out" })
      .to(el, { scale: 1, y: 0, duration: 0.3, ease: "elastic.out(1.5, 0.4)" });

    target.scrollIntoView({ behavior: "smooth" });
  };

  const links = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-[100001] bg-[#faf9f5]/85 dark:bg-[#0a0d12]/85 backdrop-blur-md transition-colors duration-300 border-b border-black/10 dark:border-white/10">
        <nav
          ref={navRef}
          className="max-w-7xl mx-auto w-full flex items-center justify-between text-sm sm:text-base tracking-tight py-3 sm:py-4 select-none px-4 sm:px-8 gap-2 relative"
        >
          <div className="flex items-center min-w-0 shrink">
            <a
              ref={brandRef}
              href="#"
              onMouseEnter={handleBrandEnter}
              onMouseMove={(e) => handleMagneticMove(e, brandRef, 0.2)}
              onMouseLeave={() => handleMagneticLeave(brandRef)}
              className="group font-bold text-xs sm:text-lg md:text-xl tracking-tight font-sans text-black dark:text-white hover:opacity-85 transition-opacity active:scale-95 will-change-transform inline-flex items-center gap-0.5 sm:gap-1"
            >
              <span className="md:hidden">Sutanjoy</span>
              <span className="hidden md:inline">{name}</span>
              <span
                ref={tmRef}
                className="text-[10px] sm:text-xs font-mono font-black text-black/50 dark:text-white/50 tracking-tighter inline-block transition-colors shrink-0"
              >
                ™
              </span>
            </a>
          </div>

          {/* Desktop Navigation Links (Separate, No Container Border) */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link, idx) => (
              <a
                key={link.label}
                ref={(el) => (linksRef.current[idx] = el)}
                href={link.href}
                onClick={(e) => handleNavLinkClick(e, link.href)}
                onMouseMove={(e) =>
                  handleMagneticMove(e, linksRef.current[idx], 0.25)
                }
                onMouseLeave={() => handleMagneticLeave(linksRef.current[idx])}
                className="relative z-10 font-mono text-xs sm:text-sm uppercase tracking-wider text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white font-medium transition-colors duration-150 inline-block will-change-transform select-none cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div
            ref={ctaRef}
            className="flex items-center gap-2 sm:gap-3 pointer-events-auto shrink-0"
          >
            <div className="[&_span:not(:first-child)]:hidden">
              <ThemeToggleBtn />
            </div>

            <a
              ref={resumeBtnRef}
              href={`${import.meta.env.BASE_URL}Sutanjoy_Bhattacharjee_Resume.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              onMouseMove={(e) => handleMagneticMove(e, resumeBtnRef, 0.25)}
              onMouseLeave={() => handleMagneticLeave(resumeBtnRef)}
              className="hidden sm:inline-flex group relative items-center gap-1 sm:gap-2.5 font-mono text-[11px] sm:text-sm border border-black/20 dark:border-white/20 bg-black text-white dark:bg-white dark:text-black px-2.5 sm:px-5 py-1.5 sm:py-2 rounded-full shadow-sm hover:bg-neutral-800 dark:hover:bg-neutral-200 hover:shadow-md transition-all duration-200 active:scale-95 will-change-transform overflow-hidden shrink-0"
            >
              <span className="font-bold tracking-wider">RESUME</span>
              <svg
                className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform duration-200 group-hover:translate-y-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex flex-col justify-center items-center w-9 h-9 rounded-2xl border-2 border-black dark:border-white/30 bg-[#faf9f5] dark:bg-[#12161c] text-black dark:text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 focus:outline-none active:scale-95 shrink-0 transition-all duration-200 cursor-pointer relative z-[100002]"
              aria-label="Toggle mobile menu"
            >
              <div className="w-4 h-3.5 flex flex-col justify-between items-center relative">
                <span
                  className={`w-full h-0.5 bg-black dark:bg-white transition-all duration-300 origin-center ${
                    mobileMenuOpen ? "rotate-45 translate-y-[6px]" : ""
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-black dark:bg-white transition-all duration-300 ${
                    mobileMenuOpen ? "opacity-0 scale-x-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-black dark:bg-white transition-all duration-300 origin-center ${
                    mobileMenuOpen ? "-rotate-45 -translate-y-[6px]" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </nav>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[99999] md:hidden flex justify-end">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-md animate-in fade-in duration-300"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="relative w-64 bg-[#faf9f5] dark:bg-[#0a0d12] h-full shadow-2xl p-6 flex flex-col justify-between border-l border-black/15 dark:border-white/20 animate-in slide-in-from-right duration-300 transition-colors duration-300 z-10">
            <div className="space-y-6">
              <div className="pt-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-black/40 dark:text-white/40 font-bold block mb-1">
                  Navigation
                </span>
                <div className="w-full h-[1px] bg-black/10 dark:bg-white/10" />
              </div>
              <ul className="space-y-4 font-mono text-base font-semibold pt-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-black dark:text-white hover:text-black/60 dark:hover:text-white/60 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 flex flex-col items-center justify-center pb-2">
              <a
                href={`${import.meta.env.BASE_URL}Sutanjoy_Bhattacharjee_Resume.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-full bg-black text-white dark:bg-white dark:text-black font-mono text-xs font-bold uppercase tracking-wider shadow-sm flex items-center justify-center gap-2"
              >
                <span>Resume</span>
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

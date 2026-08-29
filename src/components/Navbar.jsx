import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Navbar({ name = "Sutanjoy Bhattacharjee" }) {
  const navRef = useRef(null);
  const brandRef = useRef(null);
  const tmRef = useRef(null);
  const islandRef = useRef(null);
  const pillRef = useRef(null);
  const ctaRef = useRef(null);
  const resumeBtnRef = useRef(null);
  const contactBtnRef = useRef(null);
  const linksRef = useRef([]);

  const [hoveredIdx, setHoveredIdx] = useState(null);
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
          islandRef.current,
          { y: -25, scale: 0.9, opacity: 0 },
          { y: 0, scale: 1, opacity: 1, duration: 0.65, ease: "back.out(1.6)" },
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
    gsap
      .timeline()
      .to(tmRef.current, {
        y: -4,
        scale: 1.35,
        rotate: -12,
        color: "#000000",
        duration: 0.15,
        ease: "power2.out",
      })
      .to(tmRef.current, {
        y: 0,
        scale: 1,
        rotate: 0,
        color: "rgba(0,0,0,0.5)",
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

  const handleLinkHover = (idx) => {
    setHoveredIdx(idx);
    const linkEl = linksRef.current[idx];
    const islandEl = islandRef.current;
    if (!linkEl || !islandEl || !pillRef.current) return;

    const linkRect = linkEl.getBoundingClientRect();
    const islandRect = islandEl.getBoundingClientRect();

    gsap.killTweensOf(pillRef.current);
    gsap.to(pillRef.current, {
      x: linkRect.left - islandRect.left,
      width: linkRect.width,
      opacity: 1,
      scaleX: 1,
      scaleY: 1,
      duration: 0.25,
      ease: "power3.out",
    });
  };

  const handleIslandLeave = () => {
    setHoveredIdx(null);
    if (!pillRef.current) return;

    gsap.killTweensOf(pillRef.current);
    gsap.to(pillRef.current, {
      opacity: 0,
      scaleX: 0.8,
      scaleY: 0.8,
      duration: 0.2,
      ease: "power2.out",
      onComplete: () => {
        if (pillRef.current) {
          gsap.set(pillRef.current, { width: 0, opacity: 0 });
        }
      },
    });
  };

  const links = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <nav
        ref={navRef}
        className="absolute top-0 left-0 right-0 w-full flex items-center justify-between text-sm sm:text-base tracking-tight pt-4 pb-0 select-none z-50 px-3 sm:px-8 gap-2"
      >
        <div className="flex items-center min-w-0 max-w-[45%] sm:max-w-none">
          <a
            ref={brandRef}
            href="#"
            onMouseEnter={handleBrandEnter}
            onMouseMove={(e) => handleMagneticMove(e, brandRef, 0.2)}
            onMouseLeave={() => handleMagneticLeave(brandRef)}
            className="group font-bold text-xs sm:text-lg md:text-xl tracking-tight font-sans text-black hover:opacity-85 transition-opacity active:scale-95 will-change-transform inline-flex items-center gap-0.5 sm:gap-1 truncate"
          >
            <span className="truncate">{name}</span>
            <span
              ref={tmRef}
              className="text-[10px] sm:text-xs font-mono font-black text-black/50 tracking-tighter inline-block transition-colors shrink-0"
            >
              ™
            </span>
          </a>
        </div>

        {/* Desktop Dynamic Island Nav */}
        <div
          ref={islandRef}
          onMouseLeave={handleIslandLeave}
          className="relative hidden md:flex items-center gap-1 bg-white/85 backdrop-blur-xl border border-black/15 p-1 rounded-full shadow-lg shadow-black/5 will-change-transform shrink-0"
        >
          <div
            ref={pillRef}
            className="absolute top-1 bottom-1 left-0 bg-black rounded-full pointer-events-none opacity-0 scale-90 will-change-transform z-0 shadow-sm"
            style={{ width: 0 }}
          />

          {links.map((link, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <a
                key={link.label}
                ref={(el) => (linksRef.current[idx] = el)}
                href={link.href}
                onMouseEnter={() => handleLinkHover(idx)}
                onMouseMove={(e) =>
                  handleMagneticMove(e, linksRef.current[idx], 0.25)
                }
                onMouseLeave={() => handleMagneticLeave(linksRef.current[idx])}
                className={`relative z-10 px-4 py-1.5 rounded-full font-mono text-xs sm:text-sm uppercase tracking-wider transition-colors duration-150 inline-block will-change-transform active:scale-90 select-none ${
                  isHovered
                    ? "text-white font-bold"
                    : "text-black/80 hover:text-black font-medium"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        <div
          ref={ctaRef}
          className="flex items-center gap-1.5 sm:gap-4 pointer-events-auto shrink-0"
        >
          <a
            ref={resumeBtnRef}
            href="/Sutanjoy_Bhattacharjee_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onMouseMove={(e) => handleMagneticMove(e, resumeBtnRef, 0.25)}
            onMouseLeave={() => handleMagneticLeave(resumeBtnRef)}
            className="group relative inline-flex items-center gap-1 sm:gap-2.5 font-mono text-[11px] sm:text-sm border border-black/20 bg-black text-white px-2.5 sm:px-5 py-1.5 sm:py-2 rounded-full shadow-sm hover:bg-neutral-800 hover:shadow-md transition-all duration-200 active:scale-95 will-change-transform overflow-hidden shrink-0"
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

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-black/20 bg-white text-black focus:outline-none active:scale-95 shrink-0"
            aria-label="Toggle mobile menu"
          >
            <span
              className={`w-3.5 h-0.5 bg-black transition-transform duration-200 ${
                mobileMenuOpen ? "rotate-45 translate-y-1" : "-translate-y-1"
              }`}
            />
            <span
              className={`w-3.5 h-0.5 bg-black transition-opacity duration-200 my-1 ${
                mobileMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`w-3.5 h-0.5 bg-black transition-transform duration-200 ${
                mobileMenuOpen ? "-rotate-45 -translate-y-1" : "translate-y-1"
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden flex justify-end">
          <div className="w-64 bg-[#faf9f5] h-full shadow-2xl p-6 flex flex-col justify-between border-l border-black/15 animate-in slide-in-from-right duration-300">
            <div className="space-y-6 pt-16">
              <span className="text-xs font-mono uppercase tracking-widest text-black/40 block font-bold">
                Navigation
              </span>
              <ul className="space-y-4 font-mono text-base font-semibold">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-black hover:text-black/60 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-black/10 pt-4">
              <p className="text-xs font-mono text-black/50">
                Sutanjoy Bhattacharjee © 2026
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import ThemeToggleBtn from "./ThemeToggleBtn";

export default function Navbar({ name = "Sutanjoy Bhattacharjee" }) {
  const navRef = useRef(null);
  const menuOverlayRef = useRef(null);
  const closeBtnRef = useRef(null);
  const menuItemsRef = useRef([]);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      if (menuOverlayRef.current) {
        gsap.killTweensOf([
          menuOverlayRef.current,
          closeBtnRef.current,
          ...menuItemsRef.current,
        ]);
        gsap.fromTo(
          menuOverlayRef.current,
          { clipPath: "circle(0% at calc(100% - 56px) 36px)", opacity: 0 },
          {
            clipPath: "circle(150% at calc(100% - 56px) 36px)",
            opacity: 1,
            duration: 0.4,
            ease: "power3.inOut",
            overwrite: "auto",
          },
        );
        gsap.fromTo(
          menuItemsRef.current.filter(Boolean),
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.03,
            duration: 0.25,
            delay: 0.05,
            ease: "power2.out",
            overwrite: "auto",
          },
        );
        if (closeBtnRef.current) {
          gsap.fromTo(
            closeBtnRef.current,
            { opacity: 0, scale: 0.9 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.25,
              delay: 0.05,
              ease: "power2.out",
              overwrite: "auto",
            },
          );
        }
      }

      if (line1Ref.current && line2Ref.current && line3Ref.current) {
        gsap.to(line1Ref.current, { rotation: 45, y: 5, duration: 0.2 });
        gsap.to(line2Ref.current, { opacity: 0, duration: 0.1 });
        gsap.to(line3Ref.current, { rotation: -45, y: -5, duration: 0.2 });
      }
    } else {
      document.body.style.overflow = "auto";
      if (line1Ref.current && line2Ref.current && line3Ref.current) {
        gsap.to(line1Ref.current, { rotation: 0, y: 0, duration: 0.2 });
        gsap.to(line2Ref.current, { opacity: 1, duration: 0.1 });
        gsap.to(line3Ref.current, { rotation: 0, y: 0, duration: 0.2 });
      }
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  const handleCloseMenu = () => {
    if (!menuOverlayRef.current) {
      setMenuOpen(false);
      return;
    }
    gsap.killTweensOf(menuOverlayRef.current);
    gsap.to(menuOverlayRef.current, {
      opacity: 0,
      clipPath: "circle(0% at calc(100% - 56px) 36px)",
      duration: 0.15,
      ease: "power2.in",
      overwrite: "auto",
      onComplete: () => {
        setMenuOpen(false);
      },
    });
  };

  const handleRouteChange = (path) => {
    if (menuOverlayRef.current) {
      gsap.killTweensOf(menuOverlayRef.current);
      gsap.to(menuOverlayRef.current, {
        opacity: 0,
        clipPath: "circle(0% at calc(100% - 56px) 36px)",
        duration: 0.15,
        ease: "power2.in",
        overwrite: "auto",
        onComplete: () => {
          setMenuOpen(false);
          navigate(path);
          window.scrollTo({ top: 0, behavior: "smooth" });
        },
      });
    } else {
      setMenuOpen(false);
      navigate(path);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const navItems = [
    { num: "01", label: "HOME", path: "/" },
    { num: "02", label: "ABOUT", path: "/about" },
    { num: "04", label: "PROJECTS", path: "/projects" },
    { num: "05", label: "CONTACT", path: "/contact" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-[100001] bg-[#faf9f5]/90 dark:bg-[#0a0d12]/90 backdrop-blur-md transition-colors duration-200 border-b border-black/10 dark:border-white/10">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-8">
          <nav
            ref={navRef}
            className="w-full flex items-center justify-between text-sm sm:text-base tracking-tight py-3 sm:py-4 select-none relative"
          >
            <div className="flex items-center min-w-0 shrink">
              <Link
                to="/"
                className="font-mono font-bold text-xs sm:text-sm tracking-widest uppercase text-black dark:text-white inline-flex items-center gap-0.5 sm:gap-1 cursor-pointer"
              >
                <span className="md:hidden">Sutanjoy</span>
                <span className="hidden md:inline">{name}</span>
                <span className="text-[10px] sm:text-xs font-mono font-black text-black/50 dark:text-white/50 tracking-tighter shrink-0">
                  ™
                </span>
              </Link>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3 pointer-events-auto shrink-0">
              <ThemeToggleBtn />

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex flex-col justify-center items-center w-10 h-10 rounded-2xl border-2 border-black dark:border-white/30 bg-[#faf9f5] dark:bg-[#12161c] text-black dark:text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 focus:outline-none active:scale-95 shrink-0 transition-transform duration-100 cursor-pointer relative z-[100002]"
                aria-label="Toggle navigation menu"
              >
                <div className="w-4 h-3.5 flex flex-col justify-between items-center relative">
                  <span
                    ref={line1Ref}
                    className="w-full h-0.5 bg-black dark:bg-white origin-center"
                  />
                  <span
                    ref={line2Ref}
                    className="w-full h-0.5 bg-black dark:bg-white origin-center"
                  />
                  <span
                    ref={line3Ref}
                    className="w-full h-0.5 bg-black dark:bg-white origin-center"
                  />
                </div>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Full-Screen Immersive Optimized Overlay */}
      <div
        ref={menuOverlayRef}
        className={`fixed inset-0 z-[999999] bg-[#e3e2dc]/95 dark:bg-[#070a0f]/95 flex flex-col justify-between p-0 overflow-y-auto will-change-[opacity,clip-path] ${
          menuOpen ? "pointer-events-auto" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="w-full bg-[#faf9f5] dark:bg-[#0a0d12] border-b border-black/10 dark:border-white/10">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-8">
            <div className="w-full flex items-center justify-between py-3 sm:py-4 relative z-10">
              <div className="font-mono font-bold text-xs sm:text-sm tracking-widest uppercase text-black dark:text-white inline-flex items-center gap-0.5 sm:gap-1">
                <span className="md:hidden">Sutanjoy</span>
                <span className="hidden md:inline">{name}</span>
                <span className="text-[10px] sm:text-xs font-mono font-black text-black/50 dark:text-white/50 tracking-tighter shrink-0">
                  ™
                </span>
              </div>

              <button
                ref={closeBtnRef}
                onClick={handleCloseMenu}
                className="flex flex-col justify-center items-center w-10 h-10 rounded-2xl border-2 border-black dark:border-white/30 bg-[#faf9f5] dark:bg-[#12161c] text-black dark:text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 focus:outline-none active:scale-95 shrink-0 transition-transform duration-100 cursor-pointer will-change-transform"
                aria-label="Close menu"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto w-full px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 my-auto items-center py-6 relative z-10">
          <div
            ref={(el) => (menuItemsRef.current[0] = el)}
            className="lg:col-span-5 bg-white dark:bg-[#12161c] border-2 border-black/15 dark:border-white/20 p-6 sm:p-10 rounded-[28px] shadow-lg space-y-4 will-change-transform"
          >
            <span className="font-mono text-xs text-black/50 dark:text-white/50 uppercase tracking-widest block font-bold">
              quick overview
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-black dark:text-white leading-snug">
              where do you want to head next?
            </h2>
            <p className="text-sm font-sans text-black/70 dark:text-white/70 font-normal leading-relaxed">
              take a look around my corner of the web—check out what I've been
              building, read my thoughts, or jump back home.
            </p>
          </div>

          <div className="lg:col-span-7 flex flex-col space-y-3.5">
            {navItems.map((item, index) => (
              <div
                key={item.label}
                ref={(el) => (menuItemsRef.current[index + 1] = el)}
                className="group relative border-2 border-black/15 dark:border-white/20 bg-white dark:bg-[#12161c] px-6 py-3.5 sm:px-8 sm:py-4 rounded-2xl shadow-sm hover:border-black dark:hover:border-white hover:-translate-y-1 transition-transform duration-150 ease-out overflow-hidden will-change-transform"
              >
                <button
                  onClick={() => handleRouteChange(item.path)}
                  className="flex items-center justify-between w-full cursor-pointer relative z-10 text-left"
                >
                  <div className="flex items-center gap-6">
                    <span className="font-mono text-xs font-bold text-black/40 dark:text-white/40 tracking-widest group-hover:text-black dark:group-hover:text-white transition-colors duration-150">
                      {item.num}
                    </span>
                    <span className="text-xl sm:text-2xl font-bold tracking-normal text-black dark:text-white group-hover:translate-x-1 transition-transform duration-150 ease-out will-change-transform font-sans">
                      {item.label}
                    </span>
                  </div>
                  <span className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-xs font-mono text-black dark:text-white group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black group-hover:translate-x-1 transition-transform duration-150 ease-out">
                    ↗
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div
          ref={(el) => (menuItemsRef.current[navItems.length + 1] = el)}
          className="w-full text-center relative z-10 pb-6 px-4 space-y-4 will-change-transform"
        >
          <div>
            <a
              href={`${import.meta.env.BASE_URL}Sutanjoy_Bhattacharjee_Resume.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-black dark:text-white underline underline-offset-8 hover:opacity-70 transition-opacity cursor-pointer inline-block"
            >
              Checkout my resume &lt;3
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

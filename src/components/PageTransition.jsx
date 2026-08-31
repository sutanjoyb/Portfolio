import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";

export default function PageTransition({ children }) {
  const location = useLocation();
  const curtainRef = useRef(null);
  const contentRef = useRef(null);
  const isFirstMount = useRef(true);

  useEffect(() => {
    const el = curtainRef.current;
    const contentEl = contentRef.current;

    gsap.set(el, {
      clearProps: "all",
      display: "none",
    });

    if (
      isFirstMount.current ||
      location.pathname === "/" ||
      location.pathname === ""
    ) {
      isFirstMount.current = false;
      if (contentEl) {
        gsap.set(contentEl, { opacity: 1 });
      }
      return;
    }

    const tl = gsap.timeline();
    if (el && contentEl) {
      tl.set(contentEl, { opacity: 0 })
        .set(el, {
          display: "block",
          yPercent: 100,
          opacity: 1,
        })
        .to(el, {
          yPercent: 0,
          duration: 0.6,
          ease: "power2.inOut",
        })
        .set(contentEl, { opacity: 1 })
        .to(el, {
          yPercent: -100,
          duration: 0.6,
          ease: "power2.inOut",
        })
        .set(el, { display: "none" });
    }
  }, [location.pathname]);

  return (
    <>
      <div
        ref={curtainRef}
        className="fixed inset-0 z-[9999999] bg-[#e3e2dc] dark:bg-[#12161c] pointer-events-none hidden shadow-2xl"
        style={{ display: "none", willChange: "transform" }}
      />
      <div ref={contentRef} style={{ willChange: "opacity" }}>
        {children}
      </div>
    </>
  );
}

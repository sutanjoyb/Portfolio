import { useEffect, useRef } from "react";
import gsap from "gsap";

export function MacBookMockup({ imageUrl, title }) {
  const laptopRef = useRef(null);

  useEffect(() => {
    const tween = gsap.to(laptopRef.current, {
      y: -10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
    return () => tween.kill();
  }, []);

  return (
    <div
      ref={laptopRef}
      className="w-full max-w-xl mx-auto transition-transform duration-500 will-change-transform group-hover:scale-[1.02]"
    >
      <div className="relative bg-[#0d1117] rounded-t-[20px] p-[10px] pb-0 shadow-2xl border border-[#2b313a]">
        <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-10 sm:w-12 h-3 sm:h-3.5 bg-black rounded-b-md z-30 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-[#1b2533] border border-white/10" />
        </div>

        <div className="relative aspect-[16/10] overflow-hidden rounded-t-[10px] bg-black">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent pointer-events-none" />
        </div>
      </div>

      <div className="relative">
        <div className="relative bg-[#161c24] h-2.5 sm:h-3.5 rounded-b-[6px] border-t border-[#303846] shadow-[0_18px_35px_rgba(0,0,0,0.55)] flex justify-center items-start">
          <div className="w-16 sm:w-20 h-1 sm:h-1.5 bg-[#0b0e13] rounded-b-md" />
        </div>

        <div className="w-[103%] -ml-[1.5%] h-1 sm:h-1.5 bg-[#0f141a] rounded-b-xl border-t border-black/40 shadow-md" />
      </div>
    </div>
  );
}

export function IPhoneMockup({ imageUrl, title }) {
  const phoneRef = useRef(null);

  useEffect(() => {
    const tween = gsap.to(phoneRef.current, {
      y: -12,
      duration: 3.4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 0.3,
    });
    return () => tween.kill();
  }, []);

  return (
    <div
      ref={phoneRef}
      className="w-48 sm:w-56 mx-auto transition-transform duration-500 will-change-transform group-hover:scale-[1.03]"
    >
      <div className="bg-[#1a1a1e] rounded-[38px] p-2.5 shadow-2xl border-[3px] border-[#374151] ring-1 ring-black/40">
        <div className="aspect-[9/19.5] overflow-hidden rounded-[30px] bg-black relative">
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-16 h-4 bg-black rounded-full z-20 flex items-center justify-end px-2">
            <div className="w-2 h-2 rounded-full bg-[#1e293b]/70" />
          </div>
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-20 h-1 bg-white/80 rounded-full z-20" />
        </div>
      </div>
    </div>
  );
}

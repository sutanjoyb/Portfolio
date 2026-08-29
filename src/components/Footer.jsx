import { useEffect, useState } from "react";

export default function Footer() {
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZone: "Asia/Kolkata",
    });
    const formattedTime = now.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Kolkata",
    });

    setLastUpdated(`${formattedDate} · ${formattedTime} IST`);
  }, []);

  const navLinks = [
    { num: "01", label: "Home", href: "#home" },
    { num: "02", label: "About", href: "#about" },
    { num: "03", label: "Projects", href: "#projects" },
    { num: "04", label: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    { label: "GitHub", href: "https://github.com/sutanjoyb" },
    { label: "LinkedIn", href: "https://linkedin.com/in/bsutanjoy" },
    { label: "Twitter", href: "https://twitter.com/sutanjoyb" },
    { label: "Instagram", href: "https://instagram.com/_sutanjoy.here" },
  ];

  return (
    <footer className="relative w-full pt-16 pb-8 border-t border-black/15 dark:border-white/20 overflow-hidden max-w-7xl mx-auto px-4 sm:px-8 transition-colors duration-300">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
        <div className="md:col-span-6 space-y-4">
          <h4 className="text-sm font-mono font-bold tracking-wider uppercase text-black dark:text-white">
            SUTANJOY BHATTACHARJEE ™
          </h4>
          <p className="text-sm text-black/70 dark:text-white/70 font-light leading-relaxed max-w-md">
            Frontend developer and software enthusiast passionate about creating
            intuitive user experiences, robust interfaces, and open-source
            software.
          </p>
        </div>

        <div className="md:col-span-3 space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-black dark:text-white block mb-4">
            NAVIGATION
          </span>
          <ul className="space-y-2 font-mono text-sm">
            {navLinks.map((item) => (
              <li key={item.num}>
                <a
                  href={item.href}
                  className="text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <span className="text-black/40 dark:text-white/40">
                    {item.num}
                  </span>
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3 space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-black dark:text-white block mb-4">
            CONNECT
          </span>
          <ul className="space-y-2 font-mono text-sm">
            {socialLinks.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white transition-colors flex items-center gap-1 group"
                >
                  <span>{item.label}</span>
                  <span className="text-xs">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-black/15 dark:border-white/15 my-6" />

      <div className="w-full flex items-center justify-center overflow-hidden select-none cursor-default py-6">
        <h1 className="text-[clamp(2rem,9.5vw,9rem)] font-black uppercase tracking-tight leading-none text-black/90 dark:text-white/90 blur-[3px] hover:blur-0 transition-all duration-300 text-center truncate w-full">
          SUTANJOY.
        </h1>
      </div>

      <div className="border-t border-black/10 dark:border-white/10 pt-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[11px] sm:text-xs tracking-[0.18em] uppercase text-black/70 dark:text-white/70 select-none text-center sm:text-left">
          <span className="font-bold text-black dark:text-white">
            © 2026 ALL RIGHTS RESERVED
          </span>
          <div className="flex items-center gap-1.5 text-black/60 dark:text-white/60 font-semibold tracking-wider">
            <span className="text-black/40 dark:text-white/40">
              LAST UPDATED:
            </span>
            <span className="text-black dark:text-white tabular-nums">
              {lastUpdated || "AUG 2026"}
            </span>
          </div>
          <span className="text-black/80 dark:text-white/80 font-semibold">
            DESIGNED & DEVELOPED BY SUTANJOY
          </span>
        </div>
      </div>
    </footer>
  );
}

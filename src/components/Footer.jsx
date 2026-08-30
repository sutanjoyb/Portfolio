export default function Footer() {
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
    <footer className="relative w-full pt-16 pb-8 border-t border-black/15 dark:border-white/25 overflow-hidden max-w-7xl mx-auto px-4 sm:px-8 transition-colors duration-300">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
        <div className="md:col-span-6 space-y-4 text-left">
          <h4 className="text-sm font-mono font-bold tracking-wider uppercase text-black dark:text-white">
            SUTANJOY BHATTACHARJEE ™
          </h4>
          <p className="text-sm text-black/70 dark:text-white/70 font-light leading-relaxed max-w-md">
            Frontend developer and software enthusiast passionate about creating
            intuitive user experiences, robust interfaces, and open-source
            software.
          </p>
        </div>

        <div className="md:col-span-3 space-y-3 text-left">
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

        <div className="md:col-span-3 space-y-3 text-left">
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

      <div className="w-full flex flex-col items-center justify-center overflow-hidden select-none cursor-default py-8 text-center space-y-3">
        <div className="flex items-center gap-2 font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-black dark:text-white/60 font-bold whitespace-nowrap">
          <span>◆</span>
          <span>
            05 THAT'S A WRAP —{" "}
            <span className="font-bold text-black dark:text-white">
              IT ENDS HERE
            </span>
          </span>
        </div>
        <div className="w-full overflow-hidden text-center py-1">
          <h1 className="text-[clamp(1.1rem,4.5vw,3.2rem)] font-black uppercase tracking-tight leading-none text-black dark:text-white whitespace-nowrap">
            NOW GO TOUCH{" "}
            <span className="text-black/40 dark:text-white/40 font-light">
              SOME GRASS
            </span>
          </h1>
        </div>
      </div>

      <div className="border-t border-black/10 dark:border-white/10 pt-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[11px] sm:text-xs tracking-[0.18em] uppercase text-black/70 dark:text-white/70 select-none text-center sm:text-left">
          <span className="font-bold text-black dark:text-white">
            © 2026 ALL RIGHTS RESERVED
          </span>
          <span className="text-black/80 dark:text-white/80 font-semibold truncate max-w-full">
            DESIGNED & DEVELOPED BY SUTANJOY
          </span>
        </div>
      </div>
    </footer>
  );
}

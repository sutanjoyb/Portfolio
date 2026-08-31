import { Link } from "react-router-dom";
import { FaGithub, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  const navLinks = [
    { label: "HOME", path: "/" },
    { label: "ABOUT", path: "/about" },
    { label: "PROJECTS", path: "/projects" },
    {
      label: "RESUME",
      href: `${import.meta.env.BASE_URL}Sutanjoy_Bhattacharjee_Resume.pdf`,
    },
    { label: "CONTACT", path: "/contact" },
  ];

  const socialLinks = [
    {
      icon: <FaGithub />,
      href: "https://github.com/sutanjoyb",
      label: "GitHub",
    },
    {
      icon: <FaLinkedinIn />,
      href: "https://linkedin.com/in/bsutanjoy",
      label: "LinkedIn",
    },
    {
      icon: <FaXTwitter />,
      href: "https://twitter.com/sutanjoyb",
      label: "Twitter",
    },
    {
      icon: <FaInstagram />,
      href: "https://instagram.com/_sutanjoy.here",
      label: "Instagram",
    },
  ];

  return (
    <footer className="relative w-full pt-20 pb-12 border-t border-black/15 dark:border-white/25 mt-24 max-w-7xl mx-auto px-4 sm:px-8 text-center select-none transition-colors duration-300">
      <div className="space-y-3 mb-16">
        <p className="font-mono text-xs sm:text-sm uppercase tracking-widest text-black/60 dark:text-white/60 font-semibold">
          Ready to build something iconic together?
        </p>
        <h2
          className="text-4xl sm:text-7xl md:text-8xl font-black uppercase tracking-tighter text-black dark:text-white"
          style={{ fontFamily: "Impact, 'Arial Black', sans-serif" }}
        >
          LET'S CONNECT
        </h2>
        <p className="font-mono text-xs sm:text-sm uppercase tracking-widest text-black/60 dark:text-white/60">
          Open for full-stack opportunities, engineering chats, and open-source
          collabs.
        </p>
      </div>

      <div className="w-full h-[1px] bg-black/20 dark:bg-white/20 mb-12" />

      <ul className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 font-mono text-sm sm:text-base font-bold uppercase tracking-wider mb-12">
        {navLinks.map((item) => (
          <li key={item.label}>
            {item.path ? (
              <Link
                to={item.path}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="text-black dark:text-white hover:opacity-60 transition-opacity"
              >
                {item.label}
              </Link>
            ) : (
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="text-black dark:text-white hover:opacity-60 transition-opacity"
              >
                {item.label}
              </a>
            )}
          </li>
        ))}
      </ul>

      <div className="flex justify-center items-center gap-5 mb-12">
        {socialLinks.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noreferrer"
            aria-label={social.label}
            className="w-12 h-12 rounded-full border-2 border-black/20 dark:border-white/20 flex items-center justify-center text-black dark:text-white text-lg bg-black/5 dark:bg-white/5 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black hover:scale-110 transition-all duration-300"
          >
            {social.icon}
          </a>
        ))}
      </div>

      <div className="font-mono text-xs text-black/50 dark:text-white/50 uppercase tracking-widest">
        Copyright © 2026 Sutanjoy Bhattacharjee. All rights reserved.
      </div>
    </footer>
  );
}

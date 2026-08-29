import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

export default function TerminalCommandBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    { text: "System Boot Sequence initiated...", type: "system" },
    {
      text: "Welcome stranger! I am Sutanjoy's interactive kernel assistant.",
      type: "system",
    },
    {
      text: "Type 'help' to see what you can ask me, or type things like 'who are you', 'hire', or 'hobbies'.",
      type: "system",
    },
  ]);

  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  const buttonRef = useRef(null);
  const bottomRef = useRef(null);
  const badgeLeftRef = useRef(null);
  const badgeRightRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(badgeLeftRef.current, {
        y: -5,
        repeat: -1,
        yoyo: true,
        duration: 0.6,
        ease: "sine.inOut",
      });

      gsap.to(badgeRightRef.current, {
        y: 5,
        repeat: -1,
        yoyo: true,
        duration: 0.6,
        ease: "sine.inOut",
        delay: 0.3,
      });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      if (overlayRef.current && modalRef.current) {
        gsap.fromTo(
          overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: "power2.out" },
        );
        gsap.fromTo(
          modalRef.current,
          { scale: 0.85, opacity: 0, rotationX: 15 },
          {
            scale: 1,
            opacity: 1,
            rotationX: 0,
            duration: 0.45,
            ease: "back.out(1.5)",
          },
        );
      }
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [history, isOpen]);

  const handleCommand = (e) => {
    e.preventDefault();
    const rawCmd = input.trim();
    const cmd = rawCmd.toLowerCase();
    if (!cmd) return;

    let response = "";
    switch (cmd) {
      case "help":
      case "commands":
        response =
          "Available commands & topics:\n- skills: View frontend, languages, and tools\n- experience: Professional background & review work\n- projects: Explore featured web & system applications\n- contact: Direct communication channels\n- who are you: Learn more about Sutanjoy\n- hire: Why you should bring him on board\n- hobbies: What he does when away from the code editor\n- clear: Wipe the terminal display";
        break;
      case "skills":
      case "tech":
        response =
          "Frontend: React.js, Tailwind CSS, JavaScript (ES6+), HTML5, CSS3, GSAP\nLanguages: Python, C, C++ (STL), Java\nTools: Supabase, MySQL, Git & GitHub";
        break;
      case "experience":
      case "work":
        response =
          "1. Open Source Contributor & Reviewer (2026 - Present): Conducting rigorous code reviews, identifying bugs, and refining software architectures.\n2. Full-Stack & Frontend Engineering (2025 - Present): Building fluid user experiences, motion-driven interfaces, and responsive web systems.";
        break;
      case "projects":
        response =
          "Featured Archive:\n• ShopEase: Full-stack e-commerce interface with cart states and custom filtering.\n• Library Management System: High-performance C++ database engine with serialized records.\n• Weather App: Real-time atmospheric client consuming weather REST APIs.\n• Heritage Kitchen: Culinary brand platform showcasing responsive layout design.";
        break;
      case "contact":
      case "email":
        response =
          "Primary Inbox: bsutanjoy@gmail.com\nGitHub: github.com/sutanjoyb\nLinkedIn: linkedin.com/in/bsutanjoy\nX (Twitter): @sutanjoyb";
        break;
      case "who are you":
      case "about":
        response =
          "I'm Sutanjoy Bhattacharjee — a frontend developer, student, and code auditor who spends way too much time making animations smooth and fixing elusive compilation bugs.";
        break;
      case "hire":
      case "why hire you":
        response =
          "Because I combine clean aesthetic UI design with solid logic, ensuring products look gorgeous on the surface and perform reliably under the hood!";
        break;
      case "hobbies":
      case "hobby":
        response =
          "When not arguing with CSS grid or writing code, you'll find me loving to build web projects, reading books, drinking tea, and optimizing my dev toolchains.";
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      default:
        response = `zsh: command not found: ${rawCmd}. Type 'help' for a list of valid queries.`;
    }

    setHistory((prev) => [
      ...prev,
      { text: `$ ${rawCmd}`, type: "user" },
      { text: response, type: "output" },
    ]);
    setInput("");
  };

  return (
    <>
      <div className="w-full flex items-center justify-center py-20 relative z-10 gap-3">
        <div
          ref={badgeLeftRef}
          className="hidden sm:flex items-center gap-1.5 bg-yellow-300 border-2 border-black dark:border-white/20 px-2.5 py-1 rounded-md text-[11px] font-mono font-bold uppercase shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff] -rotate-3 select-none pointer-events-none text-black"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
          <span>Try this</span>
        </div>

        <button
          ref={buttonRef}
          onClick={() => setIsOpen(true)}
          onMouseEnter={() =>
            gsap.to(buttonRef.current, { scale: 1.04, duration: 0.2 })
          }
          onMouseLeave={() =>
            gsap.to(buttonRef.current, { scale: 1, duration: 0.2 })
          }
          className="relative group flex items-center gap-3 px-8 py-4 rounded-2xl border-2 border-black dark:border-white/20 bg-[#faf9f5] dark:bg-[#12161c] text-black dark:text-white font-mono text-xs uppercase font-extrabold shadow-[5px_5px_0px_#000] dark:shadow-[5px_5px_0px_#fff] hover:shadow-none hover:translate-x-1.5 hover:translate-y-1.5 transition-all cursor-pointer"
        >
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-black dark:bg-white group-hover:scale-125 transition-transform" />
          <span>Launch Terminal Assistant CLI</span>
        </button>

        <div
          ref={badgeRightRef}
          className="hidden sm:flex items-center gap-1.5 bg-emerald-300 border-2 border-black dark:border-white/20 px-2.5 py-1 rounded-md text-[11px] font-mono font-bold uppercase shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff] rotate-3 select-none pointer-events-none text-black"
        >
          <span>Interactive</span>
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
          </svg>
        </div>
      </div>

      {isOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 bg-black/50 backdrop-blur-md z-[999] flex items-center justify-center p-4"
        >
          <div
            ref={modalRef}
            className="w-full max-w-2xl bg-white dark:bg-[#12161c] text-black dark:text-white border-2 border-black dark:border-white/20 rounded-3xl shadow-[10px_10px_0px_#000] dark:shadow-[10px_10px_0px_#fff] font-mono text-xs overflow-hidden flex flex-col h-[440px]"
          >
            <div className="flex items-center justify-between px-5 py-4 bg-[#faf9f5] dark:bg-[#1a212c] border-b-2 border-black dark:border-white/20">
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full border border-black dark:border-white/40 bg-red-400 inline-block cursor-pointer hover:opacity-80"
                  onClick={() => setIsOpen(false)}
                />
                <span className="w-3 h-3 rounded-full border border-black dark:border-white/40 bg-yellow-400 inline-block" />
                <span className="w-3 h-3 rounded-full border border-black dark:border-white/40 bg-emerald-400 inline-block" />
                <span className="text-xs text-black/60 dark:text-white/60 ml-2 font-bold tracking-wider">
                  sutanjoy@portfolio-cli ~ zsh
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-black dark:text-white hover:opacity-60 font-black px-2 text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 p-6 overflow-y-auto space-y-3.5 whitespace-pre-wrap text-sm leading-relaxed bg-[#faf9f5] dark:bg-[#12161c]">
              {history.map((h, i) => (
                <div
                  key={i}
                  className={
                    h.type === "user"
                      ? "text-black dark:text-white font-bold bg-black/5 dark:bg-white/5 px-3 py-1.5 rounded-xl w-max border border-black/10 dark:border-white/10"
                      : h.type === "system"
                        ? "text-black/60 dark:text-white/60 italic font-medium"
                        : "text-black/90 dark:text-white/90 pl-3.5 border-l-2 border-black dark:border-white font-medium"
                  }
                >
                  {h.text}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            <form
              onSubmit={handleCommand}
              className="p-4 bg-white dark:bg-[#1a212c] border-t-2 border-black dark:border-white/20 flex items-center gap-3"
            >
              <span className="text-black dark:text-white font-bold text-sm">
                $
              </span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="type 'help', 'skills', 'who are you'..."
                className="flex-1 bg-transparent text-black dark:text-white focus:outline-none font-mono text-sm placeholder:text-black/30 dark:placeholder:text-white/30 font-medium"
                autoFocus
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
}

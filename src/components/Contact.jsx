import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact({ email = "bsutanjoy@gmail.com" }) {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const leftCardRef = useRef(null);
  const rightCardRef = useRef(null);
  const formRef = useRef(null);
  const copyBtnRef = useRef(null);
  const submitBtnRef = useRef(null);

  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleCopy = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(email);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formState.name ||
      !formState.email ||
      !formState.subject ||
      !formState.message
    )
      return;
    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          to_email: "bsutanjoy@gmail.com",
          name: formState.name,
          sender_email: formState.email,
          replyto: formState.email,
          subject: `[Portfolio Contact] ${formState.subject} from ${formState.name}`,
          message: `From: ${formState.name} (${formState.email})\nTopic: ${formState.subject}\n\nMessage:\n${formState.message}`,
          from_name: formState.name,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setIsSent(true);
        setFormState({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        setTimeout(() => setIsSent(false), 4000);
      } else {
        alert("Failed to deliver message. Please use direct email.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("An unexpected error occurred. Please use direct email.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      if (headerRef.current?.children) {
        tl.fromTo(
          headerRef.current.children,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power3.out" },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="scroll-mt-28 mt-24 sm:mt-36 mb-16 relative z-10 w-full px-4 sm:px-8 max-w-7xl mx-auto"
    >
      <div
        ref={headerRef}
        className="flex flex-col md:flex-row md:items-end justify-between border-b-2 border-black dark:border-white/20 pb-5 mb-10 gap-4 transition-colors duration-300"
      >
        <div className="text-left flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs uppercase tracking-[0.25em] text-black dark:text-white font-mono font-bold">
              ✦ 03 RADAR
            </span>
          </div>
          <h3 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase text-black dark:text-white leading-none">
            Don't Be A Stranger.
          </h3>
        </div>

        <div className="md:text-right shrink-0">
          <p className="text-xs sm:text-sm font-mono text-black/70 dark:text-white/70 uppercase tracking-widest max-w-[280px] md:ml-auto">
            MY INBOX DOESN'T BITE. DROP A LINE BEFORE I FIX ANOTHER BUG.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch relative z-10">
        <div ref={leftCardRef} className="lg:col-span-5 flex flex-col">
          <div className="bg-[#f2f1ed] dark:bg-[#12161c] border-2 border-black/15 dark:border-white/20 rounded-2xl sm:rounded-3xl p-5 sm:p-8 flex flex-col justify-between shadow-sm h-full transition-colors duration-300">
            <div className="space-y-2 sm:space-y-3">
              <span className="text-[10px] sm:text-xs font-mono tracking-widest text-black/50 dark:text-white/50 uppercase block font-bold">
                Direct Email
              </span>
              <h4 className="text-xl sm:text-3xl font-black tracking-tight text-black dark:text-white">
                Shoot An Email
              </h4>
              <p className="text-xs sm:text-sm text-black/70 dark:text-white/70 font-light leading-relaxed">
                Prefer using your own mail client? Drop a direct message into my
                primary inbox anytime.
              </p>
            </div>

            <div className="mt-8 sm:mt-12 pt-4 sm:pt-6 border-t border-black/10 dark:border-white/10 flex items-center justify-between gap-2 transition-colors duration-300">
              <a
                href={`mailto:${email}`}
                className="font-mono text-[11px] sm:text-sm font-semibold text-black dark:text-white hover:underline truncate"
              >
                {email}
              </a>

              <button
                ref={copyBtnRef}
                type="button"
                onClick={handleCopy}
                aria-label="Copy email address"
                className={`relative w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border transition-all shrink-0 cursor-pointer ${
                  copied
                    ? "bg-emerald-600 border-emerald-600 text-white"
                    : "bg-black text-white dark:bg-white dark:text-black border-black dark:border-white"
                }`}
              >
                {copied ? (
                  <svg
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <div
          ref={rightCardRef}
          className="lg:col-span-7 bg-[#f8f7f4] dark:bg-[#12161c] border-2 border-black/15 dark:border-white/20 rounded-2xl sm:rounded-3xl p-5 sm:p-10 shadow-sm flex flex-col justify-center transition-colors duration-300"
        >
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-black/10 dark:border-white/10 pb-3 sm:pb-4 mb-4 sm:mb-6 gap-1 transition-colors duration-300">
            <h4 className="text-base sm:text-lg font-bold text-black dark:text-white text-left">
              Send a Message
            </h4>
            <p className="text-[11px] sm:text-xs text-black/60 dark:text-white/60 sm:text-right font-mono">
              I will reply back promptly.
            </p>
          </div>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-4 sm:space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <div className="space-y-1">
                <label className="block text-[10px] sm:text-xs font-mono uppercase tracking-wider text-black/70 dark:text-white/70">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={formState.name}
                  onChange={(e) =>
                    setFormState({ ...formState, name: e.target.value })
                  }
                  className="w-full bg-black/[0.03] dark:bg-white/[0.04] border border-black/15 dark:border-white/20 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-black dark:text-white placeholder-black/30 dark:placeholder-white/30 focus:outline-none focus:border-black dark:focus:border-white transition-all duration-300"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] sm:text-xs font-mono uppercase tracking-wider text-black/70 dark:text-white/70">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="your.email@example.com"
                  value={formState.email}
                  onChange={(e) =>
                    setFormState({ ...formState, email: e.target.value })
                  }
                  className="w-full bg-black/[0.03] dark:bg-white/[0.04] border border-black/15 dark:border-white/20 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-black dark:text-white placeholder-black/30 dark:placeholder-white/30 focus:outline-none focus:border-black dark:focus:border-white transition-all duration-300"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] sm:text-xs font-mono uppercase tracking-wider text-black/70 dark:text-white/70">
                Subject *
              </label>
              <select
                required
                value={formState.subject}
                onChange={(e) =>
                  setFormState({ ...formState, subject: e.target.value })
                }
                className="w-full bg-black/[0.03] dark:bg-white/[0.04] border border-black/15 dark:border-white/20 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white cursor-pointer transition-all duration-300"
              >
                <option
                  value=""
                  disabled
                  className="bg-white dark:bg-[#12161c]"
                >
                  Select a subject...
                </option>
                <option
                  value="Job Opportunity"
                  className="bg-white dark:bg-[#12161c]"
                >
                  Job / Internship Opportunity
                </option>
                <option
                  value="Project Collaboration"
                  className="bg-white dark:bg-[#12161c]"
                >
                  Project Collaboration
                </option>
                <option
                  value="Freelance Work"
                  className="bg-white dark:bg-[#12161c]"
                >
                  Freelance Project
                </option>
                <option
                  value="General Discussion"
                  className="bg-white dark:bg-[#12161c]"
                >
                  General Chat
                </option>
                <option value="Other" className="bg-white dark:bg-[#12161c]">
                  Other
                </option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] sm:text-xs font-mono uppercase tracking-wider text-black/70 dark:text-white/70">
                Message *
              </label>
              <textarea
                rows="4"
                required
                placeholder="Write your message here..."
                value={formState.message}
                onChange={(e) =>
                  setFormState({ ...formState, message: e.target.value })
                }
                className="w-full bg-black/[0.03] dark:bg-white/[0.04] border border-black/15 dark:border-white/20 rounded-xl p-3.5 text-xs sm:text-sm text-black dark:text-white placeholder-black/30 dark:placeholder-white/30 focus:outline-none focus:border-black dark:focus:border-white resize-none transition-all duration-300"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
              <span className="text-[10px] sm:text-xs text-black/50 dark:text-white/50 font-mono">
                * All fields are required
              </span>

              <button
                ref={submitBtnRef}
                type="submit"
                disabled={isSubmitting || isSent}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-black text-white dark:bg-white dark:text-black font-mono text-xs uppercase tracking-wider font-semibold hover:opacity-85 disabled:opacity-50 cursor-pointer transition-all shadow-sm"
              >
                {isSubmitting
                  ? "Sending..."
                  : isSent
                    ? "Message Sent ✓"
                    : "Send Message ↗"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

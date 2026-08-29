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
    subject: "Job Opportunity",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleMagneticMove = (e, targetRef, strength = 0.25) => {
    const el = targetRef?.current;
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

  const handleMagneticLeave = (targetRef) => {
    const el = targetRef?.current;
    if (!el) return;

    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.45,
      ease: "elastic.out(1.2, 0.4)",
    });
  };

  const handleInputFocus = (e) => {
    gsap.to(e.target, {
      borderBottomColor: "#000000",
      paddingLeft: "8px",
      duration: 0.2,
      ease: "power2.out",
    });
  };

  const handleInputBlur = (e) => {
    gsap.to(e.target, {
      borderBottomColor: "rgba(0,0,0,0.2)",
      paddingLeft: "0px",
      duration: 0.2,
      ease: "power2.out",
    });
  };

  const handleCopy = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(email);
    }
    setCopied(true);

    if (copyBtnRef.current) {
      gsap
        .timeline()
        .to(copyBtnRef.current, {
          scale: 0.82,
          duration: 0.1,
          ease: "power2.in",
        })
        .to(copyBtnRef.current, {
          scale: 1.15,
          duration: 0.2,
          ease: "back.out(2)",
        })
        .to(copyBtnRef.current, { scale: 1, duration: 0.15 });
    }

    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

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

        if (submitBtnRef.current) {
          gsap.fromTo(
            submitBtnRef.current,
            { scale: 0.9 },
            { scale: 1, duration: 0.4, ease: "elastic.out(1.4, 0.4)" },
          );
        }

        setFormState({
          name: "",
          email: "",
          subject: "Job Opportunity",
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

      if (leftCardRef.current) {
        tl.fromTo(
          leftCardRef.current,
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "-=0.3",
        );
      }

      if (rightCardRef.current) {
        tl.fromTo(
          rightCardRef.current,
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "-=0.4",
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="mt-28 sm:mt-36 mb-16 relative z-10 w-full"
    >
      <div
        ref={headerRef}
        className="flex flex-col md:flex-row md:items-end justify-between border-b-2 border-black pb-5 mb-10 gap-4"
      >
        <div className="text-left flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs uppercase tracking-[0.25em] text-black font-mono font-bold">
              ✦ 03 RADAR
            </span>
          </div>
          <h3 className="text-[clamp(1.85rem,4.5vw,4.5rem)] font-black tracking-tighter uppercase text-black leading-none whitespace-nowrap">
            Don't Be A Stranger.
          </h3>
        </div>

        <div className="md:text-right shrink-0">
          <p className="text-xs sm:text-sm font-mono text-black/70 uppercase tracking-widest max-w-[280px] md:ml-auto">
            MY INBOX DOESN'T BITE. DROP A LINE BEFORE I FIX ANOTHER BUG.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch relative z-10">
        <div
          ref={leftCardRef}
          className="lg:col-span-5 flex flex-col relative z-10"
        >
          <div className="bg-[#f2f1ed] border border-black/15 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:border-black/30 transition-all duration-300 h-full group">
            <div className="space-y-3">
              <span className="text-xs font-mono tracking-wider text-black/50 uppercase block font-bold">
                Direct Email
              </span>
              <h4 className="text-2xl sm:text-3xl font-bold tracking-tight text-black group-hover:translate-x-1 transition-transform duration-200">
                Shoot An Email
              </h4>
              <p className="text-sm text-black/70 font-light leading-relaxed">
                Prefer using your own mail client? Drop a direct message into my
                primary inbox anytime.
              </p>
            </div>

            <div className="mt-12 pt-6 border-t border-black/10 flex items-center justify-between gap-3">
              <a
                href={`mailto:${email}`}
                className="font-mono text-sm sm:text-base font-semibold text-black hover:text-black/60 hover:underline underline-offset-4 transition-all truncate"
              >
                {email}
              </a>

              <button
                ref={copyBtnRef}
                type="button"
                onClick={handleCopy}
                aria-label="Copy email address"
                title={copied ? "Copied!" : "Copy to clipboard"}
                onMouseMove={(e) => handleMagneticMove(e, copyBtnRef, 0.3)}
                onMouseLeave={() => handleMagneticLeave(copyBtnRef)}
                className={`relative w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-200 shrink-0 cursor-pointer active:scale-90 ${
                  copied
                    ? "bg-emerald-600 border-emerald-600 text-white shadow-md"
                    : "bg-black text-white border-black hover:bg-neutral-800 hover:shadow-md"
                }`}
              >
                {copied ? (
                  <svg
                    className="w-4 h-4 scale-100 transition-transform"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 transition-transform duration-150 group-hover:scale-105"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <div
          ref={rightCardRef}
          className="lg:col-span-7 bg-[#f8f7f4] border border-black/15 rounded-3xl p-6 sm:p-10 shadow-sm hover:border-black/30 flex flex-col justify-center relative z-10 transition-all duration-300"
        >
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-black/10 pb-4 mb-6 gap-1">
            <h4 className="text-lg font-bold text-black text-left">
              Send a Message
            </h4>
            <p className="text-xs text-black/60 sm:text-right">
              I will reply back promptly.
            </p>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5 group">
                <label className="block text-xs font-mono uppercase tracking-wider text-black/70 group-hover:text-black transition-colors">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={formState.name}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  onChange={(e) =>
                    setFormState({ ...formState, name: e.target.value })
                  }
                  className="w-full bg-transparent border-b-2 border-black/20 hover:border-black/50 py-2 text-sm text-black placeholder-black/30 focus:outline-none transition-all duration-200"
                />
              </div>

              <div className="space-y-1.5 group">
                <label className="block text-xs font-mono uppercase tracking-wider text-black/70 group-hover:text-black transition-colors">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="your.email@example.com"
                  value={formState.email}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  onChange={(e) =>
                    setFormState({ ...formState, email: e.target.value })
                  }
                  className="w-full bg-transparent border-b-2 border-black/20 hover:border-black/50 py-2 text-sm text-black placeholder-black/30 focus:outline-none transition-all duration-200"
                />
              </div>
            </div>

            <div className="space-y-1.5 group">
              <label className="block text-xs font-mono uppercase tracking-wider text-black/70 group-hover:text-black transition-colors">
                Subject *
              </label>
              <select
                value={formState.subject}
                onChange={(e) =>
                  setFormState({ ...formState, subject: e.target.value })
                }
                className="w-full bg-transparent border-b-2 border-black/20 hover:border-black/50 focus:border-black py-2 text-sm text-black focus:outline-none transition-colors cursor-pointer"
              >
                <option value="Job Opportunity">
                  Job / Internship Opportunity
                </option>
                <option value="Project Collaboration">
                  Project Collaboration
                </option>
                <option value="Freelance Work">Freelance Project</option>
                <option value="General Discussion">General Chat</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="space-y-1.5 pt-2 group">
              <label className="block text-xs font-mono uppercase tracking-wider text-black/70 group-hover:text-black transition-colors">
                Message *
              </label>
              <textarea
                rows="4"
                required
                placeholder="Write your message here..."
                value={formState.message}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onChange={(e) =>
                  setFormState({ ...formState, message: e.target.value })
                }
                className="w-full bg-transparent border-b-2 border-black/20 hover:border-black/50 py-2 text-sm text-black placeholder-black/30 focus:outline-none transition-all duration-200 resize-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4">
              <span className="text-xs text-black/50 text-left font-mono">
                * All fields are required
              </span>

              <button
                ref={submitBtnRef}
                type="submit"
                disabled={isSubmitting || isSent}
                onMouseMove={(e) => handleMagneticMove(e, submitBtnRef, 0.25)}
                onMouseLeave={() => handleMagneticLeave(submitBtnRef)}
                className="group inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-black text-white font-mono text-xs uppercase tracking-wider font-semibold hover:bg-neutral-800 hover:shadow-lg active:scale-95 disabled:opacity-50 cursor-pointer transition-all duration-200"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : isSent ? (
                  <>
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>Message Sent</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <span className="inline-block transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1">
                      ↗
                    </span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

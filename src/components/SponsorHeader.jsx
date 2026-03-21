import { useEffect, useState } from "react";

const SponsorHeader = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const fadeUp = (delay = 0) => ({
    opacity:    mounted ? 1 : 0,
    transform:  mounted ? "translateY(0)" : "translateY(28px)",
    transition: `opacity 0.7s ease ${delay}ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
  });

  return (
    <header
      className="relative overflow-hidden px-5 pt-28 pb-24 sm:pt-32 sm:pb-28 text-center"
      style={{
        background: "linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%)",
      }}
    >
      {/* Radial glow overlay */}
      <div
        className="pointer-events-none absolute -top-1/2 -left-[10%] w-[150%] h-[150%] z-0"
        style={{
          background:
            "radial-gradient(circle at center, rgba(255,255,255,0.10) 0%, transparent 60%)",
        }}
      />

      {/* Subtle bottom fade into page */}
      <div
        className="pointer-events-none absolute bottom-0 inset-x-0 h-16 z-0"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(0,0,0,0.10))",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto">
        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-5"
          style={{
            color:      "var(--text-light)",
            textShadow: "0 4px 10px rgba(0,0,0,0.20)",
            ...fadeUp(120),
          }}
        >
          Sponsor Q-Hackathon 2026
        </h1>

        <p
          className="text-lg sm:text-xl font-normal leading-relaxed"
          style={{
            color:   "var(--secondary)",
            opacity: mounted ? 0.92 : 0,
            transform: mounted ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease 260ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) 260ms",
          }}
        >
          Support the next generation of innovators and gain brand visibility
          among top student developers and tech enthusiasts.
        </p>
      </div>
    </header>
  );
};

export default SponsorHeader;
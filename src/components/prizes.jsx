import { useEffect, useRef, useState } from "react";
import { Trophy, Medal, Award, Star } from "lucide-react";

const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
};

const prizes = [
  {
    tier: "silver",
    Icon: Medal,
    label: "1st Runner-Up",
    amount: "₹5,000",
    perks: ["Trophy", "Merit Certificate"],
    accentColor: "#b0b0b0",
    glowColor: "rgba(180,180,180,0.22)",
  },
  {
    tier: "gold",
    Icon: Trophy,
    label: "Winner",
    amount: "₹7,000",
    perks: ["Winner's Trophy", "Merit Certificate"],
    accentColor: "#f5c400",
    glowColor: "rgba(245,196,0,0.22)",
  },
  {
    tier: "bronze",
    Icon: Award,
    label: "2nd Runner-Up",
    amount: "₹3,000",
    perks: ["Trophy", "Merit Certificate"],
    accentColor: "#cd7f32",
    glowColor: "rgba(205,127,50,0.20)",
  },
];

const PrizeCard = ({ tier, Icon, label, amount, perks, accentColor, glowColor, inView, index, isMobile }) => {
  const isGold = tier === "gold";
  const delays = [1, 0, 2];
  const delay = delays[index] * 110;

  return (
    <div
      className="relative flex flex-col items-center text-center rounded-(--radius)
                 bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{
        flex: isGold ? "1.15" : "1",            // gold slightly wider on desktop
        border: isGold ? `2px solid ${accentColor}` : "1px solid var(--border)",
        boxShadow: isGold ? `0 12px 36px ${glowColor}` : "0 4px 14px rgba(0,0,0,0.05)",
        // Mobile: uniform padding. Desktop: gold is taller via paddingTop/Bottom
        paddingTop:    isGold && !isMobile ? "2rem" : "1.25rem",
        paddingBottom: isGold && !isMobile ? "2rem" : "1.25rem",
        paddingLeft:   "0.75rem",
        paddingRight:  "0.75rem",
        opacity:    inView ? 1 : 0,
        transform:  inView ? "translateY(0) scale(1)" : "translateY(36px) scale(0.96)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}ms, box-shadow 0.3s ease`,
      }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 18px 42px ${glowColor}`; }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = isGold ? `0 12px 36px ${glowColor}` : "0 4px 14px rgba(0,0,0,0.05)";
      }}
    >
      {/* Top accent bar */}
      <div className="absolute top-0 inset-x-0 h-0.75 sm:h-1" style={{ background: accentColor }} />

      {/* Winner badge — only on desktop (too cramped on mobile) */}
      {isGold && !isMobile && (
        <div
          className="absolute top-2.5 right-2.5 text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full"
          style={{ background: "#fef3c7", color: "#92400e" }}
        >
          ★ Top
        </div>
      )}

      {/* Icon */}
      <div
        className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg flex items-center justify-center mb-2 mt-1"
        style={{ background: isGold ? "#fffbea" : "var(--secondary)", border: `1.5px solid ${accentColor}` }}
      >
        <Icon size={isMobile ? 16 : 20} strokeWidth={1.8} style={{ color: accentColor }} />
      </div>

      {/* Label */}
      <p className="text-[8px] sm:text-[10px] font-extrabold uppercase tracking-wider mb-0.5" style={{ color: "#aaa" }}>
        {label}
      </p>

      {/* Amount */}
      <div
        className="text-lg sm:text-2xl font-black leading-none my-1.5 sm:my-2"
        style={{ color: "var(--primary)" }}
      >
        {amount}
      </div>

      {/* Divider */}
      <div className="w-6 h-0.5 rounded-full mb-2" style={{ background: accentColor }} />

      {/* Perks */}
      <ul className="flex flex-col gap-1 w-full">
        {perks.map(text => (
          <li
            key={text}
            className="flex items-center gap-1 justify-center text-[10px] sm:text-xs font-medium"
            style={{ color: "#666" }}
          >
            <Star size={8} strokeWidth={2} style={{ color: accentColor, flexShrink: 0 }} />
            <span className="leading-tight">{text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Prizes = () => {
  const [headerRef, headerInView] = useInView(0.3);
  const [gridRef,   gridInView]   = useInView(0.1);

  // Detect mobile to pass down for conditional rendering
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section
      className="relative overflow-hidden py-12 sm:py-16 px-4 sm:px-6 text-center"
      
    >
      <div className="relative z-10 max-w-3xl mx-auto">

        {/* Header */}
        <div
          ref={headerRef}
          className="mb-7 sm:mb-10"
          style={{
            opacity:    headerInView ? 1 : 0,
            transform:  headerInView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-2"
            style={{ color: "var(--text-dark)" }}
          >
            Prize Pool
          </h2>
          <div
            className="h-1 w-14 sm:w-16 rounded-full mx-auto mb-3 sm:mb-4"
            style={{ background: "linear-gradient(90deg, var(--primary), var(--secondary))" }}
          />
          <p className="text-sm sm:text-base font-bold" style={{ color: "var(--text-dark)" }}>
            Total Rewards Worth{" "}
            <span
              className="px-2.5 py-0.5 rounded-full font-black text-xs sm:text-sm"
              style={{ color: "var(--primary)", background: "var(--secondary)" }}
            >
              ₹15,000
            </span>
          </p>
        </div>

        {/* Always 3 in a row — but sized correctly for mobile */}
        <div
          ref={gridRef}
          className="flex flex-row gap-2 sm:gap-4 items-end"
        >
          {prizes.map((prize, i) => (
            <PrizeCard
              key={prize.tier}
              {...prize}
              index={i}
              inView={gridInView}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Prizes;
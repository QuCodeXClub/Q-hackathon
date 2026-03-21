import { useEffect, useRef, useState } from "react";
import { Users, Laptop, Timer, GraduationCap } from "lucide-react";

const stats = [
  { Icon: Users,          value: "300+", label: "Participants"          },
  { Icon: Laptop,         value: "60+",  label: "Diverse Teams"         },
  { Icon: Timer,          value: "36",   label: "Hours of Hacking"      },
  { Icon: GraduationCap,  value: "10+",  label: "Colleges Represented"  },
];

/* ── IntersectionObserver hook (fires once) ── */
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

/* ── Stat Card ── */
const StatCard = ({ Icon, value, label, index, inView }) => (
  <div
    className="group flex flex-col items-center text-center rounded-(--radius)
               border px-6 py-9 transition-all duration-300 hover:-translate-y-2"
    style={{
      background:   "var(--text-light)",
      borderColor:  "var(--border)",
      boxShadow:    "0 2px 10px rgba(0,0,0,0.04)",
      // Landing animation
      opacity:    inView ? 1 : 0,
      transform:  inView ? "translateY(0) scale(1)" : "translateY(36px) scale(0.96)",
      transition: `opacity 0.6s ease ${index * 90}ms,
                   transform 0.6s cubic-bezier(0.22,1,0.36,1) ${index * 90}ms,
                   border-color 0.3s ease, box-shadow 0.3s ease`,
    }}
    onMouseEnter={e => {
      e.currentTarget.style.boxShadow   = "0 12px 28px rgba(140,46,124,0.12)";
      e.currentTarget.style.borderColor = "var(--primary)";
    }}
    onMouseLeave={e => {
      e.currentTarget.style.boxShadow   = "0 2px 10px rgba(0,0,0,0.04)";
      e.currentTarget.style.borderColor = "var(--border)";
    }}
  >
    {/* Icon bubble */}
    <div
      className="w-14 h-14 rounded-xl flex items-center justify-center mb-4
                 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
      style={{ background: "var(--secondary)" }}
    >
      <Icon size={26} strokeWidth={1.8} style={{ color: "var(--primary)" }} />
    </div>

    {/* Value */}
    <h3
      className="text-4xl sm:text-5xl font-extrabold leading-none mb-1"
      style={{ color: "var(--text-dark)" }}
    >
      {value}
    </h3>

    {/* Label */}
    <p className="text-sm sm:text-base font-semibold mt-1.5" style={{ color: "var(--primary-dark)" }}>
      {label}
    </p>
  </div>
);

/* ── Main Section ── */
const ImpactStats = () => {
  const [subtitleRef, subtitleInView] = useInView(0.3);
  const [gridRef,     gridInView]     = useInView(0.1);

  return (
    <section
      className="py-16 sm:py-20 px-5 text-center"
      style={{ background: "var(--bg-light)" }}
    >
      <div className="max-w-5xl mx-auto">

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-xs font-extrabold uppercase tracking-widest mb-10"
          style={{
            color:      "var(--primary)",
            opacity:    subtitleInView ? 1 : 0,
            transform:  subtitleInView ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.6s ease 80ms, transform 0.6s ease 80ms",
          }}
        >
          Q-Hackathon by the numbers
        </p>

        {/* Grid — 2 cols on mobile, 4 on desktop */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {stats.map(({ Icon, value, label }, i) => (
            <StatCard
              key={label}
              Icon={Icon}
              value={value}
              label={label}
              index={i}
              inView={gridInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
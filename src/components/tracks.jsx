import { useEffect, useRef, useState } from "react";
import { Brain, ShieldCheck, Link2, Leaf, Rocket } from "lucide-react";

const tracks = [
  {
    Icon: Brain,
    title: "AI for Impact",
    description: "Leverage Machine Learning and Neural Networks to solve pressing societal challenges.",
    tag: "Deep Tech",
  },
  {
    Icon: ShieldCheck,
    title: "Cybersecurity",
    description: "Defend the digital frontier with encryption, ethical hacking, and secure protocols.",
    tag: "Security",
  },
  {
    Icon: Link2,
    title: "Blockchain",
    description: "Build decentralized apps (DApps) and smart contracts for a transparent future.",
    tag: "Web3",
  },
  {
    Icon: Leaf,
    title: "Smart India",
    description: "Develop sustainable solutions for rural development, energy, and smart cities.",
    tag: "Sustainability",
  },
  {
    Icon: Rocket,
    title: "Open Innovation",
    description: "Have a unique idea? This track is for wildcards and groundbreaking concepts.",
    tag: "Any Theme",
  },
];

const useInView = (threshold = 0.1) => {
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

/* ── Track Card ── */
const TrackCard = ({ Icon, title, description, tag, index, inView }) => {
  const delay = index * 90;

  return (
    <div
      className="group relative flex flex-col items-start text-left
                 p-5 sm:p-7 rounded-(--radius)
                 border border-(--border) overflow-hidden cursor-default
                 transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]
                 hover:-translate-y-1.5 sm:hover:-translate-y-2.5 hover:border-(--primary)"
      style={{
        background: "var(--bg-light)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
        opacity:   inView ? 1 : 0,
        transform: inView ? "translateY(0) scale(1)" : "translateY(36px) scale(0.97)",
        transition: `opacity 0.6s ease ${delay}ms,
                     transform 0.6s cubic-bezier(0.175,0.885,0.32,1.275) ${delay}ms,
                     box-shadow 0.4s ease, border-color 0.4s ease`,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow  = "0 16px 36px rgba(140,46,124,0.15)";
        e.currentTarget.style.background = "#ffffff";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow  = "0 2px 12px rgba(0,0,0,0.04)";
        e.currentTarget.style.background = "var(--bg-light)";
      }}
    >
      {/* Top gradient bar on hover */}
      <div
        className="absolute inset-x-0 top-0 h-0.75 scale-x-0 group-hover:scale-x-100
                   origin-left transition-transform duration-500"
        style={{ background: "linear-gradient(90deg, var(--primary), var(--secondary))" }}
      />

      {/* Icon bubble */}
      <div
        className="mb-4 w-11 h-11 sm:w-14 sm:h-14 flex items-center justify-center rounded-xl
                   transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 shrink-0"
        style={{ background: "var(--secondary)" }}
        onMouseEnter={e => { e.currentTarget.style.background = "var(--primary)"; }}
        onMouseLeave={e => { e.currentTarget.style.background = "var(--secondary)"; }}
      >
        <Icon size={22} style={{ color: "var(--primary)" }} />
      </div>

      {/* Title */}
      <h3
        className="text-base sm:text-xl font-bold mb-2 sm:mb-3
                   transition-colors duration-300 group-hover:text-(--primary)"
        style={{ color: "var(--text-dark)" }}
      >
        {title}
      </h3>

      {/* Description */}
      <p className="text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 flex-1" style={{ color: "#666" }}>
        {description}
      </p>

      {/* Tag */}
      <span
        className="mt-auto text-[10px] sm:text-xs font-bold uppercase tracking-widest px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full"
        style={{ color: "var(--primary)", background: "var(--secondary)" }}
      >
        {tag}
      </span>
    </div>
  );
};

/* ── Main Section ── */
const Tracks = () => {
  const [headerRef, headerInView] = useInView(0.2);
  const [gridRef,   gridInView]   = useInView(0.05);

  return (
    <section
      id="tracks"
      className="py-14 sm:py-20 lg:py-24 px-4 sm:px-6"
      style={{
        background: "radial-gradient(circle at bottom left, var(--secondary), var(--bg-light) 60%)",
      }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div
          ref={headerRef}
          className="text-center mb-10 sm:mb-14"
          style={{
            opacity:    headerInView ? 1 : 0,
            transform:  headerInView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-2"
            style={{ color: "var(--text-dark)" }}
          >
            Hackathon Tracks
          </h2>
          <p className="text-sm sm:text-base mb-3 sm:mb-4" style={{ color: "#888" }}>
            Select a domain and build the future.
          </p>
          <div
            className="h-1 w-14 sm:w-20 rounded-full mx-auto"
            style={{ background: "linear-gradient(90deg, var(--primary), var(--secondary))" }}
          />
        </div>

        {/* Grid — 1 col on mobile, 2 on sm, 3 on lg */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6"
        >
          {tracks.map((track, i) => (
            <TrackCard key={track.title} {...track} index={i} inView={gridInView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tracks;
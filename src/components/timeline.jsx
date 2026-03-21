import { useEffect, useRef, useState } from "react";
import {
  ClipboardList,
  ClipboardX,
  PartyPopper,
  ScanSearch,
  Trophy,
} from "lucide-react";

const events = [
  {
    date: "March 15, 2026",
    title: "Registration Opens",
    description: "Secure your spot and start forming your dream team.",
    Icon: ClipboardList,
    highlight: true,
  },
  {
    date: "April 15, 2026",
    title: "Registration Closes",
    description: "Final call for applications. No entries accepted after midnight.",
    Icon: ClipboardX,
    highlight: false,
  },
  {
    date: "April 24, 09:00 AM",
    title: "Opening Ceremony",
    description: "Keynote speeches, track reveals, and 36-hour hack begins!",
    Icon: PartyPopper,
    highlight: false,
  },
  {
    date: "April 25, 10:00 AM",
    title: "Mid Evaluation",
    description: "Mentors will review your progress and provide technical guidance.",
    Icon: ScanSearch,
    highlight: false,
  },
  {
    date: "April 25, 09:00 PM",
    title: "Final Presentation",
    description: "Pitch your solution to our panel of industry experts.",
    Icon: Trophy,
    highlight: false,
  },
];

/* ── IntersectionObserver hook (fires once) ── */
const useInView = (threshold = 0.2) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setInView(true); obs.disconnect(); }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
};

/* ── Card sub-component ── */
const Card = ({ date, title, description, Icon, highlight, align }) => (
  <div className="group w-full">
    {/* Date */}
    <span
      className={`block text-xs font-extrabold uppercase tracking-widest mb-2
                  text-(--primary)
                  ${align === "right" ? "text-right" : "text-left"}`}
    >
      {date}
    </span>

    {/* Box */}
    <div
      className={`relative overflow-hidden rounded-(--radius) border p-5
                  transition-all duration-300
                  group-hover:-translate-y-1
                  group-hover:border-(--primary)
                  group-hover:shadow-[0_10px_28px_rgba(140,46,124,0.13)]
                  ${highlight
                    ? "bg-white border-(--primary) shadow-[0_4px_20px_rgba(140,46,124,0.10)]"
                    : "bg-white border-(--border) shadow-[0_4px_15px_rgba(0,0,0,0.05)]"
                  }`}
    >
      {highlight && (
        <div
          className="absolute top-0 inset-x-0 h-0.75"
          style={{ background: "linear-gradient(90deg, var(--primary), var(--secondary))" }}
        />
      )}

      <div className={`flex items-center gap-3 mb-2 ${align === "right" ? "flex-row-reverse" : "flex-row"}`}>
        <div
          className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center
                      transition-all duration-300 group-hover:scale-110 group-hover:rotate-6
                      ${highlight ? "bg-(--primary)" : "bg-(--secondary)"}`}
        >
          <Icon size={20} color={highlight ? "white" : "var(--primary)"} strokeWidth={2} />
        </div>
        <h3 className="text-base font-bold leading-snug" style={{ color: "var(--text-dark)" }}>
          {title}
        </h3>
      </div>

      <p
        className={`text-sm leading-relaxed mt-1 ${align === "right" ? "text-right" : "text-left"}`}
        style={{ color: "#666" }}
      >
        {description}
      </p>
    </div>
  </div>
);

/* ── Single Timeline Row ── */
const TimelineItem = ({ date, title, description, Icon, highlight, index, inView }) => {
  const isLeft = index % 2 === 0;
  const delay = index * 120;

  return (
    <div
      className="relative flex items-start w-full mb-10 md:mb-14"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {/* ── DESKTOP 3-column layout: [left slot] [dot] [right slot] ── */}

      {/* LEFT SLOT */}
      <div className="hidden md:flex w-[calc(50%-20px)] justify-end pr-8">
        {isLeft && (
          <Card date={date} title={title} description={description}
                Icon={Icon} highlight={highlight} align="right" />
        )}
      </div>

      {/* CENTER DOT */}
      {/* Mobile: absolute on the left edge | Desktop: static in the flex row */}
      <div className="absolute left-0 top-5 md:static md:flex md:items-start md:pt-5.5 md:w-10 md:shrink-0 md:justify-center z-10">
        <div
          className={`w-5 h-5 rounded-full border-4 transition-all duration-300
            ${highlight
              ? "border-(--primary) bg-(--primary) shadow-[0_0_0_5px_var(--secondary)]"
              : "border-(--primary) bg-white"
            }`}
        />
      </div>

      {/* RIGHT SLOT */}
      <div className="pl-10 w-full md:pl-8 md:w-[calc(50%-20px)]">
        {/* Mobile: always show here */}
        <div className="md:hidden">
          <Card date={date} title={title} description={description}
                Icon={Icon} highlight={highlight} align="left" />
        </div>
        {/* Desktop: only odd (right-side) items */}
        {!isLeft && (
          <div className="hidden md:block">
            <Card date={date} title={title} description={description}
                  Icon={Icon} highlight={highlight} align="left" />
          </div>
        )}
      </div>
    </div>
  );
};

/* ── Main Section ── */
const Timeline = () => {
  const [headerRef, headerInView] = useInView(0.3);
  const [listRef, listInView] = useInView(0.1);

  return (
    <section
      id="timeline-section"
      className="relative overflow-hidden py-24 px-6"
      style={{
        background:
          "radial-gradient(circle at top left, var(--secondary), var(--bg-light) 60%)",
      }}
    >
      
      <div className="relative z-10 max-w-5xl mx-auto">

        {/* Header */}
        <div
          ref={headerRef}
          className="text-center mb-16 transition-all duration-700"
          style={{
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <h2
            className="text-4xl sm:text-5xl font-bold tracking-tight mb-3"
            style={{ color: "var(--text-dark)" }}
          >
            Event Roadmap
          </h2>
          <div
            className="h-1 w-20 rounded-full mx-auto"
            style={{ background: "linear-gradient(90deg, var(--primary), var(--secondary))" }}
          />
        </div>

        {/* Timeline wrapper */}
        <div ref={listRef} className="relative">

          {/* Vertical line — mobile: left-[9px] | desktop: true center */}
          <div
            className="absolute top-0 bottom-0 w-0.75 rounded-full z-0
                       left-2.25 md:left-[calc(50%-1.5px)]"
            style={{ background: "var(--border)" }}
          />

          <div className="relative z-10">
            {events.map((evt, i) => (
              <TimelineItem key={evt.title} {...evt} index={i} inView={listInView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
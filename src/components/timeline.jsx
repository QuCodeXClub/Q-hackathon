import { ClipboardList, ClipboardX, PartyPopper, ScanSearch, Trophy } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

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

/* ── Interactive 3D Card sub-component ── */
const Card = ({ date, title, description, Icon, highlight, align }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      className="w-full"
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Date */}
      <span
        className={`block text-xs font-extrabold uppercase tracking-widest mb-2 text-(--primary)
                    ${align === "right" ? "text-right" : "text-left"}`}
      >
        {date}
      </span>

      {/* Tilt Box */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={`relative overflow-hidden rounded-(--radius) border p-5 bg-white
                   ${highlight ? "border-(--primary) shadow-[0_8px_30px_rgba(140,46,124,0.15)]"
                               : "border-(--border) shadow-sm"}`}
      >
        {highlight && (
          <div
            className="absolute top-0 inset-x-0 h-1"
            style={{ background: "linear-gradient(90deg, var(--primary), var(--secondary))" }}
          />
        )}

        <div className={`flex items-center gap-3 mb-2 ${align === "right" ? "flex-row-reverse" : "flex-row"}`} style={{ transform: "translateZ(20px)" }}>
          <div
            className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center
                        ${highlight ? "bg-(--primary)" : "bg-(--secondary)"}`}
          >
            <Icon size={20} color={highlight ? "white" : "var(--primary)"} strokeWidth={2} />
          </div>
          <h3 className="text-base font-bold leading-snug text-(--text-dark)">
            {title}
          </h3>
        </div>

        <p
          className={`text-sm leading-relaxed mt-1 ${align === "right" ? "text-right" : "text-left"}`}
          style={{ color: "#666", transform: "translateZ(10px)" }}
        >
          {description}
        </p>
      </motion.div>
    </motion.div>
  );
};

/* ── Single Timeline Row ── */
const TimelineItem = ({ date, title, description, Icon, highlight, index }) => {
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative flex items-start w-full mb-10 md:mb-14"
    >
      {/* LEFT SLOT */}
      <div className="hidden md:flex w-[calc(50%-20px)] justify-end pr-8">
        {isLeft && (
          <Card date={date} title={title} description={description} Icon={Icon} highlight={highlight} align="right" />
        )}
      </div>

      {/* CENTER DOT */}
      <div className="absolute left-0 top-5 md:static md:flex md:items-start md:pt-5.5 md:w-10 md:shrink-0 md:justify-center z-10">
        <div
          className={`w-5 h-5 rounded-full border-4 transition-all duration-300
            ${highlight ? "border-(--primary) bg-(--primary) shadow-[0_0_0_5px_var(--secondary)]"
                        : "border-(--primary) bg-white"}`}
        />
      </div>

      {/* RIGHT SLOT */}
      <div className="pl-10 w-full md:pl-8 md:w-[calc(50%-20px)]">
        <div className="md:hidden">
          <Card date={date} title={title} description={description} Icon={Icon} highlight={highlight} align="left" />
        </div>
        {!isLeft && (
          <div className="hidden md:block">
            <Card date={date} title={title} description={description} Icon={Icon} highlight={highlight} align="left" />
          </div>
        )}
      </div>
    </motion.div>
  );
};

/* ── Main Section ── */
const Timeline = () => {
  return (
    <section
      id="timeline-section"
      className="relative overflow-hidden py-24 px-6"
      style={{ background: "radial-gradient(circle at top left, var(--secondary), var(--bg-light) 60%)" }}
    >
      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3" style={{ color: "var(--text-dark)" }}>
            Event Roadmap
          </h2>
          <div
            className="h-1 w-20 rounded-full mx-auto"
            style={{ background: "linear-gradient(90deg, var(--primary), var(--secondary))" }}
          />
        </motion.div>

        {/* Timeline wrapper */}
        <div className="relative">
          <div
            className="absolute top-0 bottom-0 w-0.75 rounded-full z-0 left-2.25 md:left-[calc(50%-1.5px)]"
            style={{ background: "var(--border)" }}
          />
          <div className="relative z-10">
            {events.map((evt, i) => (
              <TimelineItem key={evt.title} {...evt} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
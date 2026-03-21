import { useEffect, useRef, useState } from "react";
import { Plus, HelpCircle } from "lucide-react";

const faqData = [
  { question: "Who can participate?",          answer: "Students from invited colleges and universities can participate. Only undergraduate and postgraduate students are eligible." },
  { question: "What is the registration fee?", answer: "₹500 per team. Additional ₹250–₹300 per participant for accommodation and food (optional)." },
  { question: "What is the team size?",        answer: "Each team must have 4 to 6 members." },
  { question: "Is the hackathon online or offline?", answer: "It is a 36-hour offline hackathon on-campus at Quantum University." },
  { question: "What are the hackathon tracks?",answer: "AI, Cybersecurity, Blockchain, Smart India & Sustainability, and Open Innovation." },
  { question: "What is the duration?",         answer: "36 hours of continuous development including evaluation rounds and final presentations." },
  { question: "How are projects evaluated?",   answer: "Projects go through internal shortlisting followed by final jury evaluation based on innovation, technical depth, and usability." },
  { question: "Is accommodation available?",   answer: "Yes, separate accommodation for boys and girls is available with ID verification and monitoring." },
  { question: "What are the prizes?",          answer: "Winners and runners-up receive trophies, certificates, and cash prizes from a ₹15,000–₹25,000 pool." },
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

/* ── Single FAQ Item ── */
const FAQItem = ({ question, answer, index, inView }) => {
  const [open, setOpen] = useState(false);
  const answerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (answerRef.current) {
      setHeight(open ? answerRef.current.scrollHeight : 0);
    }
  }, [open]);

  const delay = index * 60;

  return (
    <div
      className="rounded-(--radius) overflow-hidden border transition-all duration-300"
      style={{
        borderColor: open ? "var(--primary)" : "var(--border)",
        boxShadow: open ? "0 6px 20px rgba(140,46,124,0.10)" : "0 2px 8px rgba(0,0,0,0.04)",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s cubic-bezier(0.22,1,0.36,1) ${delay}ms,
                     border-color 0.3s ease, box-shadow 0.3s ease`,
      }}
    >
      {/* Question button */}
      <button
        onClick={() => setOpen(prev => !prev)}
        className="w-full flex items-center justify-between gap-4 px-6 py-4
                   text-left font-semibold text-sm sm:text-base
                   transition-colors duration-200 focus:outline-none"
        style={{
          background: open ? "var(--secondary)" : "var(--secondary)",
          color: "var(--primary-dark)",
        }}
        onMouseEnter={e => { if (!open) e.currentTarget.style.background = "#ebd3e6"; }}
        onMouseLeave={e => { e.currentTarget.style.background = "var(--secondary)"; }}
      >
        <span className="flex items-center gap-3">
          <HelpCircle
            size={16}
            strokeWidth={2}
            className="shrink-0"
            style={{ color: "var(--primary)", opacity: open ? 1 : 0.5 }}
          />
          {question}
        </span>

        <Plus
          size={18}
          strokeWidth={2.5}
          className="shrink-0 transition-transform duration-300"
          style={{
            color: "var(--primary)",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
          }}
        />
      </button>

      {/* Animated answer */}
      <div
        style={{
          height: `${height}px`,
          overflow: "hidden",
          transition: "height 0.38s cubic-bezier(0.4,0,0.2,1)",
          background: "var(--text-light)",
        }}
      >
        <div ref={answerRef} className="px-6 py-4">
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-dark)" }}>
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};

/* ── Main Section ── */
const FAQ = () => {
  const [headerRef, headerInView] = useInView(0.3);
  const [listRef, listInView] = useInView(0.05);

  return (
    <section
      id="faq"
      className="py-20 px-6"
      style={{ background: "var(--bg-light)" }}
    >
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div
          ref={headerRef}
          className="text-center mb-10"
          style={{
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <h2
            className="text-4xl sm:text-5xl font-bold tracking-tight mb-3"
            style={{ color: "var(--text-dark)" }}
          >
            FAQ
          </h2>
          <div
            className="h-1 w-16 rounded-full mx-auto"
            style={{ background: "linear-gradient(90deg, var(--primary), var(--secondary))" }}
          />
        </div>

        {/* FAQ list */}
        <div ref={listRef} className="flex flex-col gap-3">
          {faqData.map((item, i) => (
            <FAQItem key={item.question} {...item} index={i} inView={listInView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
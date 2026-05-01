import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { lightProjects } from "../../data/projects-light";

const easeOut = [0.16, 1, 0.3, 1] as const;

const ROLES = [
  "Senior Product Designer",
  "Design Engineer",
  "AI-Native Builder",
  "Systems Thinker",
];

export default function Brutalist() {
  const reduced = useReducedMotion();

  return (
    <div className="bg-[#F4F4EE] text-[#0a0a0a] min-h-screen relative">
      {/* Background grid — visible technical paper feel */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none opacity-[0.4]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(10,10,10,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(10,10,10,0.05) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Top status bar — terminal style */}
      <header className="relative z-20 border-b-2 border-[#0a0a0a] bg-[#F4F4EE]" role="banner">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-12 flex items-center justify-between font-mono text-[11px]">
          <div className="flex items-center gap-3">
            <span className="size-2 rounded-full bg-[#65A30D] animate-pulse" aria-hidden="true" />
            <span className="text-[#0a0a0a]">~/oliveibriel</span>
            <span className="text-[#0a0a0a]/40 hidden sm:inline">$</span>
            <span className="text-[#0a0a0a]/60 hidden sm:inline">npx hire-me</span>
          </div>
          <a href="/" className="hover:bg-[#0a0a0a] hover:text-[#F4F4EE] px-2 py-0.5 transition-colors">
            ← /home
          </a>
        </div>
      </header>

      <main>
      {/* Hero */}
      <Hero reduced={!!reduced} />

      {/* Stats line — terminal output */}
      <Stats />

      {/* Projects grid — index card stack */}
      <Projects />

      {/* CLI prompt closing */}
      <Closing />
      </main>
    </div>
  );
}

function Hero({ reduced }: { reduced: boolean }) {
  const [roleIdx, setRoleIdx] = useState(0);
  const [typed, setTyped] = useState(ROLES[0]);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setRoleIdx((i) => (i + 1) % ROLES.length);
    }, 2800);
    return () => clearInterval(id);
  }, [reduced]);

  // Type effect on role change
  useEffect(() => {
    if (reduced) {
      setTyped(ROLES[roleIdx]);
      return;
    }
    const target = ROLES[roleIdx];
    let i = 0;
    setTyped("");
    const id = setInterval(() => {
      i++;
      setTyped(target.slice(0, i));
      if (i >= target.length) clearInterval(id);
    }, 32);
    return () => clearInterval(id);
  }, [roleIdx, reduced]);

  return (
    <section className="relative z-10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-12 md:pt-16 pb-16 md:pb-20">
        {/* Boot lines */}
        <motion.pre
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="font-mono text-[11px] leading-[1.6] text-[#0a0a0a]/60 mb-8 select-none whitespace-pre-wrap"
        >
{`> booting portfolio.v3.0
> palette: paper-warm · accent: #65A30D
> motion: framer-motion · reduced: ${reduced ? "true" : "false"}
> ready.`}
        </motion.pre>

        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-9">
            {/* Mono label */}
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[#0a0a0a]/70 mb-6"
            >
              <span className="border border-[#0a0a0a] px-2 py-0.5">role</span>
              <span aria-live="polite" aria-atomic="true">
                {typed}
                <span className="inline-block w-[2px] h-[1em] align-baseline bg-[#0a0a0a] ml-1 animate-[blink_1s_steps(2,end)_infinite]" aria-hidden="true" />
              </span>
            </motion.div>

            {/* Massive name in mono */}
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easeOut, delay: 0.25 }}
              className="font-mono font-medium leading-[0.95]"
              style={{ letterSpacing: "-0.05em", fontSize: "clamp(3rem, 9vw, 8rem)" }}
            >
              <span className="block">GABRIEL</span>
              <span className="block">OLIVEIRA<span className="text-[#65A30D]">_</span></span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easeOut, delay: 0.5 }}
              className="mt-8 max-w-2xl text-base md:text-lg leading-relaxed text-[#0a0a0a]/80"
            >
              <span className="font-mono text-[#65A30D]">$</span> Designs and ships{" "}
              <kbd className="font-mono text-sm px-1.5 py-0.5 border border-[#0a0a0a] rounded-sm bg-[#FBFBF6]">industrial SaaS</kbd>
              ,{" "}
              <kbd className="font-mono text-sm px-1.5 py-0.5 border border-[#0a0a0a] rounded-sm bg-[#FBFBF6]">design systems</kbd>
              , and{" "}
              <kbd className="font-mono text-sm px-1.5 py-0.5 border border-[#0a0a0a] rounded-sm bg-[#FBFBF6]">AI-native tools</kbd>
              . Currently building IRIS V3 at NETZSCH and running VOA Digital with my sister.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easeOut, delay: 0.7 }}
              className="mt-10 flex flex-wrap gap-3"
            >
              <CtaButton href="/work" variant="primary">
                cd ./work
              </CtaButton>
              <CtaButton href="mailto:gabriel@oliveibriel.com" variant="ghost">
                ./contact.sh
              </CtaButton>
            </motion.div>
          </div>

          {/* Photo card — index card in mono frame */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOut, delay: 0.4 }}
            className="lg:col-span-3 lg:self-end"
          >
            <div className="border-2 border-[#0a0a0a] bg-[#FBFBF6] p-3">
              <div className="aspect-[4/5] overflow-hidden border border-[#0a0a0a]/30 mb-3">
                <img
                  src="https://storage.googleapis.com/2026portfolio/Home/Link.jpg"
                  alt="Gabriel Oliveira"
                  className="w-full h-full object-cover grayscale-[10%]"
                />
              </div>
              <dl className="font-mono text-[10px] uppercase tracking-[0.15em] grid grid-cols-2 gap-y-1">
                <dt className="text-[#0a0a0a]/50">id</dt>
                <dd className="text-right">go-2026</dd>
                <dt className="text-[#0a0a0a]/50">loc</dt>
                <dd className="text-right">Curitiba, BR</dd>
                <dt className="text-[#0a0a0a]/50">stack</dt>
                <dd className="text-right">design + ai</dd>
              </dl>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CtaButton({
  children,
  href,
  variant,
}: {
  children: React.ReactNode;
  href: string;
  variant: "primary" | "ghost";
}) {
  const base =
    "inline-flex items-center gap-2 px-4 py-3 font-mono text-sm border-2 transition-all relative overflow-hidden group";
  const styles =
    variant === "primary"
      ? "bg-[#0a0a0a] text-[#F4F4EE] border-[#0a0a0a] hover:bg-[#65A30D] hover:border-[#65A30D]"
      : "bg-transparent text-[#0a0a0a] border-[#0a0a0a] hover:bg-[#0a0a0a] hover:text-[#F4F4EE]";
  return (
    <motion.a
      href={href}
      whileHover={{ x: -1, y: -1, boxShadow: "4px 4px 0 0 #0a0a0a" }}
      whileTap={{ x: 1, y: 1, boxShadow: "0 0 0 0 #0a0a0a" }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className={`${base} ${styles}`}
    >
      <span className="text-[#65A30D] group-hover:text-[#F4F4EE]">$</span>
      {children}
    </motion.a>
  );
}

function Stats() {
  return (
    <section className="relative z-10 border-y-2 border-[#0a0a0a] bg-[#0a0a0a] text-[#F4F4EE]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-8 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6 font-mono">
        {[
          { l: "years.shipped", v: "10+", c: "#F4F4EE" },
          { l: "case.studies", v: "14", c: "#F4F4EE" },
          { l: "onboarding.delta", v: "−40%", c: "#84CC16" },
          { l: "users.reach", v: "M+", c: "#F4F4EE" },
        ].map((s, i) => (
          <motion.div
            key={s.l}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="border-l-2 border-[#F4F4EE]/20 pl-4"
          >
            <p className="text-[10px] uppercase tracking-[0.15em] text-[#F4F4EE]/60 mb-1">
              {s.l}
            </p>
            <p className="text-3xl md:text-4xl font-bold tabular-nums" style={{ color: s.c, letterSpacing: "-0.03em" }}>
              {s.v}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-28">
      <div className="flex items-end justify-between mb-10 md:mb-14">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#0a0a0a]/60 mb-2">
            $ ls ./work
          </p>
          <h2 className="font-mono font-medium" style={{ letterSpacing: "-0.04em", fontSize: "clamp(2rem, 5vw, 4rem)" }}>
            select(*) from work
          </h2>
        </div>
        <a href="/work" className="hidden md:inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] border border-[#0a0a0a] px-3 py-2 hover:bg-[#0a0a0a] hover:text-[#F4F4EE] transition-colors">
          all.txt →
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#0a0a0a] border-2 border-[#0a0a0a]">
        {lightProjects.map((p, i) => (
          <motion.a
            key={p.slug}
            href={`/work/${p.slug}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive((cur) => (cur === i ? null : cur))}
            className="bg-[#FBFBF6] p-5 md:p-6 flex flex-col gap-4 relative overflow-hidden group"
          >
            {/* Number + meta */}
            <div className="flex items-start justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-[#0a0a0a]/60">
              <span>#{p.number}</span>
              <span>{p.year}</span>
            </div>

            {/* Image preview area */}
            <div className="aspect-[4/3] border border-[#0a0a0a]/15 overflow-hidden bg-[#F4F4EE] relative">
              {p.image ? (
                <img src={p.image} alt={`${p.title} cover`} loading="lazy" className="w-full h-full object-cover" />
              ) : (
                <div
                  className="w-full h-full grid place-items-center"
                  style={{ background: p.gradient ?? "#0a0a0a" }}
                >
                  <span className="font-mono text-white text-2xl tracking-[-0.04em] mix-blend-overlay">
                    {p.title}
                  </span>
                </div>
              )}
              {/* Scan-line overlay on hover */}
              <AnimatePresence>
                {active === i && (
                  <motion.div
                    initial={{ y: "-100%" }}
                    animate={{ y: "100%" }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.9, ease: "linear" }}
                    className="absolute inset-x-0 h-[2px] bg-[#65A30D] mix-blend-screen"
                    aria-hidden="true"
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Body */}
            <div className="flex-1">
              <div className="flex items-baseline gap-2 mb-1.5">
                <h3 className="font-mono text-xl md:text-2xl font-medium" style={{ letterSpacing: "-0.03em" }}>
                  {p.title}
                </h3>
                {p.ai && (
                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#65A30D] border border-[#65A30D] px-1 py-0.5">
                    AI
                  </span>
                )}
              </div>
              <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#0a0a0a]/55 mb-3">
                {p.client} · {p.type}
              </p>
              <p className="text-sm text-[#0a0a0a]/75 leading-relaxed">{p.oneLiner}</p>
              {p.metric && (
                <p className="mt-3 font-mono text-[11px] text-[#65A30D]">[ {p.metric} ]</p>
              )}
            </div>

            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-[#0a0a0a]/50 group-hover:text-[#0a0a0a] transition-colors">
              <span>read.md</span>
              <span aria-hidden="true">→</span>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}

function Closing() {
  return (
    <section className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: easeOut }}
        className="border-2 border-[#0a0a0a] bg-[#FBFBF6] p-8 md:p-12"
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#0a0a0a]/60 mb-4">
          $ contact --start
        </p>
        <h2
          className="font-mono font-medium leading-[1] mb-6"
          style={{ letterSpacing: "-0.04em", fontSize: "clamp(2rem, 5vw, 4.5rem)" }}
        >
          ./solve_hard_problems.sh
        </h2>
        <p className="text-base md:text-lg text-[#0a0a0a]/75 max-w-2xl mb-8 leading-relaxed">
          Currently open to product design and AI-native build engagements.
          I respond within a few days.
        </p>
        <motion.a
          href="mailto:gabriel@oliveibriel.com"
          whileHover={{ x: -1, y: -1, boxShadow: "6px 6px 0 0 #65A30D" }}
          whileTap={{ x: 2, y: 2, boxShadow: "0 0 0 0 #65A30D" }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="inline-flex items-center gap-3 px-5 py-3 bg-[#0a0a0a] text-[#F4F4EE] border-2 border-[#0a0a0a] font-mono text-base hover:bg-[#65A30D] hover:border-[#65A30D] transition-colors"
        >
          <span className="text-[#65A30D] group-hover:text-[#0a0a0a]">→</span>
          gabriel@oliveibriel.com
        </motion.a>
      </motion.div>
    </section>
  );
}

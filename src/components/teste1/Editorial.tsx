import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { lightProjects } from "../../data/projects-light";

const easeOut = [0.16, 1, 0.3, 1] as const;

export default function Editorial() {
  const reduced = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Parallax on photo (slow) and headline (negative — moves up faster).
  const photoY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, 120]);
  const photoScale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [1, 1.06]);
  const headlineY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -60]);

  return (
    <div className="bg-[#FAF7F2] text-[#1A1814] overflow-x-hidden">
      {/* Top bar */}
      <header className="relative z-20 border-b border-[#1A1814]/10" role="banner">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-14 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-[#1A1814]/70">
          <span>Vol. 01 · Issue 03</span>
          <span className="hidden sm:inline">Curitiba, BR · May 2026</span>
          <a href="/" className="hover:text-[#1A1814] transition-colors">← Home</a>
        </div>
      </header>

      <main>
      {/* Visually-hidden bio for parsers/AI crawlers — compensates for the metaphorical H1 */}
      <p className="sr-only">
        Gabriel Oliveira — Senior Product Designer with 10+ years of experience.
        Currently leading UX on IRIS V3 at NETZSCH, and co-founder of VOA Digital.
        Focus areas: industrial SaaS, design systems, AI-native tools, and B2B
        enterprise platforms. Based in Curitiba, Brazil.
      </p>

      {/* Editorial masthead */}
      <section ref={heroRef} className="relative" aria-labelledby="hero-h1">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-10 md:pt-14">
          {/* Issue meta */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOut }}
            className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[#1A1814]/60 mb-8"
          >
            <span className="px-2 py-0.5 bg-[#1A1814] text-[#FAF7F2]">Feature</span>
            <span>Senior Product Designer</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">B2B · Design Systems · AI</span>
          </motion.div>

          {/* Massive headline + photo grid */}
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-end">
            {/* Headline */}
            <motion.div
              style={{ y: headlineY }}
              className="lg:col-span-7 relative z-10"
            >
              <motion.h1
                id="hero-h1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.9, ease: easeOut, delay: 0.1 }}
                className="font-extrabold leading-[0.9]"
                style={{ letterSpacing: "-0.05em", fontSize: "clamp(3rem, 9vw, 8.5rem)" }}
              >
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: easeOut, delay: 0.15 }}
                  className="block"
                >
                  Designing
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: easeOut, delay: 0.3 }}
                  className="block"
                >
                  systems
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: easeOut, delay: 0.45 }}
                  className="block italic font-light text-[#1A1814]/60"
                  style={{ letterSpacing: "-0.03em" }}
                >
                  for the people
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: easeOut, delay: 0.6 }}
                  className="block italic font-light text-[#1A1814]/60"
                  style={{ letterSpacing: "-0.03em" }}
                >
                  who run them.
                </motion.span>
              </motion.h1>
            </motion.div>

            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, ease: easeOut, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <motion.img
                  src="https://storage.googleapis.com/2026portfolio/Home/Link.jpg"
                  alt="Gabriel Oliveira at work"
                  style={{ y: photoY, scale: photoScale }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 right-3 flex justify-between font-mono text-[10px] uppercase tracking-[0.15em] text-white">
                  <span className="bg-[#1A1814]/70 backdrop-blur-sm px-2 py-1">Photo · 2026</span>
                  <span className="bg-[#1A1814]/70 backdrop-blur-sm px-2 py-1">Curitiba</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Lede */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: easeOut, delay: 0.7 }}
            className="grid lg:grid-cols-12 gap-6 lg:gap-10 mt-14 md:mt-20 pb-16 md:pb-24 border-b border-[#1A1814]/10"
          >
            <div className="lg:col-span-3 lg:col-start-1">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#1A1814]/60 mb-3">By</p>
              <p className="text-base font-medium">Gabriel Oliveira</p>
              <p className="text-sm text-[#1A1814]/70">Senior Product Designer</p>
            </div>
            <div className="lg:col-span-7 lg:col-start-5">
              <p className="text-xl md:text-2xl leading-snug" style={{ letterSpacing: "-0.015em" }}>
                <span className="font-medium">For ten years</span>, Gabriel has been designing the
                quiet, complex software that runs other people's work — industrial HMI consoles,
                government services, and now AI-native tools for solo founders. He works at NETZSCH
                and runs <span className="italic">VOA Digital</span> with his sister.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured story — IRIS V3 */}
      <FeatureStory />

      {/* Project index — editorial table */}
      <ProjectTable />

      {/* Closing */}
      <Closing />
      </main>
    </div>
  );
}

function FeatureStory() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const reduced = useReducedMotion();
  const imageY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-40, 40]);

  return (
    <section ref={ref} className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: easeOut }}
        className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#1A1814]/60 mb-6"
      >
        Feature 01 · Industrial SaaS
      </motion.div>

      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: easeOut }}
          className="lg:col-span-5"
        >
          <h2
            className="font-extrabold leading-[0.95]"
            style={{ letterSpacing: "-0.04em", fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
          >
            How a 40% drop in onboarding time shipped at NETZSCH.
          </h2>
          <p className="mt-5 text-lg text-[#1A1814]/70 leading-relaxed">
            IRIS V3 replaces fragmented HMI workflows with a single task-oriented interface.
            Three years of iteration with engineers and operators across Germany, Brazil,
            and the US.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-6">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#1A1814]/60">Role</p>
              <p className="mt-1 text-sm">Lead UX Strategist</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#1A1814]/60">Year</p>
              <p className="mt-1 text-sm tabular-nums">2024</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#1A1814]/60">Outcome</p>
              <p className="mt-1 text-sm">−40% onboarding</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#1A1814]/60">Read</p>
              <a href="/work/iris-v3" className="mt-1 text-sm underline underline-offset-4 hover:no-underline">
                Full case study →
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: easeOut }}
          className="lg:col-span-7 relative aspect-[4/3] overflow-hidden bg-[#1A1814]/5"
        >
          <motion.img
            src="https://storage.googleapis.com/2026portfolio/Projects/IRIS/IRIS_Cover.png"
            alt="IRIS V3 industrial HMI"
            style={{ y: imageY }}
            className="absolute inset-0 w-full h-[110%] object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}

function ProjectTable() {
  return (
    <section className="border-y border-[#1A1814]/10 bg-[#1A1814] text-[#FAF7F2]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: easeOut }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#FAF7F2]/60 mb-3">
              In this issue
            </p>
            <h2
              className="font-extrabold"
              style={{ letterSpacing: "-0.04em", fontSize: "clamp(2rem, 4vw, 3.4rem)" }}
            >
              The full table of contents.
            </h2>
          </div>
          <a
            href="/work"
            className="hidden md:inline-block font-mono text-[11px] uppercase tracking-[0.2em] underline underline-offset-4 hover:no-underline"
          >
            All 14 →
          </a>
        </motion.div>

        <div className="border-t border-[#FAF7F2]/15">
          {lightProjects.map((p, i) => (
            <motion.a
              key={p.slug}
              href={`/work/${p.slug}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: easeOut, delay: i * 0.05 }}
              whileHover="hover"
              className="group block border-b border-[#FAF7F2]/15 py-6 md:py-7"
            >
              <div className="grid grid-cols-[3rem_1fr_auto] md:grid-cols-[3rem_1.4fr_1fr_1fr_5rem] gap-4 md:gap-8 items-baseline">
                <span className="font-mono text-xs text-[#FAF7F2]/50 tabular-nums">{p.number}</span>
                <motion.span
                  variants={{ hover: { x: 8 } }}
                  transition={{ type: "spring", stiffness: 280, damping: 24 }}
                  className="text-2xl md:text-4xl font-bold flex items-baseline gap-3"
                  style={{ letterSpacing: "-0.03em" }}
                >
                  {p.title}
                  {p.ai && (
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#93C5FD] border border-[#93C5FD]/40 px-1.5 py-0.5">
                      AI
                    </span>
                  )}
                </motion.span>
                <span className="hidden md:block text-sm text-[#FAF7F2]/60 italic">
                  {p.client}
                </span>
                <span className="hidden md:block font-mono text-xs text-[#FAF7F2]/50">
                  {p.type}
                </span>
                <span className="font-mono text-xs text-[#FAF7F2]/50 text-right tabular-nums">
                  {p.year}
                </span>
              </div>
              <p className="mt-2 md:mt-3 text-sm md:text-base text-[#FAF7F2]/65 max-w-2xl md:pl-[3.75rem]">
                {p.oneLiner}
                {p.metric && (
                  <span className="ml-3 inline-block font-mono text-[11px] text-[#93C5FD]">
                    [{p.metric}]
                  </span>
                )}
              </p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Closing() {
  return (
    <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: easeOut }}
        className="grid lg:grid-cols-12 gap-8"
      >
        <div className="lg:col-span-7">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#1A1814]/60 mb-5">
            Letter from the editor
          </p>
          <h2
            className="font-extrabold leading-[0.95]"
            style={{ letterSpacing: "-0.04em", fontSize: "clamp(2.2rem, 5vw, 4.5rem)" }}
          >
            Got a hard product
            <br />
            <span className="italic font-light text-[#1A1814]/60">problem to ship?</span>
          </h2>
        </div>
        <div className="lg:col-span-4 lg:col-start-9 flex flex-col gap-5 self-end">
          <p className="text-base md:text-lg text-[#1A1814]/70 leading-relaxed">
            Currently open to product design and AI-native build engagements. I respond
            within a few days.
          </p>
          <motion.a
            href="mailto:oliveibriel@gmail.com"
            whileHover={{ x: 6 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="inline-flex items-center gap-2 text-2xl md:text-3xl font-bold underline underline-offset-[6px] decoration-[1.5px] hover:decoration-[3px]"
            style={{ letterSpacing: "-0.03em" }}
          >
            oliveibriel@gmail.com →
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}

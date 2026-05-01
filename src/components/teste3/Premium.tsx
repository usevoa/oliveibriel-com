import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { useRef, useEffect } from "react";
import { lightProjects } from "../../data/projects-light";

const spring = { type: "spring" as const, stiffness: 280, damping: 30 };
const easeOut = [0.16, 1, 0.3, 1] as const;

export default function Premium() {
  return (
    <div className="bg-white text-[#1d1d1f] min-h-screen">
      <Nav />
      <main>
        <Hero />
        <ScrollMarquee />
        <Showcase />
        <Closing />
      </main>
    </div>
  );
}

function Nav() {
  const { scrollY } = useScroll();
  const navOpacity = useTransform(scrollY, [0, 80], [0, 1]);
  return (
    <motion.header
      style={{
        backdropFilter: "saturate(180%) blur(20px)",
        WebkitBackdropFilter: "saturate(180%) blur(20px)",
      }}
      className="sticky top-0 z-40 border-b border-black/[0.06] bg-white/80"
    >
      <motion.div
        style={{ opacity: navOpacity }}
        className="absolute inset-0 bg-white/95 pointer-events-none"
        aria-hidden="true"
      />
      <div className="relative max-w-[1100px] mx-auto px-6 md:px-8 h-12 flex items-center justify-between">
        <a href="/" className="text-[13px] font-semibold tracking-[-0.01em]">
          Gabriel Oliveira
        </a>
        <nav className="flex items-center gap-1 text-[13px]">
          <a className="px-3 py-1.5 rounded-full text-[#1d1d1f]/70 hover:text-[#1d1d1f] transition-colors" href="/work">Work</a>
          <a className="px-3 py-1.5 rounded-full text-[#1d1d1f]/70 hover:text-[#1d1d1f] transition-colors" href="/about">About</a>
          <a
            href="mailto:oliveibriel@gmail.com"
            className="ml-1 px-3.5 py-1.5 rounded-full bg-[#1d1d1f] text-white text-[13px] font-medium hover:bg-[#0071E3] transition-colors"
          >
            Get in touch
          </a>
        </nav>
      </div>
    </motion.header>
  );
}

function Hero() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const photoScale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [1, 0.94]);
  const photoY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, 60]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.4]);

  // Cursor-tracked spotlight on photo
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 220, damping: 28 });
  const sy = useSpring(my, { stiffness: 220, damping: 28 });

  const tiltX = useTransform(sy, (v) => (v - 0.5) * -6);
  const tiltY = useTransform(sx, (v) => (v - 0.5) * 6);

  return (
    <section ref={ref} className="relative">
      <motion.div style={{ opacity: heroOpacity }} className="max-w-[1100px] mx-auto px-6 md:px-8 pt-16 md:pt-24 pb-20 md:pb-28">
        {/* Status pill */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="flex justify-center mb-8 md:mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0071E3]/[0.08] text-[#0071E3] text-[13px] font-medium">
            <span className="size-1.5 rounded-full bg-[#34C759] animate-pulse" />
            Available · May 2026
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: easeOut, delay: 0.1 }}
          className="text-center font-semibold leading-[1.05] mx-auto max-w-5xl"
          style={{ letterSpacing: "-0.04em", fontSize: "clamp(2.5rem, 6.5vw, 5.5rem)" }}
        >
          Senior Product Design,
          <br />
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #1d1d1f 0%, #1d1d1f 40%, #0071E3 100%)",
            }}
          >
            crafted with care.
          </span>
        </motion.h1>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOut, delay: 0.3 }}
          className="mt-7 text-center text-lg md:text-xl text-[#1d1d1f]/65 max-w-2xl mx-auto leading-relaxed"
        >
          Ten years designing complex software at NETZSCH, Dell, and Santander.
          Now building <span className="text-[#1d1d1f]">AI-native tools</span> for solo founders.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOut, delay: 0.45 }}
          className="mt-10 flex justify-center gap-3"
        >
          <SoftButton href="/work" primary>
            View work
          </SoftButton>
          <SoftButton href="/about">About me</SoftButton>
        </motion.div>

        {/* Hero photo with tilt */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: easeOut, delay: 0.5 }}
          onMouseMove={(e) => {
            const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
            mx.set((e.clientX - rect.left) / rect.width);
            my.set((e.clientY - rect.top) / rect.height);
          }}
          onMouseLeave={() => {
            mx.set(0.5);
            my.set(0.5);
          }}
          style={{ y: photoY, scale: photoScale, perspective: "1200px" }}
          className="mt-16 md:mt-24 relative mx-auto max-w-[820px]"
        >
          <motion.div
            style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: "preserve-3d" }}
            className="relative aspect-[16/10] overflow-hidden rounded-[28px] bg-[#f5f5f7]"
          >
            <img
              src="https://storage.googleapis.com/2026portfolio/Home/Link.jpg"
              alt="Gabriel Oliveira"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Glass card overlays */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease: easeOut }}
              className="absolute bottom-5 left-5 right-5 md:bottom-7 md:left-7 md:right-7 flex justify-between gap-3"
              style={{ transform: "translateZ(40px)" }}
            >
              <GlassChip label="Now" value="IRIS V3 @ NETZSCH" />
              <GlassChip label="Co-founder" value="VOA Digital" />
            </motion.div>
          </motion.div>

          {/* Soft shadow under */}
          <div
            aria-hidden="true"
            className="absolute -inset-x-12 -bottom-8 h-24 blur-3xl opacity-30 -z-10"
            style={{
              background:
                "radial-gradient(closest-side, rgba(0,113,227,0.5), transparent)",
            }}
          />
        </motion.div>

        {/* Stat row */}
        <motion.dl
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOut, delay: 0.85 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-y-8 max-w-3xl mx-auto"
        >
          {[
            { l: "Years", v: "10+" },
            { l: "Case studies", v: "14" },
            { l: "Onboarding", v: "−40%", accent: true },
            { l: "Reach", v: "M+ users" },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <dd
                className={`text-3xl md:text-4xl font-semibold tabular-nums ${
                  s.accent ? "text-[#0071E3]" : ""
                }`}
                style={{ letterSpacing: "-0.03em" }}
              >
                {s.v}
              </dd>
              <dt className="mt-1 text-[13px] text-[#1d1d1f]/55">{s.l}</dt>
            </div>
          ))}
        </motion.dl>
      </motion.div>
    </section>
  );
}

function GlassChip({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="px-3 py-2 rounded-2xl text-left"
      style={{
        background: "rgba(255,255,255,0.78)",
        backdropFilter: "saturate(180%) blur(16px)",
        WebkitBackdropFilter: "saturate(180%) blur(16px)",
        boxShadow: "0 8px 24px -8px rgba(0,0,0,0.18)",
      }}
    >
      <p className="text-[10px] uppercase tracking-[0.12em] text-[#1d1d1f]/55">{label}</p>
      <p className="text-[13px] font-medium text-[#1d1d1f] mt-0.5">{value}</p>
    </div>
  );
}

function SoftButton({
  href,
  children,
  primary = false,
}: {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
}) {
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.985 }}
      transition={spring}
      className={`inline-flex items-center gap-2 px-5 py-3 rounded-full text-[15px] font-medium transition-colors ${
        primary
          ? "bg-[#1d1d1f] text-white hover:bg-[#0071E3]"
          : "bg-[#f5f5f7] text-[#1d1d1f] hover:bg-[#e8e8ed]"
      }`}
    >
      {children}
      <span aria-hidden="true">→</span>
    </motion.a>
  );
}

function ScrollMarquee() {
  const clients = ["NETZSCH", "Connecticut.gov", "Dell", "Santander", "TechCo.lab", "Rotary", "VOA Digital"];
  return (
    <section className="relative overflow-hidden border-y border-black/[0.05] py-6 bg-[#fbfbfd]">
      <motion.div
        className="flex gap-16 whitespace-nowrap font-medium text-[#1d1d1f]/40 text-[15px] tracking-tight"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 50, ease: "linear", repeat: Infinity }}
      >
        {[...Array(3)].flatMap((_, k) =>
          clients.map((c, i) => (
            <span key={`${k}-${i}`} className="inline-flex items-center gap-16">
              {c}
              <span className="size-1 rounded-full bg-[#1d1d1f]/20" aria-hidden="true" />
            </span>
          )),
        )}
      </motion.div>
    </section>
  );
}

function Showcase() {
  return (
    <section className="max-w-[1100px] mx-auto px-6 md:px-8 py-20 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: easeOut }}
        className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
      >
        <p className="text-[13px] font-medium text-[#0071E3] uppercase tracking-[0.1em] mb-3">
          Selected work
        </p>
        <h2
          className="font-semibold"
          style={{ letterSpacing: "-0.035em", fontSize: "clamp(2rem, 4.5vw, 3.6rem)" }}
        >
          The work behind the work.
        </h2>
        <p className="mt-4 text-lg text-[#1d1d1f]/60 leading-relaxed">
          Six recent shipped projects across industrial software, design systems, and AI-native tools.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-5 md:gap-6">
        {lightProjects.map((p, i) => (
          <ShowcaseCard key={p.slug} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}

function ShowcaseCard({ project, index }: { project: typeof lightProjects[number]; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 200, damping: 28 });
  const sy = useSpring(my, { stiffness: 200, damping: 28 });
  const rx = useTransform(sy, (v) => v * -4);
  const ry = useTransform(sx, (v) => v * 4);

  return (
    <motion.a
      ref={ref}
      href={`/work/${project.slug}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: easeOut, delay: index * 0.06 }}
      onMouseMove={(e) => {
        const rect = (e.currentTarget as HTMLAnchorElement).getBoundingClientRect();
        mx.set((e.clientX - rect.left) / rect.width - 0.5);
        my.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      style={{ perspective: "1000px" }}
      className="group relative block"
    >
      <motion.div
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="relative rounded-[24px] bg-[#f5f5f7] overflow-hidden border border-black/[0.04]"
      >
        <div className="aspect-[16/10] overflow-hidden">
          {project.image ? (
            <motion.img
              src={project.image}
              alt={`${project.title} cover`}
              loading="lazy"
              className="w-full h-full object-cover"
              initial={{ scale: 1.04 }}
              whileHover={{ scale: 1.06 }}
              transition={{ duration: 0.7, ease: easeOut }}
            />
          ) : (
            <div className="w-full h-full grid place-items-center" style={{ background: project.gradient }}>
              <span
                className="text-white/95 font-semibold mix-blend-overlay"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.04em" }}
              >
                {project.title}
              </span>
            </div>
          )}
          {project.ai && (
            <div
              className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[11px] font-medium text-white"
              style={{
                background: "rgba(0,0,0,0.5)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}
            >
              <span className="size-1 rounded-full bg-[#34C759]" />
              AI-native
            </div>
          )}
          {project.metric && (
            <div
              className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full text-[12px] font-semibold text-white"
              style={{
                background: "rgba(0,0,0,0.5)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}
            >
              {project.metric}
            </div>
          )}
        </div>
        <div className="p-6 md:p-7 bg-white" style={{ transform: "translateZ(20px)" }}>
          <div className="flex items-baseline justify-between mb-1">
            <p className="text-[12px] font-medium text-[#1d1d1f]/50 tabular-nums">
              {project.number} · {project.client}
            </p>
            <p className="text-[12px] font-medium text-[#1d1d1f]/50 tabular-nums">{project.year}</p>
          </div>
          <h3 className="text-2xl font-semibold mt-1" style={{ letterSpacing: "-0.025em" }}>
            {project.title}
          </h3>
          <p className="mt-2 text-[15px] text-[#1d1d1f]/65 leading-relaxed">{project.oneLiner}</p>
          <p className="mt-4 text-[13px] text-[#0071E3] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            Read case study →
          </p>
        </div>
      </motion.div>
    </motion.a>
  );
}

function Closing() {
  return (
    <section className="relative">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 30%, rgba(0,113,227,0.06), transparent 70%)",
        }}
      />
      <div className="max-w-[1100px] mx-auto px-6 md:px-8 py-24 md:py-32 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: easeOut }}
          className="font-semibold mx-auto max-w-4xl"
          style={{ letterSpacing: "-0.04em", fontSize: "clamp(2.4rem, 6vw, 5rem)", lineHeight: 1.05 }}
        >
          Got a hard product
          <br />
          <span style={{ color: "#0071E3" }}>problem to ship?</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: easeOut, delay: 0.15 }}
          className="mt-5 text-lg text-[#1d1d1f]/60 max-w-xl mx-auto"
        >
          Currently open to product design and AI-native build engagements.
          I respond within a few days.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: easeOut, delay: 0.3 }}
          className="mt-10 flex justify-center gap-3"
        >
          <SoftButton href="mailto:oliveibriel@gmail.com" primary>
            oliveibriel@gmail.com
          </SoftButton>
          <SoftButton href="https://www.linkedin.com/in/oliveibriel">LinkedIn</SoftButton>
        </motion.div>
      </div>
    </section>
  );
}

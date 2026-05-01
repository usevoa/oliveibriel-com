import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useRef } from "react";
import { lightProjects } from "../../data/projects-light";
import HeroVideoScroll from "./HeroVideoScroll";

const easeOut = [0.16, 1, 0.3, 1] as const;

const ACCENT = "#1d4ed8";
const ACCENT_TINT = "#dbeafe";
const BG = "#E9E9EB";
const FG = "#1A1A1F";
const SUBTLE = "rgba(26,26,31,0.55)";
const FAINT = "rgba(26,26,31,0.32)";

// Public assets — drop the file at /public/hero-bg.mp4 when ready.
// Until then, this URL 404s and the component falls back to the poster image.
const HERO_VIDEO_SRC = "/hero-bg.mp4";
const HERO_POSTER = "https://storage.googleapis.com/2026portfolio/Home/Link.jpg";

export default function Editorial() {
  return (
    <div style={{ backgroundColor: BG, color: FG }} className="overflow-x-hidden">
      <main>
        {/* Visually-hidden bio for parsers/AI crawlers */}
        <p className="sr-only">
          Gabriel Oliveira — Senior Product Designer with 10+ years of experience.
          Currently leading UX on IRIS V3 at NETZSCH, and co-founder of VOA Digital.
          Focus areas: industrial SaaS, design systems, AI-native tools, and B2B
          enterprise platforms. Based in Curitiba, Brazil.
        </p>

        <Hero />
        <CasesSection />
        <AboutSection />
        <ContactSection />
      </main>
    </div>
  );
}

/* ─────────────────────── HERO ─────────────────────── */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -40]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.35, 0.6]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] flex flex-col"
      aria-labelledby="hero-h1"
    >
      {/* Background video / image */}
      <HeroVideoScroll
        src={HERO_VIDEO_SRC}
        poster={HERO_POSTER}
        posterAlt="Gabriel Oliveira"
        fallbackImage={HERO_POSTER}
      />

      {/* Overlay for legibility */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background: `linear-gradient(180deg, rgba(233,233,235,0.55) 0%, rgba(233,233,235,0.78) 60%, rgba(233,233,235,0.95) 100%)`,
          opacity: overlayOpacity,
        }}
      />
      {/* Solid wash on top of overlay so we don't compete with video */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 backdrop-saturate-150"
        style={{ background: "rgba(233,233,235,0.45)" }}
      />

      {/* Status row (no header — just floats inside hero) */}
      <div className="max-w-[1400px] w-full mx-auto px-6 md:px-10 pt-8 md:pt-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em]"
          style={{ color: SUBTLE }}
        >
          <span className="flex items-center gap-2.5">
            <span
              className="size-1.5 rounded-full"
              style={{
                backgroundColor: "#16a34a",
                boxShadow: "0 0 0 4px rgba(22,163,74,0.18)",
                animation: "pulse 2s ease-in-out infinite",
              }}
            />
            Available · May 2026
          </span>
          <span className="hidden sm:inline">Curitiba, BR · UTC−3</span>
        </motion.div>
      </div>

      {/* Centered headline column */}
      <div className="flex-1 flex items-center">
        <motion.div
          style={{ y: titleY }}
          className="max-w-[1400px] w-full mx-auto px-6 md:px-10 py-16 md:py-24"
        >
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOut, delay: 0.1 }}
            className="font-mono text-[11px] uppercase tracking-[0.2em] mb-5"
            style={{ color: SUBTLE }}
          >
            Senior Product Designer
            <span className="mx-2" style={{ color: FAINT }}>·</span>
            10+ years
          </motion.p>

          <motion.h1
            id="hero-h1"
            className="font-extrabold leading-[0.96] max-w-[18ch]"
            style={{ letterSpacing: "-0.045em", fontSize: "clamp(2.4rem, 6.4vw, 5.5rem)" }}
          >
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: easeOut, delay: 0.2 }}
              className="block"
            >
              I design systems
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: easeOut, delay: 0.35 }}
              className="block italic font-light"
              style={{ color: SUBTLE, letterSpacing: "-0.035em" }}
            >
              for the people
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: easeOut, delay: 0.5 }}
              className="block italic font-light"
              style={{ color: SUBTLE, letterSpacing: "-0.035em" }}
            >
              who run them.
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeOut, delay: 0.65 }}
            className="mt-8 max-w-xl text-base md:text-lg leading-relaxed"
            style={{ color: SUBTLE }}
          >
            I'm <span style={{ color: FG }} className="font-medium">Gabriel</span>.
            For ten years I've designed the quiet, complex software that runs other
            people's work — industrial HMIs, government services, and now AI-native
            tools. I lead UX on{" "}
            <span style={{ color: FG }} className="font-medium">IRIS V3</span>{" "}
            at <span style={{ color: FG }} className="font-medium">NETZSCH</span>{" "}
            and run{" "}
            <span style={{ color: FG }} className="font-medium">VOA Digital</span>{" "}
            with my sister.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOut, delay: 0.85 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <motion.a
              href="#cases"
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium"
              style={{ backgroundColor: ACCENT, color: "white" }}
            >
              See selected work →
            </motion.a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium border transition-colors"
              style={{ borderColor: "rgba(26,26,31,0.18)", color: FG }}
            >
              Get in touch
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Down hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.2em] flex flex-col items-center gap-2"
        style={{ color: SUBTLE }}
      >
        <span>Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="block w-px h-6"
          style={{ background: FG, opacity: 0.6 }}
        />
      </motion.div>
    </section>
  );
}

/* ─────────────────────── CASES ─────────────────────── */

function CasesSection() {
  return (
    <section id="cases" className="relative" aria-labelledby="cases-h2">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-24 md:py-32">
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: easeOut }}
          className="grid lg:grid-cols-12 gap-6 mb-14 md:mb-20"
        >
          <div className="lg:col-span-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: SUBTLE }}>
              01 · Selected work
            </p>
          </div>
          <div className="lg:col-span-8">
            <h2
              id="cases-h2"
              className="font-extrabold"
              style={{ letterSpacing: "-0.04em", fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 0.98 }}
            >
              Six recent things
              <br />
              <span className="italic font-light" style={{ color: SUBTLE }}>
                I shipped or am still shipping.
              </span>
            </h2>
          </div>
        </motion.header>

        {/* Two big features */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-10 mb-16">
          {lightProjects.slice(0, 2).map((p, i) => (
            <FeatureCase key={p.slug} project={p} index={i} side={i % 2 === 0 ? "left" : "right"} />
          ))}
        </div>

        {/* Index list of remaining 4 */}
        <ul className="border-t" style={{ borderColor: "rgba(26,26,31,0.12)" }}>
          {lightProjects.slice(2).map((p, i) => (
            <CaseRow key={p.slug} project={p} index={i} />
          ))}
        </ul>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="mt-12 text-center"
        >
          <a
            href="/work"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] underline underline-offset-[6px] decoration-[1.5px]"
            style={{ color: SUBTLE }}
          >
            Read all 14 case studies →
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function FeatureCase({
  project,
  index,
  side,
}: {
  project: typeof lightProjects[number];
  index: number;
  side: "left" | "right";
}) {
  return (
    <motion.a
      href={`/work/${project.slug}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: easeOut, delay: index * 0.08 }}
      whileHover="hover"
      className="group block"
    >
      <motion.div
        variants={{ hover: { y: -4 } }}
        transition={{ type: "spring", stiffness: 240, damping: 28 }}
        className="relative aspect-[4/3] overflow-hidden rounded-2xl"
        style={{ backgroundColor: "#dcdcdf" }}
      >
        {project.image ? (
          <motion.img
            src={project.image}
            alt={`${project.title} cover`}
            loading="lazy"
            variants={{ hover: { scale: 1.04 } }}
            transition={{ duration: 0.7, ease: easeOut }}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "grayscale(8%)" }}
          />
        ) : (
          <div
            className="absolute inset-0 grid place-items-center"
            style={{ background: project.gradient ?? "#1A1A1F" }}
          >
            <span
              className="text-white/95 font-bold mix-blend-overlay"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.04em" }}
            >
              {project.title}
            </span>
          </div>
        )}

        {project.ai && (
          <span
            className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-2 py-1 rounded-full font-mono text-[10px] uppercase tracking-[0.15em]"
            style={{
              backgroundColor: "rgba(255,255,255,0.92)",
              color: ACCENT,
              backdropFilter: "blur(8px)",
            }}
          >
            <span className="size-1 rounded-full" style={{ backgroundColor: ACCENT }} />
            AI-native
          </span>
        )}
        {project.metric && (
          <span
            className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full font-mono text-[11px] uppercase tracking-[0.12em]"
            style={{
              backgroundColor: "rgba(26,26,31,0.85)",
              color: "white",
              backdropFilter: "blur(8px)",
            }}
          >
            {project.metric}
          </span>
        )}
      </motion.div>

      <div className="mt-5 flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: FAINT }}>
        <span>
          {project.number} · {project.client}
        </span>
        <span>{project.year}</span>
      </div>
      <h3
        className="mt-2 font-bold"
        style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.4rem)", letterSpacing: "-0.035em", lineHeight: 1.05 }}
      >
        {project.title}
      </h3>
      <p className="mt-2 text-base leading-relaxed max-w-[42ch]" style={{ color: SUBTLE }}>
        {project.oneLiner}
      </p>
    </motion.a>
  );
}

function CaseRow({
  project,
  index,
}: {
  project: typeof lightProjects[number];
  index: number;
}) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, ease: easeOut, delay: index * 0.05 }}
      className="border-b"
      style={{ borderColor: "rgba(26,26,31,0.12)" }}
    >
      <a
        href={`/work/${project.slug}`}
        className="group grid grid-cols-[2.5rem_1fr_auto] md:grid-cols-[2.5rem_1.6fr_1fr_1fr_5rem] gap-4 md:gap-8 items-baseline py-6 md:py-7 transition-colors"
      >
        <span className="font-mono text-[11px] tabular-nums" style={{ color: FAINT }}>
          {project.number}
        </span>
        <div className="flex items-baseline gap-3 min-w-0">
          <h3
            className="font-bold truncate"
            style={{ fontSize: "clamp(1.25rem, 2.2vw, 1.875rem)", letterSpacing: "-0.03em" }}
          >
            {project.title}
          </h3>
          {project.ai && (
            <span
              className="font-mono text-[9px] uppercase tracking-[0.18em] px-1.5 py-0.5 rounded"
              style={{ backgroundColor: ACCENT_TINT, color: ACCENT }}
            >
              AI
            </span>
          )}
        </div>
        <span className="hidden md:block text-sm italic" style={{ color: SUBTLE }}>
          {project.client}
        </span>
        <span className="hidden md:block font-mono text-[11px]" style={{ color: FAINT }}>
          {project.type}
        </span>
        <span className="font-mono text-[11px] text-right tabular-nums flex items-baseline justify-end gap-2" style={{ color: FAINT }}>
          {project.year}
          <span
            className="transition-transform group-hover:translate-x-1"
            style={{ color: ACCENT }}
          >
            →
          </span>
        </span>
      </a>
    </motion.li>
  );
}

/* ─────────────────────── ABOUT ─────────────────────── */

function AboutSection() {
  return (
    <section
      id="about"
      className="relative border-t"
      style={{ borderColor: "rgba(26,26,31,0.12)" }}
      aria-labelledby="about-h2"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-24 md:py-32">
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: easeOut }}
          className="grid lg:grid-cols-12 gap-6 mb-14 md:mb-20"
        >
          <div className="lg:col-span-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: SUBTLE }}>
              02 · About
            </p>
          </div>
          <div className="lg:col-span-8">
            <h2
              id="about-h2"
              className="font-extrabold"
              style={{ letterSpacing: "-0.04em", fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 0.98 }}
            >
              How I work,
              <br />
              <span className="italic font-light" style={{ color: SUBTLE }}>
                and what I care about.
              </span>
            </h2>
          </div>
        </motion.header>

        <div className="grid lg:grid-cols-12 gap-10 md:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: easeOut }}
            className="lg:col-span-7 space-y-6 text-lg md:text-xl leading-snug"
            style={{ letterSpacing: "-0.012em" }}
          >
            <p>
              I came up through games, then mobile fintech, then a decade of B2B
              and enterprise. Today I sit between product strategy and design
              engineering — equally comfortable running a research workshop and
              shipping a React component.
            </p>
            <p>
              I care about <span style={{ color: ACCENT }}>clarity over cleverness</span>,
              systems thinking over isolated screens, and shipping over
              showcasing. I work best with PMs and engineers from kickoff
              through release, not just at handoff.
            </p>
            <p>
              Lately I've been building products end-to-end with{" "}
              <span style={{ color: ACCENT }}>Claude Code</span> as a partner —
              a multi-tenant clinical SaaS, a CLI that pushes LLM-generated
              training plans into Garmin, and the internal OS that runs my own
              agency. AI hasn't replaced taste; it's amplified what one
              designer can ship.
            </p>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: easeOut, delay: 0.1 }}
            className="lg:col-span-4 lg:col-start-9 space-y-8"
          >
            <Aside label="Currently">
              Leading UX on IRIS V3 at NETZSCH. Co-founder at VOA Digital.
            </Aside>
            <Aside label="Based">Curitiba, Brazil · UTC−3</Aside>
            <Aside label="Focus">
              B2B SaaS · Design Systems · AI-native tools
            </Aside>
            <Aside label="Tools">
              Figma · React · TypeScript · Tailwind · Claude Code · Astro
            </Aside>
            <Aside label="Off the clock">
              Cinema, distance running, four French Bulldogs.
            </Aside>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}

function Aside({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] mb-2" style={{ color: FAINT }}>
        {label}
      </p>
      <p className="text-sm leading-relaxed" style={{ color: FG }}>
        {children}
      </p>
    </div>
  );
}

/* ─────────────────────── CONTACT ─────────────────────── */

function ContactSection() {
  return (
    <section
      id="contact"
      className="relative border-t"
      style={{ borderColor: "rgba(26,26,31,0.12)" }}
      aria-labelledby="contact-h2"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-24 md:py-36">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: easeOut }}
          className="grid lg:grid-cols-12 gap-10"
        >
          <div className="lg:col-span-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: SUBTLE }}>
              03 · Contact
            </p>
          </div>
          <div className="lg:col-span-8">
            <h2
              id="contact-h2"
              className="font-extrabold"
              style={{ letterSpacing: "-0.045em", fontSize: "clamp(2.4rem, 6vw, 5rem)", lineHeight: 0.95 }}
            >
              Got a hard product
              <br />
              <span className="italic font-light" style={{ color: SUBTLE }}>
                problem? Let's talk.
              </span>
            </h2>

            <p className="mt-7 max-w-xl text-lg leading-relaxed" style={{ color: SUBTLE }}>
              I'm currently open to product design and AI-native build engagements.
              Drop a line — I respond within a few days.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <motion.a
                href="mailto:oliveibriel@gmail.com"
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 300, damping: 26 }}
                className="inline-flex items-center gap-2 px-6 py-4 rounded-full text-base font-medium"
                style={{ backgroundColor: ACCENT, color: "white" }}
              >
                oliveibriel@gmail.com →
              </motion.a>
              <a
                href="https://www.linkedin.com/in/oliveibriel"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-full text-base font-medium border transition-colors hover:bg-white/40"
                style={{ borderColor: "rgba(26,26,31,0.18)", color: FG }}
              >
                LinkedIn ↗
              </a>
            </div>

            <div className="mt-16 pt-8 border-t flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.2em]" style={{ borderColor: "rgba(26,26,31,0.12)", color: FAINT }}>
              <span>© 2026 Gabriel Oliveira</span>
              <span>Curitiba, BR</span>
              <span>Designed and built in-house</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

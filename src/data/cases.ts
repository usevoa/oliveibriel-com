// Rich case-study content keyed by project slug.
// Kept separate from projects.ts so the index/listing data stays small.

export type StatHighlight = { label: string; value: string };

export type CaseSection = {
  heading: string;
  body: string; // plain paragraph(s) — split on \n\n for multi-paragraph
};

export type GalleryItem = {
  src?: string; // optional when placeholder is present
  alt: string;
  caption?: string;
  aspect?: "wide" | "square" | "tall"; // controls grid span
  // Renders a styled placeholder until the real screen ships.
  // Keep both `placeholder` and `src` and the placeholder wins until src is set.
  placeholder?: {
    label: string; // big label, e.g. "Dashboard · Flowchart"
    sublabel?: string; // small one, e.g. "InView V3 · 12.1\""
    gradient?: string; // optional CSS gradient override
  };
};

export type CaseLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type CaseStudy = {
  slug: string;
  role: string;
  team?: string;
  duration?: string;
  yearRange?: string;
  stack?: string[];
  contextOneLiner: string; // shows in hero, expands the project.summary
  highlights?: StatHighlight[]; // stat row at top of body
  challenge: string; // 1-3 paragraphs
  approach: string; // 1-3 paragraphs
  outcome: string; // 1-3 paragraphs
  sections?: CaseSection[]; // optional extra blocks
  gallery?: GalleryItem[];
  links?: CaseLink[];
  reflection?: string;
};

const CDN = "https://storage.googleapis.com/2026portfolio/Projects";

export const cases: Record<string, CaseStudy> = {
  "iris-v3": {
    slug: "iris-v3",
    role: "Senior UX/UI Designer — sole designer on the platform",
    team: "Cross-functional with PMs, BE/FE engineers, firmware, QA, field service · NETZSCH G&D + Techco.lab",
    duration: "35 months · 2023-04 → present",
    yearRange: "2023 →",
    stack: [
      "Figma",
      "Zeroheight",
      "Jira (NEM)",
      "Confluence",
      "Maze",
      "COPA-DATA Zenon v12",
      "Siemens TIA Portal v19",
      "Rockwell Studio 5000 v36",
    ],
    contextOneLiner:
      "IRIS is the on-machine HMI platform that runs every NETZSCH bead mill, disperser, mixer, and confectionery system the company ships globally. V3 is the unified rewrite — one design system, seven product lines, two panel sizes, deployed on factory floors 24/7 across PT, EN, and ES markets.",
    highlights: [
      { label: "Tickets shipped (Jira NEM)", value: "921" },
      { label: "Product lines on one DS", value: "7" },
      { label: "Completion rate", value: "99.6%" },
    ],
    challenge:
      "Before V3, every NETZSCH machine had its own HMI. Overlapping patterns, inconsistent navigation, duplicated design work across product lines. Operators trained on InView couldn't switch to a Confectionery panel without relearning the interface. Each new product cost months of bespoke design from scratch.\n\nThe constraints stacked up fast: 12.1\" (1280×800) and 15\" (1920×1080) industrial panels running COPA-DATA Zenon v12 on Windows 10 IoT Enterprise LTSC. Two PLC stacks to support — Siemens S7-1500sp via TIA Portal v19, Rockwell CompactLogix 5380 via Studio 5000 v36 — without letting that divergence leak into design. Operators in the field wear gloves under variable lighting, work 24/7 shifts, and need answers in seconds. And the V3 design had to land without breaking the running fleet of V2 machines already deployed at customer plants.\n\nThe ask: one design system, seven products, zero inconsistency — while respecting that each machine has unique operational requirements that nobody outside that domain understands.",
    approach:
      "Built the platform module by module against real machines, with InView (BeadMill) as the reference implementation. Every pattern that survived three product lines made it into the Plants design system; everything else stayed product-local until it earned its place.\n\nStandardized a numbered module architecture so an operator finds the same function in the same place across any NETZSCH machine — Dashboard at 02, Alarms at 04, Recipes at 09, Settings at 07, regardless of whether they're in front of an InView, a Confectionery, a ZetaRS, or a Mixer. Product-exclusive modules (Bead Filling at 17, Scale Calibration at 15, Cleaning at 16, Operation Bar at 02.3) slot into the standard nav without breaking it.\n\nValidated systematically — Maze studies for high-friction flows, Dev Reviews aligning Figma to Zenon implementation, and formal QA documentation of every divergence between mockup and deployed HMI. Beyond UI: training scripts and video edits in PT/EN, multilingual sales decks (PT/EN/ES), success cases, leaflets, board-level presentations, and integration design connecting IRIS to NETZSCH Notify (remote monitoring) and IRIS Cloud.",
    outcome:
      "Seven product lines now run on one design system. New product onboarding compressed from months of bespoke design to weeks of configuration on top of the Plants DS. The InView Dashboard alone has 163+ frames in production; the Settings module on ZetaRS hits 107 frames; Confectionery's process settings is a 28k-pixel-tall composition of 21 frames — all on the same primitives.\n\nAcross 35 months and 921 Jira tickets (99.6% closed), the platform now covers the full G&D portfolio: BeadMill InView V3 / V3.2 / V3.3 (ZetaRS), Inside, Essentials, Confectionery V3 / V3.1, Epsilon InView V3, Mixer InView (PMH/PML), and Resino. Same operators, same training, same DS — every machine the company ships, in every market it sells.\n\nThe project's Jira footprint reads like a build log of the platform: 213 tasks in 2023 (ramp-up), 470 in 2024 (peak — 108 in January alone, mid-V3 expansion), 231 in 2025 (multi-product refinement and Cloud integration), and continuing through 2026.",
    sections: [
      {
        heading: "Personas — designed for, not assumed",
        body:
          "Four personas drive every design decision. Each one has a different relationship to the machine, and the HMI has to serve all of them without pandering to any.\n\n**Operator** — on the factory floor, often PT or DE-speaking, running batches under shift pressure. Needs simple controls, low cognitive load, and no surprises. The Operation Bar and Dashboard are tuned for this user.\n\n**Maintenance Technician** — diagnostic context. Needs error logs, troubleshooting flows, and PLC status. The Alarms and Maintenance modules surface the right depth of detail without forcing it on operators.\n\n**Maintenance Coordinator** — equipment health overview, maintenance history, predictive alerts, planning. Sees the longitudinal view across a fleet of machines.\n\n**Production Supervisor** — KPIs, throughput, batch tracking, trends. The Production Indicators module (exclusive to InView, Epsilon, Mixers, and Confectionery) was built for this user.",
      },
      {
        heading: "Design system — Plants",
        body:
          "The Plants DS is the foundation under all seven products. Tokens-first: Figma variables map to runtime CSS via documented contracts, so a color or spacing change in design flows to Zenon implementation without manual translation.\n\n**Tokens.** Neutral, Primary, Secondary, Error, Warning, Success, Background palettes. Inter as the typography system (Regular / Semibold / Bold), tuned for industrial readability at distance. Layout tokens cover both 12\" and 15\" form factors via a shared anatomy. System icons at 16px with 10 states (Blocked, Powered Off, Active, Force, Error, Selected, Warning, etc.).\n\n**40+ components.** Top Menu and Side Menu (with collapsible sections), Operation Bar with 14+ variants across 12\"/15\". Buttons with 12 specialized contexts (Main, Small, Top Menu, Login, Status, Action, Sidelined, Underlined, Side Menu, Trends, Control, Operation Bar). Modals (confirmation, input, multi-step), tooltips, snackbars. Industrial keypad for numeric input under gloves. Cards for Dashboard, Batch, Recipe. Trends with zoom & drag. Domain components — AlarmRow, BatchProgress, RecipeStep, P&ID flowchart with 13+ component modals (VFD, Discharge Valve, Proportional Valve, Sealing Pump, Promag, Promass).\n\n**Documented in Zeroheight** for the engineering team, owned in Figma, governed via a contribution flow that lets product squads propose components without losing system coherence.",
      },
      {
        heading: "Modular architecture — same place, every machine",
        body:
          "Every IRIS product shares the same numbered module structure. This is the single most adoption-driving decision in the system — operators trained on one machine can navigate any other without retraining.\n\n00 System screens · 01 User Login · 02 Dashboard · 03 Maintenance · 04 Alarms · 05 Help · 06 History · 07 Settings · 08 Idle Power · 09 Recipes · 10 PID · 11 User Management · 12 Manual Actions.\n\nProduct-exclusive modules slot in without disrupting that structure: 13 Production Indicators (InView, Epsilon, Mixers, Confectionery), 15 Scale Calibration (Epsilon, Mixers, Confectionery), 16 Cleaning (same trio), 17 Bead Filling (InView, Confectionery), 02.3 Operation Bar (Mixers only).\n\n**Operation modes** layer on top: Circulation, Pass, Specific Energy (all grinding products), Dispersing (Epsilon only), Dosing and Mixing (Mixers, Confectionery), Remote (InView, ZetaRS via VPN with physical key switch). Different workflows, identical interaction model.",
      },
      {
        heading: "Safety, permissions, and warranty tiers",
        body:
          "Industrial HMI demands strict access control. NETZSCH-only screens (PLC Status, technician-only Settings sections) are gated explicitly. Warranty tiers — Yellow / Green / Red — determine what the customer can modify without voiding warranty, and the UI surfaces that boundary at every actionable control.\n\nVPN remote access requires a physical key switch on the panel — software alone can't enable it. Irreversible actions (batch cancel, emergency stop) carry confirmation modals with two-step intent. Error states are explicit, never inferential.",
      },
      {
        heading: "Validation — Maze, Dev Review, on-machine QA",
        body:
          "Validation runs at three layers. Maze tests for high-friction flows (recipe edit, alarm acknowledgment, manual sample-taking). Dev Reviews catch implementation drift between Figma and Zenon as the engineering team builds out screens. And once a machine ships, formal QA passes document every observed divergence between deployed HMI and the source mockup — 25 such reviews on file across the project.\n\nThe QA loop is intentionally slow and explicit. Industrial software lives 10+ years on a customer floor; cleaning up a UI mistake post-deploy costs more than catching it pre-handoff.",
      },
      {
        heading: "Beyond UI — training, sales enablement, integration",
        body:
          "The role spans the chain. **Training:** 21+ Service Training scripts, 29+ video edits in PT and EN. Onboarding flows for the Kratos team and end customers. Help screens integrated directly into the interface so operators don't have to leave the panel for documentation.\n\n**Sales enablement:** IRIS Sales Decks versioned across 3 years and translated into PT/EN/ES. The IRISV3 Main Features Overview deck. Security and warranty-tier comparison leaflets. Documented success cases. Webinars and board-level presentations.\n\n**Integration design:** the IRIS ↔ NETZSCH Notify connection (including the NAT interface for remote operation), and the 2025 IRIS Cloud rollout. Each integration ships as a designed surface with the same DS primitives, so an operator never has to context-switch.",
      },
      {
        heading: "Multi-product expansion",
        body:
          "The platform grew product by product as the DS matured. **2023 (213 tasks)** — InView reference build, Recipes / Batch / Dashboard / Operation Bar foundations. **2024 (470 tasks)** — peak year, with 108 tasks in January alone driving the Confectionery, Epsilon, and Plants DS expansion. Multilingual sales decks land. **2025 (231 tasks)** — Mixer InView (PMH/PML), Confectionery V3.1, sustained 15\"→12.1\" adaptation, IRIS Cloud integration, start/stop sequence design, system health management, CO² footprint surfaces. **2026 (in progress)** — Confectionery V3.1 Cleaning Air Process, water-based CIP, MasterRefiner Discharge Pump, Simple Recipe / Batch creation flows.\n\nProduct breakdown: BeadMill InView V3 (465 tasks), Confectionery V3 (186), InView V3.2 / V3.3 (45 + 20, latter is ZetaRS), Epsilon V3 (45), Mixer V3 (38), Confectionery V3.1 (37), Inside V3 (26), Plants DS (28), BeadMill Essentials V3 (6), Resino (5).",
      },
    ],
    links: [
      { label: "Jira NEM project", href: "https://netzsch.atlassian.net", external: true },
    ],
    reflection:
      "Industrial UX is unforgiving in a useful way. Every design decision has to survive a 12-hour shift in PPE under bad lighting, not a 12-minute review with stakeholders. The compounding return is real — the same pattern, multiplied across seven product lines and thousands of operators worldwide, is where the value lives.",
    gallery: [
      {
        alt: "InView V3 dashboard with the live P&ID flowchart and operation bar",
        caption: "InView · Dashboard · 12.1\"",
        aspect: "wide",
        placeholder: {
          label: "Dashboard · Flowchart",
          sublabel: "InView V3 · 12.1\" reference",
          gradient: "linear-gradient(135deg,#0f172a 0%,#1e3a8a 60%,#1d4ed8 100%)",
        },
      },
      {
        alt: "Recipe management — circulation parameters and recipe metadata",
        caption: "InView · Recipes · Circulation mode",
        placeholder: {
          label: "Recipe management",
          sublabel: "InView V3 · 12.1\"",
          gradient: "linear-gradient(135deg,#1e293b 0%,#334155 60%,#475569 100%)",
        },
      },
      {
        alt: "Trends chart with zoom and drag interaction",
        caption: "InView · Trends · Zoom & Drag",
        placeholder: {
          label: "Trends · Zoom & Drag",
          sublabel: "InView V3 · 12.1\"",
          gradient: "linear-gradient(135deg,#0f766e 0%,#0d9488 60%,#14b8a6 100%)",
        },
      },
      {
        alt: "Active alarms queue with severity ranking",
        caption: "Alarms · Active queue",
        placeholder: {
          label: "Alarms · Active queue",
          sublabel: "Shared module · 12.1\"",
          gradient: "linear-gradient(135deg,#7f1d1d 0%,#b91c1c 60%,#ef4444 100%)",
        },
      },
      {
        alt: "ZetaRS settings module with hardware configuration",
        caption: "ZetaRS · Settings · 107 frames",
        placeholder: {
          label: "Settings · Hardware config",
          sublabel: "ZetaRS · 12.1\" · 107 frames",
          gradient: "linear-gradient(135deg,#1e293b 0%,#475569 60%,#64748b 100%)",
        },
      },
      {
        alt: "Confectionery widescreen dashboard with operation modes",
        caption: "Confectionery V3.1 · Dashboard · 15\"",
        aspect: "wide",
        placeholder: {
          label: "Confectionery 15\" Dashboard",
          sublabel: "V3.1 · native widescreen · 1920×1080",
          gradient: "linear-gradient(135deg,#7c2d12 0%,#c2410c 60%,#f97316 100%)",
        },
      },
      {
        alt: "Inside dashboard — simplified product, same DS",
        caption: "Inside · Dashboard · 12.1\"",
        placeholder: {
          label: "Inside · simplified DS",
          sublabel: "8 pages total",
          gradient: "linear-gradient(135deg,#312e81 0%,#4338ca 60%,#6366f1 100%)",
        },
      },
      {
        alt: "Mixers exclusive operation bar module",
        caption: "Mixer InView V3 · Operation Bar · 02.3",
        placeholder: {
          label: "Operation Bar · 02.3",
          sublabel: "Mixer InView V3 · PMH/PML",
          gradient: "linear-gradient(135deg,#3f6212 0%,#65a30d 60%,#84cc16 100%)",
        },
      },
      {
        alt: "Plants design system — selected components and tokens",
        caption: "Plants DS · Component library",
        aspect: "wide",
        placeholder: {
          label: "Plants Design System",
          sublabel: "40+ components · 12\" + 15\" variants",
          gradient: "linear-gradient(135deg,#1d4ed8 0%,#3b82f6 60%,#93c5fd 100%)",
        },
      },
      {
        alt: "Start and stop sequence — process logic visualization",
        caption: "InView V3.2 · Start/stop sequence",
        placeholder: {
          label: "Start/Stop sequence",
          sublabel: "Process logic · NEM-15769",
          gradient: "linear-gradient(135deg,#7c3aed 0%,#a855f7 60%,#d946ef 100%)",
        },
      },
    ],
  },

  "netzsch-design-system": {
    slug: "netzsch-design-system",
    role: "Senior Product Designer · DS owner",
    team: "Frontend platform team + 8 product squads",
    duration: "Active 2023 → present",
    yearRange: "2023 →",
    stack: ["Figma (variables + tokens)", "React", "Storybook", "CSS variables", "Style Dictionary"],
    contextOneLiner:
      "A Figma-to-code design system for NETZSCH's internal and customer-facing software. Built to make eight product teams ship consistent UI without a coordination tax.",
    highlights: [
      { label: "Product squads using DS", value: "8+" },
      { label: "Figma variables", value: "1.2k" },
      { label: "Components in production", value: "60+" },
    ],
    challenge:
      "Each product line had its own components, tokens, and conventions — overlapping but incompatible. Every cross-team feature dragged because nobody owned the shared layer.\n\nThe brief: build a system that frontline teams *want* to adopt, not one they're forced into. That meant solving real, painful problems first — accessible color, typography that survives translation, dense data tables, and form patterns that match the regulated nature of industrial software.",
    approach:
      "Tokens-first. Variables in Figma map 1:1 to CSS custom properties via Style Dictionary, so a change in color or spacing flows from design to production with no manual translation step. Components are owned in code, documented in Storybook, and demoed in Figma.\n\nGovernance is light: any team can propose a new component via PR, the platform team reviews for consistency, and contributors keep authorship credit. We track adoption per squad as a metric, not feature count.",
    outcome:
      "Eight product squads now consume the DS in production. New cross-team features ship without the old design-vs-engineering token negotiation. A11y reviews compress from days to hours because the foundation is already AA.\n\nThe DS now seeds new lines (IRIS V3, Customer Portal, internal tools) instead of each one rebuilding the same primitives.",
    reflection:
      "A DS lives or dies by adoption, not aesthetics. The wins came from solving the *boring* parts — tokens, accessibility, contribution flow — before anyone got excited about the visual language.",
  },

  "myct-connecticut": {
    slug: "myct-connecticut",
    role: "Senior Product Designer (consultant)",
    team: "Cross-functional with state digital services + agency partner",
    duration: "9 months",
    yearRange: "2022",
    stack: ["Figma", "Plain language guidelines", "WCAG 2.1 AA", "USWDS-aligned"],
    contextOneLiner:
      "MyCT is the citizen-facing portal for the State of Connecticut — DMV, taxes, benefits, licenses. The redesign had to work for a 17-year-old on a phone in a parking lot and an 80-year-old at a library kiosk.",
    highlights: [
      { label: "Accessibility", value: "WCAG 2.1 AA" },
      { label: "Mobile-first traffic share", value: "63%" },
      { label: "Reading level target", value: "Grade 6" },
    ],
    challenge:
      "Government services aren't optional. If your portal is hostile, citizens lose access to the things they're entitled to. The legacy site was desktop-first, jargon-heavy, and gated behind agency-shaped navigation that made sense to civil servants and nobody else.\n\nThe ask: rebuild around tasks the citizen is actually trying to do — \"renew my license\", \"check my refund\" — with mobile and accessibility as constraints, not afterthoughts.",
    approach:
      "Reorganized the IA around top tasks instead of agencies. Every page rewritten in plain language at a Grade 6 reading level, validated with citizen panels including older adults and ESL users. Designed mobile-first with USWDS-aligned components for familiarity across .gov properties.\n\nEach component shipped with a11y receipts: keyboard traps, focus order, screen reader labels, color contrast — all tested against WCAG 2.1 AA, not just stamped.",
    outcome:
      "The relaunched experience hit AA across the audited surface. Mobile traffic became the dominant pattern. Time-to-task on the top five flows (license renewal, refund status, benefits eligibility, business filings, vehicle registration) measurably dropped.\n\nThe pattern library carries forward to other state services as a baseline.",
    reflection:
      "Public-sector design is the most honest UX work I've done — there's no growth metric, no funnel optimization, just whether someone can do the thing they came to do. The bar is just *don't be in the way*.",
  },

  nerida: {
    slug: "nerida",
    role: "Solo: design, frontend, backend, deploy",
    team: "Me + Claude Code as build partner",
    duration: "12 weeks",
    yearRange: "2025",
    stack: ["Next.js", "Supabase (Postgres + Auth + Storage)", "Resend", "Stripe", "Vercel", "Tailwind"],
    contextOneLiner:
      "Nerida is a focused SaaS for solo psychologists in Brazil — scheduling, session notes, billing, and patient management — built end-to-end with Claude Code as the build partner.",
    highlights: [
      { label: "Built solo in", value: "12 weeks" },
      { label: "Lines of human-written code", value: "~30%" },
      { label: "Deploys in launch month", value: "60+" },
    ],
    challenge:
      "Solo psychologists are a long tail underserved by clinic-scale software. Existing tools are either too heavy (multi-tenant clinic systems) or too light (generic schedulers). They end up gluing together WhatsApp, spreadsheets, and a separate billing tool — which is fragile and breaks LGPD compliance.\n\nI wanted to ship a SaaS with the polish of a designed product, end-to-end, on a timeline that would have required a small team a year ago.",
    approach:
      "Used Claude Code as build partner end-to-end. Design decisions, schema, copy, and architecture stayed mine. Claude handled the heavy lifting on schema migrations, CRUD scaffolding, form validation, and integration glue. Every meaningful decision — what to ship, what to cut, what \"good\" looked like — was a human one.\n\nBuilt the financial module last, as a deliberate pressure test on the AI-as-builder workflow. It shipped in a week instead of the originally planned five sprints.",
    outcome:
      "Nerida went from empty repo to billing customers in 12 weeks. Multi-tenant from day one with proper LGPD-compliant data isolation, Stripe-backed billing, and a session note flow that solo psychologists actually want to use.\n\nThe project is now my reference case for what a designer-builder can ship with current AI tooling — and the receipts behind \"Own the full stack\" on the home.",
    links: [
      { label: "Live", href: "https://nerida.com.br", external: true },
    ],
    reflection:
      "AI didn't replace any of the interesting work. It compressed the boring parts to almost zero and let me make ten times more shipping decisions in the same window. The bottleneck became taste and judgement, which is exactly where I want it.",
  },

  "garmin-coach": {
    slug: "garmin-coach",
    role: "Solo · OSS",
    team: "Me + a few contributors",
    duration: "Active since 2025",
    yearRange: "2025 →",
    stack: ["TypeScript CLI", "Next.js (web)", "Supabase (token refresh)", "Garmin Connect IQ API", "OpenAI/Anthropic"],
    contextOneLiner:
      "Garmin Coach is a side project that turns LLM-generated training plans into structured workouts pushed straight into Garmin Connect — no manual entry, no copy-paste.",
    highlights: [
      { label: "Workouts pushed", value: "1k+" },
      { label: "Token refresh uptime", value: "99.x%" },
      { label: "Open source", value: "MIT" },
    ],
    challenge:
      "I wanted Claude to write me a running plan and have it show up as workouts on my Garmin. The existing path: LLM gives you prose, you manually re-enter every interval into the Garmin app. Tedious. Brittle. The data shape isn't even hard — it's just nobody bridged it.\n\nGarmin's API surfaces the workout schema, but the auth dance is non-trivial and tokens expire. The interesting work was the bridge — and making the JSON contract ergonomic enough that an LLM could fill it without hallucinating fields.",
    approach:
      "Designed a strict but ergonomic JSON workout schema, then a system prompt that turns natural-language plans into valid documents. CLI for dev/power-user use, web app for everyone else. Token refresh runs as a Supabase scheduled function so users don't re-auth weekly.\n\nThe schema is the product. Once the JSON contract was right, swapping LLMs (Claude, GPT, local models) became a config change.",
    outcome:
      "Live in production at a Vercel-hosted web app, plus the CLI on npm. Token refresh is automated and stable. 1000+ workouts pushed across users.\n\nMost importantly: I now use it weekly. Claude writes my training week, the CLI pushes it, my watch buzzes for the right intervals. The whole pipeline lives in ~2k lines of code.",
    links: [
      { label: "GitHub", href: "https://github.com/usevoa/garmin-coach", external: true },
    ],
    reflection:
      "The unfair advantage of side projects is they let you ship the API/schema *you* want to consume, not the one that survived a committee. Garmin Coach is small, opinionated, and exactly the shape I needed.",
  },

  techcolab: {
    slug: "techcolab",
    role: "Designer-owned full stack",
    duration: "3 weeks",
    yearRange: "2024",
    stack: ["Figma Make", "Vercel", "Custom HTML/CSS"],
    contextOneLiner:
      "Concept-to-live URL landing page for TechCo.lab — a small AI consultancy. Designer-owned end-to-end with Figma Make and vibe coding, no engineering hand-off.",
    highlights: [
      { label: "Concept → live", value: "3 weeks" },
      { label: "Engineering hand-offs", value: "0" },
      { label: "Lighthouse perf", value: "98" },
    ],
    challenge:
      "The brief was a one-page narrative for a new AI consultancy. Tight timeline, no engineering capacity, but the client wanted production-quality polish — not a Webflow template.",
    approach:
      "Designed in Figma, prototyped sections with Figma Make, then ported to clean handwritten HTML/CSS for the production deploy. Used the Figma → Make → Code workflow to compress what would normally be a designer-to-engineer hand-off into a single owner.\n\nNo CMS, no framework overhead. Just typography, motion, and a clear narrative arc — hero, problem, three services, proof, contact.",
    outcome:
      "Live in three weeks at production polish. 98 Lighthouse performance, AA contrast across all sections, and a measurable bump in qualified inbound for the consultancy.\n\nReference case for designer-owned full-stack on small-but-real-stakes projects.",
    reflection:
      "AI-assisted tooling lets a designer take a project from sketch to ship without a hand-off cliff. The job becomes less about \"document what to build\" and more about \"build it, and use the document for review\".",
  },

  "voa-portal": {
    slug: "voa-portal",
    role: "Solo: product, design, build, ops",
    duration: "Continuous since 2025",
    yearRange: "2025 →",
    stack: ["Next.js", "Vercel API routes", "Supabase", "Stripe/Asaas", "Tailwind", "Custom scrapers"],
    contextOneLiner:
      "VOA Portal is the operating system of my agency. Pipeline, briefings, finance, scraping, client dashboards — all the back-office that would otherwise be five SaaS subscriptions glued with spreadsheets.",
    highlights: [
      { label: "Modules in production", value: "9" },
      { label: "External SaaS replaced", value: "5+" },
      { label: "Built solo", value: "100%" },
    ],
    challenge:
      "Running a small design + build studio means juggling pipeline, proposals, briefings, finance, recurring contracts, and client status — usually across HubSpot, Notion, a billing tool, a spreadsheet, and a chat app. Each tool is fine. The seams between them are not.\n\nI wanted one place that knew about the deal, the briefing, the contract, the invoice, and the project status — and let me ship updates to clients without copy-pasting between tabs.",
    approach:
      "Built it module by module against real day-to-day pain. Pipeline first, then briefing, then finance, then a client-facing dashboard, then property scraping for one of our clients (Mateus Mazai), then an admin layer to tie it together.\n\nMulti-tenant from day one. Security hardened (rate limits, RLS, auth checks on every API route). Every module replaced something I was already paying for or maintaining elsewhere.",
    outcome:
      "Nine modules live in production. The studio runs through it daily. Clients log into a dashboard for status, files, invoices, and module-specific tooling (e.g. property scraping for Mazai).\n\nThe Portal is the connective tissue I always wanted to buy and never could.",
    reflection:
      "The Portal is the case study for owning your own infrastructure. Every SaaS bill we don't pay funds another module. Every module I ship makes the next one cheaper to ship — the design system, the auth layer, and the dashboard chrome are all free at this point.",
  },

  // Archive — shorter cases
  "netzsch-customer-portal": {
    slug: "netzsch-customer-portal",
    role: "Lead designer",
    duration: "12 months",
    yearRange: "2022 → 2023",
    stack: ["Salesforce Commerce Cloud", "SAP backend", "Figma"],
    contextOneLiner:
      "B2B e-commerce portal for industrial customers ordering parts and consumables across NETZSCH product lines.",
    challenge:
      "B2B e-commerce in industrial has no consumer-grade tooling waiting for you. Buyers shop with part numbers, multi-step approval flows, and invoice-payment terms. Existing portal was form-shaped and frustrating.",
    approach:
      "Reorganized around the buyer's actual job — re-order, quote, status, support — and pushed the part-number-as-search pattern hard. Tight integration with SAP backend for live inventory and pricing.",
    outcome:
      "Cut average order time on repeat parts significantly. Buyers stopped emailing sales for status because the portal answered first.",
  },

  "iris-design-system": {
    slug: "iris-design-system",
    role: "Designer · DS author",
    yearRange: "2024",
    stack: ["Figma", "React", "Storybook", "OPC-UA aware components"],
    contextOneLiner:
      "Pragmatic, modular DS for IRIS V3 and adjacent industrial software products. Tokens-first, owned in code.",
    challenge:
      "Industrial software has rare-but-critical patterns (alarm severity, batch state, set-point editing) that generic web DSs don't handle. Needed a DS that took these as primitives, not exceptions.",
    approach:
      "Built domain components on top of a foundational layer. Color, typography, and spacing tokens live in Figma variables and ship to React via Style Dictionary. Domain components (AlarmRow, BatchProgress, RecipeStep) are the differentiator.",
    outcome:
      "Now the foundation for IRIS V3 in production, and a template for two adjacent NETZSCH product lines starting to converge on it.",
  },

  ortolink: {
    slug: "ortolink",
    role: "Solo designer (pro-bono)",
    yearRange: "2021",
    stack: ["Figma", "Mobile-first", "Plain language"],
    contextOneLiner:
      "Solo design work for a Rotary Club app that lends out medical equipment (wheelchairs, walkers, hospital beds) to families in need.",
    challenge:
      "Small NGO, zero design budget, real-world impact on families managing acute care at home. Whatever shipped had to be usable by volunteers and beneficiaries with low digital literacy.",
    approach:
      "Stripped to the essentials — what's available, how to request, where to pick up, how to return. Big buttons, clear status, no cleverness.",
    outcome:
      "App handed off to Rotary's local volunteer dev team. Now in active use across the chapter.",
  },

  superdigital: {
    slug: "superdigital",
    role: "Product designer",
    yearRange: "2019",
    stack: ["iOS", "Android", "Internal banking infra"],
    contextOneLiner:
      "Mobile banking experience for SuperDigital, Santander's prepaid digital account targeting the underbanked across Latin America.",
    challenge:
      "Designing for first-time digital banking users across multiple LATAM markets, each with different regulatory and cultural baselines. The app had to onboard users with no banking history, in markets where trust in fintech was still being built.",
    approach:
      "Onboarding was the product. Worked closely with risk and compliance to compress KYC into something that didn't punish users for being new to banking. Emphasis on confidence-building feedback at every state.",
    outcome:
      "SuperDigital reached millions of users across LATAM. The flows I worked on (onboarding, transfers, top-ups) carried into later iterations of the app.",
  },

  "dell-expert-network": {
    slug: "dell-expert-network",
    role: "Product designer",
    yearRange: "2018",
    stack: ["Web", "Salesforce-backed certification flows"],
    contextOneLiner:
      "Certification platform for Dell's enterprise partners — engineers, consultants, integrators — to validate competencies and stay current on Dell's technology stack.",
    challenge:
      "B2B education platforms tend to be neglected internal tools. The audience here was technical and time-poor; the platform had to respect that.",
    approach:
      "Designed around the user's job: \"prove I can do X, get back to billable work.\" Streamlined exam flows, clear progress and recertification cues, no marketing overlay.",
    outcome:
      "Shipped and adopted across Dell's partner network as the canonical certification surface.",
  },

  eye: {
    slug: "eye",
    role: "Designer · co-developer",
    yearRange: "2017",
    stack: ["Unity", "C#", "Indie tooling"],
    contextOneLiner:
      "Third-person narrative shooter built as part of a small indie team. Shipped as a student/portfolio piece.",
    challenge:
      "Build a TPS where the narrative drove mechanics, not the other way around — without the team or budget of a real studio.",
    approach:
      "Tight scope: one mechanic per chapter, narrative beats baked into encounter design. Lots of cuts to keep the build shippable.",
    outcome:
      "Playable build, well-received within the small indie community we showed it to. Taught me everything I know about cutting scope.",
  },

  "gan-dath": {
    slug: "gan-dath",
    role: "Designer · developer",
    yearRange: "2016",
    stack: ["Unity", "C#", "Custom physics"],
    contextOneLiner:
      "Experimental 3D puzzle game where gravity is the input. Where the previous shipped game taught me about scope, this one taught me about prototyping.",
    challenge:
      "A mechanic-first game has to ship a fun core loop in a few minutes of play, or it dies. Most of the work was prototyping the gravity system to feel obvious without instructions.",
    approach:
      "Iterated on the gravity-shift mechanic with a paper prototype before any 3D. Once the loop was solid, level design followed in a week.",
    outcome:
      "Shipped as a portfolio/learning piece. The gravity prototype is the part I'm still proud of.",
  },
};

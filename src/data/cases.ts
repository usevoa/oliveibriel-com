// Rich case-study content keyed by project slug.
// Kept separate from projects.ts so the index/listing data stays small.

export type StatHighlight = { label: string; value: string };

export type CaseSection = {
  heading: string;
  body: string; // plain paragraph(s) — split on \n\n for multi-paragraph
  image?: GalleryItem; // optional inline image rendered after the body
  layout?: "stack" | "split"; // stack = image below body (default); split = image alongside body
  imageSide?: "left" | "right"; // for split only — defaults to right
};

export type GalleryItem = {
  src?: string; // optional when placeholder is present
  alt: string;
  caption?: string;
  aspect?: "wide" | "square" | "tall"; // controls grid span
  fit?: "cover" | "contain"; // default cover; use contain to show the whole image
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
    team: "Cross-functional with PMs, engineers, firmware, QA, field service",
    duration: "Active since April 2023 — ongoing",
    yearRange: "2023 →",
    stack: ["Figma", "Zeroheight", "Maze", "Confluence"],
    contextOneLiner:
      "IRIS is the on-machine HMI on every bead mill, disperser, mixer, and confectionery system NETZSCH ships globally. V3 was the unified rewrite: one design system, six product lines, in three languages.",
    highlights: [
      { label: "Product lines on one DS", value: "6" },
      { label: "Countries in the network", value: "36" },
      { label: "Sole designer since", value: "2023" },
    ],
    challenge:
      "Before V3, every NETZSCH machine had its own HMI. An operator who knew InView cold couldn't sit down at a Confectionery panel without retraining. Field service spent half their time fielding questions the UI should have answered.\n\nI came in as the only designer on the platform. The brief was to make six product lines feel like one product, without flattening what each machine actually needs — across NETZSCH's global network of 36 countries and three languages.",
    approach:
      "I started on the floor. Operators wear gloves, lighting shifts through the day, the panel is at chest height with attention split between the screen and a running machine. None of that is on a spec sheet.\n\nPicked InView as the reference and designed it end to end against real users. Then extracted the patterns into the shared system and rolled it out product by product — Confectionery, Epsilon, Mixers, ZetaRS, Inside.",
    outcome:
      "Six product lines now ship on the same design language. An operator trained on one machine can sit down at any other and find the dashboard, recipes, alarms, settings in the same place, behaving the same way.\n\nNew product onboarding went from months of bespoke design to weeks of configuration. Three years in, every new machine NETZSCH G&D ships internationally lands on this system.",
    sections: [
      {
        heading: "Who I designed for",
        body:
          "Four personas, each with a different relationship to the machine.\n\nThe **Operator** runs batches under shift pressure, often in Portuguese or German. Most of the screens are tuned for this user — simple controls, low cognitive load, no surprises.\n\nThe **Maintenance Technician** needs diagnostic depth: error logs, troubleshooting flows, equipment status. The system surfaces it without forcing it on the operator.\n\nThe **Maintenance Coordinator** sees the longitudinal view across a fleet — history, predictive alerts, planning.\n\nThe **Production Supervisor** reads the machine through outcomes — KPIs, throughput, trends — not real-time state.\n\nGetting all four right without overloading any single screen was the hard part.",
        layout: "split",
        imageSide: "right",
        image: {
          src: "/projects/iris-v3/04__alarms-active.png",
          alt: "InView V3 active alarm queue with severity ranking",
          caption: "Alarms · the screen the Operator and Technician share",
        },
      },
      {
        heading: "Same place, every machine",
        body:
          "The biggest decision in V3 was structural, not visual. Every product shares the same module layout. Dashboard, alarms, recipes, settings, maintenance — same place, every machine.\n\nProduct-exclusive features slot into that layout without breaking it. Bead Filling on InView and Confectionery. Scale Calibration on the dosing-aware products. The Operation Bar on Mixers. The shared structure is a contract; the product specifics live inside the contract, not around it.\n\nThat's what makes the cross-product training claim real. The visual language reinforces it — same buttons, same alarm patterns, same way of confirming irreversible actions — but the structural decision is what carries the weight.",
        layout: "split",
        imageSide: "left",
        image: {
          src: "/projects/iris-v3/06__confectionery-15in.png",
          alt: "Confectionery V3.1 dashboard on the 15-inch widescreen panel",
          caption: "Confectionery · 15\" · same shape, different machine",
        },
      },
      {
        heading: "What didn't go well",
        body:
          "The 15\" to 12.1\" adaptation was harder than I expected. Information density that felt right on the widescreen Confectionery panel cramped on the smaller one. Several modules had to be recomposed from primitives instead of adapted, and that cost more time than the original design did.\n\nAdoption was also a sales job, not a design job. I assumed solid components plus clear documentation would be enough. They weren't. Patterns that felt too generic on first review got pushed back, and I had to re-pitch them with operator-context evidence — recordings of the floor, lighting tests, glove interactions. Every component in the system earned its place, but earning that place was an ongoing conversation, not a one-time approval.",
      },
    ],
    reflection:
      "The work that survives a 12-hour shift in PPE under bad lighting is different from the work that survives a 12-minute design review. Three years on this platform taught me the second one is easy and the first one is the actual job.",
    gallery: [
      {
        src: "/projects/iris-v3/01__inview-dashboard.png",
        alt: "InView V3 dashboard with the live P&ID flowchart and operation bar",
        caption: "InView · Dashboard · 12.1\"",
        aspect: "wide",
      },
      {
        src: "/projects/iris-v3/02__recipe-edit.png",
        alt: "Recipe management — circulation parameters and recipe metadata",
        caption: "InView · Recipes · Circulation mode",
      },
      {
        src: "/projects/iris-v3/03__trends-zoom.png",
        alt: "Trends chart with zoom and drag interaction",
        caption: "InView · Trends · Zoom & Drag",
      },
      {
        src: "/projects/iris-v3/04__alarms-active.png",
        alt: "Active alarms queue with severity ranking",
        caption: "Alarms · Active queue",
      },
      {
        src: "/projects/iris-v3/05__zetars-settings.png",
        alt: "ZetaRS settings module with hardware configuration",
        caption: "ZetaRS · Settings · 107 frames",
      },
      {
        src: "/projects/iris-v3/06__confectionery-15in.png",
        alt: "Confectionery widescreen dashboard with operation modes",
        caption: "Confectionery V3.1 · Dashboard · 15\"",
        aspect: "wide",
      },
      {
        src: "/projects/iris-v3/07__inside-dashboard.png",
        alt: "Inside dashboard — simplified product, same DS",
        caption: "Inside · Dashboard · 12.1\"",
      },
      {
        src: "/projects/iris-v3/08__mixers-operation-bar.png",
        alt: "Mixers exclusive operation bar module",
        caption: "Mixer InView V3 · Operation Bar · 02.3",
      },
      {
        src: "/projects/iris-v3/09__plants-ds-overview.png",
        alt: "Plants design system — selected components and tokens",
        caption: "Plants DS · Component library",
        aspect: "wide",
      },
      {
        src: "/projects/iris-v3/10__start-stop-sequence.png",
        alt: "Start and stop sequence — process logic visualization",
        caption: "InView V3.2 · Start/stop sequence",
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

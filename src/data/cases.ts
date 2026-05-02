// Rich case-study content keyed by project slug.
// Kept separate from projects.ts so the index/listing data stays small.

export type StatHighlight = { label: string; value: string };

export type CaseSection = {
  heading: string;
  body: string; // plain paragraph(s) — split on \n\n for multi-paragraph
  image?: GalleryItem; // optional inline image rendered after the body
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
    team: "Cross-functional with PMs, engineers, firmware, QA, field service",
    duration: "Active since April 2023 — ongoing",
    yearRange: "2023 →",
    stack: ["Figma", "Zeroheight", "Maze", "Confluence"],
    contextOneLiner:
      "IRIS is the on-machine HMI that runs every bead mill, disperser, mixer, and confectionery system NETZSCH ships globally. V3 was the unified rewrite — one design system, seven product lines, deployed on factory floors 24/7 in three languages.",
    highlights: [
      { label: "Product lines unified", value: "7" },
      { label: "Personas served", value: "4" },
      { label: "Sole designer since", value: "2023" },
    ],
    challenge:
      "Before V3, every NETZSCH machine had its own HMI. The visual language drifted between products, navigation didn't match, and the same task — start a batch, edit a recipe, acknowledge an alarm — looked different on every panel.\n\nFor the people who use the machines, that meant retraining every time they switched. An operator who knew the BeadMill InView cold couldn't sit down at a Confectionery panel without learning the interface from scratch. Field service spent half their time fielding questions the UI should have answered. New product lines started from a blank canvas every time.\n\nMy job, as the sole designer on the platform, was to build a system that worked for seven products — without flattening the specifics each machine actually needs.",
    approach:
      "Started on the floor, with the operators. The constraints aren't on a spec sheet — they're in the room. Operators wear gloves. Lighting changes through the shift. The panel is at chest height, often viewed at an angle, and attention is split between the screen and a running machine.\n\nPick one product as the reference, design it end-to-end against real users, and only then extract the patterns into a shared system. The BeadMill InView became that anchor — every component, every pattern, every interaction was earned by surviving a real screen first, not by being designed in a token table.\n\nFrom there, I rolled it out, product by product — Confectionery, Epsilon, Mixers, ZetaRS, Inside, Resino. Each new product was a stress test for the system: what does this one need that the others don't, and how does it fit into the shared structure without breaking it?",
    outcome:
      "Seven product lines now run on the same design language. An operator trained on one machine can sit down at any of the others and find the dashboard, the recipe screen, the alarms, the settings — all in the same place, behaving the same way.\n\nNew product onboarding compressed from months of bespoke design to weeks of configuration on top of the shared system. Field service stopped fielding the same UI questions across products. Sales decks, training videos, and customer documentation all pull from one consistent vocabulary in three languages.\n\nThe platform is still active and growing — three years in, every new machine NETZSCH G&D ships internationally lands on this system.",
    sections: [
      {
        heading: "Who I designed for",
        body:
          "Four personas drive every decision. Each one has a different relationship with the machine, and the HMI has to serve all of them without pandering to any one of them.\n\n**The Operator** — on the floor, often Portuguese or German-speaking, running batches under shift pressure. Needs simple controls, low cognitive load, no surprises. Most of the screens you see are tuned for this user.\n\n**The Maintenance Technician** — diagnostic context. Needs error logs, troubleshooting flows, equipment status. The system surfaces depth without forcing it on the operator.\n\n**The Maintenance Coordinator** — sees the longitudinal view across a fleet. Maintenance history, predictive alerts, planning.\n\n**The Production Supervisor** — KPIs, throughput, trends. Reads the machine through outcomes, not real-time state.\n\nGetting these four right — without overloading any single screen — is the work that mattered most.",
        image: {
          alt: "HMI panel mounted on a NETZSCH machine in a customer plant",
          caption: "Context · the panel where operators meet the system",
          aspect: "wide",
          placeholder: {
            label: "HMI in the field",
            sublabel: "Real machine · real operators",
            gradient: "linear-gradient(135deg,#0c4a6e 0%,#075985 60%,#0284c7 100%)",
          },
        },
      },
      {
        heading: "What I actually did",
        body:
          "Concretely: I designed the screens, built the design system that holds them together, and stayed on it through deploy.\n\n**The screens** — every operating surface across seven products. Dashboards with live process flowcharts, recipe editors, batch monitoring, alarm queues, maintenance, settings, history, manual actions. Across two panel sizes (12.1\" and 15\"), with adaptation between them.\n\n**The design system** — the foundation under all seven products. Color, typography, and spacing tokens designed for industrial readability. A component library that includes the obvious primitives (buttons, modals, forms) and the domain-specific ones nobody else has solved (alarm rows with severity, batch progress, the P&ID flowchart with its component modals).\n\n**The work past the screen** — onboarding flows, in-app help, training video scripts in two languages, sales decks in three, customer documentation, and the integration design connecting IRIS to remote monitoring and cloud services. The screens don't ship in isolation; the system around them has to ship too.",
        image: {
          src: "/projects/iris-v3/inline-02__components-tokens.png",
          alt: "Plants design system component overview — buttons, cards, alarm rows, tokens",
          caption: "The system under all seven products",
          aspect: "wide",
        },
      },
      {
        heading: "The key decision — same place, every machine",
        body:
          "The biggest decision in V3 was structural, not visual. Every product shares the same module layout. The dashboard is in the same place. Alarms are in the same place. Recipes, settings, maintenance — same place, every machine.\n\nProduct-exclusive features (Bead Filling on InView and Confectionery, Scale Calibration on the dosing-aware products, the Operation Bar on Mixers) slot into the standard layout without breaking it. The shared structure is a contract; the product specifics live inside that contract, not around it.\n\nThis is what makes the cross-product training claim real. An operator who learns the IRIS shape on one machine has learned it for every other machine. The visual language reinforces that — same buttons, same alarm patterns, same way of confirming irreversible actions — but the structural decision is what carries the weight.",
        image: {
          alt: "Module navigation across multiple products, side by side",
          caption: "Same nav, every machine",
          aspect: "wide",
          placeholder: {
            label: "Modular nav · 7 products",
            sublabel: "Same shape, every machine",
            gradient: "linear-gradient(135deg,#0f172a 0%,#1e293b 50%,#334155 100%)",
          },
        },
      },
      {
        heading: "What worked",
        body:
          "**The cross-product consistency claim is real.** Operators trained on one IRIS panel can use any other without retraining. Service teams confirm it. Customers feel it. It's the outcome that compounds the most across the seven products.\n\n**The design system absorbed every new product without buckling.** Confectionery, Epsilon, Mixers, ZetaRS — each one stress-tested the foundation and extended it with one or two new patterns instead of starting from scratch. The system grew without diluting.\n\n**Validation paid off.** Maze studies for high-friction flows, design reviews catching implementation drift, on-machine QA after deployment. Industrial software lives ten years on a customer floor — getting it wrong on day one is expensive.\n\n**The work past the screen mattered as much as the screen itself.** Multilingual training, sales enablement, integration design — the platform needed all of it to land. Designing only the UI would have left the rest of the system speaking a different language.",
      },
      {
        heading: "What didn't",
        body:
          "**The 15\" → 12.1\" adaptation was harder than I expected.** What worked on a widescreen Confectionery panel rarely scaled by simple resizing. Information density that felt right on the larger surface became cramped on the smaller one. Several modules had to be recomposed from primitives instead of adapted, and that cost more time than the original design did.\n\n**Adoption is a sales job, not a design job.** Early on I assumed that solid components plus clear documentation would be enough. They weren't. Patterns that felt 'too generic' on first review got pushed back, and I had to re-pitch them with operator-context evidence — recordings of the floor, lighting tests, glove interactions. Every component the system carries earned its place, but earning that place was an ongoing conversation, not a one-time approval.\n\n**The Plants name confused things.** Internally the design system was called Plants — distinct from the IRIS product brand — and that distinction was clean to me but cloudy to people outside. If I'd had a do-over I'd have framed it differently to avoid the early 'is Plants the product?' loop in onboarding decks.",
      },
      {
        heading: "How I validated",
        body:
          "Validation ran at three layers, each one slower and more expensive than the last.\n\n**Maze studies** for high-friction flows — recipe edit, alarm acknowledgment, manual sample-taking. Cheap, fast, useful for catching the obvious — not for catching the gloved-hand-in-bad-lighting problems.\n\n**Design reviews with engineering** — alignment between Figma and the deployed HMI, catching implementation drift while it's still cheap to fix. Slower, but where most of the catches happened.\n\n**On-machine QA after deployment** — formal divergence reports between mockup and shipped HMI. The most expensive of the three, the one that revealed the things you can't catch any other way. Industrial software doesn't fail loudly; it fails by accumulating small frictions that turn into operator workarounds. On-machine QA is what catches that.",
        image: {
          alt: "Validation artifact — Maze report or QA divergence document",
          caption: "Three-layer validation",
          aspect: "wide",
          placeholder: {
            label: "Validation",
            sublabel: "Maze · Design review · On-machine QA",
            gradient: "linear-gradient(135deg,#365314 0%,#4d7c0f 60%,#84cc16 100%)",
          },
        },
      },
      {
        heading: "The product family",
        body:
          "Seven product lines, two panel sizes, three languages, one design system. Each product solves a different industrial process, but the operator experience is shared.\n\n**InView** is the BeadMill reference — the most feature-complete, the highest density, the one everything else stress-tests against. **Confectionery** is the only product designed natively for the 15\" widescreen, with three distinct operation modes (Dosing, Mixing, Grinding). **Epsilon** owns the most complex pump configuration and an exclusive Dispersing mode. **ZetaRS** is the configuration king — the deepest settings module, designed with commissioning in mind. **Mixers** carry the only exclusive Operation Bar variant. **Inside** proves the system scales down gracefully — same DS, simpler product, no awkwardness. **Resino** is the newest addition, still maturing, but already on the same foundation.",
        image: {
          src: "/projects/iris-v3/inline-06__product-family.png",
          alt: "All seven IRIS V3 products at thumbnail scale",
          caption: "7 products · one DS",
          aspect: "wide",
        },
      },
    ],
    reflection:
      "Industrial UX is unforgiving in a useful way. Every design decision has to survive a 12-hour shift in PPE under bad lighting, not a 12-minute review with stakeholders. The compounding return is real — the same pattern, multiplied across seven product lines and thousands of operators worldwide, is where the value lives.",
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

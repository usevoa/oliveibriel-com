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
  // Optional typewriter line shown under the hero (e.g. TechCo.lab "We build …")
  typewriter?: { prefix: string; words: string[] };
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
      "DASDS — the design system for NETZSCH's Digital and Automation Systems. A Figma-to-code pipeline built so eight product squads ship consistent UI without paying a coordination tax every sprint.",
    highlights: [
      { label: "Product squads using DS", value: "8+" },
      { label: "Figma variables", value: "1.2k" },
      { label: "Components in production", value: "60+" },
    ],
    challenge:
      "Each product line at NETZSCH had its own components, tokens, and conventions. Overlapping but incompatible. Every cross-team feature dragged because nobody owned the shared layer.\n\nThe brief was to build something the frontline teams would actually want to use, not a system they'd be forced into. Which meant the foundation had to solve real problems first: accessible color, typography that survives Portuguese-to-German translation, dense data tables, and form patterns that match the regulated nature of industrial software.",
    approach:
      "Tokens first. Variables in Figma map one-to-one to CSS custom properties via Style Dictionary, so a change in color or spacing flows from design to production with no manual translation. Components are owned in code, documented in Storybook, and demoed in Figma alongside the production build.\n\nGovernance is intentionally light. Any team can propose a new component via PR. The platform team reviews for consistency. Contributors keep authorship credit. Adoption per squad is the metric, not component count.",
    outcome:
      "Eight product squads consume the DS in production. New cross-team features ship without the old design-versus-engineering token negotiation. Accessibility reviews compressed from days to hours because the foundation is already AA.\n\nThe DS now seeds new lines (IRIS V3, the Customer Portal, internal tools) instead of each one rebuilding the same primitives.",
    sections: [
      {
        heading: "Who I designed for",
        body:
          "Two audiences with very different needs.\n\nFrontend engineers in the squads — the people who actually consume the system. They wanted boring things: a Storybook page that loads fast, prop names that match what they expect, and components that don't fight their existing build. Anything fancy lost to anything dependable.\n\nProduct designers in the squads — usually one per product line, sometimes none. They wanted Figma variables that mirror code variables, so they don't have to redo work the engineers already did. The 1:1 token mapping wasn't aesthetic. It was the contract that lets a designer hand off without translating.",
        layout: "split",
        imageSide: "right",
        image: {
          src: "/projects/dasds/03__dasds-buttons.png",
          alt: "DASDS button components — primary, secondary, destructive, disabled",
          caption: "Buttons · the components squads actually consume",
        },
      },
      {
        heading: "The key decision: a single source of truth for tokens",
        body:
          "Most DS projects fail at the same place: the design tokens in Figma drift from the CSS variables in code, and within six months everyone is back to copying hex codes by hand. I refused to ship anything until the pipeline was airtight.\n\nFigma variables export to a JSON Style Dictionary spec. Style Dictionary builds the same tokens into CSS custom properties, Tailwind config, and a TypeScript types file. One source, three outputs, all generated. A designer renaming a color in Figma triggers a PR. An engineer adjusting a contrast ratio updates Figma at the same time.\n\nThe whole rest of the system — typography scale, spacing, radii, shadows, motion — sits on top of that pipeline. Without it, the DS is just a pile of components that look right today and wrong in two months.",
        layout: "split",
        imageSide: "left",
        image: {
          src: "/projects/dasds/01__dasds-foundations.png",
          alt: "DASDS foundations — color tokens and typography",
          caption: "Foundations · tokens map 1:1 from Figma to code",
        },
      },
      {
        heading: "What didn't go well",
        body:
          "The hard part wasn't building the system — it was getting squads with working legacy code to adopt it. Solid components and clean docs weren't enough. Teams pushed back when a new pattern meant refactoring something that already shipped, and the first six months were mostly demos, pairing with squad leads, and rewriting docs to answer the same five questions.\n\nThe \"light governance\" model also showed its limits. Letting anyone propose components meant the queue filled up with single-use specials. I had to start saying no, which is uncomfortable when you're pitching the system as community-owned. Any DS needs an opinionated owner, and I was that owner whether the org chart said so or not.",
        layout: "split",
        imageSide: "right",
        image: {
          src: "/projects/dasds/06__dasds-status-widgets.png",
          alt: "DASDS status widgets — machine state components",
          caption: "Status widgets · shared across product lines",
        },
      },
    ],
    reflection:
      "A DS lives or dies by adoption, not aesthetics. The wins came from the boring parts — token pipeline, accessibility floor, contribution flow — done before anyone got excited about the visual language.",
    gallery: [
      {
        src: "/projects/dasds/02__dasds-header.png",
        alt: "DASDS app header component with NETZSCH branding",
        caption: "App Header · navigation chrome",
      },
      {
        src: "/projects/dasds/04__dasds-chips.png",
        alt: "DASDS status and filter chips",
        caption: "Chips · status & filters",
      },
      {
        src: "/projects/dasds/05__dasds-alerts.png",
        alt: "DASDS inline alert components — success, info, warning, error",
        caption: "Alerts · inline feedback",
      },
      {
        src: "/projects/dasds/07__dasds-forms.png",
        alt: "DASDS form controls — text fields, checkboxes, radios, toggles",
        caption: "Forms · inputs & controls",
      },
      {
        src: "/projects/dasds/08__dasds-pickers.png",
        alt: "DASDS date picker and multi-select dropdowns",
        caption: "Pickers · date & dropdowns",
      },
    ],
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
      { label: "Accessibility target", value: "WCAG 2.1 AA" },
      { label: "Mobile-first traffic share", value: "63%" },
      { label: "Reading level target", value: "Grade 6" },
    ],
    challenge:
      "Government services aren't optional. If the portal is hostile, citizens lose access to things they're entitled to. The legacy site was desktop-first, jargon-heavy, and gated behind agency-shaped navigation that made sense to civil servants and nobody else.\n\nThe ask was to rebuild around the things citizens are actually trying to do (\"renew my license\", \"check my refund\") with mobile and accessibility treated as constraints rather than afterthoughts.",
    approach:
      "Reorganized the IA around top tasks instead of agencies. Every page rewritten in plain language at a Grade 6 reading level, validated with citizen panels that included older adults and ESL users. Designed mobile-first using USWDS-aligned components so the experience felt familiar across .gov properties.\n\nEach component shipped with accessibility receipts. Keyboard traps, focus order, screen reader labels, and contrast all tested against WCAG 2.1 AA. Not stamped, tested.",
    outcome:
      "The relaunched experience hit AA across the audited surface. Mobile became the dominant traffic pattern. Time-to-task on the top five flows (license renewal, refund status, benefits eligibility, business filings, vehicle registration) measurably dropped.\n\nThe pattern library carries forward to other state services as a baseline.",
    sections: [
      {
        heading: "Who I designed for",
        body:
          "Three citizens stayed pinned above my monitor for nine months.\n\nA single mom on a bus with a cracked-screen Android, trying to renew her license between stops. She needs the answer in three taps and large enough type to read in motion.\n\nA retiree at a public library kiosk with a mouse he doesn't fully trust. He needs the page to make sense without him having to learn a new interaction model.\n\nA recent immigrant whose English is functional but not native. He needs plain language that explains the thing without burying the action.\n\nIf any of those three couldn't finish the task, the design failed. Everything else was negotiable.",
      },
      {
        heading: "The key decision: tasks instead of agencies",
        body:
          "The legacy IA was organized by which state agency owned the workflow. Tax stuff lives under Department of Revenue Services. License stuff under DMV. Benefits under Social Services. That's how the government is structured internally and it had nothing to do with how citizens think.\n\nWe rebuilt the entire homepage and primary navigation around verbs the citizen would actually search for. \"Renew\". \"Check\". \"Apply\". \"Pay\". The agency surfaces are still there as a secondary path, but the front door is task-shaped.\n\nThis was the call that took the longest to defend. Agency stakeholders push back when they lose top-level real estate. The win came from analytics: the legacy nav had a 60%+ bounce rate from the homepage, and the citizen panels couldn't find common tasks without help. Once the data was on the table, the verb-first IA stopped being a design opinion and became the obvious move.",
      },
      {
        heading: "What didn't go well",
        body:
          "Validation with older adults was harder than I planned for. The remote panels we set up worked fine for younger users but kept breaking for the 70+ cohort — Zoom failures, screen-share issues, microphone permissions. We pivoted to in-person sessions at libraries and senior centers, which got better data but cost weeks I didn't have in the budget.\n\nThe other miss was scope creep on copy. Plain language is a discipline, and rewriting hundreds of pages to a Grade 6 reading level surfaced legal language that agency lawyers wouldn't sign off on. Several flows ended up shipping with a plain-language summary on top and the legal language preserved below — a compromise that works but isn't as clean as I wanted.",
      },
    ],
    reflection:
      "Public-sector design is the most honest UX work I've done. No growth metric, no funnel optimization. Just whether someone can do the thing they came to do. The bar is don't be in the way.",
  },

  nerida: {
    slug: "nerida",
    role: "Solo founder · design, product, frontend, backend, ops",
    team: "Just me, paired with Claude Code as build partner",
    duration: "April 2026 → ongoing",
    yearRange: "2025 →",
    stack: ["Next.js 16", "React 19", "Supabase (Postgres + RLS)", "Tailwind 4", "Asaas (Pix)", "Resend", "Upstash Redis", "Vercel"],
    contextOneLiner:
      "Nerida is a modular platform for solo health professionals in Brazil. Psychology is in production, nutrition in beta. Agenda, structured records, native Pix, a financial module that handles Carnê Leão, and meal plans with a public patient link. All of it designed, built, and operated by one person.",
    highlights: [
      { label: "Active clients", value: "100+" },
      { label: "Zero to live", value: "12 days" },
      { label: "Database migrations", value: "51+" },
    ],
    challenge:
      "Brazilian psychologists running solo practices have a few software options, and they all stop at the same place: CRUD over patients and payments. Tools like PsicoManager and Psicoplanner manage the appointment book, but they don't help with the things that actually keep solo psychologists awake — irregular income, the social weight of asking patients to pay, and the tax mess of Receita Saúde and Carnê Leão.\n\nThe pattern came up over and over in conversations with psychologists in my circle: people pay late and asking for it feels uncomfortable; income swings make planning impossible; tax season is a frantic Excel reconstruction. Existing tools were built for the appointment side. The financial side was a gap.",
    approach:
      "I forked an internal multi-tenant clinical tool I'd been building and rebranded it for the solo market — single persona, no team views, no multi-clinic switcher. From fork to live product took twelve days.\n\nThe working rhythm: sprints of one to three days with Claude Code as build partner. I owned product direction, design, copy, and security calls; Claude handled scaffolding, schema migrations, and integration code (Asaas webhooks, Pix, email templates, cron jobs). I wrote a brief, reviewed every diff, shipped, repeated.\n\nA month after launch the product became a platform: a per-clinic module system with row-level security, so the same core serves psychologists in production and nutritionists in beta with different navigation, records, and tools.",
    outcome:
      "Nerida runs in production with real paying users — over a hundred active clients. Two plans (Essencial R$49, Profissional R$89), 7-day trial, Pix through Asaas.\n\nLive today for psychologists: agenda with reminders, structured records (anamnese, session evolutions, contracts), patient management with CSV import, and the financial module running five tabs — overview, payments, humanized two-step collections, subscriptions, and a fiscal tab that exports Carnê Leão CSV in the exact Receita Federal format. For nutritionists, in beta: anthropometry, meal plan builder with a public real-time patient link, and a 24-hour recall.\n\nThe public landing at nerida.com.br ships separately as a static LP with custom motion and a full SEO/AEO setup. Fifty-one migrations in, the schema has survived a launch, a pivot to multi-profession, and a second vertical.",
    sections: [
      {
        heading: "Who I designed for",
        body:
          "One persona. Brazilian psychologist running a solo practice — usually 20-50 patients, often working from home, frequently on the CPF tax regime. Not a tech buyer. They want software that disappears and lets them focus on the session.\n\nThat single-persona constraint changed every design decision. No team views. No multi-clinic switcher. No role permissions. The product is built around one person, not a workflow team.\n\nThe lilac brand and the glass-sphere login both fight the same enemy: clinical software that feels cold and bureaucratic. Nerida is meant to feel calm.",
        layout: "split",
        imageSide: "right",
        image: {
          src: "/projects/nerida/06__nerida-login.png",
          alt: "Nerida login screen with the glass spheres treatment on a lilac gradient",
          caption: "Login · glass spheres · the front door",
          aspect: "wide",
        },
      },
      {
        heading: "The key decision: the financial module",
        body:
          "Competitors stop at \"mark this payment as paid.\" Nerida starts there.\n\nThe financial module has five tabs. Overview shows projected end-of-month income, separating confirmed from outstanding. Payments is the listing. Collections runs a humanized two-step charge — cordial first, firm later, opt-in by patient. Subscriptions handles monthly recurring plans. Fiscal exports Carnê Leão CSVs in the exact Receita Federal format, tracks deductible expenses, and estimates IRPF.\n\nOther tools show you what you charged. Nerida shows you what's left, helps you ask for it without discomfort, and handles tax season without an Excel rebuild. That's the gap I kept hearing about in conversations, and it's where the product lives.",
        layout: "split",
        imageSide: "left",
        image: {
          src: "/projects/nerida/03__nerida-financeiro.png",
          alt: "Financial module overview tab with revenue, receivables, and defaulters",
          caption: "Financeiro · overview",
          aspect: "wide",
        },
      },
      {
        heading: "What didn't go well",
        body:
          "The pivot to a multi-profession platform came early — three weeks after launch, before I had usage data to justify it. The module system is good engineering and it made the nutrition beta possible, but the decision was driven by ambition, not by users asking for it. If nutrition doesn't convert, that month belonged to psychologist-facing features.\n\nThe landing page still tells the old single-vertical story, so the product is ahead of its own marketing. And there are no real testimonials on the site yet, which I feel every time I look at the social-proof section. Both are known debts, not mysteries.",
      },
    ],
    links: [
      { label: "Live · app.nerida.com.br", href: "https://app.nerida.com.br", external: true },
      { label: "Landing · nerida.com.br", href: "https://nerida.com.br", external: true },
    ],
    gallery: [
      {
        src: "/projects/nerida/00__lp-hero.png",
        alt: "Nerida public landing page hero — headline 'Cuide das sessões, a gestão cuida de si' over a lilac glass-sphere field with three product mockups (financial, agenda, billing chat)",
        caption: "Public landing · nerida.com.br",
        aspect: "wide",
      },
      {
        src: "/projects/nerida/01__nerida-dashboard.png",
        alt: "Dashboard — today's sessions, active patients, monthly revenue, receivables",
        caption: "Dashboard · the day at a glance",
        aspect: "wide",
      },
      {
        src: "/projects/nerida/02__nerida-agenda.png",
        alt: "Agenda — monthly calendar with sessions",
        caption: "Agenda · calendar, upcoming, history",
        aspect: "wide",
      },
      {
        src: "/projects/nerida/04__nerida-fiscal.png",
        alt: "Fiscal tab — Carnê Leão CSV export, deductible expenses, IRPF estimate",
        caption: "Fiscal · Carnê Leão in the Receita format",
        aspect: "wide",
      },
      {
        src: "/projects/nerida/05__nerida-pacientes.png",
        alt: "Patients listing — names, contact, status, CSV import",
        caption: "Pacientes · registry with CSV import",
        aspect: "wide",
      },
    ],
    reflection:
      "Twelve days from fork to live, another month to become a platform. The pace with Claude Code teaches you that the constraint isn't typing speed — it's decision quality. The AI never owned a decision; it owned the keystrokes that came after.",
  },

  "garmin-coach": {
    slug: "garmin-coach",
    role: "Sole author — design + build",
    team: "Solo",
    duration: "Weekend build, ongoing since 2025",
    yearRange: "2025 →",
    stack: ["Python 3.12", "FastAPI", "Pydantic v2", "Supabase (token refresh)", "Vercel", "Garmin Connect API (unofficial)", "Claude / GPT"],
    contextOneLiner:
      "A bridge between an LLM and a Garmin watch: paste a training plan, get structured workouts on your wrist. No manual re-entry.",
    highlights: [
      { label: "Lines of code", value: "~2k" },
      { label: "Token refresh", value: "Automated" },
      { label: "License", value: "MIT" },
    ],
    challenge:
      "I plan my running weeks with Claude in a separate chat. The output is plain text, and the path from there to my Garmin was manual: read the prose, open the app, tap through every interval by hand. I did it often enough that it stopped being a quirk and started being annoying.\n\nThe data shape isn't hard — Garmin's internal API exposes a workout format. The gap was that nobody built the bridge, and getting an LLM to fill that JSON without inventing field names meant the schema itself had to be the first thing I got right.",
    approach:
      "I started with the JSON contract: warmup, interval, recovery, cooldown, repeat, each with a typed duration and target. Strict, but short enough to paste into the prompt. Once the schema was stable the CLI followed — it parses the JSON with Pydantic and calls the API. The web app came next, mobile-first on FastAPI, so I can push a plan from my phone.\n\nThe last real piece was token refresh. Garmin's OAuth tokens expire in minutes, so I keep one row in Supabase that refreshes itself. The app just works when I pick up my phone mid-run-prep.",
    outcome:
      "Live as a Vercel-hosted web app, with the CLI running locally. The whole pipeline — plan in Claude, JSON out, push to a Forerunner 165 — is about 2k lines. I'm not training as much as I was in early 2026, but the infrastructure is stable and I reach for it whenever I'm back to structured runs.",
    sections: [
      {
        heading: "Who I designed for",
        body:
          "Myself, and no one else. I run with a Garmin, I plan with Claude, and I didn't want to re-enter intervals by hand.\n\nBuilding a tool you're the only user of is a different discipline. No research phase, no personas, and the feedback loop is ten minutes long. If the schema is annoying to prompt against, I feel it right away. That compression is the whole point of a side project.",
        image: { src: "/projects/garmin/01__garmin-send.png", alt: "Garmin Coach web app — paste JSON, send to Garmin", caption: "Send · paste the JSON, push, it lands on the watch", aspect: "wide" },
        layout: "split",
        imageSide: "right",
      },
      {
        heading: "The key decision: schema first",
        body:
          "The temptation was to start with the API or the UI. I started with the JSON schema, and that was the right call.\n\nAn LLM has to fill the schema without a field-by-field explanation every time, so the shape had to be obvious: predictable keys, typed targets, no ambiguous nesting. I iterated it in a single markdown file, pasting it into Claude and refining until the output came back valid with no correction needed. After that the rest was plumbing. The parser is just Pydantic validation, and swapping the model is a config change.",
        image: { src: "/projects/garmin/02__garmin-schema.png", alt: "The workout JSON schema — steps, repeats, typed targets", caption: "The JSON contract · steps, repeats, typed targets", aspect: "wide" },
        layout: "split",
        imageSide: "left",
      },
      {
        heading: "What didn't go well",
        body:
          "The serverless deploy fought me. The Garmin client library depends on curl_cffi, which doesn't compile on Vercel, so I run two paths: the full library on the CLI, and direct requests with an exported token on the web. It works, but it's inelegant.\n\nThe auth is also a bit of a house of cards. It leans on an unofficial endpoint Garmin can change without notice — when the library I started on broke after Garmin added Cloudflare fingerprinting, I had to migrate mid-project. The calendar view on the web is still incomplete because the listing endpoint returns 404 there. It's a tool I use, not a product I'd hand to a stranger.",
      },
    ],
    reflection:
      "Side projects let you ship the API you want to consume, not the one that survived a committee. The schema is exactly the shape I needed, the auth is exactly the amount I was willing to maintain, and the UI is as minimal as a tool I use alone can be.",
    gallery: [
      { src: "/projects/garmin/03__garmin-cli.png", alt: "Garmin Coach CLI — push_workout output with created workout", caption: "CLI · Pydantic validation → Garmin Connect", aspect: "wide" },
    ],
  },

  techcolab: {
    slug: "techcolab",
    role: "Designer-owned full stack — design, motion, build, deploy",
    team: "Solo, with Figma Make and Claude as build partners",
    duration: "2024 → iterated since",
    yearRange: "2024 →",
    stack: ["Figma", "Figma Make", "Hand-written HTML/CSS", "GSAP", "Vercel"],
    contextOneLiner:
      "The public site for TechCo.lab — NETZSCH's internal innovation hub. I designed and shipped it end-to-end, no engineering hand-off: concept in Figma, sections in Figma Make, production in clean hand-written code.",
    typewriter: {
      prefix: "We build",
      words: ["connected platforms.", "industrial AI.", "digital experiences.", "real impact."],
    },
    highlights: [
      { label: "Owned", value: "Design → deploy" },
      { label: "Engineering hand-offs", value: "0" },
      { label: "Lighthouse", value: "98" },
    ],
    challenge:
      "TechCo.lab is NETZSCH's innovation hub, and it needed a public site that did two jobs at once: explain what the hub builds — connected platforms, industrial AI, digital interfaces — to the rest of the company, and attract the kind of people who'd want to work there.\n\nThe constraint was real: no engineering capacity allocated and a tight window, but the bar was production-quality, not a template. It had to look like the work the hub actually ships.",
    approach:
      "I owned the whole stack. Designed in Figma, prototyped the motion-heavy sections in Figma Make, then ported everything to clean hand-written HTML/CSS for the production deploy on Vercel. No CMS, no framework overhead.\n\nThe hero leans on a typewriter line, \"We build…\" cycling through what the hub does, which sets the tone before a single scroll. The rest is a clear arc: capabilities, proof, the physical space, and the numbers (500+ users, 35+ countries, 80+ projects).",
    outcome:
      "Live at ntechcolab.com at production polish: 98 Lighthouse, AA contrast, motion that holds up on a phone. It's the reference I point to for designer-owned full-stack, the kind of small-but-real-stakes project where a hand-off would have cost more than it was worth.",
    sections: [
      {
        heading: "Who I designed for",
        body:
          "Two audiences on one page. Inside NETZSCH, leadership and other units who need to understand what the hub does and why it matters. Outside, the engineers, designers, and data people the hub wants to hire.\n\nThose pull in different directions: one wants credibility and proof, the other wants culture and ambition. The site resolves it by leading with the work and the numbers, then closing with the place and the people.",
      },
      {
        heading: "The key decision: own the whole stack",
        body:
          "The usual path is design in Figma, hand off to an engineer, review, repeat. With no engineering capacity and a tight window, I collapsed that into a single owner: Figma for design, Figma Make to prototype the motion, hand-written code for production.\n\nThe typewriter hero and the scroll motion were built directly in code, not faked in a mockup. Owning the deploy meant I could tune performance and contrast myself instead of writing a spec and hoping.",
      },
      {
        heading: "What didn't go well",
        body:
          "Figma Make is great for exploring a section fast, but the code it generates is throwaway. I rewrote most of it by hand for the production build, and treating Make as a prototyping tool rather than a code source was a lesson I learned mid-project.\n\nKeeping the motion smooth on mobile took more passes than I expected. The typewriter and scroll effects that felt effortless on a laptop needed real tuning to not jank on a phone.",
      },
    ],
    reflection:
      "AI-assisted tooling lets a designer take a project from sketch to ship without a hand-off cliff. The job shifts from \"document what to build\" to \"build it, and use the document for review.\"",
    links: [{ label: "Live · ntechcolab.com", href: "https://ntechcolab.com", external: true }],
    gallery: [
      { src: "/projects/techcolab/01__tcl-hero.png", alt: "TechCo.lab hero — We build intelligent technologies", caption: "Hero · the typewriter line", aspect: "wide" },
      { src: "/projects/techcolab/02__tcl-capabilities.png", alt: "TechCo.lab capabilities — industrial AI, connected platforms, digital interfaces", caption: "Capabilities", aspect: "wide" },
      { src: "/projects/techcolab/03__tcl-lab.png", alt: "TechCo.lab space and impact numbers", caption: "The lab · 500+ users · 35+ countries · 80+ projects", aspect: "wide" },
    ],
  },

  "netzsch-customer-portal": {
    slug: "netzsch-customer-portal",
    role: "Product designer — origin design, every flow",
    team: "Solo on design; HTML implementation taken over by a colleague from April 2026",
    duration: "2025 → 2026",
    yearRange: "2025 → 2026",
    stack: ["Figma (110+ frames)", "HTML/CSS implementation", "Vercel", "Inter · WCAG AAA target"],
    contextOneLiner:
      "A self-service portal for NETZSCH Grinding & Dispersing's industrial customers: machines, spare parts, quotes, contracts, lab tests, and an AI assistant. Designed for the people who run procurement at a plant, not for casual shoppers.",
    highlights: [
      { label: "Frames in Figma", value: "110+" },
      { label: "Flows designed", value: "12" },
      { label: "Buyer-side roles", value: "4" },
    ],
    challenge:
      "Industrial procurement doesn't look like e-commerce. Buyers order by part number and material code, purchases above a threshold need an approver, prices come from negotiated contracts rather than a public list, and the person operating the machine is often not allowed to see prices at all.\n\nBefore the portal, all of that ran through email and sales reps. The brief was a single place where a customer could check their installed machines, reorder grinding media, track orders, and pull contract pricing without calling anyone.",
    approach:
      "I designed the whole surface in Figma: 110+ frames across 12 flows, from a 23-screen registration and SSO path to checkout, contracts, services, and a five-page admin area. Light mode only, Inter, the NETZSCH green, and an AAA contrast target, because this gets used on factory-floor laptops with bad screens.\n\nThe structural decision was role-based design. Four buyer-side roles (administrator, buyer, approver, technician) see different navigations, different actions, and in the technician's case no prices anywhere: their \"add to cart\" becomes \"request for approval\" and generates an internal request number instead of an order. I also designed Milla, an AI assistant with four states, from a search-bar suggestion up to a full chat, scoped to spare parts, order status, and documents.\n\nImplementation went to HTML/CSS with a 1:1-to-Figma contract, taken over by a colleague in April 2026 while I reviewed against the frames.",
    outcome:
      "68 screens are live on the internal test deployment, pixel-faithful to the Figma source, covering dashboard, machines with hourmeters and service history, shop with volume pricing tiers, orders, quotes, contracts with negotiated price lists, and the full admin area.\n\nIt's pre-production: the deployment sits behind an access gate, and Milla's answers are simulated while the LLM integration stays on the roadmap. What exists today is the complete designed and built surface, waiting on backend wiring.",
    sections: [
      {
        heading: "Who I designed for",
        body:
          "Marcus, the persona on every screen, manages procurement for a plant running five NETZSCH mills. His job is keeping machines grinding: reorder beads before they run out, get a bearing shaft quoted, check why an order slipped.\n\nAround him sit three other roles with different rights. The approver reviews what buyers put in the queue. The technician knows exactly which spare part the machine needs but isn't allowed to commit money. The admin manages who can do what. Designing for the four of them at once is what shaped the portal more than any visual decision.",
        image: { src: "/projects/customer-portal/01__cp-machines.png", alt: "Machines page — installed base with hourmeters and service history", caption: "Machines · the customer's installed base", aspect: "wide" },
        layout: "split",
        imageSide: "right",
      },
      {
        heading: "The key decision: roles as a design primitive",
        body:
          "The easy version of this portal would be one interface with an admin toggle. I designed the role model into every flow instead, and made it visible in an admin matrix where each role's permissions can be read per module.\n\nThe technician role is the clearest example. Same catalog, same machine pages, but no prices, no cart, and no checkout. Their flow ends in a request with its own number that lands on the approver's desk. That respects how these companies actually buy: the person with the technical knowledge and the person with the budget are different people, and pretending otherwise is how portals end up unused.",
        image: { src: "/projects/customer-portal/02__cp-access-roles.png", alt: "Access & Roles admin — permission matrix across four roles", caption: "Access & Roles · permission matrix", aspect: "wide" },
        layout: "split",
        imageSide: "left",
      },
      {
        heading: "What didn't go well",
        body:
          "Milla is the honest gap. I designed four states of an AI assistant and the demo answers are canned: the model integration never left the roadmap while I was on the project. The design holds up, but I can't show you a real answer.\n\nThe other gap is validation. The portal lives on a gated test deployment and hasn't been in front of actual customers yet, so every flow decision is still an informed bet rather than a measured one. And I handed implementation over mid-project, which worked because the 1:1 contract was strict, but it means the shipped polish past that point isn't mine to claim.",
        image: { src: "/projects/customer-portal/03__cp-milla.png", alt: "Milla AI assistant chat modal over the dashboard", caption: "Milla · AI assistant, simulated responses", aspect: "wide" },
        layout: "split",
        imageSide: "right",
      },
    ],
    reflection:
      "B2B design is mostly about respecting an org chart you didn't draw. The portal's best ideas aren't visual, they're the request numbers, approval queues, and price visibility rules that map to how an industrial customer already works.",
    gallery: [
      { src: "/projects/customer-portal/04__cp-landing.png", alt: "Public landing page of the customer portal", caption: "Public landing · pre-login", aspect: "wide" },
      { src: "/projects/customer-portal/05__cp-product.png", alt: "Product detail — grinding media with volume pricing tiers", caption: "Product detail · volume pricing", aspect: "wide" },
      { src: "/projects/customer-portal/06__cp-contract.png", alt: "Parts contract with negotiated price list", caption: "Parts contract · negotiated price list", aspect: "wide" },
      { src: "/projects/customer-portal/07__cp-orders.png", alt: "Orders page with status-tracked history", caption: "Orders · status-tracked history", aspect: "wide" },
      { src: "/projects/customer-portal/08__cp-login.png", alt: "Login screen with SSO", caption: "Login · SSO + email", aspect: "wide" },
    ],
  },

  "iris-design-system": {
    slug: "iris-design-system",
    role: "Designer · DS author",
    yearRange: "2023 →",
    stack: ["Figma (library + variables)", "Segoe UI", "12\" and 15\" panel variants"],
    contextOneLiner:
      "The component library behind IRIS V3 — the design system every NETZSCH G&D machine HMI is built from. Tokens, 29 component families, and a variant set for each panel size.",
    highlights: [
      { label: "Component families", value: "29" },
      { label: "Panel size variants", value: "2" },
      { label: "Products built on it", value: "6" },
    ],
    challenge:
      "Industrial HMIs have patterns generic design systems don't carry: batch cards, recipe steps, machine status buttons, gauges, start/stop sequences with confirmation states. And every component has to exist twice, because the machines ship with either a 12-inch or a 15-inch panel and the touch targets can't simply scale.\n\nWithout a shared library, each of the six IRIS product lines would have kept solving these locally — which is exactly the divergence IRIS V3 existed to end.",
    approach:
      "I built the library in Figma as the single source for all six product lines: a tokens layer (the NETZSCH teal ramp, neutrals, signal colors, spacing, radii) feeding 29 component families, each published with 12\" and 15\" variants and their full state sets.\n\nThe domain components are the point. Snackbars and text fields exist in any DS; batch cards, dosing gauges, hourmeter displays, and operation bars are what make this one industrial. Those came from the products, were generalized, and went back into the library.",
    outcome:
      "All six IRIS V3 product lines ship from this library, and new HMI screens start from published components instead of copies of old screens. It's the quiet half of the IRIS V3 case: the platform redesign got the attention, the library is what made it repeatable.",
    gallery: [
      { src: "/projects/iris-ds/01__irisds-foundations.png", alt: "IRIS DS foundations — color tokens and Segoe UI typography", caption: "Foundations · tokens from the library variables", aspect: "square" },
      { src: "/projects/iris-ds/02__irisds-buttons.png", alt: "IRIS DS buttons — full state set for 12-inch panels", caption: "Buttons · the 12\" set", aspect: "square" },
      { src: "/projects/iris-ds/03__irisds-forms.png", alt: "IRIS DS forms — text fields, checkboxes, radios, toggles", caption: "Forms", aspect: "square" },
      { src: "/projects/iris-ds/04__irisds-feedback.png", alt: "IRIS DS feedback — snackbars, section messages, modals", caption: "Feedback", aspect: "square" },
      { src: "/projects/iris-ds/05__irisds-process.png", alt: "IRIS DS process — progress bars, batch cards, recipe cards", caption: "Process & batch · the industrial part", aspect: "square" },
      { src: "/projects/iris-ds/06__irisds-dashboard.png", alt: "IRIS DS dashboard — cards, controls, gauges", caption: "Dashboard components", aspect: "square" },
      { src: "/projects/iris-ds/07__irisds-smallparts.png", alt: "IRIS DS small parts — chips, tags, badges, pagination, start/stop", caption: "Small parts", aspect: "square" },
    ],
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

  norius: {
    slug: "norius",
    role: "Lead designer · design system, UI, prototype",
    team: "With NDB (NETZSCH do Brasil): Leandro Starke, Nicolas (dev), Arthur Zinke",
    duration: "2 months · 2026",
    yearRange: "2026",
    stack: ["Figma", "React 19 · Vite · TypeScript", "Tailwind CSS 4", "Storybook 10", "Thingsboard Cloud"],
    contextOneLiner:
      "Norius is NETZSCH do Brasil's IoT monitoring platform: sensors, reservoirs, pumps, alarms, remote operation, hosted on Thingsboard. I redesigned two tenants from scratch with a structured discovery, a design system, and a navigable prototype for client validation.",
    highlights: [
      { label: "Components in Storybook", value: "30" },
      { label: "Color tokens", value: "81" },
      { label: "Heuristics mapped", value: "15" },
    ],
    challenge:
      "Two tenants (Pomerwasser and Capixaba Energia) ran on twelve divergent screens, each solving the same thing a different way. Pressure, tank level, and alarm severity showed up in different places with incompatible patterns. There was no design system and nothing reusable. The starting point was raw Thingsboard: functionally correct, visually dated, and short on the accessibility and consistency an industrial environment needs.\n\nThe client needed an interface a field operator could use on a tablet over weak 4G, with no per-tenant retraining.",
    approach:
      "I started with a structured discovery: inventoried all twelve screens by hand, catalogued 42 atomic components already in the UI, and documented 15 heuristic violations by priority. That fed the decisions: collapse twelve screens into six templates, use Atomic Design, and handle multi-tenant through tokens and feature flags instead of duplicating screen by screen.\n\nInstead of only drawing in Figma, I built the design system in code at the same time. Storybook with React and Tailwind 4, a story per component, MDX docs with do/don't guidance. By the end of the design phase, 30 components had real implementations, 155 stories, and 115 passing tests. I also built a separate navigable prototype so the client could click through the flow before a line of production code.",
    outcome:
      "The client has a working design system with a hosted Storybook, 51 Figma pages mirroring the components, and a navigable prototype for validation. Handoff to the dev starts from documented, tested components instead of a pile of questions.\n\nThree principles run through all of it: alarm severity reads by shape and color, not color alone; time-series charts use straight segments, not smoothed curves; destructive actions like stopping a pump require a typed reason.",
    sections: [
      {
        heading: "Who I designed for",
        body:
          "Three people with different relationships to the same data.\n\nThe field operator works from a tablet, sometimes on weak 4G, and needs to confirm whether a pump is running or which alarm fired. No time to explore, so the answer has to be visible.\n\nThe operations supervisor reads the whole site through the map before drilling into one point. The maintenance engineer needs hour-meters, start history, and threshold config for diagnosis, a depth that shouldn't sit in the operator's way.\n\nMulti-tenant complicates it: Pomerwasser monitors reservoirs and water chemistry, Capixaba monitors pump pressure and power. Different data, shared interface.",
      },
      {
        heading: "The key decision: one system, not two products",
        body:
          "The tempting path was two products, one per tenant. I chose one design system with the differences controlled by tokens and feature flags.\n\nPomerwasser doesn't need a pressure gauge; Capixaba doesn't need fluoride indicators. But both need the alarm card, device header, sidebar, map, and KPI card to behave identically. Splitting the products would double the maintenance for no user benefit. So the components on every screen of both tenants became the non-negotiable base, and tenant-specific pieces slot in through flags without touching the rest.",
      },
      {
        heading: "What didn't go well",
        body:
          "Discovery showed me that some of the original platform's odd UX was actually rational once you understood the operational context. I redesigned two interaction patterns before realizing the problem wasn't the pattern, it was the missing visual context that made it confusing. That cost a few days.\n\nThe prototype also outgrew its brief. It started as five screens for the client to click through and became eight routes with an interactive map, sensor drawer, and filtered alarm table. Worth it (the client gave specific feedback instead of approving static frames) but the scope crept past what the contract covered.",
      },
    ],
    reflection:
      "Building the design system in code alongside Figma is the decision I'd make again without hesitating. Writing the MDX docs forced answers to questions Figma never asks, like when a component should not be used, or what its error behavior is. Those answers are exactly what the dev handoff needs.",
    gallery: [
      { src: "/projects/norius/01__norius-dashboard.png", alt: "Norius dashboard — Pomerwasser operational monitoring", caption: "Dashboard · Pomerwasser", aspect: "wide" },
      { src: "/projects/norius/02__norius-fullmap.png", alt: "Norius full equipment map with status pins", caption: "Full Map · equipment status", aspect: "wide" },
      { src: "/projects/norius/03__norius-eta.png", alt: "Norius ETA screen — tank levels, gauges, trends", caption: "ETA · tank levels & trends", aspect: "wide" },
      { src: "/projects/norius/04__norius-alarms.png", alt: "Norius alarms — severity-ranked alert queue", caption: "Alarms · severity queue", aspect: "wide" },
    ],
  },

  mosey: {
    slug: "mosey",
    role: "Solo · design, product, iOS dev",
    team: "Solo",
    duration: "April 2026 → ongoing",
    yearRange: "2026",
    stack: ["SwiftUI (iOS 26)", "SwiftData", "Apple Foundation Models (on-device)", "MapKit", "HealthKit", "Open-Meteo", "Wikipedia API"],
    contextOneLiner:
      "A travel app built for one trip: 27 days across Denmark and Norway. Native iOS, anti-itinerary, with contextual suggestions and a daily plan generated by on-device AI.",
    highlights: [
      { label: "Places curated", value: "60" },
      { label: "Events bundled", value: "42" },
      { label: "AI inference cost", value: "$0" },
    ],
    challenge:
      "I have a 27-day trip to Denmark and Norway coming in July, and I didn't want a rigid itinerary app. I wanted something that works with how I actually travel: show up somewhere, figure it out, document it later.\n\nEvery travel app I tried was either a planning tool (calendar-first, top-down) or a discovery tool (a map with reviews). None answered the question I actually ask each morning: what do I feel like doing right now, given the weather, where I am, and what I haven't done yet.",
    approach:
      "Built for one user and one trip. That constraint cut most of the decisions: no social layer, no login, no multi-trip support, everything local with SwiftData. The Today tab leads with intent, not a calendar; a Plan tab covers the days I want structure; a Journal logs visits after the fact.\n\nThe AI was meant to run on Claude's API, until one auto-plan run burned through my quota in a single session. I moved the whole inference stack to Apple's on-device Foundation Models on iOS 26: no API key, no cost, works offline. For a personal app that was the right call anyway.",
    outcome:
      "The app builds clean and runs on iOS 26. The auto-plan generates an eight-day, eleven-stop itinerary entirely on-device. 60 curated places across Copenhagen, Herlev, Billund, and Oslo; 42 events bundled for the trip window.\n\nIt's not on the App Store. It runs on free provisioning until I decide whether the developer fee is worth it. The trip starts in July, and that's the real test.",
    sections: [
      {
        heading: "Who I designed for",
        body:
          "One user: me. That sounds like a cop-out until you notice most travel apps fail precisely because they're built for everyone.\n\nMy pattern: I don't pre-book much, I move by bike and transit, I eat where I end up, and I document the day afterward. I wanted the app to support that, not fight it. The anti-itinerary framing isn't a tagline, it's why the Today tab opens with \"what do you feel like doing today?\" instead of a schedule. The Plan tab exists for the days I do want structure, but it's opt-in.",
      },
      {
        heading: "The key decision: on-device AI",
        body:
          "The original plan used Claude's API for both the concierge chat and the structured auto-plan. That lasted until the first real auto-plan run exhausted my monthly quota in one session.\n\nI moved everything to Apple Foundation Models. It meant raising the iOS target from 18 to 26, which is a real cost: anyone on older iOS can't install it. For a personal app, fine. Guided generation produces the day-by-day plan on-device, streaming, with no network call and no bill. The model is good enough for the job. I'm not asking it to replace a travel agent, just to turn a list of places into a sensible daily order.",
      },
      {
        heading: "Where it is now",
        body:
          "Build is clean, the core works, the trip hasn't happened yet, and I'm honest about that being the unfinished part.\n\nThree things I know are rough: a handful of force-unwraps that could crash on a day I'm not near a laptop; an auto-plan that sometimes repeats day titles; and about fifty hardcoded colors that should be tokens. I did the audit and noted everything but haven't applied the fixes. The widget and Live Activity are built but disabled for now. CloudKit sync waits on the developer-account decision, which I need to make before July so the person travelling with me can get a TestFlight build.",
      },
    ],
    reflection:
      "Building an app for a specific trip you're about to take is a strange kind of pressure: a hard deadline, a real user, and the stakes are exactly one vacation. The things I skipped (social, purchases, multi-trip) stay skipped, because there's no version of this where I regret them.",
    gallery: [
      { src: "/projects/mosey/01__mosey-today.png", alt: "Mosey Today screen — contextual suggestions", caption: "Today · what do you feel like doing?", aspect: "wide" },
      { src: "/projects/mosey/02__mosey-weather.png", alt: "Mosey weather-aware suggestions", caption: "Weather-aware · reads the sky", aspect: "wide" },
      { src: "/projects/mosey/03__mosey-concierge.png", alt: "Mosey Concierge — on-device AI chat", caption: "Concierge · on-device AI", aspect: "wide" },
      { src: "/projects/mosey/04__mosey-journal.png", alt: "Mosey Journal — trip day by day", caption: "Journal · your trip, day by day", aspect: "wide" },
      { src: "/projects/mosey/05__mosey-saved.png", alt: "Mosey Saved places", caption: "Saved · places worth returning to", aspect: "wide" },
    ],
  },
};

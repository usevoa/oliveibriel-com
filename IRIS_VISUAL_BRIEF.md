# IRIS V3 — Visual brief for the design-process artifacts

## Why this exists

The IRIS V3 case study currently shows **finished screens only** — 10 polished captures in the gallery, 2 inline in the body. A senior UX hiring manager scanning the case has no way to see *how* Gabriel got there: no sketches, no wireframes, no before/after, no decision-making artifacts.

Your job is to produce the missing process artifacts so the case reads like real design work, not just a screenshot dump.

## Audience for the artifacts

- UX leads / hiring managers (sr/staff/principal level)
- Reviewing in 60–90 seconds
- They want to see: thinking process, tradeoffs, the messy middle, evidence of constraint-driven decisions

## Format guidelines

- **Output**: PNG, 16:9 by default unless noted, ~2400px wide, transparent or `#0a0e14` background depending on artifact
- **Style**: aligned to the rest of the site — clean, technical, restrained color. Plenty of whitespace. Mono font for callouts (Geist Mono or JetBrains Mono).
- **Drop in**: `/public/projects/iris-v3/process/<slug>.png`
- After producing them, update `src/data/cases.ts` so the relevant case section references each artifact via the `image` field on a `CaseSection`.

## Constraints — read before drafting anything

- Do **not** invent claims (number of countries, machines, operators, percent improvements). Stick to what the case copy already says: 6 product lines, 36 countries (NETZSCH global network), 3 languages, two panel sizes (12.1" and 15"), deployed since 2023.
- Do **not** mention "Resino" — confidential client, removed from the case.
- Do **not** copy NETZSCH's actual product imagery beyond what's already in `/public/projects/iris-v3/`. These are stylized representations, not leaked screens.
- Keep the operator-facing language consistent with the case voice: dry, first-person, no hype.

---

## Artifacts to produce

### 1. **Before/after — fragmentation problem** (highest priority)

**Goal:** Show in one frame why V3 needed to exist. Pre-V3, every product had its own HMI shape. Post-V3, every product shares the same module layout.

**Composition:**
- Top half labeled `Before · pre-V3`. Show 4 stylized HMI thumbnails side by side, each with a clearly different layout — different nav placement, different dashboard structure, different color palette. Don't make them look like real products; abstract them as wireframe-level rectangles + labels.
- Bottom half labeled `After · V3`. Same 4 products, now visibly sharing the same module skeleton: nav in the same spot, dashboard in the same spot, alarms in the same spot. Color/density can vary slightly per product.
- Annotation in the middle: `same place, every machine`.

**Drop into:** `src/data/cases.ts` → `iris-v3` → section `"Same place, every machine"`. Replace or supplement the current Confectionery image.

**Filename:** `process/01-before-after-fragmentation.png`

---

### 2. **Module layout sketch** (medium priority)

**Goal:** Show the original design thinking — the contract that every product layout follows.

**Composition:**
- Lo-fi sketch (pen-on-paper or Figma with hand-drawn vibe). Single screen template with labeled regions:
  - Top: header / breadcrumb
  - Left rail: module nav (Dashboard / Recipes / Alarms / Settings / Maintenance)
  - Main: shared content area
  - Bottom-right: persistent operation bar
- Margin annotations showing where product-exclusive features slot in: "Bead Filling here on InView/Confectionery", "Operation Bar variant on Mixers", "Scale Calibration on dosing-aware products".
- Should look like a working sketch, not a polished spec — grid lines visible, slight imperfection.

**Drop into:** `src/data/cases.ts` → `iris-v3` → section `"Same place, every machine"`. Add as a second image, or use as the primary if before/after isn't ready.

**Filename:** `process/02-module-layout-sketch.png`

---

### 3. **Persona quick-card grid** (medium priority)

**Goal:** Make the "Who I designed for" section visual instead of a wall of text.

**Composition:**
- 4 cards in a 2×2 or 1×4 grid. Each card has:
  - A monochromatic line icon (no decorative illustrations) — operator helmet, technician toolset, coordinator dashboard, supervisor chart
  - Persona name in display weight: Operator / Maintenance Technician / Maintenance Coordinator / Production Supervisor
  - 2-line context: where they sit, what they're optimizing for
  - 1-line "key need" — gloves + bad lighting / diagnostic depth / fleet view / KPI trends
- Background: same dark elevated card the rest of the site uses.

**Drop into:** `src/data/cases.ts` → `iris-v3` → section `"Who I designed for"`. Replace the current alarm screen with this grid (the alarms screen is already in the gallery anyway).

**Filename:** `process/03-personas.png`

---

### 4. **Density study — 15" → 12.1" adaptation** (medium priority)

**Goal:** Show the failure described in "What didn't go well" — that resizing alone didn't work, several modules had to be recomposed from primitives.

**Composition:**
- Side-by-side. Left: Confectionery 15" widescreen layout (use the existing `06__confectionery-15in.png` as visual reference, simplified). Right: same module on 12.1", recomposed.
- Red annotation arrows pointing at what changed structurally — not just shrunk: a panel that became a tab, a row that became collapsible, an inline chart that moved to a drawer.
- One callout in the corner: `Resize ≠ recompose`.

**Drop into:** `src/data/cases.ts` → `iris-v3` → section `"What didn't go well"`. Currently has no image — this would be the first.

**Filename:** `process/04-density-study.png`

---

## Optional / nice-to-have

### 5. **User flow — recipe edit + irreversible-action confirm**

Quick flow diagram showing: Operator → Recipes → Edit row → Save → Confirm dialog → Applied. Highlights the consistent way irreversible actions are confirmed across products.

Filename: `process/05-recipe-flow.png`

### 6. **Plants DS token + component overview**

A clean snapshot of the design system: color tokens, type scale, spacing, and a sampling of components (alarm row, batch progress, P&ID flowchart node) arranged on a grid.

Filename: `process/06-plants-ds-overview.png`

---

## After producing artifacts

1. Add files under `/public/projects/iris-v3/process/`.
2. Edit the relevant `CaseSection.image` entries in `src/data/cases.ts`. Keep `aspect`, `caption`, and `alt` fields populated so the lightbox + caption rendering works.
3. Run `npm run build` to validate.
4. Commit with a clear message and push — Gabriel has auto-deploy on Vercel.

If anything in this brief contradicts the case copy, the case copy wins — don't change Gabriel's words to fit your image.

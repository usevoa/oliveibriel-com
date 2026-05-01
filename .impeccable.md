# Impeccable — Design Context

> Persistent design guidelines for oliveibriel.com — Gabriel Oliveira's portfolio.
> Established 2026-05-01.

## Design Context

### Users

**Primary**: Senior+ recruiters and design hiring managers at top product companies (FAANG, Linear, Vercel, Stripe, Figma, Notion). Time-constrained — scan in 30s, decide in 2min. Need to evaluate craft, range, and seniority quickly.

**Secondary**: Designers, design-engineers, and AI-curious founders who land on the site via Twitter/Read.cv/word-of-mouth and stay for the work and writing.

**Tertiary**: Future clients evaluating Gabriel for product-design or AI-native build engagements.

**Job to be done**: "Show me, in under 2 minutes, that this person ships at senior+ level on hard problems — industrial SaaS, design systems, AI-native tools — without making me hunt for the proof."

### Brand Personality

Three words: **technical · grounded · contemporary**.

- **Tone**: confident, direct, never salesy. Senior tone — assumes the reader is also senior.
- **Voice**: first person, plain language, no agency-speak ("crafting digital experiences" is banned). Specific over generic ("IRIS V3 at NETZSCH" beats "industrial SaaS platform").
- **Emotional goal**: the recruiter feels *this person knows what they're doing* — quietly impressive, not flashy.

### Aesthetic Direction

**Visual tone**: light, editorial, design-engineer. Sits between mds.is (Apple-quiet) and rauno.me (technical-craft).

**References**:
- `paco.me` — mono-heavy nav, command palette, monoespaçamento
- `rauno.me` — interactive demos, technical density
- `mds.is` — generous spacing, premium type
- `pacombertrand.com` — editorial gravitas
- `linear.app` — quiet confidence, restraint

**Anti-references**:
- ❌ Bento dashboard look with bright gradients on everything
- ❌ "Hey I'm a designer" agency-ish hero with stock photos
- ❌ Garish neon accents, dark-mode-as-default just for the look
- ❌ Generic Awwwards motion (overuse of WebGL, fluid blobs, 3D scrolls without purpose)
- ❌ Marketing-speak ("transforming digital landscapes", "passionate about", "we craft")

**Theme**: Light-only. Dark mode dropped — light feels editorial and confident, and matches the design-engineer references. Warm light bg (`#fafaf9`), near-black text (`#09090b`), industrial blue accent (`#1d4ed8`).

**Typography**: Inter (sans, 300–800) + JetBrains Mono (mono, 400/500). No serif display.

### Design Principles

1. **Proof over polish.** Every decision must surface evidence (metric, ship date, real client name) over decoration. If a section doesn't help a recruiter trust Gabriel's seniority, it gets cut.

2. **Restraint is the signature.** Generous whitespace, single-accent palette, motion that serves content. Anything that looks "tried hard" gets pulled back. Confident interfaces feel quiet.

3. **Motion as craft signal, never decoration.** Animations exist to (a) reveal hierarchy, (b) confirm interaction, or (c) signal technical taste. No motion just because it can be done. Spring physics over linear easings. Always honors `prefers-reduced-motion`.

4. **Mono as voice marker.** JetBrains Mono carries metadata, status, timestamps, and labels. It signals technical fluency without shouting. Limit to ≤12px, uppercase + tracking for labels.

5. **Accessible by default — and visibly so.** WCAG 2.1 AA contrast minimum. Semantic HTML always. `prefers-reduced-motion`, focus-visible rings, alt text, semantic landmarks. Gabriel sells WCAG expertise (MyCT case) — the portfolio must walk that talk.

### Hard rules

- Light mode only.
- Accent color: `#1d4ed8` (electric blue). Single accent — no secondary palette.
- Photos: real, not stock. Grayscale-shift on hover OK; no heavy filters.
- Status indicators: pulsing green dot only when truthful ("Currently shipping IRIS V3" is fact).
- Em-dashes (`—`) over hyphens for clauses.
- Spelling: US English in copy; PT-BR planned later via i18n.
- Never reference "available for new projects" if not currently true.

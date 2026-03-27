# Repository Guidelines

## Project Overview

**svg-icon-tester** is a static [Astro](https://astro.build) website for previewing and comparing SVG favicons and app icons. The primary workflow is: paste raw SVG code into `src/data/projects.ts`, run the build, and inspect every icon variant rendered at 7 fixed sizes (16 – 512 px) against 9 background colours — all without a page reload.

This is a local developer tool. No authentication, no persistence, no server required.

> **Current state**: The project is pre-implementation. `SYSTEM_SPEC.md` is the authoritative source of truth. `README.md` and `.gitignore` are empty placeholders. No source code exists yet.

---

## Critical Workflow Requirement

> **You MUST make a commit after every completed task. This is non-negotiable and must be followed under all circumstances.**

Each commit must:
- Capture exactly one logical unit of completed work
- Have a clear, descriptive commit message
- Not batch unrelated changes

---

## Architecture & Data Flow

```
src/data/projects.ts          ← sole data source; edit here to add icons/projects
        │
        ▼
src/pages/[slug].astro        ← calls getStaticPaths(), generates one route per project
        │
        ├── BgSelector.astro  ← renders swatch row; vanilla JS sets data-bg on #preview-root
        │
        └── IconGrid.astro    ← iterates 7 fixed sizes for one IconEntry
                │
                └── IconPreview.astro  ← injects raw SVG as innerHTML at exact pixel size
```

**Background switching**: clicking a swatch writes a `data-bg="#rrggbb"` attribute to a parent `<div id="preview-root">`. All `IconPreview` cells read this via a CSS custom property (`--preview-bg`). No page reload; no framework reactivity.

**SVG rendering**: SVGs are injected as raw `innerHTML` (not `<img src>`). This is intentional — it preserves `currentColor`, `<defs>`, inline `<style>`, filters, and CSS variables. The `<svg>` element's `width`/`height` are overridden to `100%` so it fills its container.

**Static generation**: `getStaticPaths()` in `[slug].astro` generates one page per `Project` in `projects.ts` at build time. Adding a project requires only editing that file.

---

## Key Directories

```
src/
├── data/
│   └── projects.ts           # All project and icon definitions — the only file editors touch regularly
├── layouts/
│   └── BaseLayout.astro      # Shared page shell: <head>, nav, footer, metadata
├── pages/
│   ├── index.astro           # Homepage: grid of ProjectCard components
│   └── projects/
│       └── [slug].astro      # Dynamic route: BgSelector + IconGrid per icon variant
├── components/
│   ├── ProjectCard.astro     # Index-page card: name, description, 32px thumbnail
│   ├── IconGrid.astro        # One icon × 7 sizes in a scrollable row
│   ├── IconPreview.astro     # Single SVG cell at one size × one bg colour
│   └── BgSelector.astro     # Nine-swatch colour picker; drives all previews via data-bg
└── styles/
    └── global.css            # CSS custom properties, reset, base typography
public/
└── favicon.svg               # Site's own favicon (placeholder acceptable)
```

---

## Important Files

| File | Purpose |
|---|---|
| `SYSTEM_SPEC.md` | Authoritative specification — components, data model, acceptance criteria |
| `src/data/projects.ts` | Data layer: `Project[]` export; only file that needs editing to add content |
| `src/pages/projects/[slug].astro` | Dynamic route; `getStaticPaths()` derives pages from `projects.ts` |
| `src/components/IconPreview.astro` | Core rendering unit; SVG injection + size/bg wiring lives here |
| `src/components/BgSelector.astro` | Vanilla JS event handling for background switching |
| `astro.config.mjs` | `output: 'static'` — must not be changed to SSR |
| `tsconfig.json` | Extends `astro/tsconfigs/strict` |

---

## Data Model

Defined in `src/data/projects.ts`:

```typescript
export interface IconEntry {
  id: string;       // unique within project, e.g. "v1", "rounded"
  label: string;    // heading shown above the icon's size grid
  svgCode: string;  // full raw <svg>…</svg> string
}

export interface Project {
  slug: string;          // URL-safe; becomes /projects/[slug]
  name: string;          // display name
  description?: string;  // optional; shown on index and project pages
  icons: IconEntry[];    // one or more variants to compare
}

export const projects: Project[] = [ /* … */ ];
```

**To add a project**: append a `Project` object to the `projects` array. Rebuild. No other changes required.

---

## Development Commands

```bash
npm run dev       # local dev server (hot reload)
npm run build     # production static build → dist/
npm run preview   # serve the built dist/ output locally
```

No custom scripts. Standard Astro CLI commands only.

---

## Runtime & Tooling

| Concern | Choice |
|---|---|
| Framework | Astro (`output: 'static'`) |
| Node | 18+ |
| Package manager | npm (no lockfile committed yet; use npm) |
| Styling | Plain CSS — no Tailwind, no CSS-in-JS |
| Client JS | Vanilla JS in Astro `<script>` blocks — no React, Vue, or Svelte |
| TypeScript | Strict mode via `"extends": "astro/tsconfigs/strict"` |
| Bundler | Astro's built-in Vite pipeline — no manual Vite/Webpack config needed |

---

## Code Conventions & Common Patterns

### Components
- All components are `.astro` files. Props are typed with a local `interface Props { … }` block inside the component frontmatter.
- Props are destructured from `Astro.props`.
- Scoped `<style>` blocks for component-level CSS; `global.css` for tokens and reset only.

### Styling
- CSS custom properties for all design tokens (spacing, colour, border-radius) in `global.css`.
- Background colour on `IconPreview` is driven by `--preview-bg` custom property so JS can update all cells in one write.
- Icon cells must have a 1 px neutral border so white icons on a white background remain visible.
- Icon grid scrolls horizontally on narrow viewports — do not allow wrapping.
- System-ui font stack. No dark mode.

### Client-side Interactivity (`BgSelector`)
- Single `<script>` block using `document.querySelectorAll` and delegated event listeners.
- Clicking a swatch sets `data-bg` on `#preview-root`; CSS picks up the change via the custom property.
- Active swatch is indicated with a visible ring/border; update the active class in the same JS handler.

### SVG Injection
- Use `set:html={svgCode}` (Astro's raw-HTML directive) to inject SVG as `innerHTML`.
- Override `width` and `height` on the `<svg>` element to `"100%"` before injection so it fills its container regardless of the original viewBox.
- **Security**: SVGs are user-supplied and rendered unsanitised. This is accepted for a local dev tool. Add a comment in `IconPreview.astro` documenting this assumption explicitly.

### Dynamic Routes
- `getStaticPaths()` in `[slug].astro` maps `projects` to `{ params: { slug }, props: { project } }`.
- No catch-all routes. Every page is fully pre-generated at build time.

### TypeScript
- Strict mode throughout. No `any` unless absolutely necessary with an explanatory comment.
- Data interfaces live in `src/data/projects.ts` alongside the data they describe.
- No separate `types/` directory unless the project grows significantly.

---

## Testing & QA

No automated test suite exists or is specified. Verification is manual against the acceptance criteria in `SYSTEM_SPEC.md`:

1. `npm run build` completes without errors for the example project data.
2. Index page lists all projects and shows a 32 px thumbnail for each.
3. Each project page renders all icons at all 7 sizes in a scrollable grid.
4. Clicking a background swatch updates all icon cells simultaneously without a page reload.
5. The active swatch is visually distinct from inactive swatches.
6. SVG code using `currentColor`, inline `<style>`, and `<defs>` renders correctly.
7. Adding a second project to `projects.ts` and rebuilding generates a new page at the expected URL with no other changes required.

If a test framework is added later, prefer **Vitest** (ESM-native, Astro-compatible) for unit tests and **Playwright** for end-to-end visual verification.

---

## Out of Scope

Do not implement unless explicitly requested:

- File upload UI for SVGs
- Live in-browser SVG code editor
- Saving or persisting changes
- Authentication
- Deployment configuration (Netlify, Vercel, etc.)
- Dark mode

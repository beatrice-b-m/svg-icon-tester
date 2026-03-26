# SYSTEM_SPEC.md — SVG Icon Preview Site

## Overview

Build a static Astro website for previewing and comparing SVG favicons/app icons at multiple sizes and against multiple background colors. The primary use case is pasting or uploading raw SVG code to see how an icon renders across typical display contexts before finalising it.

---

## Tech Stack

- **Framework**: Astro (static output, `output: 'static'`)
- **Styling**: Plain CSS (scoped component styles + a global base stylesheet). No Tailwind or UI framework.
- **Interactivity**: Vanilla JS / Astro's `<script>` tags (no React/Vue needed)
- **Data layer**: Local JSON or TypeScript data files (no database, no CMS)
- **Node version**: 18+

---

## Site Structure

```
/
├── src/
│   ├── data/
│   │   └── projects.ts          # Project definitions
│   ├── layouts/
│   │   └── BaseLayout.astro     # Shared shell (nav, head, footer)
│   ├── pages/
│   │   ├── index.astro          # Homepage — project list
│   │   └── projects/
│   │       └── [slug].astro     # Dynamic route — one page per project
│   ├── components/
│   │   ├── ProjectCard.astro    # Card used on index page
│   │   ├── IconPreview.astro    # Renders a single SVG at one size × bg combo
│   │   ├── IconGrid.astro       # Lays out all size × bg combinations for one icon
│   │   └── BgSelector.astro    # Background color toggle UI
│   └── styles/
│       └── global.css
├── public/
│   └── favicon.svg              # Site's own favicon (can be a placeholder)
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

---

## Data Model

### `src/data/projects.ts`

```typescript
export interface IconEntry {
	id: string; // Unique within the project, e.g. "v1", "rounded", "dark"
	label: string; // Display name shown above the icon grid
	svgCode: string; // Raw SVG string (the full <svg>…</svg> element)
}

export interface Project {
	slug: string; // URL-safe identifier, used in /projects/[slug]
	name: string; // Display name
	description?: string; // Optional short description shown on index and project page
	icons: IconEntry[]; // One or more SVG variants to compare
}

export const projects: Project[] = [
	// Example — remove or replace before first use:
	{
		slug: "example",
		name: "Example Project",
		description: "A placeholder to demonstrate the layout.",
		icons: [
			{
				id: "v1",
				label: "Version 1",
				svgCode: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="45" fill="#4F46E5"/>
  <text x="50" y="67" text-anchor="middle" font-size="52" font-family="sans-serif" fill="white">A</text>
</svg>`,
			},
		],
	},
];
```

**Adding a new project**: edit `projects.ts`, add a `Project` object. The page is generated automatically at build time via the dynamic route.

---

## Pages

### `index.astro` — Homepage

- **Title**: "SVG Icon Previewer"
- **Content**:
    - Brief one-sentence description of the tool.
    - A list/grid of project cards. Each card shows:
        - Project name (links to `/projects/[slug]`)
        - Optional description
        - A small thumbnail preview of the **first icon** of the project rendered at 32 × 32 px, on a white background, as a quick visual identifier.
- No other interactivity needed on this page.

### `/projects/[slug].astro` — Project Page

- **Title**: `[Project Name] — SVG Icon Previewer`
- **Breadcrumb**: `Home > [Project Name]`
- **Content** (in order):
    1. Project name as `<h1>`, optional description as a paragraph.
    2. **Background selector** — see component spec below.
    3. For each `IconEntry` in the project's `icons` array, render an **IconGrid** component.

---

## Components

### `BgSelector.astro`

A row of colour swatches the user can click to change the background used in all icon previews on the page.

**Backgrounds** (hardcoded, in this order):

| Label       | Value     | Notes                      |
| ----------- | --------- | -------------------------- |
| White       | `#ffffff` | Default / selected on load |
| Light Grey  | `#f0f0f0` |                            |
| Mid Grey    | `#808080` |                            |
| Dark Grey   | `#333333` |                            |
| Black       | `#000000` |                            |
| Brand Blue  | `#1d4ed8` | Typical app chrome colour  |
| Brand Green | `#16a34a` |                            |
| Warm Tan    | `#d4a574` |                            |
| Hot Pink    | `#db2777` |                            |

Behaviour:

- Clicking a swatch applies a `data-bg` attribute on a parent wrapper element (e.g. `<div id="preview-root" data-bg="#ffffff">`).
- All `IconPreview` cells observe this attribute (via a delegated JS listener or CSS custom property) and update their background accordingly.
- The active swatch is visually indicated (e.g. ring or border).
- Implement with a small `<script>` block in the component using `document.querySelectorAll` — no framework reactivity needed.

### `IconGrid.astro`

Props:

```typescript
interface Props {
	icon: IconEntry;
}
```

Renders:

- A section heading showing `icon.label`.
- A horizontally scrollable (or wrapping) grid of `IconPreview` cells.
- **Sizes to render** (one cell per size):

| Label | px  |
| ----- | --- |
| 16    | 16  |
| 32    | 32  |
| 48    | 48  |
| 64    | 64  |
| 128   | 128 |
| 256   | 256 |
| 512   | 512 |

Each cell also shows the pixel size as a label below the icon.

### `IconPreview.astro`

Props:

```typescript
interface Props {
	svgCode: string;
	size: number; // pixel dimension (width = height)
	bgColor?: string; // initial bg color; runtime updates handled by BgSelector JS
}
```

Renders:

- A `<div>` with:
    - `width` and `height` set to `size` px via inline style
    - Background colour set via a CSS custom property (e.g. `--preview-bg`) so the JS can update it centrally
    - The SVG injected **directly as inner HTML** (not as an `<img>` src) so that SVG features like `currentColor`, CSS variables, and filters render correctly
    - The SVG element itself should have `width="100%"` and `height="100%"` applied (override whatever the raw code has) so it fills the container
- The size label (`16px`, `32px`, etc.) as a `<span>` below the box.

**Security note**: SVGs are user-supplied and rendered as raw HTML. The spec does not require sanitisation (this is a local dev tool), but add a comment in the component noting this assumption.

### `ProjectCard.astro`

Props:

```typescript
interface Props {
	project: Project;
}
```

Renders a card linking to the project page, showing name, description, and the 32 × 32 thumbnail of the first icon.

---

## Routing

| URL                 | Page           |
| ------------------- | -------------- |
| `/`                 | `index.astro`  |
| `/projects/[slug]/` | `[slug].astro` |

Use `getStaticPaths()` in `[slug].astro` to generate one route per project defined in `projects.ts`.

---

## Styling Guidelines

- **Minimal, utilitarian aesthetic** appropriate for a developer tool. No decorative flourishes.
- CSS custom properties for spacing, border radius, and colour tokens defined in `global.css`.
- The background selector swatches should be circular (or square with rounded corners), roughly 28–32 px, with a visible border when selected.
- Icon cells should have a subtle border (1 px, neutral) so white icons on a white background are still visible before the user changes the bg.
- Font: system-ui stack is fine for a dev tool.
- Responsive: the icon grid should scroll horizontally on narrow viewports rather than wrapping to avoid layout disruption.
- Dark mode: not required.

---

## `astro.config.mjs`

```js
import { defineConfig } from "astro/config";

export default defineConfig({
	output: "static",
});
```

---

## `tsconfig.json`

Use Astro's recommended strict base:

```json
{
	"extends": "astro/tsconfigs/strict"
}
```

---

## Build & Dev Commands

Standard Astro:

- `npm run dev` — local dev server
- `npm run build` — production static build to `dist/`
- `npm run preview` — serve the built output

---

## Scope / Out of Scope

**In scope:**

- Defining icons via `projects.ts` by pasting SVG code
- Rendering icons at 7 fixed sizes
- Switching background colour across all previews simultaneously
- Static site, no server needed

**Out of scope (do not implement unless explicitly added later):**

- File upload UI for SVGs
- Live SVG code editor in the browser
- Saving/persisting changes
- Authentication
- Deployment configuration (Netlify, Vercel, etc.)
- Dark mode

---

## Acceptance Criteria

1. `npm run build` completes without errors for the example project data.
2. Index page lists all projects and shows a 32 px thumbnail for each.
3. Each project page renders all icons at all 7 sizes in a scrollable grid.
4. Clicking a background swatch updates all icon cells on the page simultaneously without a page reload.
5. The active swatch is visually distinct from inactive swatches.
6. SVG code with `currentColor`, inline `<style>`, and `<defs>` renders correctly (test with the example placeholder).
7. Adding a second project to `projects.ts` and rebuilding generates a new page at the expected URL with no other changes required.

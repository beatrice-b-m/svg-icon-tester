export interface IconEntry {
	/** Unique within the project, e.g. "v1", "rounded", "dark". */
	id: string;
	/** Display name shown as a heading above the icon's size grid. */
	label: string;
	/** Full raw <svg>…</svg> string. Rendered as innerHTML — see IconPreview. */
	svgCode: string;
}

export interface Project {
	/** URL-safe identifier; becomes the route /projects/[slug]. */
	slug: string;
	/** Display name shown on the index card and project page heading. */
	name: string;
	/** Optional short description shown on both the index and project pages. */
	description?: string;
	/** One or more SVG variants to compare side-by-side. */
	icons: IconEntry[];
}

/**
 * All projects available in the previewer.
 *
 * To add a new project: append a Project object to this array.
 * Rebuilding generates the page at /projects/[slug] automatically —
 * no other changes are required.
 */
export const projects: Project[] = [
	{
		slug: "molt",
		name: "Molt",
		description: "Icon styling test for Molt",
		icons: [
			{
				id: "rainbow-test",
				label: "Rainbow Test",
				svgCode: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56" stroke-linejoin="bevel">
<rect x="1" y="1" rx="12" height="54" width="54" fill="#091413"/>
<path d="M31.5 7.3 22 11.8l9.5 4.5" stroke="#d53e50" stroke-width="4.5" fill="none"/>
<path d="M11.8 20.8v-4.5a4.5 4.5 90 0 1 4.5-4.5h2.5" stroke="#f46c49" stroke-width="4.5" fill="none"/>
<path d="M11.8 32.5v-9" stroke="#fcad69" stroke-width="4.5" fill="none"/>
<path d="M20.8 44.2h-4.5a4.5 4.5 90 0 1-4.5-4.5v-4.5" stroke="#fddf92" stroke-width="4.5" fill="none"/>
<path d="M32.5 44.2h-9" stroke="#e4f49f" stroke-width="4.5" fill="none"/>
<path d="M44.2 35.2v4.5a4.5 4.5 90 0 1-4.5 4.5h-4.5" stroke="#a9dca8" stroke-width="4.5" fill="none"/>
<path d="M44.2 23.5v9" stroke="#64c1a6" stroke-width="4.5" fill="none"/>
<path d="M35.2 11.8h4.5a4.5 4.5 90 0 1 4.5 4.5v4.5" stroke="#3789ba" stroke-width="4.5" fill="none"/>
</svg>`,
			},
			{
				id: "palette-a",
				label: "Palette A",
				svgCode: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56" stroke-linejoin="bevel">
<rect x="1" y="1" rx="12" height="54" width="54" fill="#1e3d58"/>
<path d="M31.5 7.3 22 11.8l9.5 4.5" stroke="#e8eef1" stroke-width="4.5" fill="none"/>
<path d="M11.8 20.8v-4.5a4.5 4.5 90 0 1 4.5-4.5h2.5" stroke="#bfdff1" stroke-width="4.5" fill="none"/>
<path d="M11.8 32.5v-9" stroke="#abd7f1" stroke-width="4.5" fill="none"/>
<path d="M20.8 44.2h-4.5a4.5 4.5 90 0 1-4.5-4.5v-4.5" stroke="#96cff1" stroke-width="4.5" fill="none"/>
<path d="M32.5 44.2h-9" stroke="#6dc0f1" stroke-width="4.5" fill="none"/>
<path d="M44.2 35.2v4.5a4.5 4.5 90 0 1-4.5 4.5h-4.5" stroke="#6dc0f1" stroke-width="4.5" fill="none"/>
<path d="M44.2 23.5v9" stroke="#43b0f1" stroke-width="4.5" fill="none"/>
<path d="M35.2 11.8h4.5a4.5 4.5 90 0 1 4.5 4.5v4.5" stroke="#43b0f1" stroke-width="4.5" fill="none"/>
</svg>`,
			},
			{
				id: "palette-b",
				label: "Palette B",
				svgCode: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56" stroke-linejoin="bevel">
<rect x="1" y="1" rx="12" height="54" width="54" fill="#0a2d2e"/>
<path d="M31.5 7.3 22 11.8l9.5 4.5" stroke="#ffffff" stroke-width="4.5" fill="none"/>
<path d="M11.8 20.8v-4.5a4.5 4.5 90 0 1 4.5-4.5h2.5" stroke="#f7ebe7" stroke-width="4.5" fill="none"/>
<path d="M11.8 32.5v-9" stroke="#efd7cf" stroke-width="4.5" fill="none"/>
<path d="M20.8 44.2h-4.5a4.5 4.5 90 0 1-4.5-4.5v-4.5" stroke="#deae9f" stroke-width="4.5" fill="none"/>
<path d="M32.5 44.2h-9" stroke="#deae9f" stroke-width="4.5" fill="none"/>
<path d="M44.2 35.2v4.5a4.5 4.5 90 0 1-4.5 4.5h-4.5" stroke="#a49e97" stroke-width="4.5" fill="none"/>
<path d="M44.2 23.5v9" stroke="#a49e97" stroke-width="4.5" fill="none"/>
<path d="M35.2 11.8h4.5a4.5 4.5 90 0 1 4.5 4.5v4.5" stroke="#879693" stroke-width="4.5" fill="none"/>
</svg>`,
			},
			{
				id: "palette-b1",
				label: "Palette B (C Background)",
				svgCode: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56" stroke-linejoin="bevel">
<rect x="1" y="1" rx="12" height="54" width="54" fill="#00202e"/>
<path d="M31.5 7.3 22 11.8l9.5 4.5" stroke="#ffffff" stroke-width="4.5" fill="none"/>
<path d="M11.8 20.8v-4.5a4.5 4.5 90 0 1 4.5-4.5h2.5" stroke="#f7ebe7" stroke-width="4.5" fill="none"/>
<path d="M11.8 32.5v-9" stroke="#efd7cf" stroke-width="4.5" fill="none"/>
<path d="M20.8 44.2h-4.5a4.5 4.5 90 0 1-4.5-4.5v-4.5" stroke="#deae9f" stroke-width="4.5" fill="none"/>
<path d="M32.5 44.2h-9" stroke="#deae9f" stroke-width="4.5" fill="none"/>
<path d="M44.2 35.2v4.5a4.5 4.5 90 0 1-4.5 4.5h-4.5" stroke="#a49e97" stroke-width="4.5" fill="none"/>
<path d="M44.2 23.5v9" stroke="#a49e97" stroke-width="4.5" fill="none"/>
<path d="M35.2 11.8h4.5a4.5 4.5 90 0 1 4.5 4.5v4.5" stroke="#879693" stroke-width="4.5" fill="none"/>
</svg>`,
			},
			{
				id: "palette-c",
				label: "Palette C (Modified)",
				svgCode: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56" stroke-linejoin="bevel">
<rect x="1" y="1" rx="12" height="54" width="54" fill="#00202e"/>
<path d="M31.5 7.3 22 11.8l9.5 4.5" stroke="#FFD380" stroke-width="4.5" fill="none"/>
<path d="M11.8 20.8v-4.5a4.5 4.5 90 0 1 4.5-4.5h2.5" stroke="#FFC37C" stroke-width="4.5" fill="none"/>
<path d="M11.8 32.5v-9" stroke="#FFB377" stroke-width="4.5" fill="none"/>
<path d="M20.8 44.2h-4.5a4.5 4.5 90 0 1-4.5-4.5v-4.5" stroke="#FFA373" stroke-width="4.5" fill="none"/>
<path d="M32.5 44.2h-9" stroke="#FF936E" stroke-width="4.5" fill="none"/>
<path d="M44.2 35.2v4.5a4.5 4.5 90 0 1-4.5 4.5h-4.5" stroke="#FF836A" stroke-width="4.5" fill="none"/>
<path d="M44.2 23.5v9" stroke="#FF7365" stroke-width="4.5" fill="none"/>
<path d="M35.2 11.8h4.5a4.5 4.5 90 0 1 4.5 4.5v4.5" stroke="#FF6361" stroke-width="4.5" fill="none"/>
</svg>`,
			},
			{
				id: "palette-D",
				label: "Palette D (Modified)",
				svgCode: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56" stroke-linejoin="bevel">
<rect x="1" y="1" rx="12" height="54" width="54" fill="#291b3e"/>
<path d="M31.5 7.3 22 11.8l9.5 4.5" stroke="#b2d0b3" stroke-width="4.5" fill="none"/>
<path d="M11.8 20.8v-4.5a4.5 4.5 90 0 1 4.5-4.5h2.5" stroke="#b2d0b3" stroke-width="4.5" fill="none"/>
<path d="M11.8 32.5v-9" stroke="#90c6af" stroke-width="4.5" fill="none"/>
<path d="M20.8 44.2h-4.5a4.5 4.5 90 0 1-4.5-4.5v-4.5" stroke="#90c6af" stroke-width="4.5" fill="none"/>
<path d="M32.5 44.2h-9" stroke="#70bbac" stroke-width="4.5" fill="none"/>
<path d="M44.2 35.2v4.5a4.5 4.5 90 0 1-4.5 4.5h-4.5" stroke="#70bbac" stroke-width="4.5" fill="none"/>
<path d="M44.2 23.5v9" stroke="#6eaab2" stroke-width="4.5" fill="none"/>
<path d="M35.2 11.8h4.5a4.5 4.5 90 0 1 4.5 4.5v4.5" stroke="#6eaab2" stroke-width="4.5" fill="none"/>
</svg>`,
			},
		],
	},
];

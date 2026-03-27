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
	// Example — remove or replace before first use.
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

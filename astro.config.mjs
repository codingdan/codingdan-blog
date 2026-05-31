// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

// `site` is the canonical public URL — used for canonical tags, the sitemap,
// and the RSS feed. This is the custom domain attached to the Pages project.
// https://astro.build/config
export default defineConfig({
	site: 'https://blog.codingdan.com',
	integrations: [mdx(), sitemap()],
	markdown: {
		shikiConfig: {
			// A dark theme that pairs with the site's ink palette.
			theme: 'github-dark-default',
			wrap: true,
		},
	},
	fonts: [
		{
			// Display serif — characterful headings.
			provider: fontProviders.google(),
			name: 'Fraunces',
			cssVariable: '--font-display',
			fallbacks: ['Georgia', 'serif'],
			weights: [400, 500, 600, 700, 900],
			styles: ['normal', 'italic'],
		},
		{
			// Body sans — clean, modern reading.
			provider: fontProviders.google(),
			name: 'Geist',
			cssVariable: '--font-body',
			fallbacks: ['system-ui', 'sans-serif'],
			weights: [400, 500, 600, 700],
			styles: ['normal'],
		},
		{
			// Monospace — code blocks, kickers, metadata.
			provider: fontProviders.google(),
			name: 'Geist Mono',
			cssVariable: '--font-mono',
			fallbacks: ['ui-monospace', 'monospace'],
			weights: [400, 500, 600],
			styles: ['normal'],
		},
	],
});

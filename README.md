# codingdan

A personal blog — built with [Astro](https://astro.build/), styled by hand (dark, "ember terminal editorial" theme), and deployed to Cloudflare Pages.

## Stack

- **Astro** with content collections (typed Markdown/MDX frontmatter)
- **Fonts:** Fraunces (display) · Geist (body) · Geist Mono (code) — self-hosted via Astro's font pipeline
- **Syntax highlighting:** Shiki (`github-dark-default`)
- **RSS + sitemap** out of the box

## Develop

```sh
npm install
npm run dev      # http://localhost:4321
```

| Command           | Action                                      |
| ----------------- | ------------------------------------------- |
| `npm run dev`     | Start the local dev server                  |
| `npm run build`   | Build the production site to `./dist/`      |
| `npm run preview` | Preview the build locally                   |

## Writing a post

Drop a `.md` or `.mdx` file in `src/content/blog/`:

```md
---
title: 'Post title'
description: 'One-line summary used for SEO and the post list.'
pubDate: 'May 30 2026'
heroImage: '../../assets/your-image.jpg'   # optional
---

Write your post here.
```

`pubDate` is validated at build time, so a malformed date fails the build instead of shipping broken.

### Drafts

Add `draft: true` to a post's frontmatter to keep it **local-only**: it renders in `npm run dev` so you can preview it, but is excluded from the production build — no page, not in `/blog`, not in the RSS feed. Remove the line (or set `draft: false`) when you're ready to publish.

## Deploy — Cloudflare Pages

1. Push this repo to GitHub.
2. In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to Git**, pick this repo.
3. Build settings:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Deploy. Every push to `main` rebuilds; pull requests get preview URLs.

After the first deploy, update `site` in `astro.config.mjs` to your live URL (e.g. `https://codingdan-blog.pages.dev` or a custom domain) so canonical URLs, the sitemap, and the RSS feed are correct.

Caching and security headers are configured in [`public/_headers`](public/_headers).

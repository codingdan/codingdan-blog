---
title: 'How this blog is built'
description: 'Astro content collections, a hand-rolled dark theme, and a zero-config deploy to Cloudflare Pages.'
pubDate: 'May 30 2026'
heroImage: '../../assets/blog-placeholder-2.jpg'
draft: true # placeholder content — visible locally, hidden on the live site
---

As promised, here's the short tour of how `codingdan` is put together. The goals were boring on purpose: fast pages, no client-side JavaScript I don't need, and a writing flow that's just Markdown files in a folder.

## The stack

- **[Astro](https://astro.build/)** — ships zero JS by default, which is exactly right for a content site.
- **Content collections** — posts are Markdown/MDX with a typed frontmatter schema, so a typo in a date fails the build instead of the page.
- **Cloudflare Pages** — static output, global CDN, free tier that's hard to argue with.

## Content as data

Every post lives in `src/content/blog/` and is validated against a schema:

```ts
const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      heroImage: z.optional(image()),
    }),
});
```

Because `pubDate` is coerced to a real `Date`, sorting the archive is a one-liner and I never ship a post with a malformed date.

## The look

The theme is hand-written CSS — a deep ink background, a single ember accent, and a type pairing of *Fraunces* for headings against *Geist* for body text. Fonts are self-hosted and preloaded through Astro's built-in font pipeline, so there's no layout shift and no third-party request on page load.

> The best stack is the one that gets out of your way. For a blog, that means Markdown in, fast HTML out.

## Deploying

Cloudflare Pages points at the repo, runs `npm run build`, and serves the `dist/` folder. Push to `main`, wait about thirty seconds, done. I'll dig into the deploy specifics — caching headers, preview branches — another time.

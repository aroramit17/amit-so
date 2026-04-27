# CLAUDE.md — 1-page-portfolio template

This file is read by Claude Code (and any AI coding assistant) when working in this repo. It tells the assistant the rules of the project. If you fork this template and use Claude Code, this file will guide your AI assistant on how to keep the site clean and bot-readable.

---

## What this site is

A one-page personal site template for operators, builders, and job seekers. Built with [Astro](https://astro.build), deployed to Vercel, designed to be:

- **Bot-readable** — every page renders semantic HTML server-side. No JS-only content. LinkedIn previews, Google, ChatGPT, Claude, and Perplexity can all index the site.
- **Config-driven** — all personal content lives in `src/data/site.js`. The pages and components read from there.
- **Easy to fork** — drop your resume in, run a Claude Code prompt (`/populate-from-resume`), ship.

---

## Tech stack

- **[Astro](https://astro.build)** — static site generator. Renders semantic HTML at build time.
- **React islands** — interactive components (mind-map, sections, contact) hydrate on the client. Everything else is plain HTML.
- **Vanilla CSS** — no Tailwind, no design system. Stylesheets live in `src/styles/`.
- **Vercel** — recommended hosting. `vercel.json` enables `cleanUrls` so `/interview` works without `.html`.

### File layout

```
/
├── src/
│   ├── data/site.js            ← all personal content lives here
│   ├── pages/                  ← one file per route (index, interview, privacy, case-studies, webai-case-study)
│   ├── components/             ← Sections.jsx (homepage React island), CaseStudy.astro, FlowDiagram.astro
│   ├── layouts/BaseLayout.astro ← <head>, meta tags, JSON-LD slot
│   └── styles/                 ← per-page CSS
├── public/                     ← static assets (headshot, favicon, llms.txt, sitemap.xml, robots.txt, consent.js)
├── astro.config.mjs            ← `site` URL goes here
├── vercel.json                 ← cleanUrls + redirects
└── package.json
```

---

## The bot-readability rule

**All critical content must exist in the rendered HTML before any JavaScript runs.**

When a bot or crawler fetches a page, they don't run JS. If your hero copy lives only inside a React component that mounts on `useEffect`, AI crawlers see nothing.

This template uses **Astro pages with React islands**. Astro renders the React components to static HTML at build time, so the content is in the response body — and React then hydrates the interactivity on top.

When adding a new page or section:

- Use Astro components or `client:load` React islands. Both render server-side.
- ❌ Do not put core content inside `useEffect` that mounts after page load.
- ❌ Do not introduce a `<div id="root">` pattern that's empty until JS runs.

### Verifying bot-readability

```bash
npm run build
curl -s http://localhost:4321/your-page | grep -c "<h1\|<p\|<section"
```

If the count is near zero, the content is JS-rendered. Fix it before shipping.

---

## Rules for adding a new page

When creating a new page, do all of the following in the same change:

### 1. Create the Astro page

Add `src/pages/<slug>.astro`. Use existing pages (`interview.astro`, `privacy.astro`) as templates. Pages should:

- Import `BaseLayout` from `../layouts/BaseLayout.astro`
- Import `SITE_DATA` from `../data/site.js`
- Pass `title`, `description`, `canonical`, and `jsonLd` to `BaseLayout`
- Reference `SITE_DATA.domain`, `SITE_DATA.name`, `SITE_DATA.copyrightYear` instead of hardcoding

### 2. Update sitemap.xml

Add a `<url>` entry to `public/sitemap.xml`. Update `<lastmod>` when content changes.

### 3. Update llms.txt

Add the page to `public/llms.txt` so AI crawlers know about it.

### 4. Add JSON-LD structured data

Pick the most specific schema:
- Person homepage → `Person`
- Booking/contact → `ContactPage` + `Person`
- Long-form writeup → `Article`
- Index of writeups → `CollectionPage`

### 5. Internal link

Link to the new page from at least one existing page. Orphan pages don't get crawled.

### 6. Test

```bash
npm run build
curl -s http://localhost:4321/<slug> | grep -c "<h1\|<p\|<section"
```

---

## Content rules

- **All personal content lives in `src/data/site.js`.** When editing copy, edit that file. Do not hardcode names, dates, employers, or links inside `.astro` or `.jsx` files.
- **Never fabricate experience, metrics, or claims.** If you're populating this template from a resume and a number isn't there, leave it as a placeholder rather than inventing.
- **Voice should sound like a real person.** Direct, specific, builder-first. No marketing fluff.
- **Quantified claims should match source material** (resume, prior writeups). Honesty > inflation.

---

## Asset rules

- `public/headshot.png` — your portrait. Square, 1000×1000 PNG, < 500KB.
- `public/favicon.ico` (optional) — your site icon.
- `public/llms.txt`, `public/sitemap.xml`, `public/robots.txt` — keep your domain in these files in sync with `astro.config.mjs`'s `site` URL.

---

## Deployment

- Push to GitHub.
- Connect the repo on [vercel.com/new](https://vercel.com/new) — Astro is auto-detected.
- Add your custom domain in Vercel → Settings → Domains.
- Submit `https://yourdomain.com/sitemap.xml` to Google Search Console.

---

## Out of scope without asking

- Switching frameworks (Next.js, SvelteKit, etc.) — the bot-readability rule applies regardless, but don't refactor without checking with the owner.
- Changing the analytics provider — `consent.js` and the privacy page are wired to Microsoft Clarity. Swapping provider means updating both.
- Adding a backend — this is a static site. Forms, comments, etc. should use third-party tools (Cal.com, Typeform, Formspree) or Vercel serverless functions deliberately added.

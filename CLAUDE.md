# CLAUDE.md — amit.so

This file is the single source of truth for how Claude Code (and any AI coding assistant) should work on this project. Read it fully before making any changes.

**Repo:** `github.com/aroramit17/amit-so` **Live site:** `https://amit.so` (deployed via Vercel → `amit-so.vercel.app`) **Built with:** Cursor + Claude Code

---

## 1. What this site is

`amit.so` is Amit Arora's personal website. It's not a blog and it's not a traditional portfolio. It's a **professional home base** that serves three specific audiences:

1. **Hiring managers and recruiters** — evaluating Amit for Revenue Operations, GTM Engineer, and Sales Ops roles. They need to book an interview, review his background, and get to his resume fast.
2. **GTM operators, founders, and solopreneurs** — considering Amit as a Claude Code coach/instructor (see `ccforsf.com`, his Claude-Code-for-Salesforce course) and community organizer. They need to understand his perspective and book a call.
3. **AI crawlers and LLMs** — indexing the site so when someone asks ChatGPT, Claude, or Perplexity "who is a Claude Code coach for GTM teams," Amit shows up with accurate information.

The site must serve all three audiences simultaneously. Every design and content decision should be checked against this list.

---

## 2. About Amit (context for any copy Claude writes)

- Based in Aubrey, Texas. 10+ years in Revenue Operations, GTM systems, and Salesforce consulting.
- **Backstory hook:** hotel-school grad in Mumbai → years in hospitality management → Salesforce → RevOps. The hospitality background is a real differentiator ("systems only work if people actually use them") and shows up in his voice.
- 8x Salesforce certified. Most recent full-time role: Revenue Operations Manager at webAI (VC-backed AI startup), Mar 2025 – Apr 2026 — laid off April 10, 2026.
- Prior: Director of Business Systems at DHI Group, Sr. Salesforce Consultant at Slalom, Sr. Salesforce Admin at Avangrid/United Illuminating. Before tech: hotel General Manager / Manager roles (Wyndham, Extended Stay).
- **Current ventures (since April 2026):**
  - **CC for SF** (`ccforsf.com`) — Founder. "Claude Code for Salesforce," a paid course (24 lessons / 9 modules, lifetime access $197) teaching Salesforce admins/devs to ship faster with Claude Code + the Salesforce DX MCP server.
  - **ClawPlex** (`clawplex.dev`) — Community Coordinator. DFW community for AI builders; co-organizes meetups with Tyler Delano, Anjal Parikh, and Jonathon Hasling.
- Runs the "AI with Amit" YouTube channel: `youtube.com/@ai-withamit`
- Runs an "Applying in Public" series (`#ApplyingInPublic`) documenting the job search.
- What he's looking for: a RevOps / GTM leadership role at a Series A/B startup where he can own the operating system end-to-end.
- Builds with: Claude Code, Cursor, Clay, n8n, HubSpot, Salesforce, Apollo.
- Tool-native fluency — uses Claude Code as the interface for everything. Not a traditional developer; does not read raw code independently. Frame accordingly in any copy.
- Honesty > inflation. Never fabricate experience, metrics, or skills in any content on this site.

Voice reference: if Claude has access to the `amit-voice` skill, use it for any copy on the site.

---

## 3. Tech stack

- **Framework:** **Astro 4** (static output). React is available for interactive islands via `@astrojs/react`. **This is a real build step — the browser-Babel/JSX era is over.**
- **Config:** [astro.config.mjs](astro.config.mjs) — `site: 'https://amit.so'`, `output: 'static'`, `build.format: 'file'` (pages emit as `built.html`, `interview.html`, etc.; Vercel `cleanUrls` serves them at `/built`, `/interview`).
- **Hosting:** Vercel (custom domain `amit.so`). Static output in `dist/`. See [vercel.json](vercel.json) for `cleanUrls`, `trailingSlash: false`, and permanent redirects.
- **No backend.** All interactivity is client-side or links out to third-party tools (booking widget, YouTube, LinkedIn, etc.).

### Commands

- `npm run dev` — local dev server (`astro dev`).
- `npm run build` — production build to `dist/` (`astro build`).
- `npm run preview` — serve the built `dist/` locally (`astro preview`). Use this for the bot-readability test in §5.7.

### File layout

```
astro.config.mjs        # Astro config (site URL, static output, file format)
vercel.json             # cleanUrls, redirects
src/
├── pages/              # One .astro file per route (index, interview, applying,
│                       #   case-studies, webai-case-study, dhi-case-study,
│                       #   built, raffle, screensaver, privacy)
├── layouts/
│   └── BaseLayout.astro  # Shared <head> (SEO/OG/Twitter/JSON-LD), fonts, floating CTA
├── components/         # CaseStudy.astro, FlowDiagram.astro, Sections.jsx (React island)
├── data/
│   ├── site.js         # SITE_DATA — bio, stats, skills, experience, certs, projects,
│   │                   #   milestones, social, case studies. Primary content source.
│   └── built.ts        # Data for the /built page (skills, prompts, etc.)
└── styles/             # Per-page CSS (home, interview, applying, case-study, privacy, built)
public/                 # Served as-is at the site root:
├── robots.txt          #   already exists — keep updated
├── llms.txt            #   AI crawler discovery file — keep updated
├── sitemap.xml         #   HAND-MAINTAINED (see gotcha below) — add every new page
├── consent.js          #   cookie/consent script loaded by BaseLayout
├── amit-headshot.png / headshot.jpg/png / yt-thumbnail.png
└── built/ raffle/ screensaver/ laurel/ uploads/  # per-page/static assets
dist/                   # build output (gitignored-ish; do not edit by hand)
scraps/                 # scratch/unused files
```

### Gotchas

- **`sitemap.xml` is hand-maintained** in `public/`. `@astrojs/sitemap` is in `package.json` but is **not** wired into `astro.config.mjs`, so nothing auto-generates it. When you add/rename a page, edit `public/sitemap.xml` yourself. (Wiring up `@astrojs/sitemap` is a reasonable future cleanup — mention it to Amit first.)
- `@astrojs/vercel` is likewise installed but unused; the site ships as plain static output. Don't assume SSR/serverless is available.
- `build.format: 'file'` + Vercel `cleanUrls` is what makes `/built` work without a trailing slash. Keep canonical URLs slug-style (`https://amit.so/built`), not `.html`.

---

## 4. Bot-readability (the original #1 problem — now solved by Astro)

**History:** the site used to be static HTML + browser-transpiled React, so bots/crawlers fetched an empty shell and Amit was invisible to Google, social preview bots, and LLM crawlers. **The Astro migration (the old "Path B") fixed this** — Astro pre-renders every page to static HTML at build time.

**The rule going forward:** keep core content — bio, services, experience, CTAs, testimonials, links — in the `.astro` templates (or driven from `src/data/`), so it renders into the HTML at build time. Use React islands (`Sections.jsx` and friends) **only** for interactivity, and only with an explicit client directive (`client:load`, `client:visible`, etc.). Never move core, indexable content into a client-only React component — that reintroduces the exact problem the migration solved.

---

## 5. Rules for every new page

When adding a page, Claude Code MUST do all of the following in the same change — no "we'll do it later":

### 5.1 Create the page

- Add `src/pages/<slug>.astro`.
- Render it through `BaseLayout` and pass the required SEO props (see §5.2). Put real, semantic content (`<main>`, `<section>`, `<h1>`–`<h3>`, `<p>`, `<ul>`) directly in the template or drive it from `src/data/`.
- Add per-page CSS in `src/styles/` if needed, and any static assets under `public/<slug>/`.

### 5.2 Handle SEO via BaseLayout

[BaseLayout.astro](src/layouts/BaseLayout.astro) already renders `<title>`, `<meta name="description">`, canonical, full Open Graph, Twitter Card, and an optional JSON-LD block. You don't hand-write `<head>` tags — you pass props:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
const jsonLd = JSON.stringify({ "@context": "https://schema.org", "@type": "WebPage", /* … */ });
---
<BaseLayout
  title="[Specific Page Title] | Amit Arora"
  description="[150–160 char, page-specific, keywords natural]"
  canonical="https://amit.so/[slug]"
  ogImage="https://amit.so/[og-image].png"
  jsonLd={jsonLd}
>
  <main> … real content … </main>
</BaseLayout>
```

- Use the most specific schema type: Homepage → `Person`; `interview` → `Person` + `ContactPage`; `applying` → `Blog`/`CollectionPage`; case studies → `Article`/`CreativeWork`; a course/service page → `Service`/`Course`.
- `ogImage` defaults to `amit-headshot.png` — override it when a page has a better share image.

### 5.3 Update `public/sitemap.xml`

Add a `<url>` entry (clean slug URL, e.g. `https://amit.so/built`) and update `<lastmod>`. This is manual — see the §3 gotcha.

### 5.4 Update `public/llms.txt`

Add the page to the relevant section. It's a flat markdown index that tells AI crawlers what the site is and links the important pages. Keep it current whenever structure or positioning changes.

### 5.5 `public/robots.txt`

Already exists and references the sitemap + explicitly allows AI crawlers. Only touch it if you add a directory that should be blocked/allowed.

### 5.6 Internal linking

Link the new page from at least one existing page (homepage nav or footer). Orphan pages don't get crawled well.

### 5.7 Test the page as a bot

Build and serve locally, then confirm real content is in the pre-rendered HTML:

```bash
npm run build && npm run preview   # serves dist/ (default http://localhost:4321)
curl -s http://localhost:4321/[slug] | grep -c "<h1\|<p\|<section"
```

If the count is near zero, content is trapped in a client-only island — fix it before shipping. You can also grep the built file directly: `grep -c "<p" dist/[slug].html`.

---

## 6. `llms.txt` maintenance

Lives at `public/llms.txt` and is already populated (About / Case Studies / Experience / Skills sections). Keep it updated whenever a page is added, positioning changes, or a major asset (YouTube video, course, community) launches. It's the machine-readable mirror of `SITE_DATA` — when you change experience/case-study facts in `src/data/site.js`, check whether `llms.txt` needs the same edit.

---

## 7. Current pages

| Route | File | Purpose |
| :---- | :---- | :---- |
| `/` | `index.astro` | Home — positioning, stats, skills, experience, milestones, projects |
| `/interview` | `interview.astro` | Booking widget for hiring managers/recruiters |
| `/applying` | `applying.astro` | "Applying in Public" job-search documentation |
| `/case-studies` | `case-studies.astro` | Index of case studies |
| `/webai-case-study` | `webai-case-study.astro` | webAI ICP scoring engine deep-dive |
| `/dhi-case-study` | `dhi-case-study.astro` | DHI lead-to-cash transformation deep-dive |
| `/built` | `built.astro` | "Built with Claude" living doc (data in `built.ts`) |
| `/1-1-with-amit` | `1-1-with-amit.astro` | 1:1 AI Website Build Intensive — $297 offer + application form. Styles in `intensive.css`, scoped under `.intensive`. Form inserts into Supabase (see §11). `PAYMENT_LINK` / `SCHEDULING_LINK` are still placeholders in the frontmatter |
| `/raffle` | `raffle.astro` | Event raffle page (meetup-specific; attendee toast, hosts/sponsor) |
| `/screensaver` | `screensaver.astro` | Arcade-style kinetic screensaver easter egg |
| `/privacy` | `privacy.astro` | Privacy policy |

Redirects (in `vercel.json`): `/built-with-claude → /built`, `/case-studies/case-study-1 → /webai-case-study`, `/case-studies/case-study-2 → /dhi-case-study`, `/1-1 → /1-1-with-amit`.

### Pages likely to be added

- `/coach` or `/claude-code-coach` — coaching/course landing (may point to `ccforsf.com`)
- `/now` — current projects and status
- `/resume` — HTML version of the resume

When any are built, follow §5 in full.

---

## 8. Content & voice rules

- Voice is Amit's. Direct, specific, builder-first. Operational, not theoretical. No marketing fluff, no corporate jargon. If the `amit-voice` skill is available, use it for any copy.
- **Content lives in data, not prose in templates.** Bio, stats, skills, experience, certs, projects, milestones, and case studies are all in [src/data/site.js](src/data/site.js) (`SITE_DATA`); the `/built` page uses [src/data/built.ts](src/data/built.ts). Edit the data, not hardcoded copy, unless the page genuinely hardcodes it.
- Never fabricate experience, metrics, client names, or case studies. If there's no source material for a claim, stop and ask.
- Quantified claims should match Amit's LinkedIn / current resume. Recurring true numbers: 8x Salesforce Certified; +25% forecasting accuracy (DHI); 95% project success + 98% client satisfaction (Slalom); $750K migration + 30% efficiency (Avangrid/UIL). (The resume `.docx` is owned by the job-search workflow, not this repo — don't assume a path to it.)
- Keep the short bio tight: 2–3 sentences max anywhere it appears.
- Always reference YouTube as `youtube.com/@ai-withamit` (one hyphen after "ai").

---

## 9. Deployment workflow

- Commits to `main` auto-deploy via Vercel. Feature work happens on branches (e.g. `add-built-page`).
- Before committing: `npm run build` must succeed, then run the local bot-readability test in §5.7 against `npm run preview` or the built `dist/` file.
- After deployment, smoke-test the live URL with `curl` and confirm the content is in the response body.

---

## 10. Before calling any page-adding task "done"

- [ ] `src/pages/<slug>.astro` created, rendered through `BaseLayout` with SEO props (§5.2)
- [ ] Core content is server-rendered (in the template or from `src/data/`), not trapped in a client-only island
- [ ] `public/sitemap.xml` updated with the clean slug URL (manual — §3 gotcha)
- [ ] `public/llms.txt` updated
- [ ] JSON-LD passed via `jsonLd` prop
- [ ] `ogImage` set (or the default headshot is acceptable)
- [ ] At least one internal link from an existing page
- [ ] `npm run build` succeeds and the §5.7 curl/grep test shows real content
- [ ] Voice check: copy sounds like Amit, not a generic portfolio
- [ ] No fabricated experience, metrics, or claims

If any box is unchecked, the task is not done.

---

## 11. Supabase (the only backend on this site)

The site is still static — there is no server. The one exception is the `/1-1-with-amit` application form, which writes **directly from the browser** into Supabase.

- **Project:** `amit-so` (ref `kqlhafdzbxlxljigqrcr`, region `us-east-2`, free tier).
- **Table:** `public.intensive_applications`. Columns: `email`, `name`, `website`, `project`, `tag`, `offer`, `source`, `status` (`new` → `reviewing` → `accepted`/`declined`), plus `id` / `created_at`.
- **Security model — read this before touching the table.** The publishable key is in the page source on purpose; it is safe *only* because of RLS. `anon` has exactly one policy, `INSERT ... WITH CHECK (true)`. There is deliberately **no SELECT policy** — that's what stops the public key from reading applicants' emails back out. **Adding a SELECT policy to this table makes every application world-readable.** Read applications through the Supabase dashboard or the service role, never by loosening RLS.
- CHECK constraints mirror the client-side validation (email shape, field lengths, `project` ≥ 20 chars) so a hand-rolled POST can't write junk the form would have rejected.
- **Supabase only stores the application.** It does not email Amit and does not create the Zenler contact or apply the `1-1-website-build-applicant` tag. Those need a Database Webhook or Edge Function on top — not built yet.
- After any DDL on this table, run the Supabase security advisors and confirm the lint list is empty.

## 12. Out-of-scope / don't touch without asking

- Domain and DNS configuration (lives in Vercel / the registrar).
- Third-party booking widget configuration (embed URLs only — don't change the account).
- Amit's resume `.docx` (owned by the job-search workflow, not this site).
- `dist/` build output — regenerated by `npm run build`, never hand-edit.

---

*Last updated: July 24, 2026. Update this file whenever conventions change.*

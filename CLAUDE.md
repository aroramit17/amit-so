# CLAUDE.md — amit.so

This file is the single source of truth for how Claude Code (and any AI coding assistant) should work on this project. Read it fully before making any changes.

**Repo:** `github.com/aroramit17/amit-so` **Live site:** `https://amit.so` (Cloudflare Workers static assets, Worker `amit-so`) **Built with:** Cursor + Claude Code

---

## 1. What this site is

`amit.so` is Amit Arora's personal website. It's not a blog and it's not a traditional portfolio. It's a **professional home base** that serves three specific audiences:

1. **Hiring managers, recruiters, and GTM peers** — judging Amit's credibility as a GTM engineer and RevOps leader. They need proof of work (case studies, career history, verified numbers) and a fast way to get in touch. Amit is employed at Invoca and **not job-searching** — never write "hire me", "open to roles", or "book an interview" copy.
2. **GTM operators, founders, and solopreneurs** — considering Amit as a Claude Code coach/instructor (see `ccforsf.com`, his Claude-Code-for-Salesforce course), the 1:1 intensive, or ClawPlex. They need to understand his perspective and know which route fits: a 30-minute call, the course, the paid intensive, or the community.
3. **AI crawlers and LLMs** — indexing the site so when someone asks ChatGPT, Claude, or Perplexity "who is a Claude Code coach for GTM teams," Amit shows up with accurate information.

The site must serve all three audiences simultaneously. Every design and content decision should be checked against this list.

---

## 2. About Amit (context for any copy Claude writes)

- Based in **Prosper, Texas** (Dallas–Fort Worth). 10+ years in Revenue Operations, GTM systems, and Salesforce consulting.
- **Backstory hook:** hotel-school grad in Mumbai → years in hospitality management → Salesforce → RevOps. The hospitality background is a real differentiator ("systems only work if people actually use them") and shows up in his voice.
- 8x Salesforce certified.
- **Current role: Senior GTM AI Architect at Invoca (Aug 2026 – present)** — AI GTM systems & revenue operations: building AI-assisted GTM systems and workflows for the revenue team, and owning CPQ and deal desk operations.
- Previously **Fractional GTM Engineer at RevShoppe** (Jun – Oct 2026) for a B2B AI software client. The contract has ended; don't present it as current or advertise fractional availability.
- Prior: Revenue Operations Manager at webAI (VC-backed AI startup, Mar 2025 – Apr 2026); Director of Business Systems at DHI Group; Salesforce Consultant at Slalom; Sr. Salesforce Admin at Avangrid/United Illuminating. Before tech: hotel General Manager / Manager roles (Wyndham, Extended Stay).
- **Side ventures:**
  - **CC for SF** (`ccforsf.com`) — Founder. "Claude Code for Salesforce," a paid course (24 lessons / 9 modules, lifetime access $197 — confirmed on ccforsf.com Nov 11, 2026) teaching Salesforce admins/devs to ship faster with Claude Code + the Salesforce DX MCP server.
  - **ClawPlex** (`clawplex.dev`) — Community Coordinator. DFW community for AI builders; co-organizes meetups with Tyler Delano, Anjal Parikh, and Jonathon Hasling.
  - **1:1 AI Website Build Intensive** (`/1-1-with-amit`) — $297, 90-minute collaborative session booked and paid via Cal.com.
- Runs the "AI with Amit" YouTube channel: `youtube.com/@ai-withamit`
- "Applying in Public" (`#ApplyingInPublic`) is an **archived** April 2026 series about his job search; the search ended when he joined Invoca. Refer to it in the past tense only.
- Builds with: Claude Code, Cursor, Clay, n8n, HubSpot, Salesforce, Apollo.
- Tool-native fluency — uses Claude Code as the interface for everything. Not a traditional developer; does not read raw code independently. Frame accordingly in any copy.
- Honesty > inflation. Never fabricate experience, metrics, or skills in any content on this site.

Voice reference: if Claude has access to the `amit-voice` skill, use it for any copy on the site.

---

## 3. Tech stack

- **Framework:** **Astro 4** (static output). React is available for interactive islands via `@astrojs/react`. **This is a real build step — the browser-Babel/JSX era is over.**
- **Config:** [astro.config.mjs](astro.config.mjs) — `site: 'https://amit.so'`, `output: 'static'`, `build.format: 'file'` (pages emit as `built.html`, `interview.html`, etc.; Vercel `cleanUrls` serves them at `/built`, `/interview`).
- **Hosting:** Cloudflare Workers with static assets only (no Worker script), config in [wrangler.jsonc](wrangler.jsonc). Moving off Vercel in Nov 2026; until the DNS cutover is done, Vercel still serves production from `main` and `vercel.json` stays in the repo.
  - `assets.html_handling: "auto-trailing-slash"` serves `/built` from `built.html` and 307s `/built.html` and `/built/` to `/built` (the old Vercel `cleanUrls` + `trailingSlash: false`).
  - `assets.not_found_handling: "404-page"` serves `dist/404.html` (from `src/pages/404.astro`).
  - Path redirects live in [public/_redirects](public/_redirects); response headers (incl. 1-year immutable cache on `/_astro/*`) in [public/_headers](public/_headers). Both are copied into `dist/` and are not publicly served.
  - `www.amit.so → amit.so` is a Cloudflare **Redirect Rule** in the dashboard. `_redirects` can't match hostnames. `amit.so` (apex) is the canonical host.
  - DNS is on Cloudflare (registrar: Namecheap). The zone also holds Zoho mail records (MX, SPF, verification TXT). Never touch those when changing web records.
  - Wrangler is pinned in `devDependencies`. Its bundled runtime caps `compatibility_date` (4.155.0 → 2026-10-30); bump both together.
- **No backend.** All interactivity is client-side or links out to third-party tools (booking widget, YouTube, LinkedIn, etc.).

### Commands

- `npm run dev` — local dev server (`astro dev`).
- `npm run build` — production build to `dist/` (`astro build`).
- `npm run preview` — serve the built `dist/` locally (`astro preview`). Use this for the bot-readability test in §5.7.
- `npx wrangler dev` — serve `dist/` through Cloudflare's asset runtime locally. Use it to test redirects, headers, and 404 behavior.

### File layout

```
astro.config.mjs        # Astro config (site URL, static output, file format)
wrangler.jsonc          # Cloudflare Workers static-assets config
vercel.json             # legacy Vercel config — delete after the Cloudflare cutover
src/
├── pages/              # One .astro file per route (index, interview, applying,
│                       #   case-studies, webai-case-study, dhi-case-study,
│                       #   built, raffle, screensaver, privacy)
├── layouts/
│   └── BaseLayout.astro  # Shared <head> (SEO/OG/Twitter/JSON-LD), fonts, floating CTA
├── components/         # CaseStudy.astro, FlowDiagram.astro, HomeContent.astro (homepage body), SiteNav.astro
├── data/
│   ├── home.js         # Homepage presentation data (authority signals, current work, selected work)
│   ├── site.js         # SITE_DATA — bio, stats, skills, experience, certs, projects,
│   │                   #   milestones, social, case studies. Primary content source.
│   └── built.ts        # Data for the /built page (skills, prompts, etc.)
└── styles/             # Per-page CSS (home, interview, applying, case-study, privacy, built)
public/                 # Served as-is at the site root:
├── robots.txt          #   already exists — keep updated
├── llms.txt            #   AI crawler discovery file — keep updated
├── sitemap.xml         #   HAND-MAINTAINED (see gotcha below) — add every new page
├── _redirects / _headers  # Cloudflare path redirects + response headers
├── consent.js          #   cookie/consent script loaded by BaseLayout
├── amit-headshot.png / headshot.jpg/png / yt-thumbnail.png
└── built/ raffle/ screensaver/ laurel/ uploads/  # per-page/static assets
dist/                   # build output (gitignored-ish; do not edit by hand)
scraps/                 # scratch/unused files
```

### Gotchas

- **`sitemap.xml` is hand-maintained** in `public/`. `@astrojs/sitemap` is in `package.json` but is **not** wired into `astro.config.mjs`, so nothing auto-generates it. When you add/rename a page, edit `public/sitemap.xml` yourself. (Wiring up `@astrojs/sitemap` is a reasonable future cleanup — mention it to Amit first.)
- The site ships as plain static output. There's no SSR or serverless code; don't assume either is available.
- `build.format: 'file'` + Vercel `cleanUrls` is what makes `/built` work without a trailing slash. Keep canonical URLs slug-style (`https://amit.so/built`), not `.html`.

---

## 4. Bot-readability (the original #1 problem — now solved by Astro)

**History:** the site used to be static HTML + browser-transpiled React, so bots/crawlers fetched an empty shell and Amit was invisible to Google, social preview bots, and LLM crawlers. **The Astro migration (the old "Path B") fixed this** — Astro pre-renders every page to static HTML at build time.

**The rule going forward:** keep core content — bio, services, experience, CTAs, testimonials, links — in the `.astro` templates (or driven from `src/data/`), so it renders into the HTML at build time. Use React islands **only** for interactivity, and only with an explicit client directive (`client:load`, `client:visible`, etc.). Never move core, indexable content into a client-only React component — that reintroduces the exact problem the migration solved.

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
| `/` | `index.astro` | Home — positioning, verified numbers, case studies, current work, experience, skills, projects, contact routes. Body lives in `HomeContent.astro`, nav in `SiteNav.astro` |
| `/interview` | `interview.astro` | General **30-minute** call booking (Cal.com `amit-arora/interview-amit`, a 30-min event). Not a job-interview page; the URL is kept for link stability. Points paid-session seekers to `/1-1-with-amit` |
| `/applying` | `applying.astro` | **Archive** of the April 2026 "Applying in Public" series. Past tense only; no hiring CTA |
| `/case-studies` | `case-studies.astro` | Index of case studies |
| `/webai-case-study` | `webai-case-study.astro` | webAI ICP scoring engine deep-dive |
| `/dhi-case-study` | `dhi-case-study.astro` | DHI lead-to-cash transformation deep-dive |
| `/built` | `built.astro` | "Built with Claude" living doc (data in `built.ts`). Evergreen projects first; the May 15 2026 meetup agenda + sponsor live in a dated `#event-archive` section at the bottom |
| `/1-1-with-amit` | `1-1-with-amit.astro` | 1:1 AI Website Build Intensive — $297 offer + application form. Styles in `intensive.css`, scoped under `.intensive`. Booking + $297 payment via the Cal.com popup (`amit-arora/website-build-intensive`, element-click embed). No form on the page — the fallback for "is this a fit?" is `mailto:me@amit.so` |
| `/raffle` | `raffle.astro` | **Archive** of the May 15 2026 Claude in the Wild meetup. Raffle closed: entry form, QR/share steps, and attendee toast removed; hosts + sponsor kept |
| `/screensaver` | `screensaver.astro` | Arcade-style kinetic screensaver easter egg |
| `/privacy` | `privacy.astro` | Privacy policy |

Redirects (in `public/_redirects`, mirrored in `vercel.json` until cutover): `/built-with-claude → /built`, `/case-studies/case-study-1 → /webai-case-study`, `/case-studies/case-study-2 → /dhi-case-study`, `/1-1 → /1-1-with-amit`.

### Pages likely to be added

- `/coach` or `/claude-code-coach` — coaching/course landing (may point to `ccforsf.com`)
- `/now` — current projects and status
- `/explore` — the "playable workshop" redesign (see below)
- `/resume` — HTML version of the resume

When any are built, follow §5 in full.

### Redesign in progress: playable workshop

Amit's Nov 11 2026 requirements doc (`Amit_Website_Redesign_Requirements.docx`, not in the repo) specifies a retro arcade → 3D workshop experience (Three.js, stations for Build Lab / Systems Engine / Broadcast Booth / Meet Amit) layered on top of the existing HTML portfolio. Ground rules from that doc:

- The HTML portfolio stays complete and crawlable without the 3D engine. The workshop is an optional layer, never the only route to content or contact.
- Three.js loads only after the visitor chooses Explore. Respect `prefers-reduced-motion`, keep a Skip control, and keep a WebGL-unavailable fallback.
- Exhibits use synthetic data only. Never connect to real CRM or employer systems, and label demos and recordings honestly.
- Build on a preview branch first. Production `/` changes only after Amit approves the slice.

---

## 8. Content & voice rules

- Voice is Amit's. Direct, specific, builder-first. Operational, not theoretical. No marketing fluff, no corporate jargon. If the `amit-voice` skill is available, use it for any copy.
- **Content lives in data, not prose in templates.** Bio, stats, skills, experience, certs, projects, milestones, and case studies are all in [src/data/site.js](src/data/site.js) (`SITE_DATA`); the `/built` page uses [src/data/built.ts](src/data/built.ts). Edit the data, not hardcoded copy, unless the page genuinely hardcodes it.
- Never fabricate experience, metrics, client names, or case studies. If there's no source material for a claim, stop and ask.
- Quantified claims should match Amit's LinkedIn / current resume. Recurring true numbers: 8x Salesforce Certified; +25% forecasting accuracy (DHI); 95% project success + 98% client satisfaction (Slalom); $750K migration + 30% efficiency (Avangrid/UIL). (The resume `.docx` is owned by the job-search workflow, not this repo — don't assume a path to it.)
- Keep the short bio tight: 2–3 sentences max anywhere it appears.
- **Invoca stays role-level.** Show it as current work (AI GTM systems & revenue operations, CPQ and deal desk), with no internal metrics, project names, systems, vendors, or policy details unless Amit supplies an approved, publishable case study. Removed details must not be reintroduced in copy, `llms.txt`, JSON-LD, or this file.
- **Current status:** Amit is not job-searching. Location is Prosper, Texas. The booking call is 30 minutes. The 1:1 intensive is $297 / 90 minutes. Don't change prices or durations without Amit's approval.
- Past events get dated archive treatment. Never leave "Tonight", "Enter now", or live-sounding activity on an evergreen page.
- Always reference YouTube as `youtube.com/@ai-withamit` (one hyphen after "ai").

---

## 9. Deployment workflow

- Commits to `main` auto-deploy via Cloudflare Workers Builds (build `npm run build`, deploy `npx wrangler deploy`). Other branches get preview URLs. Feature work happens on branches (e.g. `add-built-page`). Until the cutover is finished, Vercel also deploys `main`.
- **Production must come from `main`.** On Oct 9 2026 the site was deployed via `vercel --prod` from a feature branch while `main` lagged, so the next push to `main` would have rolled the site back. Don't run a manual `wrangler deploy` from a branch. If you ever must, merge to `main` in the same session.
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

## 11. Supabase (currently unused)

**The site has no backend and, as of Aug 5 2026, nothing on it talks to Supabase.** The `/1-1-with-amit` application form was removed when booking and payment moved into the Cal.com popup, so the project below is dormant. It's documented because it still exists, not because anything depends on it.

- **Project:** `amit-so` (ref `kqlhafdzbxlxljigqrcr`, region `us-east-2`, free tier).
- **Table:** `public.intensive_applications` — holds the applications submitted while the form was live. Safe to drop if the form never comes back.
- **If you ever re-point a form at it:** the publishable key would ship in the page source, and that's safe *only* because of RLS. `anon` has exactly one policy, `INSERT ... WITH CHECK (true)`, and deliberately **no SELECT policy** — that's what stops a public key from reading applicants' emails back out. **Adding a SELECT policy makes every row world-readable.** Read rows through the dashboard or the service role, never by loosening RLS.
- `pg_net` is enabled for a notification trigger that was started and then removed. If you build it: the function is `net.http_post`, **not** `extensions.http_post` — the wrong schema fails silently inside the trigger's own exception handler. Keep credentials in Vault, never inline in a committed migration.
- After any DDL here, run the Supabase security advisors and confirm the lint list is empty.

## 12. Out-of-scope / don't touch without asking

- Domain and DNS configuration (Cloudflare zone; registrar Namecheap). Especially the Zoho mail records.
- Third-party booking widget configuration (embed URLs only — don't change the account).
- Amit's resume `.docx` (owned by the job-search workflow, not this site).
- `dist/` build output — regenerated by `npm run build`, never hand-edit.

---

*Last updated: November 11, 2026. Update this file whenever conventions change.*

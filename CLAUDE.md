# CLAUDE.md — amit.so

This file is the single source of truth for how Claude Code (and any AI coding assistant) should work on this project. Read it fully before making any changes.

**Repo:** `github.com/aroramit17/amit-so` **Live site:** `https://amit.so` (deployed via Vercel → `amit-so.vercel.app`) **Built with:** Cursor \+ Claude Code

---

## 1\. What this site is

`amit.so` is Amit Arora's personal website. It's not a blog and it's not a traditional portfolio. It's a **professional home base** that serves three specific audiences:

1. **Hiring managers and recruiters** — evaluating Amit for Revenue Operations, GTM Engineer, and Sales Ops roles. They need to book an interview, review his background, and get to his resume fast.  
2. **GTM operators, founders, and solopreneurs** — considering Amit as a Claude Code Coach to help them replace Clay / n8n / Zapier / Make stacks with Claude Code workflows. They need to understand his perspective and book a call.  
3. **AI crawlers and LLMs** — indexing the site so when someone asks ChatGPT, Claude, or Perplexity "who is a Claude Code coach for GTM teams," Amit shows up with accurate information.

The site must serve all three audiences simultaneously. Every design and content decision should be checked against this list.

---

## 2\. About Amit (context for any copy Claude writes)

- Based in Aubrey, Texas. 10+ years in Revenue Operations, GTM systems, and Salesforce consulting.  
- 8x Salesforce certified. Most recent role: Revenue Operations Manager at webAI (VC-backed AI startup) — laid off April 10, 2026\.  
- Prior: Director of Business Systems at DHI Group, Salesforce Consultant at Slalom, Sr. Salesforce Admin at Avangrid.  
- Runs the "AI with Amit" YouTube channel: `youtube.com/@ai-withamit`  
- Currently running an "Applying in Public" series documenting the job search.  
- Positioning as a **Claude Code Coach** — helps GTM teams replace automation stacks (Clay, n8n, Zapier, Make) with Claude Code workflows.  
- Builds with: Claude Code, Cursor, Clay, n8n, HubSpot, Salesforce.  
- Tool-native fluency — uses Claude Code as the interface for everything. Not a traditional developer; does not read raw code independently. Frame accordingly in any copy.  
- Honesty \> inflation. Never fabricate experience, metrics, or skills in any content on this site.

Voice reference: if Claude has access to the `amit-voice` skill, use it for any copy on the site.

---

## 3\. Tech stack

- **Frontend:** Static HTML files \+ React components loaded as `.jsx` via Babel standalone (client-side rendering).  
- **No build step** currently — JSX is transpiled in the browser.  
- **Hosting:** Vercel (custom domain `amit.so`, also accessible at `amit-so.vercel.app`).  
- **No backend.** All interactivity is client-side or links out to third-party tools (booking widget, YouTube, LinkedIn, etc.).

### Current file layout

/

├── index.html          \# Homepage

├── applying.html       \# "Applying in Public" page (job search journey)

├── interview.html      \# Interview booking page (for hiring managers/recruiters)

├── components.jsx      \# Shared React components

├── milestones.jsx      \# Milestones/timeline component

├── data.js             \# Site data (experience, projects, etc.)

├── llms.txt            \# AI crawler discovery file

├── headshot.jpg/png    \# Profile images

├── yt-thumbnail.png    \# YouTube thumbnail asset

├── scraps/             \# Scratch/unused files

└── uploads/            \# Uploaded assets

### Files that MUST exist (create if missing)

- `sitemap.xml` — list of every public page. **Currently missing — create it on the next change.**  
- `robots.txt` — tells crawlers what to index.  
- `llms.txt` — already exists. Keep updated.

---

## 4\. 🚨 The critical SEO / bot-readability problem

**Current state:** When a bot or crawler fetches `https://amit.so`, they receive an HTML shell with only the `<title>` tag populated. All the real content (bio, services, experience, links) is injected by React *after* the page loads. Bots don't run JavaScript. This means:

- **Google** may partially index via its rendering service, but unreliably.  
- **LinkedIn, Twitter, Facebook preview bots** see an empty page → broken social shares.  
- **LLM crawlers (OpenAI, Anthropic, Perplexity, Google-Extended)** see nothing → Amit is invisible in AI search.  
- **Recruiter ATS parsers** and email preview tools see nothing.

This is the \#1 priority to fix. Every page change must move the site closer to being bot-readable.

### The rule

**All critical content must exist in the raw HTML on page load, BEFORE any JavaScript runs.**

React can still be used for interactive components (animations, forms, filters), but the core content — bio, services, experience, CTAs, testimonials, links — must be hardcoded as semantic HTML in each `.html` file. React then enhances it, not replaces it.

### Two paths forward

**Path A — Pragmatic (do this now):** For every existing and new page, hardcode the visible content as proper semantic HTML inside the `.html` file. Use `<main>`, `<section>`, `<article>`, `<h1>`–`<h3>`, `<p>`, `<ul>`, etc. Let React components render alongside or on top of this content for interactivity. If a component is purely decorative or interactive, it's fine to keep it JS-only.

**Path B — Ideal (when there's time):** Migrate the site to **Astro** or **Next.js with SSG**. Astro is the cleaner fit — it renders static HTML at build time, ships zero JS by default, and supports React components as islands for interactive pieces. Tell Amit before starting this migration; it's a multi-session project.

Until Path B happens, follow Path A on every change.

---

## 5\. Rules for every new page

When creating a new page, Claude Code MUST do all of the following in the same change — no exceptions, no "we'll do it later":

### 5.1 Create the page file

- Add a new `<page-name>.html` file at the repo root.  
- Follow the structure in §5.2 below.

### 5.2 Required HTML structure for every page

\<\!DOCTYPE html\>

\<html lang="en"\>

\<head\>

  \<meta charset="UTF-8" /\>

  \<meta name="viewport" content="width=device-width, initial-scale=1.0" /\>

  \<\!-- Primary SEO \--\>

  \<title\>\[Specific Page Title\] | Amit Arora\</title\>

  \<meta name="description" content="\[150–160 char description, specific to this page, includes target keywords naturally\]" /\>

  \<link rel="canonical" href="https://amit.so/\[page-slug\]" /\>

  \<\!-- Open Graph (LinkedIn, Facebook) \--\>

  \<meta property="og:type" content="website" /\>

  \<meta property="og:url" content="https://amit.so/\[page-slug\]" /\>

  \<meta property="og:title" content="\[Specific Page Title\] | Amit Arora" /\>

  \<meta property="og:description" content="\[Same as meta description\]" /\>

  \<meta property="og:image" content="https://amit.so/\[og-image\].png" /\>

  \<meta property="og:image:width" content="1200" /\>

  \<meta property="og:image:height" content="630" /\>

  \<\!-- Twitter Card \--\>

  \<meta name="twitter:card" content="summary\_large\_image" /\>

  \<meta name="twitter:title" content="\[Specific Page Title\] | Amit Arora" /\>

  \<meta name="twitter:description" content="\[Same as meta description\]" /\>

  \<meta name="twitter:image" content="https://amit.so/\[og-image\].png" /\>

  \<\!-- Structured Data (JSON-LD) \--\>

  \<script type="application/ld+json"\>

    { /\* Person or WebPage schema — see §5.5 \*/ }

  \</script\>

  \<\!-- Styles & scripts (loaded after meta) \--\>

\</head\>

\<body\>

  \<main\>

    \<\!-- ⚠️ CRITICAL: Real, readable content goes HERE as semantic HTML.

         NOT inside a React mount point. The \<div id="root"\> pattern is

         forbidden for core content. \--\>

  \</main\>

\</body\>

\</html\>

### 5.3 Update `sitemap.xml`

Add a `<url>` entry for the new page. Update the `<lastmod>` date. If `sitemap.xml` does not exist yet, create it using the template in §6.

### 5.4 Update `robots.txt`

If `robots.txt` does not exist, create it using the template in §7. Ensure the sitemap is referenced there.

### 5.5 Update structured data

Every page gets a JSON-LD block in the `<head>`. Use the most specific schema type available:

- Homepage → `Person` schema for Amit.  
- `interview.html` → `Person` \+ `ContactPage` schema.  
- `applying.html` → `Blog` or `CollectionPage` depending on what it becomes.  
- Service pages (future: Claude Code Coach) → `Service` or `ProfessionalService` schema.

### 5.6 Update `llms.txt`

Add the new page to the relevant section. `llms.txt` is a flat markdown file that tells AI crawlers what the site is about and links to the most important pages. Keep it current whenever structure changes.

### 5.7 Internal linking

Link to the new page from at least one existing page (usually the homepage nav or footer). Orphan pages don't get crawled well.

### 5.8 Test the page as a bot

Before calling the page done, run:

curl \-s https://amit.so/\[page-slug\] | grep \-c "\<h1\\|\<p\\|\<section"

If the count is near zero, the content is JS-rendered and the page fails the rule. Fix it before shipping.

---

## 6\. `sitemap.xml` — create this now

Create `/sitemap.xml` at the repo root with this structure. Add every public page. Update `<lastmod>` when a page changes.

\<?xml version="1.0" encoding="UTF-8"?\>

\<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\>

  \<url\>

    \<loc\>https://amit.so/\</loc\>

    \<lastmod\>2026-04-18\</lastmod\>

    \<changefreq\>weekly\</changefreq\>

    \<priority\>1.0\</priority\>

  \</url\>

  \<url\>

    \<loc\>https://amit.so/interview\</loc\>

    \<lastmod\>2026-04-18\</lastmod\>

    \<changefreq\>monthly\</changefreq\>

    \<priority\>0.9\</priority\>

  \</url\>

  \<url\>

    \<loc\>https://amit.so/applying\</loc\>

    \<lastmod\>2026-04-18\</lastmod\>

    \<changefreq\>weekly\</changefreq\>

    \<priority\>0.8\</priority\>

  \</url\>

\</urlset\>

**Note on URLs:** Vercel serves `applying.html` at both `/applying.html` and `/applying`. Use the clean URL (`/applying`) in the sitemap — it's what gets shared and ranked.

After deploying, submit the sitemap to Google Search Console: `https://search.google.com/search-console`.

---

## 7\. `robots.txt` — create this now

Create `/robots.txt` at the repo root:

\# amit.so — robots.txt

User-agent: \*

Allow: /

\# Block scratch/private directories

Disallow: /scraps/

Disallow: /uploads/

\# Explicitly allow AI crawlers

User-agent: GPTBot

Allow: /

User-agent: ClaudeBot

Allow: /

User-agent: anthropic-ai

Allow: /

User-agent: PerplexityBot

Allow: /

User-agent: Google-Extended

Allow: /

User-agent: CCBot

Allow: /

Sitemap: https://amit.so/sitemap.xml

Amit's site benefits from being indexed by AI — it's part of the strategy. Do not block AI crawlers.

---

## 8\. `llms.txt` maintenance

The file already exists. Keep it updated using this structure:

\# Amit Arora

\> Revenue Operations leader, 8x Salesforce certified, and Claude Code Coach helping GTM teams replace automation stacks (Clay, n8n, Zapier) with Claude Code workflows.

\#\# About

\- \[Homepage\](https://amit.so/): Overview of Amit's work and positioning

\- \[Interview with Amit\](https://amit.so/interview): Book a call if you're hiring

\- \[Applying in Public\](https://amit.so/applying): Live job search documentation

\#\# Content

\- \[AI with Amit on YouTube\](https://youtube.com/@ai-withamit): Tutorials on AI agent workflows and Claude Code

\- \[LinkedIn\](https://linkedin.com/in/amit-arora17): Posts and Claude Code Coach content

\#\# Context

Amit was laid off from webAI on April 10, 2026\. He is simultaneously job searching for RevOps / GTM Engineer roles and building a Claude Code coaching practice.

Update this file whenever a new page is added, positioning changes, or a new major asset (YouTube video, LinkedIn series) launches.

---

## 9\. Current pages & what they do

| Page | Purpose | Primary audience | Key CTA |
| :---- | :---- | :---- | :---- |
| `/` (index.html) | Introduce Amit, show positioning, route to sub-pages | All three audiences | Book an interview / Learn about coaching |
| `/interview` (interview.html) | Booking widget for hiring managers and recruiters | Hiring managers | Book a 30-min call |
| `/applying` (applying.html) | Live documentation of the job search | Hiring managers \+ peer audience | Follow along / Reach out if hiring |

### Pages likely to be added

- `/coach` or `/claude-code-coach` — coaching services page and offer ladder  
- `/playbook` or `/migration` — the "Clay-to-Claude Code Migration Playbook" lead magnet landing page  
- `/now` — current projects and status (classic `/now` page convention)  
- `/resume` — HTML version of the resume (in addition to the downloadable `.docx`)

When any of these are built, follow §5 in full.

---

## 10\. Content & voice rules

- Voice is Amit's. Direct, specific, builder-first. No marketing fluff, no corporate jargon. If the `amit-voice` skill is available, use it for any copy.  
- Never fabricate experience, metrics, client names, or case studies. If Claude Code doesn't have source material for a claim, stop and ask.  
- Quantified claims should match what's in the current resume at `/mnt/project/Amit_Resume_Strategic_GTM_Consultant.docx`.  
- Keep the summary tight: 2–3 sentences max anywhere Amit's short bio appears.  
- Always reference YouTube as `youtube.com/@ai-withamit` (one hyphen after "ai").

---

## 11\. Deployment workflow

- Commits to `main` auto-deploy via Vercel.  
- Always test locally before committing when possible: serve the `.html` files with any static server and verify the bot-readability curl test in §5.8.  
- After deployment, smoke-test by fetching the new URL with `curl` and confirming the content is in the response body, not just the `<title>`.

---

## 12\. Checklist Claude Code must run before calling any page-adding task "done"

- [ ] New `.html` file created with full `<head>` meta per §5.2  
- [ ] Core content is in semantic HTML in the `<body>` (not JS-injected)  
- [ ] `sitemap.xml` updated (or created) with the new URL  
- [ ] `robots.txt` exists and references the sitemap  
- [ ] `llms.txt` updated with the new page  
- [ ] JSON-LD structured data included in `<head>`  
- [ ] Open Graph \+ Twitter Card meta tags present with a real image  
- [ ] At least one internal link from an existing page to the new page  
- [ ] `curl` test passes: the rendered HTML contains real content, not an empty shell  
- [ ] Voice check: copy sounds like Amit, not like a generic portfolio  
- [ ] No fabricated experience, metrics, or claims

If any box is unchecked, the task is not done.

---

## 13\. Out-of-scope / don't touch without asking

- Domain and DNS configuration (lives in Vercel / the registrar).  
- Third-party booking widget configuration (embed URLs only — don't change the account).  
- Amit's resume `.docx` file — that's owned by the job-search workflow, not this site.  
- Anything in `/mnt/project/` — those are read-only reference files.

---

*Last updated: April 18, 2026\. Update this file whenever conventions change.*  

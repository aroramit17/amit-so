# 1-page-portfolio

A one-page personal site template for operators, builders, and job seekers. Built with Astro. Bot-readable, SEO-ready, deploys to Vercel in one click.

The fast path: drop your resume in, run one Claude Code prompt, ship.

**Live example:** [amit.so](https://amit.so) — the site this template was extracted from.

---

## What you get

- **Hero** with portrait + headline + dual CTAs
- **About** with stats and tagline
- **Career mind-map** — animated SVG career timeline (radial on desktop, vertical on mobile)
- **Skills, Certifications, Projects** sections
- **Case study template** — long-form project writeups with interactive flow diagrams
- **Interview booking page** — embeddable Calendly widget for hiring managers
- **Privacy page** with consent-gated analytics (Microsoft Clarity wired in, off by default)
- **SEO + bot-readability done right** — semantic HTML server-rendered, JSON-LD structured data, sitemap.xml, robots.txt, llms.txt for AI crawlers, Open Graph + Twitter Card meta on every page

All content is centralized in a single config file. No hunting through pages.

---

## Tech stack

- [Astro](https://astro.build) — static site generator, zero JS by default
- React islands for interactive components (mind-map, sections)
- Vanilla CSS — no Tailwind, no design system to learn
- Deploys to [Vercel](https://vercel.com) (or anywhere that serves static files)

---

## Quick start

### Option 1: With Claude Code (recommended)

1. Click **Use this template** on GitHub → create your repo
2. Clone it locally
3. Drop your resume PDF/DOCX into `/input/resume.pdf`
4. Open the repo in [Claude Code](https://claude.com/claude-code) and run:
   ```
   /populate-from-resume
   ```
   Claude will read your resume and fill out `src/data/site.js` for you — bio, experience, skills, certifications, projects, social links.
5. Replace `public/headshot.png` with your own photo
6. Run `npm install && npm run dev` to preview
7. Deploy to Vercel — done

### Option 2: Edit by hand

1. Click **Use this template** → clone
2. Open `src/data/site.js` and replace the placeholder values with yours
3. Replace `public/headshot.png` with your portrait
4. Update `public/llms.txt`, `public/sitemap.xml`, and `public/robots.txt` with your domain
5. `npm install && npm run dev`
6. Deploy

---

## What to customize

| File | What lives here |
| --- | --- |
| `src/data/site.js` | Name, tagline, bio, stats, skills, experience, certifications, projects, milestones, social links, case studies |
| `public/headshot.png` | Your portrait |
| `public/llms.txt` | The bio-style summary AI crawlers (ChatGPT, Claude, Perplexity) read to understand who you are |
| `public/sitemap.xml` | Replace `example.com` with your domain |
| `public/robots.txt` | Replace the sitemap URL with your domain |
| `astro.config.mjs` | Set your `site` URL |
| `src/pages/interview.astro` | Replace the Calendly slug with your own booking link |
| `src/pages/privacy.astro` | Replace the contact email |

---

## Deploying to Vercel

1. Push your repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo
3. Vercel auto-detects Astro — accept defaults and deploy
4. Add your custom domain in Vercel → Settings → Domains
5. Submit `https://yourdomain.com/sitemap.xml` to [Google Search Console](https://search.google.com/search-console)

---

## Why this exists

Most personal-site templates either look generic, ship as React SPAs that AI crawlers can't read, or require a design system you don't want to learn. This one is opinionated:

- **Bot-readable first.** Every page is server-rendered HTML before a single line of JS runs. LinkedIn previews work. ChatGPT / Claude / Perplexity can index you.
- **One config file.** All your content in one place. No hunting through components.
- **Claude-Code-native.** The setup workflow assumes you have Claude Code and uses it to do the boring parts.

---

## License

MIT. Fork it, ship it, make it yours.

---

## Credits

Extracted from [amit.so](https://amit.so) by [Amit Arora](https://linkedin.com/in/amit-arora17). If you ship a site with this, [say hi on LinkedIn](https://linkedin.com/in/amit-arora17) — would love to see it.

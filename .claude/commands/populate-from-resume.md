---
description: Read a resume from /input and populate src/data/site.js
---

You are populating a 1-page personal site template from the user's resume. The template is config-driven — every personal detail (name, bio, experience, skills, certifications, projects, milestones, social links) lives in `src/data/site.js`.

## Steps

1. **Find the resume.** Look in `input/` for any of: `resume.pdf`, `resume.docx`, `resume.txt`, `resume.md`. If none exist, list the contents of `input/` and ask the user to drop a file there.

2. **Read the resume.** Use the Read tool on the file. PDFs and DOCX are supported by Claude Code natively.

3. **Read the current `src/data/site.js`.** Understand the schema: every field, every section. Pay attention to the comments — they explain what each field is for and any constraints (icon names for `heroMeta`, `co` matching between `milestones` and `careerBranches`, etc.).

4. **Plan the population.** Before editing, list out:
   - Name, location, contact email
   - Tagline (one sentence — propose 2 or 3 options for the user to pick from)
   - 3 about paragraphs (problem-the-audience-has → fluency → quantified track record)
   - 4 stats (years experience, certifications/credentials, biggest quantified outcome, industry/segment)
   - 6 skill cards
   - Experience entries (one per role)
   - Certifications
   - Projects (open source, content, side projects)
   - Career milestones for the mind-map
   - `careerBranches` — one branch per major employer/era. The `co` values must match milestones.
   - Social links (LinkedIn, YouTube, Medium, etc.)

5. **Confirm with the user before writing.** Especially:
   - Tagline (offer 2–3 options)
   - Domain (`example.com` placeholder needs a real value)
   - Cal.com booking link in the format `username/event-type`
   - Whether to keep or delete the webAI case study

6. **Edit `src/data/site.js`.** Use the Edit tool to make targeted replacements. Preserve all comments and structure.

7. **Update other files** that hold the domain or personal info:
   - `astro.config.mjs` → set `site` to `https://<their-domain>`
   - `public/sitemap.xml` → swap `example.com` for their domain (use `replace_all`)
   - `public/robots.txt` → swap `example.com` for their domain
   - `public/llms.txt` → rewrite with their bio, links, and a "Context" paragraph

8. **Remind the user about manual steps:**
   - Add their portrait at `public/headshot.png` (1000×1000 PNG, < 500KB)
   - Delete `public/headshot.png.PLACEHOLDER.md`
   - Rewrite or delete the webAI case study to use their own work
   - Run `npm install && npm run dev` to preview
   - Connect to Vercel and add their custom domain

## Rules

- **Never fabricate** experience, dates, employers, metrics, or skills. If the resume doesn't say it, don't write it.
- **Keep numbers honest.** If the resume says "improved efficiency by 30%", don't round to 35% or write "significantly improved."
- **Match the placeholder structure.** Don't rename fields, don't add new top-level keys without asking.
- **Prefer specific to vague.** "Stood up the RevOps function from scratch" beats "Led various initiatives."
- **Voice should sound like the user, not like a generic resume.** Active verbs. Short sentences. Builder-first.

After you finish, run `npm run build` to confirm the site still builds, then summarize what you populated and what manual steps the user still needs to take.

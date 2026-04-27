# Replace this with your portrait

Add a square portrait (recommended: 1000×1000 PNG, < 500KB) at:

```
public/headshot.png
```

Then delete this `.PLACEHOLDER.md` file.

The image is referenced by:
- `src/components/Sections.jsx` (hero portrait)
- `src/layouts/BaseLayout.astro` (default Open Graph image for social shares)
- `src/pages/index.astro`, `interview.astro`, `webai-case-study.astro` (JSON-LD `image`)

Until you add a real headshot, the site will show a broken image in the hero.

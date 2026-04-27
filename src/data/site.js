// ============================================================================
// site.js — your personal site config
// ----------------------------------------------------------------------------
// This is the only file you need to edit to make this template yours.
// Everything else (pages, components, styling) reads from here.
//
// Quick start:
//   1. Replace the placeholder values below with your own.
//   2. Replace public/headshot.png with your portrait.
//   3. Update astro.config.mjs `site` URL to your domain.
//   4. Update public/sitemap.xml, public/robots.txt, public/llms.txt with your domain.
//
// Or: drop your resume in /input/resume.pdf and run `/populate-from-resume`
// in Claude Code to have this file filled out for you.
// ============================================================================

const SITE_DATA = {
  // --- Basics ---------------------------------------------------------------
  name: "Jane Doe",
  domain: "example.com",
  tagline: "I help [target audience] solve [the specific problem you solve].",
  sub: "One-to-two sentence summary of what you do, who you help, and the credentials that back it up. Keep it specific and concrete.",
  location: "Your City, ST",
  contactEmail: "you@example.com",
  // Cal.com booking link in the format "username/event-type".
  // The /interview page embeds this. Leave blank to hide the embed.
  calLink: "your-handle/intro-call",
  copyrightYear: 2026,

  // --- Contact section copy ------------------------------------------------
  contactBlurb: "If your team needs someone to own [the work you do] end to end, book 15 minutes. No pitch, just a conversation about what you actually need.",

  // --- Interview / booking page copy ---------------------------------------
  interviewBadge: "Open to opportunities",
  interviewLede: "If you'd like to interview me, feel free to book a time below that works best for you. 15 minutes, no prep on your end — we'll talk about the role, you can ask anything about my background, and we'll see if it's a fit worth taking further.",
  interviewBody: [
    "Two-to-three sentences on your background, focus areas, and the kind of work you've shipped. Mention specific employers or programs that signal credibility for the role.",
    "One sentence on credentials, fluency with key tools, and any audience-building you do (newsletter, YouTube, talks). Keep it tight — the booking widget is the point of the page."
  ],

  // --- Hero badges (rendered next to the hero headline) -------------------
  // Each item is `{ icon, text }`. `icon` must be one of: "sparkle", "briefcase", "mapPin".
  heroMeta: [
    { icon: "sparkle",   text: "5× Certified" },
    { icon: "briefcase", text: "10+ yrs Experience" },
    { icon: "mapPin",    text: "Your City, ST" }
  ],

  // --- About paragraphs (rendered in the About section) ---------------------
  about: [
    "Lead paragraph: the problem your audience has, in their own words. State it specifically. This is the line that earns the next ten seconds of their attention.",
    "Middle paragraph: your fluency — the tools, methods, and domains you can move across. Make it concrete (named tools, named methodologies).",
    "Closing paragraph: track record. Two or three quantified wins from real work. Honest numbers beat round numbers."
  ],

  // --- Stat tiles below the hero -------------------------------------------
  stats: [
    { number: "10+", label: "Years of Experience" },
    { number: "5×", label: "Certified" },
    { number: "30%", label: "Quantified Outcome" },
    { number: "B2B", label: "Industry / Segment" }
  ],

  // --- Skill cards ---------------------------------------------------------
  skills: [
    {
      title: "Skill Area One",
      desc: "One-line description of the skill area and how it shows up in your work.",
      tags: ["Tag", "Tag", "Tag"]
    },
    {
      title: "Skill Area Two",
      desc: "One-line description.",
      tags: ["Tag", "Tag"]
    },
    {
      title: "Skill Area Three",
      desc: "One-line description.",
      tags: ["Tag", "Tag", "Tag"]
    },
    {
      title: "Skill Area Four",
      desc: "One-line description.",
      tags: ["Tag", "Tag"]
    },
    {
      title: "Skill Area Five",
      desc: "One-line description.",
      tags: ["Tag", "Tag", "Tag"]
    },
    {
      title: "Skill Area Six",
      desc: "One-line description.",
      tags: ["Tag", "Tag"]
    }
  ],

  // --- Experience timeline -------------------------------------------------
  // `co` is a short identifier (used for color coding); pick anything unique.
  // `color` controls the accent color in the timeline UI.
  experience: [
    {
      company: "Most Recent Employer",
      dates: "Mmm YYYY — Present",
      role: "Your Title",
      summary: "Two-to-three-sentence summary of what you owned, what you shipped, and the outcome. Lead with verbs and quantified results.",
      categories: [
        {
          name: "Category of Work",
          items: [
            "Specific accomplishment with a verb at the front and a number where possible.",
            "Another specific accomplishment.",
            "A third one — keep these to one line each."
          ]
        },
        {
          name: "Another Category",
          items: [
            "Specific accomplishment.",
            "Another specific accomplishment."
          ]
        }
      ],
      color: "#e8657a"
    },
    {
      company: "Previous Employer",
      dates: "Mmm YYYY — Mmm YYYY",
      role: "Your Title",
      summary: "Summary paragraph.",
      categories: [
        {
          name: "Category of Work",
          items: [
            "Specific accomplishment.",
            "Specific accomplishment."
          ]
        }
      ],
      color: "#9b87f5"
    },
    {
      company: "Earlier Employer",
      dates: "Mmm YYYY — Mmm YYYY",
      role: "Your Title",
      summary: "Summary paragraph.",
      categories: [
        {
          name: "Category of Work",
          items: [
            "Specific accomplishment."
          ]
        }
      ],
      color: "#5b9cf5"
    }
  ],

  // --- Certifications (just strings, rendered as a list) -------------------
  certifications: [
    "Certification One",
    "Certification Two",
    "Certification Three"
  ],

  // --- Projects / external work --------------------------------------------
  projects: [
    {
      title: "Project Name",
      type: "Type (e.g. YouTube Channel, Open Source, Side Project)",
      desc: "One-sentence description of what this is and why it matters.",
      link: "https://example.com/project"
    },
    {
      title: "Another Project",
      type: "Blog / Publication",
      desc: "One-sentence description.",
      link: "https://example.com/blog"
    }
  ],

  // --- Career mind-map milestones ------------------------------------------
  // Each milestone is a node in the radial career flow. `co` groups by employer
  // for color coding (use any short identifier — it just needs to be unique per group).
  milestones: [
    { title: "First Role Title", role: "Employer · Mmm YYYY", desc: "What this milestone represents in your career arc.", tags: ["Tag", "Tag"], co: "co1" },
    { title: "Notable Win or Promotion", role: "Employer · YYYY", desc: "What you shipped or achieved.", tags: ["Tag", "Tag"], co: "co1" },
    { title: "Job Change / Step Up", role: "Title · Mmm YYYY", desc: "Why this move mattered.", tags: ["Tag", "Tag"], co: "co2" },
    { title: "Achievement", role: "Employer · YYYY", desc: "Specific outcome.", tags: ["Tag", "Tag"], co: "co2" },
    { title: "Another Achievement", role: "Employer · YYYY", desc: "Specific outcome.", tags: ["Tag", "Tag"], co: "co2" },
    { title: "Most Recent Role", role: "Employer · Mmm YYYY", desc: "What you're doing now.", tags: ["Tag", "Tag"], co: "co3" },
    { title: "Current Outcome", role: "Employer · YYYY", desc: "Latest quantified result.", tags: ["Tag", "Tag"], co: "co3" }
  ],

  // --- Career mind-map branches -------------------------------------------
  // Each branch is one employer/era on the career mind-map. `co` must match
  // the `co` value used in your milestones above (so the milestone leaves
  // attach to the right branch). `pos` and `leafYs` control SVG layout —
  // `leafYs` should have one entry per milestone in that branch.
  careerBranches: [
    {
      co: "co1", label: "First Employer", range: "YYYY – YYYY",
      role: "Your Title", color: "#5bdb82",
      pos: { x: 225, y: 110 }, side: "left",
      leafYs: [50, 170]
    },
    {
      co: "co2", label: "Second Employer", range: "YYYY – YYYY",
      role: "Your Title", color: "#5b9cf5",
      pos: { x: 225, y: 450 }, side: "left",
      leafYs: [390, 450, 510]
    },
    {
      co: "co3", label: "Third Employer", range: "YYYY – Present",
      role: "Your Title", color: "#e8657a",
      pos: { x: 775, y: 280 }, side: "right",
      leafYs: [220, 280, 340]
    }
  ],

  // --- Social links --------------------------------------------------------
  social: {
    linkedin: "https://www.linkedin.com/in/your-handle/",
    youtube: "https://www.youtube.com/@your-channel",
    medium: "https://medium.com/@your-handle",
    dailyskill: "",
    email: "you@example.com"
  },

  // --- Case studies --------------------------------------------------------
  // The case study below is the actual webAI example from amit.so — left intact
  // as a reference for what a fully-populated case study looks like. To add
  // your own, copy this object, change the `slug`, and create a matching page
  // file at src/pages/<slug>.astro (use webai-case-study.astro as the template).
  caseStudies: [
    {
      slug: "webai-case-study",
      title: "Automated ICP scoring engine at webAI",
      tag: "Revenue Operations",
      blurb: "Inside the first six months at a VC-backed AI startup, stood up a closed-loop ICP scoring engine that enriches and routes every inbound lead automatically.",
      role: "Revenue Operations Manager",
      company: "webAI, Inc.",
      timeline: "First six months (Mar – Aug 2025)",
      stack: ["HubSpot", "Clay", "Apify", "Claude"],
      outcome: "Every inbound lead scored, enriched, and routed the same day.",
      context: [
        "webAI's inbound was arriving in HubSpot with almost no context. Sales was burning cycles on manual firmographic research and ICP judgment calls, and speed-to-first-touch was slipping as inbound volume grew.",
        "There was no standardized ICP rubric, which meant routing depended on tribal knowledge and lead quality couldn't be compared across reps or campaigns."
      ],
      flow: {
        title: "How data flowed",
        overview: "Every inbound lead rides the same loop: capture in HubSpot, enrich through Clay with Apify and Claude, write the enriched record back, score, route. Hover a tool to see its job.",
        nodes: [
          { id: "hubspot", label: "HubSpot",  role: "CRM of record. Captures every inbound lead, takes the enriched record back for ICP scoring, and routes to an AE or nurture.", x: 160, y: 230 },
          { id: "clay",    label: "Clay",     role: "Orchestration hub. Runs the enrichment waterfall and decides what each lead needs next.", x: 500, y: 230 },
          { id: "apify",   label: "Apify",    role: "Firmographic scraper. Pulls industry, company size, and intent signals on the organization.", x: 840, y: 120 },
          { id: "claude",  label: "Claude",   role: "AI cleanup. Normalizes company names, dedupes against existing HubSpot data, and resolves HQ location.", x: 840, y: 340 }
        ],
        edges: [
          { from: "hubspot", to: "clay",    label: "New lead",                                      curvature:  45 },
          { from: "clay",    to: "apify",   label: "Enrichment request",                            curvature:  35 },
          { from: "apify",   to: "clay",    label: "Firmographics",                                 curvature: -35 },
          { from: "clay",    to: "claude",  label: "Raw record",                                    curvature: -35 },
          { from: "claude",  to: "clay",    label: "Cleaned record",                                curvature:  35 },
          { from: "clay",    to: "hubspot", label: "Enriched writeback → ICP scoring and routing", curvature: -45 }
        ]
      },
      approachSteps: [
        { n: 1, title: "Capture", body: "New inbound lead lands in HubSpot CRM — whether via form, meeting booking, or API." },
        { n: 2, title: "Discover emails", body: "Lead is pushed into Clay, which runs a layered waterfall of email-discovery providers to surface verified contacts on the lead's organization." },
        { n: 3, title: "Add firmographic context", body: "Apify runs inside Clay to pull firmographic data — industry, size, intent signals, and related context — on top of the contact layer." },
        { n: 4, title: "AI cleanup with Claude", body: "Claude runs inside Clay to clean up the enriched record: normalize company names, deduplicate against existing HubSpot data, and reliably identify the headquarters location." },
        { n: 5, title: "Sync back", body: "The fully enriched record is written back to HubSpot, mapped to typed properties so downstream workflows can act on it." },
        { n: 6, title: "Score & route", body: "HubSpot workflow rules evaluate the enriched lead against the ICP rubric, assign an ICP tier, and auto-route in-fit leads to the right AE. Out-of-ICP leads route to nurture." }
      ],
      result: [
        "Consistent ICP application across every inbound lead, measurable speed-to-first-touch improvement, and a sales team that stopped doing the research work.",
        "The same enrichment layer became the source-of-truth for downstream outbound, reporting, and forecasting — one model, fed once, reused everywhere."
      ]
    }
  ]
};

export default SITE_DATA;

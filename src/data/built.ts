// Content source for /built — "Eight things I built with Claude"
// Add/edit sections by changing BUILT_SECTIONS. Bump BUILT_LAST_UPDATED on edit.

export type BuiltLink = { label: string; href: string };

// `visual` names the stylized mock the page renders to the right of the copy.
// The .astro file owns the markup for each visual.
export type BuiltVisual =
  | 'stack'
  | 'hotel'
  | 'portfolio'
  | 'extension'
  | 'cowork'
  | 'toolkit'
  | 'memory'
  | 'resources'
  | 'research';

export type BuiltSection = {
  id: string;
  num: string; // "01"
  navLabel: string; // for sticky nav
  pillLabel: string; // for hero pill row
  eyebrow: string; // "THE COURSE · CCFORSF.COM"
  // Title uses `<em>` to italicize the accent phrase in coral.
  titleHtml: string;
  paragraphs: string[];
  visual: BuiltVisual;
  // Layout: where the visual sits relative to the copy.
  visualSide: 'left' | 'right';
  stack?: string[];
  link?: BuiltLink;
  warning?: string; // small "fair warning" pill above the title
};

export const BUILT_LAST_UPDATED = '2026-05-14';

export type AgendaItem = {
  num: string;
  speaker: string;
  role: string;
  // Title italicizes one phrase via <em>
  titleHtml: string;
  blurbHtml: string;
  tags: string[];
  defaultOpen?: boolean;
};

export const AGENDA: AgendaItem[] = [
  {
    num: '01',
    speaker: 'Anjan',
    role: 'Opening · 15 min',
    titleHtml: 'Claude Cowork and <em>Markdown vs HTML.</em>',
    blurbHtml:
      "How Cowork changes the loop between you and the model — and why Markdown beats HTML as the contract between humans and LLMs for almost every workflow you'd reach for a frontend to build.",
    tags: ['Claude Cowork', 'Markdown', 'HTML', 'Workflow design'],
    defaultOpen: true,
  },
  {
    num: '02',
    speaker: 'Anjal',
    role: 'Builder · 15 min',
    titleHtml: 'Claude best practices, <em>shipping at agency speed.</em>',
    blurbHtml:
      "How a working web-dev agency wires Claude into the daily build — prompts that earn their keep, the guardrails that keep client work clean, and the practices that survive contact with a real Friday deadline.",
    tags: ['Agency workflow', 'Best practices', 'Web dev', 'Client work'],
  },
  {
    num: '03',
    speaker: 'Amit',
    role: 'Host · 25 min',
    titleHtml: 'Eight things I built with Claude — <em>walk-through.</em>',
    blurbHtml:
      "Everything on this page, live. A course, a hotel pipeline, a portfolio, a Chrome extension, a daily AI digest, a toolkit, three resources, and one experiment. Stack chips, proof of revenue, and the parts that broke first.",
    tags: ['ccforsf', 'Hotel AI', 'amit.so', 'BetterSkillsMD', 'Cowork', 'Toolkit'],
  },
];

export const BUILT_HERO_EYEBROW = 'Frisco · Plano · Claude Meetup · May 14, 2026';
export const BUILT_HERO_TITLE = 'Eight things<br />I built with <em>Claude.</em>';
export const BUILT_HERO_INTRO =
  "A course. A hotel pipeline. A portfolio. A Chrome extension. A daily AI digest. A toolkit of tactical wins. A resource list. And one experiment that will reorient how you think about Claude entirely.";

export const BUILT_CLOSING =
  "None of this is about Claude. It's about what one operator ships when the cost of building drops by an order of magnitude.";

export const BUILT_SECTIONS: BuiltSection[] = [
  {
    id: 'ccforsf',
    num: '01',
    navLabel: 'Course',
    pillLabel: '01 · ccforsf',
    eyebrow: 'The course · ccforsf.com',
    titleHtml: 'Teaching Salesforce admins to ship <em>without Agentforce.</em>',
    paragraphs: [
      "<strong>Claude Code for Salesforce Admins.</strong> A practical course showing admins how to build Flows, Apex, and validation rules from plain English. Pitched as the $97 alternative to a $125/user/month Agentforce license.",
      "The whole product runs on a five-tool chain. Built with <strong>Claude Code inside Cursor IDE</strong>, pushed to GitHub, deployed on Vercel. Course content lives on Systeme.io. Payments flow through ThriveCart. No CMS. No agency.",
    ],
    visual: 'stack',
    visualSide: 'right',
    stack: ['Claude Code', 'Cursor IDE', 'GitHub', 'Vercel', 'Systeme.io', 'ThriveCart'],
    link: { label: 'ccforsf.com', href: 'https://ccforsf.com' },
  },
  {
    id: 'hotel',
    num: '02',
    navLabel: 'Hotel',
    pillLabel: '02 · hotel ai',
    eyebrow: 'The client work · hotel AI',
    titleHtml: 'From <em>21 PDFs at 5am</em> to one dashboard at 6.',
    paragraphs: [
      "A hotel operator hired me to lead AI research and find cost savings across their operations. They have a long list of problems worth solving — this one was first up.",
      "Every night, 20+ audit PDFs hit the inbox from the property management system. Someone used to read all of them by hand. Now they get ingested automatically, parsed by Claude, and rolled into a single daily dashboard.",
      "Revenue, rooms sold, occupancy, ADR, RevPAR — the metrics hoteliers actually care about, surfaced before the GM's first coffee. Built on n8n with AgentMail handling intake and Claude doing the parsing.",
    ],
    visual: 'hotel',
    visualSide: 'left',
    stack: ['n8n', 'AgentMail', 'Claude Sonnet', 'Google Sheets'],
  },
  {
    id: 'amit-so',
    num: '03',
    navLabel: 'Amit.so',
    pillLabel: '03 · amit.so',
    eyebrow: 'The portfolio · amit.so',
    titleHtml: 'A portfolio that ships <em>like a product.</em>',
    paragraphs: [
      "<strong>amit.so</strong> — the personal site, built end to end with <strong>Claude Code + Cursor IDE</strong>. Hero, experience, skills, 8 Salesforce certifications, career timeline, side projects, contact. Everything someone hiring a strategic GTM consultant needs to see.",
      "One detail worth flagging: the animated hero header came from <a href=\"https://motionsites.ai\" target=\"_blank\" rel=\"noopener\" class=\"inline-link\">motionsites.ai</a> — a great example of borrowing a polished component instead of building from zero. Claude handled the rest.",
    ],
    visual: 'portfolio',
    visualSide: 'right',
    stack: ['Claude Code', 'Cursor IDE', 'motionsites.ai', 'Vercel'],
    link: { label: 'amit.so', href: 'https://amit.so' },
  },
  {
    id: 'extension',
    num: '04',
    navLabel: 'Extension',
    pillLabel: '04 · betterskillsmd',
    eyebrow: 'The Chrome extension · BetterSkillsMD',
    titleHtml: 'Screenshot any page. Get a <em>design.md</em> for your LLM.',
    paragraphs: [
      "<strong>BetterSkillsMD</strong> fixes the part of vibe-coding that breaks: describing UIs to your LLM. You lose hex codes, spacing, type. You iterate five times. You burn tokens.",
      "Click the extension. Pick a capture mode — viewport, full page, drag a region, or click an element. GPT-4o vision reads the screenshot. A streaming <code>design.md</code> writes itself in the side panel. Copy. Paste into Claude. Ship.",
      "5 free captures, then $10 once. Bring your own OpenAI key — screenshots never touch my servers.",
    ],
    visual: 'extension',
    visualSide: 'left',
    stack: ['Chrome MV3', 'GPT-4o vision', 'BYOK', 'ExtensionPay', 'Stripe'],
    link: { label: 'betterskillsmd.com', href: 'https://betterskillsmd.com' },
  },
  {
    id: 'cowork',
    num: '05',
    navLabel: 'Cowork',
    pillLabel: '05 · cowork',
    eyebrow: 'The daily loop · Claude Cowork',
    titleHtml: 'Cowork is running <em>my morning routine.</em>',
    paragraphs: [
      "Two scheduled Cowork sessions, both fire before I'm out of bed.",
      "<strong>The Daily AI Feed.</strong> Cowork monitors my favorite X accounts — Claude, OpenAI, Gemini, Matthew Berman, Peter Steinberger, Tom Dörr, klöss, Alex Finn — pulls the day's signal, and lands a digest in my inbox at 5:42 am. I read it with coffee. No more doomscrolling.",
      "<strong>The ccforsf social engine.</strong> Cowork drafts <a href=\"https://ccforsf.com\" target=\"_blank\" rel=\"noopener\" class=\"inline-link\">three posts a day</a> promoting <a href=\"https://ccforsf.com\" target=\"_blank\" rel=\"noopener\" class=\"inline-link\">ccforsf.com</a> — different angles, different platforms. I review, schedule them through my scheduling tool, and they ship. Distribution on autopilot.",
    ],
    visual: 'cowork',
    visualSide: 'right',
    stack: ['Claude Cowork', 'Daily digest', '3 social posts/day', 'Auto-scheduled'],
  },
  {
    id: 'toolkit',
    num: '06',
    navLabel: 'Toolkit',
    pillLabel: '06 · toolkit',
    eyebrow: 'The toolkit · tactical wins',
    titleHtml: 'Four small things that are <em>punching way above their weight.</em>',
    paragraphs: [
      'The big builds get the airtime, but most of the leverage hides in tiny, well-placed wins. Here are four worth stealing.',
    ],
    visual: 'toolkit',
    visualSide: 'right',
  },
  {
    id: 'resources',
    num: '07',
    navLabel: 'Resources',
    pillLabel: '07 · resources',
    eyebrow: 'Take these home · resources for the room',
    titleHtml: 'Three links that will <em>change how you build with Claude.</em>',
    paragraphs: [
      'These are the ones I actively use and recommend without caveats. Bookmark them tonight.',
    ],
    visual: 'resources',
    visualSide: 'right',
  },
  {
    id: 'future-self',
    num: '08',
    navLabel: 'Experiment',
    pillLabel: '08 · future self',
    eyebrow: 'The experiment · future self prompting',
    titleHtml: "The single most useful thing I've done with Claude <em>in two years.</em>",
    paragraphs: [
      "A Berkeley psychologist published a protocol called <strong>Future Self Prompting.</strong> The premise is simple. You write a letter to yourself from the version 10 years ahead — the one who already has what you're chasing today. Then you let that version do the talking.",
      "The research underneath it is real. UCLA's Hal Hershfield spent 15 years proving one thing: <strong>the more vividly you connect to your future self, the better every decision you make today gets.</strong> Money. Health. Relationships. Career.",
      "Six prompts. Run them in order. The first one took me 20 minutes to sit with. The second one is brutal — it shows you the version of yourself you'll become if nothing changes. The sixth one ended up taped to my monitor.",
    ],
    visual: 'research',
    visualSide: 'right',
    warning: '△ Fair warning — this will hit you',
  },
];

// Toolkit cards rendered inside section 06.
export const TOOLKIT_CARDS = [
  {
    eyebrow: 'Claude Code feature',
    title: '/goals — turn intent into checklists',
    body:
      "Type /goals in Claude Code, describe the outcome, and Claude breaks it into a tracked plan. Update Claude Code first or you won't see it.",
    code: 'npm install -g @anthropic-ai/claude-code@latest\n# then inside claude: /goals',
  },
  {
    eyebrow: 'Skill · QA',
    title: "Playwright as Claude's QA",
    body:
      "When I update ccforsf or build client sites, I attach the Playwright skill so Claude can browse its own output, run interactions, and confirm the page actually works before handing it back.",
    code: "# in claude: 'qa this page with playwright'",
  },
  {
    eyebrow: 'My own agent',
    title: 'Hermes on MiniMax 2.7',
    body:
      "Personal agent running on the $10/month MiniMax 2.7 token plan. Cheap, fast, and good enough for the long-running glue work I don't want eating Claude tokens.",
  },
  {
    eyebrow: '△ Warning · claude-mem',
    title: 'The 808 GB disaster',
    body:
      "Old claude-mem versions had a memory bloat bug — mine grew to over 800 GB before I noticed. If you installed it months ago, fix it today.",
    code: 'npx claude-mem@latest install',
    warn: true,
  },
];

export const TOOLKIT_BLOAT_FIX = {
  eyebrow: 'My fix for the bloat',
  titleHtml: 'Preserve the memory. <em>Stop the bloat.</em>',
  paragraphs: [
    "Even with the fix in place, I didn't want to trust the cleanup. So I built a daily automation: it reads the claude-mem JSON, converts every entry into an Obsidian note, then deletes the original JSON from the claude-mem folder.",
    'My memory survives in a format I actually own. My disk stays alive. Win-win.',
  ],
};

// Resource cards rendered inside section 07.
export const RESOURCE_CARDS = [
  {
    eyebrow: 'My default CLAUDE.md',
    title: 'Andrej Karpathy Skills',
    body:
      "Every new project I spin up starts with this CLAUDE.md. It encodes Karpathy's principles into a project-level system prompt — and the difference in output quality is immediate.",
    link: {
      label: 'github.com/multica-ai/andrej-karpathy-skills',
      href: 'https://github.com/multica-ai/andrej-karpathy-skills',
    },
  },
  {
    eyebrow: 'Agent orchestration',
    title: 'Paperclip',
    body:
      'The agent runtime behind DFW Dad Jokes and my 8-agent job search pipeline. AGENTS.md as the contract. Heartbeats, budgets, governance — built in.',
    link: { label: 'paperclip.ing', href: 'https://paperclip.ing' },
  },
  {
    eyebrow: 'Memory layer (with caveats)',
    title: 'claude-mem by thedotmack',
    body:
      "Persistent memory across Claude Code sessions. Critical fix: run `npx claude-mem@latest install` if you installed an old version. See chapter 06 for the disk bloat story.",
    link: { label: 'github.com/thedotmack/claude-mem', href: 'https://github.com/thedotmack/claude-mem' },
  },
];

// Future self prompts rendered as a list inside section 08 (kept for SEO depth).
export const FUTURE_SELF_PROMPTS = [
  {
    title: 'Gratitude / regret split',
    body:
      "Your 10-year future self names 3 things you're doing today they're grateful you didn't quit, and 3 they wish you'd stopped sooner.",
  },
  {
    title: 'The version you almost became',
    body:
      "Life at 45 if nothing changes. And the story you told yourself to make settling feel okay.",
  },
  {
    title: 'An ordinary Tuesday',
    body:
      "Wake to bed, your future self walks you through a regular day. Boring parts included. Especially the boring parts.",
  },
  {
    title: "The decision I'm stuck on",
    body:
      'Future self tells you what you chose, and what you would have lost on the other path.',
  },
  {
    title: 'The story I had to drop',
    body:
      "The piece of self-belief that's no longer true for the future version of you.",
  },
  {
    title: 'One sentence for the monitor',
    body:
      "The line you'll most need to hear on a day you want to quit. Tape it where you'll see it.",
  },
];

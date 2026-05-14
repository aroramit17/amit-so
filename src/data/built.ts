// Content source for /built — "Built with Claude" living doc.
// Add new sections by appending to BUILT_SECTIONS. Bump BUILT_LAST_UPDATED
// when you edit so the page's "Updated" stamp reflects the change.

export type BuiltLink = { label: string; href: string };

export type BuiltSection = {
  id: string;
  eyebrow: string;
  // Title uses `<em>` HTML to italicize one phrase for emphasis.
  titleHtml: string;
  navLabel: string;
  paragraphs: string[];
  // Optional ordered/numbered list rendered after paragraphs.
  list?: { title?: string; body?: string }[];
  // Optional small pill tags ("stack chips").
  stack?: string[];
  link?: BuiltLink;
  // Optional closing note rendered after stack/link.
  note?: string;
};

export const BUILT_LAST_UPDATED = '2026-05-14';

export const BUILT_INTRO =
  "A living doc of the work I've shipped with Claude across chat, Claude Code, Cowork, Artifacts, and MCP. I'll keep adding as new things ship.";

export const BUILT_CLOSING =
  "None of this is about Claude. It's about what one operator ships when the cost of building drops by an order of magnitude.";

export const BUILT_SECTIONS: BuiltSection[] = [
  {
    id: 'ccforsf',
    eyebrow: 'Course',
    titleHtml: 'ccforsf.com — the <em>$97 alternative</em> to Agentforce',
    navLabel: 'ccforsf.com',
    paragraphs: [
      "Claude Code for Salesforce Admins. The pitch is simple: Agentforce is $125 per user per month. This is $97 once. An admin who finishes the course walks away with the muscle to ship the same automations themselves.",
      "Built end to end on the same stack I teach in the course: Claude Code and Cursor for the work, GitHub for source, Vercel for the live site, Systeme.io for course hosting, ThriveCart for payments.",
    ],
    stack: ['Claude Code', 'Cursor', 'GitHub', 'Vercel', 'Systeme.io', 'ThriveCart'],
    link: { label: 'Visit ccforsf.com', href: 'https://ccforsf.com' },
  },
  {
    id: 'hotel-pipeline',
    eyebrow: 'Client work',
    titleHtml: 'Hotel AI Pipeline — <em>20+ nightly PDFs</em> into one dashboard',
    navLabel: 'Hotel AI Pipeline',
    paragraphs: [
      "A hotel operator hired me to lead their AI research and find cost savings. The first real problem on the table was the nightly audit: 20+ PDFs landing every night from the property management system, read by no one, useful to everyone.",
      "Now the pipeline runs itself. AgentMail picks up the email intake, Claude Sonnet parses the PDFs, the structured output writes straight into Google Sheets, and a daily dashboard surfaces revenue, rooms sold, occupancy, ADR, and RevPAR. The front desk reads a dashboard. Nobody opens a PDF.",
    ],
    stack: ['n8n', 'AgentMail', 'Claude Sonnet', 'Google Sheets'],
  },
  {
    id: 'amit-so',
    eyebrow: 'This site',
    titleHtml: 'amit.so — the doc <em>lives on the site</em> it describes',
    navLabel: 'amit.so',
    paragraphs: [
      "Built end to end with Claude Code and Cursor. No designer, no framework lock-in, no template marketplace. Astro for static output, React islands where things need to move, and a single content file when I want to add a page like this one.",
      "The animated hero is sourced from motionsites.ai, dropped in as a self-hosted video so it stays fast on mobile and works offline in the editor.",
      "Meta point: if you're reading this on amit.so, you're inside the artifact. The doc lives on the site it describes.",
    ],
    stack: ['Claude Code', 'Cursor', 'Astro', 'React', 'Vercel', 'motionsites.ai'],
  },
  {
    id: 'betterskillsmd',
    eyebrow: 'Chrome extension',
    titleHtml: 'BetterSkillsMD — <em>any web page</em> into a paste-ready design.md',
    navLabel: 'BetterSkillsMD',
    paragraphs: [
      "Screenshot any web page, get back a clean design.md you can paste straight into your LLM. The model behind it is GPT-4o vision. The API key stays in your browser — BYOK, no server in the middle.",
      "Four capture modes cover the cases that actually come up: viewport, full page, drag-a-region, and click-an-element. The first five captures are free. After that it's $10 once. No subscription.",
    ],
    stack: ['GPT-4o vision', 'Chrome MV3', 'BYOK'],
    link: { label: 'betterskillsmd.com', href: 'https://betterskillsmd.com' },
  },
  {
    id: 'cowork',
    eyebrow: 'Claude Cowork',
    titleHtml: 'The daily loop — <em>two scheduled sessions</em> that run before I wake up',
    navLabel: 'Claude Cowork',
    paragraphs: [
      "Cowork is the part of the stack I forget I'm running, which is the point.",
    ],
    list: [
      {
        title: 'Session 1 — Daily AI Feed',
        body:
          "Digest of the X accounts I actually want to hear from: Claude, OpenAI, Gemini, Matthew Berman, Peter Steinberger, Tom Dörr, klöss, Alex Finn. Lands in my inbox at 5:42am every day. I open it before coffee.",
      },
      {
        title: 'Session 2 — Social drafts for ccforsf',
        body:
          "Three posts a day promoting ccforsf.com, scheduled out through my scheduling tool. Cowork drafts, I approve, the queue stays full. No daily blank-page problem.",
      },
    ],
  },
  {
    id: 'toolkit',
    eyebrow: 'The toolkit',
    titleHtml: 'Tactical wins — <em>small tools</em> that pay back every week',
    navLabel: 'The Toolkit',
    paragraphs: [
      'A short list of the things in my setup that earn their keep.',
    ],
    list: [
      {
        title: '/goals in Claude Code',
        body:
          "Keeps a long task aligned with what I actually want. Update with npm install -g @anthropic-ai/claude-code@latest. Docs at code.claude.com/docs/en/goal.",
      },
      {
        title: 'Playwright skill',
        body:
          "Self-QA for the sites I touch. When I push to ccforsf or a client site, the agent drives a real browser, clicks the golden path, and tells me what broke before a visitor finds it.",
      },
      {
        title: 'Hermes — personal agent',
        body:
          "My always-on assistant running on the $10/month MiniMax 2.7 token plan. Cheap enough to let it think, smart enough to be useful.",
      },
      {
        title: 'claude-mem — with one caveat',
        body:
          "Old versions had a memory bloat bug. Mine grew the .db file to 808 GB on my Mac before I noticed. Fix is one line: npx claude-mem@latest install. My belt-and-suspenders fix: a daily automation exports the claude-mem JSON to Obsidian notes, then deletes the JSON. Memory preserved, disk not eaten alive.",
      },
    ],
  },
  {
    id: 'resources',
    eyebrow: 'Resources',
    titleHtml: 'Take these home — <em>three links</em> that shaped my setup',
    navLabel: 'Resources',
    paragraphs: [
      "The three external pieces that did the most for my workflow this year.",
    ],
    list: [
      {
        title: 'andrej-karpathy-skills',
        body:
          "github.com/multica-ai/andrej-karpathy-skills — my default CLAUDE.md for every new project. Drop it in, you start ahead.",
      },
      {
        title: 'paperclip.ing',
        body:
          "Agent orchestration runtime. Runs DFW Dad Jokes and the 8-agent pipeline driving my job search. If you have multiple agents that need to coordinate, this is where I'd start.",
      },
      {
        title: 'claude-mem',
        body:
          "github.com/thedotmack/claude-mem — persistent memory layer for Claude Code. Heads up on the disk bloat issue noted in The Toolkit. Run the latest installer and you're fine.",
      },
    ],
  },
  {
    id: 'future-self',
    eyebrow: 'The experiment',
    titleHtml: 'Future Self Prompting — the <em>Berkeley protocol</em>',
    navLabel: 'The Experiment',
    paragraphs: [
      "Surfaced by @sukh_saroy on X on May 6, 2026. It draws on 15 years of work from Hal Hershfield at UCLA Anderson on how vividly you can picture your future self.",
      "Six prompts, run in sequence, with the same chat. The thread does the work.",
    ],
    list: [
      {
        title: 'Gratitude / regret split',
        body:
          "Your 10-year future self names 3 things you're doing today they're grateful you didn't quit, and 3 things they wish you'd stopped sooner.",
      },
      {
        title: 'The version you almost became',
        body:
          "Life at 45 if nothing changes. And the story you told yourself to make settling feel okay.",
      },
      {
        title: 'An ordinary Tuesday',
        body:
          "Your future self walks you through a regular day, wake to bed. Boring parts included. Especially the boring parts.",
      },
      {
        title: "The decision I'm stuck on",
        body:
          "Future self tells you what you chose, and what you would have lost on the other path.",
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
    ],
    note: "Fair warning: this will get emotional. That's the point.",
  },
];

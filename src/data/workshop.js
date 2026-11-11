// Content for the /explore workshop (vertical slice).
// Every station is plain HTML first; the 3D scene is an optional layer on top.
// Only verified, already-published claims belong here — see CLAUDE.md §8.

import SITE_DATA from './site.js';

const webai = SITE_DATA.caseStudies.find((c) => c.slug === 'webai-case-study');
const dhi = SITE_DATA.caseStudies.find((c) => c.slug === 'dhi-case-study');

export const STATIONS = [
  {
    id: 'build-lab',
    name: 'Build Lab',
    accent: '#2763FF',
    kicker: 'Things I have shipped',
    summary:
      'Courses, tools, and experiments built with Claude Code. Each cartridge opens the real project, not a mock-up.',
    items: [
      {
        title: 'Claude Code for Salesforce',
        meta: 'Course · Live',
        body: '24 lessons that teach Salesforce admins and developers to ship Apex, LWCs, flows, and metadata with Claude Code and the Salesforce DX MCP server.',
        href: 'https://ccforsf.com',
        cta: 'Open the course',
      },
      {
        title: 'Built with Claude',
        meta: 'Living doc · Updated regularly',
        body: 'A course, a hotel AI pipeline, this site, a Chrome extension, a daily Cowork loop, and the toolkit behind them.',
        href: '/built',
        cta: 'Open the build log',
      },
    ],
    note: 'Playable project exhibits are planned for this station. Until they ship, every cartridge links to the real work.',
  },
  {
    id: 'systems-engine',
    name: 'Systems Engine',
    accent: '#8AE0C0',
    kicker: 'GTM systems, end to end',
    summary:
      'How leads get scored, routed, and turned into forecasts people trust. Two case studies, written up in full.',
    items: [
      {
        title: webai.title,
        meta: `${webai.company} · ${webai.tag}`,
        body: webai.outcome,
        href: `/${webai.slug}`,
        cta: 'Read the case study',
      },
      {
        title: dhi.title,
        meta: `${dhi.company} · ${dhi.tag}`,
        body: dhi.outcome,
        href: `/${dhi.slug}`,
        cta: 'Read the case study',
      },
    ],
    note: 'Planned: a synthetic lead you can route, break, rewind, and re-route. It will use invented records only, never a real CRM.',
  },
  {
    id: 'broadcast-booth',
    name: 'Broadcast Booth',
    accent: '#F07866',
    kicker: 'Teaching and community',
    summary: 'Where the building gets explained: videos, meetups, and the archive of past series.',
    items: [
      {
        title: 'AI with Amit',
        meta: 'YouTube',
        body: 'Practical walkthroughs of real AI workflows with Claude Code, Clay, n8n, and more.',
        href: SITE_DATA.social.youtube,
        cta: 'Watch on YouTube',
      },
      {
        title: 'ClawPlex',
        meta: 'DFW AI builder community',
        body: 'Hands-on meetups, build nights, and demos for people working with agents and automation.',
        href: 'https://clawplex.dev',
        cta: 'See upcoming meetups',
      },
      {
        title: 'Applying in Public',
        meta: 'Archived series · April 2026',
        body: 'The AI workflow I used to run a job search in public, kept up as a record.',
        href: '/applying',
        cta: 'Open the archive',
      },
    ],
  },
  {
    id: 'meet-amit',
    name: 'Meet Amit',
    accent: '#101C2D',
    kicker: 'Who runs the workshop',
    summary:
      'GTM engineer and RevOps leader with 10+ years across Salesforce, revenue operations, and AI GTM systems. Currently at Invoca, building AI GTM systems and owning CPQ and deal desk. Before revenue systems, I ran hotels.',
    items: [
      {
        title: 'Book a 30-minute call',
        meta: 'Revenue systems, GTM builds, Claude Code',
        body: 'Bring the messy version. We can figure out what the system needs next.',
        href: '/interview',
        cta: 'Pick a time',
      },
      {
        title: '1:1 AI Website Build Intensive',
        meta: '$297 · 90 minutes',
        body: 'A paid, collaborative working session focused on one website outcome.',
        href: '/1-1-with-amit',
        cta: 'See the intensive',
      },
      {
        title: 'Full portfolio',
        meta: 'Career, case studies, skills',
        body: 'The complete, readable version of everything in this workshop.',
        href: '/',
        cta: 'View my work',
      },
    ],
    contact: { email: SITE_DATA.social.email, linkedin: SITE_DATA.social.linkedin },
  },
];

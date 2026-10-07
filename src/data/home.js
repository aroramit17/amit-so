import SITE_DATA from './site.js';

export const authoritySignals = [
  { value: '+25%', label: 'Forecast accuracy', context: 'DHI Group' },
  { value: '98%', label: 'Client satisfaction', context: 'Slalom' },
  { value: '$750K', label: 'CRM migration led', context: 'Avangrid' },
  { value: '421', label: 'Accounts scored', context: 'Invoca · 0–8 fit scale' }
];

export const currentWork = [
  {
    number: '01', title: 'Invoca', role: 'AI GTM systems & revenue operations',
    copy: 'Building account intelligence and AI workflows grounded in real call data, alongside CPQ and deal desk ownership.',
    href: '#invoca'
  },
  {
    number: '02', title: 'CC for SF', role: 'Founder & Educator',
    copy: 'Teaching Salesforce professionals to ship Apex, LWCs, automation, and metadata with Claude Code while keeping review and control in their hands.',
    href: 'https://ccforsf.com'
  },
  {
    number: '03', title: 'ClawPlex', role: 'Community Coordinator',
    copy: 'Co-organizing hands-on DFW meetups for builders working with agents, Claude Code, n8n, Clay, and Cursor.',
    href: 'https://clawplex.dev'
  }
];

export const selectedWork = [
    {
      eyebrow: 'Invoca · AI account intelligence',
      title: 'Account scoring built around real buying signals',
      body: 'A Clay + Salesforce engine combining AI hiring maturity, buyer-persona coverage, and competitive presence across four segments.',
      outcome: '421 accounts scored. A two-pass credit approach designed for 11,000+ accounts.',
      href: '#invoca'
    },
    ...(SITE_DATA.caseStudies || []).map((item) => ({
      eyebrow: `${item.company} · ${item.tag}`,
      title: item.title,
      body: item.blurb,
      outcome: item.outcome,
      href: `/${item.slug}`
    }))
  ];

import SITE_DATA from './site.js';

export const authoritySignals = [
  { value: '+25%', label: 'Forecast accuracy', context: 'DHI Group' },
  { value: '98%', label: 'Client satisfaction', context: 'Slalom' },
  { value: '$750K', label: 'CRM migration led', context: 'Avangrid' },
  { value: '8×', label: 'Salesforce certified', context: 'Admin to Agentforce' }
];

export const currentWork = [
  {
    number: '01', title: 'Invoca', role: 'Senior GTM AI Architect',
    copy: 'Building AI-assisted GTM systems for the revenue team, alongside CPQ and deal desk ownership.',
    href: 'https://www.invoca.com'
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
    ...(SITE_DATA.caseStudies || []).map((item) => ({
      eyebrow: `${item.company} · ${item.tag}`,
      title: item.title,
      body: item.blurb,
      outcome: item.outcome,
      href: `/${item.slug}`
    }))
  ];

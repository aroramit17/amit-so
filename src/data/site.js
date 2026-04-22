const SITE_DATA = {
  name: "Amit Arora",
  tagline: "I build the GTM operating system your revenue team is missing.",
  sub: "10+ years designing Salesforce architecture, pipeline and forecasting frameworks, and AI-powered workflows — for Series A startups through public companies. 8× Salesforce Certified.",
  about: [
    "Your revenue data is in five places and nobody trusts the forecast. Your pipeline looks healthy on the dashboard but stalls in the board meeting. Sales, Marketing, CS, and Finance each have their own definition of a qualified deal. That is the work I come in and fix.",
    "Deep fluency across Salesforce, HubSpot, Clay, and the modern AI/automation stack — combined with the cross-functional program leadership to align Sales, Marketing, CS, and Finance around one GTM operating model.",
    "10+ years of track record: +25% forecasting accuracy at DHI Group, 98% client satisfaction across enterprise Salesforce delivery at Slalom, a $750K CRM migration at Avangrid, and the first RevOps function stood up from scratch at a VC-backed AI startup. Honest numbers that board meetings get run on."
  ],
  stats: [
    { number: "10+", label: "Years of Experience" },
    { number: "8×", label: "Salesforce Certified" },
    { number: "25%", label: "Forecast Accuracy Gain" },
    { number: "A – B", label: "Series A–B Startup Experience" }
  ],
  skills: [
    {
      title: "Program Strategy & Ownership",
      desc: "End-to-end program leadership, client objective alignment, structured delivery, and outcome accountability.",
      tags: ["Program Leadership", "Delivery", "Accountability"]
    },
    {
      title: "Executive Storytelling",
      desc: "Board-ready reporting, translating GTM and technical concepts into actionable direction for senior stakeholders.",
      tags: ["Board Reporting", "Data Viz", "Stakeholders"]
    },
    {
      title: "GTM Transformation",
      desc: "Sales process design, lifecycle stages, lead routing, pipeline and forecast frameworks, and deal velocity optimization.",
      tags: ["Pipeline", "Forecasting", "Lead Routing"]
    },
    {
      title: "Cross-Functional Collaboration",
      desc: "Aligning Sales, Marketing, CS, and Finance teams with stakeholder management across programs and accounts.",
      tags: ["Sales", "Marketing", "CS", "Finance"]
    },
    {
      title: "AI & Automation",
      desc: "Building and teaching real-world AI workflow automation with LLMs, AI agents, and modern automation platforms.",
      tags: ["Clay", "n8n", "Claude Code", "AI Agents"]
    },
    {
      title: "Revenue Technology",
      desc: "Deep expertise across the modern revenue tech stack powering GTM operations at scale.",
      tags: ["Salesforce", "HubSpot", "Apollo", "Tableau"]
    }
  ],
  experience: [
    {
      company: "webAI, Inc.",
      dates: "Mar 2025 — Apr 2026",
      role: "Revenue Operations Manager",
      summary: "Stood up the RevOps function from scratch at a VC-backed AI startup. Owned the HubSpot → Salesforce transition, built a closed-loop ICP scoring engine (HubSpot + Clay + Apify + Claude) that enriches and routes every inbound lead the same day, and designed the pipeline taxonomy, forecasting logic, and executive reporting that Sales and Finance now run on.",
      categories: [
        {
          name: "Revenue Operations & Automation",
          items: [
            "Designed custom NDA workflow in Salesforce integrating DocuSign and Slack, reducing legal turnaround time.",
            "Built end-to-end Salesforce automation (Flows + validation logic) to standardize opportunity naming and enforce pipeline hygiene.",
            "Created Slack-integrated workflows enabling real-time deal alerts and cross-functional visibility."
          ]
        },
        {
          name: "AI-Powered GTM Systems",
          items: [
            "Architected an AI-driven outbound engine leveraging Clay, n8n, Instantly, and HeyReach for multi-channel outreach at scale.",
            "Developed structured AI personalization frameworks (JSON-based) improving reply rates and outbound efficiency.",
            "Built AI-assisted research workflows within HubSpot for instant company insights."
          ]
        },
        {
          name: "Pipeline & Forecasting",
          items: [
            "Introduced new pipeline stage taxonomy (MQL → Qualified) and aligned reporting across Salesforce and Tableau.",
            "Built logic for identifying 'At-Risk' deals based on time-to-close and stage progression.",
            "Enhanced reporting with multi-stage segmentation for executive-level decision making."
          ]
        }
      ],
      color: "#e8657a"
    },
    {
      company: "DHI Group Inc",
      dates: "Oct 2021 — Jul 2024",
      role: "Director, Business Systems",
      summary: "Owned the full GTM tech stack (Salesforce, HubSpot, Clay) and led a Classic → Lightning migration while re-engineering the lead-to-cash process. Built pipeline and forecasting frameworks from scratch — +25% forecasting accuracy and the board dashboards leadership actually used.",
      categories: [
        {
          name: "GTM Tech Stack Ownership",
          items: [
            "Owned and managed the full revenue tech stack — Salesforce, HubSpot, and Clay — ensuring seamless data flow.",
            "Served as strategic bridge between business stakeholders and technical teams.",
            "Evaluated, selected, and integrated new tools into the GTM ecosystem."
          ]
        },
        {
          name: "Pipeline & Forecasting",
          items: [
            "Designed pipeline, forecasting, and lifecycle tracking frameworks from scratch, improving accuracy by 25%.",
            "Defined lead routing rules, lifecycle stages, and handoff protocols between Marketing, SDR, and Sales.",
            "Aligned compensation structures with lifecycle stages in partnership with Finance."
          ]
        },
        {
          name: "Executive Reporting",
          items: [
            "Built automated executive dashboards visualizing CAC, LTV, ARR, and funnel metrics.",
            "Supported executive business reviews and board reporting through data-backed storytelling.",
            "Improved cross-team alignment via shared KPI frameworks."
          ]
        }
      ],
      color: "#9b87f5"
    },
    {
      company: "Slalom LLC",
      dates: "May 2018 — Oct 2021",
      role: "Salesforce Consultant",
      summary: "Delivered enterprise Salesforce solutions in Financial Services — 98% client satisfaction, 95% project success rate, and Sales/Service/Community Cloud certifications earned on the job. Primary client point of contact on multi-cloud programs.",
      categories: [
        {
          name: "Enterprise Delivery",
          items: [
            "Led cross-functional teams to a 95% project success rate and 98% client satisfaction rating.",
            "Became primary client point of contact, building trusted executive relationships in Financial Services.",
            "Earned Sales Cloud, Service Cloud, and Community Cloud certifications."
          ]
        }
      ],
      color: "#5b9cf5"
    },
    {
      company: "Avangrid",
      dates: "Jun 2015 — May 2018",
      role: "Sr. Salesforce Administrator",
      summary: "Owned CRM operations across the energy portfolio. Led a $750K Salesforce migration for two gas corporations — +30% operational efficiency — and established the foundational admin practices the org still runs on.",
      categories: [
        {
          name: "CRM Operations",
          items: [
            "Led a $750K Salesforce migration for two gas corporations, enhancing operational efficiency by 30%.",
            "Took ownership of CRM operations across the energy portfolio.",
            "Established foundational Salesforce administration practices."
          ]
        }
      ],
      color: "#5bdb82"
    }
  ],
  certifications: [
    "Salesforce Administrator",
    "Advanced Administrator",
    "Sales Cloud Consultant",
    "Service Cloud Consultant",
    "Experience Cloud Consultant",
    "AI Associate",
    "Agentforce Specialist",
    "Salesforce Maps Accredited"
  ],
  projects: [
    {
      title: "AI with Amit",
      type: "YouTube Channel",
      desc: "Teaching SMBs and solopreneurs how to implement AI agent workflows using Clay, n8n, Claude Code, and more.",
      link: "https://www.youtube.com/@ai-withamit"
    },
    {
      title: "GPTcommands",
      type: "Blog / Publication",
      desc: "A Medium publication focused on real-world AI prompting, use-cases, and automation guides for non-developers.",
      link: "https://medium.com/gptcommands"
    },
    {
      title: "The Daily Skill",
      type: "AI Learning Platform",
      desc: "An AI-powered platform helping users build one new professional skill every day through bite-sized lessons.",
      link: "https://thedailyskill.com"
    },
    {
      title: "Job Tracker",
      type: "Open Source Tool",
      desc: "A personal job application tracker to organize the job search with status tracking and notes.",
      link: "https://github.com/aroramit17/job-tracker"
    }
  ],
  milestones: [
    { title: "Sr. Salesforce Administrator", role: "Avangrid · Jun 2015", desc: "Entered the Salesforce ecosystem at Avangrid, taking ownership of CRM operations for energy corporations.", tags: ["Salesforce", "Energy", "CRM"], co: "avangrid" },
    { title: "$750K Salesforce Migration", role: "Avangrid · 2016", desc: "Led a $750K Salesforce migration for two gas corporations, enhancing operational efficiency by 30%.", tags: ["Migration", "$750K", "30% Efficiency"], co: "avangrid" },
    { title: "Joined Slalom LLC", role: "Salesforce Consultant · May 2018", desc: "Moved into enterprise consulting at Slalom, delivering Salesforce solutions in Financial Services.", tags: ["Consulting", "Financial Services", "Enterprise"], co: "slalom" },
    { title: "Multi-Certification Year", role: "Slalom · 2019", desc: "Earned Sales Cloud, Service Cloud, and Community Cloud certifications — driving a 20% improvement in solution design.", tags: ["Sales Cloud", "Service Cloud", "Community Cloud"], co: "slalom" },
    { title: "98% Client Satisfaction", role: "Slalom · 2020", desc: "Led cross-functional teams to a 95% project success rate and 98% client satisfaction rating.", tags: ["98% CSAT", "95% Success", "Executive Trust"], co: "slalom" },
    { title: "Director, Business Systems", role: "DHI Group Inc · Oct 2021", desc: "Stepped into a leadership role owning the full GTM tech stack as a strategic program leader.", tags: ["Director", "GTM Stack", "Leadership"], co: "dhi" },
    { title: "25% Forecast Accuracy Boost", role: "DHI Group · 2022", desc: "Designed pipeline, forecasting, and lifecycle tracking frameworks from scratch. Improved accuracy by 25%.", tags: ["Forecasting", "Pipeline", "+25% Accuracy"], co: "dhi" },
    { title: "Board-Ready Dashboards", role: "DHI Group · 2023", desc: "Built automated executive dashboards visualizing CAC, LTV, ARR, and funnel metrics for board reporting.", tags: ["CAC", "LTV", "ARR", "Board Reports"], co: "dhi" },
    { title: "AI with Amit — YouTube", role: "Content Creator · 2024", desc: "Launched the 'AI with Amit' YouTube channel, teaching real-world AI agent workflows.", tags: ["YouTube", "AI Agents", "Content"], co: "content" },
    { title: "RevOps @ webAI", role: "webAI, Inc. · Mar 2025", desc: "Joined a VC-backed AI startup to stand up the RevOps function from scratch.", tags: ["Startup", "HubSpot → SF", "RevOps"], co: "webai" },
    { title: "AI-Powered GTM Engine", role: "webAI · 2025", desc: "Architected an AI-driven outbound engine using Clay, n8n, Instantly, and HeyReach.", tags: ["Clay", "n8n", "AI Outbound", "ICP"], co: "webai" },
    { title: "8x Salesforce Certified", role: "Agentforce + Maps · 2026", desc: "Reached 8× Salesforce Certified with Agentforce Specialist and Salesforce Maps credentials.", tags: ["Agentforce", "Maps", "8× Certified"], co: "webai" }
  ],
  social: {
    linkedin: "https://www.linkedin.com/in/amit-arora17/",
    youtube: "https://www.youtube.com/@ai-withamit",
    medium: "https://medium.com/gptcommands",
    dailyskill: "https://thedailyskill.com",
    email: "aroramit17@gmail.com"
  },
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
    },
    {
      slug: "dhi-case-study",
      title: "Lead-to-cash transformation at DHI Group",
      tag: "GTM Systems & Business Transformation",
      blurb: "Migrated Salesforce Classic to Lightning while re-engineering the full lead-to-cash process — pipeline taxonomy, forecasting, and automated opportunity renewals included.",
      role: "Director, Business Systems",
      company: "DHI Group Inc.",
      timeline: "2021 – 2024",
      stack: ["Salesforce (Classic → Lightning)", "End-to-end process mapping", "Process improvement"],
      outcome: "+25% forecasting accuracy, automated renewals, board-ready dashboards.",
      context: [
        "DHI was operating on legacy Salesforce Classic with weak pipeline hygiene, manual renewals, and forecast numbers that Sales and Finance couldn't trust. The UI was due to be sunsetted, but the real opportunity was rebuilding the business processes underneath — not just flipping a UI switch.",
        "The mandate was simple: do both at once. Migrate to Lightning and take the org through a single, structured change instead of two."
      ],
      flow: {
        title: "How the transformation flowed",
        overview: "One sequenced motion — listen to the org, reshape the process on paper, then lift Classic into Lightning with the new model built in. Hover a stage to see what it meant.",
        nodes: [
          { id: "interviews", label: "Interviews",           role: "Structured conversations across Sales, Marketing, CS, and Finance to surface the real process and the top pain points.",     x: 150, y: 130, width: 180 },
          { id: "mapping",    label: "Process Map",          role: "Current-state and future-state maps of the lead-to-cash flow, tightened for CRM rigor and the controls leadership wanted.",   x: 500, y: 130, width: 180 },
          { id: "migration",  label: "Lightning Migration",  role: "Salesforce Classic → Lightning cutover carrying the new process model in the same move — one change event for the org, not two.", x: 850, y: 130, width: 210 },
          { id: "pipeline",   label: "Pipeline Taxonomy",    role: "Rebuilt pipeline stages, lead routing, lifecycle definitions, and the SDR → AE handoff criteria.",                             x: 850, y: 340, width: 210 },
          { id: "renewals",   label: "Renewal Automation",   role: "Opportunity-renewal automation enforcing consistent revenue recognition across the renewal book.",                             x: 500, y: 340, width: 200 },
          { id: "dashboards", label: "Board Dashboards",     role: "Executive dashboards — CAC, LTV, ARR, funnel — pulling from the new pipeline stage model.",                                    x: 150, y: 340, width: 180 }
        ],
        edges: [
          { from: "interviews", to: "mapping",    label: "Findings",            curvature: 0 },
          { from: "mapping",    to: "migration",  label: "Future-state design", curvature: 0 },
          { from: "migration",  to: "pipeline",   label: "New structure",       curvature: 0 },
          { from: "pipeline",   to: "renewals",   label: "Cleaner stages",      curvature: 0 },
          { from: "renewals",   to: "dashboards", label: "Trusted numbers",     curvature: 0 }
        ]
      },
      approachSteps: [
        { n: 1, title: "Interview the org", body: "Structured interviews across Sales, Marketing, CS, and Finance to surface the real (not documented) process and the top pain points." },
        { n: 2, title: "Map current → future state", body: "Documented the existing lead-to-cash flow, then designed a future-state that tightened CRM rigor and added the controls leadership had been asking for." },
        { n: 3, title: "Lift & reshape", body: "Migrated Classic → Lightning while implementing the new process model in the same cutover — avoiding a second round of change management." },
        { n: 4, title: "Pipeline taxonomy", body: "Rebuilt pipeline stages, lead-routing rules, lifecycle definitions, and SDR → AE handoff criteria." },
        { n: 5, title: "Automated renewals", body: "Built opportunity-renewal automation to enforce consistent revenue recognition across the renewal book." },
        { n: 6, title: "Board-ready reporting", body: "Stood up executive dashboards (CAC, LTV, ARR, funnel) pulling from the new pipeline stage model." }
      ],
      result: [
        "A 25% improvement in forecasting accuracy, significantly stronger pipeline visibility, and a predictable, auditable renewal motion.",
        "Dashboards leadership actually used for board reporting — not ones the team built and then ignored."
      ]
    }
  ]
};

export default SITE_DATA;

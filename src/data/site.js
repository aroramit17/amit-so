const SITE_DATA = {
  name: "Amit Arora",
  tagline: "Strategic GTM Consultant · Salesforce Architect · AI Workflow Builder",
  sub: "RevOps operator by day, builder by night, husband, dad, and always tinkering. Somewhere between Salesforce flows, AI experiments, and coffee (more like beer), I'm chasing the next idea worth launching.",
  about: [
    "Strategic GTM program leader with deep expertise in owning outcomes across client-facing consulting and enterprise technology environments. I build trusted executive relationships and translate complex technical and revenue concepts into actionable strategy.",
    "Deep fluency across Salesforce, HubSpot, Clay, AI agents, and automation platforms — combined with cross-functional program leadership that aligns Sales, Marketing, Customer Success, and Finance around shared business objectives.",
    "Track record of improving forecasting accuracy, designing scalable go-to-market operating systems, and delivering board-ready insights that drive predictable growth."
  ],
  stats: [
    { number: "10+", label: "Years of Experience" },
    { number: "8×", label: "Salesforce Certified" },
    { number: "25%", label: "Forecast Accuracy Gain" },
    { number: "A & B", label: "Series A–B Startup Specialist" }
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
      summary: "Led the full CRM transition from HubSpot to Salesforce. Built a pipeline hygiene engine using Clay and implemented ICP personas to uncover high-value leads.",
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
      summary: "Owned the full GTM tech stack as strategic program leader, building pipeline and forecasting frameworks from scratch and delivering board-ready executive reporting.",
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
      summary: "Delivered enterprise Salesforce solutions in Financial Services with a 98% client satisfaction rating and 95% project success rate.",
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
      summary: "Took ownership of CRM operations for energy corporations. Led a $750K Salesforce migration enhancing operational efficiency by 20%.",
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
      slug: "case-study-1",
      title: "Automated ICP scoring engine at webAI",
      tag: "Revenue Operations",
      blurb: "Inside the first six months at a VC-backed AI startup, stood up a closed-loop ICP scoring engine that enriches and routes every inbound lead automatically.",
      role: "Revenue Operations Manager",
      company: "webAI, Inc.",
      timeline: "First six months (Mar – Aug 2025)",
      stack: ["HubSpot", "Clay", "Salesforce", "Slack"],
      outcome: "Every inbound lead scored, enriched, and routed the same day.",
      context: [
        "webAI's inbound was arriving in HubSpot with almost no context. Sales was burning cycles on manual firmographic research and ICP judgment calls, and speed-to-first-touch was slipping as inbound volume grew.",
        "There was no standardized ICP rubric, which meant routing depended on tribal knowledge and lead quality couldn't be compared across reps or campaigns."
      ],
      approachSteps: [
        { n: 1, title: "Capture", body: "New inbound lead lands in HubSpot CRM — whether via form, meeting booking, or API." },
        { n: 2, title: "Enrich", body: "Lead is pushed to Clay for firmographic, technographic, and contact enrichment." },
        { n: 3, title: "Sync back", body: "Clay writes the enriched record back to HubSpot, mapped to typed properties." },
        { n: 4, title: "Score", body: "A HubSpot workflow evaluates the enriched lead against the ICP rubric (segment, size, stack, intent signals) and assigns an ICP tier." },
        { n: 5, title: "Route", body: "In-ICP leads auto-assign to the right AE based on segment and territory. Out-of-ICP leads route to nurture." }
      ],
      result: [
        "Consistent ICP application across every inbound lead, measurable speed-to-first-touch improvement, and a sales team that stopped doing the research work.",
        "The same enrichment layer became the source-of-truth for downstream outbound, reporting, and forecasting — one model, fed once, reused everywhere."
      ]
    },
    {
      slug: "case-study-2",
      title: "Lead-to-cash transformation at DHI Group",
      tag: "GTM Systems & Business Transformation",
      blurb: "Migrated Salesforce Classic to Lightning while re-engineering the full lead-to-cash process — pipeline taxonomy, forecasting, and automated opportunity renewals included.",
      role: "Director, Business Systems",
      company: "DHI Group Inc.",
      timeline: "2021 – 2024",
      stack: ["Salesforce (Classic → Lightning)", "HubSpot", "Tableau", "DocuSign"],
      outcome: "+25% forecasting accuracy, automated renewals, board-ready dashboards.",
      context: [
        "DHI was operating on legacy Salesforce Classic with weak pipeline hygiene, manual renewals, and forecast numbers that Sales and Finance couldn't trust. The UI was due to be sunsetted, but the real opportunity was rebuilding the business processes underneath — not just flipping a UI switch.",
        "The mandate was simple: do both at once. Migrate to Lightning and take the org through a single, structured change instead of two."
      ],
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

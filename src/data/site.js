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
      title: "Case Study One — coming soon",
      tag: "Revenue Operations",
      blurb: "A placeholder for the first case study. Replace with the real story, metrics, and outcomes when content is ready."
    },
    {
      slug: "case-study-2",
      title: "Case Study Two — coming soon",
      tag: "AI Workflow Design",
      blurb: "A placeholder for the second case study. Replace with the real story, metrics, and outcomes when content is ready."
    }
  ]
};

export default SITE_DATA;

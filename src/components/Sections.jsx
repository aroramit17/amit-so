import React, { useEffect, useRef, useState } from 'react';
import SITE_DATA from '../data/site.js';

function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold });
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}

function Reveal({ children, delay = 0, className = '' }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ '--reveal-delay': `${delay}s` }}
    >
      {children}
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    ['About', '#about'], ['Case Studies', '#case-studies'],
    ['Experience', '#experience'], ['Projects', '#projects'],
    ['Built with Claude', '/built'],
    ['Applying in Public', '/applying']
  ];

  return (
    <nav className={`site-nav ${scrolled ? 'scrolled' : ''}`} aria-label="Primary navigation">
      <a href="#hero" className="nav-brand">amit.so</a>
      <div id="primary-nav-links" className={`nav-links ${mobileOpen ? 'open' : ''}`}>
        {links.map(([label, href]) => (
          <a key={href} href={href} onClick={() => setMobileOpen(false)}>{label}</a>
        ))}
        <a href="/interview" className="nav-cta" onClick={() => setMobileOpen(false)}>Book a Call</a>
      </div>
      <div className="nav-actions">
        {SITE_DATA.social?.linkedin && (
          <a
            href={SITE_DATA.social.linkedin}
            className="nav-icon-btn"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
              <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45C23.2 24 24 23.23 24 22.28V1.72C24 .77 23.2 0 22.22 0z" />
            </svg>
          </a>
        )}
        <button
          className={`nav-hamburger ${mobileOpen ? 'open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
          aria-expanded={mobileOpen}
          aria-controls="primary-nav-links"
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}

function IdentityRail() {
  return (
    <aside className="identity-rail" aria-label="Amit Arora profile summary">
      <div className="rail-person">
        <img
          src="/amit-headshot.png"
          alt="Amit Arora"
          width="88"
          height="88"
          loading="eager"
          fetchPriority="high"
        />
        <div>
          <p className="rail-name">Amit Arora</p>
          <p className="rail-location">Aubrey · Dallas–Fort Worth</p>
        </div>
      </div>

      <div className="rail-message">
        <p className="rail-kicker">Fractional GTM Engineer · RevOps · CRM Architecture</p>
        <h1>I fix the systems behind your <em>pipeline.</em></h1>
        <p className="rail-summary">
          I design the operating layer that keeps revenue teams aligned, data trustworthy, and decisions moving.
        </p>
      </div>

      <div className="rail-proof" aria-label="Career highlights">
        <div><strong>10+</strong><span>Years operating revenue systems</span></div>
        <div><strong>8×</strong><span>Salesforce certified</span></div>
        <div><strong>+25%</strong><span>Forecast accuracy</span></div>
      </div>

      <div className="rail-bottom">
        <p className="availability"><span /> Open to RevOps and GTM leadership</p>
        <div className="rail-actions">
          <a href="/interview" className="primary-link">Book 15 minutes <span>→</span></a>
          <a href="#case-studies" className="quiet-link">Selected work</a>
        </div>
      </div>
    </aside>
  );
}

const authoritySignals = [
  { value: '+25%', label: 'Forecast accuracy', context: 'DHI Group' },
  { value: '98%', label: 'Client satisfaction', context: 'Slalom' },
  { value: '$750K', label: 'CRM migration led', context: 'Avangrid' },
  { value: '10+ hrs', label: 'Saved each week', context: 'webAI' }
];

function Authority() {
  return (
    <section className="story-section authority-section" aria-labelledby="authority-title">
      <Reveal>
        <p className="section-index">01 / Recruiter brief</p>
        <h2 id="authority-title">Revenue systems that teams can trust.</h2>
        <p className="section-lede">
          I have delivered enterprise Salesforce programs, owned the GTM stack at a public company,
          built RevOps from scratch at an AI startup, and now engineer modern HubSpot systems for growing teams.
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <div className="authority-line">
          <span>Series A/B startups</span><i>→</i><span>Public companies</span><i>→</i><span>Enterprise consulting</span>
        </div>
      </Reveal>
      <div className="authority-grid">
        {authoritySignals.map((signal, index) => (
          <Reveal key={signal.label} delay={0.05 + index * 0.04}>
            <article className="authority-card">
              <strong>{signal.value}</strong>
              <span>{signal.label}</span>
              <small>{signal.context}</small>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function SelectedWork() {
  const caseStudies = SITE_DATA.caseStudies || [];
  const work = [
    {
      eyebrow: 'Current · Fractional GTM Engineering',
      title: 'A cleaner HubSpot operating system at RevShoppe',
      body: 'Lifecycle and lead-status alignment, qualification and routing logic, account-first Clay enrichment, and an Apollo sync that keeps dead records away from reps.',
      outcome: 'One reliable path from campaign response to owned opportunity.',
      href: '#current'
    },
    ...caseStudies.map((item) => ({
      eyebrow: `${item.company} · ${item.tag}`,
      title: item.title,
      body: item.blurb,
      outcome: item.outcome,
      href: `/${item.slug}`
    }))
  ];

  return (
    <section id="case-studies" className="story-section selected-work" aria-labelledby="work-title">
      <Reveal>
        <div className="section-heading-row">
          <div>
            <p className="section-index">02 / Selected impact</p>
            <h2 id="work-title">The work behind the numbers.</h2>
          </div>
          <a href="/case-studies" className="section-link">All case studies <span>→</span></a>
        </div>
      </Reveal>
      <div className="work-list">
        {work.map((item, index) => (
          <Reveal key={item.title} delay={index * 0.05}>
            <a className="work-row" href={item.href}>
              <span className="work-number">0{index + 1}</span>
              <div className="work-copy">
                <p>{item.eyebrow}</p>
                <h3>{item.title}</h3>
                <span>{item.body}</span>
              </div>
              <div className="work-outcome">
                <small>Outcome</small>
                <strong>{item.outcome}</strong>
                <i aria-hidden="true">↗</i>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const currentWork = [
  {
    number: '01', title: 'RevShoppe', role: 'Fractional GTM Engineer',
    copy: 'Building HubSpot infrastructure, lifecycle automation, qualification logic, enrichment, outbound, and reporting for a B2B AI software team.'
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

function CurrentWork() {
  return (
    <section id="current" className="story-section current-section" aria-labelledby="current-title">
      <Reveal>
        <p className="section-index">03 / Now</p>
        <h2 id="current-title">Building systems—and the people around them.</h2>
      </Reveal>
      <div className="current-grid">
        {currentWork.map((item, index) => {
          const content = (
            <>
              <span className="current-number">{item.number}</span>
              <h3>{item.title}</h3>
              <p className="current-role">{item.role}</p>
              <p>{item.copy}</p>
              {item.href && <span className="current-arrow">Visit site ↗</span>}
            </>
          );
          return (
            <Reveal key={item.title} delay={index * 0.05}>
              {item.href ? (
                <a className="current-card" href={item.href} target="_blank" rel="noopener noreferrer">{content}</a>
              ) : (
                <article className="current-card">{content}</article>
              )}
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="story-section experience-section" aria-labelledby="experience-title">
      <Reveal>
        <p className="section-index">04 / Career depth</p>
        <h2 id="experience-title">From platform ownership to executive confidence.</h2>
        <p className="section-lede narrow">
          A decade of increasing scope across administration, consulting, systems leadership, and startup RevOps.
        </p>
      </Reveal>
      <div className="experience-list">
        {(SITE_DATA.experience || []).map((job, index) => (
          <Reveal key={`${job.company}-${job.dates}`} delay={index * 0.035}>
            <article className="experience-row">
              <div className="experience-dates">{job.dates}</div>
              <div>
                <p>{job.company}</p>
                <h3>{job.role}</h3>
                <span>{job.summary}</span>
              </div>
              <span className="experience-index">0{index + 1}</span>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function OriginStory() {
  return (
    <section id="about" className="story-section origin-section" aria-labelledby="origin-title">
      <Reveal>
        <p className="section-index light">05 / The operating instinct</p>
        <blockquote id="origin-title">
          “Before I built revenue systems, I ran hotels.”
        </blockquote>
      </Reveal>
      <Reveal delay={0.08}>
        <div className="origin-grid">
          <p>
            Hospitality taught me that systems only work when people actually use them. When the lobby is full,
            nobody cares about the framework—they care about what is happening now and whether you can fix it.
          </p>
          <p>
            That is still how I operate: understand the real workflow, make ownership unmistakable, give leaders
            numbers they trust, and build a rhythm the team can sustain after launch.
          </p>
        </div>
      </Reveal>
      <Reveal delay={0.12}>
        <div className="origin-path" aria-label="Career progression">
          <span>Hospitality leadership</span><i>→</i><span>Salesforce</span><i>→</i><span>Enterprise consulting</span><i>→</i><span>RevOps leadership</span>
        </div>
      </Reveal>
    </section>
  );
}

function Credentials() {
  return (
    <section className="story-section credentials-section" aria-labelledby="credentials-title">
      <Reveal>
        <p className="section-index">06 / Technical authority</p>
        <h2 id="credentials-title">Deep enough to architect. Practical enough to ship.</h2>
      </Reveal>
      <div className="capability-grid">
        {(SITE_DATA.skills || []).map((skill, index) => (
          <Reveal key={skill.title} delay={index * 0.035}>
            <article>
              <span>0{index + 1}</span>
              <h3>{skill.title}</h3>
              <p>{skill.desc}</p>
              <div>{skill.tags.map((tag) => <small key={tag}>{tag}</small>)}</div>
            </article>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.08}>
        <div className="certification-band">
          <strong>8× Salesforce Certified</strong>
          <div>{(SITE_DATA.certifications || []).map((cert) => <span key={cert}>{cert}</span>)}</div>
        </div>
      </Reveal>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="story-section projects-section" aria-labelledby="projects-title">
      <Reveal>
        <p className="section-index">07 / Beyond the role</p>
        <h2 id="projects-title">Teaching, building, and sharing the work.</h2>
      </Reveal>
      <div className="project-list">
        {(SITE_DATA.projects || []).map((project, index) => (
          <Reveal key={project.title} delay={index * 0.04}>
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-row">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div><small>{project.type}</small><h3>{project.title}</h3></div>
              <p>{project.desc}</p>
              <i aria-hidden="true">↗</i>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="story-section contact-section" aria-labelledby="contact-title">
      <Reveal>
        <p className="section-index light">08 / Start a conversation</p>
        <h2 id="contact-title">Have a revenue system people have stopped trusting?</h2>
        <p>
          I am open to RevOps and GTM leadership conversations, along with select fractional engagements.
          Bring the messy version. We can figure out what the system needs next.
        </p>
        <div className="contact-actions">
          <a href="/interview" className="primary-link light-button">Book 15 minutes <span>→</span></a>
          <a href={`mailto:${SITE_DATA.social.email}`} className="contact-email">{SITE_DATA.social.email}</a>
          <a href={SITE_DATA.social.linkedin} target="_blank" rel="noopener noreferrer" className="contact-email">LinkedIn ↗</a>
        </div>
      </Reveal>
    </section>
  );
}

function Footer() {
  const handleCookies = (event) => {
    event.preventDefault();
    if (typeof window !== 'undefined' && window.showCookiePreferences) window.showCookiePreferences();
  };
  return (
    <footer className="site-footer">
      <span>© 2026 Amit Arora · amit.so</span>
      <div>
        <a href="/1-1-with-amit">1:1 Website Build</a>
        <a href="/built">Built with Claude</a>
        <a href="/applying">Applying in Public</a>
        <a href="/llms.txt">llms.txt</a>
        <a href="/privacy">Privacy</a>
        <a href="#" onClick={handleCookies}>Cookies</a>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Nav />
      <main id="hero" className="editorial-home">
        <IdentityRail />
        <div className="story-column">
          <Authority />
          <SelectedWork />
          <CurrentWork />
          <Experience />
          <OriginStory />
          <Credentials />
          <Projects />
          <Contact />
          <Footer />
        </div>
      </main>
    </>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import SITE_DATA from '../data/site.js';

// ─── Reveal on scroll hook ───
// Starts visible so SSR renders content opaque and bots see it. After hydration,
// if the element is below the fold we hide it and fade it back in when scrolled
// into view. Above-the-fold elements simply stay visible with no animation.
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const belowFold = rect.top > window.innerHeight * 0.85;
    if (!belowFold) return;
    setVisible(false);
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.unobserve(el); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = '' }) {
  const [ref, vis] = useReveal();
  return (
    <div ref={ref} className={className} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? 'translateY(0)' : 'translateY(32px)',
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`
    }}>{children}</div>
  );
}

// ─── Navigation ───
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);
  const links = [
    ['About', '#about'], ['Experience', '#experience'],
    ['Case Studies', '/case-studies'], ['Projects', '#projects'],
    ['Applying in Public', '/applying']
  ];
  return (
    <nav className={`site-nav ${scrolled ? 'scrolled' : ''}`}>
      <a href="#hero" className="nav-brand">amit.so</a>
      <div className={`nav-links ${mobileOpen ? 'open' : ''}`}>
        {links.map(([label, href]) => (
          <a key={href} href={href} onClick={() => setMobileOpen(false)}>{label}</a>
        ))}
        <a href="/interview" className="nav-cta" onClick={() => setMobileOpen(false)}>Interview Me</a>
      </div>
      <button className={`nav-hamburger ${mobileOpen ? 'open' : ''}`} onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
        <span /><span /><span />
      </button>
    </nav>
  );
}

// ─── Hero ───
function Hero() {
  const d = SITE_DATA;
  return (
    <section id="hero" className="hero">
      <div className="hero-inner">
        <Reveal>
          <div className="hero-badge">Open to opportunities</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="hero-name">{d.name}</h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="hero-tagline">{d.tagline}</p>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="hero-sub">{d.sub}</p>
        </Reveal>
        <Reveal delay={0.4}>
          <div className="hero-actions">
            <a href="#experience" className="btn-filled">View Experience</a>
            <a href="#contact" className="btn-outline">Get in Touch</a>
          </div>
        </Reveal>
      </div>
      <div className="hero-scroll-hint">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}

// ─── About ───
function About() {
  const d = SITE_DATA;
  return (
    <section id="about" className="about-section">
      <div className="about-inner">
        <div className="about-text">
          <Reveal><span className="label">About</span></Reveal>
          <Reveal delay={0.05}><h2 className="section-heading">10+ years driving GTM transformation</h2></Reveal>
          {d.about.map((p, i) => <Reveal key={i} delay={0.1 + i * 0.05}><p>{p}</p></Reveal>)}
        </div>
        <div className="about-stats">
          {d.stats.map((s, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="stat-card">
                <div className="stat-num">{s.number}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Experience ───
function Experience() {
  const [openIdx, setOpenIdx] = useState(null);
  const [openCats, setOpenCats] = useState({});
  const d = SITE_DATA.experience;

  const toggleCat = (eIdx, cIdx) => {
    const key = `${eIdx}-${cIdx}`;
    setOpenCats(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section id="experience" className="experience-section">
      <Reveal><span className="label">Career</span></Reveal>
      <Reveal delay={0.05}><h2 className="section-heading">Where I've Made Impact</h2></Reveal>
      <div className="exp-timeline">
        {d.map((job, eIdx) => (
          <Reveal key={eIdx} delay={eIdx * 0.08}>
            <div className={`exp-card ${openIdx === eIdx ? 'expanded' : ''}`} style={{ '--accent': job.color }}>
              <div className="exp-dot" />
              <div className="exp-header">
                <div>
                  <h3 className="exp-company">{job.company}</h3>
                  <span className="exp-role">{job.role}</span>
                </div>
                <span className="exp-dates">{job.dates}</span>
              </div>
              <p className="exp-summary">{job.summary}</p>
              <button className="exp-toggle" onClick={() => setOpenIdx(openIdx === eIdx ? null : eIdx)}>
                {openIdx === eIdx ? 'Hide details' : 'Show details'}
                <span className={`exp-arrow ${openIdx === eIdx ? 'up' : ''}`}>↓</span>
              </button>
              {openIdx === eIdx && (
                <div className="exp-details">
                  {job.categories.map((cat, cIdx) => {
                    const isOpen = openCats[`${eIdx}-${cIdx}`];
                    return (
                      <div key={cIdx} className="exp-category">
                        <button className="exp-cat-btn" onClick={() => toggleCat(eIdx, cIdx)}>
                          <span className={`exp-cat-arrow ${isOpen ? 'open' : ''}`}>›</span>
                          {cat.name}
                        </button>
                        {isOpen && (
                          <ul className="exp-cat-items">
                            {cat.items.map((item, iIdx) => <li key={iIdx}>{item}</li>)}
                          </ul>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ─── Skills ───
function Skills() {
  const d = SITE_DATA.skills;
  return (
    <section id="skills" className="skills-section">
      <Reveal><span className="label">Competencies</span></Reveal>
      <Reveal delay={0.05}><h2 className="section-heading">What I Bring to the Table</h2></Reveal>
      <div className="skills-grid">
        {d.map((s, i) => (
          <Reveal key={i} delay={i * 0.06}>
            <div className="skill-card">
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <div className="skill-tags">
                {s.tags.map((t, j) => <span key={j} className="skill-tag">{t}</span>)}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ─── Certifications ───
function Certifications() {
  const d = SITE_DATA.certifications;
  return (
    <section id="certs" className="certs-section">
      <Reveal><span className="label">Certifications</span></Reveal>
      <Reveal delay={0.05}><h2 className="section-heading">8× Salesforce Certified</h2></Reveal>
      <div className="certs-grid">
        {d.map((c, i) => (
          <Reveal key={i} delay={i * 0.04}>
            <div className="cert-chip">
              <div className="cert-icon">SF</div>
              <span>{c}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ─── Career Flow ───
const FLOW_GROUPS = [
  { co: 'avangrid', label: 'Avangrid',  range: '2015 – 2018', role: 'Sr. Salesforce Administrator',   color: '#5bdb82' },
  { co: 'slalom',   label: 'Slalom',    range: '2018 – 2021', role: 'Salesforce Consultant',          color: '#5b9cf5' },
  { co: 'dhi',      label: 'DHI Group', range: '2021 – 2024', role: 'Director, Business Systems',     color: '#9b87f5' },
  { co: 'content',  label: 'Creator',   range: '2024 – now',  role: 'AI with Amit · YouTube',         color: '#d4725c' },
  { co: 'webai',    label: 'webAI',     range: '2025 – 2026', role: 'Revenue Operations Manager',     color: '#e8657a' },
];

function CareerFlow() {
  const [active, setActive] = useState(null);
  const milestones = SITE_DATA.milestones;

  const activeGroup = active !== null ? FLOW_GROUPS[active] : null;
  const activeMilestones = activeGroup
    ? milestones.filter(m => m.co === activeGroup.co)
    : [];

  // Node centers in viewBox coordinates (1000 wide, 100 tall).
  // Columns at 10, 30, 50, 70, 90 percent; node cards occupy the lower half.
  const nodeX = [100, 300, 500, 700, 900];
  const connectorY = 14;
  const pathFor = (a, b) => {
    const x1 = nodeX[a];
    const x2 = nodeX[b];
    const mid = (x1 + x2) / 2;
    return `M ${x1} ${connectorY} C ${mid} ${connectorY}, ${mid} ${connectorY}, ${x2} ${connectorY}`;
  };

  return (
    <section id="milestones" className="flow-section">
      <Reveal><span className="label">Journey</span></Reveal>
      <Reveal delay={0.05}><h2 className="section-heading">Career Flow</h2></Reveal>
      <Reveal delay={0.08}>
        <p className="flow-hint">Tap a company to open the key milestones for that chapter.</p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="flow-wrap">
          <div className="flow-scroller">
            <div className="flow-inner">
              <svg
                className="flow-connectors"
                viewBox="0 0 1000 28"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path d={pathFor(0, 1)} className={`flow-path ${active === 0 || active === 1 ? 'active' : ''}`} />
                <path d={pathFor(1, 2)} className={`flow-path ${active === 1 || active === 2 ? 'active' : ''}`} />
                <path d={pathFor(2, 3)} className={`flow-path ${active === 2 || active === 3 ? 'active' : ''}`} />
                <path d={pathFor(3, 4)} className={`flow-path ${active === 3 || active === 4 ? 'active' : ''}`} />
              </svg>

              <div className="flow-row">
                {FLOW_GROUPS.map((g, i) => (
                  <button
                    key={g.co}
                    type="button"
                    className={`flow-node ${active === i ? 'active' : ''}`}
                    onClick={() => setActive(active === i ? null : i)}
                    style={{ '--co': g.color }}
                    aria-expanded={active === i}
                    aria-label={`${g.label}, ${g.range}, ${g.role}`}
                  >
                    <span className="flow-node-range">{g.range}</span>
                    <div className="flow-node-card">
                      <span className="flow-node-dot" />
                      <span className="flow-node-name">{g.label}</span>
                      <span className="flow-node-role">{g.role}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {activeGroup && (
            <div className="flow-detail" style={{ '--co': activeGroup.color }}>
              <div className="flow-detail-head">
                <div>
                  <div className="flow-detail-title">{activeGroup.label}</div>
                  <div className="flow-detail-sub">{activeGroup.range} · {activeGroup.role}</div>
                </div>
                <button
                  type="button"
                  className="flow-detail-close"
                  onClick={() => setActive(null)}
                  aria-label="Close milestone detail"
                >✕ Close</button>
              </div>
              <div className="flow-detail-grid">
                {activeMilestones.map((m, i) => (
                  <div key={i} className="flow-milestone">
                    <h4>{m.title}</h4>
                    <div className="flow-milestone-role">{m.role}</div>
                    <p>{m.desc}</p>
                    <div className="flow-milestone-tags">
                      {m.tags.map((t, j) => (
                        <span key={j} className="flow-mstag">{t}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Reveal>
    </section>
  );
}

// ─── Projects ───
function Projects() {
  const d = SITE_DATA.projects;
  return (
    <section id="projects" className="projects-section">
      <Reveal><span className="label">Building</span></Reveal>
      <Reveal delay={0.05}><h2 className="section-heading">Side Projects & Content</h2></Reveal>
      <div className="projects-grid">
        {d.map((p, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <a href={p.link} target="_blank" rel="noopener" className="project-card">
              <span className="project-type">{p.type}</span>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <span className="project-arrow">→</span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ─── Contact ───
function Contact() {
  const s = SITE_DATA.social;
  const links = [
    { label: 'LinkedIn', href: s.linkedin },
    { label: 'YouTube', href: s.youtube },
    { label: 'Medium', href: s.medium },
    { label: 'The Daily Skill', href: s.dailyskill },
    { label: 'Email', href: `mailto:${s.email}` }
  ];
  return (
    <section id="contact" className="contact-section">
      <Reveal><span className="label">Connect</span></Reveal>
      <Reveal delay={0.05}><h2 className="section-heading">Let's Talk</h2></Reveal>
      <Reveal delay={0.1}><p className="contact-sub">I'm exploring new opportunities and would love to connect about how I can help your team build a scalable, data-driven go-to-market operation.</p></Reveal>
      <Reveal delay={0.15}>
        <div className="contact-links">
          {links.map((l, i) => (
            <a key={i} href={l.href} target="_blank" rel="noopener" className="contact-chip">{l.label}</a>
          ))}
        </div>
      </Reveal>
      <Reveal delay={0.2}>
        <a href="/interview" className="btn-filled" style={{ marginTop: '2rem', display: 'inline-flex' }}>Book a Call</a>
      </Reveal>
    </section>
  );
}

// ─── Footer ───
function Footer() {
  const handleCookies = (e) => {
    e.preventDefault();
    if (typeof window !== 'undefined' && window.showCookiePreferences) {
      window.showCookiePreferences();
    }
  };
  return (
    <footer className="site-footer">
      <span>© 2026 Amit Arora · amit.so</span>
      <span className="footer-sep"> · </span>
      <a href="/llms.txt" className="footer-link">llms.txt</a>
      <span className="footer-sep"> · </span>
      <a href="/privacy" className="footer-link">Privacy</a>
      <span className="footer-sep"> · </span>
      <a href="#" className="footer-link" onClick={handleCookies}>Cookies</a>
    </footer>
  );
}

// ─── Case Studies (home preview) ───
function CaseStudies() {
  const d = SITE_DATA.caseStudies || [];
  if (!d.length) return null;
  return (
    <section id="case-studies" className="case-studies-section">
      <Reveal><span className="label">Selected Work</span></Reveal>
      <Reveal delay={0.05}>
        <div className="cs-heading-row">
          <h2 className="section-heading" style={{ marginBottom: 0 }}>Case Studies</h2>
          <a href="/case-studies" className="cs-view-all">View all →</a>
        </div>
      </Reveal>
      <div className="cs-grid">
        {d.map((c, i) => (
          <Reveal key={c.slug} delay={0.08 + i * 0.06}>
            <a href={`/case-studies/${c.slug}`} className="cs-card">
              <span className="cs-tag">{c.tag}</span>
              <h3 className="cs-title">{c.title}</h3>
              <p className="cs-blurb">{c.blurb}</p>
              <span className="cs-arrow">Read the story →</span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ─── App ───
export default function App() {
  return (
    <>
      <div className="grain" />
      <Nav />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Certifications />
      <CareerFlow />
      <CaseStudies />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}

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
    ['About', '#about'], ['Case Studies', '#case-studies'],
    ['Experience', '#experience'], ['Projects', '#projects']
  ];
  return (
    <nav className={`site-nav ${scrolled ? 'scrolled' : ''}`}>
      <a href="#hero" className="nav-brand">{SITE_DATA.domain}</a>
      <div className={`nav-links ${mobileOpen ? 'open' : ''}`}>
        {links.map(([label, href]) => (
          <a key={href} href={href} onClick={() => setMobileOpen(false)}>{label}</a>
        ))}
        <a href="/interview" className="nav-cta" onClick={() => setMobileOpen(false)}>Book a Call</a>
      </div>
      <button className={`nav-hamburger ${mobileOpen ? 'open' : ''}`} onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
        <span /><span /><span />
      </button>
    </nav>
  );
}

// ─── Hero (cinematic) ───
const HERO_VIDEO_SRC = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_094145_4a271a6c-3869-4f1c-8aa7-aeb0cb227994.mp4";

function IconSparkle(props) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" />
    </svg>
  );
}
function IconBriefcase(props) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M3 13h18" />
    </svg>
  );
}
function IconMapPin(props) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M12 22s-7-7.5-7-13a7 7 0 1 1 14 0c0 5.5-7 13-7 13z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}
function IconPlay(props) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
function IconArrow(props) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}

function Hero() {
  const d = SITE_DATA;
  return (
    <section id="hero" className="hero-cinema">
      <video
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src={HERO_VIDEO_SRC} type="video/mp4" />
      </video>
      <div className="hero-blur-overlay" aria-hidden="true" />

      <div className="hero-cinema-content">
        <div className="hero-cinema-left">
          <div className="hero-meta animate-blur-fade-up" style={{ animationDelay: '300ms' }}>
            {(d.heroMeta || []).map((item, i) => {
              const Icon = item.icon === 'briefcase' ? IconBriefcase
                : item.icon === 'mapPin' ? IconMapPin
                : IconSparkle;
              return (
                <span key={i} className="hero-meta-item">
                  <Icon /> <span>{item.text}</span>
                </span>
              );
            })}
          </div>

          <h1 className="hero-cinema-title animate-blur-fade-up" style={{ animationDelay: '400ms' }}>
            {d.name}
          </h1>

          <p className="hero-cinema-desc animate-blur-fade-up" style={{ animationDelay: '500ms' }}>
            {d.tagline}
          </p>

          <div className="hero-cinema-actions">
            <a
              href="/interview"
              className="btn-watch animate-blur-fade-up"
              style={{ animationDelay: '600ms' }}
            >
              <IconPlay /> <span>Book a Call</span>
            </a>
            <a
              href="#case-studies"
              className="btn-learn liquid-glass animate-blur-fade-up"
              style={{ animationDelay: '700ms' }}
            >
              <span>See What I've Built</span>
              <IconArrow />
            </a>
          </div>
        </div>

        <div
          className="hero-cinema-portrait animate-blur-fade-up"
          style={{ animationDelay: '450ms' }}
        >
          <img
            src="/headshot.png"
            alt={`Portrait of ${d.name}`}
            width="520"
            height="520"
            loading="eager"
            fetchpriority="high"
          />
        </div>
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

// ─── Career Mind-Map ───
// Branch positions in a 1000 x 560 SVG viewBox. Leaves arranged along the
// outside edge (x ≈ 80 left side / 920 right side).
// Branches come from site.js (`careerBranches`) so this file stays generic.
const BRANCHES = SITE_DATA.careerBranches || [];
const CENTER = { x: 500, y: 280 };
const LEAF_X_LEFT = 85;
const LEAF_X_RIGHT = 915;
const PILL_BRANCH = { w: 150, h: 36 };
const PILL_LEAF = { w: 170, h: 28 };
const PILL_CENTER = { w: 190, h: 58 };

function centerBranchPath(bx, by) {
  const cx = CENTER.x, cy = CENTER.y;
  const cp1x = cx + (bx - cx) * 0.45;
  const cp1y = cy;
  const cp2x = bx;
  const cp2y = cy + (by - cy) * 0.55;
  return `M ${cx},${cy} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${bx},${by}`;
}

function branchLeafPath(bx, by, lx, ly) {
  const cp1x = bx + (lx - bx) * 0.6;
  const cp1y = by;
  const cp2x = lx;
  const cp2y = by + (ly - by) * 0.4;
  return `M ${bx},${by} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${lx},${ly}`;
}

function shortenLeaf(title) {
  if (title.length <= 28) return title;
  return title.slice(0, 26).trimEnd() + '…';
}

function CareerMindMap() {
  const [active, setActive] = useState(null);
  const milestones = SITE_DATA.milestones;
  // Build per-branch leaves: milestones filtered by `co`.
  const leavesByCo = {};
  BRANCHES.forEach((b) => {
    leavesByCo[b.co] = milestones.filter((m) => m.co === b.co);
  });

  const activeBranch = active !== null ? BRANCHES[active] : null;
  const activeLeaves = activeBranch ? leavesByCo[activeBranch.co] : [];

  const onToggle = (i) => setActive(active === i ? null : i);

  return (
    <section id="milestones" className="mind-section">
      <Reveal><span className="label">Journey</span></Reveal>
      <Reveal delay={0.05}><h2 className="section-heading">Career Map</h2></Reveal>
      <Reveal delay={0.08}>
        <p className="mind-hint">Tap a company to open the milestones for that chapter.</p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mind-wrap">
          {/* Desktop: radial SVG */}
          <div className="mind-radial" role="img" aria-labelledby="mind-caption">
            <span id="mind-caption" className="mind-caption">
              Career map: central node "{SITE_DATA.name}'s Career" with branches for each chapter, each connected to its milestone leaves.
            </span>
            <svg
              className="mind-svg"
              viewBox="0 0 1000 560"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Center → branch connectors */}
              {BRANCHES.map((b, i) => (
                <path
                  key={`c-${b.co}`}
                  d={centerBranchPath(b.pos.x, b.pos.y)}
                  className={`mind-path ${active === i ? 'active' : ''} ${active !== null && active !== i ? 'fade' : ''}`}
                  style={{ '--co': b.color }}
                />
              ))}
              {/* Branch → leaf connectors */}
              {BRANCHES.map((b, i) => {
                const leaves = leavesByCo[b.co];
                const lx = b.side === 'left' ? LEAF_X_LEFT : LEAF_X_RIGHT;
                return leaves.map((_, j) => (
                  <path
                    key={`l-${b.co}-${j}`}
                    d={branchLeafPath(b.pos.x, b.pos.y, lx, b.leafYs[j] ?? b.pos.y)}
                    className={`mind-path mind-path--leaf ${active === i ? 'active' : ''} ${active !== null && active !== i ? 'fade' : ''}`}
                    style={{ '--co': b.color }}
                  />
                ));
              })}

              {/* Center pill */}
              <foreignObject
                x={CENTER.x - PILL_CENTER.w / 2}
                y={CENTER.y - PILL_CENTER.h / 2}
                width={PILL_CENTER.w}
                height={PILL_CENTER.h}
              >
                <div xmlns="http://www.w3.org/1999/xhtml" className="mind-center">
                  {SITE_DATA.name.split(' ')[0]}'s Career
                </div>
              </foreignObject>

              {/* Branch pills */}
              {BRANCHES.map((b, i) => (
                <foreignObject
                  key={`b-${b.co}`}
                  x={b.pos.x - PILL_BRANCH.w / 2}
                  y={b.pos.y - PILL_BRANCH.h / 2}
                  width={PILL_BRANCH.w}
                  height={PILL_BRANCH.h}
                >
                  <button
                    xmlns="http://www.w3.org/1999/xhtml"
                    type="button"
                    className={`mind-branch ${active === i ? 'active' : ''} ${active !== null && active !== i ? 'fade' : ''}`}
                    onClick={() => onToggle(i)}
                    style={{ '--co': b.color }}
                    aria-expanded={active === i}
                    aria-controls="mind-detail-panel"
                    aria-label={`${b.label}, ${b.range}, ${b.role}`}
                  >
                    {b.label}
                  </button>
                </foreignObject>
              ))}

              {/* Leaf pills */}
              {BRANCHES.map((b, i) => {
                const leaves = leavesByCo[b.co];
                const lx = b.side === 'left' ? LEAF_X_LEFT : LEAF_X_RIGHT;
                return leaves.map((m, j) => (
                  <foreignObject
                    key={`lf-${b.co}-${j}`}
                    x={lx - PILL_LEAF.w / 2}
                    y={(b.leafYs[j] ?? b.pos.y) - PILL_LEAF.h / 2}
                    width={PILL_LEAF.w}
                    height={PILL_LEAF.h}
                  >
                    <div
                      xmlns="http://www.w3.org/1999/xhtml"
                      className={`mind-leaf ${active === i ? 'active' : ''} ${active !== null && active !== i ? 'fade' : ''}`}
                      style={{ '--co': b.color }}
                      title={m.title}
                    >
                      {shortenLeaf(m.title)}
                    </div>
                  </foreignObject>
                ));
              })}
            </svg>
          </div>

          {/* Mobile: vertical accordion */}
          <div className="mind-vertical">
            {BRANCHES.map((b, i) => (
              <button
                key={`mv-${b.co}`}
                type="button"
                className={`mind-vnode ${active === i ? 'active' : ''}`}
                onClick={() => onToggle(i)}
                style={{ '--co': b.color }}
                aria-expanded={active === i}
                aria-controls="mind-detail-panel"
              >
                <div className="mind-vnode-head">
                  <span className="mind-vnode-name">{b.label}</span>
                  <span className="mind-vnode-range">{b.range}</span>
                </div>
                <div className="mind-vnode-role">{b.role}</div>
              </button>
            ))}
          </div>

          {activeBranch && (
            <div
              id="mind-detail-panel"
              className="mind-detail"
              style={{ '--co': activeBranch.color }}
            >
              <div className="mind-detail-head">
                <div>
                  <div className="mind-detail-title">{activeBranch.label}</div>
                  <div className="mind-detail-sub">{activeBranch.range} · {activeBranch.role}</div>
                </div>
                <button
                  type="button"
                  className="mind-detail-close"
                  onClick={() => setActive(null)}
                  aria-label="Close milestone detail"
                >✕ Close</button>
              </div>
              <div className="mind-detail-grid">
                {activeLeaves.map((m, j) => (
                  <div key={j} className="mind-milestone">
                    <h4>{m.title}</h4>
                    <div className="mind-milestone-role">{m.role}</div>
                    <p>{m.desc}</p>
                    <div className="mind-milestone-tags">
                      {m.tags.map((t, k) => (
                        <span key={k} className="mind-mstag">{t}</span>
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
  const secondary = [
    { label: 'LinkedIn', href: s.linkedin },
    { label: 'YouTube', href: s.youtube },
    { label: 'Medium', href: s.medium }
  ];
  return (
    <section id="contact" className="contact-section">
      <Reveal><span className="label">Connect</span></Reveal>
      <Reveal delay={0.05}><h2 className="section-heading">Let's Talk</h2></Reveal>
      <Reveal delay={0.1}>
        <p className="contact-sub">
          {SITE_DATA.contactBlurb}
        </p>
      </Reveal>
      <Reveal delay={0.15}>
        <a href="/interview" className="btn-filled contact-primary-cta">Book a Call →</a>
      </Reveal>
      <Reveal delay={0.2}>
        <p className="contact-secondary-line">
          Prefer email? <a href={`mailto:${s.email}`} className="contact-email-link" aria-label={`Send ${SITE_DATA.name} an email`}>Email me</a>
        </p>
      </Reveal>
      <Reveal delay={0.25}>
        <div className="contact-links">
          {secondary.map((l, i) => (
            <a key={i} href={l.href} target="_blank" rel="noopener" className="contact-chip">{l.label}</a>
          ))}
        </div>
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
      <span>© {SITE_DATA.copyrightYear} {SITE_DATA.name} · {SITE_DATA.domain}</span>
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
            <a href={`/${c.slug}`} className="cs-card">
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
      <CaseStudies />
      <Experience />
      <Certifications />
      <CareerMindMap />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}

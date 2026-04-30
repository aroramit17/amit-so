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
    const MIN_BLUR = 10;
    const MAX_BLUR = 30;
    const RANGE = 240;
    let target = MIN_BLUR;
    let current = MIN_BLUR;
    let raf = 0;
    const tick = () => {
      current += (target - current) * 0.1;
      document.documentElement.style.setProperty('--nav-blur', current.toFixed(2) + 'px');
      if (Math.abs(target - current) > 0.05) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      const t = Math.min(1, y / RANGE);
      target = MIN_BLUR + (MAX_BLUR - MIN_BLUR) * t;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  const links = [
    ['About', '#about'], ['Case Studies', '#case-studies'],
    ['Experience', '#experience'], ['Projects', '#projects'],
    ['Applying in Public', '/applying']
  ];
  return (
    <nav className={`site-nav ${scrolled ? 'scrolled' : ''}`}>
      <a href="#hero" className="nav-brand">amit.so</a>
      <div className={`nav-links ${mobileOpen ? 'open' : ''}`}>
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
        <button className={`nav-hamburger ${mobileOpen ? 'open' : ''}`} onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </div>
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

function useRefractionReveal(threshold = 0.15) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dispMap = document.querySelector('#glass-refraction feDisplacementMap');
    if (!dispMap || reduce) return;
    let raf = 0;
    let start = 0;
    const DUR = 1400;
    const run = (ts) => {
      if (!start) start = ts;
      const t = Math.min(1, (ts - start) / DUR);
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      const peak = Math.sin(eased * Math.PI);
      dispMap.setAttribute('scale', (peak * 50).toFixed(2));
      if (t < 1) {
        raf = requestAnimationFrame(run);
      } else {
        dispMap.setAttribute('scale', '0');
      }
    };
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        raf = requestAnimationFrame(run);
        obs.unobserve(el);
      }
    }, { threshold });
    obs.observe(el);
    return () => {
      obs.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [threshold]);
  return ref;
}

function Hero() {
  const d = SITE_DATA;
  const refractRef = useRefractionReveal(0.15);
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
            <span className="hero-meta-item">
              <IconSparkle /> <span>8× Salesforce Certified</span>
            </span>
            <span className="hero-meta-item">
              <IconBriefcase /> <span>10+ yrs Revenue Ops</span>
            </span>
            <span className="hero-meta-item">
              <IconMapPin /> <span>Aubrey, TX</span>
            </span>
          </div>

          <div className="refract-stage" ref={refractRef}>
            <h1
              className="hero-cinema-title refract-target animate-blur-fade-up"
              style={{ animationDelay: '400ms' }}
            >
              {d.name}
            </h1>
            <span className="refract-panel" aria-hidden="true" />
          </div>

          <p
            className="hero-cinema-desc refract-blend animate-blur-fade-up"
            style={{ animationDelay: '500ms' }}
          >
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
            src="/amit-headshot.png"
            alt="Portrait of Amit Arora"
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
const BRANCHES = [
  {
    co: 'avangrid', label: 'Avangrid', range: '2015 – 2018',
    role: 'Sr. Salesforce Administrator', color: '#5bdb82',
    pos: { x: 225, y: 110 }, side: 'left',
    leafYs: [50, 170],
  },
  {
    co: 'slalom', label: 'Slalom', range: '2018 – 2021',
    role: 'Salesforce Consultant', color: '#5b9cf5',
    pos: { x: 225, y: 450 }, side: 'left',
    leafYs: [390, 450, 510],
  },
  {
    co: 'dhi', label: 'DHI Group', range: '2021 – 2024',
    role: 'Director, Business Systems', color: '#9b87f5',
    pos: { x: 775, y: 95 }, side: 'right',
    leafYs: [40, 100, 160],
  },
  {
    co: 'content', label: 'Creator', range: '2024 – now',
    role: 'AI with Amit · Writing', color: '#d4725c',
    pos: { x: 860, y: 280 }, side: 'right',
    leafYs: [225, 280, 335],
  },
  {
    co: 'webai', label: 'webAI', range: '2025 – 2026',
    role: 'Revenue Operations Manager', color: '#e8657a',
    pos: { x: 775, y: 465 }, side: 'right',
    leafYs: [405, 465, 525],
  },
];
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
  const projects = SITE_DATA.projects || [];

  // Build per-branch leaves: milestones filtered by `co`. The Creator branch
  // is enriched with selected projects so it doesn't look visually thin.
  const leavesByCo = {};
  BRANCHES.forEach((b) => {
    leavesByCo[b.co] = milestones.filter((m) => m.co === b.co);
  });
  const creatorExtras = projects
    .filter((p) => p.title === 'GPTcommands' || p.title === 'The Daily Skill')
    .map((p) => ({
      title: p.title,
      role: `Creator · ${p.type}`,
      desc: p.desc,
      tags: [p.type],
      co: 'content',
      external: p.link,
    }));
  leavesByCo.content = [...leavesByCo.content, ...creatorExtras];

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
              Career map: central node "Amit's Career" with five branches — Avangrid, Slalom, DHI Group, Creator, and webAI — each connected to its milestone leaves.
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
                  Amit's Career
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
function BentoCard({ project, sizeClass, delay = 0 }) {
  const [revealRef, vis] = useReveal();
  const cardRef = useRef(null);
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    let raf = 0;
    let targetX = 50, targetY = 50;
    let curX = 50, curY = 50;
    let active = false;
    const tick = () => {
      curX += (targetX - curX) * 0.1;
      curY += (targetY - curY) * 0.1;
      el.style.setProperty('--mouse-x', curX.toFixed(2) + '%');
      el.style.setProperty('--mouse-y', curY.toFixed(2) + '%');
      if (active || Math.abs(targetX - curX) > 0.2 || Math.abs(targetY - curY) > 0.2) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };
    const onMove = (ev) => {
      const r = el.getBoundingClientRect();
      targetX = ((ev.clientX - r.left) / r.width) * 100;
      targetY = ((ev.clientY - r.top) / r.height) * 100;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onEnter = () => {
      active = true;
      el.classList.add('is-hover');
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onLeave = () => {
      active = false;
      el.classList.remove('is-hover');
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  const setRef = (node) => {
    cardRef.current = node;
    if (revealRef) revealRef.current = node;
  };
  return (
    <a
      ref={setRef}
      href={project.link}
      target="_blank"
      rel="noopener"
      className={`bento-card glass-panel ${sizeClass}`}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? 'translate3d(0,0,0)' : 'translate3d(0,32px,0)',
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`
      }}
    >
      <span className="bento-glow" aria-hidden="true" />
      <div className="bento-inner">
        <span className="project-type">{project.type}</span>
        <h3>{project.title}</h3>
        <p>{project.desc}</p>
        <span className="project-arrow">→</span>
      </div>
    </a>
  );
}

function Projects() {
  const d = SITE_DATA.projects || [];
  const sizes = ['feat', 'small-a', 'small-b', 'wide'];
  return (
    <section id="projects" className="projects-section">
      <Reveal><span className="label">Building</span></Reveal>
      <Reveal delay={0.05}><h2 className="section-heading">Side Projects & Content</h2></Reveal>
      <div className="bento-grid">
        {d.map((p, i) => (
          <BentoCard key={i} project={p} sizeClass={sizes[i] || 'small-a'} delay={i * 0.08} />
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
          If your team needs someone to own the GTM operating system end to end — from Salesforce architecture to pipeline, forecasting, and AI-powered automation — book 15 minutes. No pitch, just a conversation about what you actually need.
        </p>
      </Reveal>
      <Reveal delay={0.15}>
        <a href="/interview" className="btn-filled contact-primary-cta">Book a Call →</a>
      </Reveal>
      <Reveal delay={0.2}>
        <p className="contact-secondary-line">
          Prefer email? <a href={`mailto:${s.email}`} className="contact-email-link" aria-label="Send Amit an email">Email me</a>
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

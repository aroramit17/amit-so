import React, { useState, useEffect, useRef, useCallback } from 'react';
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
    ['About', '#about'], ['Experience', '#experience'], ['Skills', '#skills'],
    ['Projects', '#projects'], ['Contact', '#contact'],
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

// ─── Iridescent Milestones ───
const msCoColors = { avangrid: '#5bdb82', slalom: '#5b9cf5', dhi: '#9b87f5', content: '#d4725c', webai: '#e8657a' };
const msCoLabels = { avangrid: 'Avangrid', slalom: 'Slalom', dhi: 'DHI Group', content: 'Creator', webai: 'webAI' };

function IridescentCard({ milestone, index, isActive, onClick }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);
  const co = msCoColors[milestone.co];

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const tiltX = (y - 0.5) * 24;
    const tiltY = (x - 0.5) * -24;
    setTilt({ x: tiltX, y: tiltY });
    setGlowPos({ x: x * 100, y: y * 100 });
  }, []);

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => {
    setIsHovering(false);
    setTilt({ x: 0, y: 0 });
    setGlowPos({ x: 50, y: 50 });
  };

  const iridAngle = glowPos.x * 3.6;
  const iridX = glowPos.x;
  const iridY = glowPos.y;

  return (
    <div className="irid-card-wrap" style={{ perspective: '800px' }}>
      <div
        ref={cardRef}
        className={`irid-card ${isActive ? 'active' : ''} ${isHovering ? 'hovering' : ''}`}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          '--co': co,
          '--tiltX': `${tilt.x}deg`,
          '--tiltY': `${tilt.y}deg`,
          '--glowX': `${glowPos.x}%`,
          '--glowY': `${glowPos.y}%`,
          '--iridAngle': `${iridAngle}deg`,
          transform: isHovering
            ? `rotateX(var(--tiltX)) rotateY(var(--tiltY)) scale(1.05)`
            : 'rotateX(0) rotateY(0) scale(1)',
        }}
      >
        <div className="irid-sheen" style={{
          background: isHovering
            ? `linear-gradient(${iridAngle}deg,
                rgba(255,0,150,0.13) 0%,
                rgba(0,255,200,0.13) 20%,
                rgba(100,100,255,0.18) 40%,
                rgba(255,200,0,0.13) 60%,
                rgba(255,0,100,0.13) 80%,
                rgba(0,200,255,0.13) 100%)`
            : 'none',
          opacity: isHovering ? 1 : 0,
        }} />
        <div className="irid-specular" style={{
          background: `radial-gradient(circle at ${iridX}% ${iridY}%, rgba(255,255,255,${isHovering ? 0.25 : 0}) 0%, transparent 60%)`,
        }} />
        <div className="irid-noise" />
        <div className="irid-content">
          <div className="irid-top-row">
            <span className="irid-index">#{String(index + 1).padStart(2, '0')}</span>
            <span className="irid-co-badge" style={{ '--co': co }}>{msCoLabels[milestone.co]}</span>
          </div>
          <div className="irid-dot-row">
            <span className="irid-dot" style={{ background: co }} />
            <span className="irid-year">{milestone.role.split('·')[1]?.trim() || ''}</span>
          </div>
          <h3 className="irid-title">{milestone.title}</h3>
          <p className="irid-desc">{milestone.desc}</p>
          <div className="irid-tags">
            {milestone.tags.map((t, i) => (
              <span key={i} className="irid-tag" style={{ '--co': co }}>{t}</span>
            ))}
          </div>
        </div>
        <div className="irid-edge-glow" style={{
          boxShadow: isHovering
            ? `0 0 30px color-mix(in oklch, ${co}, transparent 60%),
               0 20px 60px rgba(0,0,0,0.4),
               inset 0 0 60px rgba(255,255,255,0.03)`
            : '0 4px 20px rgba(0,0,0,0.3)',
        }} />
      </div>
    </div>
  );
}

function IridescentMilestones() {
  const d = SITE_DATA.milestones;
  const [active, setActive] = useState(null);
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? d : d.filter(m => m.co === filter);

  return (
    <section id="milestones" className="milestones-section">
      <Reveal><span className="label">Journey</span></Reveal>
      <Reveal delay={0.05}><h2 className="section-heading">Career Milestones</h2></Reveal>

      <Reveal delay={0.1}>
        <div className="irid-filters">
          <button className={`irid-filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>
            All
          </button>
          {Object.entries(msCoLabels).map(([k, v]) => (
            <button key={k}
              className={`irid-filter-btn ${filter === k ? 'active' : ''}`}
              onClick={() => setFilter(k)}
              style={{ '--co': msCoColors[k] }}
            >
              <span className="irid-filter-dot" style={{ background: msCoColors[k] }} />
              {v}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="irid-grid">
        {filtered.map((m, i) => {
          const realIdx = d.indexOf(m);
          return (
            <Reveal key={realIdx} delay={i * 0.05}>
              <IridescentCard
                milestone={m}
                index={realIdx}
                isActive={active === realIdx}
                onClick={() => setActive(active === realIdx ? null : realIdx)}
              />
            </Reveal>
          );
        })}
      </div>
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
      <IridescentMilestones />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}

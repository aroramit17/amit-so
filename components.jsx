// Components for Amit Arora Portfolio
const { useState, useEffect, useRef, useCallback } = React;

// ─── Reveal on scroll hook ───
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } }, { threshold });
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
    ['Applying in Public', 'applying.html']
  ];
  return (
    <nav className={`site-nav ${scrolled ? 'scrolled' : ''}`}>
      <a href="#hero" className="nav-brand">amit.so</a>
      <div className={`nav-links ${mobileOpen ? 'open' : ''}`}>
        {links.map(([label, href]) => (
          <a key={href} href={href} onClick={() => setMobileOpen(false)}>{label}</a>
        ))}
        <a href="interview.html" className="nav-cta" onClick={() => setMobileOpen(false)}>Interview Me</a>
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

// ─── Milestones ───
function Milestones() {
  const [active, setActive] = useState(null);
  const [hovered, setHovered] = useState(null);
  const trackRef = useRef(null);
  const d = SITE_DATA.milestones;
  const coColors = { avangrid: '#5bdb82', slalom: '#5b9cf5', dhi: '#9b87f5', content: '#d4725c', webai: '#e8657a' };
  const coLabels = { avangrid: 'Avangrid', slalom: 'Slalom', dhi: 'DHI Group', content: 'Creator', webai: 'webAI' };

  const navigate = (dir) => {
    if (active === null) { setActive(dir === 1 ? 0 : d.length - 1); return; }
    const next = active + dir;
    if (next >= 0 && next < d.length) setActive(next);
  };

  // auto-scroll active node into view
  useEffect(() => {
    if (active === null || !trackRef.current) return;
    const node = trackRef.current.children[active];
    if (node) node.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, [active]);

  const cur = active !== null ? d[active] : null;
  const curColor = cur ? coColors[cur.co] : null;

  return (
    <section id="milestones" className="milestones-section">
      <Reveal><span className="label">Journey</span></Reveal>
      <Reveal delay={0.05}>
        <div className="ms-header-row">
          <h2 className="section-heading" style={{ marginBottom: 0 }}>Career Milestones</h2>
          <div className="ms-nav-arrows">
            <button className="ms-arrow-btn" onClick={() => navigate(-1)} disabled={active === 0} aria-label="Previous">←</button>
            <span className="ms-counter">{active !== null ? `${active + 1} / ${d.length}` : `${d.length} milestones`}</span>
            <button className="ms-arrow-btn" onClick={() => navigate(1)} disabled={active === d.length - 1} aria-label="Next">→</button>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="ms-scroll-wrap">
          <div className="ms-timeline-track" ref={trackRef}>
            {d.map((m, i) => {
              const isActive = active === i;
              const isHov = hovered === i;
              const co = coColors[m.co];
              const isPast = active !== null && i < active;
              return (
                <button
                  key={i}
                  className={`ms-tile ${isActive ? 'active' : ''} ${isPast ? 'past' : ''}`}
                  style={{ '--co': co }}
                  onClick={() => setActive(isActive ? null : i)}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <div className="ms-tile-line">
                    <div className="ms-tile-dot" />
                    {i < d.length - 1 && <div className={`ms-tile-connector ${isPast ? 'filled' : ''}`} />}
                  </div>
                  <span className="ms-tile-year">{m.role.split('·')[1]?.trim() || ''}</span>
                  <span className="ms-tile-title">{m.title}</span>
                  <span className="ms-tile-co">{coLabels[m.co]}</span>
                  {isHov && !isActive && (
                    <div className="ms-tile-preview">Click to explore</div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </Reveal>

      <div className={`ms-detail-panel ${cur ? 'open' : ''}`} style={{ '--co': curColor || 'var(--accent)' }}>
        {cur && (
          <React.Fragment>
            <div className="ms-detail-top">
              <div>
                <h3 className="ms-detail-h">{cur.title}</h3>
                <span className="ms-detail-role">{cur.role}</span>
              </div>
              <button className="ms-detail-close" onClick={() => setActive(null)}>✕</button>
            </div>
            <p className="ms-detail-desc">{cur.desc}</p>
            <div className="ms-detail-tags">
              {cur.tags.map((t, i) => <span key={i} className="ms-dtag">{t}</span>)}
            </div>
            <div className="ms-detail-nav">
              <button className="ms-detail-nav-btn" disabled={active === 0} onClick={() => setActive(active - 1)}>← Previous</button>
              <button className="ms-detail-nav-btn" disabled={active === d.length - 1} onClick={() => setActive(active + 1)}>Next →</button>
            </div>
          </React.Fragment>
        )}
      </div>

      <div className="ms-legend">
        {Object.entries(coLabels).map(([k, v]) => (
          <button key={k} className={`ms-legend-item ${active !== null && d[active].co === k ? 'active' : ''}`}
            onClick={() => { const idx = d.findIndex(m => m.co === k); if (idx >= 0) setActive(idx); }}>
            <span className="ms-legend-dot" style={{ background: coColors[k] }} />
            {v}
          </button>
        ))}
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
        <a href="interview.html" className="btn-filled" style={{ marginTop: '2rem', display: 'inline-flex' }}>Book a Call</a>
      </Reveal>
    </section>
  );
}

// ─── Footer ───
function Footer() {
  return (
    <footer className="site-footer">
      <span>© 2026 Amit Arora · amit.so</span>
      <span className="footer-sep"> · </span>
      <a href="/llms.txt" className="footer-link">llms.txt</a>
    </footer>
  );
}

// ─── App ───
function App() {
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

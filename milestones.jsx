// Iridescent Career Milestone Cards
const { useState, useEffect, useRef, useCallback } = React;

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
        {/* Iridescent layer */}
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

        {/* Specular highlight */}
        <div className="irid-specular" style={{
          background: `radial-gradient(circle at ${iridX}% ${iridY}%, rgba(255,255,255,${isHovering ? 0.25 : 0}) 0%, transparent 60%)`,
        }} />

        {/* Noise texture */}
        <div className="irid-noise" />

        {/* Card content */}
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

        {/* Edge glow */}
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

// Export to window
Object.assign(window, { IridescentMilestones });

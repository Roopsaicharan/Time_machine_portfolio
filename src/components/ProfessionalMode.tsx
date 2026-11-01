import { useState } from 'react'
import { education, experience, links, projects, publications, skills, traveler, type ProjectData } from '../data/content'
import { ProjectMiniDemo } from '../game/ProjectMiniDemo'

interface ProfessionalModeProps {
  onSwitchTo3D: () => void
  onOpenResume: () => void
}

export function ProfessionalMode({ onSwitchTo3D, onOpenResume }: ProfessionalModeProps) {
  const [activeCategory, setActiveCategory] = useState<string>('ALL')
  const [activeProjectId, setActiveProjectId] = useState<string>('tracer')

  const filteredProjects = activeCategory === 'ALL'
    ? projects
    : projects.filter((p) => p.category.toUpperCase().includes(activeCategory))

  const currentProject: ProjectData = projects.find((p) => p.id === activeProjectId) || projects[0]

  return (
    <div className="professional-mode-container">
      {/* Top Professional Header */}
      <header className="prof-header">
        <div className="prof-branding">
          <span className="prof-name">{traveler.name}</span>
          <span className="prof-callsign">UF GATOR CS // SOFTWARE & AI SYSTEMS</span>
        </div>

        <nav className="prof-nav">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects & Sandboxes</a>
          <a href="#experience">Experience</a>
          <a href="#publications">Research</a>
          <a href="#contact">Contact</a>
          <button type="button" className="prof-resume-btn" onClick={onOpenResume}>
            📄 Verified Resume
          </button>
          <button type="button" className="prof-switch-btn" onClick={onSwitchTo3D}>
            🚀 3D Doraemon Time Machine
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="about" className="prof-hero-section">
        <div className="prof-hero-copy">
          <p className="eyebrow" style={{ color: 'var(--cyan)' }}>
            SOFTWARE ENGINEER • AI/ML RESEARCHER • FULL-STACK DEVELOPER
          </p>
          <h1>Building reliable software, intelligent AI systems, and high-throughput pipelines.</h1>
          <p className="prof-hero-lead">{traveler.bio}</p>

          <div className="prof-meta-tags">
            <span className="prof-meta-chip">
              🎓 <strong>Master&apos;s in Computer Science</strong> — University of Florida (Graduating <strong>May 2027</strong>)
            </span>
            <span className="prof-meta-chip">📍 Gainesville, FL & India</span>
            <span className="prof-meta-chip">
              💼 <strong>Seeking 2027 New-Grad Software Engineering & AI/ML Roles</strong>
            </span>
          </div>

          <div className="prof-hero-actions">
            <button type="button" className="engage" onClick={onOpenResume}>
              Download Verified Resume 📄
            </button>
            <a href={`mailto:${links.email}`} className="action-btn">
              Direct Contact ✉️
            </a>
            <a href={links.github} target="_blank" rel="noreferrer" className="action-btn">
              GitHub Profile ↗
            </a>
            <a href={links.linkedin} target="_blank" rel="noreferrer" className="action-btn">
              LinkedIn ↗
            </a>
            <button
              type="button"
              className="action-btn"
              onClick={onSwitchTo3D}
              style={{ borderColor: 'var(--cyan)', color: 'var(--cyan)' }}
            >
              Launch 3D Explorer Mode 🏎️
            </button>
          </div>
        </div>
      </section>

      {/* Skills Matrix */}
      <section id="skills" className="prof-section">
        <div className="section-title-wrap">
          <p className="eyebrow">CORE COMPETENCIES</p>
          <h2>Technical Skills & Engineering Stack</h2>
        </div>
        <div className="prof-skills-grid">
          {skills.map((s) => (
            <div key={s.forge} className="prof-skill-card">
              <h3>{s.forge}</h3>
              <ul className="chips">
                {s.alloys.map((alloy) => (
                  <li key={alloy}>{alloy}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Projects with Interactive Case Studies */}
      <section id="projects" className="prof-section">
        <div className="section-title-wrap">
          <p className="eyebrow">ENGINEERING SHOWCASE</p>
          <h2>Featured Systems & Interactive Case Studies</h2>
        </div>

        {/* Category Filters */}
        <div className="prof-category-filters" style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          {['ALL', 'AI & SYSTEMS', 'RESEARCH & DATA', 'FULL-STACK'].map((cat) => (
            <button
              key={cat}
              type="button"
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '0.4rem 0.9rem',
                borderRadius: '6px',
                fontSize: '0.8rem',
                background: activeCategory === cat ? 'var(--cyan)' : 'rgba(255,255,255,0.06)',
                color: activeCategory === cat ? '#04111d' : '#e2e8f0',
                border: '1px solid ' + (activeCategory === cat ? 'var(--cyan)' : 'rgba(255,255,255,0.1)'),
                fontWeight: activeCategory === cat ? 700 : 500,
                cursor: 'pointer',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Selector Tabs */}
        <div className="prof-project-tabs">
          {filteredProjects.map((proj) => (
            <button
              key={proj.id}
              type="button"
              className={`prof-tab-btn ${activeProjectId === proj.id ? 'active' : ''}`}
              onClick={() => setActiveProjectId(proj.id)}
            >
              <span>{proj.codename}</span>
              <small>{proj.year}</small>
            </button>
          ))}
        </div>

        {/* Active Project Case Study Card */}
        <div className="prof-case-study-card">
          <div className="case-study-header">
            <div>
              <span className="eyebrow" style={{ color: currentProject.accent || 'var(--cyan)' }}>
                {currentProject.codename} // REAL DATE: {currentProject.year} // {currentProject.category}
              </span>
              <h3>{currentProject.title}</h3>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {currentProject.href && (
                <a href={currentProject.href} target="_blank" rel="noreferrer" className="engage">
                  GitHub Repository ↗
                </a>
              )}
              {currentProject.paperUrl && (
                <a
                  href={currentProject.paperUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="engage"
                  style={{ background: 'rgba(255, 154, 76, 0.15)', borderColor: '#ff9a4c', color: '#ff9a4c' }}
                >
                  IEEE Paper ↗
                </a>
              )}
            </div>
          </div>

          <div className="case-study-grid">
            <div className="case-study-text">
              <h4>System Architecture & Engineering Impact</h4>
              <p>{currentProject.summary}</p>

              <div style={{ margin: '0.8rem 0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.6rem', borderRadius: '4px' }}>
                  <strong style={{ color: '#5ef2ff', fontSize: '0.78rem', display: 'block' }}>ENGINEERING PROBLEM:</strong>
                  <p style={{ margin: '0.2rem 0', fontSize: '0.85rem' }}>{currentProject.problem}</p>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.6rem', borderRadius: '4px' }}>
                  <strong style={{ color: '#ffd18a', fontSize: '0.78rem', display: 'block' }}>MY ROLE & ARCHITECTURE:</strong>
                  <p style={{ margin: '0.2rem 0', fontSize: '0.85rem' }}>{currentProject.role} — {currentProject.architecture}</p>
                </div>

                <div style={{ background: 'rgba(46, 213, 115, 0.08)', padding: '0.6rem', borderRadius: '4px', borderLeft: '3px solid #2ed573' }}>
                  <strong style={{ color: '#2ed573', fontSize: '0.78rem', display: 'block' }}>VERIFIED RESULTS & IMPACT:</strong>
                  <p style={{ margin: '0.2rem 0', fontSize: '0.85rem', color: '#e2e8f0' }}>{currentProject.impact}</p>
                </div>
              </div>

              <div className="chips" style={{ marginTop: '0.8rem' }}>
                {currentProject.tags.map((t) => (
                  <span key={t} className="chip">{t}</span>
                ))}
              </div>
            </div>

            <div className="case-study-sandbox">
              <ProjectMiniDemo projectId={currentProject.id} />
            </div>
          </div>
        </div>
      </section>

      {/* Experience & Education */}
      <section id="experience" className="prof-section">
        <div className="section-title-wrap">
          <p className="eyebrow">CAREER TRAJECTORY & ACADEMICS</p>
          <h2>Experience & Education</h2>
        </div>

        <div className="prof-two-col">
          {/* Work & Research Experience */}
          <div>
            <h3 className="column-subtitle">Experience & Research Appointments</h3>
            {experience.map((exp) => (
              <div key={exp.mission} className="prof-card">
                <span className="eyebrow">{exp.years}</span>
                <h4>{exp.role}</h4>
                <p className="role">{exp.org}</p>
                <p>{exp.briefing}</p>
              </div>
            ))}
          </div>

          {/* Academic Credentials */}
          <div>
            <h3 className="column-subtitle">Academic Credentials</h3>
            {education.map((edu) => (
              <div key={edu.place} className="prof-card">
                <span className="eyebrow">{edu.years}</span>
                <h4>{edu.place}</h4>
                <p className="role">{edu.program} ({edu.gpa})</p>
                <p>{edu.notes}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Peer-Reviewed IEEE Publications */}
      <section id="publications" className="prof-section">
        <div className="section-title-wrap">
          <p className="eyebrow">SCHOLARSHIP & INTELLECTUAL PROPERTY</p>
          <h2>Peer-Reviewed IEEE Publications & Patents</h2>
        </div>

        <div className="prof-publications-grid">
          {publications.map((pub) => (
            <div key={pub.id} className="prof-card">
              <span className="eyebrow">{pub.conference}</span>
              <h4>{pub.title}</h4>
              <p className="year-line">Reference: <a href={pub.url} target="_blank" rel="noreferrer">{pub.doi}</a></p>
              <p>{pub.summary}</p>
              {pub.url.startsWith('http') && (
                <a href={pub.url} target="_blank" rel="noreferrer" className="engage" style={{ display: 'inline-block', marginTop: '0.6rem' }}>
                  Access Paper on IEEE Xplore ↗
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="prof-section prof-footer-section">
        <div className="section-title-wrap">
          <p className="eyebrow">CONNECT</p>
          <h2>Open a Channel with Roop Sai Charan</h2>
        </div>
        <p style={{ maxWidth: '640px', margin: '0.5rem auto 1.5rem', color: '#94a3b8' }}>
          Available for Software Engineering, Front-End, and AI/ML positions (Graduating <strong>May 2027</strong>).
        </p>
        <div className="channels" style={{ justifyContent: 'center' }}>
          <a href={`mailto:${links.email}`} className="engage">
            Email: {links.email}
          </a>
          <a href={links.github} target="_blank" rel="noreferrer" className="engage">
            GitHub: Roopsaicharan
          </a>
          <a href={links.linkedin} target="_blank" rel="noreferrer" className="engage">
            LinkedIn Profile
          </a>
          <button type="button" className="engage" onClick={onOpenResume}>
            Download Full Resume 📄
          </button>
        </div>
      </section>
    </div>
  )
}

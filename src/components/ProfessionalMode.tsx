import { useState } from 'react'
import { education, experience, links, projects, publications, skills, traveler } from '../data/content'
import { ProjectMiniDemo } from '../game/ProjectMiniDemo'

interface ProfessionalModeProps {
  onSwitchTo3D: () => void
  onOpenResume: () => void
}

export function ProfessionalMode({ onSwitchTo3D, onOpenResume }: ProfessionalModeProps) {
  const [activeProjectTab, setActiveProjectTab] = useState<string>('meetmint')

  const currentProject = projects.find((p) => p.id === activeProjectTab) || projects[0]

  return (
    <div className="professional-mode-container">
      {/* Top Banner / Switch to 3D Game */}
      <header className="prof-header">
        <div className="prof-branding">
          <span className="prof-name">{traveler.name}</span>
          <span className="prof-callsign">CHRONOS // UF GATOR CS</span>
        </div>

        <nav className="prof-nav">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects & Demos</a>
          <a href="#experience">Experience</a>
          <a href="#publications">Publications</a>
          <a href="#contact">Contact</a>
          <button type="button" className="prof-resume-btn" onClick={onOpenResume}>
            📄 Resume
          </button>
          <button type="button" className="prof-switch-btn" onClick={onSwitchTo3D}>
            🏎️ Explorer 3D Time Machine
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="about" className="prof-hero-section">
        <div className="prof-hero-copy">
          <p className="eyebrow" style={{ color: 'var(--cyan)' }}>FRONT-END UI & AI SYSTEMS ENGINEER</p>
          <h1>Building reliable software, intelligent agents & interactive experiences.</h1>
          <p className="prof-hero-lead">{traveler.bio}</p>
          <div className="prof-meta-tags">
            <span className="prof-meta-chip">🎓 <strong>MS in Computer Science</strong> — University of Florida (2025–2027)</span>
            <span className="prof-meta-chip">📍 Gainesville, FL & India</span>
            <span className="prof-meta-chip">💼 Seeking SE / AI / Front-End Roles (2026/2027)</span>
          </div>
          <div className="prof-hero-actions">
            <button type="button" className="engage" onClick={onOpenResume}>
              View Verified Resume 📄
            </button>
            <a href={`mailto:${links.email}`} className="action-btn">
              Contact Directly ✉️
            </a>
            <button type="button" className="action-btn" onClick={onSwitchTo3D} style={{ borderColor: 'var(--cyan)', color: 'var(--cyan)' }}>
              Launch 3D Doraemon Time Machine 🏎️
            </button>
          </div>
        </div>
      </section>

      {/* Technical Skills Matrix */}
      <section id="skills" className="prof-section">
        <div className="section-title-wrap">
          <p className="eyebrow">COMPETENCIES</p>
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

      {/* Filterable Projects & Live Interactive Sandboxes */}
      <section id="projects" className="prof-section">
        <div className="section-title-wrap">
          <p className="eyebrow">ENGINEERING PORTFOLIO</p>
          <h2>Featured Systems & Interactive Case Studies</h2>
        </div>

        {/* Project Selector Tabs */}
        <div className="prof-project-tabs">
          {projects.map((proj) => (
            <button
              key={proj.id}
              type="button"
              className={`prof-tab-btn ${activeProjectTab === proj.id ? 'active' : ''}`}
              onClick={() => setActiveProjectTab(proj.id)}
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
                {currentProject.codename} // REAL DATE: {currentProject.year}
              </span>
              <h3>{currentProject.title}</h3>
            </div>
            {currentProject.href && (
              <a href={currentProject.href} target="_blank" rel="noreferrer" className="engage">
                GitHub Repository ↗
              </a>
            )}
          </div>

          <div className="case-study-grid">
            <div className="case-study-text">
              <h4>System Architecture & Impact</h4>
              <p>{currentProject.summary}</p>
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
          <p className="eyebrow">WORK HISTORY & ACADEMICS</p>
          <h2>Internships & Education</h2>
        </div>

        <div className="prof-two-col">
          {/* Internships */}
          <div>
            <h3 className="column-subtitle">Internships</h3>
            {experience.map((exp) => (
              <div key={exp.mission} className="prof-card">
                <span className="eyebrow">{exp.years}</span>
                <h4>{exp.role}</h4>
                <p className="role">{exp.org}</p>
                <p>{exp.briefing}</p>
              </div>
            ))}
          </div>

          {/* Education */}
          <div>
            <h3 className="column-subtitle">Academic Credentials</h3>
            {education.map((edu) => (
              <div key={edu.place} className="prof-card">
                <span className="eyebrow">{edu.years}</span>
                <h4>{edu.place}</h4>
                <p className="role">{edu.program}</p>
                <p>{edu.notes}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Peer-Reviewed IEEE Publications */}
      <section id="publications" className="prof-section">
        <div className="section-title-wrap">
          <p className="eyebrow">SCHOLARSHIP</p>
          <h2>Peer-Reviewed IEEE Publications & Patents</h2>
        </div>

        <div className="prof-publications-grid">
          {publications.map((pub) => (
            <div key={pub.id} className="prof-card">
              <span className="eyebrow">{pub.conference}</span>
              <h4>{pub.title}</h4>
              <p className="year-line">DOI: <a href={pub.url} target="_blank" rel="noreferrer">{pub.doi}</a></p>
              <p>{pub.summary}</p>
              <a href={pub.url} target="_blank" rel="noreferrer" className="engage" style={{ display: 'inline-block', marginTop: '0.6rem' }}>
                Access Paper On IEEE Xplore ↗
              </a>
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
        <p>Available for Software Engineering, Front-End, and AI Systems positions (2026/2027).</p>
        <div className="channels" style={{ justifyContent: 'center' }}>
          <a href={`mailto:${links.email}`} className="engage">Email: {links.email}</a>
          <a href={links.github} target="_blank" rel="noreferrer" className="engage">GitHub: Roopsaicharan</a>
          <a href={links.linkedin} target="_blank" rel="noreferrer" className="engage">LinkedIn Profile</a>
          <button type="button" className="engage" onClick={onOpenResume}>
            Download / View Full Resume
          </button>
        </div>
      </section>
    </div>
  )
}

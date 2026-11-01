
import { education, experience, links, projects, publications, skills, traveler } from '../data/content'

interface ResumeModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  if (!isOpen) return null

  return (
    <div className="resume-modal-backdrop" onClick={onClose}>
      <div className="resume-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="resume-modal-header">
          <div>
            <h2>{traveler.name}</h2>
            <p className="resume-role">{traveler.role}</p>
          </div>
          <div className="resume-header-actions">
            <button type="button" className="print-btn" onClick={() => window.print()}>
              🖨️ Print / Save PDF
            </button>
            <button type="button" className="close-btn" onClick={onClose}>
              ✕
            </button>
          </div>
        </div>

        <div className="resume-contact-bar">
          <span>📧 <a href={`mailto:${links.email}`}>{links.email}</a></span>
          <span>📱 {traveler.phone}</span>
          <span>💻 <a href={links.github} target="_blank" rel="noreferrer">GitHub</a></span>
          <span>🔗 <a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></span>
          <span>📍 Gainesville, FL / India</span>
        </div>

        <div className="resume-body">
          {/* Summary */}
          <section className="resume-section">
            <h3>PROFILE SUMMARY</h3>
            <p>{traveler.bio}</p>
          </section>

          {/* Education */}
          <section className="resume-section">
            <h3>EDUCATION</h3>
            {education.map((edu) => (
              <div key={edu.place} className="resume-entry">
                <div className="entry-header">
                  <strong>{edu.place}</strong>
                  <span className="entry-dates">{edu.years}</span>
                </div>
                <div className="entry-subtitle">{edu.program}</div>
                <p>{edu.notes}</p>
              </div>
            ))}
          </section>

          {/* Experience */}
          <section className="resume-section">
            <h3>INTERNSHIPS & EXPERIENCE</h3>
            {experience.map((exp) => (
              <div key={exp.mission} className="resume-entry">
                <div className="entry-header">
                  <strong>{exp.role} | {exp.org}</strong>
                  <span className="entry-dates">{exp.years}</span>
                </div>
                <p>{exp.briefing}</p>
              </div>
            ))}
          </section>

          {/* Projects */}
          <section className="resume-section">
            <h3>SELECTED PROJECTS</h3>
            {projects.map((proj) => (
              <div key={proj.codename} className="resume-entry">
                <div className="entry-header">
                  <strong>{proj.title}</strong>
                  <span className="entry-dates">{proj.year}</span>
                </div>
                <div className="tech-tags">
                  {proj.tags.map((t) => (
                    <span key={t} className="tech-chip">{t}</span>
                  ))}
                </div>
                <p>{proj.summary}</p>
              </div>
            ))}
          </section>

          {/* Publications */}
          <section className="resume-section">
            <h3>RESEARCH & PUBLICATIONS</h3>
            {publications.map((pub) => (
              <div key={pub.id} className="resume-entry">
                <div className="entry-header">
                  <strong>{pub.title}</strong>
                  <span className="entry-dates">{pub.conference}</span>
                </div>
                <div className="pub-doi">DOI: <a href={pub.url} target="_blank" rel="noreferrer">{pub.doi}</a></div>
                <p>{pub.summary}</p>
              </div>
            ))}
          </section>

          {/* Skills */}
          <section className="resume-section">
            <h3>TECHNICAL SKILLS</h3>
            <div className="resume-skills-grid">
              {skills.map((s) => (
                <div key={s.forge} className="resume-skill-col">
                  <strong>{s.forge}:</strong>
                  <span> {s.alloys.join(', ')}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

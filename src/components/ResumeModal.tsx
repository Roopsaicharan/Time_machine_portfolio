import { useEffect, useRef } from 'react'
import { education, experience, links, projects, publications, traveler } from '../data/content'

interface ResumeModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
      // Focus modal container for accessibility
      setTimeout(() => dialogRef.current?.focus(), 50)
    }
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="resume-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-title"
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="resume-modal-dialog"
        onClick={(e) => e.stopPropagation()}
        style={{ outline: 'none' }}
      >
        <div className="resume-modal-header">
          <div>
            <h2 id="resume-title">{traveler.name}</h2>
            <p className="resume-role">{traveler.role}</p>
          </div>
          <div className="resume-header-actions" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <a
              href={traveler.resumePdfUrl}
              download="Roop_Sai_Charan_Kothamasu_Resume.pdf"
              className="print-btn"
              style={{ textDecoration: 'none', background: 'var(--cyan)', color: '#030811', fontWeight: 700 }}
              title="Download actual PDF resume"
            >
              ⬇ Download PDF
            </a>
            <button type="button" className="print-btn" onClick={() => window.print()}>
              🖨️ Print
            </button>
            <button type="button" className="close-btn" onClick={onClose} aria-label="Close resume modal">
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
                <div className="entry-subtitle">{edu.program} ({edu.gpa})</div>
                <p>{edu.notes}</p>
              </div>
            ))}
          </section>

          {/* Experience */}
          <section className="resume-section">
            <h3>EXPERIENCE & RESEARCH APPOINTMENTS</h3>
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

          {/* Selected Projects */}
          <section className="resume-section">
            <h3>SELECTED ENGINEERING SYSTEMS</h3>
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
            <h3>PEER-REVIEWED IEEE PUBLICATIONS</h3>
            {publications.map((pub) => (
              <div key={pub.id} className="resume-entry">
                <div className="entry-header">
                  <strong>{pub.title}</strong>
                  <span className="entry-dates">{pub.conference}</span>
                </div>
                <p className="pub-doi">DOI: <a href={pub.url} target="_blank" rel="noreferrer">{pub.doi}</a></p>
                <p>{pub.summary}</p>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  )
}

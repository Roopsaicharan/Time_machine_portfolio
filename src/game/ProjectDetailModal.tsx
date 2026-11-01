import { useEffect, useRef } from 'react'
import { type ProjectData } from '../data/content'
import { ProjectMiniDemo } from './ProjectMiniDemo'

interface ProjectDetailModalProps {
  project: ProjectData | null
  onClose: () => void
}

export function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (project) {
      window.addEventListener('keydown', handleKeyDown)
      setTimeout(() => modalRef.current?.focus(), 50)
    }
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [project, onClose])

  if (!project) return null

  return (
    <div
      className="project-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className="project-modal-dialog"
        onClick={(e) => e.stopPropagation()}
        style={{ outline: 'none' }}
      >
        <div className="project-modal-header" style={{ borderBottomColor: project.accent || 'var(--cyan)' }}>
          <div>
            <span className="project-modal-code" style={{ color: project.accent || 'var(--cyan)' }}>
              {project.codename} // REAL DATE: {project.year} // {project.category.toUpperCase()}
            </span>
            <h2 id="project-modal-title">{project.title}</h2>
          </div>
          <button type="button" className="close-btn" onClick={onClose} aria-label="Close project modal">
            ✕
          </button>
        </div>

        <div className="project-modal-body">
          {/* Interactive Live Sandbox Demo */}
          <div className="modal-section">
            <h4>INTERACTIVE ENGINEERING SANDBOX</h4>
            <ProjectMiniDemo projectId={project.id} />
          </div>

          {/* Deep Engineering Case Study Breakdown */}
          <div className="modal-section">
            <h4>EXECUTIVE SUMMARY</h4>
            <p className="project-modal-desc">{project.summary}</p>
          </div>

          <div className="modal-grid-two">
            <div className="modal-section-sub">
              <h5>THE ENGINEERING CHALLENGE / PROBLEM</h5>
              <p>{project.problem}</p>
            </div>
            <div className="modal-section-sub">
              <h5>MY ROLE & INDIVIDUAL CONTRIBUTION</h5>
              <p>{project.role}</p>
            </div>
          </div>

          <div className="modal-grid-two">
            <div className="modal-section-sub">
              <h5>SYSTEM ARCHITECTURE & PIPELINES</h5>
              <p>{project.architecture}</p>
            </div>
            <div className="modal-section-sub">
              <h5>TECHNICAL CHALLENGES & RESOLUTIONS</h5>
              <p>{project.challenges}</p>
            </div>
          </div>

          <div className="modal-section highlight-impact">
            <h5>VERIFIED RESULTS & MEASURABLE IMPACT</h5>
            <p style={{ color: '#2ed573', fontWeight: 500 }}>{project.impact}</p>
          </div>

          <div className="modal-section">
            <h4>TECHNOLOGY STACK</h4>
            <div className="chips">
              {project.tags.map((tag) => (
                <span key={tag} className="chip tech-badge">{tag}</span>
              ))}
            </div>
          </div>

          <div className="modal-actions" style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', alignItems: 'center' }}>
            {project.isPrivate ? (
              <span
                className="engage"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                  color: '#94a3b8',
                  cursor: 'default',
                  fontSize: '0.85rem',
                }}
              >
                🔒 {project.repoLabel || 'Institutional Research Repository'}
              </span>
            ) : project.href ? (
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="engage"
                style={{ background: 'rgba(94, 242, 255, 0.15)', borderColor: 'var(--cyan)', color: 'var(--cyan)' }}
              >
                Access Source Repository ↗
              </a>
            ) : null}

            {project.paperUrl && (
              <a
                href={project.paperUrl}
                target="_blank"
                rel="noreferrer"
                className="engage"
                style={{ background: 'rgba(255, 154, 76, 0.15)', borderColor: '#ff9a4c', color: '#ff9a4c' }}
              >
                Read Paper on IEEE Xplore ↗
              </a>
            )}

            <button type="button" className="action-btn" onClick={onClose}>
              Return to Time Machine [ESC]
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

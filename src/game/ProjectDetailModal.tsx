import { projects } from '../data/content'
import { ProjectMiniDemo } from './ProjectMiniDemo'

interface ProjectDetailModalProps {
  project: typeof projects[0] | null
  onClose: () => void
}

export function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  if (!project) return null

  return (
    <div className="project-modal-backdrop" onClick={onClose}>
      <div className="project-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="project-modal-header" style={{ borderBottomColor: project.accent || 'var(--cyan)' }}>
          <div>
            <span className="project-modal-code">{project.codename} // REAL DATE: {project.year}</span>
            <h2>{project.title}</h2>
          </div>
          <button type="button" className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="project-modal-body">
          {/* Interactive Live Sandbox Demo */}
          <div className="modal-section">
            <h4>INTERACTIVE ENGINEERING SANDBOX</h4>
            <ProjectMiniDemo projectId={project.id} />
          </div>

          {/* Structured Engineering Case Study */}
          <div className="modal-section">
            <h4>ARCHITECTURE & ENGINEERING SPECIFICATION</h4>
            <p className="project-modal-desc">{project.summary}</p>
          </div>

          <div className="modal-section">
            <h4>TECHNOLOGY STACK</h4>
            <div className="chips">
              {project.tags.map((tag) => (
                <span key={tag} className="chip tech-badge">{tag}</span>
              ))}
            </div>
          </div>

          <div className="modal-actions">
            {project.href && (
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="engage"
                style={{ background: 'rgba(94, 242, 255, 0.15)', borderColor: 'var(--cyan)', color: 'var(--cyan)' }}
              >
                Access Source Repository & Artifacts ↗
              </a>
            )}
            <button type="button" className="action-btn" onClick={onClose}>
              Return to Time Machine
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

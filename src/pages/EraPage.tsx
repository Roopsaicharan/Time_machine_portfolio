import { useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { Hud } from '../components/Hud'
import { ResumeModal } from '../components/ResumeModal'
import { useTravel } from '../context/TravelContext'
import {
  adjacentEra,
  education,
  eraById,
  experience,
  links,
  projects,
  publications,
  skills,
  traveler,
  type EraId,
} from '../data/content'

export function EraPage() {
  const { eraId } = useParams()
  const era = eraId ? eraById(eraId) : undefined
  const { jumpToEra, returnToHub, warping } = useTravel()
  const [isResumeOpen, setIsResumeOpen] = useState(false)

  if (!era) return <Navigate to="/" replace />

  const prev = adjacentEra(era.id, -1)
  const next = adjacentEra(era.id, 1)

  return (
    <main className="era" data-era={era.id}>
      <Hud left={`${era.section.toUpperCase()} // ${era.year}`} right={era.name} />
      <div className="era-shell">
        <nav className="era-nav">
          <button type="button" onClick={returnToHub} disabled={warping} className="hub-back-btn">
            🏎️ Back to 3D Rover
          </button>
          <div className="nav-group">
            <button
              type="button"
              onClick={() => setIsResumeOpen(true)}
              className="resume-pill-btn"
            >
              📄 View Resume
            </button>
            <button
              type="button"
              onClick={() => jumpToEra(prev.id)}
              disabled={warping}
            >
              ← {prev.name}
            </button>
            <button
              type="button"
              onClick={() => jumpToEra(next.id)}
              disabled={warping}
            >
              {next.name} →
            </button>
          </div>
        </nav>

        <header className="era-hero">
          <p className="eyebrow">{era.subtitle}</p>
          <h1>{era.name}</h1>
          <p className="year-line">{era.year}</p>
        </header>

        <EraBody id={era.id} onOpenResume={() => setIsResumeOpen(true)} />
      </div>

      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </main>
  )
}

function EraBody({ id, onOpenResume }: { id: EraId; onOpenResume: () => void }) {
  if (id === 'genesis') {
    return (
      <div className="panel-grid genesis-grid">
        <article className="panel">
          <h2>Traveler File</h2>
          <p className="role">{traveler.role}</p>
          <p className="bio">{traveler.bio}</p>
          <div className="traveler-meta-bar">
            <div><strong>Location:</strong> {traveler.location}</div>
            <div><strong>Status:</strong> MS CS Candidate @ University of Florida</div>
          </div>
        </article>

        <article className="panel">
          <h2>Coordinates & Intel</h2>
          <p><strong>Primary Signal:</strong> {traveler.location}</p>
          <p><strong>Objective:</strong> {traveler.lookingFor}</p>
          <div className="channels" style={{ marginTop: '1.4rem' }}>
            <a href={`mailto:${links.email}`}>Email: {links.email}</a>
            <a href={links.github} target="_blank" rel="noreferrer">GitHub</a>
            <a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </article>
      </div>
    )
  }

  if (id === 'library') {
    return (
      <div className="panel-grid">
        {education.map((item) => (
          <article className="panel" key={item.place}>
            <p className="eyebrow">{item.years}</p>
            <h2>{item.place}</h2>
            <p className="role">{item.program}</p>
            <p>{item.notes}</p>
          </article>
        ))}
      </div>
    )
  }

  if (id === 'foundry') {
    return (
      <div className="panel-grid">
        {skills.map((item) => (
          <article className="panel" key={item.forge}>
            <h2>{item.forge}</h2>
            <ul className="chips">
              {item.alloys.map((alloy) => (
                <li key={alloy}>{alloy}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    )
  }

  if (id === 'neon') {
    return (
      <div className="cabinet-grid">
        {projects.map((project) => (
          <article className="cabinet" key={project.codename}>
            <div className="cabinet-header">
              <span className="eyebrow">{project.codename}</span>
              <span className="year-line">{project.year}</span>
            </div>
            <h2>{project.title}</h2>
            <p>{project.summary}</p>
            <ul className="chips">
              {project.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
            {project.href ? (
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="engage"
                style={{ marginTop: '0.8rem', display: 'inline-block' }}
              >
                Launch Mission ↗
              </a>
            ) : (
              <p className="ghost">Local Prototype</p>
            )}
          </article>
        ))}
      </div>
    )
  }

  if (id === 'control') {
    return (
      <div className="log-list">
        {experience.map((item) => (
          <article className="log" key={item.mission}>
            <div>
              <p className="eyebrow">{item.mission}</p>
              <h2>{item.role}</h2>
              <p className="role">{item.org}</p>
            </div>
            <p className="year-line">{item.years}</p>
            <p>{item.briefing}</p>
          </article>
        ))}
      </div>
    )
  }

  if (id === 'research') {
    return (
      <div className="panel-grid">
        {publications.map((pub) => (
          <article className="panel wide" key={pub.id}>
            <p className="eyebrow">{pub.conference}</p>
            <h2>{pub.title}</h2>
            <p className="year-line">DOI / Status: {pub.doi}</p>
            <p>{pub.summary}</p>
            <div className="channels" style={{ marginTop: '0.8rem' }}>
              <a href={pub.url} target="_blank" rel="noreferrer">
                Access Publication / Source ↗
              </a>
            </div>
          </article>
        ))}
      </div>
    )
  }

  // Horizon Station (Contact)
  return (
    <div className="panel-grid">
      <article className="panel wide">
        <h2>Open Sub-space Transmission</h2>
        <p>
          The Chronos Horizon array is listening. Transmit an inquiry, review the code repositories, or connect across professional networks.
        </p>
        <div className="channels">
          <a href={`mailto:${links.email}`}>Transmit Email ({links.email})</a>
          <a href={links.github} target="_blank" rel="noreferrer">GitHub (Roopsaicharan)</a>
          <a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn Profile</a>
          <button type="button" onClick={onOpenResume} className="engage">
            Open Interactive Resume
          </button>
        </div>
      </article>
    </div>
  )
}

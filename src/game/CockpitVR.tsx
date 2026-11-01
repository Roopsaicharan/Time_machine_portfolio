import { useState } from 'react'
import { eras, traveler, links, type EraId } from '../data/content'
import { sounds } from './SoundEngine'

interface CockpitVRProps {
  onInitiateWarp: (targetEra: EraId) => void
  onOpenResume: () => void
  onSwitchToProfessional?: () => void
}

export function CockpitVR({ onInitiateWarp, onOpenResume, onSwitchToProfessional }: CockpitVRProps) {
  const [hasGreeted, setHasGreeted] = useState<boolean>(() => {
    return sessionStorage.getItem('chronos-greeted') === '1'
  })

  // Selected era index on the cockpit screen
  const [eraIndex, setEraIndex] = useState<number>(4) // default to 1985 / neon
  const selectedEra = eras[eraIndex] || eras[0]

  // Instrument console switches
  const [switches, setSwitches] = useState({
    lamp: true,
    shields: true,
    hover: true,
    cores: true,
  })

  const [leverPosition, setLeverPosition] = useState<'idle' | 'pulling' | 'pulled'>('idle')

  const handleStartExplorer = () => {
    sounds.initContext()
    sounds.playGreetingChime()
    sessionStorage.setItem('chronos-greeted', '1')
    setHasGreeted(true)
  }

  const toggleSwitch = (key: keyof typeof switches) => {
    sounds.playSwitchClick()
    setSwitches((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handlePrevEra = () => {
    sounds.playSwitchClick()
    setEraIndex((prev) => (prev - 1 + eras.length) % eras.length)
  }

  const handleNextEra = () => {
    sounds.playSwitchClick()
    setEraIndex((prev) => (prev + 1) % eras.length)
  }

  const handleSelectEra = (index: number) => {
    sounds.playSwitchClick()
    setEraIndex(index)
  }

  const handlePullLever = () => {
    if (leverPosition !== 'idle') return
    sounds.playLeverClunk()
    setLeverPosition('pulling')
    setTimeout(() => {
      setLeverPosition('pulled')
      sounds.playWarp()
    }, 200)

    window.setTimeout(() => {
      onInitiateWarp(selectedEra.id)
      setLeverPosition('idle')
    }, 650)
  }

  // ==========================================
  // PHASE 1: PREMIUM CINEMATIC SCI-FI LANDING PAGE
  // ==========================================
  if (!hasGreeted) {
    return (
      <div className="vr-greeting-container cinematic-welcome-portal">
        <div className="hologram-avatar-wrap">
          <div className="hologram-scanline" />
          <div className="temporal-portal-ring">
            <span className="holo-icon">⏳</span>
          </div>
          <div className="hologram-waves">
            <span className="wave bar1" />
            <span className="wave bar2" />
            <span className="wave bar3" />
            <span className="wave bar4" />
            <span className="wave bar5" />
          </div>
        </div>

        <div className="greeting-dialog cinematic-hero-card">
          <div className="transmission-kicker">
            <span className="live-beacon" />
            CHRONOS // TEMPORAL TRANSMISSION LINK
          </div>

          <h1 className="hero-name">{traveler.name}</h1>
          <p className="hero-tagline">{traveler.role}</p>

          <div className="hero-credentials-box">
            <div className="cred-item">
              🎓 <strong>Master&apos;s in Computer Science</strong> — University of Florida (Graduating <strong>May 2027</strong>)
            </div>
            <div className="cred-item highlight-role">
              💼 <strong>Seeking 2027 New-Graduate Software Engineering and AI/ML Opportunities</strong>
            </div>
          </div>

          <p className="greeting-speech">
            Welcome aboard the <strong>Doraemon-Class Temporal Machine</strong>. Step behind the iconic arched gooseneck lamp and wooden control console to explore 7 historical engineering destinations across time, or jump straight into the Recruiter View for 60-second access to verified case studies, architecture breakdowns, and research publications.
          </p>

          {/* Primary Action Buttons */}
          <div className="cinematic-actions-grid">
            <button
              type="button"
              className="cinematic-primary-btn"
              onClick={handleStartExplorer}
            >
              🚀 EXPLORE MY UNIVERSE — 3D MODE
            </button>

            {onSwitchToProfessional && (
              <button
                type="button"
                className="cinematic-recruiter-btn"
                onClick={() => {
                  sounds.playGreetingChime()
                  onSwitchToProfessional()
                }}
              >
                💼 QUICK RECRUITER VIEW (60-SEC)
              </button>
            )}

            <a
              href={traveler.resumePdfUrl}
              download="Roop_Sai_Charan_Kothamasu_Resume.pdf"
              className="cinematic-outline-btn"
              style={{ textDecoration: 'none' }}
            >
              ⬇ DOWNLOAD RESUME (PDF)
            </a>

            <button
              type="button"
              className="cinematic-outline-btn"
              onClick={onOpenResume}
            >
              👁️ PREVIEW RESUME
            </button>

            <a
              href={links.github}
              target="_blank"
              rel="noreferrer"
              className="cinematic-outline-btn"
            >
              🐙 GITHUB (ROOPSAICHARAN)
            </a>

            <a
              href={links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="cinematic-outline-btn"
            >
              💼 LINKEDIN
            </a>
          </div>
        </div>
      </div>
    )
  }

  // ==========================================
  // PHASE 2: 3D TIME MACHINE COCKPIT & CRT CONTROLS
  // ==========================================
  return (
    <div className={`cockpit-vr-view doraemon-cockpit ${switches.shields ? 'shields-active' : ''}`}>
      {/* Hexagonal Time Shield Visual Overlay */}
      {switches.shields && <div className="time-shield-field" />}

      {/* Windshield / Lookahead with Gooseneck Lamp & Floating Clocks */}
      <div className="cockpit-windshield doraemon-windshield">
        {/* Iconic Arched Gooseneck Lamp with Dynamic Illumination */}
        <div className={`doraemon-gooseneck-lamp ${switches.lamp ? 'is-illuminated' : 'is-dim'}`}>
          <div className="lamp-curved-stalk" />
          <div className="lamp-shade">
            <div className="lamp-bulb-glow" />
          </div>
          {switches.lamp && <div className="lamp-light-beam" />}
        </div>

        {/* Floating Clocks */}
        <div className="floating-clock-prop clock-1">
          <div className="clock-face">
            <span className="clock-hand hour" />
            <span className="clock-hand minute" />
          </div>
        </div>
        <div className="floating-clock-prop clock-2">
          <div className="clock-face">
            <span className="clock-hand hour" />
            <span className="clock-hand minute" />
          </div>
        </div>

        {/* HUD Target Lock */}
        <div className="crosshair-hud">
          <div className="crosshair-ring" />
          <div className="crosshair-data">
            DESTINATION: <strong>{selectedEra.name.toUpperCase()}</strong> // TARGET: [{selectedEra.targetYear}]
          </div>
        </div>
      </div>

      {/* Main Console Desk */}
      <div className="cockpit-dash doraemon-dash">
        {/* Left Instrument Cluster */}
        <div className="dash-cluster switches-cluster">
          <div className="cluster-header">INSTRUMENT CONSOLE</div>

          <div className="toggle-grid">
            <button
              type="button"
              className={`cockpit-switch ${switches.lamp ? 'is-armed' : ''}`}
              onClick={() => toggleSwitch('lamp')}
            >
              <span className="switch-toggle" />
              <span className="switch-label">GOOSENECK LAMP</span>
              <span className="switch-status">{switches.lamp ? 'WARM GOLD' : 'DIMMED'}</span>
            </button>

            <button
              type="button"
              className={`cockpit-switch ${switches.shields ? 'is-armed' : ''}`}
              onClick={() => toggleSwitch('shields')}
            >
              <span className="switch-toggle" />
              <span className="switch-label">TIME SHIELDS</span>
              <span className="switch-status">{switches.shields ? 'HEX ONLINE' : 'STANDBY'}</span>
            </button>

            <button
              type="button"
              className={`cockpit-switch ${switches.hover ? 'is-armed' : ''}`}
              onClick={() => toggleSwitch('hover')}
            >
              <span className="switch-toggle" />
              <span className="switch-label">HOVER ROLLERS</span>
              <span className="switch-status">{switches.hover ? 'REPULSING' : 'LOCKED'}</span>
            </button>

            <button
              type="button"
              className={`cockpit-switch ${switches.cores ? 'is-armed' : ''}`}
              onClick={() => toggleSwitch('cores')}
            >
              <span className="switch-toggle" />
              <span className="switch-label">CHRONO CORES</span>
              <span className="switch-status">{switches.cores ? 'PRIMED 1.21GW' : 'STANDBY'}</span>
            </button>
          </div>

          <div className="dash-telemetry">
            <div>TEMPORAL CORES: <strong>{switches.cores ? '8/8 SYNC' : 'CHARGING'}</strong></div>
            <div>STATUS: <strong style={{ color: '#00ff88' }}>WARP READY</strong></div>
          </div>
        </div>

        {/* Center Main Screen: BROWSE ALL ERAS IN COCKPIT SCREEN */}
        <div className="dash-cluster screen-cluster">
          <div className="main-crt-screen">
            <div className="crt-scanline-fx" />

            <div className="crt-header">
              <span className="blink-dot">●</span>
              <span>TEMPORAL VECTOR RADAR // DESTINATION PREVIEW</span>
              <span>ERA {eraIndex + 1} OF {eras.length}</span>
            </div>

            <div className="crt-body">
              {/* Previous / Next Arrow Controls */}
              <div className="crt-nav-arrows">
                <button type="button" className="crt-arrow-btn" onClick={handlePrevEra}>
                  ◀ PREV ERA
                </button>
                <span className="crt-era-index-label" style={{ color: selectedEra.color }}>
                  ORIGIN: [2027] ➔ TARGET: [{selectedEra.targetYear}]
                </span>
                <button type="button" className="crt-arrow-btn" onClick={handleNextEra}>
                  NEXT ERA ▶
                </button>
              </div>

              {/* Central Era & Featured Project Dossier */}
              <div className="crt-era-info">
                <p className="crt-sub" style={{ color: selectedEra.color }}>
                  {selectedEra.section.toUpperCase()} ERA // {selectedEra.subtitle}
                </p>
                <h3 style={{ color: '#fff' }}>{selectedEra.name}</h3>

                {/* Featured Project In This Era */}
                <div className="crt-featured-project-box">
                  <div className="project-badge-line">
                    <span className="project-kicker">FEATURED MISSION:</span>
                    <strong className="project-title-highlight">{selectedEra.featuredProject.title}</strong>
                  </div>
                  <div className="chips" style={{ margin: '0.3rem 0' }}>
                    {selectedEra.featuredProject.tags.map((t) => (
                      <span key={t} className="chip" style={{ fontSize: '0.68rem', padding: '0.1rem 0.35rem' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <p style={{ fontSize: '0.74rem', color: '#94a3b8', margin: '0.2rem 0' }}>
                    {selectedEra.featuredProject.summary.slice(0, 140)}...
                  </p>
                </div>

                <p className="crt-desc">{selectedEra.tease}</p>
              </div>

              {/* 7 Quick Era Jump Buttons */}
              <div className="crt-timeline-strip">
                {eras.map((e, idx) => (
                  <button
                    key={e.id}
                    type="button"
                    className={`crt-strip-node ${idx === eraIndex ? 'active' : ''}`}
                    onClick={() => handleSelectEra(idx)}
                    title={e.name}
                  >
                    <span>{e.shortYear}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Cockpit: PHYSICAL RED TIME TRAVEL LEVER */}
        <div className="dash-cluster lever-cluster">
          <div className="cluster-header">WARP DRIVE ENGAGEMENT</div>

          <div className="lever-mechanism-box">
            <div className="lever-housing">
              <div className="lever-slot">
                <div
                  className={`physical-time-lever ${leverPosition}`}
                  onClick={handlePullLever}
                  title="Click or pull to warp into this era!"
                >
                  <div className="lever-shaft" />
                  <div className="lever-red-knob">
                    <span className="knob-sheen" />
                  </div>
                </div>
              </div>
            </div>

            <div className="lever-instructions">
              <p className="lever-label">DORAEMON TIME LEVER</p>
              <button
                type="button"
                className="warp-engage-btn"
                onClick={handlePullLever}
                disabled={leverPosition !== 'idle'}
              >
                {leverPosition === 'idle' ? 'PULL RED LEVER ⚡' : 'WARPING...'}
              </button>
            </div>
          </div>

          <div className="cockpit-footer-actions">
            <a
              href={traveler.resumePdfUrl}
              download="Roop_Sai_Charan_Kothamasu_Resume.pdf"
              className="cockpit-aux-btn"
              style={{ textDecoration: 'none' }}
            >
              ⬇ RESUME (PDF)
            </a>
            <button type="button" className="cockpit-aux-btn" onClick={onOpenResume}>
              👁️ PREVIEW
            </button>
            {onSwitchToProfessional && (
              <button
                type="button"
                className="cockpit-aux-btn"
                onClick={onSwitchToProfessional}
              >
                💼 RECRUITER MODE
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { eras, traveler, type EraId } from '../data/content'
import { sounds } from './SoundEngine'

interface CockpitVRProps {
  onInitiateWarp: (targetEra: EraId) => void
  onOpenResume: () => void
}

export function CockpitVR({ onInitiateWarp, onOpenResume }: CockpitVRProps) {
  const [hasGreeted, setHasGreeted] = useState<boolean>(() => {
    return sessionStorage.getItem('chronos-greeted') === '1'
  })

  // Selected era index to browse through ALL eras on the cockpit screen!
  const [eraIndex, setEraIndex] = useState<number>(4) // default to 1985 / neon
  const selectedEra = eras[eraIndex] || eras[0]

  const [switches, setSwitches] = useState({
    flux: true,
    shields: true,
    stabilizers: true,
    hyperdrive: true,
  })

  const [leverPosition, setLeverPosition] = useState<'idle' | 'pulled'>('idle')

  const handleStartGreeting = () => {
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
    sounds.playLeverClunk()
    setLeverPosition('pulled')
    sounds.playWarp()

    window.setTimeout(() => {
      onInitiateWarp(selectedEra.id)
    }, 600)
  }

  // Phase 1: Holographic Greeting from Roop
  if (!hasGreeted) {
    return (
      <div className="vr-greeting-container">
        <div className="hologram-avatar-wrap">
          <div className="hologram-scanline" />
          <div className="hologram-circle">
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

        <div className="greeting-dialog">
          <p className="greeting-tag">TRANSMISSION // FROM ROOP SAI CHARAN KOTHAMASU</p>
          <h2>&quot;Greetings, Traveler!&quot;</h2>
          <p className="greeting-speech">
            Welcome aboard the <strong>Doraemon-Class Temporal Machine</strong>! You are in the pilot&apos;s seat, behind the control desk and iconic arched gooseneck lamp.
          </p>
          <p className="greeting-instructions">
            Every era across time features a unique 3D environment with trees, sky, ground, and dedicated projects.
            Use the cockpit screen to cycle through and preview all eras, then pull the red time lever to jump into history!
          </p>

          <button
            type="button"
            className="init-cockpit-btn"
            onClick={handleStartGreeting}
          >
            ENTER COCKPIT & TAKE THE CONTROLS ⚡
          </button>
        </div>
      </div>
    )
  }

  // Phase 2: Doraemon Cockpit View & CRT Screen showing ALL Eras
  return (
    <div className="cockpit-vr-view doraemon-cockpit">
      {/* Windshield / Lookahead with Gooseneck Lamp & Floating Clocks */}
      <div className="cockpit-windshield doraemon-windshield">
        <div className="doraemon-gooseneck-lamp">
          <div className="lamp-curved-stalk" />
          <div className="lamp-shade">
            <div className="lamp-bulb-glow" />
          </div>
        </div>

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

        <div className="crosshair-hud">
          <div className="crosshair-ring" />
          <div className="crosshair-data">
            DESTINATION: {selectedEra.name.toUpperCase()} // {selectedEra.year}
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
              className={`cockpit-switch ${switches.flux ? 'is-armed' : ''}`}
              onClick={() => toggleSwitch('flux')}
            >
              <span className="switch-toggle" />
              <span className="switch-label">GOOSENECK LAMP</span>
              <span className="switch-status">{switches.flux ? 'ILLUMINATED' : 'DIM'}</span>
            </button>

            <button
              type="button"
              className={`cockpit-switch ${switches.shields ? 'is-armed' : ''}`}
              onClick={() => toggleSwitch('shields')}
            >
              <span className="switch-toggle" />
              <span className="switch-label">TIME SHIELDS</span>
              <span className="switch-status">{switches.shields ? 'ONLINE' : 'OFFLINE'}</span>
            </button>

            <button
              type="button"
              className={`cockpit-switch ${switches.stabilizers ? 'is-armed' : ''}`}
              onClick={() => toggleSwitch('stabilizers')}
            >
              <span className="switch-toggle" />
              <span className="switch-label">HOVER ROLLERS</span>
              <span className="switch-status">{switches.stabilizers ? 'LOCKED' : 'DRIFTING'}</span>
            </button>

            <button
              type="button"
              className={`cockpit-switch ${switches.hyperdrive ? 'is-armed' : ''}`}
              onClick={() => toggleSwitch('hyperdrive')}
            >
              <span className="switch-toggle" />
              <span className="switch-label">CHRONO CORES</span>
              <span className="switch-status">{switches.hyperdrive ? 'PRIMED' : 'STANDBY'}</span>
            </button>
          </div>

          <div className="dash-telemetry">
            <div>FLUX: <strong>1.21 GW</strong></div>
            <div>STATUS: <strong style={{ color: '#00ff88' }}>WARP READY</strong></div>
          </div>
        </div>

        {/* Center Main Screen: BROWSE ALL ERAS IN COCKPIT SCREEN */}
        <div className="dash-cluster screen-cluster">
          <div className="main-crt-screen">
            <div className="crt-scanline-fx" />

            <div className="crt-header">
              <span className="blink-dot">●</span>
              <span>TEMPORAL VECTOR RADAR // BROWSE ALL ERAS</span>
              <span>ERA {eraIndex + 1} OF {eras.length}</span>
            </div>

            <div className="crt-body">
              {/* Previous / Next Arrow Controls */}
              <div className="crt-nav-arrows">
                <button type="button" className="crt-arrow-btn" onClick={handlePrevEra}>
                  ◀ PREV ERA
                </button>
                <span className="crt-era-index-label">
                  [{selectedEra.shortYear}] {selectedEra.year}
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
                </div>

                <p className="crt-desc">{selectedEra.tease}</p>
              </div>

              {/* All Era Selector Pills at Bottom of Screen */}
              <div className="crt-era-buttons">
                {eras.map((era, idx) => (
                  <button
                    key={era.id}
                    type="button"
                    className={`crt-era-pill ${idx === eraIndex ? 'active' : ''}`}
                    onClick={() => handleSelectEra(idx)}
                  >
                    <span>{era.shortYear}</span>
                    <small>{era.section}</small>
                  </button>
                ))}
              </div>
            </div>

            <div className="crt-footer">
              <span>PILOT: {traveler.name.toUpperCase()} (UF CS)</span>
              <button type="button" className="crt-resume-link" onClick={onOpenResume}>
                📄 VIEW RESUME
              </button>
            </div>
          </div>
        </div>

        {/* Right Instrument Cluster: Pull Lever */}
        <div className="dash-cluster lever-cluster">
          <div className="cluster-header">TEMPORAL BREACH DRIVE</div>

          <div className="lever-assembly">
            <div className="lever-track">
              <div className="lever-track-labels">
                <span>WARP</span>
                <span>ARM</span>
                <span>IDLE</span>
              </div>
              <button
                type="button"
                className={`lever-handle doraemon-lever-handle ${leverPosition === 'pulled' ? 'is-pulled' : ''}`}
                onClick={handlePullLever}
                title="Pull red lever to engage warp!"
              >
                <div className="lever-knob">
                  <span>PULL</span>
                </div>
                <div className="lever-shaft" />
              </button>
            </div>

            <button
              type="button"
              className="jump-engage-btn doraemon-jump-btn"
              onClick={handlePullLever}
            >
              ⚡ PULL RED LEVER TO WARP
            </button>
          </div>

          <div className="lever-subnote">
            Target Era: <strong>{selectedEra.name}</strong>
          </div>
        </div>
      </div>
    </div>
  )
}

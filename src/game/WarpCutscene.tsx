import { useEffect, useState } from 'react'
import { eras, type EraId } from '../data/content'

interface WarpCutsceneProps {
  targetEra: EraId
  onComplete: () => void
}

export function WarpCutscene({ targetEra, onComplete }: WarpCutsceneProps) {
  const era = eras.find((e) => e.id === targetEra) || eras[0]
  const [speed, setSpeed] = useState<number>(0)
  const [displayedYear, setDisplayedYear] = useState<string>('2027')
  const [stage, setStage] = useState<'charging' | 'hyperspace' | 'flash' | 'arrival'>('charging')
  const [reducedMotion, setReducedMotion] = useState<boolean>(false)

  // Listen for ESC key to instantly skip warp
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onComplete()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onComplete])

  useEffect(() => {
    const t1 = setTimeout(() => {
      setStage('hyperspace')
    }, 450)

    const interval = setInterval(() => {
      setSpeed((prev) => {
        if (prev >= era.cutscene.speedTarget) return era.cutscene.speedTarget
        return prev + 8
      })

      const randomYears = ['2027', '2026', '2025', '2024', '2022', '2021', '1985', '1969', era.targetYear]
      setDisplayedYear(randomYears[Math.floor(Math.random() * randomYears.length)])
    }, 60)

    const t2 = setTimeout(() => {
      clearInterval(interval)
      setDisplayedYear(era.targetYear)
      setSpeed(era.cutscene.speedTarget)
      setStage('flash')
    }, 2100)

    const t3 = setTimeout(() => {
      setStage('arrival')
      onComplete()
    }, 2750)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearInterval(interval)
    }
  }, [targetEra, onComplete, era])

  const vortexColor1 = era.cutscene.vortexColors[0]
  const vortexColor2 = era.cutscene.vortexColors[1]

  return (
    <div className={`cutscene-viewport ${stage} ${reducedMotion ? 'reduced-motion' : ''}`}>
      {/* Individual Era Customized Vortex */}
      <div
        className="hyperspace-vortex"
        style={{
          background: `
            radial-gradient(circle at center, transparent 10%, #01040a 85%),
            repeating-conic-gradient(from 0deg, ${vortexColor1} 0deg 10deg, transparent 10deg 20deg, ${vortexColor2} 20deg 30deg, transparent 30deg 40deg)
          `,
        }}
      />
      {!reducedMotion && <div className="star-streaks" />}

      {/* Skip & Accessibility Controls */}
      <div className="cutscene-controls-overlay">
        <button
          type="button"
          className="cutscene-skip-btn"
          onClick={onComplete}
          title="Skip cutscene (ESC)"
        >
          SKIP WARP [ESC] ⏭️
        </button>

        <button
          type="button"
          className="cutscene-motion-btn"
          onClick={() => setReducedMotion(!reducedMotion)}
        >
          {reducedMotion ? '🛡️ MOTION: REDUCED' : '⚡ MOTION: FULL'}
        </button>
      </div>

      {/* Screen shake container */}
      <div className={`cutscene-shake-layer ${reducedMotion ? 'no-shake' : ''}`}>
        <div className="cockpit-cutscene-frame" />

        {/* Telemetry HUD in Cutscene */}
        <div className="cutscene-hud" style={{ borderColor: era.color }}>
          <div className="hud-warning-strip">
            <span className="warning-blink">⚠ {era.cutscene.title} ⚠</span>
          </div>

          <div className="cutscene-speed-box">
            <div className="speed-huge" style={{ color: era.color, textShadow: `0 0 30px ${era.color}` }}>
              {speed}
            </div>
            <div className="speed-meta">
              <span>WARP INDEX</span>
              <span className="flux-badge">{speed >= 88 ? '1.21 GW TEMPORAL DISPLACEMENT' : 'CHARGING FLUX'}</span>
            </div>
          </div>

          <div className="cutscene-era-tracker">
            <p className="tracker-label">APPROACHING HISTORICAL DESTINATION:</p>
            <h1 className="tracker-era" style={{ color: '#fff' }}>{era.name}</h1>
            <div className="tracker-project-alert">
              FEATURED MISSION: <strong style={{ color: era.color }}>{era.featuredProject.title}</strong>
            </div>
            <div className="tracker-subtext-line">
              {era.cutscene.subtext}
            </div>
            <div className="tracker-year-display" style={{ marginTop: '0.8rem' }}>
              TEMPORAL LOCK: <span className="year-number" style={{ background: era.color, color: '#000' }}>ORIGIN: 2027 ➔ TARGET: {displayedYear}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Safe Flash */}
      {!reducedMotion && <div className="arrival-flash" />}
    </div>
  )
}

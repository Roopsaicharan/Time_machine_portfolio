import { useState } from 'react'
import { Hud } from '../components/Hud'
import { TimeDial } from '../components/TimeDial'
import { ResumeModal } from '../components/ResumeModal'
import { ProfessionalMode } from '../components/ProfessionalMode'
import { CockpitVR } from '../game/CockpitVR'
import { WarpCutscene } from '../game/WarpCutscene'
import { TimeRoverGame } from '../game/TimeRoverGame'
import { EpochAICompanion } from '../game/EpochAICompanion'
import { useTravel } from '../context/TravelContext'
import { eras, traveler, type EraId } from '../data/content'

type HubExperienceMode = 'cockpit_vr' | 'cutscene' | 'era_wander' | 'professional' | 'dial'

export function ChronosHub() {
  const { jumpToEra } = useTravel()
  const [mode, setMode] = useState<HubExperienceMode>('cockpit_vr')
  const [selectedEraId, setSelectedEraId] = useState<EraId>('neon')
  const [isResumeOpen, setIsResumeOpen] = useState(false)

  const era = eras.find((item) => item.id === selectedEraId) || eras[0]

  const handleInitiateWarp = (targetEra: EraId) => {
    setSelectedEraId(targetEra)
    setMode('cutscene')
  }

  const handleCutsceneComplete = () => {
    setMode('era_wander')
  }

  return (
    <main className="hub" data-era="hub">
      <Hud
        left={`CHRONOS // ${
          mode === 'cockpit_vr'
            ? 'PILOT COCKPIT & CONTROLS'
            : mode === 'cutscene'
              ? 'HYPERSPACE DISPLACEMENT'
              : mode === 'era_wander'
                ? `EXPLORING ${era.name.toUpperCase()} (${era.year})`
                : mode === 'professional'
                  ? 'PROFESSIONAL PORTFOLIO & CASE STUDIES'
                  : 'ORBITAL TIME DIAL'
        }`}
        right={`${traveler.name.toUpperCase()} // MS CS @ UF`}
      />

      {/* Two Modes & Navigation Bar (Section 10 UX Decision) */}
      <div className="hub-mode-toggle">
        <button
          type="button"
          className={`mode-btn ${mode === 'cockpit_vr' || mode === 'era_wander' ? 'active' : ''}`}
          onClick={() => setMode('cockpit_vr')}
        >
          🏎️ EXPLORER MODE (3D TIME MACHINE)
        </button>

        <button
          type="button"
          className={`mode-btn prof-toggle-btn ${mode === 'professional' ? 'active' : ''}`}
          onClick={() => setMode('professional')}
        >
          💼 PROFESSIONAL MODE (QUICK RECRUITER VIEW)
        </button>

        <button
          type="button"
          className={`mode-btn ${mode === 'dial' ? 'active' : ''}`}
          onClick={() => setMode('dial')}
        >
          🧭 2D DIAL
        </button>

        <button
          type="button"
          className="mode-btn resume-btn-toggle"
          onClick={() => setIsResumeOpen(true)}
        >
          📄 RESUME
        </button>
      </div>

      {/* Mode 1: Professional Mode (Instant 60-Second Recruiter Access) */}
      {mode === 'professional' && (
        <ProfessionalMode
          onSwitchTo3D={() => setMode('cockpit_vr')}
          onOpenResume={() => setIsResumeOpen(true)}
        />
      )}

      {/* Mode 2: Cockpit VR */}
      {mode === 'cockpit_vr' && (
        <CockpitVR
          onInitiateWarp={handleInitiateWarp}
          onOpenResume={() => setIsResumeOpen(true)}
          onSwitchToProfessional={() => setMode('professional')}
        />
      )}

      {/* Mode 3: Hyperspace Cutscene with Skip & Accessibility */}
      {mode === 'cutscene' && (
        <WarpCutscene
          targetEra={selectedEraId}
          onComplete={handleCutsceneComplete}
        />
      )}

      {/* Mode 4: Era Exploration (3D Surroundings & Doraemon Time Machine) */}
      {mode === 'era_wander' && (
        <TimeRoverGame
          currentEraId={selectedEraId}
          onWarpToEra={(id) => {
            setSelectedEraId(id)
            setMode('cutscene')
          }}
          onReturnToCockpit={() => setMode('cockpit_vr')}
          onOpenResume={() => setIsResumeOpen(true)}
        />
      )}

      {/* Mode 5: 2D Dial View */}
      {mode === 'dial' && (
        <section className="hub-grid">
          <div className="hub-copy">
            <p className="eyebrow">CHRONOS ARCHIVE // 2D RADAR</p>
            <h1>
              {traveler.name.split(' ')[0]}
              <span>{traveler.name.split(' ').slice(1).join(' ')}</span>
            </h1>
            <p className="lede">{traveler.tagline}</p>
            <p className="hint">
              Select an era to jump into history, launch Explorer Mode for the 3D Time Machine, or switch to Professional Mode for fast case study access.
            </p>
            <div className="hub-subactions">
              <button
                type="button"
                className="engage"
                onClick={() => setMode('cockpit_vr')}
              >
                Launch 3D Time Machine 🏎️
              </button>
              <button
                type="button"
                className="action-btn"
                onClick={() => setMode('professional')}
              >
                Professional Mode 💼
              </button>
            </div>
          </div>

          <TimeDial
            selected={selectedEraId}
            onSelect={setSelectedEraId}
            onEngage={(id) => jumpToEra(id)}
          />

          <aside className="manifest">
            <p className="eyebrow">{era.section}</p>
            <h2>{era.name}</h2>
            <p className="year-line">{era.year}</p>
            <p>{era.tease}</p>
            <button
              type="button"
              className="engage"
              onClick={() => setMode('cutscene')}
            >
              Warp to Era ⚡
            </button>
            <ol className="era-list">
              {eras.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className={item.id === selectedEraId ? 'is-on' : ''}
                    onClick={() => setSelectedEraId(item.id)}
                  >
                    <span>{item.shortYear}</span>
                    {item.name}
                  </button>
                </li>
              ))}
            </ol>
          </aside>
        </section>
      )}

      {/* Floating AI Companion EPOCH */}
      <EpochAICompanion
        onWarpToEra={(eraId) => {
          setSelectedEraId(eraId as EraId)
          setMode('cutscene')
        }}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </main>
  )
}

import { useEffect, useRef, useState, useCallback } from 'react'
import * as THREE from 'three'
import confetti from 'canvas-confetti'
import { eras, type EraId, type EraDefinition } from '../data/content'
import { sounds } from './SoundEngine'
import { ProjectDetailModal } from './ProjectDetailModal'
import { createDoraemonTimeMachine } from './DoraemonTimeMachineMesh'
import { buildEraEnvironment } from './EnvironmentBuilder'

interface TimeRoverGameProps {
  currentEraId?: EraId
  onWarpToEra: (id: EraId) => void
  onReturnToCockpit: () => void
  onOpenResume: () => void
}

interface PhysicsBox {
  mesh: THREE.Mesh
  velocity: THREE.Vector3
  rotVelocity: THREE.Vector3
}

export function TimeRoverGame({
  currentEraId = 'neon',
  onWarpToEra,
  onReturnToCockpit,
  onOpenResume,
}: TimeRoverGameProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const currentEra: EraDefinition = eras.find((e) => e.id === currentEraId) || eras[0]

  const [activeProject, setActiveProject] = useState<typeof currentEra.featuredProject | null>(null)
  const activeProjectRef = useRef<typeof currentEra.featuredProject | null>(null)
  const [selectedModalProject, setSelectedModalProject] = useState<typeof currentEra.featuredProject | null>(null)
  const [crystalsCount, setCrystalsCount] = useState<number>(0)
  const [speedDisplay, setSpeedDisplay] = useState<number>(0)
  const [isBoosting, setIsBoosting] = useState<boolean>(false)
  const [soundMuted, setSoundMuted] = useState<boolean>(sounds.getMuted())
  const [isFirstPerson, setIsFirstPerson] = useState<boolean>(true) // default to pilot chair cockpit view!
  const isFirstPersonRef = useRef<boolean>(isFirstPerson)
  useEffect(() => {
    isFirstPersonRef.current = isFirstPerson
  }, [isFirstPerson])

  // Keys ref
  const keysRef = useRef<{
    forward: boolean
    backward: boolean
    left: boolean
    right: boolean
    boost: boolean
  }>({
    forward: false,
    backward: false,
    left: false,
    right: false,
    boost: false,
  })

  // Touch controls handlers
  const handleTouchControl = useCallback((control: 'forward' | 'backward' | 'left' | 'right' | 'boost', state: boolean) => {
    keysRef.current[control] = state
    sounds.startEngine()
  }, [])

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    // Scene
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(currentEra.env.skyBottom, currentEra.env.fogDensity)

    // Camera
    const aspect = mount.clientWidth / mount.clientHeight
    const camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 1000)

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' })
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.3
    mount.appendChild(renderer.domElement)

    // Ambient & Directional Lights
    const ambientLight = new THREE.AmbientLight(currentEra.env.skyTop, 2.4)
    scene.add(ambientLight)

    const sunLight = new THREE.DirectionalLight(currentEra.env.sunColor, currentEra.env.sunIntensity)
    sunLight.position.set(45, 80, -75)
    sunLight.castShadow = true
    sunLight.shadow.mapSize.width = 2048
    sunLight.shadow.mapSize.height = 2048
    sunLight.shadow.bias = -0.0005
    scene.add(sunLight)

    // ==========================================
    // BUILD REAL SURROUNDINGS: SKY, TREES & GROUND
    // ==========================================
    const envObjects = buildEraEnvironment(currentEra, scene)
    const pavilionPos = envObjects.pavilionPosition

    // Floating Doraemon Clocks in Sky
    const floatingClocks: { mesh: THREE.Group; hourHand: THREE.Mesh; minuteHand: THREE.Mesh; speed: number }[] = []
    const clockMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 })
    const rimMat = new THREE.MeshStandardMaterial({ color: 0xffa502, metalness: 0.7 })
    const handMat = new THREE.MeshBasicMaterial({ color: 0x111111 })

    for (let i = 0; i < 6; i++) {
      const clockGroup = new THREE.Group()
      const angle = (i / 6) * Math.PI * 2
      const radius = 32 + (i % 2) * 12
      clockGroup.position.set(Math.cos(angle) * radius, 8 + (i % 3) * 2.5, Math.sin(angle) * radius)
      clockGroup.rotation.y = Math.random() * Math.PI

      const face = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.6, 0.2, 32), clockMat)
      face.rotation.x = Math.PI / 2
      clockGroup.add(face)

      const rim = new THREE.Mesh(new THREE.TorusGeometry(1.6, 0.12, 12, 32), rimMat)
      clockGroup.add(rim)

      const hourHand = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.8, 0.05), handMat)
      hourHand.position.set(0, 0.35, 0.12)
      clockGroup.add(hourHand)

      const minuteHand = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.2, 0.05), handMat)
      minuteHand.position.set(0, 0.55, 0.14)
      clockGroup.add(minuteHand)

      scene.add(clockGroup)
      floatingClocks.push({ mesh: clockGroup, hourHand, minuteHand, speed: 0.8 + Math.random() * 1.5 })
    }

    // ==========================================
    // SPAWN DORAEMON TIME MACHINE
    // ==========================================
    const doraModel = createDoraemonTimeMachine()
    const roverGroup = doraModel.group
    roverGroup.position.set(0, 0, 10)
    scene.add(roverGroup)

    // Interactive Physics Boxes / Skill Cubes
    const physicsBoxes: PhysicsBox[] = []
    currentEra.featuredProject.tags.forEach((_, idx) => {
      const boxGeo = new THREE.BoxGeometry(1.4, 1.4, 1.4)
      const boxMat = new THREE.MeshStandardMaterial({ color: 0x223652, metalness: 0.6, roughness: 0.3 })
      const box = new THREE.Mesh(boxGeo, boxMat)
      box.position.set(-6 + idx * 2.4, 0.7, -12)
      box.castShadow = true
      scene.add(box)
      physicsBoxes.push({ mesh: box, velocity: new THREE.Vector3(), rotVelocity: new THREE.Vector3() })
    })

    // Collectible Chrono Crystals
    const crystals: { mesh: THREE.Mesh; collected: boolean; pos: THREE.Vector3 }[] = []
    const crystalPositions = [
      new THREE.Vector3(10, 1.2, 0),
      new THREE.Vector3(-10, 1.2, 0),
      new THREE.Vector3(0, 1.2, 22),
      new THREE.Vector3(-16, 1.2, -8),
      new THREE.Vector3(16, 1.2, -8),
      new THREE.Vector3(18, 1.2, 14),
      new THREE.Vector3(-18, 1.2, 14),
      new THREE.Vector3(0, 1.2, -10),
    ]

    crystalPositions.forEach((pos) => {
      const cGeo = new THREE.OctahedronGeometry(0.7, 0)
      const cMat = new THREE.MeshStandardMaterial({
        color: 0x5ef2ff,
        emissive: 0x00f3ff,
        emissiveIntensity: 0.75,
        roughness: 0.1,
      })
      const cMesh = new THREE.Mesh(cGeo, cMat)
      cMesh.position.copy(pos)
      cMesh.castShadow = true
      scene.add(cMesh)
      crystals.push({ mesh: cMesh, collected: false, pos })
    })

    // Vehicle physics state
    const rover = {
      position: roverGroup.position.clone(),
      velocity: 0,
      heading: 0,
      steerAngle: 0,
      maxSpeed: 0.46,
      maxReverse: -0.22,
      acceleration: 0.016,
      braking: 0.024,
      friction: 0.965,
      turnSpeed: 0.042,
    }

    // Keyboard Listeners
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return
      }
      sounds.startEngine()
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') keysRef.current.forward = true
      if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') keysRef.current.backward = true
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keysRef.current.left = true
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keysRef.current.right = true
      if (e.key === ' ' || e.shiftKey) keysRef.current.boost = true
      if (e.key === 'v' || e.key === 'V') {
        setIsFirstPerson((prev) => !prev)
        sounds.playSwitchClick()
      }
      if (e.key === 'r' || e.key === 'R') {
        rover.position.set(0, 0, 10)
        rover.velocity = 0
        rover.heading = 0
        sounds.playBump()
      }
      if (e.key === 'e' || e.key === 'E' || e.key === 'Enter') {
        if (activeProjectRef.current) {
          setSelectedModalProject(activeProjectRef.current)
          sounds.playGreetingChime()
        }
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') keysRef.current.forward = false
      if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') keysRef.current.backward = false
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keysRef.current.left = false
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keysRef.current.right = false
      if (e.key === ' ' || !e.shiftKey) keysRef.current.boost = false
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    const handleResize = () => {
      if (!mount) return
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }
    window.addEventListener('resize', handleResize)

    // Animation Loop
    let animationFrameId: number
    const clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      const delta = clock.getDelta()
      const time = clock.getElapsedTime()
      const keys = keysRef.current

      // Rotate clocks
      floatingClocks.forEach((c) => {
        c.hourHand.rotation.z -= delta * c.speed * 0.5
        c.minuteHand.rotation.z -= delta * c.speed * 3.0
        c.mesh.position.y += Math.sin(time * 2 + c.speed) * 0.005
      })

      // Animate architectural world objects (radars, gears, energy rings)
      if (envObjects.animatedObjects) {
        envObjects.animatedObjects.forEach((obj) => obj.update(time, delta))
      }

      let currentMaxSpeed = rover.maxSpeed
      if (keys.boost) {
        currentMaxSpeed *= 1.75
        setIsBoosting(true)
      } else {
        setIsBoosting(false)
      }

      if (keys.forward) {
        rover.velocity = Math.min(rover.velocity + rover.acceleration, currentMaxSpeed)
      } else if (keys.backward) {
        rover.velocity = Math.max(rover.velocity - rover.braking, rover.maxReverse)
      } else {
        rover.velocity *= rover.friction
        if (Math.abs(rover.velocity) < 0.002) rover.velocity = 0
      }

      const steerTarget = (keys.left ? 1 : 0) - (keys.right ? 1 : 0)
      rover.steerAngle += (steerTarget * 0.5 - rover.steerAngle) * 0.2

      doraModel.frontLeftWheel.hub.rotation.y = rover.steerAngle
      doraModel.frontRightWheel.hub.rotation.y = rover.steerAngle
      doraModel.leftLever.rotation.x = rover.steerAngle * 0.8
      doraModel.rightLever.rotation.x = -rover.steerAngle * 0.8

      if (Math.abs(rover.velocity) > 0.005) {
        const reverseMod = rover.velocity > 0 ? 1 : -1
        rover.heading += rover.steerAngle * rover.turnSpeed * reverseMod
      }

      rover.position.x -= Math.sin(rover.heading) * rover.velocity
      rover.position.z -= Math.cos(rover.heading) * rover.velocity

      const maxDist = 75
      if (rover.position.length() > maxDist) {
        rover.position.clampLength(0, maxDist)
        rover.velocity = -rover.velocity * 0.5
        sounds.playBump()
      }

      roverGroup.position.copy(rover.position)
      roverGroup.rotation.y = rover.heading

      // Wheel spin
      const spinDelta = rover.velocity * 2.5
      doraModel.frontLeftWheel.tire.rotation.x += spinDelta
      doraModel.frontRightWheel.tire.rotation.x += spinDelta
      doraModel.rearLeftWheel.tire.rotation.x += spinDelta
      doraModel.rearRightWheel.tire.rotation.x += spinDelta

      // Subtle float / hover bobbing
      roverGroup.position.y = Math.sin(time * 3) * 0.06

      sounds.updateEnginePitch(Math.abs(rover.velocity) / rover.maxSpeed)
      setSpeedDisplay(Math.round(Math.abs(rover.velocity) * 160))

      // Physics box collisions
      physicsBoxes.forEach((item) => {
        const dist = rover.position.distanceTo(item.mesh.position)
        if (dist < 2.5) {
          const pushDir = new THREE.Vector3().subVectors(item.mesh.position, rover.position).normalize()
          item.velocity.addScaledVector(pushDir, Math.max(Math.abs(rover.velocity) * 1.5, 0.15))
          item.rotVelocity.set((Math.random() - 0.5) * 0.3, (Math.random() - 0.5) * 0.3, (Math.random() - 0.5) * 0.3)
          sounds.playBump()
        }
        item.mesh.position.add(item.velocity)
        item.velocity.multiplyScalar(0.92)
        item.mesh.rotation.x += item.rotVelocity.x
        item.mesh.rotation.y += item.rotVelocity.y
        item.mesh.rotation.z += item.rotVelocity.z
        item.rotVelocity.multiplyScalar(0.92)
        if (item.mesh.position.y < 0.7) item.mesh.position.y = 0.7
      })

      // Crystals
      crystals.forEach((c) => {
        if (!c.collected) {
          c.mesh.rotation.y += delta * 1.8
          c.mesh.position.y = c.pos.y + Math.sin(time * 3 + c.pos.x) * 0.25
          if (rover.position.distanceTo(c.mesh.position) < 2.2) {
            c.collected = true
            c.mesh.visible = false
            sounds.playCrystalChime()
            setCrystalsCount((prev) => {
              const next = prev + 1
              if (next === crystals.length) {
                confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } })
              }
              return next
            })
          }
        }
      })

      // Check proximity to the Era's Project Pavilion
      const distToPavilion = rover.position.distanceTo(pavilionPos)
      if (distToPavilion < 8.5) {
        activeProjectRef.current = currentEra.featuredProject
        setActiveProject(currentEra.featuredProject)
      } else {
        activeProjectRef.current = null
        setActiveProject(null)
      }

      // Camera Perspective: Pilot Seat vs 3rd Person (Decoupled from Scene Rebuild)
      if (isFirstPersonRef.current) {
        const pilotHeadPos = rover.position.clone().add(
          new THREE.Vector3(
            -Math.sin(rover.heading) * -0.4,
            2.15,
            -Math.cos(rover.heading) * -0.4
          )
        )
        camera.position.copy(pilotHeadPos)

        const lookTarget = rover.position.clone().add(
          new THREE.Vector3(
            -Math.sin(rover.heading) * 20,
            1.4,
            -Math.cos(rover.heading) * 20
          )
        )
        camera.lookAt(lookTarget)
      } else {
        const cameraOffset = new THREE.Vector3(
          -Math.sin(rover.heading) * -16,
          11,
          -Math.cos(rover.heading) * -16
        )
        const targetCamPos = rover.position.clone().add(cameraOffset)
        camera.position.lerp(targetCamPos, 0.08)
        camera.lookAt(rover.position.x, rover.position.y + 1.2, rover.position.z)
      }

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      window.removeEventListener('resize', handleResize)

      // Thorough GPU resource disposal
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          if (obj.geometry) obj.geometry.dispose()
          if (obj.material) {
            if (Array.isArray(obj.material)) {
              obj.material.forEach((m) => m.dispose())
            } else {
              obj.material.dispose()
            }
          }
        }
      })

      if (mount && renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement)
      }
      renderer.dispose()
      renderer.forceContextLoss()
    }
  }, [currentEra])

  return (
    <div className="rover-game-container">
      <div ref={mountRef} className="rover-canvas-mount" />

      {/* Pilot Seat HUD Overlay */}
      {isFirstPerson && (
        <div className="fp-windshield-overlay">
          <div className="doraemon-cockpit-banner">
            <span>DORAEMON TIME MACHINE // {currentEra.name.toUpperCase()}</span>
          </div>
          <div className="fp-dashboard-hud">
            <div className="fp-gauge">
              <span className="gauge-label">TEMPORAL SPEED</span>
              <span className="gauge-val">{speedDisplay} MPH</span>
            </div>
            <div className="fp-gauge">
              <span className="gauge-label">HISTORICAL ERA</span>
              <span className="gauge-val" style={{ color: currentEra.color }}>
                {currentEra.shortYear} ({currentEra.year})
              </span>
            </div>
            <div className="fp-gauge">
              <span className="gauge-label">FEATURED MISSION</span>
              <span className="gauge-val" style={{ color: '#fff' }}>
                {currentEra.featuredProject.codename}
              </span>
            </div>
            <div className="fp-gauge">
              <span className="gauge-label">CHRONO CORES</span>
              <span className="gauge-val">{crystalsCount}/8</span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Game HUD */}
      <div className="game-hud-overlay">
        <div className="telemetry-bar">
          <div className="telemetry-pill">
            <span className="pill-dot is-live" />
            <span className="pill-text">SURROUNDINGS: {currentEra.name}</span>
          </div>

          <div className="telemetry-pill speed-pill">
            <span className="speed-val">{speedDisplay}</span>
            <span className="speed-unit">MPH</span>
            {isBoosting && <span className="boost-badge">NITRO</span>}
          </div>

          <button
            type="button"
            className="cam-toggle-btn"
            onClick={() => {
              sounds.playSwitchClick()
              setIsFirstPerson(!isFirstPerson)
            }}
          >
            📷 {isFirstPerson ? 'SWITCH TO FULL VEHICLE [V]' : 'SWITCH TO PILOT CHAIR [V]'}
          </button>

          <button
            type="button"
            className="return-cockpit-btn"
            onClick={() => {
              sounds.playLeverClunk()
              onReturnToCockpit()
            }}
          >
            🕹️ RETURN TO COCKPIT & LEVER
          </button>

          <button
            type="button"
            className="sound-toggle-btn"
            onClick={() => setSoundMuted(sounds.toggleMute())}
          >
            {soundMuted ? '🔇 AUDIO OFF' : '🔊 AUDIO ON'}
          </button>
        </div>

        {/* Dedicated Project Card when near Pavilion */}
        {activeProject && (
          <div className="proximity-card project-card" style={{ borderColor: currentEra.color }}>
            <p className="proximity-tag" style={{ color: currentEra.color }}>
              HISTORICAL MISSION // {currentEra.year}
            </p>
            <h3>{activeProject.title}</h3>
            <p>{activeProject.summary}</p>
            <div className="chips">
              {activeProject.tags.map((t) => (
                <span key={t} className="chip">{t}</span>
              ))}
            </div>
            <div className="proximity-actions">
              <button
                type="button"
                className="action-btn warp-btn"
                style={{ background: currentEra.color, color: '#000' }}
                onClick={() => {
                  sounds.playGreetingChime()
                  setSelectedModalProject(activeProject)
                }}
              >
                🔍 INSPECT MISSION ARCHITECTURE [E]
              </button>
              {activeProject.href && (
                <a
                  href={activeProject.href}
                  target="_blank"
                  rel="noreferrer"
                  className="action-btn"
                >
                  GitHub / Paper ↗
                </a>
              )}
            </div>
          </div>
        )}

        {/* Controls Guide */}
        <div className="controls-guide">
          <p className="guide-title">CONTROLS ({currentEra.shortYear})</p>
          <div className="guide-row">
            <kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> Drive Wheels Through Era
          </div>
          <div className="guide-row">
            <kbd>V</kbd> 1st/3rd Person Cam • <kbd>SPACE</kbd> Boost • <kbd>E</kbd> Inspect Project
          </div>
        </div>

        {/* Quick Era Teleport Bar */}
        <div className="quick-eras-bar">
          <span className="quick-label">WARP TO ERA:</span>
          {eras.map((era) => (
            <button
              key={era.id}
              type="button"
              className={`quick-era-btn ${era.id === currentEra.id ? 'active' : ''}`}
              onClick={() => {
                sounds.playWarp()
                onWarpToEra(era.id)
              }}
            >
              {era.shortYear}
            </button>
          ))}
          <button
            type="button"
            className="quick-era-btn resume-btn"
            onClick={onOpenResume}
          >
            RESUME
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="mobile-controls">
          <div className="dpad-cluster">
            <button
              className="dpad-btn up"
              onPointerDown={() => handleTouchControl('forward', true)}
              onPointerUp={() => handleTouchControl('forward', false)}
              onPointerLeave={() => handleTouchControl('forward', false)}
              onPointerCancel={() => handleTouchControl('forward', false)}
            >
              ▲
            </button>
            <div className="dpad-middle">
              <button
                className="dpad-btn left"
                onPointerDown={() => handleTouchControl('left', true)}
                onPointerUp={() => handleTouchControl('left', false)}
                onPointerLeave={() => handleTouchControl('left', false)}
                onPointerCancel={() => handleTouchControl('left', false)}
              >
                ◀
              </button>
              <button
                className="dpad-btn down"
                onPointerDown={() => handleTouchControl('backward', true)}
                onPointerUp={() => handleTouchControl('backward', false)}
              >
                ▼
              </button>
              <button
                className="dpad-btn right"
                onPointerDown={() => handleTouchControl('right', true)}
                onPointerUp={() => handleTouchControl('right', false)}
                onPointerLeave={() => handleTouchControl('right', false)}
                onPointerCancel={() => handleTouchControl('right', false)}
              >
                ▶
              </button>
            </div>
          </div>

          <div className="action-cluster">
            <button
              className="mobile-action-btn boost"
              onPointerDown={() => handleTouchControl('boost', true)}
              onPointerUp={() => handleTouchControl('boost', false)}
              onPointerLeave={() => handleTouchControl('boost', false)}
              onPointerCancel={() => handleTouchControl('boost', false)}
            >
              NITRO
            </button>
          </div>
        </div>
      </div>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedModalProject}
        onClose={() => setSelectedModalProject(null)}
      />
    </div>
  )
}

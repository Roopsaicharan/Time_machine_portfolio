import * as THREE from 'three'

export interface DoraemonTimeMachineModel {
  group: THREE.Group
  frontLeftWheel: { hub: THREE.Group; tire: THREE.Mesh }
  frontRightWheel: { hub: THREE.Group; tire: THREE.Mesh }
  rearLeftWheel: { hub: THREE.Group; tire: THREE.Mesh }
  rearRightWheel: { hub: THREE.Group; tire: THREE.Mesh }
  leftLever: THREE.Mesh
  rightLever: THREE.Mesh
  lampBulb: THREE.Mesh
  lampLight: THREE.SpotLight
  chairGroup: THREE.Group
}

/**
 * Creates the iconic Doraemon-style Time Machine:
 * - Rectangular platform with rounded rim & turquoise/cyan carpet top
 * - Control desk at the front with retro dials, switches, and dual levers
 * - Iconic curved gooseneck lamp arching over the desk with glowing bulb
 * - Retro red/orange pilot armchair with armrests
 * - 4 wheels with chrome rims for rolling/driving on ground
 * - Exhaust & hover repulsors
 */
export function createDoraemonTimeMachine(): DoraemonTimeMachineModel {
  const group = new THREE.Group()

  // 1. MAIN PLATFORM / FLYING CHASSIS
  const platformWidth = 3.2
  const platformLength = 4.6
  const platformHeight = 0.35

  // Bottom chassis base (silver / metallic grey)
  const baseGeo = new THREE.BoxGeometry(platformWidth, platformHeight, platformLength)
  const baseMat = new THREE.MeshStandardMaterial({
    color: 0xd8dde6,
    metalness: 0.7,
    roughness: 0.25,
  })
  const baseMesh = new THREE.Mesh(baseGeo, baseMat)
  baseMesh.position.y = 0.55
  baseMesh.castShadow = true
  baseMesh.receiveShadow = true
  group.add(baseMesh)

  // Outer safety bumper / rim (rounded tube-like edge)
  const bumperMat = new THREE.MeshStandardMaterial({
    color: 0x99a6b8,
    metalness: 0.8,
    roughness: 0.2,
  })
  const frontBumper = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, platformWidth + 0.2, 16), bumperMat)
  frontBumper.rotation.z = Math.PI / 2
  frontBumper.position.set(0, 0.65, -platformLength / 2)
  group.add(frontBumper)

  const rearBumper = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, platformWidth + 0.2, 16), bumperMat)
  rearBumper.rotation.z = Math.PI / 2
  rearBumper.position.set(0, 0.65, platformLength / 2)
  group.add(rearBumper)

  // Carpet Mat (Iconic Doraemon turquoise / teal floor mat with yellow/gold border)
  const matGeo = new THREE.BoxGeometry(platformWidth - 0.25, 0.06, platformLength - 0.35)
  const matMat = new THREE.MeshStandardMaterial({
    color: 0x1dbbbb, // Doraemon turquoise cyan mat
    roughness: 0.6,
    metalness: 0.1,
  })
  const carpetMesh = new THREE.Mesh(matGeo, matMat)
  carpetMesh.position.y = 0.74
  carpetMesh.receiveShadow = true
  group.add(carpetMesh)

  // 2. FRONT CONTROL CONSOLE / DESK
  const deskGroup = new THREE.Group()
  deskGroup.position.set(0, 0.75, -1.35)
  group.add(deskGroup)

  // Desk Base cabinet (warm retro tone)
  const deskBaseGeo = new THREE.BoxGeometry(2.4, 0.75, 0.9)
  const deskBaseMat = new THREE.MeshStandardMaterial({
    color: 0x243447, // Sleek deep cyber-navy
    metalness: 0.5,
    roughness: 0.3,
  })
  const deskBase = new THREE.Mesh(deskBaseGeo, deskBaseMat)
  deskBase.position.y = 0.38
  deskBase.castShadow = true
  deskGroup.add(deskBase)

  // Slanted dashboard top (wood/metal panel)
  const dashTopGeo = new THREE.BoxGeometry(2.4, 0.14, 0.95)
  const dashTopMat = new THREE.MeshStandardMaterial({
    color: 0xc48246, // retro teak woodgrain trim
    roughness: 0.4,
    metalness: 0.1,
  })
  const dashTop = new THREE.Mesh(dashTopGeo, dashTopMat)
  dashTop.position.set(0, 0.78, 0)
  dashTop.rotation.x = -0.15 // slightly tilted toward pilot
  deskGroup.add(dashTop)

  // Central Speed / Temporal Coordinate Screen on the desk
  const screenGeo = new THREE.PlaneGeometry(0.9, 0.5)
  const screenMat = new THREE.MeshBasicMaterial({ color: 0x00f3ff })
  const screen = new THREE.Mesh(screenGeo, screenMat)
  screen.position.set(0, 0.88, 0.1)
  screen.rotation.x = -0.45
  deskGroup.add(screen)

  // Dashboard buttons & dials
  const buttonColors = [0xff4757, 0x2ed573, 0xffa502, 0x1e90ff]
  buttonColors.forEach((col, idx) => {
    const btnGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.08, 12)
    const btnMat = new THREE.MeshStandardMaterial({ color: col, emissive: col, emissiveIntensity: 0.5 })
    const btn = new THREE.Mesh(btnGeo, btnMat)
    btn.position.set(-0.75 + idx * 0.18, 0.88, 0.22)
    deskGroup.add(btn)
  })

  // DUAL TIME TRAVEL LEVERS (Doraemon's iconic red ball levers)
  const createLever = (x: number) => {
    const leverGroup = new THREE.Group()
    leverGroup.position.set(x, 0.85, 0.1)

    // Silver shaft
    const shaft = new THREE.Mesh(
      new THREE.CylinderGeometry(0.025, 0.025, 0.35, 8),
      new THREE.MeshStandardMaterial({ color: 0xd8dde6, metalness: 0.9 })
    )
    shaft.position.y = 0.16
    shaft.rotation.x = 0.2
    leverGroup.add(shaft)

    // Red ball knob
    const knob = new THREE.Mesh(
      new THREE.SphereGeometry(0.08, 16, 16),
      new THREE.MeshStandardMaterial({ color: 0xff3b30, roughness: 0.2, metalness: 0.2 })
    )
    knob.position.set(0, 0.32, -0.06)
    leverGroup.add(knob)

    deskGroup.add(leverGroup)
    return knob
  }

  const leftLever = createLever(0.65)
  const rightLever = createLever(0.85)

  // 3. ICONIC CURVED GOOSENECK LAMP (The unmistakable Doraemon signature!)
  const lampGroup = new THREE.Group()
  lampGroup.position.set(-0.95, 0.85, -0.15)
  deskGroup.add(lampGroup)

  // Tall arched stalk
  const stalkCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 0.8, 0),
    new THREE.Vector3(0.15, 1.35, 0.1),
    new THREE.Vector3(0.35, 1.6, 0.25),
    new THREE.Vector3(0.55, 1.5, 0.45),
  ])
  const stalkGeo = new THREE.TubeGeometry(stalkCurve, 24, 0.045, 12, false)
  const stalkMat = new THREE.MeshStandardMaterial({
    color: 0xd4af37, // warm brass / golden metal stalk
    metalness: 0.85,
    roughness: 0.2,
  })
  const stalkMesh = new THREE.Mesh(stalkGeo, stalkMat)
  stalkMesh.castShadow = true
  lampGroup.add(stalkMesh)

  // Lamp Shade & Glowing Bulb (Doraemon's round warm light)
  const shadeGeo = new THREE.ConeGeometry(0.24, 0.28, 16, 1, true)
  const shadeMat = new THREE.MeshStandardMaterial({ color: 0xffa502, metalness: 0.6, roughness: 0.3 })
  const shade = new THREE.Mesh(shadeGeo, shadeMat)
  shade.position.set(0.55, 1.48, 0.45)
  shade.rotation.x = Math.PI / 1.3
  shade.rotation.z = -0.3
  lampGroup.add(shade)

  // Glowing sphere bulb
  const bulbGeo = new THREE.SphereGeometry(0.14, 16, 16)
  const bulbMat = new THREE.MeshStandardMaterial({
    color: 0xfff0a0,
    emissive: 0xffea70,
    emissiveIntensity: 1.0,
    roughness: 0.1,
  })
  const lampBulb = new THREE.Mesh(bulbGeo, bulbMat)
  lampBulb.position.set(0.58, 1.42, 0.52)
  lampGroup.add(lampBulb)

  // Spotlight casting forward beam onto the floor
  const lampLight = new THREE.SpotLight(0xfff3ad, 3.5, 25, Math.PI / 4, 0.3)
  lampLight.position.set(0.58, 1.42, 0.52)
  lampLight.target.position.set(0, 0, -8)
  group.add(lampLight.target)
  lampGroup.add(lampLight)

  // 4. RETRO PILOT'S CHAIR (Nobita / Doraemon pilot seat)
  const chairGroup = new THREE.Group()
  chairGroup.position.set(0, 0.75, 0.35)
  group.add(chairGroup)

  // Chrome pedestal base
  const pedestalGeo = new THREE.CylinderGeometry(0.1, 0.22, 0.45, 16)
  const chromeMat = new THREE.MeshStandardMaterial({ color: 0xccd6e0, metalness: 0.9, roughness: 0.15 })
  const pedestal = new THREE.Mesh(pedestalGeo, chromeMat)
  pedestal.position.y = 0.22
  chairGroup.add(pedestal)

  // Red / Orange Cushion Seat
  const cushionMat = new THREE.MeshStandardMaterial({
    color: 0xe84118, // vibrant retro red
    roughness: 0.65,
    metalness: 0.1,
  })
  const seatCushion = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.22, 1.1), cushionMat)
  seatCushion.position.y = 0.48
  seatCushion.castShadow = true
  chairGroup.add(seatCushion)

  // Tall Backrest
  const backrest = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.1, 0.18), cushionMat)
  backrest.position.set(0, 1.05, 0.5)
  backrest.rotation.x = -0.1
  backrest.castShadow = true
  chairGroup.add(backrest)

  // Armrests
  const armrestGeo = new THREE.BoxGeometry(0.14, 0.1, 0.8)
  const leftArm = new THREE.Mesh(armrestGeo, cushionMat)
  leftArm.position.set(-0.62, 0.75, 0.1)
  chairGroup.add(leftArm)

  const rightArm = new THREE.Mesh(armrestGeo, cushionMat)
  rightArm.position.set(0.62, 0.75, 0.1)
  chairGroup.add(rightArm)

  // 5. 4 WHEELS (Allows the Time Machine to move & roll around ground!)
  const wheelGeo = new THREE.CylinderGeometry(0.48, 0.48, 0.38, 20)
  const tireMat = new THREE.MeshStandardMaterial({ color: 0x111620, roughness: 0.8 })
  const rimMat = new THREE.MeshStandardMaterial({ color: 0x00f3ff, metalness: 0.8, roughness: 0.2 })

  const createWheel = (x: number, z: number) => {
    const wheelHub = new THREE.Group()
    wheelHub.position.set(x, 0.48, z)

    const tire = new THREE.Mesh(wheelGeo, tireMat)
    tire.rotation.z = Math.PI / 2
    tire.castShadow = true
    wheelHub.add(tire)

    const hubcap = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.4, 12), rimMat)
    hubcap.rotation.z = Math.PI / 2
    wheelHub.add(hubcap)

    group.add(wheelHub)
    return { hub: wheelHub, tire }
  }

  const frontLeftWheel = createWheel(-1.55, -1.45)
  const frontRightWheel = createWheel(1.55, -1.45)
  const rearLeftWheel = createWheel(-1.55, 1.45)
  const rearRightWheel = createWheel(1.55, 1.45)

  // 6. Under-glow Repulsor Lights (Cyan / Gold hover glow)
  const underglowLight = new THREE.PointLight(0x00f3ff, 2.2, 6)
  underglowLight.position.set(0, 0.25, 0)
  group.add(underglowLight)

  return {
    group,
    frontLeftWheel,
    frontRightWheel,
    rearLeftWheel,
    rearRightWheel,
    leftLever,
    rightLever,
    lampBulb,
    lampLight,
    chairGroup,
  }
}

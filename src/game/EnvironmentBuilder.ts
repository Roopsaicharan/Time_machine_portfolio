import * as THREE from 'three'
import type { EraDefinition } from '../data/content'

export interface EraEnvironmentObjects {
  environmentGroup: THREE.Group
  pavilionPosition: THREE.Vector3
  trees: THREE.Group[]
  animatedObjects: { update: (time: number, delta: number) => void }[]
}

/**
 * Builds rich, recognizable, stylized 3D historical worlds for each Era:
 * - Handcrafted architectural structures (Skyscrapers for Neon, Clock Tower for UF, Launch Tower for Apollo, etc.)
 * - Distinctive atmosphere, lighting, terrain, and custom road networks
 * - Themed low-poly 3D foliage (synthwave palms, collegiate oaks, autumn maples, crystal pines)
 * - Central Project Showcase Pavilion with holographic display screens
 */
export function buildEraEnvironment(era: EraDefinition, scene: THREE.Scene): EraEnvironmentObjects {
  const environmentGroup = new THREE.Group()
  scene.add(environmentGroup)

  const animatedObjects: { update: (time: number, delta: number) => void }[] = []
  const { env } = era

  // 1. SKY DOME & ATMOSPHERE
  const skyGeo = new THREE.SphereGeometry(190, 32, 24)
  const skyMat = new THREE.MeshBasicMaterial({
    color: env.skyBottom,
    side: THREE.BackSide,
  })
  const skyMesh = new THREE.Mesh(skyGeo, skyMat)
  environmentGroup.add(skyMesh)

  // Upper Sky Hemisphere Gradient
  const upperSkyGeo = new THREE.SphereGeometry(185, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2.3)
  const upperSkyMat = new THREE.MeshBasicMaterial({
    color: env.skyTop,
    side: THREE.BackSide,
    transparent: true,
    opacity: 0.88,
  })
  const upperSky = new THREE.Mesh(upperSkyGeo, upperSkyMat)
  environmentGroup.add(upperSky)

  // Celestial Sun / Moon
  const sunGeo = new THREE.SphereGeometry(10, 24, 24)
  const sunMat = new THREE.MeshBasicMaterial({ color: env.sunColor })
  const sunMesh = new THREE.Mesh(sunGeo, sunMat)
  sunMesh.position.set(45, 65, -80)
  environmentGroup.add(sunMesh)

  // Sun Corona Glow
  const coronaLight = new THREE.PointLight(env.sunColor, 2.0, 180)
  coronaLight.position.copy(sunMesh.position)
  environmentGroup.add(coronaLight)

  // 2. GROUND TERRAIN & DRIVING ROAD
  const groundSize = 190
  const groundGeo = new THREE.PlaneGeometry(groundSize, groundSize, 40, 40)
  const posAttr = groundGeo.attributes.position
  for (let i = 0; i < posAttr.count; i++) {
    const x = posAttr.getX(i)
    const y = posAttr.getY(i)
    const dist = Math.sqrt(x * x + y * y)
    if (dist > 30) {
      const elevation = Math.sin(x * 0.08) * Math.cos(y * 0.08) * 3.2
      posAttr.setZ(i, Math.max(elevation, 0))
    }
  }
  groundGeo.computeVertexNormals()

  const groundMat = new THREE.MeshStandardMaterial({
    color: env.groundColor,
    roughness: 0.85,
    metalness: 0.15,
  })
  const groundMesh = new THREE.Mesh(groundGeo, groundMat)
  groundMesh.rotation.x = -Math.PI / 2
  groundMesh.receiveShadow = true
  environmentGroup.add(groundMesh)

  // Main Paved Driving Ring Road (Width: 16m to 32m)
  const roadGeo = new THREE.RingGeometry(15, 32, 64)
  const roadMat = new THREE.MeshStandardMaterial({
    color: env.pathColor,
    roughness: 0.55,
    metalness: 0.25,
  })
  const roadMesh = new THREE.Mesh(roadGeo, roadMat)
  roadMesh.rotation.x = -Math.PI / 2
  roadMesh.position.y = 0.04
  roadMesh.receiveShadow = true
  environmentGroup.add(roadMesh)

  // Glowing Road Lane Divider
  const dividerGeo = new THREE.RingGeometry(23.4, 23.6, 64)
  const dividerMat = new THREE.MeshBasicMaterial({
    color: era.color === '#5ef2ff' ? 0x00f3ff : parseInt(era.color.replace('#', '0x')),
    side: THREE.DoubleSide,
  })
  const divider = new THREE.Mesh(dividerGeo, dividerMat)
  divider.rotation.x = -Math.PI / 2
  divider.position.y = 0.05
  environmentGroup.add(divider)

  // Central Hub Plaza
  const plazaGeo = new THREE.CylinderGeometry(11, 11.5, 0.45, 32)
  const plazaMat = new THREE.MeshStandardMaterial({
    color: 0x16202c,
    roughness: 0.35,
    metalness: 0.6,
  })
  const plaza = new THREE.Mesh(plazaGeo, plazaMat)
  plaza.position.set(0, 0.22, 0)
  plaza.receiveShadow = true
  environmentGroup.add(plaza)

  // 3. ARCHITECTURAL WORLD STRUCTURES (ERA SPECIFIC)
  if (era.id === 'neon') {
    // ==========================================
    // SYNTHWAVE RETRO SKYLINE & NEON BILLBOARDS
    // ==========================================
    const buildingColors = [0x150b28, 0x1d1138, 0x0f081e]
    const neonAccentColors = [0x00f3ff, 0xff007f, 0xffb800, 0x9d00ff]

    // Cluster of skyscrapers around the outer horizon
    const buildingPositions = [
      [-55, -45, 14, 38], [-42, -60, 16, 46], [-20, -68, 12, 34], [15, -68, 18, 52], [42, -58, 14, 40],
      [58, -42, 16, 44], [65, -15, 14, 36], [62, 22, 18, 48], [48, 50, 12, 35], [-50, 45, 15, 42],
      [-64, 15, 16, 38], [-60, -18, 14, 48],
    ]

    buildingPositions.forEach(([bx, bz, bw, bh], bIdx) => {
      const bGeo = new THREE.BoxGeometry(bw, bh, bw)
      const bMat = new THREE.MeshStandardMaterial({
        color: buildingColors[bIdx % buildingColors.length],
        roughness: 0.3,
        metalness: 0.7,
      })
      const building = new THREE.Mesh(bGeo, bMat)
      building.position.set(bx, bh / 2, bz)
      building.castShadow = true
      building.receiveShadow = true
      environmentGroup.add(building)

      // Neon window grid lines
      const winGeo = new THREE.BoxGeometry(bw + 0.1, 0.4, bw + 0.1)
      const winCol = neonAccentColors[bIdx % neonAccentColors.length]
      const winMat = new THREE.MeshBasicMaterial({ color: winCol })
      for (let floor = 4; floor < bh - 4; floor += 5) {
        const winBand = new THREE.Mesh(winGeo, winMat)
        winBand.position.set(bx, floor, bz)
        environmentGroup.add(winBand)
      }

      // Roof Antenna with beacon
      const antGeo = new THREE.CylinderGeometry(0.1, 0.25, 6, 8)
      const ant = new THREE.Mesh(antGeo, new THREE.MeshBasicMaterial({ color: winCol }))
      ant.position.set(bx, bh + 3, bz)
      environmentGroup.add(ant)
    })

    // Glowing Retro Arcade Signs along the roads
    const signGeo = new THREE.BoxGeometry(8, 2.2, 0.4)
    const signMat = new THREE.MeshBasicMaterial({ color: 0xff007f })
    const sign = new THREE.Mesh(signGeo, signMat)
    sign.position.set(-24, 7, -26)
    sign.rotation.y = Math.PI / 4
    environmentGroup.add(sign)

    // Street Lamps with Cyan Point Lights
    const streetLampPositions = [
      [-18, -18], [18, -18], [-18, 18], [18, 18], [0, -25], [0, 25], [-25, 0], [25, 0],
    ]
    streetLampPositions.forEach(([lx, lz]) => {
      const pole = new THREE.Mesh(
        new THREE.CylinderGeometry(0.12, 0.16, 5, 8),
        new THREE.MeshStandardMaterial({ color: 0x221a42, metalness: 0.8 })
      )
      pole.position.set(lx, 2.5, lz)
      environmentGroup.add(pole)

      const head = new THREE.Mesh(new THREE.SphereGeometry(0.35, 12, 12), new THREE.MeshBasicMaterial({ color: 0x00f3ff }))
      head.position.set(lx, 5.1, lz)
      environmentGroup.add(head)

      const lampLight = new THREE.PointLight(0x00f3ff, 1.4, 14)
      lampLight.position.set(lx, 5, lz)
      environmentGroup.add(lampLight)
    })
  } else if (era.id === 'library') {
    // ==========================================
    // UNIVERSITY OF FLORIDA — GATOR CLOCK TOWER & BRICK ARCHES
    // ==========================================
    const towerGroup = new THREE.Group()
    towerGroup.position.set(-35, 0, -42)
    environmentGroup.add(towerGroup)

    // Brick Base (Gator Century Tower style)
    const towerBaseGeo = new THREE.BoxGeometry(8, 32, 8)
    const brickMat = new THREE.MeshStandardMaterial({ color: 0x8b3a2b, roughness: 0.85 })
    const towerBase = new THREE.Mesh(towerBaseGeo, brickMat)
    towerBase.position.y = 16
    towerBase.castShadow = true
    towerGroup.add(towerBase)

    // Upper Spire & Clock
    const spireGeo = new THREE.ConeGeometry(5.2, 10, 4)
    const spireMat = new THREE.MeshStandardMaterial({ color: 0xd35400, metalness: 0.6, roughness: 0.3 })
    const spire = new THREE.Mesh(spireGeo, spireMat)
    spire.position.y = 37
    spire.rotation.y = Math.PI / 4
    towerGroup.add(spire)

    // Glowing Clock Faces on 4 sides
    const clockMat = new THREE.MeshBasicMaterial({ color: 0xffffff })
    const clockOffsets = [
      [0, 27, 4.05], [0, 27, -4.05], [4.05, 27, 0], [-4.05, 27, 0],
    ]
    clockOffsets.forEach(([cx, cy, cz]) => {
      const cFace = new THREE.Mesh(new THREE.CircleGeometry(1.6, 24), clockMat)
      cFace.position.set(cx, cy, cz)
      if (cz !== 0) cFace.rotation.y = cz > 0 ? 0 : Math.PI
      else cFace.rotation.y = cx > 0 ? Math.PI / 2 : -Math.PI / 2
      towerGroup.add(cFace)
    })

    // UF Campus Brick Library Colonade
    const colonadeGeo = new THREE.BoxGeometry(22, 5, 4)
    const colonade = new THREE.Mesh(colonadeGeo, brickMat)
    colonade.position.set(32, 2.5, -45)
    colonade.castShadow = true
    environmentGroup.add(colonade)

    // Orange & Blue Campus Banners
    const ufBlueMat = new THREE.MeshBasicMaterial({ color: 0x0021a5 })
    const ufOrangeMat = new THREE.MeshBasicMaterial({ color: 0xfa4616 })
    for (let b = -8; b <= 8; b += 4) {
      const banner = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 3), b % 8 === 0 ? ufBlueMat : ufOrangeMat)
      banner.position.set(32 + b, 3, -42.9)
      environmentGroup.add(banner)
    }
  } else if (era.id === 'control') {
    // ==========================================
    // APOLLO MISSION CONTROL & AWS TELEMETRY LAUNCH TOWER
    // ==========================================
    const launchTower = new THREE.Group()
    launchTower.position.set(-36, 0, -42)
    environmentGroup.add(launchTower)

    // Red Lattice Launch Structure
    const towerLegMat = new THREE.MeshStandardMaterial({ color: 0xc0392b, metalness: 0.8, roughness: 0.3 })
    for (let leg = 0; leg < 4; leg++) {
      const lx = (leg % 2 === 0 ? -1 : 1) * 3
      const lz = (leg < 2 ? -1 : 1) * 3
      const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.4, 38, 8), towerLegMat)
      pillar.position.set(lx, 19, lz)
      launchTower.add(pillar)
    }

    // Horizontal Steel Girders
    for (let tier = 4; tier < 38; tier += 5) {
      const frame = new THREE.Mesh(new THREE.BoxGeometry(6.4, 0.5, 6.4), towerLegMat)
      frame.position.y = tier
      launchTower.add(frame)
    }

    // Rotating Radar Dish
    const radarDish = new THREE.Mesh(
      new THREE.SphereGeometry(3.5, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2),
      new THREE.MeshStandardMaterial({ color: 0xecf0f1, metalness: 0.9, roughness: 0.2 })
    )
    radarDish.position.set(28, 14, -38)
    radarDish.rotation.x = Math.PI / 3
    environmentGroup.add(radarDish)

    animatedObjects.push({
      update: (time) => {
        radarDish.rotation.z = time * 0.4
      },
    })
  } else if (era.id === 'foundry') {
    // ==========================================
    // CLOCKWORK STEAMPUNK GEARS & INDUSTRIAL CHIMNEYS
    // ==========================================
    const chimneyMat = new THREE.MeshStandardMaterial({ color: 0x4a3728, metalness: 0.7, roughness: 0.4 })
    const brassMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.9, roughness: 0.2 })

    // 2 Giant Smokestacks
    const chimney1 = new THREE.Mesh(new THREE.CylinderGeometry(2, 3, 24, 16), chimneyMat)
    chimney1.position.set(-38, 12, -45)
    environmentGroup.add(chimney1)

    const chimney2 = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 2.4, 18, 16), chimneyMat)
    chimney2.position.set(-28, 9, -50)
    environmentGroup.add(chimney2)

    // Rotating Brass Steampunk Gears
    const gearGeo = new THREE.TorusGeometry(4, 0.8, 12, 24)
    const gearMesh = new THREE.Mesh(gearGeo, brassMat)
    gearMesh.position.set(34, 10, -42)
    environmentGroup.add(gearMesh)

    animatedObjects.push({
      update: (time) => {
        gearMesh.rotation.z = time * 0.6
      },
    })
  } else if (era.id === 'research') {
    // ==========================================
    // TEMPORAL ASTRONOMICAL OBSERVATORY DOME
    // ==========================================
    const obsGroup = new THREE.Group()
    obsGroup.position.set(35, 0, -45)
    environmentGroup.add(obsGroup)

    const baseCyl = new THREE.Mesh(
      new THREE.CylinderGeometry(8, 8.5, 8, 24),
      new THREE.MeshStandardMaterial({ color: 0x2c3e50, metalness: 0.6, roughness: 0.3 })
    )
    baseCyl.position.y = 4
    obsGroup.add(baseCyl)

    const dome = new THREE.Mesh(
      new THREE.SphereGeometry(8, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2),
      new THREE.MeshStandardMaterial({ color: 0x7f8c8d, metalness: 0.85, roughness: 0.2 })
    )
    dome.position.y = 8
    obsGroup.add(dome)

    // Telescope Slit
    const slit = new THREE.Mesh(new THREE.BoxGeometry(2, 8.5, 9), new THREE.MeshBasicMaterial({ color: 0x050d18 }))
    slit.position.set(0, 8.5, 0)
    obsGroup.add(slit)
  } else if (era.id === 'horizon') {
    // ==========================================
    // HORIZON STATION: FUTURISTIC BIODOME & FLOATING RINGS
    // ==========================================
    const biodomeGeo = new THREE.SphereGeometry(24, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2)
    const biodomeMat = new THREE.MeshStandardMaterial({
      color: 0x5ef2ff,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    })
    const biodome = new THREE.Mesh(biodomeGeo, biodomeMat)
    biodome.position.set(0, 0, -45)
    environmentGroup.add(biodome)

    // Floating Energy Ring
    const energyRingGeo = new THREE.TorusGeometry(8, 0.4, 16, 48)
    const energyRingMat = new THREE.MeshBasicMaterial({ color: 0x00f3ff })
    const energyRing = new THREE.Mesh(energyRingGeo, energyRingMat)
    energyRing.position.set(0, 16, -45)
    environmentGroup.add(energyRing)

    animatedObjects.push({
      update: (time) => {
        energyRing.rotation.x = time * 0.5
        energyRing.rotation.y = time * 0.3
      },
    })
  } else if (era.id === 'genesis') {
    // ==========================================
    // ANCIENT STONE MONOLITHS & RUINS
    // ==========================================
    const stoneMat = new THREE.MeshStandardMaterial({ color: 0x57606f, roughness: 0.9 })
    const runeMat = new THREE.MeshBasicMaterial({ color: 0xffd18a })

    const monolithPositions = [
      [-32, -40], [-20, -50], [20, -50], [32, -40],
    ]
    monolithPositions.forEach(([mx, mz]) => {
      const obelisk = new THREE.Mesh(new THREE.BoxGeometry(2.5, 14, 2.5), stoneMat)
      obelisk.position.set(mx, 7, mz)
      obelisk.castShadow = true
      environmentGroup.add(obelisk)

      const rune = new THREE.Mesh(new THREE.BoxGeometry(2.55, 0.4, 2.55), runeMat)
      rune.position.set(mx, 8, mz)
      environmentGroup.add(rune)
    })
  }

  // 4. SURROUNDING 3D TREES & FOLIAGE
  const trees: THREE.Group[] = []
  const trunkMat = new THREE.MeshStandardMaterial({ color: env.treeTrunkColor, roughness: 0.85 })
  const foliageMat = new THREE.MeshStandardMaterial({
    color: env.treeFoliageColor,
    roughness: 0.5,
    metalness: 0.15,
  })

  const createTree = (x: number, z: number, scale: number = 1.0) => {
    const tree = new THREE.Group()
    tree.position.set(x, 0, z)
    tree.scale.set(scale, scale, scale)

    // Trunk
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.55, 3.4, 10), trunkMat)
    trunk.position.y = 1.7
    trunk.castShadow = true
    tree.add(trunk)

    if (era.id === 'neon') {
      // Synthwave Hot-Pink Palm Tree
      for (let p = 0; p < 6; p++) {
        const frondAngle = (p / 6) * Math.PI * 2
        const frond = new THREE.Mesh(new THREE.ConeGeometry(0.7, 3.4, 5), foliageMat)
        frond.position.set(Math.cos(frondAngle) * 0.9, 3.4, Math.sin(frondAngle) * 0.9)
        frond.rotation.z = 0.85
        frond.rotation.y = frondAngle
        frond.castShadow = true
        tree.add(frond)
      }
    } else {
      // Multi-layer Conical Canopy
      for (let layer = 0; layer < 3; layer++) {
        const radius = 2.4 - layer * 0.5
        const height = 1.9 - layer * 0.25
        const crown = new THREE.Mesh(new THREE.ConeGeometry(radius, height, 8), foliageMat)
        crown.position.y = 3.2 + layer * 1.3
        crown.castShadow = true
        tree.add(crown)
      }
    }

    environmentGroup.add(tree)
    trees.push(tree)
    return tree
  }

  // Tree locations around borders
  const treePositions = [
    [-38, -35], [-44, -22], [-40, 10], [-42, 35], [-25, 45],
    [38, -35], [44, -20], [42, 12], [36, 38], [22, 45],
    [-15, -45], [10, -45], [-8, 48], [12, 46],
    [-28, -6], [-24, 18], [28, -8], [26, 20],
  ]

  treePositions.forEach(([tx, tz]) => {
    const jitter = (Math.random() - 0.5) * 3
    const scale = 0.85 + Math.random() * 0.4
    createTree(tx + jitter, tz + jitter, scale)
  })

  // 5. ERA PROJECT SHOWCASE PAVILION (CENTERPIECE OF THE ERA)
  const pavilionPos = new THREE.Vector3(0, 0, -18)
  const pavilion = new THREE.Group()
  pavilion.position.copy(pavilionPos)
  environmentGroup.add(pavilion)

  // Raised platform
  const shrineBase = new THREE.Mesh(
    new THREE.BoxGeometry(8.5, 0.7, 6.5),
    new THREE.MeshStandardMaterial({ color: 0x111927, metalness: 0.8, roughness: 0.2 })
  )
  shrineBase.position.y = 0.35
  shrineBase.castShadow = true
  pavilion.add(shrineBase)

  // Glowing boundary ring
  const borderRing = new THREE.Mesh(
    new THREE.RingGeometry(4.6, 4.9, 32),
    new THREE.MeshBasicMaterial({
      color: era.color === '#5ef2ff' ? 0x00f3ff : parseInt(era.color.replace('#', '0x')),
      side: THREE.DoubleSide,
    })
  )
  borderRing.rotation.x = -Math.PI / 2
  borderRing.position.y = 0.72
  pavilion.add(borderRing)

  // Pedestal stand
  const screenStand = new THREE.Mesh(
    new THREE.CylinderGeometry(0.25, 0.25, 2.4, 16),
    new THREE.MeshStandardMaterial({ color: 0xd8dde6, metalness: 0.9 })
  )
  screenStand.position.set(0, 1.55, 0)
  pavilion.add(screenStand)

  // Holographic Screen Display
  const holoScreenGeo = new THREE.PlaneGeometry(4.2, 2.6)
  const holoScreenMat = new THREE.MeshBasicMaterial({
    color: era.color === '#5ef2ff' ? 0x00f3ff : parseInt(era.color.replace('#', '0x')),
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.85,
  })
  const holoScreen = new THREE.Mesh(holoScreenGeo, holoScreenMat)
  holoScreen.position.set(0, 3.1, 0)
  pavilion.add(holoScreen)

  // Overhead Pavilion Light
  const pLight = new THREE.PointLight(
    era.color === '#5ef2ff' ? 0x00f3ff : parseInt(era.color.replace('#', '0x')),
    3.5,
    25
  )
  pLight.position.set(0, 4.5, 0)
  pavilion.add(pLight)

  return {
    environmentGroup,
    pavilionPosition: pavilionPos,
    trees,
    animatedObjects,
  }
}

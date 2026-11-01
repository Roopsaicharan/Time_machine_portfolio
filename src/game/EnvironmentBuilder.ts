import * as THREE from 'three'
import type { EraDefinition } from '../data/content'

export interface EraEnvironmentObjects {
  environmentGroup: THREE.Group
  pavilionPosition: THREE.Vector3
  trees: THREE.Group[]
}

/**
 * Builds realistic surroundings for each Era:
 * - Beautiful custom sky hemisphere gradient
 * - Lush / themed ground terrain with paved drive paths and stone borders
 * - Low-poly styled 3D trees with foliage crowns matching the era's ecosystem
 * - Dedicated Project Shrine / Pavilion in the center of the era
 */
export function buildEraEnvironment(era: EraDefinition, scene: THREE.Scene): EraEnvironmentObjects {
  const environmentGroup = new THREE.Group()
  scene.add(environmentGroup)

  const { env } = era

  // 1. DYNAMIC SKY DOME
  const skyGeo = new THREE.SphereGeometry(180, 32, 24)
  const skyMat = new THREE.MeshBasicMaterial({
    color: env.skyBottom,
    side: THREE.BackSide,
  })
  const skyMesh = new THREE.Mesh(skyGeo, skyMat)
  environmentGroup.add(skyMesh)

  // Sky Top Gradient Ring
  const upperSkyGeo = new THREE.SphereGeometry(175, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2.5)
  const upperSkyMat = new THREE.MeshBasicMaterial({
    color: env.skyTop,
    side: THREE.BackSide,
    transparent: true,
    opacity: 0.85,
  })
  const upperSky = new THREE.Mesh(upperSkyGeo, upperSkyMat)
  environmentGroup.add(upperSky)

  // Celestial Sun / Moon
  const sunGeo = new THREE.SphereGeometry(9, 20, 20)
  const sunMat = new THREE.MeshBasicMaterial({ color: env.sunColor })
  const sunMesh = new THREE.Mesh(sunGeo, sunMat)
  sunMesh.position.set(45, 60, -75)
  environmentGroup.add(sunMesh)

  // Sun Light Corona
  const coronaLight = new THREE.PointLight(env.sunColor, 1.8, 160)
  coronaLight.position.copy(sunMesh.position)
  environmentGroup.add(coronaLight)

  // 2. REAL GROUND TERRAIN & ROADS
  const groundSize = 180
  const groundGeo = new THREE.PlaneGeometry(groundSize, groundSize, 40, 40)

  // Gentle terrain undulation around edges
  const posAttr = groundGeo.attributes.position
  for (let i = 0; i < posAttr.count; i++) {
    const x = posAttr.getX(i)
    const y = posAttr.getY(i) // in PlaneGeometry y is local z
    const distFromCenter = Math.sqrt(x * x + y * y)
    if (distFromCenter > 25) {
      // gentle hills near perimeter
      const elevation = Math.sin(x * 0.1) * Math.cos(y * 0.1) * 2.2
      posAttr.setZ(i, Math.max(elevation, 0))
    }
  }
  groundGeo.computeVertexNormals()

  const groundMat = new THREE.MeshStandardMaterial({
    color: env.groundColor,
    roughness: 0.88,
    metalness: 0.12,
  })
  const groundMesh = new THREE.Mesh(groundGeo, groundMat)
  groundMesh.rotation.x = -Math.PI / 2
  groundMesh.receiveShadow = true
  environmentGroup.add(groundMesh)

  // Paved Driving Ring (so the Time Machine drives smoothly on roads!)
  const roadGeo = new THREE.RingGeometry(14, 28, 48)
  const roadMat = new THREE.MeshStandardMaterial({
    color: env.pathColor,
    roughness: 0.6,
    metalness: 0.2,
  })
  const roadMesh = new THREE.Mesh(roadGeo, roadMat)
  roadMesh.rotation.x = -Math.PI / 2
  roadMesh.position.y = 0.03
  roadMesh.receiveShadow = true
  environmentGroup.add(roadMesh)

  // Central Hub Platform
  const plazaGeo = new THREE.CylinderGeometry(10, 10.5, 0.4, 32)
  const plazaMat = new THREE.MeshStandardMaterial({
    color: 0x1f2937,
    roughness: 0.4,
    metalness: 0.5,
  })
  const plaza = new THREE.Mesh(plazaGeo, plazaMat)
  plaza.position.set(0, 0.2, 0)
  plaza.receiveShadow = true
  environmentGroup.add(plaza)

  // 3. SURROUNDING 3D TREES
  const trees: THREE.Group[] = []
  const trunkMat = new THREE.MeshStandardMaterial({
    color: env.treeTrunkColor,
    roughness: 0.8,
  })
  const foliageMat = new THREE.MeshStandardMaterial({
    color: env.treeFoliageColor,
    roughness: 0.5,
    metalness: 0.1,
  })

  // Helper to build a styled tree
  const createTree = (x: number, z: number, scale: number = 1.0) => {
    const tree = new THREE.Group()
    tree.position.set(x, 0, z)
    tree.scale.set(scale, scale, scale)

    // Trunk
    const trunkGeo = new THREE.CylinderGeometry(0.35, 0.5, 3.2, 10)
    const trunk = new THREE.Mesh(trunkGeo, trunkMat)
    trunk.position.y = 1.6
    trunk.castShadow = true
    tree.add(trunk)

    // Foliage (Layered low-poly cones/spheres)
    if (era.id === 'neon') {
      // Synthwave Palm Tree Style!
      for (let p = 0; p < 5; p++) {
        const frondAngle = (p / 5) * Math.PI * 2
        const frondGeo = new THREE.ConeGeometry(0.7, 3.0, 5)
        const frond = new THREE.Mesh(frondGeo, foliageMat)
        frond.position.set(Math.cos(frondAngle) * 0.8, 3.2, Math.sin(frondAngle) * 0.8)
        frond.rotation.z = 0.8
        frond.rotation.y = frondAngle
        frond.castShadow = true
        tree.add(frond)
      }
    } else {
      // Classic Layered Tree Foliage
      for (let layer = 0; layer < 3; layer++) {
        const radius = 2.2 - layer * 0.45
        const height = 1.8 - layer * 0.25
        const coneGeo = new THREE.ConeGeometry(radius, height, 8)
        const crown = new THREE.Mesh(coneGeo, foliageMat)
        crown.position.y = 3.0 + layer * 1.2
        crown.castShadow = true
        tree.add(crown)
      }
    }

    environmentGroup.add(tree)
    trees.push(tree)
    return tree
  }

  // Scatter trees naturally along borders and hills
  const treePositions = [
    // Outer perimeter woods
    [-38, -35], [-44, -22], [-40, 10], [-42, 35], [-25, 45],
    [38, -35], [44, -20], [42, 12], [36, 38], [22, 45],
    [-15, -45], [10, -45], [-8, 48], [12, 46],
    // Roadside clusters
    [-30, -5], [-26, 18], [28, -8], [26, 20],
    [-18, -25], [18, -25], [-16, 28], [16, 28],
  ]

  treePositions.forEach(([tx, tz]) => {
    const jitter = (Math.random() - 0.5) * 4
    const scale = 0.85 + Math.random() * 0.45
    createTree(tx + jitter, tz + jitter, scale)
  })

  // 4. ERA PROJECT SHOWCASE PAVILION (CENTERPIECE OF THE ERA)
  const pavilionPos = new THREE.Vector3(0, 0, -18)

  const pavilion = new THREE.Group()
  pavilion.position.copy(pavilionPos)
  environmentGroup.add(pavilion)

  // Raised platform
  const shrineBase = new THREE.Mesh(
    new THREE.BoxGeometry(7, 0.6, 5),
    new THREE.MeshStandardMaterial({ color: 0x111927, metalness: 0.8, roughness: 0.2 })
  )
  shrineBase.position.y = 0.3
  shrineBase.castShadow = true
  pavilion.add(shrineBase)

  // Neon glowing border
  const borderRing = new THREE.Mesh(
    new THREE.RingGeometry(4.2, 4.4, 32),
    new THREE.MeshBasicMaterial({ color: era.env.pathColor, side: THREE.DoubleSide })
  )
  borderRing.rotation.x = -Math.PI / 2
  borderRing.position.y = 0.62
  pavilion.add(borderRing)

  // Central holographic screen for the Project
  const screenStand = new THREE.Mesh(
    new THREE.CylinderGeometry(0.2, 0.2, 2.2, 16),
    new THREE.MeshStandardMaterial({ color: 0xd8dde6, metalness: 0.9 })
  )
  screenStand.position.set(0, 1.4, 0)
  pavilion.add(screenStand)

  const holoScreenGeo = new THREE.PlaneGeometry(3.6, 2.2)
  const holoScreenMat = new THREE.MeshBasicMaterial({
    color: era.color === '#5ef2ff' ? 0x00f3ff : parseInt(era.color.replace('#', '0x')),
    side: THREE.DoubleSide,
  })
  const holoScreen = new THREE.Mesh(holoScreenGeo, holoScreenMat)
  holoScreen.position.set(0, 2.8, 0)
  pavilion.add(holoScreen)

  // Spotlight illuminating the project pavilion
  const pLight = new THREE.PointLight(parseInt(era.color.replace('#', '0x')), 3.2, 22)
  pLight.position.set(0, 4.2, 0)
  pavilion.add(pLight)

  return {
    environmentGroup,
    pavilionPosition: pavilionPos,
    trees,
  }
}

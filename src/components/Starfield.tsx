import { useEffect, useRef } from 'react'

type Star = {
  x: number
  y: number
  z: number
  pz: number
}

export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    let raf = 0
    const stars: Star[] = []
    const count = 180

    const resize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    const seed = () => {
      stars.length = 0
      for (let i = 0; i < count; i += 1) {
        stars.push({
          x: (Math.random() - 0.5) * width,
          y: (Math.random() - 0.5) * height,
          z: Math.random() * width,
          pz: 0,
        })
      }
    }

    const tick = () => {
      ctx.fillStyle = 'rgba(4, 7, 16, 0.55)'
      ctx.fillRect(0, 0, width, height)
      ctx.translate(width / 2, height / 2)

      for (const star of stars) {
        star.pz = star.z
        star.z -= 4.2
        if (star.z <= 1) {
          star.x = (Math.random() - 0.5) * width
          star.y = (Math.random() - 0.5) * height
          star.z = width
          star.pz = star.z
        }

        const k = 80
        const sx = (star.x / star.z) * k * 8
        const sy = (star.y / star.z) * k * 8
        const px = (star.x / star.pz) * k * 8
        const py = (star.y / star.pz) * k * 8
        const size = (1 - star.z / width) * 2.2

        ctx.beginPath()
        ctx.strokeStyle = `rgba(180, 230, 255, ${0.25 + (1 - star.z / width) * 0.7})`
        ctx.lineWidth = size
        ctx.moveTo(px, py)
        ctx.lineTo(sx, sy)
        ctx.stroke()
      }

      ctx.setTransform(1, 0, 0, 1, 0, 0)
      raf = requestAnimationFrame(tick)
    }

    resize()
    seed()
    tick()
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas className="starfield" ref={canvasRef} aria-hidden="true" />
}

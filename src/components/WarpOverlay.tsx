import { useTravel } from '../context/TravelContext'

export function WarpOverlay() {
  const { warping, destination } = useTravel()
  const label =
    destination === 'hub'
      ? 'RETURNING TO CHRONOS'
      : destination
        ? `JUMPING · ${destination.toUpperCase()}`
        : 'ENGAGING DRIVE'

  if (!warping) return null

  return (
    <div className="warp is-on">
      <div className="warp-tunnel" />
      <div className="warp-flash" />
      <p className="warp-label">{label}</p>
    </div>
  )
}

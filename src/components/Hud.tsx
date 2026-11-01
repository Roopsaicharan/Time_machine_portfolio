import { traveler } from '../data/content'

export function Hud({
  left,
  right,
}: {
  left?: string
  right?: string
}) {
  return (
    <header className="hud">
      <div>
        <p className="hud-kicker">VESSEL CHRONOS</p>
        <p className="hud-name">{traveler.callsign}</p>
      </div>
      <p className="hud-center">{left ?? 'TEMPORAL NAVIGATION ONLINE'}</p>
      <p className="hud-right">{right ?? traveler.location}</p>
    </header>
  )
}

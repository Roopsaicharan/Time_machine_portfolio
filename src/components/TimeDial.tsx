import { eras, type EraId } from '../data/content'

type Props = {
  selected: EraId
  onSelect: (id: EraId) => void
  onEngage: (id: EraId) => void
}

export function TimeDial({ selected, onSelect, onEngage }: Props) {
  const size = 620
  const cx = size / 2
  const cy = size / 2
  const r = 200
  const labelR = 248

  return (
    <div className="dial-wrap">
      <div className="dial-core" />
      <svg
        className="dial"
        viewBox={`0 0 ${size} ${size}`}
        role="listbox"
        aria-label="Time eras"
      >
        <circle className="dial-ring" cx={cx} cy={cy} r={r} />
        <circle className="dial-ring faint" cx={cx} cy={cy} r={r + 28} />
        <circle className="dial-ring faint" cx={cx} cy={cy} r={r - 42} />
        {eras.map((era, index) => {
          const angle = (index / eras.length) * Math.PI * 2 - Math.PI / 2
          const x = cx + Math.cos(angle) * r
          const y = cy + Math.sin(angle) * r
          const lx = cx + Math.cos(angle) * labelR
          const ly = cy + Math.sin(angle) * labelR
          const active = era.id === selected
          return (
            <g key={era.id} className={active ? 'node is-active' : 'node'}>
              <line
                className="spoke"
                x1={cx}
                y1={cy}
                x2={x}
                y2={y}
              />
              <circle
                cx={x}
                cy={y}
                r={active ? 16 : 10}
                role="option"
                aria-label={era.name}
                aria-selected={active}
                tabIndex={0}
                onClick={() => onSelect(era.id)}
                onDoubleClick={() => onEngage(era.id)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    onEngage(era.id)
                  }
                }}
              />
              <text x={lx} y={ly + 4} textAnchor="middle">
                {era.shortYear}
              </text>
            </g>
          )
        })}
      </svg>
      <div className="dial-readout">
        <p className="dial-year">{eras.find((e) => e.id === selected)?.year}</p>
        <p className="dial-era">{eras.find((e) => e.id === selected)?.name}</p>
      </div>
    </div>
  )
}

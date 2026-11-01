import {
  createContext,
  use,
  useCallback,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { useNavigate } from 'react-router-dom'
import type { EraId } from '../data/content'

type TravelContextValue = {
  warping: boolean
  destination: EraId | 'hub' | null
  jumpToEra: (id: EraId) => void
  returnToHub: () => void
}

const TravelContext = createContext<TravelContextValue | null>(null)

export function TravelProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const [warping, setWarping] = useState(false)
  const [destination, setDestination] = useState<EraId | 'hub' | null>(null)
  const lock = useRef(false)

  const warp = useCallback(
    (path: string, dest: EraId | 'hub') => {
      if (lock.current) return
      lock.current = true
      setDestination(dest)
      setWarping(true)
      window.setTimeout(() => {
        navigate(path)
      }, 720)
      window.setTimeout(() => {
        setWarping(false)
        setDestination(null)
        lock.current = false
      }, 1480)
    },
    [navigate],
  )

  const jumpToEra = useCallback(
    (id: EraId) => warp(`/era/${id}`, id),
    [warp],
  )

  const returnToHub = useCallback(() => warp('/', 'hub'), [warp])

  const value = useMemo(
    () => ({ warping, destination, jumpToEra, returnToHub }),
    [warping, destination, jumpToEra, returnToHub],
  )

  return <TravelContext value={value}>{children}</TravelContext>
}

export function useTravel() {
  const ctx = use(TravelContext)
  if (!ctx) throw new Error('useTravel must be used inside TravelProvider')
  return ctx
}

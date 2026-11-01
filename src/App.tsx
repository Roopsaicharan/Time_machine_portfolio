import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Scanlines } from './components/Scanlines'
import { Starfield } from './components/Starfield'
import { WarpOverlay } from './components/WarpOverlay'
import { TravelProvider } from './context/TravelContext'
import { ChronosHub } from './pages/ChronosHub'
import { EraPage } from './pages/EraPage'

export default function App() {
  return (
    <BrowserRouter>
      <TravelProvider>
        <Starfield />
        <Scanlines />
        <WarpOverlay />
        <Routes>
          <Route path="/" element={<ChronosHub />} />
          <Route path="/era/:eraId" element={<EraPage />} />
        </Routes>
      </TravelProvider>
    </BrowserRouter>
  )
}

import { Route, Routes } from 'react-router-dom'
import TopNav from './components/TopNav'
import Contact from './pages/Contact'
import Home from './pages/Home'
import Impact from './pages/Impact'
import Product from './pages/Product'
import Simulator from './pages/Simulator'
import Team from './pages/Team'
import Technology from './pages/Technology'

const DebugFallback = () => (
  <div className="p-6 text-sm text-white">DebugFallback Rendered</div>
)

function App() {
  return (
    <div className="min-h-screen bg-slate-950">
      <TopNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/technology" element={<Technology />} />
        <Route path="/simulator" element={<Simulator />} />
        <Route path="/impact" element={<Impact />} />
        <Route path="/team" element={<Team />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<DebugFallback />} />
      </Routes>
    </div>
  )
}

export default App

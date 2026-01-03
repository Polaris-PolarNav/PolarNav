import { NavLink } from 'react-router-dom'

const navItems = [
  { label: 'Product', to: '/product' },
  { label: 'Technology', to: '/technology' },
  { label: 'Simulator', to: '/simulator' },
  { label: 'Impact', to: '/impact' },
  { label: 'Team', to: '/team' },
  { label: 'Contact', to: '/contact' },
]

const linkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'text-xs uppercase tracking-[0.24em] transition',
    isActive ? 'text-white' : 'text-white/70 hover:text-white',
  ].join(' ')

const TopNav = () => {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <NavLink
          to="/"
          className="text-lg font-semibold uppercase tracking-[0.3em] text-white"
        >
          PolarNav
        </NavLink>
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <NavLink
          to="/simulator"
          className="rounded-full border border-white/30 px-4 py-2 text-xs uppercase tracking-[0.24em] text-white transition hover:border-white"
        >
          Run Simulation
        </NavLink>
      </div>
    </header>
  )
}

export default TopNav

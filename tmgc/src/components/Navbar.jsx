import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

const links = [
  { path: '/home', label: 'HOME' },
  { path: '/about', label: 'ABOUT' },
  { path: '/member', label: 'CADRE' },
  { path: '/activity', label: 'ACTIVITY' },
  { path: '/contact', label: 'CONTACT' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  return (
    <div id="top" className="top">
      <button
        id="menuBtn"
        className="menu-toggle"
        onClick={() => setOpen(o => !o)}
        aria-label="切換選單"
      >
        {open ? '⊗' : '☰'}
      </button>

      <nav className={`menu-links${open ? ' active' : ''}`} id="menuLinks">
        <br /><br /><br />
        {links.map(l => (
          <Link
            key={l.path}
            to={l.path}
            className={`mycount${location.pathname === l.path ? ' active' : ''}`}
            onClick={() => setOpen(false)}
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}

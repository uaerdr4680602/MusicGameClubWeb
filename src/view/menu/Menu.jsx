import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ConfigProvider, Drawer } from 'antd'
import { DEFAULT_MASTER_VOLUME } from '../../audioSettings'
import './Menu.css'

const links = [
  { path: '/home', label: 'HOME' },
  { path: '/about', label: 'ABOUT' },
  { path: '/member', label: 'MEMBER' },
  { path: '/activity', label: 'ACTIVITY' },
  { path: '/contact', label: 'CONTACT' },
  { path: '/game', label: 'GAME' },
]

const drawerStyles = {
  mask: {
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  wrapper: {
    background: 'transparent',
    boxShadow: 'none',
    height: '100dvh',
    pointerEvents: 'none',
  },
  section: {
    background: 'transparent',
    boxShadow: 'none',
    pointerEvents: 'none',
  },
  header: {
    display: 'none',
  },
  body: {
    background: 'transparent',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    gap: '12px',
  },
}

export default function Menu() {
  const [open, setOpen] = useState(false)
  const [volume, setVolume] = useState(() => {
    const saved = Number(localStorage.getItem('masterVolume'))
    return Number.isFinite(saved) ? saved : DEFAULT_MASTER_VOLUME
  })
  const location = useLocation()

  function handleVolumeChange(event) {
    const nextVolume = Number(event.target.value)
    setVolume(nextVolume)
    localStorage.setItem('masterVolume', String(nextVolume))
    window.dispatchEvent(new CustomEvent('master-volume-change', { detail: nextVolume }))
  }

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

      <ConfigProvider
        theme={{
          components: {
            Drawer: {
              colorBgElevated: 'transparent',
            },
          },
        }}
      >
        <Drawer
          placement="top"
          open={open}
          onClose={() => setOpen(false)}
          styles={drawerStyles}
          closable={false}
          zIndex={100000}
        >
          <div className="menu-overlay-area">
            <div
              className="menu-links-container"
              style={{ pointerEvents: 'auto' }}
            >
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
              <div className={`volume-control${volume === 1 ? ' full' : ''}`}>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  aria-label="全域音量"
                  style={{ '--volume': `${volume * 100}%` }}
                />
                <span>{Math.round(volume * 100)}%</span>
              </div>
            </div>
          </div>
        </Drawer>
      </ConfigProvider>
    </div>
  )
}

import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './IndexPage.css'

const lines = [
  '若你願意，請跨越門檻',
  '在此之後，你所踏入的，不再只是遊戲',
  '而是一場',
  '以「音」為名的試煉',
]

export default function IndexPage() {
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)
  const [preloaderHidden, setPreloaderHidden] = useState(false)
  const skipped = useRef(false)

  useEffect(() => {
    let index = 0
    let timeouts = []

    function showLine() {
      if (skipped.current) return
      if (index >= lines.length) {
        const t = setTimeout(() => {
          if (!skipped.current) endPreloader()
        }, 500)
        timeouts.push(t)
        return
      }

      const lineEl = document.getElementById(`line-${index}`)
      if (lineEl) lineEl.style.opacity = 1

      const t1 = setTimeout(() => {
        if (lineEl) lineEl.style.opacity = 0
        if (index === lines.length - 1) {
          const preloader = document.getElementById('preloader')
          if (preloader) preloader.classList.add('white-bg')
        }
        const t2 = setTimeout(() => {
          index++
          showLine()
        }, 500)
        timeouts.push(t2)
      }, 2000)
      timeouts.push(t1)
    }

    showLine()

    return () => timeouts.forEach(clearTimeout)
  }, [])

  function endPreloader() {
    skipped.current = true
    const preloader = document.getElementById('preloader')
    if (preloader) preloader.classList.add('hidden')
    setVisible(true)
    setTimeout(() => setPreloaderHidden(true), 1000)
  }

  return (
    <>
      {!preloaderHidden && (
        <div id="preloader" className="preloader">
          {lines.map((text, i) => (
            <div key={i} className="loading-text" id={`line-${i}`}>
              {text}
            </div>
          ))}
          <button className="skip-btn" onClick={endPreloader}>SKIP</button>
        </div>
      )}

      <div id="main-content" className="main-content" style={{ visibility: visible ? 'visible' : 'hidden' }}>
        <img src="/img/girl.gif" className="left-img float-girl" alt="" />
        <img src="/img/wolf.gif" className="right-img float-wolf" alt="" />
        <img src="/img/butterfly.gif" className="center-img" style={{ opacity: 0.7 }} alt="" />
        <img src="/img/mg.png" className="center-img" alt="TMGC logo" />
        <button
          className="enter-btn"
          onClick={() => navigate('/home')}
        >
          進入社團
        </button>
      </div>
    </>
  )
}

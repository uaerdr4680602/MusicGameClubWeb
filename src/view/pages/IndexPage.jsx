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
  const [transitioning, setTransitioning] = useState(false)
  const [started, setStarted] = useState(false)
  const skipped = useRef(false)
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    function handleTimeUpdate() {
      if (!audio) return
      const cur = audio.currentTime

      // cur 秒
      // Fade-in
      if (cur >= 8 && cur < 11) {
        const progress = (cur - 8) / 3
        audio.volume = Math.min(1, Math.max(0, progress))
      }
      // Normal volume
      else if (cur >= 11 && cur < 60) {
        if (audio.volume !== 1) audio.volume = 1
      }
      // Fade-out
      else if (cur >= 60 && cur < 63) {
        const remaining = (63 - cur) / 3
        audio.volume = Math.min(1, Math.max(0, remaining))
      }
      // Stop
      else if (cur >= 63) {
        audio.pause()
        audio.volume = 0
      }
    }

    audio.addEventListener('timeupdate', handleTimeUpdate)

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [])

  function handleStart() {
    if (audioRef.current) {
      audioRef.current.currentTime = 8
      audioRef.current.volume = 0
      audioRef.current.play().catch(() => { })
    }
    setStarted(true)
  }

  useEffect(() => {
    if (!started) return
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
      if (lineEl) lineEl.style.opacity = '1'

      const t1 = setTimeout(() => {
        if (lineEl) lineEl.style.opacity = '0'
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

    const initialDelay = setTimeout(() => {
      showLine()
    }, 800)
    timeouts.push(initialDelay)

    return () => timeouts.forEach(clearTimeout)
  }, [started])

  function endPreloader() {
    skipped.current = true
    const preloader = document.getElementById('preloader')
    if (preloader) preloader.classList.add('hidden')
    setVisible(true)
    setTimeout(() => setPreloaderHidden(true), 1000)
  }

  function enterSite() {
    setTransitioning(true)
    if (audioRef.current) {
      const audio = audioRef.current
      const startVol = audio.volume
      let step = 0
      const fadeTimer = setInterval(() => {
        step += 1
        if (audio && step <= 10) {
          audio.volume = Math.max(0, startVol * (1 - step / 10))
        } else {
          clearInterval(fadeTimer)
          if (audio) audio.pause()
        }
      }, 100)
    }
    setTimeout(() => navigate('/home'), 1200)
  }
  return (
    <>
      <audio ref={audioRef} src="/bgm/op.mp3" preload="auto" />

      {!preloaderHidden && (
        <div id="preloader" className="preloader">
          {!started ? (
            <button className="tap-start-btn" onClick={handleStart}>
              TAP TO START
            </button>
          ) : (
            <>
              {lines.map((text, i) => (
                <div key={i} className="loading-text" id={`line-${i}`}>
                  {text}
                </div>
              ))}
              <button className="skip-btn" onClick={endPreloader}>SKIP</button>
            </>
          )}
        </div>
      )}

      <div id="main-content" className="main-content" style={{ visibility: visible ? 'visible' : 'hidden' }}>
        <img src="/img/girl.gif" className="left-img float-girl" alt="" />
        <img src="/img/wolf.gif" className="right-img float-wolf" alt="" />
        <img src="/img/butterfly.gif" className="center-img" style={{ opacity: 0.7 }} alt="" />
        <img src="/img/mg.png" className="center-img" alt="TMGC logo" />
        <button
          className="enter-btn"
          onClick={enterSite}
        >
          進入社團
        </button>
      </div>

      {/* Transition overlay */}
      <div className={`transition-overlay${transitioning ? ' active' : ''}`} />
    </>
  )
}

import { useEffect, useRef, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { BorderOutlined } from '@ant-design/icons'
import IndexPage from './view/pages/IndexPage'
import HomePage from './view/pages/HomePage'
import AboutPage from './view/pages/AboutPage'
import MemberPage from './view/pages/MemberPage'
import ActivityPage from './view/pages/ActivityPage'
import ContactPage from './view/pages/ContactPage'

// 鼠標
function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [isClicking, setIsClicking] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // 檢測是否為行動裝置或觸控螢幕
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window
    if (isTouchDevice) return

    function handleMouseMove(e) {
      setPos({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)

      const target = e.target
      if (target) {
        const isInteractive = target.closest('a, button, input, select, textarea, [role="button"], .interactive, svg, iframe')
        setIsHovered(!!isInteractive)
      }
    }

    function handleMouseDown() {
      setIsClicking(true)
    }

    function handleMouseUp() {
      setIsClicking(false)
    }

    function handleMouseLeave() {
      setIsVisible(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <div
      className={`custom-cursor ${isHovered ? 'hovered' : ''} ${isClicking ? 'clicking' : ''}`}
      style={{ left: pos.x, top: pos.y }}
    >
      <BorderOutlined />
    </div>
  )
}

// bgm.mp3
function BgmPlayer() {
  const location = useLocation()
  const bgmRef = useRef(null)
  const fadeTimerRef = useRef(null)
  const loopCheckTimerRef = useRef(null)

  useEffect(() => {
    if (!bgmRef.current) {
      const audio = new Audio('/bgm/bgm.mp3')
      audio.loop = false
      audio.volume = 0
      bgmRef.current = audio
    }

    const bgm = bgmRef.current
    const TARGET_VOL = 0.25
    const FADE_DURATION = 1000 // 淡入淡出時間 1 秒
    const INTERVAL_MS = 10 // 每 10 毫秒更新音量
    const totalSteps = FADE_DURATION / INTERVAL_MS

    // 音量淡入
    function fadeIn() {
      if (fadeTimerRef.current) clearInterval(fadeTimerRef.current)
      if (bgm.paused) {
        bgm.volume = 0
        bgm.play().catch(() => {
          const resumeAudio = () => {
            if (location.pathname !== '/' && bgm.paused) {
              fadeIn()
            }
            window.removeEventListener('click', resumeAudio)
          }
          window.addEventListener('click', resumeAudio)
        })
      }
      const stepAmount = TARGET_VOL / totalSteps
      fadeTimerRef.current = setInterval(() => {
        if (bgm.volume + stepAmount < TARGET_VOL) {
          bgm.volume += stepAmount
        } else {
          bgm.volume = TARGET_VOL
          clearInterval(fadeTimerRef.current)
        }
      }, INTERVAL_MS)
    }

    // 音量淡出
    function fadeOut(onComplete) {
      if (fadeTimerRef.current) clearInterval(fadeTimerRef.current)
      const startVol = bgm.volume
      if (startVol <= 0 || bgm.paused) {
        if (onComplete) onComplete()
        return
      }
      const stepAmount = startVol / totalSteps
      fadeTimerRef.current = setInterval(() => {
        if (bgm.volume - stepAmount > 0.001) {
          bgm.volume -= stepAmount
        } else {
          bgm.volume = 0
          clearInterval(fadeTimerRef.current)
          if (onComplete) onComplete()
        }
      }, INTERVAL_MS)
    }

    // 檢查音樂是否即將結束
    if (loopCheckTimerRef.current) clearInterval(loopCheckTimerRef.current)
    let isFadingLoop = false

    loopCheckTimerRef.current = setInterval(() => {
      if (location.pathname === '/' || !bgm || bgm.paused || !bgm.duration) return
      const remainingTime = bgm.duration - bgm.currentTime
      if (remainingTime <= 2 && !isFadingLoop) {
        isFadingLoop = true
        fadeOut(() => {
          if (location.pathname !== '/') {
            bgm.currentTime = 0
            isFadingLoop = false
            fadeIn()
          } else {
            bgm.pause()
            bgm.currentTime = 0
            isFadingLoop = false
          }
        })
      }
    }, 100)

    // 切換頁面時的播放邏輯
    if (location.pathname === '/') {
      fadeOut(() => {
        bgm.pause()
        bgm.currentTime = 0
      })
    } else {
      if (bgm.paused || bgm.volume < TARGET_VOL) {
        fadeIn()
      }
    }

    return () => {
      if (loopCheckTimerRef.current) clearInterval(loopCheckTimerRef.current)
    }
  }, [location.pathname])

  return null
}

export default function App() {
  // 全域防護：禁用右鍵選單 (contextmenu) 與圖片拖曳 (dragstart)
  useEffect(() => {
    function handleGlobalClick() {
      try {
        const sound = new Audio('/bgm/click.mp3')
        sound.volume = 0.1
        sound.play().catch(() => { })
      } catch {
        // ignore
      }
    }

    function handleContextMenu(e) {
      e.preventDefault()
    }

    function handleDragStart(e) {
      if (e.target && e.target.tagName === 'IMG') {
        e.preventDefault()
      }
    }

    window.addEventListener('click', handleGlobalClick, true)
    window.addEventListener('contextmenu', handleContextMenu, true)
    window.addEventListener('dragstart', handleDragStart, true)

    return () => {
      window.removeEventListener('click', handleGlobalClick, true)
      window.removeEventListener('contextmenu', handleContextMenu, true)
      window.removeEventListener('dragstart', handleDragStart, true)
    }
  }, [])

  return (
    <BrowserRouter>
      <CustomCursor />
      <BgmPlayer />
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/member" element={<MemberPage />} />
        <Route path="/activity" element={<ActivityPage />} />
        <Route path="/contact" element={<ContactPage />} />
        {/* 404 頁面自動轉向首頁 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

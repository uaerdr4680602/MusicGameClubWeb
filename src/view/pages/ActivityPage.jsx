import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel } from 'antd'
import Menu from '../menu/Menu'
import activities from '../../json/activities.json'
import './ActivityPage.css'

function PrevArrow({ onClick }) {
  return (
    <button className="carousel-arrow carousel-arrow-prev" onClick={onClick} aria-label="上一張">
      &#10094;
    </button>
  )
}

function NextArrow({ onClick }) {
  return (
    <button className="carousel-arrow carousel-arrow-next" onClick={onClick} aria-label="下一張">
      &#10095;
    </button>
  )
}

export default function ActivityPage() {
  const semesters = Array.from(new Set(activities.map(a => a.semester || '114-1')))
  const [selectedSemester, setSelectedSemester] = useState(null)
  const [focusedIndex, setFocusedIndex] = useState(0)
  const [activeId, setActiveId] = useState(null)
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 768)
  const [mobileCenterOffset, setMobileCenterOffset] = useState(120)
  const viewportRef = useRef(null)
  const touchStartY = useRef(0)
  const wheelTimeout = useRef(null)

  useEffect(() => {
    const updateMetrics = () => {
      const isMob = window.innerWidth <= 768
      setIsMobile(isMob)
      if (isMob && viewportRef.current) {
        const rect = viewportRef.current.getBoundingClientRect()
        const calculatedOffset = window.innerHeight / 2 - rect.top - 30
        setMobileCenterOffset(calculatedOffset)
      }
    }

    updateMetrics()
    const timer = setTimeout(updateMetrics, 50)
    window.addEventListener('resize', updateMetrics)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', updateMetrics)
    }
  }, [focusedIndex])

  const centerOffset = isMobile ? mobileCenterOffset : 274
  const stepHeight = isMobile ? 88 : 102

  const handlePrev = () => {
    setFocusedIndex(prev => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setFocusedIndex(prev => Math.min(semesters.length - 1, prev + 1))
  }

  const handleTouchStart = e => {
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchEnd = e => {
    const touchEndY = e.changedTouches[0].clientY
    const deltaY = touchStartY.current - touchEndY
    if (Math.abs(deltaY) > 25) {
      if (deltaY > 0) {
        handleNext()
      } else {
        handlePrev()
      }
    }
  }

  const handleWheel = e => {
    if (wheelTimeout.current) return
    if (Math.abs(e.deltaY) > 15) {
      if (e.deltaY > 0) {
        handleNext()
      } else {
        handlePrev()
      }
      wheelTimeout.current = setTimeout(() => {
        wheelTimeout.current = null
      }, 250)
    }
  }

  const handleSelectSemester = sem => {
    setSelectedSemester(sem)
    const firstInSem = activities.find(a => (a.semester || '113-1') === sem)
    if (firstInSem) {
      setActiveId(firstInSem.id)
    }
  }

  const filteredActivities = selectedSemester
    ? activities.filter(a => (a.semester || '113-1') === selectedSemester)
    : []

  const activeActivity = activities.find(a => a.id === activeId) || filteredActivities[0]

  return (
    <div className={`activity-page${selectedSemester !== null ? ' detail-mode' : ''}`}>
      <Link to="/home" className="logo-link">
        <img src="/img/mg2.png" className="mg-logo" alt="TMGC Logo" />
      </Link>

      <Menu />

      <main className="activity-container">
        {selectedSemester === null ? (
          /* ===== 選單 ===== */
          <div className="arcade-select-stage">
            <div className="arcade-header">
              <h1 className="arcade-title">選擇學期</h1>
              <h1 className="arcade-title-eng">Choose a semester</h1>
            </div>

            <div className="arcade-wheel-container">
              <button
                className={`carousel-arrow arcade-wheel-arrow-up ${focusedIndex === 0 ? 'disabled' : ''}`}
                onClick={handlePrev}
                disabled={focusedIndex === 0}
                aria-label="上一個學期"
              >
                &#10094;
              </button>

              <div
                ref={viewportRef}
                className="arcade-song-viewport"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onWheel={handleWheel}
              >
                <div
                  className="arcade-song-track"
                  style={{
                    transform: `translateY(${centerOffset - focusedIndex * stepHeight}px)`
                  }}
                >
                  {semesters.map((sem, idx) => {
                    const isFocused = idx === focusedIndex
                    const diagonalOffset = (focusedIndex - idx) * 31

                    return (
                      <button
                        key={sem}
                        className={`arcade-banner-card cyan ${isFocused ? 'focused' : 'dimmed'}`}
                        style={{
                          '--diag-offset': `${diagonalOffset}px`
                        }}
                        onClick={() => (isFocused ? handleSelectSemester(sem) : setFocusedIndex(idx))}
                        tabIndex={0}
                      >
                        {/* 左上角編號 */}
                        <div className="card-index-badge">
                          <span className="index-num">{sem}</span>
                          <span className="index-dots">///</span>
                        </div>

                        {/* 中央標題 */}
                        <div className="banner-content">
                          <span className="banner-main-title">➤➤學期紀錄</span>
                        </div>

                        {/* 右側區塊 */}
                        <div className={`banner-right-green-section ${isFocused ? 'active' : ''}`}>
                          <div className={`banner-tag ${isFocused ? 'start-pulse' : ''}`}>
                            {isFocused ? 'ENTER ▶' : 'SELECT'}
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              <button
                className={`carousel-arrow arcade-wheel-arrow-down ${focusedIndex === semesters.length - 1 ? 'disabled' : ''}`}
                onClick={handleNext}
                disabled={focusedIndex === semesters.length - 1}
                aria-label="下一個學期"
              >
                &#10095;
              </button>
            </div>
          </div>
        ) : (
          /* ===== 內部 ===== */
          <>
            <div className="activity-sidebar">
              <button className="back-to-sem-btn" onClick={() => setSelectedSemester(null)}>
                ◀ BACK
              </button>

              <div className="menu">
                {filteredActivities.map(a => {
                  const isActive = activeActivity?.id === a.id
                  return (
                    <button
                      key={a.id}
                      className={`menu-button${isActive ? ' active' : ''}`}
                      onClick={() => setActiveId(a.id)}
                    >
                      {a.label}
                    </button>
                  )
                })}
              </div>
            </div>

            {activeActivity && (
              <div key={activeActivity.id} className="activity-card-container">
                <div className="activity-card">
                  <div className="activity-carousel-wrap">
                    <Carousel
                      arrows
                      infinite={false}
                      className="activity-carousel"
                      prevArrow={<PrevArrow />}
                      nextArrow={<NextArrow />}
                    >
                      {activeActivity.images.map((src, i) => (
                        <div key={i}>
                          <img src={src} alt={`${activeActivity.title} 照片 ${i + 1}`} />
                        </div>
                      ))}
                    </Carousel>
                  </div>
                  <div className="text-bg">
                    <div className="border-beam" />
                    <h2 className="activity-title">{activeActivity.title}</h2>
                    <div className="activity-body">
                      {activeActivity.body.split('\n').map((line, i) => (
                        <p key={i}>{line || '\u00A0'}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      <footer className="site-footer">© TNUA MUSIC GAME CLUB 2nd</footer>
    </div>
  )
}

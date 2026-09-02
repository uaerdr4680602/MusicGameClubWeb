import { useState } from 'react'
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
  const [activeId, setActiveId] = useState(activities[0]?.id || '000')
  const activeActivity = activities.find(a => a.id === activeId) || activities[0]

  return (
    <div className="activity-page">
      <Link to="/home" className="logo-link">
        <img src="/img/mg2.png" className="mg-logo" alt="TMGC Logo" />
      </Link>

      <Menu />

      <main className="activity-container">
        {/* 左側活動切換選單 */}
        <div className="menu">
          {activities.map(a => {
            const isActive = activeId === a.id
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

        {/* 右側/中央活動展示卡片 */}
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
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="site-footer">© TNUA MUSIC GAME CLUB 2nd</footer>
    </div>
  )
}

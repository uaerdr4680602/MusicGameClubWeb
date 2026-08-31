import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Carousel } from 'antd'
import Menu from '../components/Menu'
import activities from '../json/activities.json'
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
  const [activeId, setActiveId] = useState(null)

  return (
    <div className="activity-page">
      <div>
        <Link to="/home">
          <img src="/img/mg2.png" className="mg-logo" alt="TMGC Logo" />
        </Link>
      </div>

      <Menu />

      <div className="menu">
        {activities.map(a => (
          <button
            key={a.id}
            className={`menu-button${activeId === a.id ? ' active' : ''}`}
            onClick={() => setActiveId(a.id)}
          >
            {a.label}
          </button>
        ))}
      </div>

      {activities.map(a => (
        <section
          key={a.id}
          id={a.id}
          className={`tab-content${activeId === a.id ? ' active' : ''}`}
        >
          <div className="activity-card">
            <div className="activity-carousel-wrap">
              <Carousel
                arrows
                infinite={false}
                className="activity-carousel"
                prevArrow={<PrevArrow />}
                nextArrow={<NextArrow />}
              >
                {a.images.map((src, i) => (
                  <div key={i}>
                    <img src={src} alt={`${a.title} 照片 ${i + 1}`} />
                  </div>
                ))}
              </Carousel>
            </div>
            <div className="text-bg">
              <p style={{ fontSize: 'clamp(15px, 2vw, 26px)' }}><b>{a.title}</b></p>
              <p>
                <br />
                {a.body.split('\n').map((line, i) => (
                  <span key={i}>{line}<br /></span>
                ))}
              </p>
            </div>
          </div>
        </section>
      ))}

      <footer className="site-footer">© TNUA MUSIC GAME CLUB 2nd</footer>
    </div>
  )
}

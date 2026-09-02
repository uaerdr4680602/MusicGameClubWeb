import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Carousel } from 'antd'
import Menu from '../menu/Menu'
import instagramPosts from '../../json/instagramPosts.json'
import { socialLinks } from '../links/socialLinks'
import './HomePage.css'

function PrevArrow({ onClick }) {
  return (
    <button className="carousel-arrow carousel-arrow-prev" onClick={onClick} aria-label="上一則">
      &#10094;
    </button>
  )
}

function NextArrow({ onClick }) {
  return (
    <button className="carousel-arrow carousel-arrow-next" onClick={onClick} aria-label="下一則">
      &#10095;
    </button>
  )
}

function InstagramEmbed({ permalink }) {
  return (
    <blockquote
      className="instagram-media"
      data-instgrm-permalink={permalink}
      data-instgrm-version="14"
      style={{
        background: '#fff',
        border: 0,
        borderRadius: '3px',
        boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
        margin: '1px auto',
        maxWidth: '540px',
        minWidth: '326px',
        padding: 0,
        width: 'calc(100% - 2px)',
      }}
    >
      <div style={{ padding: '16px' }}>
        <a href={permalink} target="_blank" rel="noreferrer"
          style={{ background: '#ffffff', lineHeight: 0, padding: 0, textAlign: 'center', textDecoration: 'none', width: '100%', display: 'block', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <div style={{ backgroundColor: '#f4f4f4', borderRadius: '50%', flexGrow: 0, height: 40, marginRight: 14, width: 40 }} />
            <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center' }}>
              <div style={{ backgroundColor: '#f4f4f4', borderRadius: 4, flexGrow: 0, height: 14, marginBottom: 6, width: 100 }} />
              <div style={{ backgroundColor: '#f4f4f4', borderRadius: 4, flexGrow: 0, height: 14, width: 60 }} />
            </div>
          </div>
          <div style={{ padding: '19% 0' }} />
          <div style={{ color: '#4FC0C4', fontFamily: 'Arial,sans-serif', fontSize: 14, fontStyle: 'normal', fontWeight: 550, lineHeight: '18px', paddingTop: 8 }}>
            在 Instagram 查看這則貼文
          </div>
        </a>
      </div>
    </blockquote>
  )
}

export default function HomePage() {
  const mgRef = useRef(null)
  const [loading, setLoading] = useState(true)
  const [showLoader, setShowLoader] = useState(true)

  /** @type {string[]} */
  const posts = instagramPosts || []

  useEffect(() => {
    // Loader
    const timer1 = setTimeout(() => setLoading(false), 2500)
    const timer2 = setTimeout(() => setShowLoader(false), 3000)

    // Load Instagram embed script
    if (!document.getElementById('instagram-embed-script')) {
      const script = document.createElement('script')
      script.id = 'instagram-embed-script'
      script.src = 'https://www.instagram.com/embed.js'
      script.async = true
      document.body.appendChild(script)
    } else if (window['instgrm']) {
      window['instgrm']['Embeds']['process']()
    }

    // logo animation
    const mg = mgRef.current
    function handleScroll() {
      const scrollY = window.scrollY
      if (mg) {
        if (scrollY < 800) {
          mg.style.opacity = '1'
        } else if (scrollY < 1200) {
          mg.style.opacity = String(1 - (scrollY - 1200) / 400)
        } else {
          mg.style.opacity = '0'
        }
      }
    }
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  /** @type {any[]} */
  const igSlides = posts.slice().reverse().map((post, i) => (
    <div key={i} className="ig-slide">
      <InstagramEmbed permalink={post} />
    </div>
  ))

  return (
    <div className="home-page">
      {showLoader && (
        <div className={`home-loader ${!loading ? 'hide' : ''}`}>
          <img src="/img/mg2.png" className="water-logo-single" alt="Now Loading..." />
        </div>
      )}

      <Menu />

      {/* home */}
      <section className="hero-section">
        <div>
          <img src="/img/card2.jpg" className="bg1" alt="" />
          <div className="reflection-container">
            <img src="/img/card2.jpg" className="reflection" alt="" />
          </div>
        </div>

        <div>
          <Link to="/home" className="home-logo-link">
            <img ref={mgRef} src="/img/mg2.png" className="mg" alt="TMGC Logo" />
          </Link>
        </div>

        {/* social links */}
        <div className="msg-table">
          <table cellPadding="0" cellSpacing="0" className="msg">
            <tbody>
              {socialLinks.map((s, i) => (
                <tr key={i}>
                  <td>
                    <a href={s.href} target="_blank" rel="noreferrer">{s.svg}</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* News Section */}
      <section className="news-section">
        <img src="/img/butterfly.png" className="bg2" alt="" />

        <div className="news">
          <p>NEWS</p>
        </div>

        {/* Instagram Carousel */}
        <div className="ig-carousel-wrap">
          <Carousel
            arrows
            infinite
            autoplay
            autoplaySpeed={5000}
            className="ig-carousel"
            prevArrow={<PrevArrow />}
            nextArrow={<NextArrow />}
            afterChange={() => { if (window['instgrm']) window['instgrm']['Embeds']['process']() }}
          >
            {igSlides}
          </Carousel>
        </div>

        {/* footer */}
        <footer className="news-footer">© TNUA MUSIC GAME CLUB 2nd</footer>
      </section>
    </div>
  )
}

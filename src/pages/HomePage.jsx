import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Carousel } from 'antd'
import Menu from '../components/Menu'
import instagramPosts from '../json/instagramPosts.json'
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
        background: '#FFF',
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
          style={{ background: '#FFFFFF', lineHeight: 0, padding: 0, textAlign: 'center', textDecoration: 'none', width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <div style={{ backgroundColor: '#F4F4F4', borderRadius: '50%', flexGrow: 0, height: 40, marginRight: 14, width: 40 }} />
            <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center' }}>
              <div style={{ backgroundColor: '#F4F4F4', borderRadius: 4, flexGrow: 0, height: 14, marginBottom: 6, width: 100 }} />
              <div style={{ backgroundColor: '#F4F4F4', borderRadius: 4, flexGrow: 0, height: 14, width: 60 }} />
            </div>
          </div>
          <div style={{ padding: '19% 0' }} />
          <div style={{ color: '#3897f0', fontFamily: 'Arial,sans-serif', fontSize: 14, fontStyle: 'normal', fontWeight: 550, lineHeight: '18px', paddingTop: 8 }}>
            在 Instagram 查看這則貼文
          </div>
        </a>
      </div>
    </blockquote>
  )
}

export default function HomePage() {
  const mgRef = useRef(null)

  useEffect(() => {
    // Load Instagram embed script
    if (!document.getElementById('instagram-embed-script')) {
      const script = document.createElement('script')
      script.id = 'instagram-embed-script'
      script.src = '//www.instagram.com/embed.js'
      script.async = true
      document.body.appendChild(script)
    } else if (window.instgrm) {
      window.instgrm.Embeds.process()
    }

    // Scroll-driven logo animation
    const mg = mgRef.current
    function handleScroll() {
      const scrollY = window.scrollY
      if (mg) {
        if (scrollY < 800) {
          mg.style.opacity = '1'
        } else if (scrollY < 1200) {
          mg.style.opacity = String(1 - (scrollY - 600) / 600)
        } else {
          mg.style.opacity = '0'
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const socialLinks = [
    {
      href: 'https://www.instagram.com/tnua_music_game?utm_source=ig_web_button_share_sheet&igsh=ZzA3aGh3bDlheWJi',
      svg: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
        </svg>
      )
    },
    {
      href: 'https://discord.gg/YHq46JBs9G',
      svg: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612"/>
        </svg>
      )
    },
    {
      href: 'https://www.facebook.com/groups/tnua.mgsc/',
      svg: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
        </svg>
      )
    },
  ]

  return (
    <div className="home-page">
      {/* header image with reflection */}
      <div>
        <img src="/img/card2.jpg" className="bg1" alt="" />
        <img src="/img/card2.jpg" className="reflection" alt="" />
      </div>

      {/* logo */}
      <div>
        <Link to="/home">
          <img ref={mgRef} src="/img/mg2.png" className="mg" alt="TMGC Logo" />
        </Link>
      </div>

      <Menu />

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
          afterChange={() => { if (window.instgrm) window.instgrm.Embeds.process() }}
        >
          {[...instagramPosts].reverse().map((post, i) => (
            <div key={i} className="ig-slide">
              <InstagramEmbed permalink={post} />
            </div>
          ))}
        </Carousel>
      </div>

      <br /><br />

      <footer className="site-footer">© TNUA MUSIC GAME CLUB 2nd</footer>
    </div>
  )
}

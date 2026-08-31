import { useState } from 'react'
import { Link } from 'react-router-dom'
import Menu from '../components/Menu'
import './MemberPage.css'

import members from '../json/members.json'

export default function MemberPage() {
  const [activeId, setActiveId] = useState('leader')

  return (
    <div className="member-page">
      <div>
        <Link to="/home">
          <img src="/img/mg2.png" className="mg-logo" alt="TMGC Logo" />
        </Link>
      </div>

      <Menu />

      <main>
        <div className="menu">
          {members.map(m => (
            <button
              key={m.id}
              className={`menu-button${activeId === m.id ? ' active' : ''}`}
              onClick={() => setActiveId(m.id)}
            >
              {m.label}
            </button>
          ))}
        </div>

        {members.map(m => (
          <section
            key={m.id}
            id={m.id}
            className={`tab-content${activeId === m.id ? ' active' : ''}`}
          >
            <div className="member-card">
              <div className="member-img-wrap">
                {m.imgDesktop ? (
                  <picture>
                    <source media="(max-width: 768px)" srcSet={m.imgMobile} />
                    <img src={m.imgDesktop} alt={m.name} />
                  </picture>
                ) : (
                  <img src={m.img} alt={m.name} />
                )}
              </div>
              <div className="name-text"><p>{m.name}</p></div>
              <div className="text-bg">
                <p>{m.desc.split('\n').map((line, i) => (
                  <span key={i}>{line}<br /></span>
                ))}</p>
                {m.links.map((l, i) => (
                  <a key={i} href={l.href} className="member-link" target="_blank" rel="noreferrer">
                    {l.text}
                  </a>
                ))}
              </div>
            </div>
          </section>
        ))}
      </main>

      <footer className="site-footer">© TNUA MUSIC GAME CLUB 2nd</footer>
    </div>
  )
}

import { useState } from 'react'
import { Link } from 'react-router-dom'
import Menu from '../menu/Menu'
import './MemberPage.css'

import members from '../../json/members.json'

export default function MemberPage() {
  const [activeId, setActiveId] = useState(members[0]?.id || 'leader')
  const activeMember = members.find(m => m.id === activeId) || members[0]

  return (
    <div className="member-page">
      <Link to="/home" className="logo-link">
        <img src="/img/mg2.png" className="mg-logo" alt="TMGC Logo" />
      </Link>

      <Menu />

      <main className="member-container">
        {/* 左側成員切換選單 */}
        <div className="menu">
          {members.map(m => {
            const isActive = activeId === m.id
            return (
              <button
                key={m.id}
                className={`menu-button${isActive ? ' active' : ''}`}
                onClick={() => setActiveId(m.id)}
              >
                {m.label}
              </button>
            )
          })}
        </div>

        {/* 中央角色立繪展示區 */}
        <div className="character-showcase">
          {members.map(m => {
            const desktopImg = m['imgDesktop'] || m.img
            const mobileImg = m['imgMobile'] || desktopImg
            const isActive = activeId === m.id
            return (
              <div
                key={m.id}
                className={`character-img-wrapper ${isActive ? 'active' : ''}`}
              >
                <picture>
                  <source media="(max-width: 768px)" srcSet={mobileImg} />
                  <img src={desktopImg} alt={m.name} className="character-img" />
                </picture>
              </div>
            )
          })}
        </div>

        {/* 右側成員詳細資訊面板 */}
        <div key={String(activeId)} className="character-info-panel">
          {/* 斜角姓名與職稱區 */}
          <div className="char-name-area">
            <div className="slanted-name-box">
              <h1 className="char-name">{activeMember.name}</h1>
              <span className="slanted-accent-line" />
            </div>

            <div className="sub-name-row">
              <span className="sub-name-text">
                {activeMember.enRole ? `${activeMember.enRole} · ${activeMember.label}` : activeMember.label}
              </span>
            </div>
          </div>

          {/* 流光邊框的介紹卡片 */}
          <div className="info-card">
            <div className="border-beam" />
            <div className="info-desc">
              {activeMember.desc.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>

            {activeMember.links && activeMember.links.length > 0 && (
              <div className="info-links">
                {activeMember.links.map((l, i) => (
                  <a
                    key={i}
                    href={l.href}
                    className="member-social-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {l.text}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="site-footer">© TNUA MUSIC GAME CLUB 2nd</footer>
    </div>
  )
}

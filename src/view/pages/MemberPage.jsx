import { useState } from 'react'
import { Link } from 'react-router-dom'
import Menu from '../menu/Menu'
import './MemberPage.css'

import members from '../../json/members.json'

export default function MemberPage() {
  const [selectedMember, setSelectedMember] = useState(null)
  const [activeId, setActiveId] = useState(members[0]?.id || 'leader')

  const handleSelectMember = id => {
    setActiveId(id)
    setSelectedMember(id)
  }

  const activeMember = members.find(m => m.id === activeId) || members[0]

  return (
    <div className={`member-page${selectedMember !== null ? ' detail-mode' : ''}`}>
      <Link to="/home" className="logo-link">
        <img src="/img/mg2.png" className="mg-logo" alt="TMGC Logo" />
      </Link>

      <Menu />

      <main className="member-container">
        {selectedMember === null ? (
          /* ===== 幹部選擇 ===== */
          <div className="member-select-stage">
            <div className="member-header">
              <div className="member-title-row">
                <span className="header-line left" />
                <h1 className="member-title">幹部介紹</h1>
                <span className="header-line right" />
              </div>
              <h2 className="member-title-eng">Choose a Member</h2>
            </div>

            <div className="member-cards-row">
              {members.map((m, idx) => {
                const desktopImg = m['imgDesktop'] || m.img
                const numStr = String(idx + 1).padStart(2, '0')
                return (
                  <button
                    key={m.id}
                    className="member-select-card parallelogram-card"
                    onClick={() => handleSelectMember(m.id)}
                  >
                    {/* 平行四邊形框 */}
                    <div className="card-clip-frame">
                      {/* Border Beam */}
                      <div className="member-card-beam" />

                      {/* 方格幾線 */}
                      <div className="card-tech-grid" />

                      {/* 頂部編號 */}
                      <div className="card-index-badge">
                        <span className="index-num">{numStr}</span>
                        <span className="index-dots">///</span>
                      </div>

                      {/* 圖片背景 */}
                      <div className="card-ambient-bg">
                        <img src={desktopImg} alt="" className="ambient-blur-img" />
                        <div className="frosted-glass-overlay" />
                      </div>

                      {/* 白色集中線 */}
                      <div className="manga-lines" />

                      {/* 立繪 */}
                      <div className="card-character-crop">
                        <img src={desktopImg} alt={m.name} className="card-img" />
                      </div>
                    </div>

                    {/* 姓名與職稱 (無背景與邊框，文字純粹突出) */}
                    <div className="member-badge-text" data-has-eng={/[a-zA-Z]/.test(m.name)}>
                      <span className="badge-name">{m.name}</span>
                      <span className="badge-role">{m.label}</span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        ) : (
          /* ===== 詳細資料 ===== */
          <>
            {/* 側邊欄：BACK 按鈕與成員選單 */}
            <div className="activity-sidebar member-sidebar">
              <button className="back-to-sem-btn" onClick={() => setSelectedMember(null)}>
                ◀ BACK
              </button>
              <div className="menu member-detail-menu">
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
            </div>

            {/* 中央立繪 */}
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

            {/* 詳細資訊面板 */}
            <div key={String(activeId)} className="character-info-panel">
              {/* 姓名與職稱 */}
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

              {/* 介紹卡片 */}
              <div className="info-card">
                <div className="border-beam" />
                <div className="info-desc">
                  {activeMember.desc.split('\n').map((line, i) => (
                    <p key={i}>{line || '\u00A0'}</p>
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
          </>
        )}
      </main>

      <footer className="site-footer">© TNUA MUSIC GAME CLUB 2nd</footer>
    </div>
  )
}

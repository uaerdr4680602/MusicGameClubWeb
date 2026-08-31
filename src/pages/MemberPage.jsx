import { useState } from 'react'
import { Link } from 'react-router-dom'
import Menu from '../components/Menu'
import './MemberPage.css'

const members = [
  {
    id: 'leader',
    label: '社長',
    img: '/img/wolf.png',
    name: '保留',
    desc: '新媒系大三。\n我負責畫獸圖。',
    links: [],
  },
  {
    id: 'member1',
    label: '副社長',
    img: '/img/gim.png',
    name: '吉米',
    desc: '新媒系大三。\n負責支援社長的各種突發異想。',
    links: [
      { href: 'https://www.instagram.com/0831_fenneru?utm_source=ig_web_button_share_sheet&igsh=MThkMWsybGpveXF1Nw==', text: '繪師IG：@0831_fenneru' },
      { href: 'https://www.instagram.com/177.k_k?utm_source=ig_web_button_share_sheet&igsh=a2MycW5tMzMzY3pn', text: '@177.k_k' },
    ],
  },
  {
    id: 'member2',
    label: '美宣',
    img: '/img/177.png',
    name: '177',
    desc: '新媒系大三。\n我負責畫圖。',
    links: [],
  },
  {
    id: 'member3',
    label: '網管',
    img: '/img/19359.png',
    name: '百齋',
    desc: '新媒系大三。\n我負責修網頁。',
    links: [],
  },
  {
    id: 'member4',
    label: '公關',
    img: '/img/shiyui.png',
    name: '星野',
    desc: '大家好我是新媒一的新人，你們都可以叫我星野。\n我是個只會擺爛的攝影兼剪輯師，現在主音游是中二節奏，有打過Phigros、Arcaea、PJSK。\n一個小鳥游星野推。\n請多多指教',
    links: [],
  },
  {
    id: 'member5',
    label: '活動',
    img: '/img/nicky.png',
    name: 'nicky',
    desc: 'MIT大一小新肝。\n比較重要一點的興趣：Double Bass/編曲/舞蹈/游泳/美妝。\n兩點興趣：活網/Vocaloid/KPOP/Game/Vtuber/Anime。\n最近常玩遊戲：垃圾第五人格/Among us/Minecraft/Lethal Company/Phasmophobia/VRChat。\n音遊之前常玩osu 很久打一次pjsk(日服) 很久打一次mai。\n主要是錢都花在其他地方沒錢打ㄌ～\n\n推：懶貓子Rumi/Miku(其實是DD)。\n喜歡的音樂家：YUC\'e/Snail\'s House/EmoCosine/Mitsukiyo\n愛聽Future Bass/Kawaii Bass。\n基本上都是打osu認識的音樂家。\n可以找我玩遊戲！不過我線上線下都是E，可能會有點嗨。\n喜歡的東西很多，還在擴展中。',
    links: [
      { href: 'https://www.instagram.com/abelia__1213/?utm_source=ig_web_button_share_sheet', text: '繪師IG：@abelia_1213' },
    ],
  },
  {
    id: 'member6',
    label: '總務',
    img: '/img/gim.png',
    name: '吉米 again',
    desc: '新媒系大三。\n負責支援社長的各種突發異想。',
    links: [],
  },
  {
    id: 'member7',
    label: '教學',
    imgDesktop: '/img/teach.png',
    imgMobile: '/img/teach-2.png',
    name: '保留/吉米',
    desc: '新媒系大三。\n兼任。',
    links: [],
  },
]

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

import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import './ActivityPage.css'

const activities = [
  {
    id: '000',
    label: '社員大會',
    images: Array.from({ length: 11 }, (_, i) => `/img/000_${i + 1}.jpg`),
    title: '2025/09/19 社員大會',
    body: `114學年度音樂遊戲研究社第一次社員大會
會議召集人：黃塏升
日期：9/19(五)
時間：19:00~ 20:00
地點：綜合宿舍活動教室B

議程：
一、\t人員集合、會議召集人點名
二、\t確認發放資料與社員登記資料
三、\t社團章程修訂
四、\t幹部選拔
五、\t公布年度計畫與經費粗估
六、\t臨時動議
七、\t散會`,
  },
  {
    id: '001',
    label: '第一次活動',
    images: ['/img/001_1.jpg', '/img/001_2.jpg', '/img/001_3.jpg'],
    title: '2025/10/03 音游概論',
    body: `🎶✨ 音游概論小科普！ ✨🎶

什麼是音游？
難道是只有下落式的才算是音游嗎？
其實現在音樂游戲種類五花八門，
你們想認識它們的種種樣貌嗎？
你們想產生對它們的更多想像跟期待嗎？
那這次的活動最適合你們了！🔥

————————————————————————————————————
活動：音游概論
日期：10/3 (星期五）
時間：18:30-21:00
地點：綜合宿舍 活動教室B
參與對象：不限社員參加！社外成員酌收50元新台幣，感謝配合
（有興趣而且想要入社的朋友，當場填寫資料及繳交社費~)`,
  },
  {
    id: '002',
    label: '第二次活動',
    images: ['/img/002_1.jpg', '/img/002_2.jpg', '/img/002_3.jpg'],
    title: '2025/10/17 臨時動議：音像藝術表演觀摩',
    body: `————————————————————————————————————
活動：音像藝術表演觀摩
日期：10/17 (星期五）
時間：18:30-21:00
地點：國立臺北藝術大學科技藝術館
參與對象：不限社員參加！
（有興趣而且想要入社的朋友，當場填寫資料及繳交社費~)`,
  },
  {
    id: '003',
    label: '第三次活動',
    images: ['/img/003_1.jpg', '/img/003_2.jpg', '/img/003_3.jpg'],
    title: '2025/10/31 音游概論',
    body: `不是？我打程式？ 😭
會贏嗎？ 🥀

想理解音游背後如何運作嗎？
這次的活動就很適合你啦！
我們這次的活動會教你如何零成本理解下落式音游！
平時看到的游戲譬如osu!、mania、Project Sekai、SDVX都歸類於下落式音游哦
這次主要教學的是判定的邏輯規則，跟音游譜面的資料系統
記得一定要帶電腦啊！！！！！ 😭
（上個禮拜因爲去光節了所以取消了）

——————————————————————————————————————————
活動：無成本破解音游_程式邏輯1
日期：10/31 (星期五）
時間：18:30-21:00
地點：綜合宿舍 活動教室B
參與對象：不限社員參加！社外成員酌收50元新台幣，感謝配合
（有興趣而且想要入社的朋友，記得來參加哦，當場填寫資料及繳交社費~)
溫馨提示：記得一定要帶電腦啊 😭 😭 😭 😭 😭`,
  },
]

function SlideShow({ images }) {
  const [idx, setIdx] = useState(0)
  const total = images.length
  return (
    <div className="slider-container" style={{ position: 'relative' }}>
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt=""
          className={i === idx ? 'active' : ''}
        />
      ))}
      <button className="prev" onClick={() => setIdx(i => (i - 1 + total) % total)}>&#10094;</button>
      <button className="next" onClick={() => setIdx(i => (i + 1) % total)}>&#10095;</button>
    </div>
  )
}

export default function ActivityPage() {
  const [activeId, setActiveId] = useState(null)

  const active = activities.find(a => a.id === activeId)

  return (
    <div className="activity-page">
      <div>
        <Link to="/home">
          <img src="/img/mg2.png" className="mg-logo" alt="TMGC Logo" />
        </Link>
      </div>

      <Navbar />

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
          <div className="table-container">
            <table align="right" cellPadding="0" cellSpacing="0">
              <tbody>
                <tr>
                  <td className="img-td">
                    <SlideShow images={a.images} />
                  </td>
                </tr>
                <tr>
                  <td className="text-bg">
                    <p style={{ fontSize: 'clamp(15px, 2vw, 26px)' }}><b>{a.title}</b></p>
                    <p>
                      <br />
                      {a.body.split('\n').map((line, i) => (
                        <span key={i}>{line}<br /></span>
                      ))}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      ))}

      <footer className="site-footer">© TNUA MUSIC GAME CLUB 2nd</footer>
    </div>
  )
}

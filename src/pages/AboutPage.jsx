import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import './AboutPage.css'

export default function AboutPage() {
  return (
    <div className="about-page">
      <div>
        <Link to="/home">
          <img src="/img/mg2.png" className="mg-logo" alt="TMGC Logo" />
        </Link>
      </div>

      <Navbar />

      <div className="about">
        <p>
          在無聲的山岳深處，回蕩著未曾終止的律動。<br />
          <br />
          我們，是踏入樂音洪流的旅人。<br />
          音符不再只是冷冽的符號，而是脈動的光子。<br /><br />
          每一次下落，皆如星辰墜落大地；<br />
          每一次擊打，便能使靈魂與宇宙之能共鳴。<br />
          <br />
          這並非單純的遊戲，而是一場向未知延伸的探索——<br />
          對未來科技的試煉，對美學感知的挑戰。<br />
          當節奏化為洪潮，判定化作斷崖，曲線隱匿幻影之時，<br />
          皆在呼喚那些願意迎接挑戰之人。<br />
          <br />
          若你願意，請跨越門檻。<br />
          在此之後，你所踏入的，不再只是遊戲，而是<br /><br />
          一場以「音」為名的試煉。<br />
          <br /><br /><br />
          以<b>「北」</b>極星之名<br />
          使<b>「藝」</b>之魂閃耀於長空<br />
          劃開交織<b>「音」</b>符的長河<br />
          <b>「遊」</b>歷於屬於自己的軌跡<br />
          <br /><br /><br /><br /><br />
        </p>
      </div>

      <footer className="site-footer">© TNUA MUSIC GAME CLUB 2nd</footer>
    </div>
  )
}

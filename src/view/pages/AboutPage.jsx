import { Link } from 'react-router-dom'
import Menu from '../menu/Menu'
import aboutData from '../../json/about.json'
import './AboutPage.css'

export default function AboutPage() {
  return (
    <div className="about-page">
      <Link to="/home" className="logo-link">
        <img src="/img/mg2.png" className="mg-logo" alt="TMGC Logo" />
      </Link>

      <Menu />

      <div className="about">
        <p>
          {aboutData.map((paragraph, i) => (
            <span key={i}>
              {paragraph.split('\n').map((line, j) => (
                <span
                  key={j}
                  dangerouslySetInnerHTML={{ __html: line + '<br />' }}
                />
              ))}
              {i < aboutData.length - 1 && <br />}
            </span>
          ))}
        </p>
      </div>

      <footer className="site-footer">© TNUA MUSIC GAME CLUB 2nd</footer>
    </div>
  )
}

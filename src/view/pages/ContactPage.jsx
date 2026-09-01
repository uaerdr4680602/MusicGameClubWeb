import { Link } from 'react-router-dom'
import Menu from '../menu/Menu'
import { socialLinks } from '../links/socialLinks'
import './ContactPage.css'

export default function ContactPage() {
  return (
    <div className="contact-page">
      <div>
        <Link to="/home">
          <img src="/img/mg2.png" className="mg-logo" alt="TMGC Logo" />
        </Link>
      </div>

      <div className="bg-cha">
        <img src="/img/girl.png" className="left-img" alt="" />
        <img src="/img/wolf.png" className="right-img" alt="" />
      </div>

      <Menu />

      <div className="contact-social-links">
        {socialLinks.map((s, i) => (
          <a key={i} href={s.href} target="_blank" rel="noreferrer">
            {s.svg}
          </a>
        ))}
      </div>

      <footer className="site-footer">© TNUA MUSIC GAME CLUB 2nd</footer>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useLang, useT } from '../i18n'
import { site } from '../data/site'
import './Navbar.css'

const SECTIONS = [
  { id: 'work', label: site.nav.work },
  { id: 'about', label: site.nav.about },
  { id: 'skills', label: site.nav.skills },
  { id: 'contact', label: site.nav.contact },
]

export function Navbar() {
  const { lang, toggleLang } = useLang()
  const t = useT()
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const goToSection = (id) => (e) => {
    e.preventDefault()
    if (location.pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate(`/#${id}`)
    }
  }

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner container">
        <Link to="/" className="nav__brand" aria-label="Home">
          <span className="nav__brand-mark">DD</span>
          <span className="nav__brand-name">{site.name}</span>
        </Link>

        <nav className="nav__links" aria-label="Site">
          {SECTIONS.map((s) => (
            <a key={s.id} href={`/#${s.id}`} onClick={goToSection(s.id)} className="nav__link">
              {t(s.label)}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          <a
            className="nav__link nav__link--github"
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
              <path d="M1.5 8.5L8.5 1.5M8.5 1.5H3M8.5 1.5V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <button className="nav__lang" onClick={toggleLang} aria-label="Switch language">
            <span className={lang === 'en' ? 'nav__lang-active' : ''}>EN</span>
            <span className="nav__lang-sep">/</span>
            <span className={lang === 'nl' ? 'nav__lang-active' : ''}>NL</span>
          </button>
        </div>
      </div>
    </header>
  )
}

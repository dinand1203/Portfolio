import { useT } from '../i18n'
import { site } from '../data/site'
import './Footer.css'

export function Footer() {
  const t = useT()
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span className="footer__meta">© {year} {site.name}</span>
        <span className="footer__meta footer__built">{t(site.footer.built)}</span>
        <div className="footer__links">
          <a href={`mailto:${site.email}`} className="footer__link">{site.email}</a>
          <a href={site.github} target="_blank" rel="noopener noreferrer" className="footer__link">GitHub</a>
        </div>
      </div>
    </footer>
  )
}

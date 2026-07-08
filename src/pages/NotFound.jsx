import { Link } from 'react-router-dom'
import { useT } from '../i18n'
import { site } from '../data/site'

export function NotFound() {
  const t = useT()

  return (
    <div className="container" style={{ padding: '180px 24px', textAlign: 'center' }}>
      <p className="kicker" style={{ justifyContent: 'center' }}>404</p>
      <h1 className="section-title" style={{ marginBottom: 28 }}>Page not found</h1>
      <Link to="/" className="btn btn--ghost">{t(site.project.backHome)}</Link>
    </div>
  )
}

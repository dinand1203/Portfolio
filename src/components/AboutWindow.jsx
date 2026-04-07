import { Window } from './Window'
import { aboutData } from '../data/projects'
import './AboutWindow.css'

export function AboutWindow({ isOpen, onClose, onFocus, zIndex, initialPosition, lang }) {
  const d = aboutData

  return (
    <Window
      id="about"
      title="About me"
      isOpen={isOpen}
      onClose={onClose}
      onFocus={onFocus}
      zIndex={zIndex}
      initialPosition={initialPosition}
    >
      <div className="about-window">
        {/* Profile row */}
        <div className="about-window__profile">
          <img
            className="about-window__avatar"
            src={d.avatar}
            alt={d.name}
          />
          <div className="about-window__meta">
            <div className="about-window__row">
              <span className="about-window__label">NAME</span>
              <span className="about-window__value">{d.name}</span>
            </div>
            <div className="about-window__row">
              <span className="about-window__label">POSITION</span>
              <span className="about-window__value">{d.position[lang]}</span>
            </div>
            <div className="about-window__row">
              <span className="about-window__label">EDUCATION</span>
              <span className="about-window__value">{d.university[lang]}</span>
            </div>
            <div className="about-window__row">
              <span className="about-window__label">MAIL</span>
              <a
                className="about-window__link"
                href={`mailto:${d.email}`}
              >
                {d.email}
              </a>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="about-window__bio">
          {d.bio[lang].map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        {/* Certificates */}
        <div className="about-window__section">
          <span className="about-window__section-title">
            {lang === 'en' ? 'Certificates' : 'Certificaten'}
          </span>
          <div className="about-window__certs">
            {d.certificates.map((cert, i) => (
              <div key={i} className="about-window__cert">
                <div className="about-window__cert-info">
                  <span className="about-window__cert-name">
                    {cert.name[lang] || cert.name}
                  </span>
                  <span className="about-window__cert-issuer">{cert.issuer}</span>
                  <span className="about-window__cert-date">{cert.date[lang]}</span>
                  {cert.url && (
                    <a className="about-window__cert-link" href={cert.url} target="_blank" rel="noopener noreferrer">
                      {lang === 'en' ? 'View credential →' : 'Referentie weergeven →'}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Window>
  )
}

import { Link } from 'react-router-dom'
import { useT } from '../i18n'
import { site } from '../data/site'
import { projects, aboutData, skillsData } from '../data/projects'
import { useLang } from '../i18n'
import './Home.css'

const pad = (n) => String(n + 1).padStart(2, '0')

function Hero() {
  const t = useT()

  return (
    <section className="hero">
      <div className="container">
        <p className="kicker rise" style={{ animationDelay: '0.05s' }}>{t(site.hero.kicker)}</p>
        <h1 className="hero__headline rise" style={{ animationDelay: '0.15s' }}>
          {t(site.hero.headlineA)}{' '}
          <em className="hero__em">{t(site.hero.headlineEm)}</em>
          {t(site.hero.headlineB)}
        </h1>
        <p className="hero__sub rise" style={{ animationDelay: '0.25s' }}>{t(site.hero.sub)}</p>
        <div className="hero__actions rise" style={{ animationDelay: '0.35s' }}>
          <a href="#work" className="btn btn--primary">
            {t(site.hero.ctaWork)}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M6 1.5V10.5M6 10.5L2 6.5M6 10.5L10 6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <button className="btn btn--ghost" onClick={() => window.dispatchEvent(new Event('open-chat'))}>
            {t(site.hero.ctaChat)}
          </button>
        </div>
        <p className="hero__status rise" style={{ animationDelay: '0.45s' }}>
          <span className="status-dot" />
          {t(site.hero.status)}
        </p>
      </div>
    </section>
  )
}

function WorkSection() {
  const t = useT()
  const engineering = projects.filter((p) => p.category === 'engineering')

  return (
    <section id="work" className="work">
      <div className="container">
        <p className="kicker">{t(site.work.kicker)}</p>
        <h2 className="section-title">{t(site.work.title)}</h2>

        <div className="work__list">
          {engineering.map((p, i) => (
            <Link key={p.id} to={`/projects/${p.id}`} className="work-row">
              <span className="work-row__index">{pad(i)}</span>
              <div className="work-row__body">
                <div className="work-row__title-line">
                  <h3 className="work-row__title">{t(p.title)}</h3>
                  {p.status === 'in-progress' && (
                    <span className="work-row__badge">
                      <span className="status-dot" />
                      {t(site.work.inProgress)}
                    </span>
                  )}
                </div>
                <p className="work-row__subtitle">{t(p.subtitle)}</p>
                <div className="work-row__tags">
                  {p.tags.map((tag) => (
                    <span key={tag} className="chip">{tag}</span>
                  ))}
                </div>
              </div>
              <span className="work-row__year">{p.year}</span>
              <div className="work-row__thumb">
                <img src={p.image} alt="" loading="lazy" />
              </div>
              <span className="work-row__arrow" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 12L12 2M12 2H4.5M12 2V9.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function DesignSection() {
  const t = useT()
  const design = projects.filter((p) => p.category === 'design')

  return (
    <section className="design-work">
      <div className="container">
        <p className="kicker">{t(site.designWork.kicker)}</p>
        <h2 className="section-title">{t(site.designWork.title)}</h2>
        <p className="design-work__sub">{t(site.designWork.sub)}</p>

        <div className="design-work__grid">
          {design.map((p) => (
            <Link key={p.id} to={`/projects/${p.id}`} className="design-card">
              <div className="design-card__image">
                <img src={p.image} alt="" loading="lazy" />
              </div>
              <div className="design-card__body">
                <h3 className="design-card__title">{t(p.title)}</h3>
                <p className="design-card__meta">{p.year} · {t(p.role)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function AboutSection() {
  const t = useT()
  const { lang } = useLang()
  const d = aboutData

  return (
    <section id="about" className="about">
      <div className="container">
        <p className="kicker">{t(site.about.kicker)}</p>
        <h2 className="section-title">{t(site.about.title)}</h2>

        <div className="about__grid">
          <div className="about__bio">
            {d.bio[lang].map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <aside className="about__facts">
            <div className="about__fact">
              <span className="about__fact-label">{t(site.about.education)}</span>
              <span className="about__fact-value">{t(d.education.degree)}</span>
              <span className="about__cert-meta">{t(d.education.school)} · {d.education.period}</span>
            </div>
            <div className="about__fact">
              <span className="about__fact-label">{t(site.about.certificates)}</span>
              <ul className="about__certs">
                {d.certificates.map((cert, i) => (
                  <li key={i} className="about__cert">
                    <span className="about__cert-name">{t(cert.name)}</span>
                    <span className="about__cert-meta">{cert.issuer} · {t(cert.date)}</span>
                    {cert.url && (
                      <a href={cert.url} target="_blank" rel="noopener noreferrer" className="about__cert-link">
                        {t(site.about.viewCredential)} ↗
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div className="about__fact">
              <span className="about__fact-label">Email</span>
              <a href={`mailto:${d.email}`} className="about__fact-value about__fact-value--link">{d.email}</a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

function SkillsSection() {
  const t = useT()
  const { lang } = useLang()
  const categories = skillsData[lang]

  return (
    <section id="skills" className="skills">
      <div className="container">
        <p className="kicker">{t(site.skills.kicker)}</p>
        <h2 className="section-title">{t(site.skills.title)}</h2>

        <div className="skills__grid">
          {categories.map((cat, i) => (
            <div key={cat.category} className="skills__col">
              <h3 className="skills__col-title">
                <span className="skills__col-index">{pad(i)}</span>
                {cat.category}
              </h3>
              <ul className="skills__list">
                {cat.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  const t = useT()

  return (
    <section id="contact" className="contact">
      <div className="container">
        <p className="kicker">{t(site.contact.kicker)}</p>
        <h2 className="contact__title">{t(site.contact.title)}</h2>
        <p className="contact__sub">{t(site.contact.sub)}</p>
        <div className="contact__actions">
          <a href={`mailto:${site.email}`} className="btn btn--primary">{site.email}</a>
          <button className="btn btn--ghost" onClick={() => window.dispatchEvent(new Event('open-chat'))}>
            {t(site.hero.ctaChat)}
          </button>
        </div>
      </div>
    </section>
  )
}

export function Home() {
  return (
    <>
      <Hero />
      <WorkSection />
      <DesignSection />
      <AboutSection />
      <SkillsSection />
      <ContactSection />
    </>
  )
}

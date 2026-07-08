import { Link, useParams } from 'react-router-dom'
import { useLang, useT } from '../i18n'
import { site } from '../data/site'
import { projects } from '../data/projects'
import './ProjectPage.css'

export function ProjectPage() {
  const { id } = useParams()
  const t = useT()
  const { lang } = useLang()

  const index = projects.findIndex((p) => p.id === id)
  const project = projects[index]

  if (!project) {
    return (
      <div className="project container project--missing">
        <p>{t(site.project.notFound)}</p>
        <Link to="/" className="btn btn--ghost">{t(site.project.backHome)}</Link>
      </div>
    )
  }

  const next = projects[(index + 1) % projects.length]
  const inProgress = project.status === 'in-progress'

  return (
    <article className="project">
      <div className="container">
        {/* Header */}
        <header className="project__header rise">
          <Link to="/#work" className="project__back">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M7.5 1.5L3 6L7.5 10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {t(site.project.back)}
          </Link>

          <h1 className="project__title">{t(project.title)}</h1>
          <p className="project__subtitle">{t(project.subtitle)}</p>

          <dl className="project__meta">
            <div className="project__meta-item">
              <dt>{t(site.project.year)}</dt>
              <dd>{project.period ? t(project.period) : project.year}</dd>
            </div>
            <div className="project__meta-item">
              <dt>{t(site.project.role)}</dt>
              <dd>{t(project.role)}</dd>
            </div>
            <div className="project__meta-item">
              <dt>{t(site.project.status)}</dt>
              <dd className={inProgress ? 'project__meta-status' : ''}>
                {inProgress && <span className="status-dot" />}
                {inProgress ? t(site.project.inProgress) : t(site.project.completed)}
              </dd>
            </div>
            <div className="project__meta-item">
              <dt>{t(site.project.stack)}</dt>
              <dd className="project__meta-tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="chip">{tag}</span>
                ))}
              </dd>
            </div>
          </dl>

          {(project.liveUrl || project.githubUrl) && (
            <div className="project__links">
              {project.liveUrl && (
                <a className="btn btn--primary" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  {t(site.project.liveApp)} ↗
                </a>
              )}
              {project.githubUrl && (
                <a className="btn btn--ghost" href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  {t(site.project.github)} ↗
                </a>
              )}
            </div>
          )}
        </header>

        {/* Hero image */}
        <div className="project__hero rise" style={{ animationDelay: '0.1s' }}>
          <img src={project.image} alt={t(project.title)} />
        </div>

        {/* Body */}
        <div className="project__body">
          {project.researchQuestion && (
            <section className="project__section">
              <h2>{t(site.project.researchQuestion)}</h2>
              <blockquote className="project__quote">{t(project.researchQuestion)}</blockquote>
            </section>
          )}

          <section className="project__section">
            <h2>{t(site.project.overview)}</h2>
            <p>{t(project.overview)}</p>
          </section>

          {project.challenge && (
            <section className="project__section">
              <h2>{t(site.project.challenge)}</h2>
              <p>{t(project.challenge)}</p>
            </section>
          )}

          {project.features && (
            <section className="project__section">
              <h2>{t(site.project.features)}</h2>
              <ul className="project__features">
                {project.features[lang].map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </section>
          )}

          {project.techStack && (
            <section className="project__section">
              <h2>{t(site.project.techStack)}</h2>
              <table className="project__table">
                <thead>
                  <tr>
                    <th>{t(site.project.layer)}</th>
                    <th>{t(site.project.technology)}</th>
                  </tr>
                </thead>
                <tbody>
                  {project.techStack.map((row) => (
                    <tr key={row.layer}>
                      <td>{row.layer}</td>
                      <td>{row.tech}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}

          {project.approach && (
            <section className="project__section">
              <h2>{t(site.project.approach)}</h2>
              {project.approach[lang].map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </section>
          )}

          {project.galleryImages?.length > 0 && (
            <section className="project__section">
              <h2>{t(site.project.gallery)}</h2>
              <div className="project__gallery">
                {project.galleryImages.map((img, i) => (
                  <figure key={i} className="project__gallery-item">
                    <img src={img.src} alt={img.alt} loading="lazy" />
                    {img.caption && <figcaption>{t(img.caption)}</figcaption>}
                  </figure>
                ))}
              </div>
            </section>
          )}

          {project.galleryVideos?.length > 0 && (
            <section className="project__section">
              <h2>{t(site.project.videos)}</h2>
              <div className={project.galleryVideos.some((v) => v.vertical) ? 'project__gallery project__gallery--vertical' : 'project__gallery'}>
                {project.galleryVideos.map((vid, i) => (
                  <div key={i} className="project__gallery-item">
                    <video controls preload="none" poster={vid.poster}>
                      <source src={vid.src} type="video/mp4" />
                    </video>
                  </div>
                ))}
              </div>
            </section>
          )}

          {project.youtubeEmbed && (
            <section className="project__section">
              <h2>{t(site.project.videoDemo)}</h2>
              <div className="project__embed">
                <iframe
                  src={project.youtubeEmbed}
                  title={t(site.project.videoDemo)}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </section>
          )}

          {project.results && (
            <section className="project__section">
              <h2>{t(site.project.results)}</h2>
              <p>{t(project.results)}</p>
            </section>
          )}

          {inProgress && project.currentStatus && (
            <section className="project__section">
              <div className="project__status-banner">
                <span className="status-dot" />
                <p>{t(project.currentStatus)}</p>
              </div>
            </section>
          )}

          {project.pdfUrl && (
            <section className="project__section">
              <h2>{t(site.project.document)}</h2>
              <div className="project__links">
                <a className="btn btn--primary" href={project.pdfUrl} target="_blank" rel="noopener noreferrer">
                  {t(project.pdfLabel) || t(site.project.viewPdf)} ↗
                </a>
                <a className="btn btn--ghost" href={project.pdfUrl} download>
                  {t(site.project.downloadPdf)} ↓
                </a>
              </div>
            </section>
          )}

          {project.skillTags && (
            <section className="project__section">
              <h2>{t(site.project.skillsTools)}</h2>
              <div className="project__skill-tags">
                {project.skillTags.map((s) => (
                  <span key={s} className="chip">{s}</span>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Next project */}
        <Link to={`/projects/${next.id}`} className="project__next">
          <span className="project__next-label">{t(site.project.nextProject)}</span>
          <span className="project__next-title">
            {t(next.title)}
            <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 12L12 2M12 2H4.5M12 2V9.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </Link>
      </div>
    </article>
  )
}

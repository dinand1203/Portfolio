import { Window } from './Window'
import './ProjectWindow.css'

export function ProjectWindow({ project, isOpen, onClose, onFocus, zIndex, initialPosition, lang }) {
  if (!project) return null

  const inProgress = project.status === 'in-progress'
  const t = (field) => (field ? (field[lang] || field['en']) : null)

  return (
    <Window
      id={project.id}
      title={project.title[lang]}
      isOpen={isOpen}
      onClose={onClose}
      onFocus={onFocus}
      zIndex={zIndex}
      initialPosition={initialPosition}
    >
      <div className="pw">
        {/* ── Header ── */}
        <div className="pw__header">
          <div className="pw__header-top">
            <h1 className="pw__title">{t(project.title)}</h1>
            {inProgress && (
              <span className="pw__badge">
                <span className="pw__badge-dot" />
                {lang === 'en' ? 'In Progress' : 'In Ontwikkeling'}
              </span>
            )}
          </div>
          <p className="pw__subtitle">{t(project.subtitle)}</p>

          <div className="pw__meta">
            <div className="pw__meta-row">
              <span className="pw__meta-label">{lang === 'en' ? 'Year' : 'Jaar'}</span>
              <span className="pw__meta-value">{project.period ? t(project.period) : project.year}</span>
            </div>
            <div className="pw__meta-row">
              <span className="pw__meta-label">{lang === 'en' ? 'Role' : 'Rol'}</span>
              <span className="pw__meta-value">{t(project.role)}</span>
            </div>
            <div className="pw__meta-row">
              <span className="pw__meta-label">Stack</span>
              <div className="pw__tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="pw__tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Live / GitHub links */}
          {(project.liveUrl || project.githubUrl) && (
            <div className="pw__links">
              {project.liveUrl && (
                <a className="pw__link pw__link--primary" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  {lang === 'en' ? 'Open Live App →' : 'Open Live App →'}
                </a>
              )}
              {project.githubUrl && (
                <a className="pw__link pw__link--secondary" href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  {lang === 'en' ? 'View on GitHub →' : 'Bekijk op GitHub →'}
                </a>
              )}
            </div>
          )}
        </div>

        {/* ── Hero image ── */}
        <div className="pw__hero">
          <img src={project.image} alt={t(project.title)} />
        </div>

        {/* ── Body ── */}
        <div className="pw__body">

          {/* Research Question (Thermal AI) */}
          {project.researchQuestion && (
            <section className="pw__section">
              <h2 className="pw__section-title">{lang === 'en' ? 'Research Question' : 'Onderzoeksvraag'}</h2>
              <blockquote className="pw__blockquote">{t(project.researchQuestion)}</blockquote>
            </section>
          )}

          {/* Overview */}
          <section className="pw__section">
            <h2 className="pw__section-title">{lang === 'en' ? 'Overview' : 'Overzicht'}</h2>
            <p className="pw__text">{t(project.overview)}</p>
          </section>

          {/* Challenge */}
          {project.challenge && (
            <section className="pw__section">
              <h2 className="pw__section-title">{lang === 'en' ? 'The Challenge' : 'De Uitdaging'}</h2>
              <p className="pw__text">{t(project.challenge)}</p>
            </section>
          )}

          {/* Features */}
          {project.features && (
            <section className="pw__section">
              <h2 className="pw__section-title">{lang === 'en' ? 'Key Features' : 'Functies'}</h2>
              <ul className="pw__features">
                {project.features[lang].map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Tech Stack table */}
          {project.techStack && (
            <section className="pw__section">
              <h2 className="pw__section-title">{lang === 'en' ? 'Tech Stack' : 'Technologieën'}</h2>
              <table className="pw__table">
                <thead>
                  <tr>
                    <th>{lang === 'en' ? 'Layer' : 'Laag'}</th>
                    <th>{lang === 'en' ? 'Technology' : 'Technologie'}</th>
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

          {/* Approach */}
          {project.approach && (
            <section className="pw__section">
              <h2 className="pw__section-title">{lang === 'en' ? 'My Approach' : 'Mijn Aanpak'}</h2>
              {Array.isArray(project.approach[lang])
                ? project.approach[lang].map((p, i) => <p key={i} className="pw__text">{p}</p>)
                : <p className="pw__text">{t(project.approach)}</p>
              }
            </section>
          )}

          {/* Gallery images */}
          {project.galleryImages && project.galleryImages.length > 0 && (
            <section className="pw__section">
              <h2 className="pw__section-title">{lang === 'en' ? 'Gallery' : 'Galerij'}</h2>
              <div className="pw__gallery">
                {project.galleryImages.map((img, i) => (
                  <div key={i} className="pw__gallery-item">
                    <img src={img.src} alt={img.alt} />
                    {img.caption && <p className="pw__gallery-caption">{t(img.caption)}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Gallery videos */}
          {project.galleryVideos && project.galleryVideos.length > 0 && (
            <section className="pw__section">
              <h2 className="pw__section-title">{lang === 'en' ? 'Videos' : 'Video\'s'}</h2>
              <div className={project.galleryVideos.some(v => v.vertical) ? 'pw__gallery--vertical' : 'pw__gallery'}>
                {project.galleryVideos.map((vid, i) => (
                  <div key={i} className={vid.vertical ? 'pw__gallery-item--vertical' : 'pw__gallery-item'}>
                    <video controls poster={vid.poster}>
                      <source src={vid.src} type="video/mp4" />
                    </video>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* YouTube embed */}
          {project.youtubeEmbed && (
            <section className="pw__section">
              <h2 className="pw__section-title">{lang === 'en' ? 'Video Demo' : 'Video Demo'}</h2>
              <p className="pw__text pw__text--sm">
                {lang === 'en'
                  ? 'Watch the tool in action — from loading a CSV pricelist to placing an order and generating the output file.'
                  : 'Bekijk de tool in actie — van het laden van een CSV-prijslijst tot het plaatsen van een bestelling.'}
              </p>
              <div className="pw__embed">
                <iframe
                  src={project.youtubeEmbed}
                  title="Video Demo"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </section>
          )}

          {/* Results */}
          {project.results && (
            <section className="pw__section">
              <h2 className="pw__section-title">{lang === 'en' ? 'Results' : 'Resultaten'}</h2>
              <p className="pw__text">{t(project.results)}</p>
            </section>
          )}

          {/* In-progress status */}
          {inProgress && project.currentStatus && (
            <section className="pw__section">
              <div className="pw__status-banner">
                <span className="pw__badge-dot" />
                <p>{t(project.currentStatus)}</p>
              </div>
            </section>
          )}

          {/* PDF download */}
          {project.pdfUrl && (
            <section className="pw__section">
              <h2 className="pw__section-title">{lang === 'en' ? 'Document' : 'Document'}</h2>
              <div className="pw__pdf-links">
                <a className="pw__link pw__link--primary" href={project.pdfUrl} target="_blank" rel="noopener noreferrer">
                  {lang === 'en' ? '↗ View Full Screen (PDF)' : '↗ Volledig scherm bekijken (PDF)'}
                </a>
                <a className="pw__link pw__link--secondary" href={project.pdfUrl} download>
                  {t(project.pdfLabel) || (lang === 'en' ? '↓ Download PDF' : '↓ PDF Downloaden')}
                </a>
              </div>
            </section>
          )}

          {/* Skills tags */}
          {project.skillTags && (
            <section className="pw__section pw__section--last">
              <h2 className="pw__section-title">{lang === 'en' ? 'Skills & Tools' : 'Vaardigheden & Tools'}</h2>
              <div className="pw__skill-tags">
                {project.skillTags.map((s) => (
                  <span key={s} className="pw__skill-tag">{s}</span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </Window>
  )
}

import './MobileGrid.css'

export function MobileGrid({ projects, lang, onOpen }) {
  return (
    <div className="mobile-grid">
      <div className="mobile-grid__header">
        <h1 className="mobile-grid__name">Dinand Dap</h1>
        <p className="mobile-grid__role">
          {lang === 'en'
            ? 'Communication & Multimedia Designer'
            : 'Communicatie & Multimedia Ontwerper'}
        </p>
      </div>
      <div className="mobile-grid__projects">
        {projects.map((project) => (
          <button
            key={project.id}
            className="mobile-grid__item"
            onClick={() => onOpen(project.id)}
          >
            <div className="mobile-grid__thumb">
              <img src={project.image} alt={project.title[lang]} />
              {project.status === 'in-progress' && (
                <span className="mobile-grid__dot" />
              )}
            </div>
            <span className="mobile-grid__label">{project.title[lang]}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

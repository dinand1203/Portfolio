import './Dock.css'

const LINKEDIN_URL = 'https://www.linkedin.com/in/dinand-dap1'
const GITHUB_URL = 'https://github.com/dinand1203'

export function Dock({ onOpenAbout, onOpenSkills, onOpenChat, onToggleLang, lang }) {
  return (
    <div className="dock glass">
      {/* About */}
      <button className="dock__item" onClick={onOpenAbout} title="About me">
        <div className="dock__icon dock__icon--avatar">
          <img src="/images/projects/icons/aboutme-desktopicon.svg" alt="Dinand Dap" />
        </div>
        <span className="dock__tooltip">{lang === 'en' ? 'About me' : 'Over mij'}</span>
      </button>

      {/* Skills */}
      <button className="dock__item" onClick={onOpenSkills} title="Skills">
        <div className="dock__icon dock__icon--skills">
          <span>✦</span>
        </div>
        <span className="dock__tooltip">{lang === 'en' ? 'Skills' : 'Vaardigheden'}</span>
      </button>

      {/* Chat */}
      <button className="dock__item" onClick={onOpenChat} title="Chat">
        <div className="dock__icon dock__icon--chat">
          <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 2H4C2.9 2 2 2.9 2 4v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
          </svg>
        </div>
        <span className="dock__tooltip">{lang === 'nl' ? 'Stel een vraag' : 'Ask me anything'}</span>
      </button>

      <div className="dock__divider" />

      {/* LinkedIn */}
      <a
        className="dock__item"
        href={LINKEDIN_URL}
        target="_blank"
        rel="noopener noreferrer"
        title="LinkedIn"
      >
        <div className="dock__icon dock__icon--linkedin">
          <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </div>
        <span className="dock__tooltip">LinkedIn</span>
      </a>

      {/* GitHub */}
      <a
        className="dock__item"
        href={GITHUB_URL}
        target="_blank"
        rel="noopener noreferrer"
        title="GitHub"
      >
        <div className="dock__icon dock__icon--github">
          <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
          </svg>
        </div>
        <span className="dock__tooltip">GitHub</span>
      </a>

      {/* Language toggle */}
      <div className="dock__divider" />
      <button className="dock__item dock__lang-btn" onClick={onToggleLang} title="Toggle language">
        <div className="dock__icon dock__icon--lang">
          <span>{lang === 'en' ? 'NL' : 'EN'}</span>
        </div>
        <span className="dock__tooltip">{lang === 'en' ? 'Switch to NL' : 'Wissel naar EN'}</span>
      </button>
    </div>
  )
}

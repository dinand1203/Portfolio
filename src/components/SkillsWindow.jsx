import { Window } from './Window'
import { skillsData } from '../data/projects'
import './SkillsWindow.css'

export function SkillsWindow({ isOpen, onClose, onFocus, zIndex, initialPosition, lang }) {
  const categories = skillsData[lang]

  return (
    <Window
      id="skills"
      title="Skills"
      isOpen={isOpen}
      onClose={onClose}
      onFocus={onFocus}
      zIndex={zIndex}
      initialPosition={initialPosition}
    >
      <div className="skills-window">
        <h2 className="skills-window__heading">
          {lang === 'en' ? 'What I work with' : 'Waarmee ik werk'}
        </h2>
        <div className="skills-window__grid">
          {categories.map((cat) => (
            <div key={cat.category} className="skills-window__category">
              <div className="skills-window__category-header">
                <span className="skills-window__icon">{cat.icon}</span>
                <h3 className="skills-window__category-title">{cat.category}</h3>
              </div>
              <ul className="skills-window__list">
                {cat.skills.map((skill) => (
                  <li key={skill} className="skills-window__item">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Window>
  )
}

import { useState, useCallback, useEffect } from 'react'
import { projects } from './data/projects'
import { DesktopIcon } from './components/DesktopIcon'
import { AboutWindow } from './components/AboutWindow'
import { SkillsWindow } from './components/SkillsWindow'
import { ProjectWindow } from './components/ProjectWindow'
import { ChatWindow } from './components/ChatWindow'
import { MobileGrid } from './components/MobileGrid'
import { Dock } from './components/Dock'
import './App.css'

const BASE_Z = 100

// Convert percentage-string position (e.g. '7%') to pixels
function iconPctToPixels({ x, y }) {
  const pctX = parseFloat(x) / 100
  const pctY = parseFloat(y) / 100
  return {
    x: Math.round(window.innerWidth * pctX),
    y: Math.round(window.innerHeight * pctY),
  }
}

function getDefaultWindowPos() {
  const w = window.innerWidth
  const h = window.innerHeight
  const winW = Math.min(1280, w - 32)
  const winH = Math.round(h * 0.72)
  const x = Math.max(16, Math.round((w - winW) / 2))
  const y = Math.max(16, Math.round((h - winH) / 2))
  return { x, y }
}

export default function App() {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en')
  const [topZ, setTopZ] = useState(BASE_Z)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900)

  // Window state: { isOpen, zIndex, position }
  const [windowStates, setWindowStates] = useState(() => {
    const init = {}
    init['about'] = { isOpen: false, zIndex: BASE_Z + 1, position: { x: 80, y: 100 } }
    init['skills'] = { isOpen: false, zIndex: BASE_Z, position: getDefaultWindowPos(1) }
    const isMobileInit = window.innerWidth < 900
    init['chat'] = { isOpen: false, zIndex: BASE_Z, position: isMobileInit ? { x: 8, y: 8 } : { x: Math.max(16, window.innerWidth - 480), y: 80 } }
    // Projects — all closed
    projects.forEach((p, i) => {
      init[p.id] = { isOpen: false, zIndex: BASE_Z, position: getDefaultWindowPos(i) }
    })
    return init
  })

  // Responsive
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 900)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  // Persist language
  useEffect(() => {
    localStorage.setItem('lang', lang)
  }, [lang])

  const bringToFront = useCallback((id) => {
    setTopZ((z) => z + 1)
    setWindowStates((prev) => ({
      ...prev,
      [id]: { ...prev[id], zIndex: topZ + 1 },
    }))
  }, [topZ])

  const openWindow = useCallback((id) => {
    setTopZ((z) => z + 1)
    setWindowStates((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isOpen: true,
        zIndex: topZ + 1,
        // Re-center if first open
        position: prev[id].isOpen ? prev[id].position : getDefaultWindowPos(),
      },
    }))
  }, [topZ])

  const closeWindow = useCallback((id) => {
    setWindowStates((prev) => ({
      ...prev,
      [id]: { ...prev[id], isOpen: false },
    }))
  }, [])

  const toggleAbout = useCallback(() => {
    const state = windowStates['about']
    if (state.isOpen) {
      closeWindow('about')
    } else {
      openWindow('about')
    }
  }, [windowStates, openWindow, closeWindow])

  const toggleSkills = useCallback(() => {
    const state = windowStates['skills']
    if (state.isOpen) {
      closeWindow('skills')
    } else {
      openWindow('skills')
    }
  }, [windowStates, openWindow, closeWindow])

  const toggleChat = useCallback(() => {
    const state = windowStates['chat']
    if (state.isOpen) {
      closeWindow('chat')
    } else {
      openWindow('chat')
    }
  }, [windowStates, openWindow, closeWindow])

  const toggleLang = useCallback(() => {
    setLang((l) => (l === 'en' ? 'nl' : 'en'))
  }, [])

  // Background: placeholder gradient until portrait is added
  // To use a portrait: set background-image in App.css .app__desktop
  const backgroundStyle = {}

  return (
    <div className="app">
      {/* Desktop */}
      <div className="app__desktop" style={backgroundStyle}>
        {/* Grain/noise overlay for depth */}
        <div className="app__grain" />

        {isMobile ? (
          <MobileGrid
            projects={projects}
            lang={lang}
            onOpen={openWindow}
          />
        ) : (
          // Desktop icons — initial positions computed once from percentages
          projects.map((project) => (
            <DesktopIcon
              key={project.id}
              project={project}
              lang={lang}
              onClick={openWindow}
              isMobile={isMobile}
              initialPosition={iconPctToPixels(project.iconPosition)}
            />
          ))
        )}
      </div>

      {/* Windows */}
      <AboutWindow
        isOpen={windowStates['about'].isOpen}
        zIndex={windowStates['about'].zIndex}
        initialPosition={windowStates['about'].position}
        onClose={closeWindow}
        onFocus={() => bringToFront('about')}
        lang={lang}
      />

      <SkillsWindow
        isOpen={windowStates['skills'].isOpen}
        zIndex={windowStates['skills'].zIndex}
        initialPosition={windowStates['skills'].position}
        onClose={closeWindow}
        onFocus={() => bringToFront('skills')}
        lang={lang}
      />

      {projects.map((project) => (
        <ProjectWindow
          key={project.id}
          project={project}
          isOpen={windowStates[project.id].isOpen}
          zIndex={windowStates[project.id].zIndex}
          initialPosition={windowStates[project.id].position}
          onClose={closeWindow}
          onFocus={() => bringToFront(project.id)}
          lang={lang}
        />
      ))}

      <ChatWindow
        isOpen={windowStates['chat'].isOpen}
        zIndex={windowStates['chat'].zIndex}
        initialPosition={windowStates['chat'].position}
        onClose={closeWindow}
        onFocus={() => bringToFront('chat')}
        lang={lang}
      />

      {/* Dock */}
      <Dock
        onOpenAbout={toggleAbout}
        onOpenSkills={toggleSkills}
        onOpenChat={toggleChat}
        onToggleLang={toggleLang}
        lang={lang}
      />
    </div>
  )
}

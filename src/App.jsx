import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { LanguageProvider } from './i18n'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { ChatWidget } from './components/ChatWidget'
import { Home } from './pages/Home'
import { ProjectPage } from './pages/ProjectPage'
import { NotFound } from './pages/NotFound'

function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

export default function App() {
  return (
    <LanguageProvider>
      <ScrollManager />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:id" element={<ProjectPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <ChatWidget />
    </LanguageProvider>
  )
}

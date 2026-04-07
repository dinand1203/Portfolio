import { useState, useRef, useCallback } from 'react'
import './DesktopIcon.css'

const STORAGE_KEY = (id) => `icon-pos-${id}`

function pctToPixels({ xPct, yPct }) {
  return {
    x: Math.round(window.innerWidth * xPct),
    y: Math.round(window.innerHeight * yPct),
  }
}

function pixelsToPct({ x, y }) {
  return {
    xPct: x / window.innerWidth,
    yPct: y / window.innerHeight,
  }
}

export function DesktopIcon({ project, lang, onClick, isMobile, initialPosition }) {
  const [position, setPosition] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY(project.id))
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed.xPct !== undefined) return pctToPixels(parsed)
        // Old format (absolute pixels) — discard and use default
        localStorage.removeItem(STORAGE_KEY(project.id))
      }
    } catch {}
    return initialPosition
  })
  const dragRef = useRef(null)
  const hasDragged = useRef(false)
  const lastPos = useRef(position)

  const handleMouseDown = useCallback(
    (e) => {
      if (e.button !== 0) return
      e.preventDefault()

      hasDragged.current = false
      dragRef.current = {
        startMouseX: e.clientX,
        startMouseY: e.clientY,
        startPosX: position.x,
        startPosY: position.y,
      }

      const onMouseMove = (e) => {
        if (!dragRef.current) return
        const dx = e.clientX - dragRef.current.startMouseX
        const dy = e.clientY - dragRef.current.startMouseY
        if (Math.abs(dx) > 5 || Math.abs(dy) > 5) hasDragged.current = true
        const next = {
          x: dragRef.current.startPosX + dx,
          y: dragRef.current.startPosY + dy,
        }
        lastPos.current = next
        setPosition(next)
      }

      const onMouseUp = () => {
        if (hasDragged.current) {
          try { localStorage.setItem(STORAGE_KEY(project.id), JSON.stringify(pixelsToPct(lastPos.current))) } catch {}
        }
        dragRef.current = null
        document.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseup', onMouseUp)
      }

      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseup', onMouseUp)
    },
    [position]
  )

  // Touch support
  const handleTouchStart = useCallback(
    (e) => {
      const touch = e.touches[0]
      hasDragged.current = false
      dragRef.current = {
        startMouseX: touch.clientX,
        startMouseY: touch.clientY,
        startPosX: position.x,
        startPosY: position.y,
      }

      const onTouchMove = (e) => {
        if (!dragRef.current) return
        e.preventDefault()
        const touch = e.touches[0]
        const dx = touch.clientX - dragRef.current.startMouseX
        const dy = touch.clientY - dragRef.current.startMouseY
        if (Math.abs(dx) > 5 || Math.abs(dy) > 5) hasDragged.current = true
        const next = {
          x: dragRef.current.startPosX + dx,
          y: dragRef.current.startPosY + dy,
        }
        lastPos.current = next
        setPosition(next)
      }

      const onTouchEnd = () => {
        if (hasDragged.current) {
          try { localStorage.setItem(STORAGE_KEY(project.id), JSON.stringify(pixelsToPct(lastPos.current))) } catch {}
        }
        dragRef.current = null
        document.removeEventListener('touchmove', onTouchMove)
        document.removeEventListener('touchend', onTouchEnd)
      }

      document.addEventListener('touchmove', onTouchMove, { passive: false })
      document.addEventListener('touchend', onTouchEnd)
    },
    [position]
  )

  const handleClick = () => {
    if (hasDragged.current) {
      hasDragged.current = false
      return
    }
    onClick(project.id)
  }

  if (isMobile) return null

  return (
    <div
      className="desktop-icon"
      style={{ left: position.x, top: position.y }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      title={project.title[lang]}
      onKeyDown={(e) => e.key === 'Enter' && onClick(project.id)}
    >
      <div className="desktop-icon__thumb">
        <img src={project.thumbnail || project.image} alt={project.title[lang]} draggable={false} />
        {project.status === 'in-progress' && (
          <span className="desktop-icon__dot" />
        )}
      </div>
      <span className="desktop-icon__label">{project.title[lang]}</span>
    </div>
  )
}

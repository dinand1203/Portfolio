import { useRef } from 'react'
import { useDraggable } from '../hooks/useDraggable'
import './Window.css'

export function Window({ id, title, isOpen, onClose, onFocus, zIndex, initialPosition, children }) {
  const { position, onMouseDown, onTouchStart } = useDraggable(initialPosition)

  if (!isOpen) return null

  return (
    <div
      className="window glass"
      style={{ left: position.x, top: position.y, zIndex }}
      onMouseDown={onFocus}
    >
      {/* Title bar — drag handle */}
      <div
        className="window__titlebar"
        onMouseDown={(e) => { onFocus(); onMouseDown(e) }}
        onTouchStart={(e) => { onFocus(); onTouchStart(e) }}
      >
        <div className="window__traffic-lights">
          <button
            className="tl tl--close"
            onClick={(e) => { e.stopPropagation(); onClose(id) }}
            aria-label="Close"
          />
          <button className="tl tl--minimize" aria-label="Minimize" />
          <button className="tl tl--maximize" aria-label="Maximize" />
        </div>
        <span className="window__title">{title}</span>
      </div>

      {/* Content */}
      <div className="window__content window-scroll">
        {children}
      </div>
    </div>
  )
}

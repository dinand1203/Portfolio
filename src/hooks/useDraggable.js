import { useState, useRef, useCallback } from 'react'

export function useDraggable(initialPosition) {
  const [position, setPosition] = useState(initialPosition)
  const dragRef = useRef(null)

  const onMouseDown = useCallback(
    (e) => {
      // Only drag on left mouse button
      if (e.button !== 0) return
      e.preventDefault()

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
        setPosition({
          x: dragRef.current.startPosX + dx,
          y: dragRef.current.startPosY + dy,
        })
      }

      const onMouseUp = () => {
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
  const onTouchStart = useCallback(
    (e) => {
      const touch = e.touches[0]
      dragRef.current = {
        startMouseX: touch.clientX,
        startMouseY: touch.clientY,
        startPosX: position.x,
        startPosY: position.y,
      }

      const onTouchMove = (e) => {
        if (!dragRef.current) return
        const touch = e.touches[0]
        const dx = touch.clientX - dragRef.current.startMouseX
        const dy = touch.clientY - dragRef.current.startMouseY
        setPosition({
          x: dragRef.current.startPosX + dx,
          y: dragRef.current.startPosY + dy,
        })
      }

      const onTouchEnd = () => {
        dragRef.current = null
        document.removeEventListener('touchmove', onTouchMove)
        document.removeEventListener('touchend', onTouchEnd)
      }

      document.addEventListener('touchmove', onTouchMove, { passive: false })
      document.addEventListener('touchend', onTouchEnd)
    },
    [position]
  )

  return { position, setPosition, onMouseDown, onTouchStart }
}

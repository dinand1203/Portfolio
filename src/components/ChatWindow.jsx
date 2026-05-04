import { useState, useRef, useEffect, useCallback } from 'react'
import { Window } from './Window'
import './ChatWindow.css'

const API_URL = import.meta.env.VITE_CHAT_API_URL || ''

const INITIAL_MESSAGE = {
  role: 'assistant',
  content: "Hi! I'm an AI assistant for Dinand's portfolio. Ask me anything about his projects, skills, or experience — in English or Dutch!",
}

export function ChatWindow({ isOpen, onClose, onFocus, zIndex, initialPosition, lang }) {
  const [messages, setMessages] = useState([INITIAL_MESSAGE])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 150)
      return () => clearTimeout(t)
    }
  }, [isOpen])

  const sendMessage = useCallback(async () => {
    if (!input.trim() || loading || !API_URL) return

    const userMsg = { role: 'user', content: input.trim() }
    const next = [...messages, userMsg]
    setMessages(next)
    setInput('')
    if (inputRef.current) inputRef.current.style.height = 'auto'
    setLoading(true)

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: next.map(({ role, content }) => ({ role, content })),
        }),
      })
      if (!res.ok) throw new Error('API error')
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.message }])
    } catch {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content:
            lang === 'nl'
              ? 'Sorry, ik heb momenteel verbindingsproblemen. Probeer het over een moment opnieuw.'
              : "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
        },
      ])
    } finally {
      setLoading(false)
    }
  }, [input, loading, messages, lang])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const handleInputChange = (e) => {
    setInput(e.target.value)
    e.target.style.height = 'auto'
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px'
  }

  const placeholder = API_URL
    ? lang === 'nl'
      ? 'Stel een vraag over Dinand…'
      : 'Ask anything about Dinand…'
    : '⚙️ API not configured yet'

  return (
    <Window
      id="chat"
      title={lang === 'nl' ? 'Chat met Dinand' : 'Chat with Dinand'}
      isOpen={isOpen}
      onClose={onClose}
      onFocus={onFocus}
      zIndex={zIndex}
      initialPosition={initialPosition}
      className="window--chat"
    >
      <div className="chat-window">
        <div className="chat-window__messages window-scroll">
          {messages.map((msg, i) => (
            <div key={i} className={`chat-window__row chat-window__row--${msg.role}`}>
              {msg.role === 'assistant' && (
                <div className="chat-window__avatar">D</div>
              )}
              <div className={`chat-window__bubble chat-window__bubble--${msg.role}`}>
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="chat-window__row chat-window__row--assistant">
              <div className="chat-window__avatar">D</div>
              <div className="chat-window__bubble chat-window__bubble--assistant chat-window__bubble--typing">
                <span /><span /><span />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        <div className="chat-window__input-area">
          <textarea
            ref={inputRef}
            className="chat-window__input"
            placeholder={placeholder}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            disabled={loading || !API_URL}
            rows={1}
          />
          <button
            className="chat-window__send"
            onClick={sendMessage}
            disabled={!input.trim() || loading || !API_URL}
            aria-label="Send"
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 20V4M12 4L6 10M12 4L18 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </Window>
  )
}

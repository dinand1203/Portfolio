import { useCallback, useEffect, useRef, useState } from 'react'
import { useLang, useT } from '../i18n'
import { site } from '../data/site'
import './ChatWidget.css'

const API_URL = import.meta.env.VITE_CHAT_API_URL || ''

// Other components can open the chat via: window.dispatchEvent(new Event('open-chat'))
export function ChatWidget() {
  const { lang } = useLang()
  const t = useT()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    const openHandler = () => setOpen(true)
    window.addEventListener('open-chat', openHandler)
    return () => window.removeEventListener('open-chat', openHandler)
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => inputRef.current?.focus(), 150)
      return () => clearTimeout(timer)
    }
  }, [open])

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
      setMessages((prev) => [...prev, { role: 'assistant', content: data.message }])
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: t(site.chat.error) }])
    } finally {
      setLoading(false)
    }
  }, [input, loading, messages, t])

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

  return (
    <div className="chat">
      {open && (
        <div className="chat__panel" role="dialog" aria-label={t(site.chat.title)}>
          <div className="chat__header">
            <div className="chat__header-title">
              <span className="status-dot" />
              <span>{t(site.chat.title)}</span>
            </div>
            <button className="chat__close" onClick={() => setOpen(false)} aria-label="Close chat">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="chat__messages">
            <div className="chat__bubble chat__bubble--assistant">{t(site.chat.intro)}</div>
            {messages.map((msg, i) => (
              <div key={i} className={`chat__bubble chat__bubble--${msg.role}`}>
                {msg.content}
              </div>
            ))}
            {loading && (
              <div className="chat__bubble chat__bubble--assistant chat__typing">
                <span /><span /><span />
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="chat__input-area">
            <textarea
              ref={inputRef}
              className="chat__input"
              placeholder={API_URL ? t(site.chat.placeholder) : t(site.chat.offline)}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              disabled={loading || !API_URL}
              rows={1}
            />
            <button
              className="chat__send"
              onClick={sendMessage}
              disabled={!input.trim() || loading || !API_URL}
              aria-label="Send"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 20V4M12 4L6 10M12 4L18 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <button
        className={`chat__fab ${open ? 'chat__fab--open' : ''}`}
        onClick={() => setOpen((o) => !o)}
        aria-label={t(site.chat.open)}
        aria-expanded={open}
      >
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M4 14.5L2.5 17.5V4.5C2.5 3.4 3.4 2.5 4.5 2.5H15.5C16.6 2.5 17.5 3.4 17.5 4.5V12.5C17.5 13.6 16.6 14.5 15.5 14.5H4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M6.5 7H13.5M6.5 10H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  )
}

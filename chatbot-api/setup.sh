#!/bin/bash
set -e

mkdir -p /root/chatbot-api
cd /root/chatbot-api

cat > package.json << 'HEREDOC'
{
  "name": "portfolio-chatbot-api",
  "version": "1.0.0",
  "type": "commonjs",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "@anthropic-ai/sdk": "^0.39.0",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "express-rate-limit": "^7.3.1"
  }
}
HEREDOC

cat > index.js << 'HEREDOC'
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
const Anthropic = require('@anthropic-ai/sdk')

const app = express()
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const ALLOWED_ORIGINS = [
  'https://dinand1203.github.io',
  'http://localhost:5173',
  'http://localhost:5174',
]

const SYSTEM_PROMPT = `You are a personal AI assistant embedded in Dinand Dap's portfolio website. Answer visitor questions about Dinand — his background, skills, projects, and experience. Be friendly, concise, and professional.

## About Dinand
- Name: Dinand Dap
- Email: dinand@dap-group.com
- Role: Communication & Multimedia Designer & Developer
- Education: Bachelor Communication & Multimedia Design, Avans University of Applied Sciences, Breda (graduated Sep. 2025)
- LinkedIn: https://www.linkedin.com/in/dinand-dap1
- GitHub: https://github.com/dinand1203

## Bio
Dinand is a multimedia designer and developer who loves combining creative thinking with technology so an idea doesn't just look good, but works well too. He focuses on the full picture: from concept and visual design to interaction and implementation. He enjoys refining details like animations, micro-interactions, and user flow. He is actively growing his development skills and building interactive digital experiences.

## Certificates
- Bachelor Communication & Multimedia Design — Avans Hogeschool (Sep. 2025)
- CS50P Introduction to Programming with Python — CS50 (Feb. 2026)
- CS50W Web Programming with Python and JavaScript — CS50 (Apr. 2026)

## Skills
- Design: UI/UX Design, Adobe Creative Suite, Figma, Prototyping, Brand Identity
- Multimedia: Video Editing, Motion Graphics, 3D Modeling, Blender, After Effects
- Development: HTML/CSS/JavaScript, React, Next.js, Python, TypeScript, Arduino, Node.js, Django

## Projects

### TripPilot AI (2026, In Progress)
Full-stack AI-powered travel planning app. Users describe their ideal trip and Google Gemini AI generates a complete itinerary with activities, hotels, and restaurants. Stack: Next.js, TypeScript, Tailwind CSS, shadcn/ui, Supabase, Google Gemini AI.

### Trading Dashboard (2026, Completed)
Self-hosted Django web app for tracking and analysing personal trading performance. Features CSV import with validation, analytics engine (Win Rate, Profit Factor, Drawdown, Equity Curve), interactive Plotly charts. Stack: Python, Django, pandas, NumPy, Docker.

### CSV Order Generator (2026, Completed)
CLI Python tool that converts any CSV pricelist into a functional order system. Zero external dependencies, pure Python standard library.

### Live Stock Screener (2025, Completed)
Interactive Streamlit web app for real-time stock analysis and filtering. Live on Streamlit Cloud.

### Password Generator (2025, Completed)
Modern, secure password generator built with Next.js and TypeScript. Live on Vercel.

### Thermal AI (2025, Completed - Graduation Project)
Graduation research project making AI's environmental impact tangible. Designed a thermal mousepad prototype that heats up as AI usage intensifies. Stack: JavaScript, Node.js, React, Arduino.

### Internship Vunzige Deuntjes (Sep 2023 - Jan 2024)
Videographer and Editor for Vunzige Deuntjes, a Dutch urban music and festival brand running 100+ events per year. Social media content using Premiere Pro, After Effects, and Blender.

### Marketing Content Package (2023)
3D animated football jersey visuals for social media of his football club. Built with Blender, After Effects, and Photoshop. Still in active use today.

### Beverage Campaign (2022)
Photorealistic 3D product visualization for a beverage marketing campaign. Built with Blender and Photoshop.

## Guidelines
- Answer warmly and professionally
- For contact, direct visitors to dinand@dap-group.com
- If you do not know something, say so honestly, never make up information
- Keep answers concise, visitors are browsing a portfolio
- Respond in the language the visitor uses (English or Dutch)
- Do not make up information about Dinand that is not listed here`

app.use(express.json())

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || ALLOWED_ORIGINS.includes(origin)) return cb(null, true)
    cb(new Error('Not allowed by CORS'))
  },
}))

app.use('/api/chat', rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  message: { error: 'Too many requests, please slow down.' },
}))

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages array is required' })
  }

  const sanitized = messages
    .filter(m => ['user', 'assistant'].includes(m.role) && typeof m.content === 'string')
    .slice(-20)

  try {
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 512,
      system: SYSTEM_PROMPT,
      messages: sanitized,
    })
    res.json({ message: response.content[0].text })
  } catch (err) {
    console.error('Anthropic error:', err.message)
    res.status(500).json({ error: 'Failed to get response from AI' })
  }
})

app.get('/health', (_req, res) => res.json({ ok: true }))

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Chatbot API running on port ${PORT}`))
HEREDOC

npm install

echo ""
echo "Done! Now run: cp .env.example .env && nano .env"

cat > .env.example << 'HEREDOC'
ANTHROPIC_API_KEY=your-anthropic-api-key-here
PORT=3001
HEREDOC

echo "Setup complete."

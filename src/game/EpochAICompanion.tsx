import { useState } from 'react'
import { links } from '../data/content'
import { sounds } from './SoundEngine'

interface EpochProps {
  onWarpToEra?: (eraId: string) => void
  onOpenResume?: () => void
}

interface Message {
  sender: 'user' | 'epoch'
  text: string
  action?: { label: string; onClick: () => void }
}

export function EpochAICompanion({ onWarpToEra, onOpenResume }: EpochProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'epoch',
      text: `Greetings! I am EPOCH, the temporal AI navigator for Roop Sai Charan Kothamasu. Ask me about Roop's projects, University of Florida Master's coursework, AWS internship, or IEEE research!`,
    },
  ])

  const knowledgeBase: { keywords: string[]; answer: string; era?: string; isResume?: boolean }[] = [
    {
      keywords: ['best ai', 'meetmint', 'productivity', 'rag', 'gemini'],
      answer: `Roop's flagship AI project is "MeetMint: AI-Powered Productivity Dashboard" (Go, React, Gemini 1.5 Flash, SQLite RAG). It transcribes meeting audio and extracts structured project tasks with under 250ms latency.`,
      era: 'horizon',
    },
    {
      keywords: ['uf', 'florida', 'university', 'gator', 'master', 'education'],
      answer: `Roop is pursuing a Master's in Computer Science at the University of Florida, Gainesville (Aug 2025 – Aug 2027), focusing on distributed systems and AI architecture. He previously completed his B.Tech in CSE (AIML) at SRM University AP with a 7.9/10 CGPA.`,
      era: 'library',
    },
    {
      keywords: ['chatbot', 'game room', 'chromadb', 'llama'],
      answer: `At the University of Florida, Roop built the full-stack AI-Powered Game Room Chatbot using Node.js, ChromaDB vector store, and Llama-3 with strict RBAC and regex guardrails.`,
      era: 'library',
    },
    {
      keywords: ['aws', 'intern', 'cloud', 'apssdc', 'experience'],
      answer: `During his AWS Cloud Computing Internship at APSSDC (Jun–Aug 2023), Roop improved application uptime by 35%, automated CI/CD pipelines to cut manual release overhead by 30%, and reduced infrastructure costs by 20% using CloudWatch.`,
      era: 'control',
    },
    {
      keywords: ['ieee', 'research', 'paper', 'publication', 'compression', 'intrusion'],
      answer: `Roop has co-authored two peer-reviewed IEEE papers: (1) Lossless image compression techniques for IoT devices (IEEE ICEEICT 2024), and (2) Explainable AI hybrid models for network intrusion detection (IEEE ICAECT 2025), plus a patent on decentralized health records.`,
      era: 'research',
    },
    {
      keywords: ['skills', 'stack', 'languages', 'tech', 'technologies'],
      answer: `Roop's core stack includes: TypeScript, JavaScript, Python, Go, C++, React.js, Next.js, Three.js, Node.js, AWS (EC2/CloudWatch), Docker, ChromaDB, SQLite, and Solidity.`,
    },
    {
      keywords: ['resume', 'cv', 'hire', 'contact', 'email', 'phone'],
      answer: `You can reach Roop at ${links.email} or call +1 (352) 721-6208. You can also inspect his verified resume right now.`,
      isResume: true,
    },
  ]

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim()
    if (!query) return

    sounds.playSwitchClick()
    const newMessages: Message[] = [...messages, { sender: 'user', text: query }]
    setInput('')

    // Simple RAG match
    const lower = query.toLowerCase()
    const match = knowledgeBase.find((item) =>
      item.keywords.some((kw) => lower.includes(kw))
    )

    let reply = `I can answer queries regarding Roop's Master's at University of Florida, MeetMint AI dashboard, AWS Cloud Internship, IEEE research publications, or verified resume.`
    let action = undefined

    if (match) {
      reply = match.answer
      if (match.era && onWarpToEra) {
        action = {
          label: `Warp Time Machine to this Era ⚡`,
          onClick: () => {
            onWarpToEra(match.era!)
            setIsOpen(false)
          },
        }
      } else if (match.isResume && onOpenResume) {
        action = {
          label: `Open Full Resume 📄`,
          onClick: onOpenResume,
        }
      }
    }

    setTimeout(() => {
      sounds.playGreetingChime()
      setMessages([...newMessages, { sender: 'epoch', text: reply, action }])
    }, 400)
  }

  return (
    <div className="epoch-companion-wrap">
      {/* Floating Toggle Pill */}
      <button
        type="button"
        className={`epoch-trigger-btn ${isOpen ? 'active' : ''}`}
        onClick={() => {
          sounds.playSwitchClick()
          setIsOpen(!isOpen)
        }}
        title="Ask EPOCH AI Companion"
      >
        <span className="epoch-icon">🤖</span>
        <span className="epoch-btn-text">EPOCH AI</span>
        <span className="epoch-online-dot" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="epoch-chat-dialog">
          <div className="epoch-dialog-header">
            <div className="epoch-header-left">
              <span className="epoch-avatar">🤖</span>
              <div>
                <strong>EPOCH // AI COMPANION</strong>
                <small>Grounded in Roop&apos;s Verified Credentials</small>
              </div>
            </div>
            <button
              type="button"
              className="epoch-close-btn"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
          </div>

          <div className="epoch-messages-scroll">
            {messages.map((m, idx) => (
              <div key={idx} className={`epoch-msg-row ${m.sender}`}>
                <div className="epoch-msg-bubble">
                  <p>{m.text}</p>
                  {m.action && (
                    <button
                      type="button"
                      className="epoch-action-btn"
                      onClick={m.action.onClick}
                    >
                      {m.action.label}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Query Suggestions */}
          <div className="epoch-quick-chips">
            <button type="button" onClick={() => handleSend('What is your best AI project?')}>
              Best AI Project
            </button>
            <button type="button" onClick={() => handleSend('Tell me about your UF education')}>
              UF Master&apos;s
            </button>
            <button type="button" onClick={() => handleSend('Tell me about your AWS internship')}>
              AWS Internship
            </button>
            <button type="button" onClick={() => handleSend('Show me your IEEE publications')}>
              IEEE Papers
            </button>
          </div>

          {/* Input Box */}
          <form
            className="epoch-input-form"
            onSubmit={(e) => {
              e.preventDefault()
              handleSend()
            }}
          >
            <input
              type="text"
              placeholder="Ask EPOCH anything about Roop..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit">SEND</button>
          </form>
        </div>
      )}
    </div>
  )
}

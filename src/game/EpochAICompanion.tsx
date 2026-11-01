import { useState } from 'react'
import { traveler, links, type EraId } from '../data/content'
import { sounds } from './SoundEngine'

interface EpochProps {
  onWarpToEra?: (eraId: string) => void
  onOpenResume?: () => void
}

interface Message {
  sender: 'user' | 'epoch'
  text: string
  action?: { label: string; onClick?: () => void; href?: string; download?: string }
}

export function EpochAICompanion({ onWarpToEra, onOpenResume }: EpochProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'epoch',
      text: `Greetings! I am EPOCH, the centralized AI assistant for Roop Sai Charan Kothamasu. Ask me about Roop's Master's at UF (graduating May 2027), McTrans TRACER research, Agentic AI for Chip Design, Mamba World Models, MeetMint, or IEEE publications!`,
    },
  ])

  // Centralized knowledge base dynamically sourced from content.ts to guarantee 100% consistency
  const buildKnowledgeBase = () => [
    {
      keywords: ['tracer', 'mctrans', 'freeway', 'highway', 'lrs', 'segmentation'],
      answer: `TRACER is Roop's research software engineering project at the University of Florida, sponsored by McTrans. He engineered automated Python data pipelines processing 1.2M+ state DOT LRS records across 71 routes and 4,599 corridor-miles (99.8% raw volume reduction with full data governance), classifying segments under Highway Capacity Manual (HCM 7th Edition) standards for McTrans HCS software.`,
      era: 'library' as EraId,
    },
    {
      keywords: ['chip design', 'vlsi', 'semiconductor', 'eda', 'latex', 'hardware'],
      answer: `At UF's Electrical & Computer Engineering department, Roop is a Research Assistant developing an agentic AI orchestration platform using LLMs to assist semiconductor engineers and coordinate EDA tool workflows. He built domain-specific RAG pipelines to clean and structure VLSI textbooks and research papers with mathematical formula preservation.`,
      era: 'foundry' as EraId,
    },
    {
      keywords: ['world model', 'mamba', 'autonomous', 'vehicle', 'trajectory', 'physics'],
      answer: `Under advisor Dr. Ivan Ruchikin at UF, Roop developed a physics-informed Mamba state-space trajectory forecasting model in PyTorch trained on 8,000+ driving episodes (6.4M+ time-steps). By integrating kinematic bicycle model constraints into the loss function, he achieved 23% lower MSE vs. vanilla Mamba and reduced physically implausible predictions by 47% at <12ms inference.`,
      era: 'horizon' as EraId,
    },
    {
      keywords: ['meetmint', 'meeting', 'productivity', 'gemini', 'transcription'],
      answer: `MeetMint is an end-to-end customer-facing AI meeting assistant with 8 Go REST API endpoints for audio summarization, action-item extraction, and local SQLite RAG search. It delivers p95 latency under 300ms, sub-2s semantic retrieval, and has 35+ automated tests (92% code coverage).`,
      era: 'horizon' as EraId,
    },
    {
      keywords: ['uf', 'florida', 'university', 'gator', 'master', 'education', 'graduate', 'graduation', 'degree'],
      answer: `Roop is pursuing his Master's in Computer Science at the University of Florida in Gainesville, FL (Aug 2025 – May 2027). He previously earned his B.Tech in Computer Science (AIML Specialization) from SRM University AP (Mar 2021 – Mar 2025) with a CGPA of 7.9/10. He is actively seeking 2027 new-grad Software Engineering and AI/ML opportunities.`,
      era: 'library' as EraId,
    },
    {
      keywords: ['chatbot', 'game room', 'reitz'],
      answer: `At the UF Reitz Union Game Room, Roop built an end-to-end chatbot handling 50+ FAQ intents to answer guest questions and guide staff through technical issues, automating 80% of repetitive inquiries and reducing resolution time by 3x.`,
      era: 'library' as EraId,
    },
    {
      keywords: ['ieee', 'paper', 'publication', 'research', 'conference', 'doi'],
      answer: `Roop has co-authored two peer-reviewed IEEE publications: (1) "An Explainable AI Driven Hybrid Model for Enhanced Intrusion Detection in Network Security" (IEEE ICAECT 2025, DOI: 10.1109/ICaECT63952.2025.10958911) and (2) "Analyzing Lossless Image Compression Techniques for IoT Devices" (IEEE ICEEICT 2024, DOI: 10.1109/ICEEICT61591.2024.10718516).`,
      era: 'research' as EraId,
    },
    {
      keywords: ['aws', 'cloud', 'apssdc', 'intern', 'experience', 'deploy'],
      answer: `As an AWS Cloud Computing Intern at APSSDC (Jun–Aug 2023), Roop deployed 3 production web applications on AWS EC2 with auto-scaling (99.5% uptime), automated CI/CD pipelines using AWS CodePipeline and GitHub Actions (slashing release time from 25 min to <4 min), and configured CloudFront CDN to reduce latency by 40%.`,
      era: 'control' as EraId,
    },
    {
      keywords: ['skills', 'languages', 'tech', 'stack', 'technologies'],
      answer: `Roop's verified technical competencies include: Python, Java, C++, SQL (PostgreSQL, MySQL, SQLite), Go, TypeScript, JavaScript, C, Solidity, React.js, Next.js, Three.js, Node.js, PyTorch, Scikit-learn, AWS (EC2, S3, CloudWatch), Docker, and CI/CD pipelines.`,
    },
    {
      keywords: ['resume', 'cv', 'hire', 'contact', 'email', 'phone', 'download', 'pdf'],
      answer: `You can reach Roop at ${links.email} or call ${traveler.phone}. You can download his verified resume PDF directly, or inspect the interactive resume preview.`,
      isResume: true,
    },
  ]

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim()
    if (!query) return

    sounds.playSwitchClick()
    const newMessages: Message[] = [...messages, { sender: 'user', text: query }]
    setInput('')

    const lower = query.toLowerCase()
    const kb = buildKnowledgeBase()
    const match = kb.find((item) => item.keywords.some((kw) => lower.includes(kw)))

    let reply = `I can answer questions regarding Roop's Master's at UF (graduating May 2027), McTrans TRACER research, Agentic AI for Chip Design, Mamba World Models, MeetMint, AWS Cloud Internship, IEEE publications, or resume download.`
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
      } else if (match.isResume) {
        action = onOpenResume
          ? {
              label: 'Open Interactive Resume Preview 👁️',
              onClick: () => {
                onOpenResume()
                setIsOpen(false)
              },
            }
          : {
              label: 'Download Resume PDF (Direct) 📄',
              href: traveler.resumePdfUrl,
              download: 'Roop_Sai_Charan_Kothamasu_Resume.pdf',
            }
      }
    }

    setTimeout(() => {
      sounds.playGreetingChime()
      setMessages([...newMessages, { sender: 'epoch', text: reply, action }])
    }, 280)
  }

  return (
    <div className={`epoch-companion-container ${isOpen ? 'is-open' : ''}`}>
      {/* Floating Pill Toggle Button */}
      {!isOpen && (
        <button
          type="button"
          className="epoch-pill-btn"
          onClick={() => {
            sounds.playGreetingChime()
            setIsOpen(true)
          }}
          title="Ask EPOCH (AI Navigator)"
        >
          <span className="epoch-orb" />
          <span className="epoch-label">🤖 ASK EPOCH (AI)</span>
        </button>
      )}

      {/* Floating Holographic Chat Window */}
      {isOpen && (
        <div className="epoch-dialog-box" role="dialog" aria-label="EPOCH AI Assistant">
          <div className="epoch-header">
            <div className="epoch-title">
              <span className="epoch-orb is-active" />
              <span>EPOCH // AI COMPANION (CENTRALIZED KNOWLEDGE)</span>
            </div>
            <button
              type="button"
              className="epoch-close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close assistant"
            >
              ✕
            </button>
          </div>

          {/* Quick Prompts Bar */}
          <div className="epoch-quick-chips">
            <button type="button" onClick={() => handleSend('Tell me about TRACER freeway research')}>
              🛣️ TRACER Research
            </button>
            <button type="button" onClick={() => handleSend('Agentic AI for Chip Design')}>
              🔬 Chip Design RAG
            </button>
            <button type="button" onClick={() => handleSend('Physics-informed Mamba World Models')}>
              🚗 Mamba World Models
            </button>
            <button type="button" onClick={() => handleSend('When does Roop graduate from UF?')}>
              🎓 Graduation Date
            </button>
            <button type="button" onClick={() => handleSend('Download resume')}>
              📄 Download Resume
            </button>
          </div>

          <div className="epoch-messages-scroll">
            {messages.map((m, idx) => (
              <div key={idx} className={`epoch-msg-row ${m.sender}`}>
                <div className="epoch-bubble">
                  <p>{m.text}</p>
                  {m.action && m.action.href ? (
                    <a
                      href={m.action.href}
                      download={m.action.download}
                      className="epoch-action-btn"
                      style={{ textDecoration: 'none', display: 'inline-block' }}
                    >
                      {m.action.label}
                    </a>
                  ) : m.action && m.action.onClick ? (
                    <button
                      type="button"
                      className="epoch-action-btn"
                      onClick={m.action.onClick}
                    >
                      {m.action.label}
                    </button>
                  ) : null}
                </div>
              </div>
            ))}
          </div>

          <form
            className="epoch-input-bar"
            onSubmit={(e) => {
              e.preventDefault()
              handleSend()
            }}
          >
            <input
              type="text"
              placeholder="Ask about Roop's UF research, skills, or projects..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="epoch-text-input"
            />
            <button type="submit" className="epoch-send-btn">
              SEND ➔
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

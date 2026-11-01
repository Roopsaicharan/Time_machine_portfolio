import { useState } from 'react'

interface MiniDemoProps {
  projectId: string
}

export function ProjectMiniDemo({ projectId }: MiniDemoProps) {
  // 1. MeetMint AI Dashboard Demo
  if (projectId === 'meetmint') {
    return <MeetMintDemo />
  }

  // 2. UF AI Game Room Chatbot Demo
  if (projectId === 'chatbot') {
    return <ChatbotDemo />
  }

  // 3. C++ Payroll Calculation Demo
  if (projectId === 'payroll') {
    return <PayrollDemo />
  }

  // 4. Amazon Product Recommendation Demo
  if (projectId === 'recs') {
    return <RecommendationDemo />
  }

  // 5. AWS Cloud CI/CD Pipeline Simulator
  if (projectId === 'aws-cloud') {
    return <AwsPipelineDemo />
  }

  // 6. IEEE Image Compression Benchmark
  if (projectId === 'research-papers') {
    return <ResearchBenchmarkDemo />
  }

  // 7. Music Platform Audio Sandbox
  if (projectId === 'music') {
    return <MusicPlayerDemo />
  }

  return null
}

// ==========================================
// 1. MEETMINT AI DASHBOARD SANDBOX
// ==========================================
function MeetMintDemo() {
  const [transcript, setTranscript] = useState(
    'Discussed sprint goals. John will migrate the SQLite database to the cloud by Thursday. Sarah to finalize UI with Framer Motion. Alex to test Gemini 1.5 Flash API latency.'
  )
  const [analyzing, setAnalyzing] = useState(false)
  const [tasks, setTasks] = useState<{ assignee: string; task: string; deadline: string }[] | null>(null)

  const handleAnalyze = () => {
    setAnalyzing(true)
    setTimeout(() => {
      setTasks([
        { assignee: 'John', task: 'Migrate SQLite database to cloud', deadline: 'Thursday' },
        { assignee: 'Sarah', task: 'Finalize Glassmorphism UI with Framer Motion', deadline: 'Sprint End' },
        { assignee: 'Alex', task: 'Benchmark Gemini 1.5 Flash API latency (<250ms)', deadline: 'Friday' },
      ])
      setAnalyzing(false)
    }, 800)
  }

  return (
    <div className="mini-demo-card">
      <div className="demo-badge">SANDBOX // GEMINI 1.5 FLASH TASK EXTRACTION</div>
      <p className="demo-intro">Test the RAG task extraction pipeline with sample meeting transcript:</p>
      <textarea
        className="demo-textarea"
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
        rows={3}
      />
      <button type="button" className="demo-action-btn" onClick={handleAnalyze} disabled={analyzing}>
        {analyzing ? '⚡ Running Gemini Flash & Local RAG...' : '⚡ Extract Action Items with Gemini'}
      </button>

      {tasks && (
        <div className="demo-result-box">
          <div className="result-header">EXTRACTED TASKS & METADATA:</div>
          {tasks.map((item) => (
            <div key={item.task} className="task-row">
              <span className="task-assignee">👤 {item.assignee}:</span>
              <span className="task-text">{item.task}</span>
              <span className="task-due">📅 {item.deadline}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ==========================================
// 2. UF AI GAME ROOM CHATBOT SANDBOX
// ==========================================
function ChatbotDemo() {
  const sampleQA = [
    {
      q: 'What are the operating hours of the UF Game Room?',
      a: 'The UF Reitz Union Game Room operates Mon-Fri 10:00 AM - 11:00 PM and Sat-Sun 12:00 PM - 12:00 AM. Student ID required for bowling & billiards.',
      source: 'ChromaDB [facility_hours_2024.json]',
    },
    {
      q: 'How does the hybrid RAG pipeline work?',
      a: 'The query is routed through a BM25 sparse keyword index and a ChromaDB vector store. Results are fused using Reciprocal Rank Fusion (RRF) before inference via Llama-3 with regex guardrails.',
      source: 'Architecture [hybrid_retrieval_spec.md]',
    },
    {
      q: 'Are reservations required for esports tournament stations?',
      a: 'Yes, esports stations require a 24-hour advance reservation via the student portal with role-based access verification.',
      source: 'ChromaDB [esports_policy.md]',
    },
  ]

  const [activeQA, setActiveQA] = useState(sampleQA[0])

  return (
    <div className="mini-demo-card">
      <div className="demo-badge">SANDBOX // CHROMADB & LLAMA-3 HYBRID RAG</div>
      <p className="demo-intro">Select a sample student query to test vector retrieval & source verification:</p>
      <div className="qa-chips">
        {sampleQA.map((item, idx) => (
          <button
            key={item.q}
            type="button"
            className={`qa-btn ${activeQA.q === item.q ? 'active' : ''}`}
            onClick={() => setActiveQA(item)}
          >
            Query #{idx + 1}
          </button>
        ))}
      </div>
      <div className="demo-result-box">
        <p className="chat-q"><strong>Q:</strong> {activeQA.q}</p>
        <p className="chat-a"><strong>A:</strong> {activeQA.a}</p>
        <div className="retrieval-source">
          <span>SOURCE EMBEDDING:</span> <code>{activeQA.source}</code>
        </div>
      </div>
    </div>
  )
}

// ==========================================
// 3. C++ PAYROLL ENGINE SANDBOX
// ==========================================
function PayrollDemo() {
  const [hours, setHours] = useState<number>(45)
  const [hourlyRate, setHourlyRate] = useState<number>(35)

  const regularHours = Math.min(hours, 40)
  const overtimeHours = Math.max(hours - 40, 0)
  const regularPay = regularHours * hourlyRate
  const overtimePay = overtimeHours * (hourlyRate * 1.5)
  const grossPay = regularPay + overtimePay
  const taxDeductions = grossPay * 0.18
  const netPay = grossPay - taxDeductions

  return (
    <div className="mini-demo-card">
      <div className="demo-badge">SANDBOX // C++ HIGH-PERFORMANCE OOP CRUD LOGIC</div>
      <div className="input-row-grid">
        <label>
          Weekly Hours Worked:
          <input
            type="number"
            min={1}
            max={80}
            value={hours}
            onChange={(e) => setHours(Number(e.target.value) || 0)}
          />
        </label>
        <label>
          Base Hourly Rate ($):
          <input
            type="number"
            min={15}
            max={150}
            value={hourlyRate}
            onChange={(e) => setHourlyRate(Number(e.target.value) || 0)}
          />
        </label>
      </div>

      <div className="demo-result-box payroll-result">
        <div>Regular Pay (40h): <strong>${regularPay.toFixed(2)}</strong></div>
        <div>Overtime (1.5x): <strong>${overtimePay.toFixed(2)}</strong></div>
        <div>Gross Compensation: <strong>${grossPay.toFixed(2)}</strong></div>
        <div>Taxes & Deductions (18%): <strong style={{ color: '#ff6b81' }}>-${taxDeductions.toFixed(2)}</strong></div>
        <div className="payroll-total">Net Take-Home Pay: <strong style={{ color: '#00ff88' }}>${netPay.toFixed(2)}</strong></div>
      </div>
    </div>
  )
}

// ==========================================
// 4. AMAZON RECOMMENDATION SYSTEM SANDBOX
// ==========================================
function RecommendationDemo() {
  const [category, setCategory] = useState<'electronics' | 'books' | 'audio'>('electronics')

  const items = {
    electronics: [
      { name: 'Ultra-Fast NVMe SSD 2TB', score: '98.4% Match', metric: 'Collaborative Filter' },
      { name: 'USB-C GaN 100W Multi-Charger', score: '94.2% Match', metric: 'Cosine Similarity' },
      { name: 'Ergonomic Mechanical Keyboard', score: '91.8% Match', metric: 'Matrix Factorization' },
    ],
    books: [
      { name: 'Designing Data-Intensive Applications', score: '99.1% Match', metric: 'Co-Purchase Graph' },
      { name: 'Clean Architecture (Robert Martin)', score: '95.6% Match', metric: 'Content-Based Filter' },
      { name: 'Computer Architecture: A Quantitative Approach', score: '93.0% Match', metric: 'TensorFlow Recs' },
    ],
    audio: [
      { name: 'Active Noise-Cancelling Studio Headphones', score: '97.8% Match', metric: 'Collaborative Filter' },
      { name: 'Lossless DAC Audio Converter', score: '92.5% Match', metric: 'Vector Distance' },
      { name: 'Cardioid USB Condenser Microphone', score: '89.4% Match', metric: 'Cosine Similarity' },
    ],
  }

  return (
    <div className="mini-demo-card">
      <div className="demo-badge">SANDBOX // TENSORFLOW 50K+ ITEM COLLABORATIVE FILTERING</div>
      <p className="demo-intro">Select user profile preference to compute model recommendation rankings:</p>
      <div className="qa-chips">
        {(['electronics', 'books', 'audio'] as const).map((cat) => (
          <button
            key={cat}
            type="button"
            className={`qa-btn ${category === cat ? 'active' : ''}`}
            onClick={() => setCategory(cat)}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="demo-result-box">
        {items[category].map((item) => (
          <div key={item.name} className="recs-row">
            <span className="recs-name">📦 {item.name}</span>
            <span className="recs-score">{item.score}</span>
            <code className="recs-metric">{item.metric}</code>
          </div>
        ))}
      </div>
    </div>
  )
}

// ==========================================
// 5. AWS CLOUD CI/CD PIPELINE SIMULATOR
// ==========================================
function AwsPipelineDemo() {
  const [stage, setStage] = useState<number>(0)
  const stages = [
    { title: '1. Lint & Oxlint Static Analysis', log: '✔ 0 errors, 0 warnings across TypeScript source.' },
    { title: '2. Unit & Integration Tests (35+ suites)', log: '✔ 35/35 test suites passed in 1.4s.' },
    { title: '3. Docker Container Multi-Stage Build', log: '✔ Container image built: roops-app:v2.4 (48MB alpine).' },
    { title: '4. AWS CloudWatch Metrics & Health Probe', log: '✔ Metric filter active. Latency: 42ms, Memory: 18%.' },
    { title: '5. Zero-Downtime Release to AWS EC2', log: '🚀 Production release complete. 100% traffic routed.' },
  ]

  const runPipeline = () => {
    setStage(1)
    const t = setInterval(() => {
      setStage((prev) => {
        if (prev >= 5) {
          clearInterval(t)
          return 5
        }
        return prev + 1
      })
    }, 700)
  }

  return (
    <div className="mini-demo-card">
      <div className="demo-badge">SANDBOX // AWS DEVOPS CI/CD PIPELINE AUTOMATION</div>
      <button type="button" className="demo-action-btn" onClick={runPipeline}>
        ▶ Trigger Simulated CI/CD Pipeline Release
      </button>

      <div className="pipeline-steps">
        {stages.map((st, idx) => {
          const stepNum = idx + 1
          const isDone = stage >= stepNum
          const isCurrent = stage === stepNum
          return (
            <div key={st.title} className={`pipeline-step ${isDone ? 'done' : ''} ${isCurrent ? 'running' : ''}`}>
              <div className="step-title">
                {isDone ? '✔' : isCurrent ? '⏳' : '○'} {st.title}
              </div>
              {isDone && <div className="step-log">{st.log}</div>}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ==========================================
// 6. IEEE RESEARCH COMPRESSION BENCHMARK
// ==========================================
function ResearchBenchmarkDemo() {
  const benchmarks = [
    { algo: 'Our Proposed IoT Adaptive Lossless Codec', ratio: '3.82 : 1', ram: '14 KB', latency: '28 ms' },
    { algo: 'Standard Deflate / GZIP', ratio: '2.94 : 1', ram: '256 KB', latency: '84 ms' },
    { algo: 'LZ4 Compression', ratio: '2.10 : 1', ram: '64 KB', latency: '18 ms' },
    { algo: 'Uncompressed Raw Bitmap', ratio: '1.00 : 1', ram: '0 KB', latency: '0 ms' },
  ]

  return (
    <div className="mini-demo-card">
      <div className="demo-badge">DATA // IEEE ICEEICT 2024 COMPRESSION BENCHMARK (DOI: 10.1109/ICEEICT61591)</div>
      <table className="demo-table">
        <thead>
          <tr>
            <th>Algorithm</th>
            <th>Compression Ratio</th>
            <th>Microcontroller RAM</th>
            <th>Runtime</th>
          </tr>
        </thead>
        <tbody>
          {benchmarks.map((b) => (
            <tr key={b.algo} style={b.algo.includes('Proposed') ? { background: 'rgba(94, 242, 255, 0.1)', fontWeight: 'bold' } : {}}>
              <td>{b.algo}</td>
              <td style={{ color: '#00ff88' }}>{b.ratio}</td>
              <td>{b.ram}</td>
              <td>{b.latency}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ==========================================
// 7. MUSIC PLATFORM SYNTHWAVE AUDIO SANDBOX
// ==========================================
function MusicPlayerDemo() {
  const [isPlaying, setIsPlaying] = useState(false)

  const toggleMusic = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="mini-demo-card">
      <div className="demo-badge">SANDBOX // NEXT.JS + SUPABASE + STRIPE AUDIO STREAM</div>
      <div className="music-player-box">
        <div className="track-art">🎵</div>
        <div>
          <div className="track-title">Chronos Synthwave Odyssey (Sample)</div>
          <div className="track-artist">Next.js & Supabase PostgreSQL Stream</div>
        </div>
        <button type="button" className="music-play-btn" onClick={toggleMusic}>
          {isPlaying ? '⏸ PAUSE' : '▶ PLAY PREVIEW'}
        </button>
      </div>
    </div>
  )
}

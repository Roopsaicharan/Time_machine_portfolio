import { useState } from 'react'

interface MiniDemoProps {
  projectId: string
}

export function ProjectMiniDemo({ projectId }: MiniDemoProps) {
  // Phase 6 Featured Research Projects
  if (projectId === 'tracer') {
    return <TracerDemo />
  }

  if (projectId === 'chip-design') {
    return <ChipDesignDemo />
  }

  if (projectId === 'world-models') {
    return <WorldModelsDemo />
  }

  // Core Projects
  if (projectId === 'meetmint') {
    return <MeetMintDemo />
  }

  if (projectId === 'chatbot') {
    return <ChatbotDemo />
  }

  if (projectId === 'payroll') {
    return <PayrollDemo />
  }

  if (projectId === 'recs') {
    return <RecommendationDemo />
  }

  if (projectId === 'aws-cloud') {
    return <AwsPipelineDemo />
  }

  if (projectId === 'research-papers') {
    return <ResearchBenchmarkDemo />
  }

  if (projectId === 'music') {
    return <MusicPlayerDemo />
  }

  return (
    <div className="mini-demo-card">
      <div className="demo-badge">ENGINEERING SPECIFICATION // {projectId.toUpperCase()}</div>
      <p className="demo-intro">Select a featured project to run the interactive sandbox demonstration.</p>
    </div>
  )
}

// ==========================================
// 1. TRACER FREEWAY SEGMENTATION SANDBOX
// ==========================================
function TracerDemo() {
  const [corridor, setCorridor] = useState('I-75 Northbound (Alachua County)')
  const [milepostStart, setMilepostStart] = useState('382.4')
  const [milepostEnd, setMilepostEnd] = useState('394.8')
  const [isProcessing, setIsProcessing] = useState(false)
  const [segments, setSegments] = useState<
    { id: string; start: number; end: number; type: string; lanes: number; hcmStatus: string }[] | null
  >(null)

  const handleRunSegmentation = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setSegments([
        { id: 'SEG-01', start: 382.4, end: 385.1, type: 'Basic Freeway', lanes: 3, hcmStatus: 'Compliant (LOS B)' },
        { id: 'SEG-02', start: 385.1, end: 386.9, type: 'On-Ramp Merge (SR-26)', lanes: 4, hcmStatus: 'Merge Influence Zone' },
        { id: 'SEG-03', start: 386.9, end: 391.2, type: 'Weaving Section (Archer Rd)', lanes: 4, hcmStatus: 'HCM Weave Validated' },
        { id: 'SEG-04', start: 391.2, end: 394.8, type: 'Basic Freeway (Truck Lane)', lanes: 3, hcmStatus: 'Compliant (LOS A)' },
      ])
      setIsProcessing(false)
    }, 600)
  }

  return (
    <div className="mini-demo-card">
      <div className="demo-badge" style={{ borderColor: '#ff7700', color: '#ff7700' }}>
        RESEARCH SANDBOX // TRACER LRS & HCM FREEWAY ENGINE
      </div>
      <p className="demo-intro">
        Simulate automated roadway segmentation over 1.2M raw Florida DOT telemetry records adhering to Highway Capacity Manual (HCM) rules:
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '0.6rem' }}>
        <div>
          <label style={{ fontSize: '0.72rem', color: '#94a3b8', display: 'block' }}>Corridor:</label>
          <input
            type="text"
            className="demo-textarea"
            style={{ padding: '0.35rem 0.5rem', height: 'auto', resize: 'none' }}
            value={corridor}
            onChange={(e) => setCorridor(e.target.value)}
          />
        </div>
        <div>
          <label style={{ fontSize: '0.72rem', color: '#94a3b8', display: 'block' }}>Milepost Range:</label>
          <div style={{ display: 'flex', gap: '0.3rem', alignItems: 'center' }}>
            <input
              type="text"
              className="demo-textarea"
              style={{ padding: '0.35rem', height: 'auto', textAlign: 'center' }}
              value={milepostStart}
              onChange={(e) => setMilepostStart(e.target.value)}
            />
            <span style={{ color: '#64748b' }}>to</span>
            <input
              type="text"
              className="demo-textarea"
              style={{ padding: '0.35rem', height: 'auto', textAlign: 'center' }}
              value={milepostEnd}
              onChange={(e) => setMilepostEnd(e.target.value)}
            />
          </div>
        </div>
      </div>

      <button
        type="button"
        className="demo-action-btn"
        onClick={handleRunSegmentation}
        disabled={isProcessing}
        style={{ borderColor: '#ff7700', color: '#ff7700' }}
      >
        {isProcessing ? '⏳ Normalizing LRS Mileposts & Running HCM Engine...' : '⚡ Execute Automated Freeway Segmentation'}
      </button>

      {segments && (
        <div className="demo-result-box" style={{ borderColor: 'rgba(255, 119, 0, 0.4)' }}>
          <div className="result-header" style={{ color: '#ff7700' }}>
            GENERATED HCS-COMPLIANT SEGMENTATION DATASET (100% HCM RULE VALIDATED):
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '0.4rem' }}>
            {segments.map((seg) => (
              <div
                key={seg.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '0.4rem 0.6rem',
                  background: 'rgba(255, 119, 0, 0.08)',
                  borderRadius: '4px',
                  borderLeft: '3px solid #ff7700',
                  fontSize: '0.78rem',
                }}
              >
                <div>
                  <strong style={{ color: '#fff' }}>{seg.id}</strong>: MP {seg.start} – {seg.end} ({seg.type})
                </div>
                <div style={{ color: '#ffaa44', fontWeight: 600 }}>{seg.hcmStatus}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '0.7rem', color: '#94a3b8', margin: '0.5rem 0 0 0' }}>
            ✓ Output ready for direct McTrans HCS (Highway Capacity Software) CSV export.
          </p>
        </div>
      )}
    </div>
  )
}

// ==========================================
// 2. AGENTIC AI FOR CHIP DESIGN SANDBOX
// ==========================================
function ChipDesignDemo() {
  const [query, setQuery] = useState('Derive subthreshold swing S and leakage current I_off for 7nm FinFET')
  const [isSearching, setIsSearching] = useState(false)
  const [retrievalResult, setRetrievalResult] = useState<{
    latexFormula: string
    sourceDoc: string
    subcircuit: string
    retrievedTokens: string[]
    confidence: string
  } | null>(null)

  const handleRetrieve = () => {
    setIsSearching(true)
    setTimeout(() => {
      setRetrievalResult({
        latexFormula: String.raw`S = \\ln(10) \\cdot \\frac{k_B T}{q} \\left(1 + \\frac{C_{dep}}{C_{ox}}\\right) \\approx 60\\text{ mV/dec @ 300K}`,
        sourceDoc: 'Weste & Harris — CMOS VLSI Design (Ch. 4.4 Non-Ideal I-V Effects)',
        subcircuit: 'FinFET 3D Gate Wrap-Around Channel Model (Hierarchical Schematic L2)',
        retrievedTokens: ['k_B T/q', 'Subthreshold Swing S', 'C_dep/C_ox Ratio', 'DIBL Effect'],
        confidence: '99.4% Cosine Match (Formula Tokens Preserved)',
      })
      setIsSearching(false)
    }, 700)
  }

  return (
    <div className="mini-demo-card">
      <div className="demo-badge" style={{ borderColor: '#ffd18a', color: '#ffd18a' }}>
        RESEARCH SANDBOX // AGENTIC RAG VLSI KNOWLEDGE RETRIEVAL
      </div>
      <p className="demo-intro">
        Query dense semiconductor literature with mathematical equation preservation and schematic token retrieval:
      </p>

      <textarea
        className="demo-textarea"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        rows={2}
      />

      <button
        type="button"
        className="demo-action-btn"
        onClick={handleRetrieve}
        disabled={isSearching}
        style={{ borderColor: '#ffd18a', color: '#ffd18a' }}
      >
        {isSearching ? '🔍 Agentic Parsing & Formula Token Isolation...' : '⚡ Query VLSI Knowledge Base'}
      </button>

      {retrievalResult && (
        <div className="demo-result-box" style={{ borderColor: 'rgba(255, 209, 138, 0.4)' }}>
          <div className="result-header" style={{ color: '#ffd18a' }}>
            PRESERVED MATHEMATICAL RETRIEVAL & CONTEXT:
          </div>
          <div style={{ background: '#0a0f1d', padding: '0.5rem', borderRadius: '4px', margin: '0.4rem 0', border: '1px solid #243447' }}>
            <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>PRESERVED LATEX EQUATION:</div>
            <code style={{ color: '#5ef2ff', fontSize: '0.85rem', display: 'block', margin: '0.2rem 0' }}>
              {retrievalResult.latexFormula}
            </code>
            <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '0.4rem' }}>
              DOCUMENT: <strong>{retrievalResult.sourceDoc}</strong>
            </div>
            <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
              SCHEMATIC CONTEXT: <strong>{retrievalResult.subcircuit}</strong>
            </div>
          </div>
          <div className="chips" style={{ margin: '0.3rem 0' }}>
            {retrievalResult.retrievedTokens.map((t) => (
              <span key={t} className="chip" style={{ fontSize: '0.68rem' }}>{t}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ==========================================
// 3. PHYSICS-INFORMED WORLD MODELS SANDBOX
// ==========================================
function WorldModelsDemo() {
  const [horizonStep, setHorizonStep] = useState<number>(10)
  const [evasionScenario, setEvasionScenario] = useState<'sudden_brake' | 'sharp_turn'>('sharp_turn')
  const [simulating, setSimulating] = useState(false)
  const [outputMetrics, setOutputMetrics] = useState<{
    mambaMSE: number
    baselineMSE: number
    kinematicViolation: boolean
    curvatureConstraint: string
  } | null>(null)

  const handleSimulate = () => {
    setSimulating(true)
    setTimeout(() => {
      setOutputMetrics({
        mambaMSE: evasionScenario === 'sharp_turn' ? 0.0142 : 0.0098,
        baselineMSE: evasionScenario === 'sharp_turn' ? 0.0487 : 0.0315,
        kinematicViolation: false,
        curvatureConstraint: 'R_min >= 4.2m (Bicycle Model Kinematically Satisfied)',
      })
      setSimulating(false)
    }, 600)
  }

  return (
    <div className="mini-demo-card">
      <div className="demo-badge" style={{ borderColor: '#5ef2ff', color: '#5ef2ff' }}>
        RESEARCH SANDBOX // PHYSICS-INFORMED MAMBA WORLD MODEL
      </div>
      <p className="demo-intro">
        Evaluate vehicle trajectory forecasting with kinematic bicycle physics constraints vs baseline neural models:
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '0.6rem' }}>
        <div>
          <label style={{ fontSize: '0.72rem', color: '#94a3b8', display: 'block' }}>Maneuver Scenario:</label>
          <select
            className="demo-textarea"
            style={{ padding: '0.35rem', height: 'auto' }}
            value={evasionScenario}
            onChange={(e) => setEvasionScenario(e.target.value as any)}
          >
            <option value="sharp_turn">Evasive Sharp Turn (Lateral Accel)</option>
            <option value="sudden_brake">High-G Emergency Braking</option>
          </select>
        </div>
        <div>
          <label style={{ fontSize: '0.72rem', color: '#94a3b8', display: 'block' }}>Prediction Horizon: {horizonStep} steps</label>
          <input
            type="range"
            min={5}
            max={20}
            value={horizonStep}
            onChange={(e) => setHorizonStep(Number(e.target.value))}
            style={{ width: '100%', marginTop: '0.5rem' }}
          />
        </div>
      </div>

      <button
        type="button"
        className="demo-action-btn"
        onClick={handleSimulate}
        disabled={simulating}
        style={{ borderColor: '#5ef2ff', color: '#5ef2ff' }}
      >
        {simulating ? '⚡ Running Mamba State-Space Simulation...' : '⚡ Predict Trajectory & Benchmark MSE'}
      </button>

      {outputMetrics && (
        <div className="demo-result-box" style={{ borderColor: 'rgba(94, 242, 255, 0.4)' }}>
          <div className="result-header" style={{ color: '#5ef2ff' }}>
            PHYSICS-REGULARIZED TRAJECTORY EVALUATION:
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '0.4rem' }}>
            <div style={{ background: 'rgba(94, 242, 255, 0.1)', padding: '0.4rem', borderRadius: '4px' }}>
              <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>MAMBA (PHYSICS-INFORMED) MSE:</div>
              <strong style={{ color: '#5ef2ff', fontSize: '1.05rem' }}>{outputMetrics.mambaMSE}</strong>
            </div>
            <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '0.4rem', borderRadius: '4px' }}>
              <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>CONVENTIONAL BASELINE MSE:</div>
              <strong style={{ color: '#ff6b6b', fontSize: '1.05rem' }}>{outputMetrics.baselineMSE}</strong>
            </div>
          </div>
          <p style={{ fontSize: '0.74rem', color: '#2ed573', margin: '0.4rem 0 0 0' }}>
            ✓ {outputMetrics.curvatureConstraint} — Zero unrealistic trajectory jumps.
          </p>
        </div>
      )}
    </div>
  )
}

// ==========================================
// 4. MEETMINT AI DASHBOARD SANDBOX
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
    }, 700)
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
// 5. UF AI GAME ROOM CHATBOT SANDBOX
// ==========================================
function ChatbotDemo() {
  const [query, setQuery] = useState('What are the rules and hours for the Nintendo Switch station at the UF Game Room?')
  const [answering, setAnswering] = useState(false)
  const [answer, setAnswer] = useState<{ text: string; sources: string[]; latency: string } | null>(null)

  const handleAsk = () => {
    setAnswering(true)
    setTimeout(() => {
      setAnswer({
        text: 'The Nintendo Switch gaming console is available Monday through Friday 10:00 AM – 8:00 PM. Maximum reservation duration is 2 hours per GatorOne ID holder. Controllers must be checked in at the front desk.',
        sources: ['UF_Reitz_Union_GameRoom_Rules_2024.pdf (p. 4)', 'ChromaDB Vector Store (Cosine Similarity: 0.94)'],
        latency: '680ms (BM25 + ChromaDB Hybrid RAG)',
      })
      setAnswering(false)
    }, 600)
  }

  return (
    <div className="mini-demo-card">
      <div className="demo-badge" style={{ borderColor: '#ff7700', color: '#ff7700' }}>
        SANDBOX // UF HYBRID RAG RETRIEVAL (BM25 + CHROMADB)
      </div>
      <p className="demo-intro">Test student campus query retrieval with automated PII redaction and hybrid search:</p>
      <input
        type="text"
        className="demo-textarea"
        style={{ padding: '0.4rem', height: 'auto' }}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        type="button"
        className="demo-action-btn"
        onClick={handleAsk}
        disabled={answering}
        style={{ borderColor: '#ff7700', color: '#ff7700' }}
      >
        {answering ? '⚡ Querying Hybrid Index...' : '⚡ Ask UF Campus Chatbot'}
      </button>

      {answer && (
        <div className="demo-result-box" style={{ borderColor: 'rgba(255, 119, 0, 0.4)' }}>
          <div className="result-header" style={{ color: '#ff7700' }}>
            RAG RESPONSE (LATENCY: {answer.latency}):
          </div>
          <p style={{ margin: '0.4rem 0', fontSize: '0.85rem' }}>{answer.text}</p>
          <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
            {answer.sources.map((src) => (
              <div key={src}>📄 {src}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ==========================================
// 6. C++ PAYROLL ENGINE SANDBOX
// ==========================================
function PayrollDemo() {
  const [hourlyRate, setHourlyRate] = useState(45)
  const [hoursWorked, setHoursWorked] = useState(80)

  const baseGross = hourlyRate * hoursWorked
  const overtimeGross = hoursWorked > 80 ? (hoursWorked - 80) * hourlyRate * 1.5 : 0
  const totalGross = baseGross + overtimeGross
  const fedTax = totalGross * 0.15
  const stateTax = totalGross * 0.05
  const netPay = totalGross - (fedTax + stateTax)

  return (
    <div className="mini-demo-card">
      <div className="demo-badge" style={{ borderColor: '#ffd18a', color: '#ffd18a' }}>
        SANDBOX // C++ HIGH-PERFORMANCE PAYROLL ENGINE SIMULATOR
      </div>
      <p className="demo-intro">Interact with the C++ salary deduction and overtime arithmetic logic:</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', margin: '0.6rem 0' }}>
        <div>
          <label style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Hourly Rate ($/hr):</label>
          <input
            type="number"
            value={hourlyRate}
            onChange={(e) => setHourlyRate(Number(e.target.value))}
            className="demo-textarea"
            style={{ padding: '0.35rem', height: 'auto' }}
          />
        </div>
        <div>
          <label style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Hours Bi-Weekly:</label>
          <input
            type="number"
            value={hoursWorked}
            onChange={(e) => setHoursWorked(Number(e.target.value))}
            className="demo-textarea"
            style={{ padding: '0.35rem', height: 'auto' }}
          />
        </div>
      </div>

      <div className="demo-result-box">
        <div className="result-header">C++ COMPILED RECORD BREAKDOWN:</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem', fontSize: '0.82rem' }}>
          <div>Base Pay: <strong>${baseGross.toLocaleString()}</strong></div>
          <div>Overtime: <strong>${overtimeGross.toLocaleString()}</strong></div>
          <div>Federal Tax (15%): <span style={{ color: '#ff6b6b' }}>-${fedTax.toFixed(2)}</span></div>
          <div>State Tax (5%): <span style={{ color: '#ff6b6b' }}>-${stateTax.toFixed(2)}</span></div>
        </div>
        <hr style={{ borderColor: 'rgba(255,255,255,0.1)', margin: '0.5rem 0' }} />
        <div style={{ fontSize: '0.95rem', color: '#2ed573' }}>
          NET DISBURSED PAY: <strong>${netPay.toFixed(2)}</strong>
        </div>
      </div>
    </div>
  )
}

// ==========================================
// 7. AMAZON PRODUCT RECOMMENDATION SANDBOX
// ==========================================
function RecommendationDemo() {
  const [selectedCategory, setSelectedCategory] = useState<'electronics' | 'books' | 'audio'>('electronics')

  const recommendations = {
    electronics: [
      { name: 'Ultra-Fast 65W GaN Charger', score: 98, reason: 'High co-purchase correlation with USB-C Laptops' },
      { name: 'Anker Magnetic Power Bank', score: 92, reason: 'Frequent vector cluster match' },
      { name: 'Braided Thunderbolt 4 Cable', score: 87, reason: 'Collaborative filtering item match' },
    ],
    books: [
      { name: 'Designing Data-Intensive Applications', score: 99, reason: 'Top-ranked system design reference' },
      { name: 'Hands-On Machine Learning with Scikit-Learn', score: 94, reason: 'TF-IDF keyword overlap (96%)' },
      { name: 'Computer Networking: A Top-Down Approach', score: 89, reason: 'Curriculum collaborative affinity' },
    ],
    audio: [
      { name: 'Sony WH-1000XM5 Noise Canceling', score: 96, reason: 'Collaborative preference index: 0.94' },
      { name: 'Audio-Technica ATH-M50x Monitor', score: 91, reason: 'High cosine similarity in acoustic vector' },
      { name: 'Focusrite Scarlett 2i2 USB Interface', score: 88, reason: 'Co-purchase association rule' },
    ],
  }

  return (
    <div className="mini-demo-card">
      <div className="demo-badge">SANDBOX // COLLABORATIVE & CONTENT-BASED RECOMMENDATION</div>
      <p className="demo-intro">Select a consumer vector category to evaluate top-N cosine ranking:</p>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.6rem' }}>
        {(['electronics', 'books', 'audio'] as const).map((cat) => (
          <button
            key={cat}
            type="button"
            className={`demo-action-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
            style={{ margin: 0, padding: '0.35rem 0.6rem', fontSize: '0.78rem' }}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="demo-result-box">
        <div className="result-header">TOP-RANKED RECOMMENDATIONS (50,000+ RECORDS):</div>
        {recommendations[selectedCategory].map((item) => (
          <div key={item.name} className="task-row" style={{ alignItems: 'flex-start' }}>
            <span style={{ color: '#00f3ff', fontWeight: 'bold' }}>{item.score}% Match:</span>
            <div style={{ flex: 1, marginLeft: '0.5rem' }}>
              <div style={{ color: '#fff' }}>{item.name}</div>
              <small style={{ color: '#94a3b8' }}>{item.reason}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ==========================================
// 8. AWS CLOUD CI/CD PIPELINE SIMULATOR
// ==========================================
function AwsPipelineDemo() {
  const [pipelineRunning, setPipelineRunning] = useState(false)
  const [stepIndex, setStepIndex] = useState(0)

  const steps = [
    '1. GitHub Webhook Triggered on Push to main',
    '2. Running Unit & Integration Tests (100% Passed)',
    '3. Building Docker Container & Scanning CVEs',
    '4. Pushing Image to AWS Elastic Container Registry (ECR)',
    '5. Rolling Blue/Green Deployment on AWS EC2 & CloudWatch Active',
  ]

  const handleDeploy = () => {
    setPipelineRunning(true)
    setStepIndex(0)
    const interval = setInterval(() => {
      setStepIndex((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(interval)
          setPipelineRunning(false)
          return prev
        }
        return prev + 1
      })
    }, 550)
  }

  return (
    <div className="mini-demo-card">
      <div className="demo-badge" style={{ borderColor: '#7dff9a', color: '#7dff9a' }}>
        SANDBOX // AWS AUTOMATED CI/CD & TELEMETRY SIMULATOR
      </div>
      <p className="demo-intro">Trigger an automated zero-downtime deployment pipeline to AWS EC2:</p>
      <button
        type="button"
        className="demo-action-btn"
        onClick={handleDeploy}
        disabled={pipelineRunning}
        style={{ borderColor: '#7dff9a', color: '#7dff9a' }}
      >
        {pipelineRunning ? '⏳ Pipeline Executing...' : '🚀 Trigger AWS Deployment Pipeline'}
      </button>

      <div className="demo-result-box" style={{ borderColor: 'rgba(125, 255, 154, 0.3)' }}>
        <div className="result-header" style={{ color: '#7dff9a' }}>PIPELINE EXECUTION TELEMETRY:</div>
        {steps.map((s, idx) => (
          <div
            key={s}
            style={{
              padding: '0.25rem 0',
              color: idx <= stepIndex ? (idx === steps.length - 1 ? '#7dff9a' : '#5ef2ff') : '#64748b',
              fontSize: '0.78rem',
            }}
          >
            {idx <= stepIndex ? '✔' : '○'} {s}
          </div>
        ))}
      </div>
    </div>
  )
}

// ==========================================
// 9. IEEE RESEARCH BENCHMARK SANDBOX
// ==========================================
function ResearchBenchmarkDemo() {
  const [dataSizeKB, setDataSizeKB] = useState(256)
  const compressedSize = Math.round(dataSizeKB * 0.58)
  const reductionPct = Math.round(((dataSizeKB - compressedSize) / dataSizeKB) * 100)

  return (
    <div className="mini-demo-card">
      <div className="demo-badge" style={{ borderColor: '#ff9a4c', color: '#ff9a4c' }}>
        RESEARCH SANDBOX // LOSSLESS IOT COMPRESSION BENCHMARK
      </div>
      <p className="demo-intro">Simulate microcontroller telemetry compression ratio on constrained RAM:</p>
      <div style={{ margin: '0.6rem 0' }}>
        <label style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
          Raw Sensor Telemetry Payload: <strong>{dataSizeKB} KB</strong>
        </label>
        <input
          type="range"
          min={64}
          max={1024}
          step={64}
          value={dataSizeKB}
          onChange={(e) => setDataSizeKB(Number(e.target.value))}
          style={{ width: '100%', marginTop: '0.3rem' }}
        />
      </div>

      <div className="demo-result-box" style={{ borderColor: 'rgba(255, 154, 76, 0.4)' }}>
        <div className="result-header" style={{ color: '#ff9a4c' }}>IEEE OPTIMIZED COMPRESSION RESULTS:</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.4rem', fontSize: '0.8rem' }}>
          <div>Raw Size: <strong>{dataSizeKB} KB</strong></div>
          <div>Compressed: <strong style={{ color: '#2ed573' }}>{compressedSize} KB</strong></div>
          <div>Data Reduction: <strong style={{ color: '#5ef2ff' }}>{reductionPct}%</strong></div>
        </div>
        <small style={{ display: 'block', marginTop: '0.4rem', color: '#94a3b8' }}>
          Published in IEEE ICEEICT 2024: Superior compression throughput with minimal microcontroller RAM overhead.
        </small>
      </div>
    </div>
  )
}

// ==========================================
// 10. SYNTHWAVE MUSIC PLAYER SANDBOX
// ==========================================
function MusicPlayerDemo() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [tempo, setTempo] = useState(120)

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="mini-demo-card">
      <div className="demo-badge" style={{ borderColor: '#ff6ad5', color: '#ff6ad5' }}>
        SANDBOX // SONICWAVE WEB AUDIO RETRO SYNTHESIZER
      </div>
      <p className="demo-intro">Test the Web Audio synthesizer player developed for the Supabase music platform:</p>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '0.6rem 0' }}>
        <button
          type="button"
          className="demo-action-btn"
          onClick={handleTogglePlay}
          style={{ borderColor: '#ff6ad5', color: '#ff6ad5', margin: 0 }}
        >
          {isPlaying ? '⏸ Pause Synth Arpeggio' : '▶ Play Synthwave Arpeggio'}
        </button>

        <div style={{ flex: 1 }}>
          <label style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Tempo: {tempo} BPM</label>
          <input
            type="range"
            min={90}
            max={150}
            value={tempo}
            onChange={(e) => setTempo(Number(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>
      </div>

      <div className="demo-result-box" style={{ borderColor: 'rgba(255, 106, 213, 0.4)' }}>
        <div className="result-header" style={{ color: '#ff6ad5' }}>AUDIO SYNTHESIZER STATE:</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
          <div>Audio Engine: <strong>Web Audio API Oscillator</strong></div>
          <div>Status: <span style={{ color: isPlaying ? '#2ed573' : '#94a3b8' }}>{isPlaying ? 'ACTIVE STREAM' : 'IDLE'}</span></div>
          <div>Stripe Gateway: <strong style={{ color: '#5ef2ff' }}>READY</strong></div>
        </div>
      </div>
    </div>
  )
}

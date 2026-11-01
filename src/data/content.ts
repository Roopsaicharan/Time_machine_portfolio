export const traveler = {
  name: 'Roop Sai Charan Kothamasu',
  callsign: 'CHRONOS-01',
  role: 'Software Engineer | AI/ML Researcher | Full-Stack Developer',
  tagline: 'Bridging full-stack software engineering, AI agent architectures, and distributed systems across time.',
  bio: `Master's student in Computer Science at the University of Florida specializing in AI systems, data-intensive pipelines, and software engineering. Experienced in building production-ready systems spanning large-scale GIS data processing (1.2M+ records with McTrans), retrieval-augmented generation (RAG), autonomous vehicle physics-informed models, and full-stack web platforms.

Proficient across Python, Go, TypeScript, JavaScript, C++, Java, React, Next.js, Three.js, SQL, AWS, and Docker. Two peer-reviewed IEEE conference publications in data compression and network security. Every era in Chronos represents a genuine milestone in engineering—step into the Doraemon Time Machine to explore them.`,
  location: 'Gainesville, FL (University of Florida) • Andhra Pradesh, India',
  phone: '+1 (352) 721-6208',
  email: 'roopsai2003@gmail.com',
  educationSummary: "Master's in Computer Science — University of Florida (Graduating May 2027)",
  lookingFor:
    'Seeking 2027 new-graduate Software Engineering, AI/ML, and Full-Stack Developer opportunities.',
  resumePdfUrl: '/Roop_Sai_Charan_Kothamasu_Resume.pdf',
}

export const links = {
  email: 'roopsai2003@gmail.com',
  github: 'https://github.com/Roopsaicharan',
  linkedin: 'https://www.linkedin.com/in/roop-sai-charan-kothamasu-85062b24b/',
  phone: '+13527216208',
  resume: '#resume-modal',
  resumePdf: '/Roop_Sai_Charan_Kothamasu_Resume.pdf',
}

export const education = [
  {
    place: 'University of Florida, Gainesville',
    program: "Master's in Computer Science",
    years: 'Aug 2025 – May 2027',
    gpa: 'Graduate Studies',
    notes:
      'Focusing on Large-Scale Data Systems, Artificial Intelligence, and Systems Architecture. Software Engineer on the McTrans TRACER project; Research Assistant in Agentic AI for Chip Design.',
  },
  {
    place: 'SRM University, Andhra Pradesh',
    program: 'B.Tech in Computer Science (AIML Specialization)',
    years: 'Mar 2021 – Mar 2025',
    gpa: 'CGPA 7.9 / 10',
    notes:
      'Graduated with AIML specialization. Co-authored 2 published IEEE research papers (ICEEICT 2024 on IoT compression; ICAECT 2025 on explainable AI intrusion detection). Conducted blockchain patient record research.',
  },
]

export const skills = [
  {
    forge: 'Languages',
    alloys: ['Python', 'Java', 'C++', 'SQL (PostgreSQL, MySQL, SQLite)', 'Go', 'JavaScript (ES6+)', 'TypeScript', 'C', 'Solidity'],
  },
  {
    forge: 'Front-End & Creative Web',
    alloys: ['React.js', 'Next.js', 'Three.js / WebGL', 'HTML5 & CSS3', 'Tailwind CSS', 'Framer Motion', 'Web Audio API', 'Responsive UI/UX'],
  },
  {
    forge: 'Backend, Systems & Data',
    alloys: ['REST APIs', 'Node.js', 'Express.js', 'Distributed Systems', 'Large-Scale Data Processing (ETL)', 'Linear Referencing Systems (LRS)', 'Chord / Gossip Protocols', 'Database Internals'],
  },
  {
    forge: 'AI, ML & Research',
    alloys: ['LLMs & AI Agents', 'Hybrid RAG (BM25 + ChromaDB)', 'PyTorch', 'Physics-Informed Neural Models (Mamba)', 'Scikit-learn', 'Pandas & NumPy', 'Explainable AI (SHAP)'],
  },
  {
    forge: 'Cloud & DevOps Tooling',
    alloys: ['AWS (EC2, S3, CloudWatch)', 'Docker', 'CI/CD Pipelines (GitHub Actions)', 'Git & GitHub', 'Linux / Unix', 'Agile / Scrum'],
  },
]

export interface ProjectData {
  id: string
  codename: string
  title: string
  category: 'AI & Systems' | 'Research & Data' | 'Full-Stack & Web3'
  year: string
  eraId: EraId
  tags: string[]
  summary: string
  problem: string
  role: string
  architecture: string
  challenges: string
  impact: string
  href: string
  paperUrl?: string
  isPrivate?: boolean
  repoLabel?: string
  accent: string
}

export const projects: ProjectData[] = [
  {
    id: 'tracer',
    codename: 'MISSION-TRACER',
    title: 'TRACER: Large-Scale Freeway Segmentation & LRS Processing',
    category: 'Research & Data',
    year: '2026 – Present',
    eraId: 'library',
    tags: ['Python', 'GIS / LRS', 'Highway Capacity Manual', 'ETL', 'Data Governance', 'McTrans UF'],
    summary:
      'Engineered an automated Python data pipeline for the McTrans-sponsored TRACER project at the University of Florida. Ingests 1.2M+ state DOT Linear Referencing System (LRS) records, resolves overlapping spans, and produces 2,493 clean freeway segments across 71 routes and 4,599 corridor-miles, reducing raw data volume by 99.8% with complete provenance tracking.',
    problem:
      'State DOT roadway inventory data contains overlapping spans, spatial discontinuities, and inconsistent bidirectional AADT attribution across 371 county corridors that previously required weeks of manual validation before use in Highway Capacity Software (HCS).',
    role:
      'Software Engineer, Data Processing Backend. Developed the overlap-flattening engine, AADT propagation algorithms, and Highway Capacity Manual (HCM 7th Edition) segment classification routines.',
    architecture:
      'Distributed Python ETL pipeline parsing multi-state shapefiles (NC, FL), executing segment classification (Basic, Merge, Diverge, Overlap, Weave), and generating validated 72-column McTrans HCS staging CSVs.',
    challenges:
      'Handling heterogeneous state-level data schemas and eliminating segment fragmentation around complex multi-lane freeway interchanges while maintaining strict 100% speed and 99.97% lane concordance.',
    impact:
      'Reduced raw data volume by 99.8% across 4,599 corridor-miles; achieved 96.08% spatial segmentation accuracy validated against 252 ground-truth segments on I-26; cut integration turnaround from days to under 1 hour.',
    href: 'https://github.com/Roopsaicharan',
    isPrivate: true,
    repoLabel: 'Institutional Sponsor: McTrans Center (UF)',
    accent: '#ff7700',
  },
  {
    id: 'chip-design',
    codename: 'MISSION-SILICON',
    title: 'Agentic AI Orchestration Platform for Chip Design',
    category: 'AI & Systems',
    year: '2026 – Present',
    eraId: 'foundry',
    tags: ['RAG', 'Agentic AI', 'VLSI Textbooks', 'EDA Tooling', 'LaTeX Validation', 'Semiconductors'],
    summary:
      'Research Assistant in the University of Florida Electrical & Computer Engineering department developing an agentic AI platform using LLMs to assist semiconductor engineers with technical queries and coordinate workflows across Electronic Design Automation (EDA) tools.',
    problem:
      'Semiconductor documentation and VLSI textbooks contain dense mathematical equations and hierarchical schematic relationships that standard document extractors corrupt, degrading retrieval accuracy for hardware engineers.',
    role:
      'Research Assistant. Building the domain-specific Retrieval-Augmented Generation (RAG) pipeline to ingest, clean, and structure VLSI literature; implemented preprocessing and data validation scripts repairing extracted formulas.',
    architecture:
      'Specialized document ingestion pipeline with formula token preservation, multi-vector embeddings, and agentic query orchestration coordinating across EDA documentation and verification rules.',
    challenges:
      'Accurately parsing and restoring complex multi-line LaTeX formulas and semiconductor parameter tables without token explosion or schematic corruption.',
    impact:
      'Established reproducible engineering tooling standards for semiconductor document chunking, enabling governed, high-accuracy knowledge retrieval across research teams.',
    href: 'https://github.com/Roopsaicharan',
    isPrivate: true,
    repoLabel: 'UF ECE Research Appointment',
    accent: '#ffd18a',
  },
  {
    id: 'world-models',
    codename: 'MISSION-MAMBA',
    title: 'Physics-Informed Mamba World Models for Autonomous Systems',
    category: 'AI & Systems',
    year: '2026',
    eraId: 'horizon',
    tags: ['Mamba Architecture', 'Physics-Informed ML', 'PyTorch', 'Autonomous Vehicles', 'State-Space Models'],
    summary:
      'Independent research advised by Dr. Ivan Ruchikin at the University of Florida. Developed a physics-informed Mamba state-space model for autonomous vehicle trajectory forecasting, trained on 8,000+ driving episodes (6.4M+ time-step samples) in PyTorch.',
    problem:
      'Conventional Transformer and LSTM trajectory predictors scale poorly over long horizons and frequently generate kinematically impossible vehicle paths (violating maximum lateral acceleration and turning radius limits).',
    role:
      'Independent Student Researcher. Designed the Mamba state-space model, integrated physical constraints as differentiable loss penalties, and conducted 15+ ablation studies across sequence lengths from 1s to 10s.',
    architecture:
      'Selective state-space (Mamba) neural backbone combined with kinematic bicycle model, energy conservation, and jerk limits incorporated as differentiable penalty terms during training.',
    challenges:
      'Balancing continuous physical loss penalty gradients with neural prediction loss to prevent gradient divergence during aggressive evasive maneuvers.',
    impact:
      'Achieved 23% lower MSE vs. vanilla Mamba and 31% lower MSE vs. LSTM on a 5-second forecast horizon; reduced physically implausible predictions by 47% while maintaining real-time inference under 12ms per trajectory.',
    href: 'https://github.com/Roopsaicharan',
    isPrivate: true,
    repoLabel: 'UF Autonomous Vehicle Research Lab',
    accent: '#5ef2ff',
  },
  {
    id: 'meetmint',
    codename: 'MISSION-MINT',
    title: 'MeetMint: AI-Powered Meeting Productivity Platform',
    category: 'AI & Systems',
    year: '2026',
    eraId: 'horizon',
    tags: ['Go', 'React', 'Gemini API', 'SQLite RAG', 'REST APIs', 'Framer Motion'],
    summary:
      'Customer-facing meeting assistant with 8 Go REST API endpoints for audio summarization, action-item extraction, searchable meeting records, and embedding-based RAG question answering with sub-2s retrieval latency.',
    problem:
      'Teams lose hours per sprint manually transcribing meeting audio, extracting follow-up assignees, and searching through historical discussion notes.',
    role:
      'Sole Architect & Full-Stack Developer. Engineered the Go backend services, Gemini API vector embedding pipeline, SQLite persistence layer, and responsive React frontend.',
    architecture:
      'Go REST API service executing audio chunking, indexing transcripts into a SQLite vector store with cosine similarity ranking, and a React UI with 35+ automated unit and integration tests (92% code coverage).',
    challenges:
      'Designing concurrent request handling capable of serving 50+ simultaneous users while keeping p95 API response latency under 300ms.',
    impact:
      'Deployed application with 92% code coverage, p95 latency under 300ms, and verified semantic retrieval across 500+ meeting records.',
    href: 'https://github.com/Roopsaicharan/MeetMint',
    accent: '#5ef2ff',
  },
  {
    id: 'chatbot',
    codename: 'MISSION-GATOR',
    title: 'University of Florida Game Room AI Chatbot',
    category: 'AI & Systems',
    year: '2026',
    eraId: 'library',
    tags: ['Node.js', 'Express', 'ChromaDB', 'Llama-3', 'Dialog Flows', 'Campus Services'],
    summary:
      'Built an end-to-end customer-facing chatbot for the UF Reitz Union Game Room handling 50+ FAQ intents to answer visitor questions, explain Game Room reservation policies, and guide employees through common technical troubleshooting.',
    problem:
      'Front-desk staff spent excessive hours answering recurring questions regarding console equipment, tournament schedules, and reservation policies.',
    role:
      'Student Assistant (Chatbot Development). Designed the structured dialog flows, backend Node.js services, and knowledge base integration.',
    architecture:
      'Node.js and Express backend service with ChromaDB vector store, keyword dialog matching, and automated FAQ responses.',
    challenges:
      'Ensuring reliable accuracy for equipment policy questions without hallucinating rules or pricing.',
    impact:
      'Automated 80% of repetitive staff inquiries regarding equipment troubleshooting and reservation rules, reducing average inquiry resolution time by 3x.',
    href: 'https://github.com/Roopsaicharan/Game_room_chatbot',
    accent: '#ff7700',
  },
  {
    id: 'research-papers',
    codename: 'MISSION-RESEARCH',
    title: 'Peer-Reviewed IEEE Research: IoT Compression & Network Security',
    category: 'Research & Data',
    year: '2024 – 2025',
    eraId: 'research',
    tags: ['IEEE Xplore', 'IoT Compression', 'Explainable AI', 'SHAP', 'Network Intrusion'],
    summary:
      'Co-authored two peer-reviewed IEEE conference publications: (1) An Explainable AI Driven Hybrid Model for Enhanced Intrusion Detection in Network Security (IEEE ICAECT 2025), and (2) Analyzing Lossless Image Compression Techniques for IoT Devices (IEEE ICEEICT 2024).',
    problem:
      'Constrained IoT microcontrollers face strict memory bottlenecks when transmitting sensor data, while critical network intrusion detection systems require explainable decision boundaries to combat zero-day threats.',
    role:
      'Co-author & Lead Algorithm Evaluator. Benchmarked compression algorithms on microcontroller memory constraints; implemented hybrid ML/XAI classification pipelines with SHAP value explanations.',
    architecture:
      'Lossless differential encoding optimized for low-RAM microcontrollers; ensemble classification framework combined with TreeSHAP feature importance analysis for intrusion detection.',
    challenges:
      'Optimizing compression buffers to operate within micro-RAM envelopes while maintaining lossless fidelity; reducing SHAP explanation computational overhead on high-throughput packet streams.',
    impact:
      'Two published IEEE conference proceedings indexed on IEEE Xplore with verified DOIs, providing empirical benchmarks for constrained IoT devices and explainable intrusion security.',
    href: 'https://doi.org/10.1109/ICEEICT61591.2024.10718516',
    paperUrl: 'https://doi.org/10.1109/ICEEICT61591.2024.10718516',
    accent: '#ff9a4c',
  },
  {
    id: 'dosp-chord',
    codename: 'MISSION-CHORD',
    title: 'Distributed Systems: Chord Overlay, Gossip & Push-Sum',
    category: 'AI & Systems',
    year: '2026',
    eraId: 'genesis',
    tags: ['Gleam', 'Erlang/OTP', 'Distributed Systems', 'Chord Protocol', 'Gossip', 'Push-Sum'],
    summary:
      'Designed and implemented a distributed platform at scale featuring a Chord peer-to-peer overlay network with consistent hashing and finger tables supporting 10,000+ nodes, achieving O(log N) lookup with an average of 6.5 hops per query.',
    problem:
      'Maintaining decentralized data lookup and consensus across thousands of nodes without single points of failure requires robust routing and fault-tolerant actor supervision.',
    role:
      'Distributed Systems Developer. Implemented the Chord ring routing logic, finger tables, and concurrent Gossip/Push-Sum dissemination protocols.',
    architecture:
      'Erlang/OTP actor concurrency model implementing 10,000+ actors with fault-tolerant supervision trees, benchmarking ring, full-mesh, and 3D grid topologies.',
    challenges:
      'Ensuring network convergence under simulated message loss and node failure while sustaining high message throughput.',
    impact:
      'Demonstrated 100% network convergence within 15 rounds and benchmarked system throughput at 50,000+ messages/sec across 10,000+ actor nodes.',
    href: 'https://github.com/Roopsaicharan/Dosp_project',
    accent: '#ffd18a',
  },
  {
    id: 'aws-cloud',
    codename: 'MISSION-TELEMETRY',
    title: 'AWS Cloud Infrastructure & Automated CI/CD (APSSDC)',
    category: 'Full-Stack & Web3',
    year: '2023',
    eraId: 'control',
    tags: ['AWS EC2', 'CloudWatch', 'S3', 'CloudFront', 'CI/CD', 'GitHub Actions'],
    summary:
      'AWS Cloud Computing Intern at APSSDC deploying 3 production web applications on AWS EC2 with auto-scaling groups, configuring CloudWatch alarms for CPU/memory thresholds, and automating CI/CD pipelines using AWS CodePipeline and GitHub Actions.',
    problem:
      'Manual application deployments took 25 minutes per release and lacked automated health checks, causing intermittent portal downtime.',
    role:
      'AWS Cloud Computing Intern. Configured EC2 instances, security groups, auto-scaling policies, CloudWatch monitors, and automated build/deploy workflows.',
    architecture:
      'Automated CI/CD pipelines deploying containerized services to AWS EC2 auto-scaling groups with S3 static asset hosting and CloudFront CDN distribution.',
    challenges:
      'Minimizing cloud infrastructure overhead while maintaining 99.5% uptime during peak portal registration events.',
    impact:
      'Reduced release deployment time from 25 minutes to under 4 minutes; achieved 99.5% uptime; cut static asset delivery latency by 40% via CloudFront CDN.',
    href: 'https://github.com/Roopsaicharan',
    isPrivate: true,
    repoLabel: 'APSSDC Internship Work',
    accent: '#7dff9a',
  },
  {
    id: 'music',
    codename: 'MISSION-SONIC',
    title: 'SonicWave: Full-Stack Music Platform with Stripe & Supabase',
    category: 'Full-Stack & Web3',
    year: '2023',
    eraId: 'neon',
    tags: ['Next.js', 'React', 'Stripe', 'Supabase', 'PostgreSQL', 'Web Audio API'],
    summary:
      'Customer-facing subscription music platform with Stripe payment integration for recurring billing, PostgreSQL-backed catalog of 1,000+ tracks, full-text search with sub-200ms query response, and real-time audio playback.',
    problem:
      'Independent musicians needed an integrated storefront supporting recurring subscriptions, instant checkout webhooks, and fast mobile playback.',
    role:
      'Sole Full-Stack Developer. Implemented Next.js Server-Side Rendering (SSR), Supabase Auth with OAuth 2.0 (Google/GitHub), normalized 8-table relational PostgreSQL schema, and Stripe payment webhooks.',
    architecture:
      'Next.js SSR application with Supabase PostgreSQL, Row-Level Security (RLS) policies, Stripe checkout session webhooks, and Web Audio API streaming.',
    challenges:
      'Optimizing complex relational queries (users, subscriptions, playlists, tracks, likes) to keep average playlist-fetch latency under 200ms.',
    impact:
      'Reduced initial page load to under 1.2s via Next.js SSR; cut playlist query latency by 60% through database indexes; verified 100% payment webhook transaction integrity.',
    href: 'https://github.com/Roopsaicharan/Music-Bomb',
    accent: '#ff6ad5',
  },
  {
    id: 'blockchain-health',
    codename: 'MISSION-HEALTH',
    title: 'Decentralized Patient Record Sharing System (SRM AP)',
    category: 'Full-Stack & Web3',
    year: '2024 – 2025',
    eraId: 'genesis',
    tags: ['Solidity', 'Node.js', 'REST APIs', 'MongoDB', 'Smart Contracts', 'Ganache'],
    summary:
      'Special Project Intern at SRM University AP developing a governed, decentralized patient-record sharing platform with 12 Node.js REST API endpoints and 3 Solidity smart contracts enforcing role-based access control (patient, doctor, admin).',
    problem:
      'Centralized electronic health records are vulnerable to single-point unauthorized access and lack tamper-proof audit trails for cross-hospital record sharing.',
    role:
      'Special Project Intern, Blockchain Research. Implemented Solidity smart contracts, Node.js REST APIs, and JWT authentication flows.',
    architecture:
      'Hybrid blockchain architecture utilizing Solidity smart contracts on an Ethereum testnet for immutable permissions and access logs, combined with MongoDB for off-chain encrypted metadata.',
    challenges:
      'Optimizing smart-contract gas efficiency on Ethereum EVM without compromising fine-grained role-based permission checks.',
    impact:
      'Optimized smart-contract gas consumption by 18% through struct packing; verified zero unauthorized record access during integration testing across 500+ simulated transactions on Ganache.',
    href: 'https://github.com/Roopsaicharan/Decentralized-Patient-Record-Management-System-',
    accent: '#ffd18a',
  },
]

export const experience = [
  {
    mission: 'LOG-MCTRANS-UF',
    org: 'University of Florida — McTrans Center (IPPD Project)',
    role: 'Software Engineer, Data Processing Backend (TRACER)',
    years: '2026 – Present',
    briefing:
      'Engineered large-scale Python data pipelines ingesting 1.2M+ state DOT Linear Referencing System records across 71 routes and 4,599 corridor-miles (99.8% raw data reduction with full governance provenance). Implemented overlap-flattening and AADT propagation algorithms achieving 99.97% lane and 100% speed concordance against ground-truth benchmarks. Built distributed segmentation engine adhering to HCM 7th Edition standards exporting to 72-column McTrans HCS staging CSVs.',
  },
  {
    mission: 'LOG-UF-ECE',
    org: 'University of Florida — Electrical & Computer Engineering',
    role: 'Research Assistant, Agentic AI for Chip Design',
    years: '2026 – Present',
    briefing:
      'Developing an agentic AI orchestration platform using LLMs to assist semiconductor engineers with technical queries and coordinate workflows across EDA tools. Building domain-specific RAG pipelines to acquire, clean, and structure VLSI literature; implemented data validation scripts repairing extracted mathematical expressions and technical terminology.',
  },
  {
    mission: 'LOG-UF-RESEARCH',
    org: 'University of Florida (Advisor: Dr. Ivan Ruchikin)',
    role: 'Autonomous Vehicle Systems Researcher',
    years: '2026',
    briefing:
      'Developed a physics-informed Mamba state-space model for vehicle trajectory prediction, trained on 8,000+ driving episodes (6.4M+ time-step samples) in PyTorch. Achieved 23% lower MSE vs. vanilla Mamba on 5-second forecast horizon. Integrated kinematic bicycle physics loss penalties, reducing physically implausible predictions by 47% at <12ms inference.',
  },
  {
    mission: 'LOG-UF-GAMEROOM',
    org: 'University of Florida — Reitz Union Game Room',
    role: 'Student Assistant (Chatbot Development)',
    years: 'Apr 2026 – Oct 2026',
    briefing:
      'Built an end-to-end customer-facing chatbot handling 50+ FAQ intents to answer visitor questions, explain Game Room policies, and guide staff through technical issues. Automated 80% of repetitive inquiries, reducing average resolution time by 3x.',
  },
  {
    mission: 'LOG-SRM-BLOCKCHAIN',
    org: 'SRM University AP',
    role: 'Special Project Intern, Blockchain Research',
    years: 'Dec 2024 – Mar 2025',
    briefing:
      'Built 12 Node.js REST API endpoints and 3 Solidity smart contracts for governed decentralized patient-record sharing. Designed role-based access control across patient, doctor, and admin actors; optimized contract gas consumption by 18% and verified integrity across 500+ transactions on Ganache.',
  },
  {
    mission: 'LOG-AWS-APSSDC',
    org: 'APSSDC (Andhra Pradesh State Skill Development Corp)',
    role: 'AWS Cloud Computing Intern',
    years: 'Jun 2023 – Aug 2023',
    briefing:
      'Deployed 3 production web applications on AWS EC2 with auto-scaling groups and CloudWatch monitoring (99.5% uptime). Automated CI/CD pipelines using AWS CodePipeline and GitHub Actions, cutting release cycles from 25 minutes to under 4 minutes. Configured S3 and CloudFront CDN, reducing page load latency by 40%.',
  },
]

export const publications = [
  {
    id: 'PUB-01',
    title: 'An Explainable AI Driven Hybrid Model for Enhanced Intrusion Detection in Network Security',
    conference: 'IEEE ICAECT 2025',
    doi: '10.1109/ICaECT63952.2025.10958911',
    url: 'https://doi.org/10.1109/ICaECT63952.2025.10958911',
    summary:
      'Designed a hybrid ML/XAI intrusion detection framework combining deep learning classifiers with TreeSHAP explanations for transparent, high-precision network anomaly detection on benchmark cybersecurity datasets.',
  },
  {
    id: 'PUB-02',
    title: 'Analyzing Lossless Image Compression Techniques for IoT Devices',
    conference: 'IEEE ICEEICT 2024',
    doi: '10.1109/ICEEICT61591.2024.10718516',
    url: 'https://doi.org/10.1109/ICEEICT61591.2024.10718516',
    summary:
      'Empirical benchmark and optimization of lossless compression algorithms on resource-constrained IoT microcontrollers, evaluating memory footprints, throughput, and compression ratios under constrained RAM budgets.',
  },
]

export interface EraDefinition {
  id: 'genesis' | 'library' | 'foundry' | 'control' | 'neon' | 'research' | 'horizon'
  year: string
  shortYear: string
  originYear: string
  targetYear: string
  name: string
  subtitle: string
  tease: string
  section: string
  color: string
  featuredProject: ProjectData
  env: {
    skyTop: number
    skyBottom: number
    groundColor: number
    pathColor: number
    treeTrunkColor: number
    treeFoliageColor: number
    fogDensity: number
    sunColor: number
    sunIntensity: number
    architectureStyle: 'ancient' | 'campus' | 'industrial' | 'apollo' | 'synthwave' | 'observatory' | 'futuristic'
  }
  cutscene: {
    title: string
    subtext: string
    vortexColors: [string, string]
    speedTarget: number
    soundDesc: string
  }
}

export const eras: EraDefinition[] = [
  {
    id: 'genesis',
    year: '2021 // ROOTS',
    shortYear: '2021',
    originYear: '2027',
    targetYear: '2021',
    name: 'Ancient Valley: Distributed Roots',
    subtitle: 'Chord P2P, Gossip & C++ Foundations',
    tease: 'Where systems began: Chord 10,000-node P2P overlay (Gleam/OTP) & Decentralized Patient Records.',
    section: 'Roots',
    color: '#ffd18a',
    featuredProject: projects.find((p) => p.id === 'dosp-chord')!,
    env: {
      skyTop: 0x141f31,
      skyBottom: 0xf5b041,
      groundColor: 0x1e3a24,
      pathColor: 0x7c5a48,
      treeTrunkColor: 0x4a3227,
      treeFoliageColor: 0x27672c,
      fogDensity: 0.0055,
      sunColor: 0xffe082,
      sunIntensity: 3.2,
      architectureStyle: 'ancient',
    },
    cutscene: {
      title: 'WARPING TO YEAR 2021: DISTRIBUTED ROOTS',
      subtext: 'INITIALIZING CHORD P2P OVERLAY & ERLANG/OTP ACTOR SUPERVISION MESH',
      vortexColors: ['#ffb142', '#ff5252'],
      speedTarget: 88,
      soundDesc: 'Earthy golden temporal rumble',
    },
  },
  {
    id: 'library',
    year: '2026–2027 // GATOR CS',
    shortYear: 'UF-CS',
    originYear: '2021',
    targetYear: '2026',
    name: 'The Great Gator Library & AI Lab',
    subtitle: 'University of Florida (MS CS) & TRACER',
    tease: 'UF Gainesville campus: McTrans TRACER 1.2M record freeway segmentation & Reitz Union Chatbot.',
    section: 'Education',
    color: '#ff7700',
    featuredProject: projects.find((p) => p.id === 'tracer')!,
    env: {
      skyTop: 0x081e4b,
      skyBottom: 0xeb6b1c,
      groundColor: 0x163828,
      pathColor: 0xcc7a00,
      treeTrunkColor: 0x3d2b1f,
      treeFoliageColor: 0x1f5c3a,
      fogDensity: 0.005,
      sunColor: 0xff9900,
      sunIntensity: 3.6,
      architectureStyle: 'campus',
    },
    cutscene: {
      title: 'JUMPING TO 2026-2027: UNIVERSITY OF FLORIDA',
      subtext: 'CONNECTING TO MCTRANS LRS PIPELINE & UF REITZ UNION CHATBOT DIALOG FLOWS',
      vortexColors: ['#0021A5', '#FA4616'],
      speedTarget: 95,
      soundDesc: 'Gator temporal roar',
    },
  },
  {
    id: 'foundry',
    year: '2026 // SILICON FORGE',
    shortYear: 'VLSI',
    originYear: '2026',
    targetYear: '2026',
    name: 'Clockwork Data Foundry & Silicon Lab',
    subtitle: 'Agentic AI for Chip Design (UF ECE)',
    tease: 'Semiconductor engineering forge: Agentic RAG for VLSI textbooks with LaTeX equation preservation.',
    section: 'Foundry',
    color: '#ffd18a',
    featuredProject: projects.find((p) => p.id === 'chip-design')!,
    env: {
      skyTop: 0x1b2838,
      skyBottom: 0xd35400,
      groundColor: 0x3d291e,
      pathColor: 0xb5651d,
      treeTrunkColor: 0x2b1810,
      treeFoliageColor: 0xbf5700,
      fogDensity: 0.0065,
      sunColor: 0xf39c12,
      sunIntensity: 3.0,
      architectureStyle: 'industrial',
    },
    cutscene: {
      title: 'WARPING TO 2026: SEMICONDUCTOR SILICON FORGE',
      subtext: 'PARSING VLSI TEXTBOOK EQUATIONS & COORDINATING EDA WORKFLOW AGENTS',
      vortexColors: ['#e67e22', '#d35400'],
      speedTarget: 88,
      soundDesc: 'Industrial clockwork engine chime',
    },
  },
  {
    id: 'control',
    year: '1969 / 2023 // CLOUD',
    shortYear: '1969',
    originYear: '2026',
    targetYear: '1969',
    name: 'Apollo Mission Control & Cloud Telemetry',
    subtitle: 'AWS Cloud Infrastructure (APSSDC)',
    tease: 'Space-age launch telemetry & AWS Cloud Computing Intern CI/CD automation cutting releases from 25m to <4m.',
    section: 'Telemetry',
    color: '#7dff9a',
    featuredProject: projects.find((p) => p.id === 'aws-cloud')!,
    env: {
      skyTop: 0x04131d,
      skyBottom: 0x138d40,
      groundColor: 0x0f2019,
      pathColor: 0x27ae60,
      treeTrunkColor: 0x1a261e,
      treeFoliageColor: 0x0e8062,
      fogDensity: 0.0055,
      sunColor: 0x2ecc71,
      sunIntensity: 3.2,
      architectureStyle: 'apollo',
    },
    cutscene: {
      title: 'RETRO-TRAVERSAL TO 1969/2023: MISSION CONTROL',
      subtext: 'BOOTING AWS CLOUDWATCH METRIC STREAMS & EC2 AUTO-SCALING ALARMS',
      vortexColors: ['#2ed573', '#1e90ff'],
      speedTarget: 92,
      soundDesc: 'Apollo radio sweep and radar beep',
    },
  },
  {
    id: 'neon',
    year: '1985 // SYNTHWAVE',
    shortYear: '1985',
    originYear: '1969',
    targetYear: '1985',
    name: 'Neon Cyber City 1985',
    subtitle: 'SonicWave Platform & Retro Audio Synthesizer',
    tease: 'Stylized synthwave retro-futuristic city: Glowing skyscrapers, neon grid roads, and Stripe/Supabase music platform.',
    section: 'Arcade',
    color: '#00f3ff',
    featuredProject: projects.find((p) => p.id === 'music')!,
    env: {
      skyTop: 0x090014,
      skyBottom: 0x7b1fa2,
      groundColor: 0x100b21,
      pathColor: 0x00f3ff,
      treeTrunkColor: 0x221a42,
      treeFoliageColor: 0xff007f,
      fogDensity: 0.006,
      sunColor: 0xff007f,
      sunIntensity: 3.6,
      architectureStyle: 'synthwave',
    },
    cutscene: {
      title: 'WARPING TO 1985: SYNTHWAVE CYBER CITY',
      subtext: 'SYNCHRONIZING DIGITAL AUDIO SYNTHESIZERS & SUPABASE REALTIME POSTGRESQL',
      vortexColors: ['#ff007f', '#00f3ff'],
      speedTarget: 99,
      soundDesc: 'Synthwave arpeggiator resonance',
    },
  },
  {
    id: 'research',
    year: '2024–2025 // IEEE',
    shortYear: 'IEEE',
    originYear: '1985',
    targetYear: '2024',
    name: 'Temporal Research Observatory',
    subtitle: 'Peer-Reviewed IEEE Publications',
    tease: 'High-altitude research observatory: Published IEEE papers in IoT image compression and explainable AI security.',
    section: 'Research',
    color: '#ff9a4c',
    featuredProject: projects.find((p) => p.id === 'research-papers')!,
    env: {
      skyTop: 0x06071a,
      skyBottom: 0x16a085,
      groundColor: 0x171f24,
      pathColor: 0x3498db,
      treeTrunkColor: 0x242b35,
      treeFoliageColor: 0x00cec9,
      fogDensity: 0.0055,
      sunColor: 0x54a0ff,
      sunIntensity: 3.0,
      architectureStyle: 'observatory',
    },
    cutscene: {
      title: 'WARPING TO 2024-2025: IEEE OBSERVATORY',
      subtext: 'INDEXING PEER-REVIEWED CONFERENCE PROCEEDINGS (ICEEICT 2024 & ICAECT 2025)',
      vortexColors: ['#48dbfb', '#ff9f43'],
      speedTarget: 90,
      soundDesc: 'Cosmic quantum resonator',
    },
  },
  {
    id: 'horizon',
    year: '2026+ // AI FRONTIER',
    shortYear: 'FUTURE',
    originYear: '2024',
    targetYear: '2026',
    name: 'Horizon Station: MeetMint & World Models',
    subtitle: 'MeetMint (Go/Gemini) & Physics-Informed Mamba',
    tease: 'Futuristic biosphere: MeetMint AI Meeting Intelligence (<300ms p95) & Physics-Informed Mamba World Models (<12ms).',
    section: 'Future',
    color: '#5ef2ff',
    featuredProject: projects.find((p) => p.id === 'world-models')!,
    env: {
      skyTop: 0x020517,
      skyBottom: 0x2e0854,
      groundColor: 0x061524,
      pathColor: 0x38ef7d,
      treeTrunkColor: 0x141d2c,
      treeFoliageColor: 0x9b59b6,
      fogDensity: 0.005,
      sunColor: 0x00f2fe,
      sunIntensity: 3.8,
      architectureStyle: 'futuristic',
    },
    cutscene: {
      title: 'LEAPING TO 2026+: HORIZON STATION',
      subtext: 'ORCHESTRATING MEETMINT GO/GEMINI AGENTS & MAMBA STATE-SPACE TRAJECTORY MATRICES',
      vortexColors: ['#4cc9f0', '#7209b7'],
      speedTarget: 108,
      soundDesc: 'Hyperspace singularity boom',
    },
  },
]

export type EraId = (typeof eras)[number]['id']

export function eraById(id: string) {
  return eras.find((era) => era.id === id)
}

export function adjacentEra(id: EraId, delta: number) {
  const index = eras.findIndex((era) => era.id === id)
  const next = (index + delta + eras.length) % eras.length
  return eras[next]
}

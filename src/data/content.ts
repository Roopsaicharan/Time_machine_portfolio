export const traveler = {
  name: 'Roop Sai Charan Kothamasu',
  callsign: 'CHRONOS-01',
  role: 'Software Engineer | AI/ML Researcher | Full-Stack Developer',
  tagline: 'Bridging full-stack artistry, AI agent architectures, and distributed systems across time.',
  bio: `Master's-level Computer Science student at the University of Florida specializing in AI systems, front-end engineering, and high-performance software. Passionate about building robust, user-centric systems spanning generative AI agents, retrieval-augmented generation (RAG), and data-intensive distributed platforms.

Experienced across TypeScript, React, Next.js, Python, Three.js, Go, C++, and cloud infrastructure. Every milestone is a destination in time—step into the Doraemon Time Machine to explore them.`,
  location: 'Gainesville, FL (University of Florida) • Andhra Pradesh, India',
  phone: '+1 (352) 721-6208',
  email: 'roopsai2003@gmail.com',
  educationSummary: "Master's in Computer Science — University of Florida (Graduating May 2027)",
  lookingFor:
    'Seeking 2027 new-graduate Software Engineering, AI/ML, and Full-Stack Developer opportunities.',
}

export const links = {
  email: 'roopsai2003@gmail.com',
  github: 'https://github.com/Roopsaicharan',
  linkedin: 'https://www.linkedin.com/in/roopsaicharan/',
  phone: '+13527216208',
  resume: '#resume-modal',
}

export const education = [
  {
    place: 'University of Florida, Gainesville',
    program: "Master's in Computer Science",
    years: 'Aug 2025 – May 2027',
    gpa: 'Graduate Studies',
    notes:
      'Specializing in Artificial Intelligence, Advanced Distributed Systems, Full-Stack Architecture, and Scalable Cloud Computing. Active contributor to McTrans transportation research.',
  },
  {
    place: 'SRM University, Andhra Pradesh',
    program: 'B.Tech in Computer Science (AIML Specialization)',
    years: 'Mar 2021 – Mar 2025',
    gpa: 'CGPA 7.9/10',
    notes:
      'Graduated with distinction in AIML. Published two peer-reviewed IEEE research papers on IoT compression and explainable AI intrusion detection; filed an international patent for decentralized patient records.',
  },
]

export const skills = [
  {
    forge: 'Languages',
    alloys: ['TypeScript', 'JavaScript (ES6+)', 'Python', 'Go', 'C++', 'Java', 'SQL (PostgreSQL/MySQL)', 'C', 'Solidity'],
  },
  {
    forge: 'Front-End & Creative Web',
    alloys: ['React.js', 'Next.js', 'Three.js / WebGL', 'Tailwind CSS', 'HTML5 & CSS3', 'Framer Motion', 'Web Audio API', 'Responsive UI/UX'],
  },
  {
    forge: 'AI, ML & Data Systems',
    alloys: ['Hybrid RAG (BM25 + Vector)', 'LangChain / Agents', 'ChromaDB', 'Gemini 1.5 Flash', 'Llama-3', 'PyTorch / TensorFlow', 'GIS & LRS Systems', 'NumPy & Pandas'],
  },
  {
    forge: 'Cloud, Systems & DevOps',
    alloys: ['AWS (EC2, CloudWatch, S3)', 'Docker & Containers', 'CI/CD Automation', 'RESTful APIs', 'Linux / Unix', 'Git & GitHub', 'Agile / Scrum'],
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
  accent: string
}

export const projects: ProjectData[] = [
  {
    id: 'tracer',
    codename: 'MISSION-TRACER',
    title: 'TRACER: Intelligent Freeway Segmentation & LRS Processing',
    category: 'Research & Data',
    year: '2025–2026',
    eraId: 'library',
    tags: ['Python', 'GIS / LRS', 'Highway Capacity Manual', 'Data Cleaning', 'ETL', 'McTrans UF'],
    summary:
      'Multidisciplinary University of Florida engineering project sponsored by McTrans. Engineered automated data cleaning pipelines across 1.2M raw roadway records using Linear Referencing Systems (LRS), Highway Capacity Manual (HCM) rules, and event detection to generate HCS-compliant freeway segment datasets.',
    problem:
      'Raw transportation telemetry across 1.2M+ roadway records contains spatial noise, missing milepost coordinates, and misaligned event boundaries that previously required weeks of manual validation.',
    role:
      'Lead Automation Engineer on data cleaning pipelines, coordinate normalization, and HCM rule-based segmentation algorithm.',
    architecture:
      'Python ETL engine parsing shapefiles and GIS mileposts, applying boundary clustering, event detection, and generating HCS-compatible structured CSV exports.',
    challenges:
      'Standardizing heterogeneous county-level shapefiles and eliminating segment fragmentation around complex freeway on-ramps and weave sections.',
    impact:
      'Automated processing of 1.2M roadway records, slashing segmentation turnaround from weeks to minutes while ensuring 100% HCM rule compliance.',
    href: 'https://github.com/Roopsaicharan',
    accent: '#ff7700',
  },
  {
    id: 'chip-design',
    codename: 'MISSION-SILICON',
    title: 'Agentic AI for Chip Design & VLSI Knowledge Retrieval',
    category: 'AI & Systems',
    year: '2025–2026',
    eraId: 'foundry',
    tags: ['RAG', 'Agentic AI', 'VLSI Textbooks', 'LaTeX Parsing', 'Knowledge Retrieval', 'Semiconductors'],
    summary:
      'Domain-specific Agentic RAG research system designed for semiconductor VLSI design. Engineered specialized technical document ingestion preserving complex mathematical expressions, circuit schematics, and hierarchical hardware concepts for high-accuracy engineering query answering.',
    problem:
      'Standard LLM embeddings destroy mathematical formulas and hierarchical schematic relationships in dense VLSI literature, causing severe hallucinations in hardware design queries.',
    role:
      'Research Developer designing the document chunking schema, LaTeX formula preservation layer, and multi-stage verification agents.',
    architecture:
      'Custom PDF parser isolating formula tokens, multi-vector indexing with ChromaDB, and multi-agent cross-referencing between circuit theory and verification rules.',
    challenges:
      'Preserving mathematical equations and sub-circuit ASCII diagrams during tokenization without exceeding token window budgets.',
    impact:
      'Achieved zero-loss mathematical symbol retrieval on VLSI textbook benchmarks and dramatically reduced hardware concept hallucination rates.',
    href: 'https://github.com/Roopsaicharan',
    accent: '#ffd18a',
  },
  {
    id: 'world-models',
    codename: 'MISSION-MAMBA',
    title: 'Physics-Informed World Models for Autonomous Systems',
    category: 'AI & Systems',
    year: '2025–2026',
    eraId: 'horizon',
    tags: ['Mamba Architecture', 'Physics-Informed ML', 'State-Space Models', 'Autonomous Vehicles', 'PyTorch'],
    summary:
      'Investigated sequential physics-informed machine learning utilizing state-space Mamba models for autonomous vehicle trajectory forecasting. Incorporates dynamic vehicular physics constraints into neural state transitions, evaluated using Mean Squared Error (MSE) metrics on multi-sensor trajectory datasets.',
    problem:
      'Conventional Transformer world models suffer quadratic complexity with long sequence lengths and frequently produce physically infeasible vehicle trajectories during sudden braking or evasive maneuvers.',
    role:
      'Research Investigator implementing Mamba state-space layers and integrating kinematic bicycle physics loss functions.',
    architecture:
      'Selective state-space (Mamba) temporal backbone coupled with physics regularization loss enforcing acceleration and turning-radius constraints.',
    challenges:
      'Balancing continuous physical constraint gradients with discrete trajectory waypoint tokens without gradient explosion.',
    impact:
      'Reduced trajectory prediction MSE by 22% compared to baseline RNNs while guaranteeing kinematic feasibility across all predicted paths.',
    href: 'https://github.com/Roopsaicharan',
    accent: '#5ef2ff',
  },
  {
    id: 'meetmint',
    codename: 'MISSION-MINT',
    title: 'MeetMint: AI-Powered Productivity Dashboard',
    category: 'AI & Systems',
    year: '2025',
    eraId: 'horizon',
    tags: ['Go', 'React', 'Gemini 1.5 Flash', 'Local RAG', 'SQLite', 'Framer Motion'],
    summary:
      'Architected a full-stack AI dashboard using Go and React to transform meeting audio into structured project metadata, leveraging Gemini 1.5 Flash for low-latency transcription and task extraction. Engineered a local RAG pipeline with SQLite embeddings and a sleek Glassmorphism UI with 35+ automated tests.',
    problem:
      'Engineering teams spend hours manually compiling action items, assignees, and deadlines from unstructured meeting discussions.',
    role:
      'Full-Stack & AI Systems Architect designing the Go REST backend, Gemini API integration, local RAG vector storage, and interactive React UI.',
    architecture:
      'Go backend orchestrating Gemini 1.5 Flash streaming APIs, SQLite vector indexing for local meeting history, and React front-end with Framer Motion animations.',
    challenges:
      'Achieving sub-second response times for audio transcription chunking while extracting strict JSON schemas with 100% validation reliability.',
    impact:
      'Delivered <250ms API processing latency, 35+ automated unit/integration tests, and automated extraction of action items with 94% accuracy.',
    href: 'https://github.com/Roopsaicharan/MeetMint',
    accent: '#5ef2ff',
  },
  {
    id: 'chatbot',
    codename: 'MISSION-GATOR',
    title: 'AI-Powered Game Room Chatbot (UF Campus)',
    category: 'AI & Systems',
    year: '2024',
    eraId: 'library',
    tags: ['Node.js', 'Express', 'ChromaDB', 'Llama-3', 'BM25 Hybrid RAG', 'RBAC'],
    summary:
      'Developed a full-stack chatbot for the University of Florida leveraging GPT-OSS and Llama-3 APIs. Engineered a custom hybrid RAG pipeline combining self-hosted ChromaDB vector store and BM25 keyword index with strict RBAC, automated PII redaction, and regex output guardrails.',
    problem:
      'Student queries regarding campus gaming equipment, tournament schedules, and policy rules were scattered across static PDFs and emails, creating high staff support overhead.',
    role:
      'Full-Stack AI Developer building the Node.js/Express service, embedding pipeline, and interactive web chat interface.',
    architecture:
      'Hybrid RAG architecture merging BM25 sparse keyword search and ChromaDB dense cosine vector retrieval with reciprocal rank fusion (RRF) and Llama-3 synthesis.',
    challenges:
      'Ensuring strict student PII redaction and preventing prompt injection while maintaining natural conversational flow.',
    impact:
      'Handled hundreds of student inquiries with 92% first-contact resolution and sub-800ms query latency.',
    href: 'https://github.com/Roopsaicharan/Game_room_chatbot',
    accent: '#ff7700',
  },
  {
    id: 'research-papers',
    codename: 'MISSION-RESEARCH',
    title: 'IEEE Research: IoT Compression & Network XAI',
    category: 'Research & Data',
    year: '2024–2025',
    eraId: 'research',
    tags: ['IoT Compression', 'Explainable AI', 'SHAP', 'Cybersecurity', 'IEEE Xplore'],
    summary:
      'Published two peer-reviewed IEEE papers: lossless image compression algorithms on constrained microcontrollers (IEEE ICEEICT 2024), and hybrid explainable AI intrusion detection models for zero-day network attacks (IEEE ICAECT 2025).',
    problem:
      'Constrained IoT microcontrollers cannot run heavy deep neural nets for compression, and critical security intrusion systems suffer from black-box explainability deficits.',
    role:
      'Primary Researcher and Lead Author responsible for algorithm benchmarking, statistical analysis, and manuscript preparation.',
    architecture:
      'Dual research framework: (1) Shannon entropy & Huffman-optimized differential coding for IoT; (2) Ensemble classifiers coupled with TreeSHAP and KernelSHAP explanation surfaces.',
    challenges:
      'Fitting lossless compression buffers within 64KB RAM budgets on microcontrollers and computing real-time SHAP values on high-throughput packet streams.',
    impact:
      'Two published IEEE conference proceedings; achieved 42% average data reduction on sensor telemetry and 99.4% detection accuracy on standard intrusion datasets.',
    href: 'https://doi.org/10.1109/ICEEICT61591.2024.10718516',
    paperUrl: 'https://doi.org/10.1109/ICEEICT61591.2024.10718516',
    accent: '#ff9a4c',
  },
  {
    id: 'aws-cloud',
    codename: 'MISSION-TELEMETRY',
    title: 'AWS Cloud Infrastructure & Automated CI/CD (APSSDC)',
    category: 'Full-Stack & Web3',
    year: '2023',
    eraId: 'control',
    tags: ['AWS EC2', 'CloudWatch', 'CI/CD', 'Docker', 'DevOps', 'Cost Optimization'],
    summary:
      'Supported web application deployments on AWS EC2 and improved uptime by 35% with repeatable release practices. Automated CI/CD pipeline steps to slash manual deployment overhead by 30%, monitored metrics via CloudWatch, and reduced infrastructure costs by 20%.',
    problem:
      'Manual, error-prone deployment scripts caused frequent downtime during web service releases across state skill development programs.',
    role:
      'AWS Cloud Computing Intern configuring EC2 instances, security groups, automated deployment triggers, and CloudWatch alert thresholds.',
    architecture:
      'GitHub Actions CI/CD deploying containerized Node.js services to AWS EC2 auto-scaling groups behind Application Load Balancers with CloudWatch synthetic monitoring.',
    challenges:
      'Minimizing state government cloud expenditures while maintaining 99.9% uptime during peak portal enrollment periods.',
    impact:
      'Achieved 35% improvement in application uptime, cut manual deployment overhead by 30%, and lowered monthly AWS spend by 20%.',
    href: 'https://github.com/Roopsaicharan',
    accent: '#7dff9a',
  },
  {
    id: 'music',
    codename: 'MISSION-SONIC',
    title: 'SonicWave: Music Platform with Stripe & Supabase',
    category: 'Full-Stack & Web3',
    year: '2023',
    eraId: 'neon',
    tags: ['Next.js', 'React', 'Tailwind', 'Stripe Payments', 'Supabase PostgreSQL'],
    summary:
      'Developed a subscription-based music streaming & purchase platform with responsive UI, secure Stripe checkouts, user-friendly error boundaries, and Supabase database optimization reducing load times by 25%.',
    problem:
      'Independent creators needed an affordable direct-to-listener audio store with instant payouts and seamless playback across devices.',
    role:
      'Sole Full-Stack Developer implementing client UI, Web Audio player, Stripe webhook listeners, and relational schema in Supabase.',
    architecture:
      'Next.js App Router front-end with Tailwind CSS, Supabase PostgreSQL with Row Level Security (RLS), Supabase Storage for audio CDN, and Stripe checkout session webhooks.',
    challenges:
      'Handling audio streaming buffering smoothly on low-bandwidth mobile networks while preventing unauthorized downloads of premium tracks.',
    impact:
      '25% reduction in page load latency via Next.js ISR, 100% webhook transaction integrity, and flawless cross-browser audio playback.',
    href: 'https://github.com/Roopsaicharan/Music-Bomb',
    accent: '#ff6ad5',
  },
  {
    id: 'recs',
    codename: 'MISSION-RECS',
    title: 'Amazon Product Recommendation Engine',
    category: 'Research & Data',
    year: '2022',
    eraId: 'foundry',
    tags: ['Python', 'NumPy', 'TensorFlow', 'Collaborative Filtering', 'Evaluation Metrics'],
    summary:
      'Built a collaborative and content-based recommendation engine tested over 50,000+ real product records, boosting recommendation accuracy by 18% through structured evaluation and rigorous feature engineering.',
    problem:
      'Cold-start issues and extreme sparsity in large e-commerce catalog interaction matrices degrade top-N product recommendation relevance.',
    role:
      'Machine Learning Developer engineering similarity metrics, matrix factorization models, and validation benchmarks.',
    architecture:
      'Hybrid recommender pipeline combining singular value decomposition (SVD) matrix factorization with cosine similarity on TF-IDF metadata vectors.',
    challenges:
      'Optimizing sparse matrix computations to execute within reasonable RAM constraints on consumer workstations.',
    impact:
      'Boosted recommendation precision/recall metrics by 18% on a 50,000+ item dataset with sub-50ms ranking computation.',
    href: 'https://github.com/Roopsaicharan',
    accent: '#ffd18a',
  },
  {
    id: 'payroll',
    codename: 'MISSION-PAYROLL',
    title: 'High-Performance C++ Enterprise Payroll Engine',
    category: 'Full-Stack & Web3',
    year: '2021',
    eraId: 'genesis',
    tags: ['C++', 'OOP Architecture', 'Data Structures', 'CRUD', 'File I/O'],
    summary:
      'Built a modular, object-oriented C++ system for enterprise payroll processing. Designed comprehensive edge-case handling and validation routines that reduced calculation runtimes by 40%.',
    problem:
      'Legacy payroll calculation software suffered from memory leaks and unhandled tax bracket edge cases on large employee rosters.',
    role:
      'Systems Developer structuring class hierarchies, file persistence serialization, and tax deduction calculation modules.',
    architecture:
      'Clean C++ OOP design implementing encapsulation, polymorphism, custom exception hierarchies, and binary file serialization.',
    challenges:
      'Ensuring strict numerical precision and preventing floating-point rounding errors across complex tiered progressive tax calculations.',
    impact:
      'Achieved 40% reduction in calculation runtimes and 100% test coverage over edge-case bonus/tax scenarios.',
    href: 'https://github.com/Roopsaicharan',
    accent: '#d7c39a',
  },
]

export const experience = [
  {
    mission: 'LOG-MCTRANS-UF',
    org: 'McTrans Center / University of Florida',
    role: 'Graduate Research Developer — TRACER Project',
    years: 'Aug 2025 – Present',
    briefing:
      'Engineering automated roadway data validation and GIS Linear Referencing Systems (LRS) across 1.2M+ transportation records. Developing Python algorithms compliant with Highway Capacity Manual (HCM) standards to generate freeway segmentations for HCS software suite.',
  },
  {
    mission: 'LOG-AWS-CLOUD',
    org: 'APSSDC (Andhra Pradesh State Skill Development Corp)',
    role: 'AWS Cloud Computing Intern',
    years: 'Jun 2023 – Aug 2023',
    briefing:
      'Supported web application deployments on AWS EC2 and improved uptime by 35% with repeatable release practices. Automated CI/CD pipeline steps to slash manual deployment overhead by 30%, monitored metrics via CloudWatch, and reduced infrastructure costs by 20%.',
  },
  {
    mission: 'LOG-RESEARCH-LAB',
    org: 'SRM University AP Research Laboratory',
    role: 'Research Intern — Machine Learning & Systems',
    years: 'Jan 2022 – Mar 2022',
    briefing:
      'Built reproducible data preparation and evaluation pipelines for predictive modeling over 15K+ records. Improved prediction stability by ~20% through ensemble techniques, feature scaling, and automated validation tracking.',
  },
]

export const publications = [
  {
    id: 'PUB-01',
    title: 'Analyzing Lossless Image Compression Techniques for IoT Devices',
    conference: 'IEEE ICEEICT 2024',
    doi: '10.1109/ICEEICT61591.2024.10718516',
    url: 'https://doi.org/10.1109/ICEEICT61591.2024.10718516',
    summary:
      'Benchmarked and optimized lossless compression algorithms on constrained IoT microcontrollers, achieving superior compression ratios with minimal RAM consumption.',
  },
  {
    id: 'PUB-02',
    title: 'An Explainable AI Driven Hybrid Model for Enhanced Intrusion Detection in Network Security',
    conference: 'IEEE ICAECT 2025',
    doi: '10.1109/ICaECT63952.2025.10958911',
    url: 'https://doi.org/10.1109/ICaECT63952.2025.10958911',
    summary:
      'Designed a hybrid ML/XAI intrusion detection model combining deep learning classifiers with SHAP explanations for transparent, high-precision zero-day anomaly detection.',
  },
  {
    id: 'PUB-03',
    title: 'Decentralized Patient Record Management System',
    conference: 'International Patent Filed / IEEE Format',
    doi: 'Patent Under Review (Decentralized Healthcare)',
    url: 'https://github.com/Roopsaicharan',
    summary:
      'Decentralized immutable electronic health record (EHR) exchange using Ethereum smart contracts, IPFS, and verifiable credentials for tamper-proof patient privacy and audit trails.',
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
    name: 'Ancient Valley: First Light',
    subtitle: 'System Foundations & C++ Architecture',
    tease: 'Where software engineering began: C++ High-Performance Payroll & Object-Oriented Architecture.',
    section: 'Roots',
    color: '#ffd18a',
    featuredProject: projects.find((p) => p.id === 'payroll')!,
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
      title: 'WARPING TO YEAR 2021: ANCIENT ROOTS',
      subtext: 'COMPILING C++ OBJECT-ORIENTED KERNEL & BINARY SERIALIZATION MATRIX',
      vortexColors: ['#ffb142', '#ff5252'],
      speedTarget: 88,
      soundDesc: 'Earthy golden temporal rumble',
    },
  },
  {
    id: 'library',
    year: '2025–2027 // GATOR CS',
    shortYear: 'UF-CS',
    originYear: '2021',
    targetYear: '2025',
    name: 'The Great Gator Library & AI Lab',
    subtitle: 'University of Florida (MS CS) & TRACER',
    tease: 'UF Gainesville research campus: TRACER Freeway Segmentation (McTrans) & AI Game Room Hybrid RAG Chatbot.',
    section: 'Education',
    color: '#ff7700',
    featuredProject: projects.find((p) => p.id === 'tracer')!,
    env: {
      skyTop: 0x081e4b,
      skyBottom: 0xeb6b1c, // UF Blue and Orange dusk
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
      title: 'JUMPING TO 2025-2027: UNIVERSITY OF FLORIDA',
      subtext: 'CONNECTING TO MCTRANS RESEARCH DATASET & UF HYBRID RAG VECTOR CLUSTER',
      vortexColors: ['#0021A5', '#FA4616'], // UF Royal Blue and Orange
      speedTarget: 95,
      soundDesc: 'Gator temporal roar',
    },
  },
  {
    id: 'foundry',
    year: '2022 // ML FORGE',
    shortYear: '2022',
    originYear: '2025',
    targetYear: '2022',
    name: 'Clockwork Data Foundry & Silicon Lab',
    subtitle: 'Chip Design RAG & Amazon Recommendations',
    tease: 'Autumn steampunk foundry: Agentic AI for Chip Design & Amazon Product Recommender over 50,000+ items.',
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
      title: 'WARPING TO YEAR 2022: BIG DATA & SILICON FORGE',
      subtext: 'PARSING VLSI TEXTBOOK EQUATIONS & TRAINING TENSORFLOW MATRICES',
      vortexColors: ['#e67e22', '#d35400'],
      speedTarget: 88,
      soundDesc: 'Industrial clockwork engine chime',
    },
  },
  {
    id: 'control',
    year: '1969 / 2023 // CLOUD',
    shortYear: '1969',
    originYear: '2022',
    targetYear: '1969',
    name: 'Apollo Mission Control & Cloud Telemetry',
    subtitle: 'AWS Cloud & APSSDC DevOps Telemetry',
    tease: 'Space-age launch telemetry & AWS Cloud Computing Intern (APSSDC) automated CI/CD pipelines.',
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
      subtext: 'BOOTING AWS CLOUDWATCH METRIC STREAMS & ORBITAL TELEMETRY TRANSPONDERS',
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
      skyBottom: 0x7b1fa2, // vibrant neon synthwave twilight
      groundColor: 0x100b21,
      pathColor: 0x00f3ff,
      treeTrunkColor: 0x221a42,
      treeFoliageColor: 0xff007f, // glowing hot pink palms
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
    subtitle: 'Peer-Reviewed IEEE Publications & Patents',
    tease: 'High-altitude research observatory: Lossless IoT image compression, Explainable AI, and Decentralized EHR.',
    section: 'Research',
    color: '#ff9a4c',
    featuredProject: projects.find((p) => p.id === 'research-papers')!,
    env: {
      skyTop: 0x06071a,
      skyBottom: 0x16a085, // Aurora borealis emerald
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
      subtext: 'INDEXING PEER-REVIEWED CONFERENCE PROCEEDINGS (ICEEICT & ICAECT)',
      vortexColors: ['#48dbfb', '#ff9f43'],
      speedTarget: 90,
      soundDesc: 'Cosmic quantum resonator',
    },
  },
  {
    id: 'horizon',
    year: '2025+ // AI FRONTIER',
    shortYear: 'FUTURE',
    originYear: '2024',
    targetYear: '2026',
    name: 'Horizon Station: MeetMint & World Models',
    subtitle: 'Gemini 1.5 Flash & Mamba Autonomous Physics',
    tease: 'Futuristic biosphere: MeetMint AI Meeting Intelligence & Physics-Informed Mamba World Models.',
    section: 'Future',
    color: '#5ef2ff',
    featuredProject: projects.find((p) => p.id === 'meetmint')!,
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
      title: 'LEAPING TO 2025+: HORIZON STATION',
      subtext: 'ORCHESTRATING GEMINI 1.5 FLASH RAG & MAMBA STATE-SPACE TRAJECTORY MATRICES',
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

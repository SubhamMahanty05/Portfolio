import {
  BarChart3,
  Binary,
  Brain,
  Database,
  LineChart,
  Radar,
  Sparkles,
} from "lucide-react";

export const personalInfo = {
  name: "Subham",
  title: "Data Science & Machine Learning Enthusiast",
  shortTitle: "B.Tech CSE Student",
  description:
    "I build data-driven products with machine learning and modern web tools.",
  stats: [
    { label: "Models Explored", value: "24+" },
    { label: "Datasets Analyzed", value: "16" },
    { label: "Hackathons & Labs", value: "8" },
  ],
  skillLoop: [
    "Machine Learning",
    "Deep Learning",
    "Data Analytics",
    "Python Automation",
    "Neural Networks",
    "Interactive Dashboards",
  ],
};

export const navigationItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Dashboard", href: "#dashboard" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

export const educationTimeline = [
  {
    year: "2023 - Present",
    title: "Lovely Professional University",
    place: "Specialization in Data Science and Machine Learning",
    description:
      "Focused on machine learning, data systems, and applied product work.",
  },
  {
    year: "2022 - 2023",
    title: "D.A.V. Public School",
    place: "Senior Secondary Education",
    description:
      "Completed senior secondary education with a focus on science subjects, laying the groundwork for a career in data science and machine learning.",
  },
];

export const aboutCards = [
  {
    title: "AI Product Mindset",
    description:
      "I turn ML ideas into usable products.",
    icon: Sparkles,
  },
  {
    title: "Data Storytelling",
    description:
      "I turn data into clear visual insights.",
    icon: LineChart,
  },
  {
    title: "Model Exploration",
    description:
      "I explore models through practical experiments.",
    icon: Brain,
  },
];

export const floatingTech = [
  { label: "TensorFlow", x: "6%", y: "18%" },
  { label: "Pandas", x: "82%", y: "14%" },
  { label: "NumPy", x: "12%", y: "76%" },
  { label: "Scikit", x: "80%", y: "75%" },
];

export const aboutJourneyStages = [
  {
    id: "curiosity",
    stage: "Stage 1",
    title: "Curiosity Begins",
    description:
      "Started with programming fundamentals and hands-on building.",
    icon: "code",
    accent: "from-cyan-400/30 to-blue-500/20",
  },
  {
    id: "data",
    stage: "Stage 2",
    title: "Exploring Data",
    description:
      "Moved into Python, analysis, and pattern finding.",
    icon: "database",
    accent: "from-sky-400/30 to-cyan-500/20",
  },
  {
    id: "ml",
    stage: "Stage 3",
    title: "Entering ML World",
    description:
      "Built early ML models and practical projects.",
    icon: "brain",
    accent: "from-violet-400/30 to-fuchsia-500/20",
  },
  {
    id: "systems",
    stage: "Stage 4",
    title: "Building Real Systems",
    description:
      "Combined interfaces, APIs, dashboards, and model logic.",
    icon: "layers",
    accent: "from-emerald-400/30 to-cyan-400/20",
  },
  {
    id: "future",
    stage: "Stage 5",
    title: "Future Vision",
    description:
      "Focused on building useful AI and data products.",
    icon: "rocket",
    accent: "from-fuchsia-400/30 to-indigo-500/20",
  },
];

export const aboutMilestones = [
  "First ML Project",
  "First Dashboard",
  "First Deployment",
  "First End-to-End ML Interface",
];

export const journeyGrowthData = [
  { year: "2022", skill: 24, confidence: 18 },
  { year: "2023", skill: 46, confidence: 39 },
  { year: "2024", skill: 63, confidence: 57 },
  { year: "2025", skill: 78, confidence: 71 },
  { year: "2026", skill: 91, confidence: 86 },
];

export const beyondCodeProfile = {
  title: "Who I Am Beyond Code",
  description:
    "Curious builder with a visual and product-focused mindset.",
  traits: ["Curious builder", "Visual thinker", "Systems mindset"],
  hobbies: ["Design experiments", "Tech storytelling", "Learning new AI workflows"],
};

export const skills = [
  {
    name: "Python",
    level: 92,
    summary: "Automation, APIs, and ML workflows.",
    color: "from-cyan-400 to-blue-500",
    icon: Binary,
  },
  {
    name: "Machine Learning",
    level: 89,
    summary: "Modeling, evaluation, and pipelines.",
    color: "from-fuchsia-400 to-violet-500",
    icon: Brain,
  },
  {
    name: "Data Analysis",
    level: 86,
    summary: "Analysis, dashboards, and insights.",
    color: "from-emerald-400 to-cyan-400",
    icon: BarChart3,
  },
  {
    name: "SQL",
    level: 81,
    summary: "Queries, joins, and reporting.",
    color: "from-sky-400 to-indigo-500",
    icon: Database,
  },
  {
    name: "JavaScript",
    level: 84,
    summary: "Interactive interfaces and UI logic.",
    color: "from-amber-300 to-orange-500",
    icon: Radar,
  },
  {
    name: "Deep Learning",
    level: 78,
    summary: "Neural networks and experimentation.",
    color: "from-violet-400 to-pink-500",
    icon: Brain,
  },
];

export const radarMetrics = [
  { label: "Modeling", value: 88 },
  { label: "Visualization", value: 84 },
  { label: "Inference", value: 76 },
  { label: "Deployment", value: 68 },
  { label: "Research", value: 80 },
  { label: "UI Systems", value: 82 },
];

export const skillsRadarData = [
  { skill: "Python", value: 92 },
  { skill: "Machine Learning", value: 89 },
  { skill: "Data Analysis", value: 86 },
  { skill: "SQL", value: 81 },
  { skill: "NLP", value: 78 },
  { skill: "Java", value: 84 },
];

export const skillDistributionData = [
  {
    name: "Python",
    level: 92,
    experience: "Advanced",
    confidence: "High",
    projects: 14,
    summary: "Primary language for analysis and ML work.",
    trend: [52, 61, 73, 84, 92],
  },
  {
    name: "Machine Learning",
    level: 89,
    experience: "Advanced",
    confidence: "High",
    projects: 11,
    summary: "Classification, forecasting, and pipeline design.",
    trend: [38, 49, 63, 77, 89],
  },
  {
    name: "Data Analysis",
    level: 86,
    experience: "Strong",
    confidence: "High",
    projects: 12,
    summary: "Exploration, reporting, and dashboards.",
    trend: [44, 57, 68, 78, 86],
  },
  {
    name: "SQL",
    level: 81,
    experience: "Strong",
    confidence: "High",
    projects: 8,
    summary: "Analytical queries and reporting.",
    trend: [28, 42, 55, 69, 81],
  },
  {
    name: "NLP",
    level: 78,
    experience: "Growing",
    confidence: "Medium",
    projects: 6,
    summary: "Natural language processing and text analysis.",
    trend: [18, 32, 49, 63, 78],
  },
  {
    name: "Java",
    level: 84,
    experience: "Strong",
    confidence: "High",
    projects: 9,
    summary: "Frontend interfaces and UI logic.",
    trend: [36, 48, 61, 73, 84],
  },
];

export const circularSkills = [
  { name: "Python", value: 92, color: "#22d3ee" },
  { name: "ML", value: 89, color: "#38bdf8" },
  { name: "SQL", value: 81, color: "#8b5cf6" },
  { name: "Java", value: 84, color: "#d946ef" },
];

export const skillGrowthData = [
  { year: "2022", Python: 42, "Machine Learning": 22, Java: 18 },
  { year: "2023", Python: 61, "Machine Learning": 46, Java: 39 },
  { year: "2024", Python: 74, "Machine Learning": 63, Java: 58 },
  { year: "2025", Python: 85, "Machine Learning": 78, Java: 71 },
  { year: "2026", Python: 92, "Machine Learning": 89, Java: 84 },
];

export const categorizedSkills = [
  {
    category: "Programming",
    description: "Core languages for product and data work.",
    items: [
      {
        name: "Python",
        level: 92,
        detail: "Primary tool for ML, analysis, and automation.",
        experience: "4 years",
        projects: ["VisionPulse", "FinSight", "TalentGraph"],
        confidence: "High",
      },
      {
        name: "Java",
        level: 84,
        detail: "Frontend interfaces and dashboards.",
        experience: "3 years",
        projects: ["Portfolio UI", "TalentGraph"],
        confidence: "High",
      },
      {
        name: "C++",
        level: 68,
        detail: "Problem solving and core programming.",
        experience: "2 years",
        projects: ["DSA Lab", "Competitive Practice"],
        confidence: "Medium",
      },
    ],
  },
  {
    category: "ML & AI",
    description: "Tools for modeling and ML experiments.",
    items: [
      {
        name: "Scikit-learn",
        level: 87,
        detail: "Classical ML pipelines and evaluation.",
        experience: "3 years",
        projects: ["TalentGraph", "Customer Segmentation"],
        confidence: "High",
      },
      {
        name: "TensorFlow",
        level: 78,
        detail: "Deep learning workflows.",
        experience: "2 years",
        projects: ["VisionPulse", "Image Lab"],
        confidence: "Medium",
      },
      {
        name: "NLP",
        level: 81,
        detail: "Text processing and ranking.",
        experience: "2 years",
        projects: ["TalentGraph", "Resume Parser"],
        confidence: "High",
      },
      {
        name: "Computer Vision",
        level: 76,
        detail: "Image pipelines and classification.",
        experience: "2 years",
        projects: ["VisionPulse"],
        confidence: "Medium",
      },
    ],
  },
  {
    category: "Data Tools",
    description: "Tools for analysis and reporting.",
    items: [
      {
        name: "Pandas",
        level: 91,
        detail: "Cleaning, reshaping, and feature prep.",
        experience: "4 years",
        projects: ["FinSight", "EDA Dashboards"],
        confidence: "High",
      },
      {
        name: "NumPy",
        level: 86,
        detail: "Array operations and preprocessing.",
        experience: "3 years",
        projects: ["VisionPulse", "ML Experiments"],
        confidence: "High",
      },
      {
        name: "Power BI",
        level: 72,
        detail: "Dashboards and reporting.",
        experience: "2 years",
        projects: ["Sales Dashboard", "Analytics Reports"],
        confidence: "Medium",
      },
      {
        name: "Excel",
        level: 79,
        detail: "Quick analysis and validation.",
        experience: "3 years",
        projects: ["Academic Analytics", "Operations Reports"],
        confidence: "High",
      },
    ],
  },
];

export const skillTagCloud = [
  "Python",
  "TensorFlow",
  "Scikit-learn",
  "Pandas",
  "NumPy",
  "SQL",
  "Java",
  "Feature Engineering",
  "Forecasting",
  "Visualization",
  "NLP",
  "Computer Vision",
  "Power BI",
  "Model Evaluation",
];

// export const skillsHeatmapData = [
//   { area: "Programming", Modeling: 82, Analytics: 76, Visualization: 71, Deployment: 68 },
//   { area: "ML & AI", Modeling: 91, Analytics: 73, Visualization: 66, Deployment: 62 },
//   { area: "Data Tools", Modeling: 74, Analytics: 93, Visualization: 84, Deployment: 58 },
//   { area: "Web Dev", Modeling: 52, Analytics: 61, Visualization: 88, Deployment: 79 },
// ];

export const projects = [
  {
    title: "ChatBot with Sentiment Analysis",
    description:
      "AI-powered chatbot that analyzes user sentiment in real-time.",
    stack: ["Python", "LLM models", "API integration", "NLTK VADER", "Pyngrok"],
    live: "#",
    github: "https://github.com/SubhamMahanty05/Chatbot.git",
    accent: "from-cyan-400/70 to-blue-500/70",
  },
  {
    title: "Car DataSet Analysis",
    description:
      "Exploratory data analysis and visualization of car datasets.",
    stack: ["Pandas", "Jupyter", "Matplotlib", "Seaborn"],
    live: "#",
    github: "https://github.com/SubhamMahanty05/Car-data-analysis.git",
    accent: "from-violet-400/70 to-fuchsia-500/70",
  },
];

export const projectsDashboardData = [
  {
    id: "chatbot",
    name: "ChatBot",
    icon: "forecast",
    status: "Active",
    trainingStatus: "Running",
    progress: 74,
    title: "ChatBot with Sentiment Analysis",
    description:
      "AI-powered chatbot that analyzes user sentiment in real-time.",
    stack: ["Python", "LLM models", "API integration", "NLTK VADER", "Pyngrok"],
    github: "https://github.com/SubhamMahanty05/Chatbot.git",
    live: "#",
    datasetSize: "6.2M rows",
    trainingTime: "48m rolling",
    metrics: {
      accuracy: 89.4,
      precision: 86.2,
      recall: 88.9,
      f1: 87.5,
    },
    trainingCurve: [
      { epoch: "01", accuracy: 58, loss: 1.65 },
      { epoch: "02", accuracy: 64, loss: 1.28 },
      { epoch: "03", accuracy: 71, loss: 0.98 },
      { epoch: "04", accuracy: 76, loss: 0.78 },
      { epoch: "05", accuracy: 81, loss: 0.59 },
      { epoch: "06", accuracy: 84, loss: 0.43 },
      { epoch: "07", accuracy: 87, loss: 0.33 },
      { epoch: "08", accuracy: 89, loss: 0.27 },
    ],
    distribution: [
      { name: "Retail", value: 39 },
      { name: "Subscriptions", value: 23 },
      { name: "Transfers", value: 21 },
      { name: "Outliers", value: 17 },
    ],
    scatter: [
      { x: 12, y: 24, z: 8, label: "Stable" },
      { x: 29, y: 39, z: 10, label: "Stable" },
      { x: 42, y: 56, z: 12, label: "Rising" },
      { x: 56, y: 51, z: 11, label: "Rising" },
      { x: 71, y: 73, z: 14, label: "Anomaly" },
      { x: 83, y: 81, z: 13, label: "Anomaly" },
    ],
    featureImportance: [
      { feature: "Seasonality", value: 91 },
      { feature: "Volume Shift", value: 76 },
      { feature: "Account Segment", value: 64 },
      { feature: "Holiday Signal", value: 52 },
    ],
    confusionMatrix: [
      [128, 10, 6],
      [9, 103, 12],
      [4, 13, 91],
    ],
    insights: [
      "Seasonality is the strongest signal.",
      "Month-end spikes reduce outlier precision.",
      "Current runs outperform baseline.",
    ],
    simulation: {
      placeholder: "Enter transaction pattern signal...",
      outputLabel: "Forecast",
      outputs: ["Projected Growth +12.8%", "Anomaly Risk Medium - 61%", "Volume Drift Low - 22%"],
    },
  },
  {
    id: "Dataset-analysis",
    name: "CarAnalysis",
    icon: "analytics",
    status: "Completed",
    trainingStatus: "Completed",
    progress: 100,
    title: "CarDataSet Analysis",
    description:
      "Exploratory data analysis and visualization of car datasets.",
    stack: ["Pandas", "Jupyter", "Matplotlib", "Seaborn"],
    github: "https://github.com/SubhamMahanty05/Car-data-analysis.git",
    live: "#",
    datasetSize: "84K profiles",
    trainingTime: "1h 06m",
    metrics: {
      accuracy: 91.1,
      precision: 90.2,
      recall: 88.1,
      f1: 89.1,
    },
    trainingCurve: [
      { epoch: "01", accuracy: 61, loss: 1.52 },
      { epoch: "02", accuracy: 67, loss: 1.18 },
      { epoch: "03", accuracy: 74, loss: 0.91 },
      { epoch: "04", accuracy: 79, loss: 0.71 },
      { epoch: "05", accuracy: 84, loss: 0.52 },
      { epoch: "06", accuracy: 88, loss: 0.37 },
      { epoch: "07", accuracy: 90, loss: 0.29 },
      { epoch: "08", accuracy: 91, loss: 0.22 },
    ],
    distribution: [
      { name: "Software", value: 34 },
      { name: "Data", value: 28 },
      { name: "Product", value: 21 },
      { name: "Design", value: 17 },
    ],
    scatter: [
      { x: 11, y: 22, z: 8, label: "Low Fit" },
      { x: 24, y: 37, z: 10, label: "Medium Fit" },
      { x: 37, y: 44, z: 11, label: "Medium Fit" },
      { x: 49, y: 62, z: 12, label: "High Fit" },
      { x: 63, y: 74, z: 14, label: "High Fit" },
      { x: 77, y: 82, z: 15, label: "High Fit" },
    ],
    featureImportance: [
      { feature: "Skill Similarity", value: 93 },
      { feature: "Experience Match", value: 81 },
      { feature: "Domain Keywords", value: 72 },
      { feature: "Project Depth", value: 61 },
    ],
    confusionMatrix: [
      [134, 7, 3],
      [13, 98, 8],
      [5, 10, 93],
    ],
    insights: [
      "Skill similarity drives the best ranking lift.",
      "Performance is strongest on technical roles.",
      "Weighted signals improved explainability.",
    ],
    simulation: {
      placeholder: "Enter candidate profile snippet...",
      outputLabel: "Match Result",
      outputs: ["ML Engineer Match - 94.1%", "Data Analyst Match - 88.6%", "Product Analyst Match - 76.3%"],
    },
  },
];

export const lineSeries = [18, 24, 22, 37, 41, 56, 62, 58, 76, 88, 94, 91];

export const pieSegments = [
  { label: "Training", value: 42, color: "#22d3ee" },
  { label: "Validation", value: 28, color: "#8b5cf6" },
  { label: "Inference", value: 18, color: "#38bdf8" },
  { label: "Monitoring", value: 12, color: "#f472b6" },
];

export const scatterPoints = [
  { x: 14, y: 38, size: 7 },
  { x: 22, y: 62, size: 10 },
  { x: 34, y: 48, size: 9 },
  { x: 48, y: 74, size: 14 },
  { x: 57, y: 53, size: 11 },
  { x: 67, y: 86, size: 13 },
  { x: 82, y: 67, size: 12 },
];

export const insightCards = [
  {
    title: "Model Confidence",
    value: "94.2%",
    note: "Best validation result.",
  },
  {
    title: "Anomaly Drift",
    value: "-12%",
    note: "False positives reduced.",
  },
  {
    title: "Data Freshness",
    value: "3 min",
    note: "Latest pipeline refresh time.",
  },
];

export const achievements = [
  {
    year: "2026",
    title: "Built immersive ML portfolio experiences",
    description:
      "Built interactive ML-focused portfolio interfaces.",
  },
  {
    year: "2025",
    title: "Completed multiple ML mini-projects",
    description:
      "Delivered projects in prediction, classification, and dashboards.",
  },
  {
    year: "2024",
    title: "Strengthened data-first engineering foundations",
    description:
      "Built a stronger base in Python, SQL, and frontend work.",
  },
];

export const contactProfile = {
  heading: "Let's Connect",
  description:
    "Open to internships, collaborations, and ML product work.",
  email: "subhammahanty817@gmail.com",
  phone: "+91 70088 41717",
  linkedin: "https://www.linkedin.com/in/mahanty-subham/",
  github: "https://github.com/SubhamMahanty05",
  instagram: "",
  scheduleLink: "mailto:subhammahanty817@gmail.com?subject=Schedule%20a%20call",
  location: "India",
  availability: "Open for internships and collaborations",
  quickActions: [
    {
      label: "Email Me",
      href: "mailto:subhammahanty817@gmail.com?subject=Let's%20build%20something%20intelligent",
    },
    {
      label: "Schedule Call",
      href: "mailto:subhammahanty817@gmail.com?subject=Schedule%20a%20call",
    },
  ],
};

export const assistantReplies = {
  projects:
    "Featured work includes computer vision, forecasting, and resume intelligence.",
  skills:
    "Core strengths include Python, machine learning, SQL, and NLP.",
  contact:
    "Reach out for collaborations, internships, or ML product work.",
  default:
    "I can help with projects, skills, experience, or the student’s AI interests. Try asking about ML projects, data analysis strengths, or future goals.",
};

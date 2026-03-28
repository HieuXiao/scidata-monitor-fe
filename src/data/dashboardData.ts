import type {
  Audience,
  ImpactLevel,
  MapPoint,
  PulseItem,
  ResearchFeedItem,
  SignalItem,
  SortMethod,
  SourceFilter,
  TimeWindow,
} from "../types/dashboard";

export const MAX_VISIBLE_FEED_CARDS = 3;

export const NAV_ITEMS = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/trends", label: "Trends" },
  { to: "/topics", label: "Topics" },
  { to: "/network", label: "Network" },
  { to: "/institutions", label: "Institutions" },
];

export const SIGNAL_ITEMS: SignalItem[] = [
  { id: "papers", label: "Weekly Papers", value: "6,539", change: "+6.8%", trend: "up" },
  { id: "radiomics", label: "Radiomics Velocity", value: "93.8", change: "+3.1%", trend: "up" },
  { id: "grants", label: "Funding Signals", value: "46.2K", change: "-0.7%", trend: "down" },
  { id: "clinical", label: "Clinical Trial Links", value: "4,438", change: "-2.1%", trend: "down" },
  { id: "open-datasets", label: "Open Datasets", value: "69.4K", change: "+5.4%", trend: "up" },
  { id: "citations", label: "Citation Flow", value: "8,972", change: "+1.2%", trend: "up" },
];

export const PULSE_ITEMS: PulseItem[] = [
  {
    id: "pulse-1",
    topic: "Will multimodal radiogenomics improve glioma staging in top journals this quarter?",
    confidence: 68,
    delta: "+7.4",
    trend: "up",
  },
  {
    id: "pulse-2",
    topic: "Will AI + pathology fusion become the dominant method in Europe in 2026?",
    confidence: 57,
    delta: "+3.9",
    trend: "up",
  },
  {
    id: "pulse-3",
    topic: "Will cross-hospital external validation exceed 40% in current radiomics papers?",
    confidence: 41,
    delta: "-2.8",
    trend: "down",
  },
  {
    id: "pulse-4",
    topic: "Will genomic explainability benchmarks be required by major conferences in 2026?",
    confidence: 73,
    delta: "+4.1",
    trend: "up",
  },
];

export const SOURCE_OPTIONS: SourceFilter[] = [
  "All",
  "PubMed",
  "arXiv",
  "OpenAlex",
  "Events",
  "Journals",
];

export const WINDOW_OPTIONS: TimeWindow[] = ["24H", "7D", "30D", "Quarter"];
export const ROLE_OPTIONS: Audience[] = ["Researcher", "Student", "Professor"];
export const SORT_OPTIONS: SortMethod[] = [
  "Citation Velocity",
  "Clinical Relevance",
  "Replication Score",
];

export const RESEARCH_FEED: ResearchFeedItem[] = [
  {
    id: "r-1",
    source: "PubMed",
    published: "7 minutes ago",
    title: "External validation of MRI radiogenomic signatures for glioblastoma survival prediction",
    summary:
      "Multi-center cohort from 11 hospitals confirms robust transfer performance for non-invasive biomarkers.",
    tags: ["Glioblastoma", "MRI", "External Validation"],
    audience: ["Researcher", "Professor"],
    windows: ["24H", "7D", "30D", "Quarter"],
    citationVelocity: 86,
    clinicalRelevance: 92,
    replicationScore: 79,
    institution: "Mayo Clinic + UCL",
    region: "US / UK",
  },
  {
    id: "r-2",
    source: "arXiv",
    published: "18 minutes ago",
    title: "Foundation diffusion model for PET-CT radiogenomics with low-resource fine-tuning",
    summary: "Study reports efficient transfer learning setup suitable for graduate labs with limited GPU capacity.",
    tags: ["PET-CT", "Foundation Model", "Low-resource"],
    audience: ["Researcher", "Student", "Professor"],
    windows: ["24H", "7D", "30D"],
    citationVelocity: 78,
    clinicalRelevance: 64,
    replicationScore: 88,
    institution: "ETH Zurich",
    region: "Switzerland",
  },
  {
    id: "r-3",
    source: "OpenAlex",
    published: "34 minutes ago",
    title: "Collaboration hotspot detected: radiogenomics + immunotherapy response prediction",
    summary: "Network graph shows sudden co-authorship growth across Germany, South Korea, and Singapore.",
    tags: ["Immunotherapy", "Collaboration", "Network Shift"],
    audience: ["Researcher", "Professor"],
    windows: ["24H", "7D", "30D", "Quarter"],
    citationVelocity: 74,
    clinicalRelevance: 81,
    replicationScore: 72,
    institution: "TUM / KAIST / NUS",
    region: "EU / APAC",
  },
  {
    id: "r-4",
    source: "Events",
    published: "1 hour ago",
    title: "Call for papers: reproducible radiomics challenge with open benchmark leaderboard",
    summary: "Competition focuses on reproducibility pipelines, baseline protocols, and transparent reporting.",
    tags: ["Competition", "Benchmark", "Open Science"],
    audience: ["Student", "Researcher", "Professor"],
    windows: ["24H", "7D"],
    citationVelocity: 63,
    clinicalRelevance: 58,
    replicationScore: 91,
    institution: "MICCAI Community",
    region: "Global",
  },
  {
    id: "r-5",
    source: "Journals",
    published: "2 hours ago",
    title: "Prospective radiogenomics workflow in breast cancer reaches phase-II multicenter milestone",
    summary: "Study combines imaging phenotype and expression markers to guide early treatment planning.",
    tags: ["Breast Cancer", "Prospective Trial", "Phase-II"],
    audience: ["Researcher", "Professor"],
    windows: ["24H", "7D", "30D"],
    citationVelocity: 82,
    clinicalRelevance: 95,
    replicationScore: 71,
    institution: "Karolinska Institute",
    region: "Nordics",
  },
  {
    id: "r-6",
    source: "PubMed",
    published: "3 hours ago",
    title: "Tutorial paper: practical radiogenomics pipeline for graduate students using open datasets",
    summary:
      "Step-by-step guide from data curation to model evaluation with reproducible notebooks and checklists.",
    tags: ["Tutorial", "Education", "Open Dataset"],
    audience: ["Student", "Researcher"],
    windows: ["24H", "7D", "30D", "Quarter"],
    citationVelocity: 69,
    clinicalRelevance: 62,
    replicationScore: 87,
    institution: "University of Toronto",
    region: "Canada",
  },
  {
    id: "r-7",
    source: "OpenAlex",
    published: "5 hours ago",
    title: "Topic drift alert: contrastive explainability methods overtake handcrafted feature pipelines",
    summary: "Bibliometric analysis indicates major shift in method adoption among top radiomics venues.",
    tags: ["Explainability", "Contrastive Learning", "Method Shift"],
    audience: ["Researcher", "Professor"],
    windows: ["7D", "30D", "Quarter"],
    citationVelocity: 77,
    clinicalRelevance: 70,
    replicationScore: 76,
    institution: "Imperial College London",
    region: "United Kingdom",
  },
  {
    id: "r-8",
    source: "arXiv",
    published: "6 hours ago",
    title: "Lightweight quality-control module improves reproducibility of MRI-derived genomic embeddings",
    summary: "New module reduces leakage risk and raises external consistency in multi-scanner settings.",
    tags: ["Quality Control", "MRI", "Reproducibility"],
    audience: ["Student", "Researcher", "Professor"],
    windows: ["7D", "30D", "Quarter"],
    citationVelocity: 72,
    clinicalRelevance: 75,
    replicationScore: 84,
    institution: "Seoul National University",
    region: "South Korea",
  },
];

export const MAP_POINTS: MapPoint[] = [
  { id: "boston", label: "Boston", x: 17, y: 32, level: "high" },
  { id: "toronto", label: "Toronto", x: 16, y: 29, level: "medium" },
  { id: "sao-paulo", label: "Sao Paulo", x: 29, y: 67, level: "medium" },
  { id: "london", label: "London", x: 44, y: 30, level: "high" },
  { id: "paris", label: "Paris", x: 45, y: 31, level: "high" },
  { id: "berlin", label: "Berlin", x: 47, y: 30, level: "medium" },
  { id: "stockholm", label: "Stockholm", x: 48, y: 26, level: "low" },
  { id: "madrid", label: "Madrid", x: 44, y: 35, level: "medium" },
  { id: "rome", label: "Rome", x: 48, y: 35, level: "medium" },
  { id: "tel-aviv", label: "Tel Aviv", x: 53, y: 39, level: "low" },
  { id: "cairo", label: "Cairo", x: 52, y: 42, level: "medium" },
  { id: "lagos", label: "Lagos", x: 49, y: 52, level: "low" },
  { id: "nairobi", label: "Nairobi", x: 55, y: 56, level: "medium" },
  { id: "cape-town", label: "Cape Town", x: 54, y: 76, level: "low" },
  { id: "dubai", label: "Dubai", x: 58, y: 43, level: "medium" },
  { id: "delhi", label: "Delhi", x: 65, y: 45, level: "medium" },
  { id: "mumbai", label: "Mumbai", x: 64, y: 49, level: "low" },
  { id: "bangkok", label: "Bangkok", x: 71, y: 53, level: "medium" },
  { id: "singapore", label: "Singapore", x: 73, y: 57, level: "high" },
  { id: "seoul", label: "Seoul", x: 78, y: 37, level: "high" },
  { id: "tokyo", label: "Tokyo", x: 81, y: 38, level: "high" },
  { id: "sydney", label: "Sydney", x: 84, y: 75, level: "medium" },
  { id: "melbourne", label: "Melbourne", x: 82, y: 78, level: "low" },
  { id: "auckland", label: "Auckland", x: 89, y: 80, level: "low" },
  { id: "mexico-city", label: "Mexico City", x: 20, y: 45, level: "low" },
];

export function getSortValue(item: ResearchFeedItem, method: SortMethod): number {
  if (method === "Citation Velocity") {
    return item.citationVelocity;
  }
  if (method === "Clinical Relevance") {
    return item.clinicalRelevance;
  }
  return item.replicationScore;
}

export function getImpactLevel(item: ResearchFeedItem): ImpactLevel {
  const aggregateScore =
    (item.citationVelocity + item.clinicalRelevance + item.replicationScore) / 3;

  if (aggregateScore >= 80) {
    return "high";
  }
  if (aggregateScore >= 67) {
    return "medium";
  }
  return "low";
}

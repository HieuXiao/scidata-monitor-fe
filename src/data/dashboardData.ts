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
    title: "MGMT Methylation Prediction in Glioblastoma using Multiparametric MRI and Machine Learning",
    summary:
      "Multi-center cohort from 11 hospitals confirms robust transfer performance for non-invasive biomarkers.",
    tags: ["Glioblastoma", "MGMT", "MRI", "Radiogenomics"],
    audience: ["Researcher", "Professor"],
    windows: ["24H", "7D", "30D", "Quarter"],
    citationVelocity: 86,
    clinicalRelevance: 92,
    replicationScore: 79,
    institution: "Mayo Clinic + UCL",
    region: "US / UK",
    doi: "10.1038/s41591-026-xxxxx",
    primaryAuthor: "Smith, J. et al.",
    citations: 247,
    domain: "Radiogenomics",
  },
  {
    id: "r-2",
    source: "arXiv",
    published: "18 minutes ago",
    title: "Deep Learning Models for MGMT Promoter Methylation Classification in Brain Tumors",
    summary: "Theoretical framework achieving unprecedented 99.7% fidelity in prediction models with novel error correction protocols.",
    tags: ["Deep Learning", "MGMT", "Brain Tumor", "CNN"],
    audience: ["Researcher", "Student", "Professor"],
    windows: ["24H", "7D", "30D"],
    citationVelocity: 78,
    clinicalRelevance: 85,
    replicationScore: 88,
    institution: "MIT + Caltech",
    region: "USA",
    doi: "10.48550/arXiv.2404.xxxxx",
    primaryAuthor: "Chen, W. et al.",
    citations: 156,
    domain: "Radiogenomics",
  },
  {
    id: "r-3",
    source: "Nature",
    published: "34 minutes ago",
    title: "Radiogenomic Profiling: MGMT Status Prediction and Treatment Response Correlation",
    summary: "Global meta-analysis reveals adaptive mechanisms in tumor imaging phenotypes with implications for personalized treatment planning.",
    tags: ["Radiogenomics", "MGMT", "Treatment Response", "Prognosis"],
    audience: ["Researcher", "Professor"],
    windows: ["24H", "7D", "30D", "Quarter"],
    citationVelocity: 74,
    clinicalRelevance: 95,
    replicationScore: 72,
    institution: "University of Queensland + UNEP",
    region: "APAC / Global",
    doi: "10.1038/s41467-026-xxxxx",
    primaryAuthor: "Patel, R. et al.",
    citations: 89,
    domain: "Radiogenomics",
  },
  {
    id: "r-4",
    source: "IEEE",
    published: "1 hour ago",
    title: "Federated Learning for Privacy-Preserving MGMT Prediction in Multi-Center Glioblastoma Studies",
    summary: "Novel distributed learning reduces data silos by 60% while maintaining state-of-the-art accuracy on benchmark datasets.",
    tags: ["Federated Learning", "MGMT", "Privacy", "Glioblastoma"],
    audience: ["Student", "Researcher", "Professor"],
    windows: ["24H", "7D"],
    citationVelocity: 63,
    clinicalRelevance: 88,
    replicationScore: 91,
    institution: "Stanford AI Lab + DeepMind",
    region: "USA / UK",
    doi: "10.1109/NNLS.2026.xxxxx",
    primaryAuthor: "Kumar, A. et al.",
    citations: 312,
    domain: "Radiogenomics",
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

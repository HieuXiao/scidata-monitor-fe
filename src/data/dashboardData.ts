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
  { id: "papers", label: "Weekly Papers", value: "12,847", change: "+8.3%", trend: "up" },
  { id: "impact", label: "Research Impact", value: "94.2", change: "+4.7%", trend: "up" },
  { id: "datasets", label: "Open Datasets", value: "69.4K", change: "+5.4%", trend: "up" },
  { id: "collabs", label: "Global Collaborations", value: "3,291", change: "+2.6%", trend: "up" },
  { id: "preprints", label: "New Preprints", value: "4,538", change: "-1.2%", trend: "down" },
  { id: "citations", label: "Citation Flow", value: "18,972", change: "+3.1%", trend: "up" },
];

export const PULSE_ITEMS: PulseItem[] = [
  {
    id: "pulse-1",
    topic: "Will large language models surpass human-level scientific reasoning by end of 2026?",
    confidence: 72,
    delta: "+9.1",
    trend: "up",
  },
  {
    id: "pulse-2",
    topic: "Will room-temperature superconductor claims be independently replicated this quarter?",
    confidence: 34,
    delta: "-4.2",
    trend: "down",
  },
  {
    id: "pulse-3",
    topic: "Will CRISPR gene-editing therapies receive regulatory approval in 3+ countries in 2026?",
    confidence: 68,
    delta: "+5.8",
    trend: "up",
  },
  {
    id: "pulse-4",
    topic: "Will quantum advantage be demonstrated in drug discovery applications this year?",
    confidence: 51,
    delta: "+2.3",
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
  "Practical Impact",
  "Replication Score",
];

export const RESEARCH_FEED: ResearchFeedItem[] = [
  {
    id: "r-1",
    source: "Nature",
    published: "5 minutes ago",
    title: "Scaling Laws for Multimodal Foundation Models: A Unified Framework for Vision-Language Reasoning",
    summary:
      "Researchers establish universal scaling laws predicting emergent capabilities in multimodal AI systems across 200+ benchmarks.",
    tags: ["Foundation Models", "Scaling Laws", "Multimodal AI"],
    audience: ["Researcher", "Professor"],
    windows: ["24H", "7D", "30D", "Quarter"],
    citationVelocity: 94,
    clinicalRelevance: 88,
    replicationScore: 82,
    institution: "Google DeepMind + Stanford",
    region: "US / UK",
    doi: "10.1038/s41586-026-xxxxx",
    primaryAuthor: "Zhang, L. et al.",
    citations: 412,
    domain: "Artificial Intelligence & Data Science",
  },
  {
    id: "r-2",
    source: "arXiv",
    published: "12 minutes ago",
    title: "Fault-Tolerant Quantum Computing with Topological Qubits at Room Temperature",
    summary: "Novel topological qubit architecture achieves 99.97% gate fidelity, bringing practical quantum computing closer to reality.",
    tags: ["Quantum Computing", "Topological Qubits", "Error Correction"],
    audience: ["Researcher", "Student", "Professor"],
    windows: ["24H", "7D", "30D"],
    citationVelocity: 78,
    clinicalRelevance: 72,
    replicationScore: 91,
    institution: "MIT + ETH Zurich",
    region: "USA / Switzerland",
    doi: "10.48550/arXiv.2604.xxxxx",
    primaryAuthor: "Mueller, K. et al.",
    citations: 187,
    domain: "Physics & Quantum",
  },
  {
    id: "r-3",
    source: "Nature",
    published: "28 minutes ago",
    title: "AMOC Tipping Point Analysis Using Deep Ocean Sensor Networks and Climate Modeling",
    summary: "Global meta-analysis of 15-year deep-ocean sensor data reveals early warning signals for Atlantic circulation collapse.",
    tags: ["Climate Change", "AMOC", "Ocean Sensors", "Tipping Points"],
    audience: ["Researcher", "Professor"],
    windows: ["24H", "7D", "30D", "Quarter"],
    citationVelocity: 82,
    clinicalRelevance: 95,
    replicationScore: 76,
    institution: "University of Oxford + NOAA",
    region: "UK / USA",
    doi: "10.1038/s41558-026-xxxxx",
    primaryAuthor: "Rahmstorf, S. et al.",
    citations: 234,
    domain: "Climate & Earth Science",
  },
  {
    id: "r-4",
    source: "IEEE",
    published: "45 minutes ago",
    title: "Self-Healing Perovskite Solar Cells with Record 33.7% Power Conversion Efficiency",
    summary: "Novel self-healing mechanism extends perovskite cell lifespan to 25+ years while achieving new efficiency records.",
    tags: ["Perovskite", "Solar Energy", "Self-Healing", "Photovoltaics"],
    audience: ["Researcher", "Student", "Professor"],
    windows: ["24H", "7D"],
    citationVelocity: 71,
    clinicalRelevance: 90,
    replicationScore: 85,
    institution: "KAIST + Helmholtz-Zentrum Berlin",
    region: "South Korea / Germany",
    doi: "10.1109/JPHOTOV.2026.xxxxx",
    primaryAuthor: "Park, J. et al.",
    citations: 156,
    domain: "Materials Science",
  },
  {
    id: "r-5",
    source: "PubMed",
    published: "1 hour ago",
    title: "Non-Invasive Brain-Computer Interface Achieves Real-Time Speech Decoding in ALS Patients",
    summary: "Ultra-high-density EEG combined with transformer models enables locked-in patients to communicate at 62 words per minute.",
    tags: ["BCI", "Neuroscience", "ALS", "Speech Decoding"],
    audience: ["Researcher", "Professor"],
    windows: ["24H", "7D", "30D"],
    citationVelocity: 86,
    clinicalRelevance: 97,
    replicationScore: 69,
    institution: "Caltech + Mayo Clinic",
    region: "USA",
    doi: "10.1056/NEJMoa2026xxxxx",
    primaryAuthor: "Shenoy, K. et al.",
    citations: 298,
    domain: "Neuroscience",
  },
  {
    id: "r-6",
    source: "OpenAlex",
    published: "2 hours ago",
    title: "Pan-Cancer Epigenomic Atlas Reveals Universal Gene Regulatory Networks Across 50 Tumor Types",
    summary: "Largest multi-omics cancer dataset to date identifies shared and unique regulatory elements driving tumorigenesis.",
    tags: ["Epigenomics", "Pan-Cancer", "Gene Regulation", "Multi-Omics"],
    audience: ["Researcher", "Student", "Professor"],
    windows: ["24H", "7D", "30D", "Quarter"],
    citationVelocity: 75,
    clinicalRelevance: 92,
    replicationScore: 88,
    institution: "Broad Institute + EMBL",
    region: "USA / Europe",
    doi: "10.1016/j.cell.2026.xxxxx",
    primaryAuthor: "Regev, A. et al.",
    citations: 341,
    domain: "Genomics",
  },
  {
    id: "r-7",
    source: "Nature",
    published: "3 hours ago",
    title: "Next-Generation mRNA Vaccines: Broad-Spectrum Protection Against Emerging Zoonotic Pathogens",
    summary: "A novel multivalent mRNA vaccine strategy demonstrates lasting immunity and strong T-cell responses against diverse viral families.",
    tags: ["Vaccines", "Immunology", "mRNA", "Infectious Diseases"],
    audience: ["Researcher", "Professor"],
    windows: ["24H", "7D", "30D", "Quarter"],
    citationVelocity: 88,
    clinicalRelevance: 96,
    replicationScore: 84,
    institution: "NIH + BioNTech",
    region: "USA / Europe",
    doi: "10.1038/s41591-030-xxxxx",
    primaryAuthor: "Karikó, K. et al.",
    citations: 215,
    domain: "Life Sciences & Medicine",
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
  if (method === "Practical Impact") {
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

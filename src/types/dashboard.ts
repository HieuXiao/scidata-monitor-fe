export type TrendDirection = "up" | "down";
export type Audience = "Researcher" | "Student" | "Professor";
export type SourceFilter = "All" | "PubMed" | "arXiv" | "OpenAlex" | "Events" | "Journals" | "Nature" | "IEEE";
export type TimeWindow = "24H" | "7D" | "30D" | "Quarter";
export type SortMethod = "Citation Velocity" | "Practical Impact" | "Replication Score";
export type ImpactLevel = "high" | "medium" | "low";

export interface SignalItem {
  id: string;
  label: string;
  value: string;
  change: string;
  trend: TrendDirection;
}

export interface PulseItem {
  id: string;
  topic: string;
  confidence: number;
  delta: string;
  trend: TrendDirection;
}

export interface ResearchFeedItem {
  id: string;
  source: Exclude<SourceFilter, "All">;
  published: string;
  title: string;
  summary: string;
  tags: string[];
  audience: Audience[];
  windows: TimeWindow[];
  citationVelocity: number;
  clinicalRelevance: number;
  replicationScore: number;
  institution: string;
  region: string;
  doi?: string;
  authors?: string;
  primaryAuthor?: string;
  citations?: number;
  domain?: "All" | "Artificial Intelligence & Data Science" | "Life Sciences & Medicine" | "Physics & Quantum" | "Materials Science" | "Climate & Earth Science" | "Neuroscience" | "Genomics";
}

export interface MapPoint {
  id: string;
  label: string;
  x: number;
  y: number;
  level: ImpactLevel;
  activeEvent?: string;
  eventTime?: string;
}

export interface PlaceholderPageProps {
  title: string;
  description: string;
}

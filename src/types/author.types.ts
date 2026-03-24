import type { PaperSummary } from "./paper.types";

export interface Author {
  id: string;
  name: string;
  institution?: string;
  citation_count?: number;
  community_id?: number;
}

export interface AuthorProfile extends Author {
  bio?: string;
  papers: PaperSummary[];
  co_authors: Author[];
}

export interface GraphNode {
  id: string;
  label: string;
  citation_count: number;
  community_id: number;
}

export interface GraphEdge {
  source: string;
  target: string;
  weight: number;
}

export interface GraphResponse {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

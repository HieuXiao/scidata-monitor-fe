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

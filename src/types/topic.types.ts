export interface TopicPoint {
  x: number;
  y: number;
  label: string;
  paper_id: string;
}

export interface TopicCluster {
  id: number;
  label: string;
  count: number;
  points: TopicPoint[];
}

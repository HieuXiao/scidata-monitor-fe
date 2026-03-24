import { MultiGraph } from "graphology";
import type { GraphResponse } from "@/types/graph.types";
import { getCommunityColor } from "./colorScales";

export function convertApiResponseToGraphology(response: GraphResponse): MultiGraph {
  const graph = new MultiGraph();
  response.nodes.forEach((node) => {
    graph.addNode(node.id, {
      label: node.label,
      size: Math.log1p(node.citation_count) * 3,
      color: getCommunityColor(node.community_id),
      x: Math.random(),
      y: Math.random(),
    });
  });
  response.edges.forEach((edge) => {
    graph.addEdge(edge.source, edge.target, { weight: edge.weight });
  });
  return graph;
}

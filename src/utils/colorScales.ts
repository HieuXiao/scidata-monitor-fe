const COMMUNITY_COLORS = [
  "#e11d48", // rose-600
  "#2563eb", // blue-600
  "#16a34a", // green-600
  "#d97706", // amber-600
  "#7c3aed", // violet-600
  "#0891b2", // cyan-600
];

export function getCommunityColor(communityId: number): string {
  return COMMUNITY_COLORS[communityId % COMMUNITY_COLORS.length];
}

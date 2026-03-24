export const paperKeys = {
  all: () => ["papers"] as const,
  lists: () => ["papers", "list"] as const,
  list: (filters: any) => ["papers", "list", filters] as const,
  details: () => ["papers", "detail"] as const,
  detail: (id: string) => ["papers", "detail", id] as const,
};

export const authorKeys = {
  all: () => ["authors"] as const,
  profile: (id: string) => ["authors", "profile", id] as const,
  graph: (id: string) => ["authors", "graph", id] as const,
};

export const topicKeys = {
  all: () => ["topics"] as const,
  list: () => ["topics", "list"] as const,
  papers: (topicId: string) => ["topics", "papers", topicId] as const,
};

export const trendKeys = {
  all: () => ["trends"] as const,
  keywords: (keywords: string[]) => ["trends", "keywords", keywords] as const,
};

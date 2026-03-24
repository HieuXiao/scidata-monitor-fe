export interface Author {
  id: string;
  name: string;
  institution?: string;
  citation_count?: number;
}

export interface Paper {
  id: string;
  title: string;
  authors: Author[];
  abstract: string;
  year: number;
  citation_count: number;
  topics: string[];
  external_link: string;
}

export interface PaperSummary extends Pick<Paper, "id" | "title" | "year"> {
  author_names: string[];
}

export interface PapersListResponse {
  items: Paper[];
  total: number;
  page: number;
}

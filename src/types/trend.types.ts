export interface TrendDataPoint {
  year: number;
  count: number;
}

export interface KeywordTrend {
  keyword: string;
  data: TrendDataPoint[];
}

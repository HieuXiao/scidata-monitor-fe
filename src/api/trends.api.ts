import axiosClient from "./axiosClient";
import type { KeywordTrend } from "@/types/trend.types";

export const trendsApi = {
  getKeywords: (keywords: string[]) =>
    axiosClient.get<KeywordTrend[]>("/trends", { params: { keywords } }).then((res) => res.data),
};

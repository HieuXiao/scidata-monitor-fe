import axiosClient from "./axiosClient";
import type { Paper, PapersListResponse } from "@/types/paper.types";

export const papersApi = {
  getList: (params: any) =>
    axiosClient.get<PapersListResponse>("/papers", { params }).then((res) => res.data),
  getById: (id: string) =>
    axiosClient.get<Paper>(`/papers/${id}`).then((res) => res.data),
  search: (query: string) =>
    axiosClient.get<PapersListResponse>("/search", { params: { q: query } }).then((res) => res.data),
};

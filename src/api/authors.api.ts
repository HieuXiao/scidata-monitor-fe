import axiosClient from "./axiosClient";
import type { AuthorProfile, GraphResponse } from "@/types/author.types";

export const authorsApi = {
  getById: (id: string) =>
    axiosClient.get<AuthorProfile>(`/authors/${id}`).then((res) => res.data),
  getGraph: (authorId: string) =>
    axiosClient.get<GraphResponse>(`/authors/${authorId}/graph`).then((res) => res.data),
};

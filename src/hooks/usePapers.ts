import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { paperKeys } from "@/constants/queryKeys";
import axiosClient from "@/api/axiosClient";

export interface PaperFilters {
  page?: number;
  limit?: number;
  yearRange?: [number, number];
  search?: string;
  topics?: string[];
}

export function usePapers(filters: PaperFilters) {
  return useQuery({
    queryKey: paperKeys.list(filters),
    queryFn: async () => {
      const { data } = await axiosClient.get("/papers", { params: filters });
      return data;
    },
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
}

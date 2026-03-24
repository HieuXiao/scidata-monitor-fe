import axiosClient from "./axiosClient";
import type { TopicCluster } from "@/types/topic.types";

export const topicsApi = {
  getList: () =>
    axiosClient.get<TopicCluster[]>("/topics").then((res) => res.data),
};

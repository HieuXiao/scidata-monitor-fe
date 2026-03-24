import { create } from "zustand";

interface FilterState {
  yearRange: [number, number];
  selectedTopics: string[];
  selectedInstitution: string | null;
  setFilter: (patch: Partial<Omit<FilterState, "setFilter" | "resetFilters">>) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  yearRange: [2019, 2024],
  selectedTopics: [],
  selectedInstitution: null,
  setFilter: (patch) => set((state) => ({ ...state, ...patch })),
  resetFilters: () =>
    set({
      yearRange: [2019, 2024],
      selectedTopics: [],
      selectedInstitution: null,
    }),
}));

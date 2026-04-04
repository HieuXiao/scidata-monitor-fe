import L from "leaflet";

export interface MapPoint {
  id: string;
  label: string;
  x: number;
  y: number;
  level: "high" | "medium" | "low";
  activeEvent?: string;
  eventTime?: string;
}

export const DEFAULT_MAP_STATE = {
  center: [20, 0] as [number, number],
  zoom: 2,
};

export const WORLD_BOUNDS = L.latLngBounds(
  L.latLng(-85, -180), // Southwest corner
  L.latLng(85, 180)    // Northeast corner
);

export const getMarkerColor = (level: string) => {
  switch (level) {
    case "high":
      return { bg: "#e74c3c", text: "High Priority", border: "#c0392b" };
    case "medium":
      return { bg: "#ff9500", text: "Active Lab", border: "#e67e22" };
    case "low":
      return { bg: "#2b8ac7", text: "Emerging Node", border: "#1a5276" };
    default:
      return { bg: "#999999", text: "Unknown", border: "#666666" };
  }
};

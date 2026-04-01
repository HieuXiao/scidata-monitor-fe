import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MAP_POINTS } from "../data/dashboardData";
import { Settings2 } from "lucide-react";

interface MapPoint {
  id: string;
  label: string;
  x: number;
  y: number;
  level: "high" | "medium" | "low";
}

export function WorldMap() {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize map
    mapRef.current = L.map(containerRef.current, {
      center: [20, 0],
      zoom: 2,
      minZoom: 2,
      maxZoom: 6,
      dragging: true,
      touchZoom: true,
      scrollWheelZoom: true,
    });

    // Add OpenStreetMap tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 6,
      tileSize: 256,
    }).addTo(mapRef.current);

    // Adjust map background
    const mapElement = containerRef.current;
    if (mapElement) {
      mapElement.style.backgroundColor = "#d0e8f0";
      const leafletContainer = mapElement.querySelector(".leaflet-container");
      if (leafletContainer) {
        (leafletContainer as HTMLElement).style.backgroundColor = "#d0e8f0";
      }
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Add markers for each data point
    MAP_POINTS.forEach((point: MapPoint) => {
      // Convert percentage to lat/lng
      // x: 0-100 maps to lon: -180 to 180
      // y: 0-100 maps to lat: 85 to -85 (approximately)
      const lng = (point.x / 100) * 360 - 180;
      const lat = 85 - (point.y / 100) * 170;

      const getMarkerColor = (level: string) => {
        switch (level) {
          case "high":
            return "#e74c3c"; // Red
          case "medium":
            return "#ff9500"; // Orange
          case "low":
            return "#2b8ac7"; // Blue
          default:
            return "#999999";
        }
      };

      const color = getMarkerColor(point.level);
      const isHovered = hoveredPoint === point.id;
      const size = point.level === "high" ? 12 : point.level === "medium" ? 10 : 8;

      // Create custom icon
      const iconHtml = `
        <div style="
          width: ${size * 2}px;
          height: ${size * 2}px;
          background-color: ${color};
          border: 2px solid ${color};
          border-radius: 50%;
          box-shadow: 0 0 ${isHovered ? 12 : 6}px rgba(0, 0, 0, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        "></div>
      `;

      const customIcon = L.divIcon({
        html: iconHtml,
        iconSize: [size * 2, size * 2],
        className: "custom-marker",
      });

      const marker = L.marker([lat, lng], { icon: customIcon })
        .bindPopup(
          `<div style="font-weight: 600; color: ${color};">${point.label}</div>`,
          { closeButton: false, offset: L.point(0, -10) }
        )
        .addTo(mapRef.current!);

      marker.on("mouseover", () => setHoveredPoint(point.id));
      marker.on("mouseout", () => setHoveredPoint(null));
      marker.on("click", () => marker.openPopup());

      markersRef.current.push(marker);
    });
  }, [hoveredPoint]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#d0e8f0",
        }}
      />

      {/* Map Controls */}
      <button
        className="setting-button-map"
        title="Map settings"
        style={{
          position: "absolute",
          top: "16px",
          right: "16px",
          zIndex: 1000,
        }}
      >
        <Settings2 size={20} />
      </button>

      {/* Legend */}
      <div
        style={{
          position: "absolute",
          bottom: "16px",
          left: "16px",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          border: "1px solid #d0d0d0",
          borderRadius: "4px",
          padding: "12px",
          zIndex: 1000,
          fontSize: "12px",
          maxWidth: "200px",
        }}
      >
        <div style={{ fontWeight: 700, color: "#00a8a0", marginBottom: "8px" }}>
          Research Centers
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "12px",
                height: "12px",
                backgroundColor: "#e74c3c",
                borderRadius: "50%",
              }}
            />
            <span>High priority</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "12px",
                height: "12px",
                backgroundColor: "#ff9500",
                borderRadius: "50%",
              }}
            />
            <span>Active labs</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "12px",
                height: "12px",
                backgroundColor: "#2b8ac7",
                borderRadius: "50%",
              }}
            />
            <span>Emerging node</span>
          </div>
        </div>
      </div>
    </div>
  );
}

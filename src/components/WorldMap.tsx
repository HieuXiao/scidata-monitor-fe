import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MAP_POINTS } from "../data/dashboardData";
import { RotateCcw } from "lucide-react";

interface MapPoint {
  id: string;
  label: string;
  x: number;
  y: number;
  level: "high" | "medium" | "low";
}

const DEFAULT_MAP_STATE = {
  center: [20, 0] as [number, number],
  zoom: 2,
};

// World bounds to prevent scrolling outside map
const WORLD_BOUNDS = L.latLngBounds(
  L.latLng(-85, -180), // Southwest corner
  L.latLng(85, 180)    // Northeast corner
);

export function WorldMap() {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      if (!containerRef.current) {
        setError("Map container not available");
        return;
      }

      // Cleanup previous map instance if it exists
      if (mapRef.current) {
        mapRef.current.remove();
      }

      // Initialize map
      mapRef.current = L.map(containerRef.current, {
        center: DEFAULT_MAP_STATE.center,
        zoom: DEFAULT_MAP_STATE.zoom,
        minZoom: 2,
        maxZoom: 6,
        dragging: true,
        touchZoom: true,
        scrollWheelZoom: true,
        zoomControl: false,
        maxBounds: WORLD_BOUNDS,
        maxBoundsViscosity: 0, // Remove bounce/snap - smooth dragging
        inertia: true,
        inertiaDeceleration: 3000,
      });

      // Add OpenStreetMap tile layer with error handling
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '',
        maxZoom: 6,
        tileSize: 256,
        errorTileUrl: '',
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

      // Enforce bounds when dragging
      mapRef.current.on("drag", () => {
        if (mapRef.current && !WORLD_BOUNDS.contains(mapRef.current.getBounds())) {
          mapRef.current.fitBounds(WORLD_BOUNDS, { animate: false });
        }
      });

      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to initialize map";
      setError(errorMessage);
      console.error("Map initialization error:", err);
    }

    return () => {
      try {
        if (mapRef.current) {
          mapRef.current.off("drag");
          mapRef.current.remove();
          mapRef.current = null;
        }
      } catch (err) {
        console.error("Error during map cleanup:", err);
      }
    };
  }, []);

  useEffect(() => {
    try {
      if (!mapRef.current) return;

      // Clear existing markers
      markersRef.current.forEach((marker) => {
        try {
          marker.remove();
        } catch (err) {
          console.error("Error removing marker:", err);
        }
      });
      markersRef.current = [];

      // Validate MAP_POINTS
      if (!Array.isArray(MAP_POINTS) || MAP_POINTS.length === 0) {
        console.warn("No map points available");
        return;
      }

      // Add markers for each data point
      MAP_POINTS.forEach((point: MapPoint) => {
        try {
          // Validate point data
          if (!point.id || !point.label || point.x === undefined || point.y === undefined) {
            console.warn("Invalid point data:", point);
            return;
          }

          // Validate coordinates are within range
          if (point.x < 0 || point.x > 100 || point.y < 0 || point.y > 100) {
            console.warn("Point coordinates out of range:", point);
            return;
          }

          // Convert percentage to lat/lng
          const lng = (point.x / 100) * 360 - 180;
          const lat = 85 - (point.y / 100) * 170;

          const getMarkerColor = (level: string) => {
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

          const colorObj = getMarkerColor(point.level);
          const isHovered = hoveredPoint === point.id;
          // Increased sizes: low=16, medium=20, high=24
          const baseSize = point.level === "high" ? 24 : point.level === "medium" ? 20 : 16;
          const size = isHovered ? baseSize * 1.4 : baseSize;

          // Create enhanced custom icon with better visual feedback
          const iconHtml = `
            <div style="
              width: ${size}px;
              height: ${size}px;
              background-color: ${colorObj.bg};
              border: 3px solid white;
              border-radius: 50%;
              box-shadow: 
                0 0 0 2px ${colorObj.border},
                0 0 ${isHovered ? 20 : 10}px rgba(0, 0, 0, 0.4),
                inset 0 0 ${isHovered ? 8 : 4}px rgba(255, 255, 255, 0.4);
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              transition: all 0.3s cubic-bezier(0.35, 0, 0.65, 1);
              transform: ${isHovered ? "scale(1.2) drop-shadow(0 4px 8px rgba(0,0,0,0.3))" : "scale(1)"};
              font-size: 10px;
              font-weight: bold;
              color: white;
              text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
            "></div>
          `;

          const customIcon = L.divIcon({
            html: iconHtml,
            iconSize: [Math.round(size), Math.round(size)],
            iconAnchor: [Math.round(size / 2), Math.round(size / 2)],
            popupAnchor: [0, -Math.round(size / 2) - 5],
            className: "custom-marker-enhanced",
          });

          if (!mapRef.current) return;

          const marker = L.marker([lat, lng], { icon: customIcon })
            .bindPopup(
              `<div style="
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                min-width: 200px;
              ">
                <div style="font-weight: 700; font-size: 15px; color: ${colorObj.bg}; margin-bottom: 8px;">
                  ${point.label}
                </div>
                <div style="font-size: 13px; color: #555;">
                  <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 6px;">
                    <div style="
                      width: 10px;
                      height: 10px;
                      background-color: ${colorObj.bg};
                      border-radius: 50%;
                      border: 2px solid ${colorObj.border};
                    "></div>
                    <span style="color: #666;">${colorObj.text}</span>
                  </div>
                  <div style="color: #999; font-size: 12px;">
                    Location: (${point.x.toFixed(1)}°, ${point.y.toFixed(1)}°)
                  </div>
                </div>
              </div>`,
              { 
                closeButton: true, 
                offset: L.point(0, -20),
                maxWidth: 250,
              }
            )
            .addTo(mapRef.current);

          // Add hover events for real-time interaction feedback
          marker.on("mouseover", () => {
            setHoveredPoint(point.id);
          });
          marker.on("mouseout", () => {
            setHoveredPoint(null);
          });
          marker.on("click", () => {
            try {
              marker.openPopup();
            } catch (err) {
              console.error("Error opening popup:", err);
            }
          });

          markersRef.current.push(marker);
        } catch (err) {
          console.error("Error creating marker for point:", point, err);
        }
      });

      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error rendering markers";
      setError(errorMessage);
      console.error("Marker rendering error:", err);
    }
  }, [hoveredPoint]);

  // Reset map to default state
  const handleResetMap = () => {
    try {
      if (mapRef.current) {
        mapRef.current.setView(DEFAULT_MAP_STATE.center, DEFAULT_MAP_STATE.zoom, {
          animate: true,
          duration: 0.5,
        });
        // Close any open popups
        mapRef.current.closePopup();
        setHoveredPoint(null);
        setError(null);
      }
    } catch (err) {
      console.error("Error resetting map:", err);
      setError("Failed to reset map");
    }
  };

  // Zoom in
  const handleZoomIn = () => {
    try {
      if (mapRef.current) {
        const currentZoom = mapRef.current.getZoom();
        if (currentZoom < 6) {
          mapRef.current.zoomIn();
        }
      }
    } catch (err) {
      console.error("Error zooming in:", err);
    }
  };

  // Zoom out
  const handleZoomOut = () => {
    try {
      if (mapRef.current) {
        const currentZoom = mapRef.current.getZoom();
        if (currentZoom > 2) {
          mapRef.current.zoomOut();
        }
      }
    } catch (err) {
      console.error("Error zooming out:", err);
    }
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div
        ref={containerRef}
        style={{ width: "100%", height: "100%", backgroundColor: "#d0e8f0" }}
      />

      {/* Reset Control */}
      <div
        onClick={handleResetMap}
        title="Reset map to default view"
        style={{
          position: "absolute", top: "12px", right: "12px", zIndex: 1000,
          width: "36px", height: "36px", borderRadius: "6px",
          backgroundColor: "rgba(255,255,255,0.95)",
          border: "1px solid #e2e8f0", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.15s ease", padding: 0, userSelect: "none",
          boxShadow: "0 1px 3px rgba(15,23,42,0.10)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.backgroundColor = "#f1f5f9";
          (e.currentTarget as HTMLDivElement).style.borderColor = "#2563eb";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.backgroundColor = "rgba(255,255,255,0.95)";
          (e.currentTarget as HTMLDivElement).style.borderColor = "#e2e8f0";
        }}
      >
        <RotateCcw size={15} color="#64748b" />
      </div>

      {/* Zoom Controls */}
      <div
        style={{
          position: "absolute", top: "58px", right: "12px", zIndex: 1000,
          display: "flex", flexDirection: "column",
          backgroundColor: "rgba(255,255,255,0.95)", borderRadius: "6px",
          overflow: "hidden", border: "1px solid #e2e8f0",
          boxShadow: "0 1px 3px rgba(15,23,42,0.10)",
        }}
      >
        <div
          onClick={handleZoomIn} title="Zoom in"
          style={{
            width: "36px", height: "36px", backgroundColor: "transparent",
            border: "none", cursor: "pointer", display: "flex",
            alignItems: "center", justifyContent: "center",
            fontSize: "20px", fontWeight: "600", color: "#334155",
            transition: "background 0.15s ease", padding: 0, userSelect: "none",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.backgroundColor = "#f1f5f9"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.backgroundColor = "transparent"; }}
        >
          +
        </div>
        <div style={{ height: "1px", backgroundColor: "#e2e8f0" }} />
        <div
          onClick={handleZoomOut} title="Zoom out"
          style={{
            width: "36px", height: "36px", backgroundColor: "transparent",
            border: "none", cursor: "pointer", display: "flex",
            alignItems: "center", justifyContent: "center",
            fontSize: "23px", fontWeight: "600", color: "#334155",
            transition: "background 0.15s ease", padding: 0, userSelect: "none",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.backgroundColor = "#f1f5f9"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.backgroundColor = "transparent"; }}
        >
          −
        </div>
      </div>

      {/* ── Hub Counter (top-left) ── */}
      <div
        style={{
          position: "absolute", top: "12px", left: "12px", zIndex: 1000,
          background: "rgba(255,255,255,0.93)",
          border: "1px solid rgba(226,232,240,0.95)", borderRadius: "6px",
          padding: "6px 10px", boxShadow: "0 1px 4px rgba(15,23,42,0.10)",
          pointerEvents: "none",
        }}
      >
        <div style={{
          fontSize: "11px", fontWeight: "700", color: "#0f172a",
          fontFamily: "'Inter', sans-serif", letterSpacing: "-0.01em",
        }}>
          🌐 Research Activity Map
        </div>
        <div style={{
          fontSize: "10px", color: "#64748b",
          fontFamily: "'JetBrains Mono', monospace", marginTop: "2px",
        }}>
          {MAP_POINTS.length} hubs active
        </div>
      </div>

      {/* ── Legend (bottom-left) ── */}
      <div
        style={{
          position: "absolute", bottom: "32px", left: "12px", zIndex: 1000,
          background: "rgba(255,255,255,0.93)",
          border: "1px solid rgba(226,232,240,0.95)", borderRadius: "6px",
          padding: "8px 10px", boxShadow: "0 1px 4px rgba(15,23,42,0.10)",
          pointerEvents: "none",
        }}
      >
        <div style={{
          fontSize: "9px", fontWeight: "700", color: "#64748b",
          textTransform: "uppercase", letterSpacing: "0.06em",
          marginBottom: "5px", fontFamily: "'Inter', sans-serif",
        }}>
          Research Activity
        </div>
        {[
          { color: "#e74c3c", label: "High Priority" },
          { color: "#ff9500", label: "Active Lab" },
          { color: "#2b8ac7", label: "Emerging Node" },
        ].map(({ color, label }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "4px" }}>
            <div style={{
              width: "10px", height: "10px", borderRadius: "50%",
              backgroundColor: color, border: "2px solid white",
              boxShadow: `0 0 0 1px ${color}`, flexShrink: 0,
            }} />
            <span style={{
              fontSize: "10px", color: "#334155",
              fontFamily: "'Inter', sans-serif", fontWeight: "500",
            }}>
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Error Message */}
      {error && (
        <div style={{
          position: "absolute", top: "165px", right: "12px",
          backgroundColor: "#fef2f2", border: "1px solid #fca5a5",
          borderRadius: "6px", padding: "12px", color: "#991b1b",
          fontSize: "13px", maxWidth: "250px", zIndex: 1000,
        }}>
          {error}
        </div>
      )}
    </div>
  );
}


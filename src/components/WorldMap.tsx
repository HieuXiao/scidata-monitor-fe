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
  activeEvent?: string;
  eventTime?: string;
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
        maxBoundsViscosity: 1.0, // Solid bounds, preventing bounce out
        inertia: true,
        inertiaDeceleration: 3000,
      });

      // Add OpenStreetMap tile layer with error handling
      // Map tile layer with elegant light mode
      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        attribution: '',
        maxZoom: 6,
        tileSize: 256,
        errorTileUrl: '',
      }).addTo(mapRef.current);

      // Adjust map background to be transparent and controlled by CSS
      const mapElement = containerRef.current;
      if (mapElement) {
        mapElement.style.backgroundColor = "transparent";
        const leafletContainer = mapElement.querySelector(".leaflet-container");
        if (leafletContainer) {
          (leafletContainer as HTMLElement).style.backgroundColor = "transparent";
        }
      }

      // Fetch and attach Country GeoJSON for hover interactions
      fetch("https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson")
        .then(res => res.json())
        .then(data => {
          if (!mapRef.current) return;

          L.geoJSON(data, {
            style: {
              fillColor: "transparent",
              color: "transparent",
              weight: 1
            },
            onEachFeature: (feature, layer) => {
              const props = feature.properties || {};
              const countryName = props.name || props.ADMIN || props.NAME || "Unknown Region";

              // Generate stable pseudo-random data based on country name length
              const hash = (countryName as string).split('').reduce((sum: number, char: string) => sum + char.charCodeAt(0), 0);
              const pubs = 1000 + (hash * 15) + (hash % 100 * 50);
              const researchers = 500 + (hash * 8) + (hash % 50 * 20);
              const rank = (hash % 150) + 1;
              const globalIndex = Math.min(99.9, 50 + (hash % 50));

              const tooltipHtml = `
                <div style="padding: 6px; min-width: 170px;">
                  <div style="font-weight: 700; font-size: 13px; color: var(--sci-text); margin-bottom: 6px; border-bottom: 1px solid var(--sci-border); padding-bottom: 4px; display: flex; align-items: center; gap: 6px;">
                    <span style="font-size: 14px;">📍</span> ${countryName}
                  </div>
                  <div style="display: flex; flex-direction: column; gap: 4px; font-size: 11px;">
                    <div style="display: flex; justify-content: space-between;">
                      <span style="color: var(--sci-muted);">Global Rank:</span>
                      <span style="font-weight: 700; color: var(--sci-accent);">#${rank}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                      <span style="color: var(--sci-muted);">Impact Score:</span>
                      <span style="font-family: monospace; font-weight: 600; color: var(--sci-positive);">${globalIndex.toFixed(1)}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                      <span style="color: var(--sci-muted);">Researchers:</span>
                      <span style="font-family: monospace; font-weight: 500; color: var(--sci-text-2);">${researchers.toLocaleString()}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                      <span style="color: var(--sci-muted);">Annual Pubs:</span>
                      <span style="font-family: monospace; font-weight: 500; color: var(--sci-text-2);">${pubs.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              `;

              layer.bindTooltip(tooltipHtml, {
                className: "custom-map-tooltip",
                sticky: true,
                direction: "auto"
              });

              layer.on({
                mouseover: (e) => {
                  const l = e.target;
                  l.setStyle({
                    fillColor: "rgba(59, 130, 246, 0.15)",
                    color: "rgba(59, 130, 246, 0.4)",
                    weight: 1.5
                  });
                  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                    l.bringToFront();
                  }
                },
                mouseout: (e) => {
                  e.target.setStyle({
                    fillColor: "transparent",
                    color: "transparent",
                    weight: 1
                  });
                }
              });
            }
          }).addTo(mapRef.current);
        })
        .catch(err => console.error("Error loading GeoJSON outline", err));

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
          // Smaller sizes corresponding to lighter UI, base sizes: 8, 10, 12
          const baseSize = point.level === "high" ? 14 : point.level === "medium" ? 12 : 10;
          const size = isHovered ? baseSize * 1.5 : baseSize;

          // Create enhanced custom icon with better visual feedback
          const iconHtml = `
            <div style="
              width: ${size}px;
              height: ${size}px;
              background-color: ${colorObj.bg};
              border: 3px solid var(--sci-surface);
              border-radius: 50%;
              box-shadow: 
                0 0 0 2px ${colorObj.border},
                0 0 ${isHovered ? 20 : 10}px var(--sci-shadow-color, rgba(0, 0, 0, 0.4)),
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

          const tooltipHtml = `
            <div style="padding: 12px; min-width: 220px;">
              <div style="font-weight: 700; font-size: 13px; color: var(--sci-text); margin-bottom: 8px; display: flex; align-items: center; justify-content: space-between;">
                <span>${point.label}</span>
                <span style="font-size: 9px; padding: 2px 6px; background: ${colorObj.bg}; border-radius: 4px; color: white; border: 1px solid ${colorObj.border};">${colorObj.text}</span>
              </div>
              <div style="display: flex; flex-direction: column; gap: 4px; border-top: 1px solid var(--sci-border); padding-top: 8px;">
                <div style="font-size: 10px; font-weight: 700; color: var(--sci-danger); text-transform: uppercase; display: flex; align-items: center; gap: 4px;">
                  <span style="width: 6px; height: 6px; border-radius: 50%; background-color: var(--sci-danger); display: inline-block;"></span>
                  ONGOING EVENT
                </div>
                <div style="font-size: 11px; color: var(--sci-text-2); font-weight: 500; line-height: 1.4;">
                  ${point.activeEvent || 'Monitoring local research nodes...'}
                </div>
                <div style="font-size: 9px; color: var(--sci-muted); margin-top: 2px; font-family: monospace;">
                  ${point.eventTime || 'live recording'}
                </div>
              </div>
            </div>
          `;

          const marker = L.marker([lat, lng], { icon: customIcon })
            .bindTooltip(tooltipHtml, {
              className: "custom-map-tooltip",
              direction: "top",
              offset: L.point(0, -Math.round(size / 2) - 5),
              opacity: 1
            })
            .addTo(mapRef.current);

          // Add events to update state only (tooltip handles itself)
          marker.on("mouseover", () => {
            setHoveredPoint(point.id);
          });
          marker.on("mouseout", () => {
            setHoveredPoint(null);
          });
          marker.on("click", () => {
            // Can add focus or select behavior here if needed later
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
        style={{ width: "100%", height: "100%", backgroundColor: "transparent" }}
      />

      {/* Reset Control */}
      <div
        onClick={handleResetMap}
        title="Reset map to default view"
        style={{
          position: "absolute", top: "12px", right: "12px", zIndex: 1000,
          width: "36px", height: "36px", borderRadius: "8px",
          backgroundColor: "var(--sci-surface)", opacity: 0.95,
          border: "1px solid var(--sci-border)", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.15s ease", padding: 0, userSelect: "none",
          boxShadow: "var(--sci-shadow-sm)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.backgroundColor = "var(--sci-surface-2)";
          (e.currentTarget as HTMLDivElement).style.borderColor = "var(--sci-border-focus)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.backgroundColor = "var(--sci-surface)";
          (e.currentTarget as HTMLDivElement).style.borderColor = "var(--sci-border)";
        }}
      >
        <RotateCcw size={15} color="#94a3b8" />
      </div>

      {/* Zoom Controls */}
      <div
        style={{
          position: "absolute", top: "58px", right: "12px", zIndex: 1000,
          display: "flex", flexDirection: "column",
          backgroundColor: "var(--sci-surface)", opacity: 0.95,
          borderRadius: "8px",
          overflow: "hidden", border: "1px solid var(--sci-border)",
          boxShadow: "var(--sci-shadow-sm)",
        }}
      >
        <div
          onClick={handleZoomIn} title="Zoom in"
          style={{
            width: "36px", height: "36px", backgroundColor: "transparent",
            border: "none", cursor: "pointer", display: "flex",
            alignItems: "center", justifyContent: "center",
            fontSize: "20px", fontWeight: "600", color: "var(--sci-muted)",
            transition: "background 0.15s ease", padding: 0, userSelect: "none",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.backgroundColor = "var(--sci-surface-2)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.backgroundColor = "transparent"; }}
        >
          +
        </div>
        <div style={{ height: "1px", backgroundColor: "var(--sci-border)" }} />
        <div
          onClick={handleZoomOut} title="Zoom out"
          style={{
            width: "36px", height: "36px", backgroundColor: "transparent",
            border: "none", cursor: "pointer", display: "flex",
            alignItems: "center", justifyContent: "center",
            fontSize: "23px", fontWeight: "600", color: "var(--sci-muted)",
            transition: "background 0.15s ease", padding: 0, userSelect: "none",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.backgroundColor = "var(--sci-surface-2)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.backgroundColor = "transparent"; }}
        >
          −
        </div>
      </div>

      {/* ── Hub Counter (top-left) ── */}
      <div
        style={{
          position: "absolute", top: "12px", left: "12px", zIndex: 1000,
          background: "var(--sci-surface)", opacity: 0.95,
          border: "1px solid var(--sci-border)", borderRadius: "8px",
          padding: "6px 12px", boxShadow: "var(--sci-shadow-sm)",
          pointerEvents: "none",
        }}
      >
        <div style={{
          fontSize: "11px", fontWeight: "700", color: "var(--sci-text)",
          fontFamily: "'Inter', sans-serif", letterSpacing: "-0.01em",
        }}>
          🌐 Research Activity Map
        </div>
        <div style={{
          fontSize: "10px", color: "var(--sci-muted)",
          fontFamily: "'JetBrains Mono', monospace", marginTop: "2px",
        }}>
          {MAP_POINTS.length} hubs active
        </div>
      </div>

      {/* ── Legend (bottom-left) ── */}
      <div
        style={{
          position: "absolute", bottom: "32px", left: "12px", zIndex: 1000,
          background: "var(--sci-surface)", opacity: 0.95,
          border: "1px solid var(--sci-border)", borderRadius: "8px",
          padding: "10px 12px", boxShadow: "var(--sci-shadow-sm)",
          pointerEvents: "none",
        }}
      >
        <div style={{
          fontSize: "9px", fontWeight: "700", color: "var(--sci-muted)",
          textTransform: "uppercase", letterSpacing: "0.06em",
          marginBottom: "6px", fontFamily: "'Inter', sans-serif",
        }}>
          Research Activity
        </div>
        {[
          { color: "#e74c3c", label: "High Priority" },
          { color: "#ff9500", label: "Active Lab" },
          { color: "#2b8ac7", label: "Emerging Node" },
        ].map(({ color, label }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "5px" }}>
            <div style={{
              width: "10px", height: "10px", borderRadius: "50%",
              backgroundColor: color, border: "1px solid rgba(0,0,0,0.1)",
              boxShadow: `0 0 4px ${color}`, flexShrink: 0,
            }} />
            <span style={{
              fontSize: "10px", color: "var(--sci-text-2)",
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


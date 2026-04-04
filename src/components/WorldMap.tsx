import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MAP_POINTS } from "../data/dashboardData";
import { RotateCcw } from "lucide-react";
import { DEFAULT_MAP_STATE, WORLD_BOUNDS, type MapPoint, getMarkerColor } from "./mapUtils";
import { createCountryTooltip, createMarkerIconAndTooltip } from "./mapTemplates";

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
      if (mapRef.current) mapRef.current.remove();

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
        maxBoundsViscosity: 1.0,
        inertia: true,
        inertiaDeceleration: 3000,
      });

      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        attribution: '',
        maxZoom: 6,
        tileSize: 256,
        errorTileUrl: '',
      }).addTo(mapRef.current);

      const mapElement = containerRef.current;
      if (mapElement) {
        mapElement.style.backgroundColor = "transparent";
        const leafletContainer = mapElement.querySelector(".leaflet-container");
        if (leafletContainer) (leafletContainer as HTMLElement).style.backgroundColor = "transparent";
      }

      fetch("https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson")
        .then(res => res.json())
        .then(data => {
          if (!mapRef.current) return;
          L.geoJSON(data, {
            style: { fillColor: "transparent", color: "transparent", weight: 1 },
            onEachFeature: (feature, layer) => {
              const props = feature.properties || {};
              const countryName = props.name || props.ADMIN || props.NAME || "Unknown Region";
              const hash = countryName.split('').reduce((sum: number, char: string) => sum + char.charCodeAt(0), 0);
              const pubs = 1000 + (hash * 15) + (hash % 100 * 50);
              const researchers = 500 + (hash * 8) + (hash % 50 * 20);
              const rank = (hash % 150) + 1;
              const globalIndex = Math.min(99.9, 50 + (hash % 50));
              
              layer.bindTooltip(createCountryTooltip(countryName, rank, globalIndex, researchers, pubs), {
                className: "custom-map-tooltip", sticky: true, direction: "auto"
              });

              layer.on({
                mouseover: (e) => {
                  e.target.setStyle({ fillColor: "rgba(59, 130, 246, 0.15)", color: "rgba(59, 130, 246, 0.4)", weight: 1.5 });
                  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) e.target.bringToFront();
                },
                mouseout: (e) => e.target.setStyle({ fillColor: "transparent", color: "transparent", weight: 1 })
              });
            }
          }).addTo(mapRef.current);
        })
        .catch(err => console.error("Error loading GeoJSON outline", err));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to initialize map");
    }
    return () => { if (mapRef.current) mapRef.current.remove(); };
  }, []);

  useEffect(() => {
    try {
      if (!mapRef.current) return;
      markersRef.current.forEach(m => m.remove());
      markersRef.current = [];

      MAP_POINTS.forEach((point: MapPoint) => {
        try {
          const lng = (point.x / 100) * 360 - 180;
          const lat = 85 - (point.y / 100) * 170;
          const { customIcon, tooltipHtml, size } = createMarkerIconAndTooltip(point, hoveredPoint === point.id);

          const marker = L.marker([lat, lng], { icon: customIcon })
            .bindTooltip(tooltipHtml, {
              className: "custom-map-tooltip", direction: "top",
              offset: L.point(0, -Math.round(size / 2) - 5), opacity: 1
            })
            .addTo(mapRef.current!);

          marker.on("mouseover", () => setHoveredPoint(point.id));
          marker.on("mouseout", () => setHoveredPoint(null));
          markersRef.current.push(marker);
        } catch (err) { console.error("Error creating marker:", err); }
      });
    } catch (err) { setError(err instanceof Error ? err.message : "Error rendering markers"); }
  }, [hoveredPoint]);

  const handleResetMap = () => mapRef.current?.setView(DEFAULT_MAP_STATE.center, DEFAULT_MAP_STATE.zoom, { animate: true, duration: 0.5 });
  const handleZoomIn = () => mapRef.current?.zoomIn();
  const handleZoomOut = () => mapRef.current?.zoomOut();

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div ref={containerRef} style={{ width: "100%", height: "100%", backgroundColor: "transparent" }} />
      <div onClick={handleResetMap} title="Reset map" style={controlBtnStyle({ top: '12px', right: '12px' })} 
           onMouseEnter={e => Object.assign(e.currentTarget.style, hoverBtnStyle)} onMouseLeave={e => Object.assign(e.currentTarget.style, baseBtnStyle)}>
        <RotateCcw size={15} color="#94a3b8" />
      </div>
      <div style={zoomContainerStyle}>
        <div onClick={handleZoomIn} title="Zoom in" style={zoomBtnStyle} onMouseEnter={e => e.currentTarget.style.backgroundColor = "var(--sci-surface-2)"} onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}>+</div>
        <div style={{ height: "1px", backgroundColor: "var(--sci-border)" }} />
        <div onClick={handleZoomOut} title="Zoom out" style={zoomBtnStyle} onMouseEnter={e => e.currentTarget.style.backgroundColor = "var(--sci-surface-2)"} onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}>−</div>
      </div>
      <div style={infoBoxStyle({ top: '12px', left: '12px' })}>
        <div style={{ fontSize: "11px", fontWeight: "700", color: "var(--sci-text)", fontFamily: "'Inter', sans-serif" }}>🌐 Research Activity Map</div>
        <div style={{ fontSize: "10px", color: "var(--sci-muted)", fontFamily: "'JetBrains Mono', monospace", marginTop: "2px" }}>{MAP_POINTS.length} hubs active</div>
      </div>
      <div style={infoBoxStyle({ bottom: '32px', left: '12px' })}>
        <div style={{ fontSize: "9px", fontWeight: "700", color: "var(--sci-muted)", textTransform: "uppercase", marginBottom: "6px" }}>Research Activity</div>
        {[{ color: "#e74c3c", label: "High Priority" }, { color: "#ff9500", label: "Active Lab" }, { color: "#2b8ac7", label: "Emerging Node" }].map(({ color, label }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "5px" }}>
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: color, border: "1px solid rgba(0,0,0,0.1)", boxShadow: `0 0 4px ${color}` }} />
            <span style={{ fontSize: "10px", color: "var(--sci-text-2)", fontWeight: "500" }}>{label}</span>
          </div>
        ))}
      </div>
      {error && <div style={errorStyle}>{error}</div>}
    </div>
  );
}

const controlBtnStyle = (pos: any): React.CSSProperties => ({ position: "absolute", zIndex: 1000, width: "36px", height: "36px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s ease", cursor: "pointer", ...pos, ...baseBtnStyle });
const baseBtnStyle: React.CSSProperties = { backgroundColor: "var(--sci-surface)", opacity: 0.95, border: "1px solid var(--sci-border)", boxShadow: "var(--sci-shadow-sm)" };
const hoverBtnStyle: React.CSSProperties = { backgroundColor: "var(--sci-surface-2)", borderColor: "var(--sci-border-focus)" };
const zoomContainerStyle: React.CSSProperties = { position: "absolute", top: "58px", right: "12px", zIndex: 1000, display: "flex", flexDirection: "column", borderRadius: "8px", overflow: "hidden", ...baseBtnStyle };
const zoomBtnStyle: React.CSSProperties = { width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", fontWeight: "600", color: "var(--sci-muted)", transition: "background 0.15s ease", cursor: "pointer" };
const infoBoxStyle = (pos: any): React.CSSProperties => ({ position: "absolute", zIndex: 1000, borderRadius: "8px", padding: "10px 12px", pointerEvents: "none", ...pos, ...baseBtnStyle });
const errorStyle: React.CSSProperties = { position: "absolute", top: "165px", right: "12px", backgroundColor: "#fef2f2", border: "1px solid #fca5a5", borderRadius: "6px", padding: "12px", color: "#991b1b", fontSize: "13px", maxWidth: "250px", zIndex: 1000 };

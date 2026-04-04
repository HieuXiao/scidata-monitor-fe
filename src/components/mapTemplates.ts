import L from "leaflet";
import { type MapPoint, getMarkerColor } from "./mapUtils";

export function createCountryTooltip(countryName: string, rank: number, globalIndex: number, researchers: number, pubs: number) {
  return `
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
}

export function createMarkerIconAndTooltip(point: MapPoint, isHovered: boolean) {
  const colorObj = getMarkerColor(point.level);
  const baseSize = point.level === "high" ? 14 : point.level === "medium" ? 12 : 10;
  const size = isHovered ? baseSize * 1.5 : baseSize;

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

  return { customIcon, tooltipHtml, size };
}

import { Settings2 } from "lucide-react";
import { useState, type ChangeEvent } from "react";
import {
  MAP_POINTS,
  RESEARCH_FEED,
} from "../data/dashboardData";

export default function DashboardPage() {
  const [searchInput, setSearchInput] = useState("");
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const handleSortClick = (sortType: string) => {
    console.log("Sort by:", sortType);
  };

  const topFeedItems = RESEARCH_FEED.slice(0, 2);

  return (
    <main className="dashboard-main">
      <aside className="left-sidebar">
        <div className="sidebar-section">
          <div className="section-title">Nơi hiển thị: TOP 1 Scientific Research</div>
          <div className="search-filter-row">
            <input
              type="text"
              placeholder="Search: Theo tên đề tài"
              className="sidebar-search"
              value={searchInput}
              onChange={handleSearch}
            />
            <button className="filter-button">Filter</button>
          </div>
          <button 
            className="sort-box" 
            onClick={() => handleSortClick("time")}
            title="Sort by publication date"
          >
            Sort by time method
          </button>
          <button 
            className="sort-box" 
            onClick={() => handleSortClick("popular")}
            title="Sort by popularity/citations"
          >
            Sort by popular method
          </button>
        </div>

        <div className="feed-cards-container">
          {topFeedItems.map((item) => (
            <article key={item.id} className="sidebar-card">
              <div className="card-header">
                <strong>{item.title}</strong>
              </div>
              <p className="card-summary">{item.summary}</p>
              <div className="card-meta">
                <span className="meta-badge">{item.source}</span>
                <span className="meta-time">{item.published}</span>
              </div>
              <div className="card-tags">
                {item.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </article>
          ))}
          <div className="sidebar-empty-box">
            <div className="empty-placeholder">Bài viết liên quan</div>
          </div>
          <div className="sidebar-empty-box">
            <div className="empty-placeholder">Bài viết liên quan</div>
          </div>
        </div>
      </aside>

      <section className="map-section">
        <div className="map-container">
          <div className="map-placeholder-content">
            <svg className="world-map" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0a1628" />
                  <stop offset="100%" stopColor="#0f2942" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Ocean background */}
              <rect width="1200" height="600" fill="url(#oceanGrad)" />

              {/* Simplified continent shapes */}
              <g className="continents" fill="#1a3f5e" opacity="0.6">
                {/* North America */}
                <path d="M 80 120 L 130 100 L 150 140 L 140 180 L 90 160 Z" />
                {/* South America */}
                <path d="M 110 200 L 140 180 L 150 280 L 120 300 Z" />
                {/* Europe */}
                <path d="M 270 100 L 320 90 L 330 140 L 280 145 Z" />
                {/* Africa */}
                <path d="M 310 160 L 360 140 L 380 300 L 320 320 Z" />
                {/* Asia */}
                <path d="M 360 100 L 520 80 L 550 200 L 400 220 Z" />
                {/* Australia */}
                <path d="M 520 380 L 560 360 L 570 420 L 540 430 Z" />
              </g>

              {/* Map points with glow effect */}
              {MAP_POINTS.map((point) => {
                const isHovered = hoveredPoint === point.id;
                const size = point.level === "high" ? 12 : point.level === "medium" ? 8 : 6;
                const color = 
                  point.level === "high" 
                    ? "#00d4ff" 
                    : point.level === "medium" 
                    ? "#0095da" 
                    : "#00ff88";

                return (
                  <g
                    key={point.id}
                    onMouseEnter={() => setHoveredPoint(point.id)}
                    onMouseLeave={() => setHoveredPoint(null)}
                    style={{ cursor: "pointer" }}
                  >
                    {/* Glow circle */}
                    {isHovered && (
                      <circle
                        cx={`${point.x}%`}
                        cy={`${point.y}%`}
                        r={size * 2.5}
                        fill={color}
                        opacity="0.15"
                        className="point-glow"
                      />
                    )}
                    {/* Main point */}
                    <circle
                      cx={`${point.x}%`}
                      cy={`${point.y}%`}
                      r={size}
                      fill={color}
                      opacity={isHovered ? 1 : 0.8}
                      filter="url(#glow)"
                      className="map-point"
                    />
                    {/* Tooltip on hover */}
                    {isHovered && (
                      <text
                        x={`${point.x}%`}
                        y={`${point.y - 5}%`}
                        textAnchor="middle"
                        fill="#00d4ff"
                        fontSize="11"
                        fontWeight="600"
                        className="point-label"
                      >
                        {point.label}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>

            <div className="map-controls-top-right">
              <button className="setting-button-red" title="Map settings">
                <Settings2 size={18} />
              </button>
            </div>

            {/* Legend */}
            <div className="map-legend">
              <div className="legend-title">Evidence Intensity</div>
              <div className="legend-items">
                <div className="legend-item">
                  <span className="legend-dot" style={{ backgroundColor: "#00d4ff" }}></span>
                  High impact
                </div>
                <div className="legend-item">
                  <span className="legend-dot" style={{ backgroundColor: "#0095da" }}></span>
                  Active signal
                </div>
                <div className="legend-item">
                  <span className="legend-dot" style={{ backgroundColor: "#00ff88" }}></span>
                  Emerging node
                </div>
              </div>
            </div>

            {/* KPI Stack */}
            <div className="map-kpi-stack">
              <div className="kpi-item">
                <div className="kpi-label">Active Labs</div>
                <div className="kpi-value">324</div>
              </div>
              <div className="kpi-item">
                <div className="kpi-label">Linked Universities</div>
                <div className="kpi-value">128</div>
              </div>
              <div className="kpi-item">
                <div className="kpi-label">Priority Topics</div>
                <div className="kpi-value">17</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

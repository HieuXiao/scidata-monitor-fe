import { useState, type ChangeEvent } from "react";
import {
  RESEARCH_FEED,
  SIGNAL_ITEMS,
  getImpactLevel,
} from "../data/dashboardData";
import { WorldMap } from "../components/WorldMap";
import {
  Bookmark,
  Filter,
  RotateCcw,
  TrendingUp,
  TrendingDown,
  ExternalLink,
} from "lucide-react";

type DomainFilter = "All" | "Radiogenomics" | "Immunotherapy" | "Precision Medicine";
type TimeFilter = "24H" | "7D" | "30D";

export default function DashboardPage() {
  const [searchInput, setSearchInput] = useState("");
  const [selectedDomain, setSelectedDomain] = useState<DomainFilter>("All");
  const [selectedTime, setSelectedTime] = useState<TimeFilter>("24H");
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  const timeFilters: TimeFilter[] = ["24H", "7D", "30D"];

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const filteredFeed = RESEARCH_FEED.filter((item) => {
    const matchesDomain =
      selectedDomain === "All" || item.domain === selectedDomain;
    const matchesSearch =
      searchInput === "" ||
      item.title.toLowerCase().includes(searchInput.toLowerCase()) ||
      item.tags.some((tag) =>
        tag.toLowerCase().includes(searchInput.toLowerCase())
      ) ||
      item.institution.toLowerCase().includes(searchInput.toLowerCase());
    return matchesDomain && matchesSearch;
  });

  // Use first 4 signal items for KPI strip
  const kpiItems = SIGNAL_ITEMS.slice(0, 4);

  return (
    <div className="dashboard-wrapper">
      {/* ── KPI Metric Strip ── */}
      <div className="kpi-strip" role="region" aria-label="Research metrics">
        {kpiItems.map((item) => (
          <div key={item.id} className="kpi-item">
            <div className="kpi-top-row">
              <span className="kpi-value">{item.value}</span>
              <span className={`kpi-delta kpi-delta--${item.trend}`}>
                {item.trend === "up" ? (
                  <TrendingUp size={10} />
                ) : (
                  <TrendingDown size={10} />
                )}
                {item.change}
              </span>
            </div>
            <span className="kpi-label">{item.label}</span>
          </div>
        ))}
        <div className="kpi-updated">
          <span>Live feed</span>
          <span className="kpi-time">● 2 min ago</span>
        </div>
      </div>

      {/* ── Main Grid ── */}
      <main className="dashboard-main">
        {/* Left Sidebar */}
        <aside className="left-sidebar">
          {/* Search + Filter Controls */}
          <div className="research-controls">
            <div className="search-filter-row">
              <input
                type="text"
                placeholder="Search papers, authors..."
                className="sidebar-search"
                value={searchInput}
                onChange={handleSearch}
                aria-label="Search research papers"
              />
              <button
                className={`filter-icon-button ${showFilterPanel ? "active" : ""}`}
                title="Advanced filters"
                onClick={() => setShowFilterPanel(!showFilterPanel)}
                aria-expanded={showFilterPanel}
                aria-label="Toggle filter panel"
              >
                <Filter size={14} />
              </button>
            </div>

            {/* Filter Panel */}
            {showFilterPanel && (
              <div className="filter-panel">
                <div className="filter-panel-header">
                  <h3>Advanced Filters</h3>
                </div>
                <div className="filter-panel-content">
                  <div className="filter-section">
                    <label htmlFor="domain-filter" className="filter-label">
                      Domain
                    </label>
                    <select
                      id="domain-filter"
                      value={selectedDomain}
                      onChange={(e) =>
                        setSelectedDomain(e.target.value as DomainFilter)
                      }
                      className="filter-select"
                    >
                      <option value="All">All Domains</option>
                      <option value="Radiogenomics">Radiogenomics</option>
                      <option value="Immunotherapy">Immunotherapy</option>
                      <option value="Precision Medicine">
                        Precision Medicine
                      </option>
                    </select>
                  </div>

                  <div className="filter-section">
                    <label className="filter-label">Time Window</label>
                    <div className="filter-time-buttons">
                      {timeFilters.map((time) => (
                        <button
                          key={time}
                          className={`filter-time-btn ${
                            selectedTime === time ? "active" : ""
                          }`}
                          onClick={() => setSelectedTime(time)}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="filter-actions">
                    <button
                      className="filter-btn-reset"
                      onClick={() => {
                        setSelectedDomain("All");
                        setSelectedTime("24H");
                        setSearchInput("");
                      }}
                      title="Reset all filters"
                      aria-label="Reset filters"
                    >
                      <RotateCcw size={13} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Research Feed */}
          <div className="feed-cards-container">
            {filteredFeed.map((item) => {
              const impact = getImpactLevel(item);
              return (
                <article
                  key={item.id}
                  className="research-card"
                  role="article"
                  tabIndex={0}
                >
                  {/* Row 1: Meta + Bookmark */}
                  <div className="card-header-row">
                    <div className="card-metadata">
                      <span className="source-label">{item.source}</span>
                      <span className="metadata-sep">·</span>
                      <span className="author-label">{item.primaryAuthor}</span>
                      <span className="metadata-sep">·</span>
                      <span className="time-label">{item.published}</span>
                    </div>
                    <button
                      className="bookmark-btn"
                      title="Bookmark this paper"
                      aria-label="Bookmark"
                    >
                      <Bookmark size={13} />
                    </button>
                  </div>

                  {/* Row 2: Title */}
                  <h3 className="card-title">{item.title}</h3>

                  {/* Row 3: Institution + Region */}
                  <div className="card-institution-row">
                    <span className="card-institution">{item.institution}</span>
                    <span className="card-region">🌐 {item.region}</span>
                  </div>

                  {/* Row 4: Tags */}
                  <div className="card-tags">
                    {item.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="tag-pill">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Row 5: Impact + Citations + DOI */}
                  <div className="card-impact-row">
                    <span className={`impact-badge impact-badge--${impact}`}>
                      {impact === "high"
                        ? "▲"
                        : impact === "medium"
                          ? "●"
                          : "▽"}{" "}
                      {impact.toUpperCase()}
                    </span>
                    <span className="card-citations">
                      {item.citations} citations
                    </span>
                    {item.doi && (
                      <a
                        href={`https://doi.org/${item.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="doi-link"
                        onClick={(e) => e.stopPropagation()}
                        title={`DOI: ${item.doi}`}
                      >
                        <ExternalLink size={10} />
                        DOI
                      </a>
                    )}
                  </div>

                  {/* Row 6: Metric Bars */}
                  <div className="metric-bars">
                    <div className="metric-row">
                      <span className="metric-label-sm">Citation</span>
                      <div className="metric-bar-track">
                        <div
                          className="metric-bar-fill"
                          style={{ width: `${item.citationVelocity}%` }}
                        />
                      </div>
                      <span className="metric-value-sm">
                        {item.citationVelocity}
                      </span>
                    </div>
                    <div className="metric-row">
                      <span className="metric-label-sm">Clinical</span>
                      <div className="metric-bar-track">
                        <div
                          className="metric-bar-fill metric-bar-fill--clinical"
                          style={{ width: `${item.clinicalRelevance}%` }}
                        />
                      </div>
                      <span className="metric-value-sm">
                        {item.clinicalRelevance}
                      </span>
                    </div>
                    <div className="metric-row">
                      <span className="metric-label-sm">Replication</span>
                      <div className="metric-bar-track">
                        <div
                          className="metric-bar-fill metric-bar-fill--replication"
                          style={{ width: `${item.replicationScore}%` }}
                        />
                      </div>
                      <span className="metric-value-sm">
                        {item.replicationScore}
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </aside>

        {/* Map Section */}
        <section
          className="map-section"
          aria-label="Global research activity map"
        >
          <WorldMap />
        </section>
      </main>
    </div>
  );
}

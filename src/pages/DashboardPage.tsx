import { useState, type ChangeEvent } from "react";
import { RESEARCH_FEED } from "../data/dashboardData";
import { WorldMap } from "../components/WorldMap";
import { Bookmark, Filter, RotateCcw } from "lucide-react";

type DomainFilter = "All" | "Radiogenomics" | "Immunotherapy" | "Precision Medicine";
type TimeFilter = "24H" | "7D" | "30D";

export default function DashboardPage() {
  const [searchInput, setSearchInput] = useState("");
  const [selectedDomain, setSelectedDomain] = useState<DomainFilter>("All");
  const [selectedTime, setSelectedTime] = useState<TimeFilter>("24H");
  const [_selectedCard, _setSelectedCard] = useState<string | null>(null); // TODO: Used for modal/detail view
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  const timeFilters: TimeFilter[] = ["24H", "7D", "30D"];

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const handleFilterButtonClick = () => {
    setShowFilterPanel(!showFilterPanel);
  };

  const handleCardClick = (cardId: string) => {
    _setSelectedCard(cardId);
    // TODO: Implement modal/detail panel opening
    console.log("Opening detail view for:", cardId);
  };

  const handleActionClick = (e: React.MouseEvent, actionType: string, cardId: string) => {
    e.stopPropagation();
    console.log(`${actionType} clicked for card:`, cardId);
    // TODO: Implement action handlers
  };

  const filteredFeed = RESEARCH_FEED.filter((item) => {
    const matchesDomain = selectedDomain === "All" || item.domain === selectedDomain;
    const matchesSearch =
      searchInput === "" ||
      item.title.toLowerCase().includes(searchInput.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchInput.toLowerCase())) ||
      item.institution.toLowerCase().includes(searchInput.toLowerCase());
    return matchesDomain && matchesSearch;
  });

  return (
    <main className="dashboard-main">
      <aside className="left-sidebar">
        {/* Compact Controls Section */}
        <div className="research-controls">
          {/* Search Bar */}
          <div className="search-filter-row">
            <input
              type="text"
              placeholder="Search research, authors, institutions..."
              className="sidebar-search"
              value={searchInput}
              onChange={handleSearch}
              aria-label="Search research papers"
            />
            <button
              className={`filter-icon-button ${showFilterPanel ? "active" : ""}`}
              title="Advanced filters"
              onClick={handleFilterButtonClick}
              aria-expanded={showFilterPanel}
              aria-label="Toggle filter panel"
            >
              <Filter size={18} />
            </button>
          </div>

          {/* Filter Panel */}
          {showFilterPanel && (
            <div className="filter-panel">
              <div className="filter-panel-header">
                <h3>Advanced Filters</h3>
              </div>

              <div className="filter-panel-content">
                {/* Domain Filter Section */}
                <div className="filter-section">
                  <label htmlFor="domain-filter" className="filter-label">
                    Research Domain
                  </label>
                  <select
                    id="domain-filter"
                    value={selectedDomain}
                    onChange={(e) => setSelectedDomain(e.target.value as DomainFilter)}
                    className="filter-select"
                  >
                    <option value="All">All Domains</option>
                    <option value="Radiogenomics">Radiogenomics</option>
                    <option value="Immunotherapy">Immunotherapy</option>
                    <option value="Precision Medicine">Precision Medicine</option>
                  </select>
                </div>

                {/* Time Window Filter Section */}
                <div className="filter-section">
                  <label className="filter-label">Time Window</label>
                  <div className="filter-time-buttons">
                    {timeFilters.map((time) => (
                      <button
                        key={time}
                        className={`filter-time-btn ${selectedTime === time ? "active" : ""}`}
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
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
                    <RotateCcw size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Research Feed Cards List */}
        <div className="feed-cards-container">
          {filteredFeed.map((item) => (
            <article
              key={item.id}
              className="research-card"
              onClick={() => handleCardClick(item.id)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleCardClick(item.id);
                }
              }}
            >
              {/* Card Header: Metadata + Bookmark Button */}
              <div className="card-header-row">
                <div className="card-metadata">
                  <span className="source-label">{item.source}</span>
                  <span className="metadata-sep">•</span>
                  <span className="author-label">{item.primaryAuthor}</span>
                  <span className="metadata-sep">•</span>
                  <span className="time-label">{item.published}</span>
                </div>
                <button
                  className="bookmark-btn"
                  onClick={(e) => handleActionClick(e, "bookmark", item.id)}
                  title="Bookmark this paper"
                  aria-label="Bookmark"
                >
                  <Bookmark size={16} />
                </button>
              </div>

              {/* Row 2: Title */}
              <h3 className="card-title">{item.title}</h3>

              {/* Row 3: Tags */}
              <div className="card-tags">
                {item.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="tag-pill">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </aside>

      <section className="map-section">
        <WorldMap />
      </section>
    </main>
  );
}

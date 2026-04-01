import { useState, type ChangeEvent } from "react";
import {
  MAP_POINTS,
  RESEARCH_FEED,
} from "../data/dashboardData";
import { WorldMap } from "../components/WorldMap";

export default function DashboardPage() {
  const [searchInput, setSearchInput] = useState("");

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
        <WorldMap />
      </section>
    </main>
  );
}

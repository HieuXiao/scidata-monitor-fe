import {
  Activity,
  BarChart3,
  Building2,
  ChevronDown,
  Filter,
  Globe2,
  MapPinned,
  Search,
  Settings2,
  SlidersHorizontal,
  Sparkles,
  Users,
} from "lucide-react";
import { startTransition, useDeferredValue, useState, type ChangeEvent } from "react";
import {
  MAP_POINTS,
  MAX_VISIBLE_FEED_CARDS,
  RESEARCH_FEED,
  ROLE_OPTIONS,
  SORT_OPTIONS,
  SOURCE_OPTIONS,
  WINDOW_OPTIONS,
  getImpactLevel,
  getSortValue,
} from "../data/dashboardData";
import type { Audience, SortMethod, SourceFilter, TimeWindow } from "../types/dashboard";

export default function DashboardPage() {
  const [activeSource, setActiveSource] = useState<SourceFilter>("All");
  const [activeWindow, setActiveWindow] = useState<TimeWindow>("24H");
  const [activeRole, setActiveRole] = useState<Audience>("Researcher");
  const [sortMethod, setSortMethod] = useState<SortMethod>("Citation Velocity");
  const [searchInput, setSearchInput] = useState("");
  const [searchText, setSearchText] = useState("");

  const deferredSearchText = useDeferredValue(searchText);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchInput(value);
    startTransition(() => {
      setSearchText(value);
    });
  };

  const normalizedSearch = deferredSearchText.trim().toLowerCase();

  const filteredFeed = [...RESEARCH_FEED]
    .filter((item) => {
      const sourceMatch = activeSource === "All" || item.source === activeSource;
      const windowMatch = item.windows.includes(activeWindow);
      const audienceMatch = item.audience.includes(activeRole);
      const searchTarget = `${item.title} ${item.summary} ${item.tags.join(" ")} ${
        item.institution
      } ${item.region}`.toLowerCase();
      const searchMatch = !normalizedSearch || searchTarget.includes(normalizedSearch);
      return sourceMatch && windowMatch && audienceMatch && searchMatch;
    })
    .sort((a, b) => getSortValue(b, sortMethod) - getSortValue(a, sortMethod));

  const visibleFeed = filteredFeed.slice(0, MAX_VISIBLE_FEED_CARDS);

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
            />
            <button className="filter-button">Filter</button>
          </div>
          <div className="sort-box">Sort by time method</div>
          <div className="sort-box">Sort by popular method</div>
        </div>

        <div className="feed-cards-container">
          <article className="sidebar-card">
            Các card về tin tức / bài báo / cuộc thi / sự kiện liên quan đến nghiên cứu khoa học
          </article>
          <article className="sidebar-card">
            Các card về tin tức / bài báo / cuộc thi / sự kiện liên quan đến nghiên cứu khoa học
          </article>
          <div className="sidebar-empty-box"></div>
          <div className="sidebar-empty-box"></div>
        </div>
      </aside>

      <section className="map-section">
        <div className="map-container">
          <img
            src="https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json"
            alt="Map design background placeholder"
            className="map-bg"
            style={{ display: "none" }}
          />
          {/* Placeholder for the world map shown in Figma */}
          <div className="map-placeholder-content">
            <div className="figma-map-elements">
              {/* This represents the world map with blue dots from the image */}
              <div className="map-controls-top-right">
                <div className="setting-button-red">setting button</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

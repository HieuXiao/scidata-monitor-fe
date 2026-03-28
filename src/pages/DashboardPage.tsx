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
      <section className="intel-panel fade-up">
        <header className="intel-header">
          <div className="intel-title-row">
            <Search size={18} />
            <h2>Intel Brief</h2>
            <span className="intel-date">MAR 26</span>
          </div>
          <p className="intel-subtitle">
            Top scientific signals for researchers, students, and professors.
          </p>
        </header>

        <div className="source-tabs">
          {SOURCE_OPTIONS.map((source) => (
            <button
              key={source}
              type="button"
              className={
                source === activeSource
                  ? "chip-button chip-button--active"
                  : "chip-button"
              }
              onClick={() => setActiveSource(source)}
            >
              {source}
            </button>
          ))}
        </div>

        <div className="window-row">
          <div className="time-tabs">
            {WINDOW_OPTIONS.map((window) => (
              <button
                key={window}
                type="button"
                className={
                  window === activeWindow
                    ? "chip-button chip-button--active"
                    : "chip-button"
                }
                onClick={() => setActiveWindow(window)}
              >
                {window}
              </button>
            ))}
          </div>

          <label className="intel-search">
            <Search size={15} />
            <input
              type="search"
              value={searchInput}
              onChange={handleSearch}
              placeholder="Search topic, method, institution"
              aria-label="Search intel feed"
            />
          </label>
        </div>

        <section className="control-panel" aria-label="Research filters">
          <div className="control-block">
            <p className="control-label">
              <Users size={14} />
              Audience Focus
            </p>
            <div className="control-chip-row">
              {ROLE_OPTIONS.map((role) => (
                <button
                  key={role}
                  type="button"
                  className={
                    role === activeRole
                      ? "chip-button chip-button--active"
                      : "chip-button"
                  }
                  onClick={() => setActiveRole(role)}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          <div className="control-block">
            <p className="control-label">
              <SlidersHorizontal size={14} />
              Sort Method
            </p>
            <div className="control-chip-row">
              {SORT_OPTIONS.map((method) => (
                <button
                  key={method}
                  type="button"
                  className={
                    method === sortMethod
                      ? "chip-button chip-button--active"
                      : "chip-button"
                  }
                  onClick={() => setSortMethod(method)}
                >
                  {method}
                </button>
              ))}
            </div>
          </div>

          <div className="control-block">
            <p className="control-label">
              <Filter size={14} />
              Functional Filters
            </p>
            <div className="feature-tags">
              <span>Clinical Impact</span>
              <span>Imaging Biomarkers</span>
              <span>Reproducible Pipeline</span>
            </div>
          </div>
        </section>

        <div className="feed-list feed-list--compact">
          {visibleFeed.length > 0 ? (
            visibleFeed.map((item, index) => (
              <article
                key={item.id}
                className={`feed-card feed-card--${getImpactLevel(item)} fade-up`}
                style={{ animationDelay: `${165 + index * 45}ms` }}
              >
                <div className="feed-meta">
                  <span className="feed-source">{item.source}</span>
                  <span>{item.published}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>

                <div className="feed-score-row">
                  <span>
                    <BarChart3 size={13} />
                    CV {item.citationVelocity}
                  </span>
                  <span>
                    <Activity size={13} />
                    CR {item.clinicalRelevance}
                  </span>
                  <span>
                    <Sparkles size={13} />
                    RS {item.replicationScore}
                  </span>
                </div>

                <div className="feed-tags">
                  {item.tags.slice(0, 3).map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>

                <div className="feed-context">
                  <span>
                    <Building2 size={13} />
                    {item.institution}
                  </span>
                  <span>
                    <MapPinned size={13} />
                    {item.region}
                  </span>
                </div>
              </article>
            ))
          ) : (
            <div className="feed-empty">
              <p>No result matched your current filter set.</p>
              <p>Try switching time range, source, or audience role.</p>
            </div>
          )}
        </div>

        <footer className="intel-footer">
          Showing {visibleFeed.length}/{filteredFeed.length} cards for {activeWindow} window
        </footer>
      </section>

      <section className="atlas-panel fade-up" style={{ animationDelay: "120ms" }}>
        <header className="atlas-header">
          <div className="atlas-title">
            <Globe2 size={18} />
            <div>
              <h2>Global Research Atlas</h2>
              <p>Live network view of high-signal radiogenomics activity.</p>
            </div>
          </div>

          <div className="atlas-controls">
            <button type="button" className="flat-control">
              <Settings2 size={14} />
              Settings
            </button>
            <button type="button" className="flat-control">
              <ChevronDown size={14} />
              Global
            </button>
          </div>
        </header>

        <div className="atlas-map">
          <svg
            className="atlas-svg"
            viewBox="0 0 1000 520"
            role="img"
            aria-label="World map with research activity hotspots"
          >
            <defs>
              <linearGradient id="oceanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#071a34" />
                <stop offset="60%" stopColor="#082246" />
                <stop offset="100%" stopColor="#0a2a55" />
              </linearGradient>
            </defs>

            <rect x="0" y="0" width="1000" height="520" className="ocean" />

            <g className="continent-layer">
              <path d="M75 124 L129 85 L197 78 L236 102 L241 134 L216 164 L184 183 L136 171 L100 154 Z" />
              <path d="M223 227 L256 248 L279 287 L296 356 L274 401 L241 366 L230 311 Z" />
              <path d="M273 59 L302 49 L341 57 L333 85 L292 92 Z" />
              <path d="M426 111 L487 89 L563 98 L619 123 L682 122 L768 141 L816 178 L806 209 L744 214 L712 198 L652 206 L614 189 L574 185 L534 203 L486 191 L454 171 L427 149 Z" />
              <path d="M512 210 L553 228 L579 266 L567 343 L534 378 L501 355 L489 292 Z" />
              <path d="M781 327 L835 346 L861 379 L828 399 L771 384 L758 349 Z" />
              <path d="M18 469 L188 441 L368 451 L546 446 L724 454 L901 445 L982 470 L982 520 L18 520 Z" />
            </g>

            <g className="flow-layer">
              <path d="M193 166 C321 126 424 116 524 146" />
              <path d="M526 148 C621 160 716 178 809 212" />
              <path d="M538 224 C490 268 412 293 343 320" />
              <path d="M604 252 C690 281 738 315 815 356" />
              <path d="M513 205 C520 262 525 305 544 349" />
            </g>
          </svg>

          <div className="map-point-layer">
            {MAP_POINTS.map((point, index) => (
              <button
                key={point.id}
                type="button"
                className={`map-point map-point--${point.level}`}
                style={{
                  left: `${point.x}%`,
                  top: `${point.y}%`,
                  animationDelay: `${index * 110}ms`,
                }}
                title={point.label}
                aria-label={point.label}
              />
            ))}
          </div>

          <div className="map-kpi-stack">
            <article>
              <span>Active Labs</span>
              <strong>324</strong>
            </article>
            <article>
              <span>Linked Universities</span>
              <strong>128</strong>
            </article>
            <article>
              <span>Priority Topics</span>
              <strong>17</strong>
            </article>
          </div>

          <aside className="map-legend">
            <p>Evidence Intensity</p>
            <div>
              <span className="legend-dot legend-dot--high" />
              High impact
            </div>
            <div>
              <span className="legend-dot legend-dot--medium" />
              Active signal
            </div>
            <div>
              <span className="legend-dot legend-dot--low" />
              Emerging node
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

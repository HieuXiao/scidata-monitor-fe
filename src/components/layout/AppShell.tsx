import { LogIn, Moon, Settings, Sun, Search } from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Footer } from "./Footer";

const NAV_LINKS = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/trends", label: "Trends" },
  { to: "/topics", label: "Topics" },
  { to: "/network", label: "Network" },
  { to: "/institutions", label: "Institutions" },
];

interface SearchResult {
  id: string;
  title: string;
  category: string;
}

const MOCK_SEARCH: SearchResult[] = [
  { id: "1", title: "Harvard University", category: "University" },
  { id: "2", title: "MIT", category: "University" },
  { id: "3", title: "Stanford University", category: "University" },
  { id: "4", title: "Max Planck Institute", category: "Research Institute" },
  { id: "5", title: "RIKEN", category: "Research Institute" },
  { id: "6", title: "United States", category: "Country" },
  { id: "7", title: "Germany", category: "Country" },
  { id: "8", title: "Japan", category: "Country" },
  { id: "9", title: "Radiogenomics", category: "Research Domain" },
  { id: "10", title: "MGMT Methylation", category: "Research Topic" },
];

export function AppShell() {
  const navigate = useNavigate();

  // ── Dark mode ─────────────────────────────────────
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("sci-theme") === "dark";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("sci-theme", isDark ? "dark" : "light");
  }, [isDark]);

  // ── Search ────────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const filtered = MOCK_SEARCH.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };

  const handleResultClick = (result: SearchResult) => {
    setSearchQuery(result.title);
    setShowResults(false);
  };

  return (
    <div className="monitor-shell">
      {/* ── Header ─── */}
      <header className="monitor-topbar">
        {/* Brand */}
        <div className="brand-block" onClick={() => navigate("/dashboard")} style={{ cursor: "pointer" }}>
          <img src="/favicon.ico" alt="SciData Monitor logo" className="brand-mark" />
          <p className="brand-name">SciData Monitor</p>
        </div>

        {/* Navigation Tabs */}
        <nav className="topbar-nav" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `topbar-nav-link${isActive ? " active" : ""}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Search Bar */}
        <div className="global-search-wrapper">
          <div className="global-search">
            <Search size={15} className="search-icon" />
            <input
              type="search"
              placeholder="Search papers, authors, institutions..."
              aria-label="Search research papers, authors, institutions"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => searchQuery && setShowResults(true)}
              onBlur={() => setTimeout(() => setShowResults(false), 150)}
            />
            <button
              type="button"
              className="search-button"
              onClick={() => handleSearch(searchQuery)}
            >
              Search
            </button>
          </div>
          {showResults && searchResults.length > 0 && (
            <div className="search-results" role="listbox">
              {searchResults.map((result) => (
                <div
                  key={result.id}
                  className="search-result-item"
                  role="option"
                  onClick={() => handleResultClick(result)}
                >
                  <div className="result-title">{result.title}</div>
                  <div className="result-category">{result.category}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Header Actions */}
        <div className="header-actions">
          {/* Dark mode toggle */}
          <button
            type="button"
            className="icon-button"
            onClick={() => setIsDark((d) => !d)}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          <button
            type="button"
            className="icon-button"
            title="Settings"
            aria-label="Settings"
          >
            <Settings size={17} />
          </button>

          <button
            type="button"
            className="icon-button"
            title="Sign in"
            aria-label="Sign in"
          >
            <LogIn size={17} />
          </button>
        </div>
      </header>

      {/* ── Main Content ─── */}
      <div className="workspace-stage">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}

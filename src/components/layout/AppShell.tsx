import { LogIn, Search, Settings } from "lucide-react";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Footer } from "./Footer";

interface NewsItem {
  id: string;
  icon: string;
  title: string;
  category: string;
}

interface SearchResult {
  id: string;
  title: string;
  category: string;
}

export function AppShell() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([
    {
      id: "1",
      icon: "📰",
      title: "Khám phá mới trong vật lý lượng tử",
      category: "Physics",
    },
    {
      id: "2",
      icon: "🔬",
      title: "Tiến bộ AI trong y học chẩn đoán",
      category: "AI",
    },
    {
      id: "3",
      icon: "🧬",
      title: "Nghiên cứu mới về sinh học phân tử",
      category: "Biology",
    },
    {
      id: "4",
      icon: "💻",
      title: "Công nghệ blockchain mới nhất",
      category: "Tech",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  // Mock search data
  const mockSearchData: SearchResult[] = [
    { id: "1", title: "Harvard University", category: "Đại học" },
    { id: "2", title: "MIT", category: "Đại học" },
    { id: "3", title: "Stanford University", category: "Đại học" },
    { id: "4", title: "Viện Cơ chế ĐNA", category: "Viện nghiên cứu" },
    { id: "5", title: "Max Planck Institute", category: "Viện nghiên cứu" },
    { id: "6", title: "Hoa Kỳ", category: "Đất nước" },
    { id: "7", title: "Đức", category: "Đất nước" },
    { id: "8", title: "Nhật Bản", category: "Đất nước" },
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const filtered = mockSearchData.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };

  const handleSearchResultClick = (result: SearchResult) => {
    setSearchQuery(result.title);
    setShowSearchResults(false);
    setSearchResults([]);
  };

  const handleDragStart = (id: string) => {
    setDraggedItem(id);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (targetId: string) => {
    if (!draggedItem || draggedItem === targetId) return;

    const draggedIndex = newsItems.findIndex((item) => item.id === draggedItem);
    const targetIndex = newsItems.findIndex((item) => item.id === targetId);

    const newItems = [...newsItems];
    const [removed] = newItems.splice(draggedIndex, 1);
    newItems.splice(targetIndex, 0, removed);

    setNewsItems(newItems);
    setDraggedItem(null);
  };

  return (
    <div className="monitor-shell">
      <header className="monitor-topbar fade-up">
        <div className="brand-block">
          <img 
            src="/favicon.ico" 
            alt="SciData Monitor Logo" 
            className="brand-mark"
          />
          <div className="brand-copy">
            <p className="brand-name">SciData Monitor</p>
          </div>
        </div>

        <div className="global-search-wrapper">
          <div className="global-search">
            <Search size={18} className="search-icon" />
            <input
              type="search"
              placeholder="Search: Theo Đất nước / Đại học / Viện nghiên cứu"
              aria-label="Search by country, university, institute"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => searchQuery && setShowSearchResults(true)}
            />
            <button 
              type="button" 
              className="search-button"
              onClick={() => handleSearch(searchQuery)}
            >
              Search
            </button>
          </div>
          {showSearchResults && searchResults.length > 0 && (
            <div className="search-results">
              {searchResults.map((result) => (
                <div
                  key={result.id}
                  className="search-result-item"
                  onClick={() => handleSearchResultClick(result)}
                >
                  <div className="result-title">{result.title}</div>
                  <div className="result-category">{result.category}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="header-actions">
          <button type="button" className="flat-control">
            PRO
          </button>
          <button type="button" className="flat-control">
            Helps ?
          </button>
          <button type="button" className="flat-control">
            Feedback
          </button>
          <button 
            type="button" 
            className="icon-button settings-button"
            title="Settings"
          >
            <Settings size={18} />
          </button>
          <button 
            type="button" 
            className="icon-button login-button"
            title="Login"
          >
            <LogIn size={18} />
          </button>
        </div>
      </header>

      <section className="news-ticker fade-up" aria-label="News ticker">
        <div className="ticker-label">News Ticker</div>
        <div className="ticker-content">
          {newsItems.map((item) => (
            <div
              key={item.id}
              className={`ticker-item ${draggedItem === item.id ? "dragging" : ""}`}
              draggable
              onDragStart={() => handleDragStart(item.id)}
              onDragEnd={handleDragEnd}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(item.id)}
            >
              <div className="ticker-icon">{item.icon}</div>
              <div className="ticker-text">{item.title}</div>
            </div>
          ))}
          {newsItems.map((item) => (
            <div
              key={`${item.id}-clone`}
              className="ticker-item ticker-item-clone"
              draggable={false}
            >
              <div className="ticker-icon">{item.icon}</div>
              <div className="ticker-text">{item.title}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="workspace-stage">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}

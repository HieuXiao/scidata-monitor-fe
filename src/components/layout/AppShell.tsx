import {
  CalendarDays,
  CircleHelp,
  Globe2,
  LayoutGrid,
  LogIn,
  MessageSquare,
  Search,
  Tv,
} from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import { NAV_ITEMS, PULSE_ITEMS, SIGNAL_ITEMS } from "../../data/dashboardData";

export function AppShell() {
  return (
    <div className="monitor-shell">
      <header className="monitor-topbar fade-up">
        <div className="brand-block">
          <div className="brand-mark" aria-hidden="true">
            ICON
          </div>
          <div className="brand-copy">
            <p className="brand-name">WEB NAME</p>
          </div>
        </div>

        <label className="global-search">
          <input
            type="search"
            placeholder="Search: Theo Đất nước / Đại học / Viện nghiên cứu"
            aria-label="Search by country, university, institute"
          />
        </label>

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
          <button type="button" className="flat-control settings-button">
            <span className="setting-dot">setting button</span>
          </button>
          <button type="button" className="flat-control login-button">
            LOGIN <LogIn size={14} />
          </button>
        </div>
      </header>

      <section className="news-ticker fade-up" aria-label="News ticker">
        <div className="ticker-label">News Ticker</div>
        <div className="ticker-content">
          <div className="ticker-item">
            <div className="ticker-icon">ICON</div>
            <div className="ticker-text">SHORT CONTENT</div>
          </div>
        </div>
        <div className="ticker-box"></div>
        <div className="ticker-box"></div>
        <div className="ticker-box"></div>
      </section>

      <div className="workspace-stage">
        <Outlet />
      </div>
    </div>
  );
}

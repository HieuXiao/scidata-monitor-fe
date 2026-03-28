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
            <Globe2 size={17} />
          </div>
          <div className="brand-copy">
            <p className="brand-name">SCI DATA MONITOR</p>
            <p className="brand-subtitle">Radiogenomics Intelligence</p>
          </div>
          <span className="brand-beta">BETA</span>
        </div>

        <label className="global-search">
          <Search size={16} />
          <input
            type="search"
            placeholder="Search: Country / University / Institute / Topic"
            aria-label="Search by country, university, institute, or topic"
          />
        </label>

        <div className="header-actions">
          <button type="button" className="flat-control">
            <Tv size={14} />
            LIVE TV
          </button>
          <button type="button" className="flat-control">
            <CalendarDays size={14} />
            CAL
          </button>
          <button type="button" className="flat-control">
            <LayoutGrid size={14} />
            PRO
          </button>
          <button type="button" className="flat-control">
            <CircleHelp size={14} />
            Help
          </button>
          <button type="button" className="flat-control">
            <MessageSquare size={14} />
            Feedback
          </button>
          <button type="button" className="flat-control flat-control--strong">
            <LogIn size={14} />
            Login
          </button>
        </div>
      </header>

      <section className="signal-strip" aria-label="Top research signals">
        {SIGNAL_ITEMS.map((signal, index) => (
          <article
            key={signal.id}
            className="signal-card fade-up"
            style={{ animationDelay: `${70 + index * 45}ms` }}
          >
            <p className="signal-label">{signal.label}</p>
            <div className="signal-metric">
              <strong>{signal.value}</strong>
              <span
                className={
                  signal.trend === "up" ? "trend trend--up" : "trend trend--down"
                }
              >
                {signal.change}
              </span>
            </div>
          </article>
        ))}
      </section>

      <section className="pulse-strip" aria-label="Research pulse cards">
        {PULSE_ITEMS.map((pulse, index) => (
          <article
            key={pulse.id}
            className="pulse-card fade-up"
            style={{ animationDelay: `${110 + index * 55}ms` }}
          >
            <p className="pulse-topic">{pulse.topic}</p>
            <div className="pulse-indicator">
              <span
                className={
                  pulse.trend === "up"
                    ? "pulse-value pulse-value--up"
                    : "pulse-value pulse-value--down"
                }
              >
                {pulse.confidence}%
              </span>
              <span
                className={
                  pulse.trend === "up"
                    ? "pulse-delta pulse-delta--up"
                    : "pulse-delta pulse-delta--down"
                }
              >
                {pulse.delta}
              </span>
            </div>
          </article>
        ))}
      </section>

      <nav className="workspace-nav fade-up" aria-label="Primary dashboard routes">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              isActive ? "workspace-link workspace-link--active" : "workspace-link"
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="workspace-stage">
        <Outlet />
      </div>
    </div>
  );
}

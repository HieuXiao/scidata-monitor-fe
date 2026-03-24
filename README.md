<div align="center">
  <br />
  <img src="https://github.com/user-attachments/assets/3309647b-63ae-4463-9b3e-f4dbd45e575a" alt="SciData Monitor Logo" width="72" height="72" />

  <h1>SciData Monitor — Frontend</h1>

  <p>
    An interactive research intelligence dashboard for monitoring academic literature trends,<br />
    mapping co-authorship networks, and exploring topic clusters across<br />
    <strong>Data Science</strong>, <strong>AI in Healthcare</strong>, and <strong>Radiogenomics</strong>.
  </p>

  <p>
    <a href="https://scidata-monitor.vercel.app" target="_blank">
      <img src="https://img.shields.io/badge/Live%20Demo-scidata--monitor.vercel.app-0a0a0a?style=for-the-badge&logo=vercel" alt="Live Demo" />
    </a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react&logoColor=white" alt="React 18" />
    <img src="https://img.shields.io/badge/TypeScript-5.4-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Vite-5.x-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/shadcn%2Fui-latest-000000?style=flat-square&logo=shadcnui&logoColor=white" alt="shadcn/ui" />
    <img src="https://img.shields.io/badge/TanStack_Query-v5-FF4154?style=flat-square&logo=reactquery&logoColor=white" alt="TanStack Query" />
    <img src="https://img.shields.io/badge/Zustand-4.x-433E38?style=flat-square" alt="Zustand" />
    <img src="https://img.shields.io/badge/Sigma.js-3.x-E9A82A?style=flat-square" alt="Sigma.js" />
    <img src="https://img.shields.io/badge/License-MIT-22c55e?style=flat-square" alt="License MIT" />
  </p>

  <p>
    <a href="https://scidata-monitor.vercel.app">Live Demo</a>
    &nbsp;·&nbsp;
    <a href="https://github.com/your-username/scidata-monitor-be">Backend Repo</a>
    &nbsp;·&nbsp;
    <a href="https://scidata-monitor-api.render.com/docs">API Docs (Swagger)</a>
    &nbsp;·&nbsp;
    <a href="https://github.com/your-username/scidata-monitor-fe/issues">Report Bug</a>
    &nbsp;·&nbsp;
    <a href="https://github.com/your-username/scidata-monitor-fe/issues">Request Feature</a>
  </p>

  <br />

  <!-- Screenshot placeholder -->
  <!-- <img src="docs/assets/dashboard-preview.png" alt="SciData Monitor Dashboard" width="100%" style="border-radius: 12px; box-shadow: 0 20px 60px rgba(0,0,0,0.3);" /> -->

  <br />
</div>

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Available Scripts](#available-scripts)
- [Folder Structure](#-folder-structure)
- [Environment Variables](#-environment-variables)
- [Pages & Routing](#-pages--routing)
- [State Management](#-state-management)
- [Data Fetching Strategy](#-data-fetching-strategy)
- [Visualization Modules](#-visualization-modules)
- [Contributing](#-contributing)
- [Branch Strategy](#-branch-strategy)
- [Commit Convention](#-commit-convention)
- [Roadmap](#-roadmap)
- [License](#-license)

---

## 🔬 Project Overview

SciData Monitor is a **Global Research Intelligence Platform** built as a portfolio project focused on the intersection of **Data Science and Radiogenomics**. The frontend is the visual layer that transforms complex academic data — processed by the backend's NLP pipelines and graph databases — into intuitive, interactive visualizations.

The platform solves a concrete problem: researchers and students are overwhelmed by the exponential growth of academic publications. SciData Monitor aggregates data from **arXiv**, **PubMed**, and **OpenAlex**, then surfaces insights through a purpose-built dashboard.

> 📄 For system architecture, data pipeline, and backend API documentation, see the [Backend Repository](https://github.com/your-username/scidata-monitor-be).

---

## ✨ Key Features

| Feature | Description |
|---|---|
| **📊 Trend Dashboard** | Keyword frequency charts over time — spot which research topics are gaining momentum across years |
| **🕸️ Collaboration Network** | Interactive co-authorship graph powered by Sigma.js; click any node to explore an author's research profile and institutional connections |
| **🔍 Topic Explorer** | Scatter plot visualization of BERTopic-generated topic clusters; each cluster represents a coherent research sub-field |
| **🏛️ Institution Analytics** | Compare research output volume, citation impact, and top contributors across universities and research labs |
| **🔎 Semantic Search** | Full-text search with real-time suggestions backed by vector embeddings from the backend |
| **📂 Paper Browser** | Paginated, filterable list of papers with topic tags, author links, and citation counts |

---

## 🛠️ Tech Stack

### Core Framework

| Technology | Version | Purpose |
|---|---|---|
| [React](https://reactjs.org/) | 18.3 | UI component library |
| [TypeScript](https://www.typescriptlang.org/) | 5.4 | Type safety across the entire codebase |
| [Vite](https://vitejs.dev/) | 5.x | Build tool and dev server (HMR, optimized bundling) |

### Styling & UI Components

| Technology | Version | Purpose |
|---|---|---|
| [Tailwind CSS](https://tailwindcss.com/) | 3.4 | Utility-first CSS framework |
| [shadcn/ui](https://ui.shadcn.com/) | latest | Accessible, unstyled component primitives (Radix UI based) |
| [Lucide React](https://lucide.dev/) | latest | Icon library |
| [clsx](https://github.com/lukeed/clsx) + [tailwind-merge](https://github.com/dcastil/tailwind-merge) | latest | Conditional class composition |

### Data Visualization

| Technology | Version | Purpose |
|---|---|---|
| [Recharts](https://recharts.org/) | 2.x | Line, bar, and area charts for time-series trends |
| [Plotly.js](https://plotly.com/javascript/) | 2.x | Scientific scatter plots for topic clusters |
| [Sigma.js](https://www.sigmajs.org/) | 3.x | High-performance WebGL graph rendering |
| [Graphology](https://graphology.github.io/) | latest | Graph data structure underlying Sigma.js |

### State, Routing & Data Fetching

| Technology | Version | Purpose |
|---|---|---|
| [React Router v6](https://reactrouter.com/) | 6.x | Client-side routing with nested layouts |
| [Zustand](https://zustand-demo.pmnd.rs/) | 4.x | Lightweight global state for filters, graph selection |
| [TanStack Query](https://tanstack.com/query/v5) | v5 | Server state: caching, background refetching, pagination |
| [Axios](https://axios-http.com/) | 1.x | HTTP client with interceptors for auth token injection |

### Testing & Code Quality

| Technology | Purpose |
|---|---|
| [Vitest](https://vitest.dev/) | Unit test runner (Vite-native) |
| [React Testing Library](https://testing-library.com/) | Component testing with user-centric queries |
| [ESLint](https://eslint.org/) | Linting with `@typescript-eslint` + `eslint-plugin-react-hooks` |
| [Prettier](https://prettier.io/) | Opinionated code formatting |

### Deployment

| Service | Purpose |
|---|---|
| [Vercel](https://vercel.com/) | Frontend hosting with automatic preview deployments on PR |
| [GitHub Actions](https://github.com/features/actions) | CI: lint, type-check, and test on every push |

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     scidata-monitor-fe                          │
│                                                                 │
│   ┌──────────────┐    ┌─────────────────┐     ┌─────────────┐   │
│   │  React Pages │───▶│  TanStack Query │───▶│ Axios Client│   │
│   │  (Views)     │    │  (Server State) │     │ + JWT inject│   │
│   └──────────────┘    └─────────────────┘     └──────┬──────┘   │
│          │                                           │          │
│   ┌──────▼──────┐    ┌─────────────────┐             │          │
│   │   Zustand   │    │  Visualization  │             │          │
│   │   Stores    │    │  Components     │             │          │
│   │  (UI State) │    │  (Charts/Graph) │             │          │
│   └─────────────┘    └─────────────────┘             │          │
└──────────────────────────────────────────────────────┼──────────┘
                                                       │ REST API
                                                       ▼
                                         ┌────────────────────────┐
                                         │   scidata-monitor-be   │
                                         │   (FastAPI Backend)    │
                                         │                        │
                                         │  /api/v1/papers        │
                                         │  /api/v1/topics        │
                                         │  /api/v1/authors/graph │
                                         │  /api/v1/trends        │
                                         │  /api/v1/search        │
                                         └────────────────────────┘
```

**Data flow:**
1. User navigates to a page → React Router mounts the route component
2. The component calls a custom hook (`usePapers`, `useAuthorGraph`, etc.)
3. The hook uses TanStack Query to fetch from the FastAPI backend via Axios
4. Fetched data is transformed (if needed) and passed to visualization components
5. Filter/selection state is managed globally in Zustand stores
6. UI re-renders reactively when query data or store state changes

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** >= 18.x ([download](https://nodejs.org/))
- **npm** >= 9.x (bundled with Node.js) or **pnpm** >= 8.x
- The [**backend service**](https://github.com/your-username/scidata-monitor-be) running locally or use the deployed API URL

Verify your setup:

```bash
node --version   # Should output v18.x.x or higher
npm --version    # Should output 9.x.x or higher
```

---

### Installation

**Step 1 — Clone the repository**

```bash
git clone https://github.com/your-username/scidata-monitor-fe.git
cd scidata-monitor-fe
```

**Step 2 — Install dependencies**

```bash
npm install
```

**Step 3 — Configure environment variables**

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in the required values (see [Environment Variables](#-environment-variables) section).

**Step 4 — Start the development server**

```bash
npm run dev
```

The application will be available at **[http://localhost:5173](http://localhost:5173)**

> ℹ️ If the backend is not running locally, set `VITE_API_BASE_URL` to the deployed API URL in `.env.local` so the app can fetch real data.

---

### Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start Vite development server with HMR at `localhost:5173` |
| `npm run build` | Type-check and compile production bundle to `dist/` |
| `npm run preview` | Serve the production `dist/` build locally for final verification |
| `npm run lint` | Run ESLint across all `.ts` and `.tsx` files |
| `npm run lint:fix` | Run ESLint and auto-fix fixable issues |
| `npm run format` | Run Prettier and format all files in `src/` |
| `npm run format:check` | Check formatting without writing changes (used in CI) |
| `npm run type-check` | Run `tsc --noEmit` for type validation without building |
| `npm run test` | Run all unit tests via Vitest in watch mode |
| `npm run test:run` | Run all tests once (non-interactive, used in CI) |
| `npm run test:ui` | Open Vitest browser UI for interactive test debugging |
| `npm run test:coverage` | Generate test coverage report in `coverage/` |

---

## 📁 Folder Structure

```
scidata-monitor-fe/
│
├── public/                         # Static files served as-is (not processed by Vite)
│   ├── logo.svg                    # App logo (used in <head> and hero sections)
│   └── favicon.ico
│
├── src/
│   │
│   ├── api/                        # All HTTP communication with the backend
│   │   ├── axiosClient.ts          # Base Axios instance: sets baseURL, timeout (10s),
│   │   │                           # attaches Authorization header from localStorage,
│   │   │                           # handles 401 → redirects to /login
│   │   ├── papers.api.ts           # getPapers(), getPaperById(), searchPapers()
│   │   ├── authors.api.ts          # getAuthorById(), getAuthorGraph()
│   │   ├── topics.api.ts           # getTopics(), getTopicPapers()
│   │   └── trends.api.ts           # getTrends(), getKeywordTimeSeries()
│   │
│   ├── assets/                     # Images and static assets imported in components
│   │   └── logo-full.png
│   │
│   ├── components/
│   │   │
│   │   ├── ui/                     # Auto-generated shadcn/ui primitives
│   │   │   │                       # Do not hand-edit; use `npx shadcn-ui add <name>`
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── input.tsx
│   │   │   ├── select.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── tooltip.tsx
│   │   │   └── badge.tsx
│   │   │
│   │   ├── charts/                 # Recharts and Plotly visualization components
│   │   │   ├── TrendLineChart.tsx  # Recharts LineChart — renders keyword frequency
│   │   │   │                       # over time; accepts { date, count }[] data prop
│   │   │   ├── TopicScatterPlot.tsx# Plotly scatter plot — renders BERTopic cluster
│   │   │   │                       # embeddings projected to 2D (UMAP output)
│   │   │   ├── PublicationBarChart.tsx # Recharts BarChart — yearly paper counts
│   │   │   │                       # per institution or author
│   │   │   └── HeatmapChart.tsx    # Plotly heatmap — topic × year activity matrix
│   │   │
│   │   ├── graph/                  # Sigma.js + Graphology graph components
│   │   │   ├── CollaborationGraph.tsx  # Main Sigma.js renderer; receives graphology
│   │   │   │                           # Graph instance; handles node click → sets
│   │   │   │                           # selectedAuthorId in graphStore
│   │   │   ├── GraphControls.tsx       # Toolbar: zoom in/out, fit view, filter by
│   │   │   │                           # minimum degree threshold slider
│   │   │   ├── NodeTooltip.tsx         # Floating panel shown on node hover;
│   │   │   │                           # displays author name, institution, paper count
│   │   │   └── AuthorDetailPanel.tsx   # Side panel shown on node click; fetches and
│   │   │                               # displays full author profile from API
│   │   │
│   │   ├── layout/                 # Application shell — persistent across pages
│   │   │   ├── AppLayout.tsx       # Root layout: Sidebar + Topbar + <Outlet />
│   │   │   ├── Sidebar.tsx         # Left navigation with links to all pages;
│   │   │   │                       # collapses to icon-only on narrow viewports
│   │   │   ├── Topbar.tsx          # Top bar with breadcrumb, global search input,
│   │   │   │                       # and theme toggle button
│   │   │   └── PageWrapper.tsx     # Wraps each page: sets <title>, adds page-level
│   │   │                           # padding, renders PageHeader
│   │   │
│   │   └── shared/                 # Generic reusable components (not domain-specific)
│   │       ├── SearchBar.tsx       # Controlled input with debounce (300ms),
│   │       │                       # calls onSearch(query) prop
│   │       ├── FilterPanel.tsx     # Collapsible panel with year-range slider,
│   │       │                       # topic multi-select, and institution select
│   │       ├── StatCard.tsx        # KPI card — displays label, value, and optional
│   │       │                       # delta indicator (% change vs previous period)
│   │       ├── PaperCard.tsx       # Paper list item — title, authors, year,
│   │       │                       # topic badges, external link to source
│   │       ├── EmptyState.tsx      # Illustrated empty state for zero-result views
│   │       ├── ErrorBoundary.tsx   # React ErrorBoundary — catches render errors,
│   │       │                       # shows fallback UI with retry button
│   │       └── LoadingSpinner.tsx  # Full-page and inline loading indicators
│   │
│   ├── hooks/                      # Custom React hooks — encapsulate data fetching logic
│   │   ├── usePapers.ts            # useQuery wrapper for papers list; supports
│   │   │                           # pagination (page, limit) and filter params
│   │   ├── usePaperDetail.ts       # useQuery for single paper by ID
│   │   ├── useAuthorGraph.ts       # useQuery for author graph; transforms API
│   │   │                           # nodes/edges response → graphology Graph object
│   │   │                           # using graphTransform utility
│   │   ├── useTopics.ts            # useQuery for topic clusters list + scatter data
│   │   ├── useTrends.ts            # useQuery for keyword time-series; accepts
│   │   │                           # { keywords: string[], yearRange: [number, number] }
│   │   └── useDebounce.ts          # Generic debounce hook used in SearchBar
│   │
│   ├── pages/                      # Route-level components — one per URL segment
│   │   ├── DashboardPage.tsx       # /dashboard — Overview with StatCards and
│   │   │                           # summary charts (top topics, recent papers)
│   │   ├── TrendPage.tsx           # /trends — Keyword trend explorer with
│   │   │                           # multi-keyword comparison and year filter
│   │   ├── TopicPage.tsx           # /topics — Topic cluster scatter plot +
│   │   │                           # topic detail panel with paper list
│   │   ├── NetworkPage.tsx         # /network — Full-page collaboration graph
│   │   │                           # with author search and detail panel
│   │   ├── InstitutionPage.tsx     # /institutions — Research output ranking table
│   │   │                           # and publication volume bar chart
│   │   ├── SearchPage.tsx          # /search — Full-text semantic search results
│   │   │                           # with filter panel and paginated PaperCard list
│   │   ├── PaperDetailPage.tsx     # /papers/:id — Full paper detail view
│   │   └── NotFoundPage.tsx        # Rendered for unmatched routes
│   │
│   ├── store/                      # Zustand global state stores
│   │   ├── filterStore.ts          # { yearRange, selectedTopics, selectedInstitution,
│   │   │                           # setFilter, resetFilters } — shared filter state
│   │   │                           # consumed by charts and paper list simultaneously
│   │   ├── graphStore.ts           # { selectedAuthorId, hoveredNodeId,
│   │   │                           # setSelectedAuthor, clearSelection }
│   │   └── searchStore.ts          # { query, setQuery, clearQuery }
│   │
│   ├── types/                      # TypeScript interfaces — mirror backend API schemas
│   │   ├── paper.types.ts          # Paper, PaperSummary, PapersListResponse
│   │   ├── author.types.ts         # Author, AuthorProfile
│   │   ├── topic.types.ts          # TopicCluster, TopicPoint (scatter data)
│   │   ├── trend.types.ts          # TrendDataPoint, KeywordTrend
│   │   └── graph.types.ts          # GraphNode, GraphEdge, GraphResponse
│   │
│   ├── utils/                      # Pure utility functions (no React dependencies)
│   │   ├── formatters.ts           # formatDate(), formatNumber(), truncateText()
│   │   ├── graphTransform.ts       # convertApiResponseToGraphology() — maps API
│   │   │                           # { nodes, edges } to graphology MultiGraph;
│   │   │                           # assigns size ∝ citation_count, color by community
│   │   └── colorScales.ts          # getCommunityColor(communityId) — deterministic
│   │                               # color assignment for graph communities
│   │
│   ├── constants/                  # App-wide static values
│   │   ├── routes.ts               # ROUTES object: { DASHBOARD: '/dashboard', ... }
│   │   └── queryKeys.ts            # TanStack Query key factories for cache management
│   │                               # e.g. paperKeys.list(filters), authorKeys.graph(id)
│   │
│   ├── lib/
│   │   └── utils.ts                # shadcn/ui helper: cn() class merge utility
│   │
│   ├── App.tsx                     # Root component: sets up <RouterProvider> with
│   │                               # all route definitions and <QueryClientProvider>
│   ├── main.tsx                    # ReactDOM.createRoot entry point
│   └── vite-env.d.ts               # Vite env variable type declarations
│
├── .github/
│   ├── workflows/
│   │   └── ci.yml                  # GitHub Actions: lint + type-check + test on PR
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   └── feature_request.md
│   └── PULL_REQUEST_TEMPLATE.md
│
├── .env.example                    # Template for environment variables
├── .eslintrc.cjs                   # ESLint config
├── .prettierrc                     # Prettier config
├── .gitignore
├── components.json                 # shadcn/ui CLI config
├── index.html                      # Vite HTML entry point
├── package.json
├── tailwind.config.ts              # Tailwind config with custom design tokens
├── tsconfig.json                   # TypeScript compiler options
├── tsconfig.node.json              # TS config for vite.config.ts
├── vite.config.ts                  # Vite config: aliases, proxy for dev API
└── README.md
```

---

## 🔐 Environment Variables

Copy `.env.example` to `.env.local` for local development:

```bash
cp .env.example .env.local
```

> ⚠️ **Never commit `.env.local`** — it is already listed in `.gitignore`. Only commit `.env.example` with placeholder values.

### Complete variable reference

```env
# ─────────────────────────────────────────────
# Backend API
# ─────────────────────────────────────────────

# Base URL of the FastAPI backend
# Local:   http://localhost:8000/api/v1
# Staging: https://scidata-monitor-api-staging.render.com/api/v1
# Prod:    https://scidata-monitor-api.render.com/api/v1
VITE_API_BASE_URL=http://localhost:8000/api/v1

# Request timeout in milliseconds (default: 10000)
VITE_API_TIMEOUT=10000

# ─────────────────────────────────────────────
# Feature Flags
# ─────────────────────────────────────────────

# Enable the collaboration network graph page
VITE_ENABLE_GRAPH_ANALYTICS=true

# Enable semantic search (requires Elasticsearch on the backend)
VITE_ENABLE_SEMANTIC_SEARCH=false

# Enable institution comparison analytics page
VITE_ENABLE_INSTITUTION_PAGE=true

# ─────────────────────────────────────────────
# Analytics & Monitoring (optional)
# ─────────────────────────────────────────────

# PostHog project API key for product analytics
# Leave empty to disable analytics tracking
VITE_POSTHOG_KEY=

# PostHog host (only needed if self-hosting PostHog)
VITE_POSTHOG_HOST=https://app.posthog.com

# ─────────────────────────────────────────────
# App Config
# ─────────────────────────────────────────────

# Application display name (shown in browser tab and header)
VITE_APP_NAME=SciData Monitor

# Default theme: "light" | "dark" | "system"
VITE_DEFAULT_THEME=system
```

### How Vite exposes environment variables

All variables **must be prefixed with `VITE_`** to be accessible in the browser bundle. Access them in code via:

```typescript
const apiUrl = import.meta.env.VITE_API_BASE_URL;
const isGraphEnabled = import.meta.env.VITE_ENABLE_GRAPH_ANALYTICS === 'true';
```

Type declarations for custom env variables are defined in `src/vite-env.d.ts`:

```typescript
// src/vite-env.d.ts
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_API_TIMEOUT: string;
  readonly VITE_ENABLE_GRAPH_ANALYTICS: string;
  readonly VITE_ENABLE_SEMANTIC_SEARCH: string;
  readonly VITE_ENABLE_INSTITUTION_PAGE: string;
  readonly VITE_POSTHOG_KEY: string;
  readonly VITE_APP_NAME: string;
  readonly VITE_DEFAULT_THEME: 'light' | 'dark' | 'system';
}
```

---

## 🗺️ Pages & Routing

Route definitions live in `src/App.tsx`. All page routes are nested under `AppLayout` which renders the persistent Sidebar and Topbar.

```
/                         → Redirects to /dashboard
/dashboard                → DashboardPage    — KPI overview + summary charts
/trends                   → TrendPage        — Keyword time-series explorer
/topics                   → TopicPage        — BERTopic cluster scatter plot
/network                  → NetworkPage      — Co-authorship graph (Sigma.js)
/institutions             → InstitutionPage  — Research output analytics
/search                   → SearchPage       — Full-text semantic search
/papers/:id               → PaperDetailPage  — Individual paper detail
*                         → NotFoundPage     — 404 fallback
```

**Route configuration example:**

```tsx
// src/App.tsx
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: "dashboard",    element: <DashboardPage /> },
      { path: "trends",       element: <TrendPage /> },
      { path: "topics",       element: <TopicPage /> },
      { path: "network",      element: <NetworkPage /> },
      { path: "institutions", element: <InstitutionPage /> },
      { path: "search",       element: <SearchPage /> },
      { path: "papers/:id",   element: <PaperDetailPage /> },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);
```

---

## 🗄️ State Management

The application uses two distinct state layers:

### TanStack Query — Server State

All data fetched from the backend is managed by TanStack Query. This handles caching, background refetching, loading and error states automatically.

```typescript
// src/hooks/usePapers.ts
export function usePapers(filters: PaperFilters) {
  return useQuery({
    queryKey: paperKeys.list(filters),      // Cache key includes all filter params
    queryFn: () => papersApi.getList(filters),
    staleTime: 5 * 60 * 1000,              // Data considered fresh for 5 minutes
    placeholderData: keepPreviousData,      // Prevent flicker on page change
  });
}
```

Query key factories ensure precise cache invalidation:

```typescript
// src/constants/queryKeys.ts
export const paperKeys = {
  all:    () => ['papers'] as const,
  list:   (f: PaperFilters) => ['papers', 'list', f] as const,
  detail: (id: string)      => ['papers', 'detail', id] as const,
};

export const authorKeys = {
  all:   () => ['authors'] as const,
  graph: (id: string) => ['authors', 'graph', id] as const,
};
```

### Zustand — UI / Client State

Global UI state that multiple components need to share — active filters, graph node selection — lives in Zustand stores.

```typescript
// src/store/filterStore.ts
interface FilterState {
  yearRange: [number, number];
  selectedTopics: string[];
  selectedInstitution: string | null;
  setFilter: (patch: Partial<Omit<FilterState, 'setFilter' | 'resetFilters'>>) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  yearRange: [2019, 2024],
  selectedTopics: [],
  selectedInstitution: null,
  setFilter: (patch) => set((state) => ({ ...state, ...patch })),
  resetFilters: () => set({ yearRange: [2019, 2024], selectedTopics: [], selectedInstitution: null }),
}));
```

**Local component state** (form inputs, UI toggles) uses plain `useState` — Zustand is only introduced when state must be shared across unrelated components.

---

## 📊 Visualization Modules

### Collaboration Network (`CollaborationGraph.tsx`)

Built with **Sigma.js v3** and **Graphology** for WebGL-accelerated rendering of large author networks.

**Data flow:**
1. `useAuthorGraph(authorId)` fetches `{ nodes, edges }` from `/api/v1/authors/{id}/graph`
2. `graphTransform.convertApiResponseToGraphology()` builds a `graphology.MultiGraph`
3. Node size is set proportional to `citation_count`; node color is assigned by `community_id` using `colorScales.getCommunityColor()`
4. `<CollaborationGraph graph={graph} />` renders the Sigma.js canvas
5. Node hover → shows `<NodeTooltip>`; node click → updates `graphStore.selectedAuthorId` → renders `<AuthorDetailPanel>`

```typescript
// src/utils/graphTransform.ts
export function convertApiResponseToGraphology(response: GraphResponse): MultiGraph {
  const graph = new MultiGraph();
  response.nodes.forEach(node => {
    graph.addNode(node.id, {
      label: node.label,
      size: Math.log1p(node.citation_count) * 3,   // Log scale to prevent giant nodes
      color: getCommunityColor(node.community_id),
      x: Math.random(),   // Initial position; FA2 layout algorithm takes over
      y: Math.random(),
    });
  });
  response.edges.forEach(edge => {
    graph.addEdge(edge.source, edge.target, { weight: edge.weight });
  });
  return graph;
}
```

### Topic Scatter Plot (`TopicScatterPlot.tsx`)

Built with **Plotly.js**. The backend returns 2D UMAP-projected coordinates for each paper, colored by topic cluster ID. Hover reveals the paper title and dominant topic label.

### Trend Line Chart (`TrendLineChart.tsx`)

Built with **Recharts**. Supports multi-keyword comparison on a single chart — each keyword gets a distinct color from the `colorScales` module. Responsive container fills available width.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

### 1. Fork & Clone

```bash
git clone https://github.com/your-username/scidata-monitor-fe.git
cd scidata-monitor-fe
```

### 2. Create a Feature Branch

Always branch from `develop`:

```bash
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name
```

### 3. Develop & Test

Make your changes, then ensure all checks pass:

```bash
npm run lint          # ESLint must pass
npm run type-check    # TypeScript must compile clean
npm run test:run      # All tests must pass
npm run build         # Production build must succeed
```

### 4. Commit with Conventional Commits

```bash
git commit -m "feat(graph): add node degree filter slider to GraphControls"
git commit -m "fix(chart): correct year axis label format in TrendLineChart"
git commit -m "docs(readme): update environment variables section"
```

### 5. Open a Pull Request

- Target branch: **`develop`** (never `main` directly)
- Fill in the PR template completely
- Ensure the CI workflow passes before requesting review

### Code Style Notes

- All components must be **functional components** with TypeScript props interface
- Props interfaces are named `ComponentNameProps` and defined above the component
- Use **named exports** for all components (no default exports except for pages)
- Avoid any `// @ts-ignore` — fix the type properly
- CSS is Tailwind-only; no inline `style={{}}` except for dynamic computed values (e.g., graph canvas dimensions)
- All `useQuery` calls must define `queryKey` using the factories in `queryKeys.ts`

---

## 🌿 Branch Strategy

```
main
  └── develop                        ← Active development base
        ├── feature/collaboration-graph
        ├── feature/semantic-search
        ├── fix/neo4j-timeout-handling
        └── chore/upgrade-tanstack-query-v5
```

| Branch | Purpose | Merge target | Direct push |
|---|---|---|---|
| `main` | Production code | — | ❌ Protected |
| `develop` | Integration branch | `main` (via release) | ❌ Protected |
| `feature/*` | New features | `develop` | ✅ |
| `fix/*` | Bug fixes | `develop` | ✅ |
| `chore/*` | Deps, config, docs | `develop` | ✅ |
| `release/*` | Release preparation | `main` + `develop` | ✅ |

---

## 📝 Commit Convention

This project follows **[Conventional Commits](https://www.conventionalcommits.org/)**.

**Format:** `<type>(<scope>): <short imperative description>`

```bash
# Adding a feature
feat(graph): add force-atlas2 layout algorithm to CollaborationGraph

# Fixing a bug
fix(api): handle 429 rate limit response with exponential backoff in axiosClient

# Updating documentation
docs(readme): add visualization modules section

# Refactoring (no behavior change)
refactor(store): consolidate filter and search stores into single uiStore

# Adding or fixing tests
test(hooks): add usePapers hook integration test with mock API

# Dependency or config update
chore(deps): upgrade recharts to 2.12.0

# CI/CD change
ci(github-actions): add build step to PR workflow

# Performance improvement
perf(graph): memoize graphology instance to prevent re-renders on hover
```

**Scope values** for this repo: `graph`, `chart`, `api`, `store`, `hooks`, `pages`, `layout`, `ui`, `types`, `utils`, `deps`, `ci`, `docs`

---

## 🗓️ Roadmap

### v1.0.0 — MVP (Current)
- [x] Project scaffold with Vite + React + TypeScript + Tailwind
- [x] shadcn/ui component library integration
- [x] Axios client with JWT interceptor
- [x] TanStack Query setup with query key factories
- [x] Zustand filter and graph stores
- [x] React Router v6 layout with Sidebar + Topbar
- [ ] Dashboard page with StatCards and summary charts
- [ ] Trend page with keyword line chart
- [ ] Paper list with search and pagination

### v1.1.0 — Graph Analytics
- [ ] Collaboration network page (Sigma.js + Graphology)
- [ ] Node hover tooltip and click-to-detail panel
- [ ] Degree filter slider in GraphControls
- [ ] Author search to focus graph on a specific node

### v1.2.0 — Topic Explorer
- [ ] Topic scatter plot (Plotly UMAP projection)
- [ ] Topic cluster detail panel with paper list
- [ ] Topic filter integration across all pages

### v1.3.0 — Polish & Performance
- [ ] Skeleton loading states for all data-heavy components
- [ ] Full test coverage for all custom hooks
- [ ] Dark mode refinement
- [ ] Vercel Analytics integration
- [ ] Accessibility audit (WCAG 2.1 AA)

---

## 📄 License

MIT License — Copyright © 2026 **Ngô Minh Hiếu**

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software.

See [LICENSE](LICENSE) for the full text.

---

<div align="center">
  <sub>
    Built with ☕ and curiosity by <a href="https://github.com/your-username">Ngô Minh Hiếu</a>
    &nbsp;·&nbsp;
    Part of the <a href="https://github.com/your-username/scidata-monitor-be">SciData Monitor</a> project
  </sub>
</div>

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import { AppShell } from "./components/layout/AppShell";
import DashboardPage from "./pages/DashboardPage";
import { NotFoundPage, PlaceholderPage } from "./pages/RouteStates";
import "./App.css";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: "dashboard", element: <DashboardPage /> },
      {
        path: "trends",
        element: (
          <PlaceholderPage
            title="Trend Analytics"
            description="Trend charts are reserved for keyword momentum exploration and timeline diagnostics."
          />
        ),
      },
      {
        path: "topics",
        element: (
          <PlaceholderPage
            title="Topic Explorer"
            description="Topic clustering and semantic scatter views will be mounted in this section."
          />
        ),
      },
      {
        path: "network",
        element: (
          <PlaceholderPage
            title="Collaboration Network"
            description="Co-authorship graph analytics and node-level details will be visualized here."
          />
        ),
      },
      {
        path: "institutions",
        element: (
          <PlaceholderPage
            title="Institution Analytics"
            description="Institution benchmark and output comparison screens will appear in this module."
          />
        ),
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;

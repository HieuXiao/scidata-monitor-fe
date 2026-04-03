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
            description="Track emerging research trends across multiple scientific domains and identify fast-growing topics globally."
          />
        ),
      },
      {
        path: "topics",
        element: (
          <PlaceholderPage
            title="Topic Explorer"
            description="Explore structured topic clusters derived from large-scale scientific publications across all disciplines."
          />
        ),
      },
      {
        path: "network",
        element: (
          <PlaceholderPage
            title="Collaboration Network"
            description="Analyze collaboration networks between researchers, institutions, and countries worldwide."
          />
        ),
      },
      {
        path: "institutions",
        element: (
          <PlaceholderPage
            title="Institution Analytics"
            description="Compare research output and impact across global universities and organizations."
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

import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import AppLayout from "@/components/layout/AppLayout";
// import DashboardPage from "@/pages/DashboardPage";
// ... other imports

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <div className="p-8"><h1>SciData Monitor</h1><p>Welcome to the dashboard. Layout coming soon!</p></div>,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: "dashboard", element: <div>Dashboard Content</div> },
      // ... other routes
    ],
  },
  { path: "*", element: <div>404 Not Found</div> },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;

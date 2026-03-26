import { NavLink } from "react-router-dom";
import type { PlaceholderPageProps } from "../types/dashboard";

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <main className="placeholder-page fade-up">
      <h2>{title}</h2>
      <p>{description}</p>
    </main>
  );
}

export function NotFoundPage() {
  return (
    <main className="not-found-page fade-up">
      <h2>404 Not Found</h2>
      <p>The route does not exist. Go back to dashboard to continue monitoring.</p>
      <NavLink to="/dashboard" className="not-found-link">
        Go to Dashboard
      </NavLink>
    </main>
  );
}

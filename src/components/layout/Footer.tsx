export function Footer() {
  return (
    <footer className="monitor-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <p className="footer-brand-name">SciData Monitor</p>
          <p className="footer-tagline-sm">Global Research Intelligence Platform</p>
          <p className="footer-data-sources">
            Data sources: PubMed · arXiv · OpenAlex · Nature · IEEE · Scopus · bioRxiv · SSRN
          </p>
        </div>

        <div className="footer-links">
          <a href="#about" className="footer-link">About</a>
          <a href="#api" className="footer-link">API Docs</a>
          <a href="#citation" className="footer-link">Citation Policy</a>
          <a href="#privacy" className="footer-link">Privacy</a>
        </div>
      </div>

      <div className="footer-disclaimer">
        <p>
          SciData Monitor is a global research intelligence platform aggregating scientific activity
          across all major disciplines — from Artificial Intelligence & Data Science and Life Sciences & Medicine to Physics & Quantum, Materials Science, Climate & Earth Science, Neuroscience, and Genomics. Data is sourced from public
          repositories and may not reflect real-time counts. Not affiliated with any government agency
          or journal publisher.
        </p>
      </div>
    </footer>
  );
}

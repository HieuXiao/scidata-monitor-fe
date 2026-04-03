export function Footer() {
  return (
    <footer className="monitor-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <p className="footer-brand-name">SciData Monitor</p>
          <p className="footer-data-sources">
            Data sources: PubMed · arXiv · OpenAlex · Nature · IEEE
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
          SciData Monitor is an experimental research intelligence platform built for academic use.
          Data is aggregated from public sources and may not reflect real-time publication counts.
          Not affiliated with any government agency or journal publisher.
        </p>
      </div>
    </footer>
  );
}

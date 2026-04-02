export function Footer() {
  return (
    <footer className="monitor-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <p className="footer-brand-name">WORLD MONITOR</p>
        </div>
        
        <div className="footer-links">
          <a href="#blog" className="footer-link">Blog</a>
          <a href="#contact" className="footer-link">Contact</a>
          <a href="#privacy" className="footer-link">Privacy</a>
          <a href="#terms" className="footer-link">Terms</a>
        </div>
      </div>

      <div className="footer-disclaimer">
        <p>
          DISCLAIMER: This platform is for informational and research purposes only. It should not be used for financial trading, investment decisions, or as a substitute for professional advice. WORLD MONITOR is an experimental research project provided "as-is" without warranties. WORLD MONITOR is not affiliated with any government or intelligence agency.
        </p>
      </div>
    </footer>
  );
}

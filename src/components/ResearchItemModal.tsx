import { X, ExternalLink, Calendar, MapPin, Building2, Users, FileText, Activity } from "lucide-react";
import type { ResearchFeedItem } from "../types/dashboard";

interface ResearchItemModalProps {
  item: ResearchFeedItem | null;
  onClose: () => void;
}

export function ResearchItemModal({ item, onClose }: ResearchItemModalProps) {
  if (!item) return null;

  const isEvent = item.source === "Events";

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-source-badge">{item.source}</span>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          {isEvent ? (
            /* Layout for Events / Conferences */
            <div className="modal-event-layout">
              <div className="modal-article-main">
                <h2 className="modal-title">{item.title}</h2>
                <div className="modal-meta-grid">
                  <div className="meta-item">
                    <Calendar size={16} />
                    <span>{item.published}</span>
                  </div>
                  <div className="meta-item">
                    <MapPin size={16} />
                    <span>{item.region}</span>
                  </div>
                  <div className="meta-item">
                    <Building2 size={16} />
                    <span>{item.institution}</span>
                  </div>
                </div>
                
                <div className="modal-section scrollable-section">
                  <h3><FileText size={16} /> Description</h3>
                  <p className="modal-summary">{item.summary}</p>
                </div>
              </div>

              <div className="modal-section">
                <h3><Users size={16} /> Target Audience</h3>
                <div className="tag-list">
                  {item.audience.map(aud => <span key={aud} className="modal-tag">{aud}</span>)}
                </div>
              </div>
            </div>
          ) : (
            /* Layout for Scientific Articles (NCKH) */
            <div className="modal-article-layout">
              <div className="modal-article-main">
                <h2 className="modal-title">{item.title}</h2>
                
                <div className="modal-authors">
                  <Users size={16} />
                  <span><strong>Authors:</strong> {item.authors || item.primaryAuthor}</span>
                </div>

                <div className="modal-section scrollable-section">
                  <h3><FileText size={16} /> Abstract</h3>
                  <p className="modal-summary">{item.summary}</p>
                </div>

                <div className="modal-section">
                  <h3><Activity size={16} /> Topics & Tags</h3>
                  <div className="tag-list">
                    {item.tags.map(tag => <span key={tag} className="modal-tag">{tag}</span>)}
                  </div>
                </div>
              </div>

              <div className="modal-article-sidebar">
                <div className="modal-meta-col">
                  <div className="meta-item">
                    <Calendar size={14} />
                    <span>{item.published}</span>
                  </div>
                  <div className="meta-item">
                    <Building2 size={14} />
                    <span>{item.institution}</span>
                  </div>
                </div>

                <div className="modal-section">
                  <h3>Metrics & Impact</h3>
                  <div className="modal-metrics-grid">
                    <div className="metric-box">
                      <span className="metric-label">Citations</span>
                      <span className="metric-value">{item.citations || 0}</span>
                    </div>
                    <div className="metric-box">
                      <span className="metric-label">Citation Velocity</span>
                      <span className="metric-value">{item.citationVelocity}</span>
                    </div>
                    <div className="metric-box">
                      <span className="metric-label">Clinical Relevance</span>
                      <span className="metric-value">{item.clinicalRelevance}</span>
                    </div>
                    <div className="metric-box">
                      <span className="metric-label">Replication</span>
                      <span className="metric-value">{item.replicationScore}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <div className="footer-left">
            <span className="footer-source-info">Source: {item.source}</span>
          </div>
          <div className="footer-right">
            {item.doi ? (
              <a 
                href={`https://doi.org/${item.doi}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="modal-action-btn primary"
              >
                <ExternalLink size={14} />
                Read Full Article (DOI)
              </a>
            ) : isEvent ? (
               <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="modal-action-btn primary"
              >
                <ExternalLink size={14} />
                Register / Event Details
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

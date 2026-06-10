import React from 'react';

export default function DisclaimerModal({ onAccept }) {
  return (
    <div className="disclaimer-modal-overlay">
      <div className="disclaimer-modal-card glass-panel animate-fadeIn">
        <div className="disclaimer-icon-wrapper">
          <i className="fa-solid fa-triangle-exclamation"></i>
        </div>
        <h2>Attention Freshers!</h2>
        <p>Welcome to the LPU Freshmen Induction Helper Hub.</p>
        <p>Before proceeding, please read and acknowledge the following important points:</p>
        
        <ul className="disclaimer-points">
          <li>
            <i className="fa-solid fa-circle-exclamation"></i>
            <span><strong>Unofficial Portal:</strong> This is an UNOFFICIAL helper website and is NOT affiliated with Lovely Professional University (LPU).</span>
          </li>
          <li>
            <i className="fa-solid fa-calendar-day"></i>
            <span><strong>Tentative Dates:</strong> The dates and schedules listed here are tentative and for informational/guidance purposes only.</span>
          </li>
          <li>
            <i className="fa-solid fa-shield-halved"></i>
            <span><strong>Verify Officially:</strong> You must cross-reference and verify all information, schedules, and reportings on the official LPU portal (<a href="https://www.lpu.in" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>lpu.in</a>) or UMS.</span>
          </li>
          <li>
            <i className="fa-solid fa-code"></i>
            <span><strong>Student Helper:</strong> This portal is built to make the induction process easier to navigate with custom checklists and interactive guides.</span>
          </li>
        </ul>

        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          By clicking accept, you acknowledge that you understand this is an unofficial guide and will verify important details with official LPU sources.
        </p>

        <div className="disclaimer-modal-actions">
          <button className="btn btn-primary" onClick={onAccept}>
            <i className="fa-solid fa-check-double"></i> Acknowledge & Enter Portal
          </button>
        </div>
      </div>
    </div>
  );
}

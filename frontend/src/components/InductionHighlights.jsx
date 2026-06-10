import React, { useState } from 'react';

const TABS = [
  {
    id: 'lfts',
    label: 'Technology & Engineering (LFTS)',
    title: 'Code, Design & Build',
    description: 'Welcome to the Faculty of Technology and Sciences. The induction program here is packed with modern tech orientation, hands-on lab sessions, and interactions with industry leaders.',
    iconClass: 'fa-solid fa-laptop-code',
    points: [
      "Introduction to GitHub, IDEs, and campus coding clubs.",
      "Explore advanced AI, IoT, and Cybersecurity labs in block 34/36.",
      "Interact with professors and seniors working on patent-pending tech.",
      "Understand credit system (LPU course structures and electives)."
    ]
  },
  {
    id: 'lfba',
    label: 'Business & Management (LFBA)',
    title: 'Lead, Innovate & Network',
    description: 'Welcome to the Faculty of Business and Arts. Get ready to develop leadership qualities, business acumen, and creative capabilities during your induction week.',
    iconClass: 'fa-solid fa-chart-line',
    points: [
      "Business case studies, case challenges, and elevator pitches.",
      "Networking workshops with LPU alumni working in top MNCs.",
      "Intro to business incubator centers and start-up funding aids.",
      "Overview of student leadership programs and cultural societies."
    ]
  },
  {
    id: 'lfams',
    label: 'Applied Medical Sciences (LFAMS)',
    title: 'Research, Heal & Discover',
    description: 'Welcome to the Faculty of Applied Medical Sciences. The orientation here focuses on scientific rigor, lab safety, research possibilities, and clinical practices.',
    iconClass: 'fa-solid fa-microscope',
    points: [
      "Hands-on demonstration of state-of-the-art analytical equipment.",
      "Workshops on biosafety protocols and laboratory guidelines.",
      "Interact with research scholars working on pharmaceutical breakthroughs.",
      "Overview of clinical internship opportunities and hospital ties."
    ]
  }
];

export default function InductionHighlights() {
  const [activeTabId, setActiveTabId] = useState('lfts');

  return (
    <section className="events-vibe-section">
      <div className="section-title-wrapper" style={{ textAlign: 'center' }}>
        <h2 style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
          <i className="fa-solid fa-wand-magic-sparkles text-orange"></i> Department Orientation Vibes
        </h2>
        <p>Explore what is waiting for you in your respective faculty induction program</p>
      </div>

      <div className="vibe-tabs-container glass-panel" style={{ padding: '24px' }}>
        <div className="vibe-tabs">
          {TABS.map(tab => (
            <button
              key={tab.id}
              className={`vibe-tab-btn ${activeTabId === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTabId(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="vibe-tab-content">
          {TABS.map(tab => (
            <div 
              key={tab.id}
              className={`tab-pane ${activeTabId === tab.id ? 'active' : ''}`}
            >
              <div className="tab-grid">
                <div className="tab-text">
                  <h3>{tab.title}</h3>
                  <p>{tab.description}</p>
                  <ul className="vibe-list">
                    {tab.points.map((pt, i) => (
                      <li key={i}>
                        <i className="fa-solid fa-circle-check text-green"></i>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="tab-icon-box">
                  <i className={`${tab.iconClass} animate-pulse`}></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

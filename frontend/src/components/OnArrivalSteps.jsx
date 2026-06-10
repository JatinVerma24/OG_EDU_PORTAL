import React, { useState } from 'react';

const STEPS = [
  {
    num: 1,
    title: "Gate Entry",
    badge: "Step 1: Welcome to Campus",
    heading: "Enter through LPU Main Gate",
    desc: "When you arrive at the Lovely Professional University campus (typically Main Gate 1), security personnel will check your Admission Letter / Provost Pass (available in your UMS). Parents/guardians are allowed to accompany you. Keep your soft copy or hard copy of the letter ready for quick scanning."
  },
  {
    num: 2,
    title: "Documents",
    badge: "Step 2: Verification",
    heading: "Original Document Verification",
    desc: "Proceed to your designated school block (or the central venue, usually the Baldev Raj Mittal Unipolis / Baldev Singh Block). You need to present your original certificates (10th/12th marksheets, character certificate, migration certificate, etc.) along with two sets of photocopies. Staff will verify them and update your status."
  },
  {
    num: 3,
    title: "ID & Biometrics",
    badge: "Step 3: Registration",
    heading: "Biometric Registration & ID Card",
    desc: "Once documents are verified, go to the ID card generation counters. They will capture your live photo and biometric fingerprints. Within a few minutes, your official LPU Student ID Card will be printed and handed to you. This card is your key to turnstiles, libraries, and hostels."
  },
  {
    num: 4,
    title: "Hostel Key",
    badge: "Step 4: Accommodation",
    heading: "Hostel Room Allocation & Check-in",
    desc: "If you have opted for LPU hosteling, head directly to the hostel helpdesk in your allotted block (e.g., Boys Hostels BH-1 to BH-6, Girls Hostels GH-1 to GH-6). Show your fee receipt and ID card. You will be assigned a room, handed over room keys, and introduced to your block warden."
  },
  {
    num: 5,
    title: "Induction Vibe",
    badge: "Step 5: Induction",
    heading: "Orientation and School Induction",
    desc: "Now you are ready! Check your school's specific schedule for orientation workshops, campus tours, Icebreaking sessions, and interactions with your mentors. These events take place in designated seminar halls and auditoriums (like Shanti Devi Mittal Auditorium). Make new friends and soak in the LPU vibe!"
  }
];

export default function OnArrivalSteps() {
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const activeStep = STEPS[activeStepIdx];

  const handleNext = () => {
    if (activeStepIdx < STEPS.length - 1) {
      setActiveStepIdx(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (activeStepIdx > 0) {
      setActiveStepIdx(prev => prev - 1);
    }
  };

  return (
    <section className="reporting-steps-section">
      <div className="section-title-wrapper" style={{ textAlign: 'center' }}>
        <h2 style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
          <i className="fa-solid fa-route text-orange"></i> On-Campus Reporting Guide
        </h2>
        <p>A step-by-step roadmap of what to do as soon as you arrive at LPU</p>
      </div>

      <div className="steps-progress-bar-container">
        {STEPS.map((step, idx) => (
          <div 
            key={step.num}
            className={`step-progress-item ${idx === activeStepIdx ? 'active' : ''}`}
            onClick={() => setActiveStepIdx(idx)}
          >
            <div className="step-progress-circle">
              {idx < activeStepIdx ? <i className="fa-solid fa-check"></i> : step.num}
            </div>
            <div className="step-progress-title d-none-mobile">{step.title}</div>
          </div>
        ))}
      </div>

      <div className="step-details-card glass-panel">
        <div className="step-details-header">
          <span className="step-badge">{activeStep.badge}</span>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {activeStep.num} of {STEPS.length}
          </span>
        </div>
        <h3 id="step-detail-title" style={{ marginBottom: '12px' }}>{activeStep.heading}</h3>
        <p>{activeStep.desc}</p>
        
        <div className="step-details-actions">
          <button 
            className="btn btn-secondary btn-sm" 
            onClick={handlePrev}
            disabled={activeStepIdx === 0}
            style={{ opacity: activeStepIdx === 0 ? 0.5 : 1, cursor: activeStepIdx === 0 ? 'not-allowed' : 'pointer' }}
          >
            <i className="fa-solid fa-chevron-left"></i> Previous
          </button>
          <button 
            className="btn btn-primary btn-sm" 
            onClick={handleNext}
            disabled={activeStepIdx === STEPS.length - 1}
            style={{ opacity: activeStepIdx === STEPS.length - 1 ? 0.5 : 1, cursor: activeStepIdx === STEPS.length - 1 ? 'not-allowed' : 'pointer' }}
          >
            Next <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </section>
  );
}

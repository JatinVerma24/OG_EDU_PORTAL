import React, { useState, useEffect, useRef } from 'react';

const SUGGESTIONS = [
  { id: 'docs', label: "📋 Document Checklist", text: "What documents do I need to bring?" },
  { id: 'unipolis', label: "🏫 Reporting at Unipolis", text: "Where do I report when arriving at LPU?" },
  { id: 'hostel', label: "🔑 Hostel Keys & Slip", text: "How do I get my hostel keys?" },
  { id: 'mba_mca', label: "📅 MBA & MCA Schedules", text: "What are the MBA pre-term and MCA bridge dates?" },
  { id: 'cse', label: "💻 B.Tech CSE Dates", text: "How do I check B.Tech CSE reporting dates?" },
  { id: 'helpline', label: "📞 LPU Helpline", text: "How can I contact the reporting helpline?" }
];

const BOT_RESPONSES = {
  docs: `📚 **Required Document Checklist:**
1. **Admission Offer Letter** & fee receipts (printed).
2. **Original Marksheets** (10th, 12th, or graduation transcripts) + 3 sets of photocopies.
3. **Original Migration Certificate** & Transfer/Leaving Certificate.
4. **Character Certificate** from your last institution.
5. **Self-Attested Anti-Ragging Affidavit** (signed by student and parent).
6. **Medical Fitness Certificate** in LPU's official format.
7. **6 Passport-size photographs** (white background).
8. **Aadhaar Card** photocopies of student and parents.

*Tip: Carry all originals in a secure, transparent folder for auditing.*`,

  unipolis: `🏫 **On-Campus Reporting Steps at Baldev Raj Mittal Unipolis:**
1. **Unipolis Entry:** Report here, scan the venue QR code, and validate using the OTP sent to your phone to download your digital 'Reporting & Induction Sheet'.
2. **Checklist Collection:** Collect your physical checklist paper.
3. **Desk Auditing:** Visit designated desks in order: Document Verification → Biometrics → Accounts/Dues → Uniform Counter → UMS Login Desk.
4. **Stamping:** Ensure coordinators stamp your sheet at every counter. Leaving any counter unstamped will block your class attendance!`,

  hostel: `🔑 **Hostel Allocation Process:**
1. **Report on Campus:** Complete physical document verification at Unipolis first.
2. **Settle Dues:** Settle all pending hostel, mess, or laundry fees online or at the Accounts Help Desk in Unipolis.
3. **Update Slip:** The system updates your hostel slip within 15 minutes of fee clearance.
4. **Download Slip:** Go to UMS portal → Residential Services → View Residential Reporting Slip.
5. **Collect Key:** Report to your allotted hostel Warden's Office, show the slip, and pick up your keys!`,

  mba_mca: `📅 **Special Programme Schedules (Compulsory):**
• **MBA Programmes:** Compulsory Pre-Term classes run from **30th July to 7th August 2026**. Regular classes start **10th August 2026**.
• **MCA Programmes:** Compulsory Bridge Course starts on **16th July 2026**. Regular classes start **6th August 2026**.`,

  cse: `💻 **B.Tech CSE Reporting Details:**
• B.Tech CSE students can search their dates on the guide portal using their **Candidate ID** or programme name.
• **Note:** Candidate IDs take approximately 8 hours to generate after completing your initial admission payment. Until then, use the programme name (e.g., CSE) to search!`,

  helpline: `📞 **LPU Official Helplines:**
• **Induction & Reporting Helpline:** 01824-517170
• **Alternative Contact:** +91-1824-517000 / 01824-404404
• **OG Student Support Group Phone:** 8264105304`
};

const KEYWORDS = [
  { keys: ['doc', 'cert', 'file', 'check', 'paper', 'mark', 'trans', 'migr'], responseId: 'docs' },
  { keys: ['report', 'campus', 'unipolis', 'arriving', 'reach', 'pick', 'station', 'shuttle'], responseId: 'unipolis' },
  { keys: ['hostel', 'room', 'key', 'warden', 'residential', 'slip', 'mess', 'laundry'], responseId: 'hostel' },
  { keys: ['mba', 'mca', 'pre-term', 'pre term', 'bridge', 'classes', 'commence', 'date'], responseId: 'mba_mca' },
  { keys: ['cse', 'b.tech cse', 'candidate', 'id', 'payment'], responseId: 'cse' },
  { keys: ['help', 'helpline', 'contact', 'call', 'number', 'phone', 'support'], responseId: 'helpline' }
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "👋 Welcome to ogeduAI Help! I'm your offline assistant. Join our community for live updates:",
      hasBanner: true
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [hasNewMessage, setHasNewMessage] = useState(true);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleOpenToggle = () => {
    setIsOpen(!isOpen);
    setHasNewMessage(false);
  };

  const handleSendMessage = (textToSend) => {
    const userText = textToSend || inputValue.trim();
    if (!userText) return;

    // Add user message
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    if (!textToSend) setInputValue('');

    // Simulate bot thinking
    setTimeout(() => {
      let botText = "";
      const lowerText = userText.toLowerCase();

      // Check for suggestions match first
      const matchedSuggestion = SUGGESTIONS.find(s => s.text.toLowerCase() === lowerText);
      if (matchedSuggestion) {
        botText = BOT_RESPONSES[matchedSuggestion.id];
      } else {
        // Keyword matching
        let bestMatch = null;
        for (const kw of KEYWORDS) {
          if (kw.keys.some(k => lowerText.includes(k))) {
            bestMatch = kw.responseId;
            break;
          }
        }

        if (bestMatch) {
          botText = BOT_RESPONSES[bestMatch];
        } else {
          botText = `🤖 I couldn't find a exact match for that. 

Here are some things I can help you with:
• **Documents** required at reporting.
• **Hostel allocation** and key collection.
• **Unipolis reporting** procedures.
• **MBA pre-term** and **MCA bridge courses**.
• **B.Tech CSE** schedules.

Or, click a quick question below!`;
        }
      }

      setMessages(prev => [...prev, { sender: 'bot', text: botText }]);
    }, 450);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Convert markdown bold and newlines to HTML
  const formatMessageText = (text) => {
    if (!text) return '';
    // Format bold **text**
    let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Format bullets
    formatted = formatted.replace(/\n\* (.*?)/g, '<br>• $1');
    // Format newlines
    formatted = formatted.replace(/\n/g, '<br>');
    return <span dangerouslySetInnerHTML={{ __html: formatted }} />;
  };

  return (
    <>
      {/* Floating Chat Bubble Button */}
      <button 
        className={`chatbot-bubble ${isOpen ? 'active' : ''} ${hasNewMessage ? 'pulse-effect' : ''}`}
        onClick={handleOpenToggle}
        aria-label="Toggle offline assistant"
        title="ogeduAI Offline Helper"
      >
        {isOpen ? (
          <i className="fa-solid fa-xmark"></i>
        ) : (
          <>
            <i className="fa-solid fa-robot"></i>
            {hasNewMessage && <span className="chatbot-badge">1</span>}
          </>
        )}
      </button>

      {/* Chat Window Panel */}
      <div className={`chatbot-window glass-panel ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="chatbot-header">
          <div className="chatbot-header-logo">
            <i className="fa-solid fa-robot text-orange"></i>
            <div>
              <h4 className="chatbot-title">ogeduAI Chatbot</h4>
              <span className="chatbot-status"><span className="status-dot"></span> Offline Assistant</span>
            </div>
          </div>
          <button className="chatbot-close-btn" onClick={handleOpenToggle}>
            <i className="fa-solid fa-minus"></i>
          </button>
        </div>

        {/* Messages Body */}
        <div className="chatbot-body">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-bubble-row ${msg.sender === 'user' ? 'user-row' : 'bot-row'}`}>
              {msg.sender === 'bot' && (
                <div className="bot-avatar">
                  <i className="fa-solid fa-robot"></i>
                </div>
              )}
              <div className="chat-bubble">
                {formatMessageText(msg.text)}
                
                {msg.hasBanner && (
                  <div className="chatbot-banner-links">
                    <a 
                      href="https://chat.whatsapp.com/GTn0Gy3B7yx6Nz0SueAslo" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="chatbot-banner-btn wa"
                    >
                      <i className="fa-brands fa-whatsapp"></i> Join WhatsApp Community
                    </a>
                    <a 
                      href="https://www.instagram.com/channel/Abb29FGW0tAjvv9F/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="chatbot-banner-btn ig"
                    >
                      <i className="fa-brands fa-instagram"></i> Follow Instagram Channel
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Suggestion Chips */}
        <div className="chatbot-suggestions">
          {SUGGESTIONS.map((sug) => (
            <button 
              key={sug.id} 
              className="chatbot-suggestion-chip"
              onClick={() => handleSendMessage(sug.text)}
            >
              {sug.label}
            </button>
          ))}
        </div>

        {/* Input Footer */}
        <div className="chatbot-footer">
          <input 
            type="text" 
            placeholder="Type a message (e.g. docs, hostel)..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className="chatbot-send-btn" onClick={() => handleSendMessage()}>
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </>
  );
}

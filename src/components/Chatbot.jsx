import React, { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import './Chatbot.css';

const EMAILJS_CONFIG = {
  publicKey: "Ou_qu_feu12sSNEkc",
  serviceId: "service_tpuqps7",
  templateId: "template_ln9myvv",
};
const PRIMARY_EMAIL = "tkinfotechsoft@gmail.com";

const rules = [
  {
    keywords: ['service', 'web', 'app', 'erp', 'resume', 'ats'],
    response: 'We offer services in Web Development, App Development, ERP, Resume Guidance, and ATS support. Please visit our Services page for more details.'
  },
  {
    keywords: ['project', 'full stack', 'cloud', 'ui', 'ux'],
    response: 'We provide hands-on projects in Full Stack Development, UI/UX, Cloud, and Digital Careers. Check out our Projects page for more information.'
  },
  {
    keywords: ['about', 'mc', 'tech', 'mc-tech'],
    response: 'TK-INFOTECHSOFT is a training partner of MC-TECH Industrial School. We help students build job-ready tech skills. See our About page to learn more.'
  },
  {
    keywords: ['contact', 'location', 'phone', 'support'],
    response: 'You can reach out to us via our Contact page for course, service, and quick support.'
  },
  {
    keywords: ['course', 'training', 'learn', 'student'],
    response: 'We offer career-focused IT training to help students and fresh graduates build job-ready tech skills. Contact us to enroll!'
  },
  {
    keywords: ['hi', 'hello', 'hey', 'greetings'],
    response: 'Hello there! I am the TK-INFOTECHSOFT assistant. How can I help you today? You can ask me about our services, courses, or type "enquiry" to submit a quick enquiry.'
  }
];

const getBotResponse = (text) => {
  const lowerText = text.toLowerCase();
  for (const rule of rules) {
    if (rule.keywords.some(kw => lowerText.includes(kw))) {
      return rule.response;
    }
  }
  return "I'm sorry, I couldn't understand that. Could you please specify if you're looking for Services, Projects, Courses, or if you want to submit an 'enquiry'?";
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! I am the TK-INFOTECHSOFT assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  
  // States for conversational form
  const [enquiryState, setEnquiryState] = useState('IDLE'); // IDLE, AWAITING_NAME, AWAITING_EMAIL, AWAITING_MESSAGE
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    const userMessage = { sender: 'user', text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Conversational Form Handling
    if (enquiryState === 'AWAITING_NAME') {
      setFormData(prev => ({ ...prev, name: text }));
      setEnquiryState('AWAITING_EMAIL');
      setTimeout(() => {
        setMessages(prev => [...prev, { sender: 'bot', text: 'Thanks. Please enter your email address:' }]);
      }, 500);
      return;
    }

    if (enquiryState === 'AWAITING_EMAIL') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(text)) {
        setTimeout(() => {
          setMessages(prev => [...prev, { sender: 'bot', text: 'Please enter a valid email address:' }]);
        }, 500);
        return;
      }
      setFormData(prev => ({ ...prev, email: text }));
      setEnquiryState('AWAITING_MESSAGE');
      setTimeout(() => {
        setMessages(prev => [...prev, { sender: 'bot', text: 'Great. What is your enquiry?' }]);
      }, 500);
      return;
    }

    if (enquiryState === 'AWAITING_MESSAGE') {
      const payload = { ...formData, message: text };
      setFormData({ name: '', email: '', message: '' });
      setEnquiryState('IDLE');
      
      setTimeout(() => {
        setMessages(prev => [...prev, { sender: 'bot', text: 'Sending your enquiry...' }]);
        
        const emailBody = `Quick enquiry from Chatbot\n\nName: ${payload.name}\nEmail: ${payload.email}\nEnquiry: ${payload.message}`;
        
        emailjs.send(
          EMAILJS_CONFIG.serviceId,
          EMAILJS_CONFIG.templateId,
          {
            from_name: payload.name,
            email_id: payload.email,
            reply_to: payload.email,
            to_email: PRIMARY_EMAIL,
            message: emailBody,
          },
          { publicKey: EMAILJS_CONFIG.publicKey }
        ).then(() => {
          setMessages(prev => [...prev, { sender: 'bot', text: 'Thanks! Your enquiry has been sent successfully.' }]);
        }).catch((err) => {
          console.error(err);
          setMessages(prev => [...prev, { sender: 'bot', text: 'Sorry, there was an error sending your enquiry via the chat.' }]);
        });
      }, 500);
      return;
    }

    // Checking if user wants to start an enquiry
    if (text.toLowerCase().includes('enquiry') || text.toLowerCase().includes('enquire')) {
      setEnquiryState('AWAITING_NAME');
      setTimeout(() => {
        setMessages(prev => [...prev, { sender: 'bot', text: 'Sure, I can help you submit an enquiry right here. What is your full name?' }]);
      }, 500);
      return;
    }

    // Normal Rule-based response
    setTimeout(() => {
      const botResponse = { sender: 'bot', text: getBotResponse(text) };
      setMessages(prev => [...prev, botResponse]);
    }, 500);
  };

  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h4>TK Assistant</h4>
            <button className="chatbot-close-btn" onClick={() => setIsOpen(false)}>&times;</button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chatbot-message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form className="chatbot-input-form" onSubmit={handleSend}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={enquiryState !== 'IDLE' ? "Type your response..." : "Ask a question..."}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
      <button 
        className="chatbot-toggle-btn" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Chatbot"
      >
        <video 
          src="/ai-chatbot.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline
          className="chatbot-video-icon"
        />
      </button>
    </div>
  );
}

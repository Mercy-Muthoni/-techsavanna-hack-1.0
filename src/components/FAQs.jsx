import React, { useState } from 'react';

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    { q: 'Do I need a team before I register?', a: 'No. Register solo and use the skill‑matching board on Day 1.' },
    { q: 'Is hardware provided on site?', a: 'Starter sensor kits are available to borrow at check‑in.' },
    { q: 'Is the event really in‑person only?', a: 'Yes — fully in‑person at our Nairobi venue.' },
    { q: 'Do I get a certificate?', a: 'Every participant receives a digital certificate.' },
    { q: 'What tech stack can I use?', a: 'Any stack is welcome!' }
  ];

  return (
    <section id="faqs" className="alt">
      <div className="wrap" style={{ maxWidth: '820px' }}>
        <div className="section-head reveal">
          <span className="eyebrow">FAQs</span>
          <h2>Good to know</h2>
        </div>
        <div id="faqList" className="reveal">
          {faqs.map((faq, index) => (
            <div key={index} className={`faq-item ${openIndex === index ? 'open' : ''}`}>
              <button className="faq-q" onClick={() => setOpenIndex(openIndex === index ? -1 : index)}>
                {faq.q}
                <span className="chev">+</span>
              </button>
              <div className="faq-a">
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQs;

import { useState } from "react";
import { faqs } from "../../data/site";
import { ChevronDownIcon } from "../Icon";

export function Faq() {
  // The first question starts open.
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <section className="section faq">
      <div>
        <div className="section-kicker">/ FAQ</div>
        <h2>Straight answers.</h2>
      </div>
      <div className="faq-list">
        {faqs.map((faq, index) => {
          const answerId = `faq-answer-${index}`;
          const isOpen = openIndex === index;
          return (
            <button
              className={isOpen ? "faq-item active" : "faq-item"}
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              aria-controls={answerId}
              key={faq.question}
            >
              <span>
                <strong>{faq.question}</strong>
                <ChevronDownIcon />
              </span>
              <p id={answerId} hidden={!isOpen}>
                {faq.answer}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}

import { useState } from "react";
import type { Campaign, CampaignPath } from "../../data/types";
import { ChevronDownIcon } from "../Icon";

export function CampaignFaq({
  campaign,
  campaignKey,
}: {
  campaign: Campaign;
  campaignKey: CampaignPath;
}) {
  const [openIndex, setOpenIndex] = useState(0);
  const idPrefix = campaignKey.slice(1).replace(/-/g, "");
  return (
    <div className="campaign-faq-list">
      {campaign.faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        const answerId = `${idPrefix}-campaign-faq-${index}`;
        return (
          <div className="campaign-faq-item" key={faq.question}>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={answerId}
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
            >
              <span>{faq.question}</span>
              <ChevronDownIcon />
            </button>
            <div id={answerId} hidden={!isOpen}>
              <p>{faq.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

import { useLocation } from "react-router-dom";
import { campaigns } from "../data/campaigns";
import type { CampaignPath } from "../data/types";
import { Layout } from "../components/Layout";
import { ContactForm } from "../components/ContactForm";
import {
  ArrowIcon,
  CheckIcon,
  ShieldIcon,
  SparkIcon,
} from "../components/Icon";
import { CampaignVisual } from "../components/campaign/CampaignVisual";
import { CampaignFaq } from "../components/campaign/CampaignFaq";

export function CampaignPage() {
  const { pathname } = useLocation();
  const campaignKey: CampaignPath =
    pathname in campaigns ? (pathname as CampaignPath) : "/ai-automation";
  const campaign = campaigns[campaignKey];
  return (
    <Layout
      focused={true}
      title={campaign.metaTitle}
      description={campaign.metaDescription}
    >
      <article className={`campaign campaign-${campaign.theme}`}>
        <section className="campaign-hero">
          <div className="campaign-copy">
            <div className="eyebrow">
              <SparkIcon /> {campaign.eyebrow}
            </div>
            <h1>{campaign.title}</h1>
            <p>{campaign.lead}</p>
            <div className="campaign-actions">
              <a href="#campaign-contact" className="button primary">
                {"Request my opportunity map "}
                <ArrowIcon />
              </a>
              <span>Founder-led from first map through launch</span>
            </div>
            <div className="trust-line">
              <span>
                <CheckIcon />
                {" Built around your current tools"}
              </span>
              <span>
                <CheckIcon />
                {" Human review stays visible"}
              </span>
            </div>
          </div>
          <CampaignVisual campaign={campaign} />
        </section>
        <div className="campaign-outcomes" aria-label="Campaign outcomes">
          {campaign.outcomes.map((outcome) => (
            <span key={outcome}>
              <i /> {outcome}
            </span>
          ))}
        </div>
        <section className="campaign-problem-section">
          <div className="campaign-section-intro">
            <span className="section-kicker">/ THE OPERATIONAL DRAG</span>
            <h2>{campaign.problem.title}</h2>
            <p>{campaign.problem.text}</p>
          </div>
          <div className="campaign-friction-list">
            {campaign.problem.points.map((item, index) => (
              <div key={item}>
                <span>0{index + 1}</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="campaign-use-cases">
          <div className="campaign-section-heading">
            <div>
              <span className="section-kicker">/ WHAT THIS CAN LOOK LIKE</span>
              <h2>Build around the work, not the novelty.</h2>
            </div>
            <p>
              These are practical starting points. The right first release
              depends on your process, volume, tools, and approval needs.
            </p>
          </div>
          <div className="campaign-use-grid">
            {campaign.useCases.map((item, index) => (
              <article key={item.title}>
                <span>0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="campaign-mechanism">
          <div className="campaign-mechanism-head">
            <span className="section-kicker light">
              / A CONTROLLED PATH FORWARD
            </span>
            <h2>Start with one useful path. Prove it before expanding.</h2>
            <p>{campaign.safeguards}</p>
          </div>
          <div className="campaign-mechanism-steps">
            {campaign.mechanism.map((item, index) => (
              <article key={item.title}>
                <span>STEP 0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
          <div className="campaign-mid-cta">
            <div>
              <span>NOT SURE WHERE TO START?</span>
              <strong>{campaign.ctaPrompt}</strong>
            </div>
            <a href="#campaign-contact" className="button primary">
              {"Request my opportunity map "}
              <ArrowIcon />
            </a>
          </div>
        </section>
        <section className="campaign-contact" id="campaign-contact">
          <div className="campaign-contact-copy">
            <span className="section-kicker">/ YOUR OPPORTUNITY MAP</span>
            <h2>What Ocean will map for you</h2>
            <p>
              A concise view of the strongest first opportunity, what it
              touches, and the smallest useful next move.
            </p>
            <div className="campaign-deliverables">
              {campaign.deliverables.map((item, index) => (
                <div key={item}>
                  <span>0{index + 1}</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
            <p className="campaign-scope-note">
              <ShieldIcon />
              {
                " A focused recommendation, not a full unpaid technical architecture."
              }
            </p>
            <div className="campaign-objections">
              <h3>Questions before you request the map</h3>
              <CampaignFaq campaign={campaign} campaignKey={campaignKey} />
            </div>
          </div>
          <div className="campaign-form-wrap">
            <span>TELL US WHERE THE WORK GETS STUCK</span>
            <ContactForm
              compact={true}
              source={campaign.source}
              submitLabel="Request my opportunity map"
            />
          </div>
        </section>
      </article>
    </Layout>
  );
}

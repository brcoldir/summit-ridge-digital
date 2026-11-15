import { tiers } from "../../data/site";

export function HowWeEngage() {
  return (
    <section className="section how-we-engage" id="engage">
      <div className="section-kicker">/ HOW WE ENGAGE</div>
      <div className="section-heading">
        <h2>Three ways to work together.</h2>
        <p>
          Start with a free map of your highest-value opportunity. Move to
          implementation when the path is clear. Keep your system improving with
          ongoing support.
        </p>
      </div>
      <div className="product-tiers">
        {tiers.map((tier) => (
          <article
            className={
              tier.raised ? "product-tier product-tier--raised" : "product-tier"
            }
            key={tier.name}
          >
            <div className="tier-eyebrow">{tier.eyebrow}</div>
            <h3 className="tier-name">{tier.name}</h3>
            <div className="tier-price">{tier.price}</div>
            <p className="tier-price-note">{tier.priceNote}</p>
            <p className="tier-promise">{tier.promise}</p>
            <ul className="tier-deliverables">
              {tier.deliverables.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <a className="button primary full" href="#contact">
              {tier.ctaLabel}
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

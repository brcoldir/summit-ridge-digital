import { services } from "../../data/site";
import { ArrowIcon, Icon } from "../Icon";

export function Services() {
  return (
    <section className="section intro" id="services">
      <div className="section-kicker">/ CORE SOLUTIONS</div>
      <div className="section-heading">
        <h2>Useful AI for the work that needs to move.</h2>
        <p>
          Automation and lead response come first. Websites and custom tools
          support the system when they make the next step clearer.
        </p>
      </div>
      <div className="services-grid">
        {services.map((service) => (
          <article className="service-card" key={service.title}>
            <div className="service-top">
              <span>{service.number}</span>
              <Icon kind={service.icon} />
            </div>
            <h3>{service.title}</h3>
            <p>{service.text}</p>
            <div className="tag-row">
              {service.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <a href="#contact">
              {"Explore this capability "}
              <ArrowIcon />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

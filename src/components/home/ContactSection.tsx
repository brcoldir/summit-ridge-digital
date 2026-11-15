import { site } from "../../data/site";
import { ContactForm } from "../ContactForm";
import { MailIcon } from "../Icon";

export function ContactSection() {
  return (
    <section className="section contact-section" id="contact">
      <div className="contact-copy">
        <div className="section-kicker light">/ START HERE</div>
        <h2>Which workflow is costing you time, leads, or follow-up?</h2>
        <p>
          Request an opportunity map. You will get a practical first workflow,
          the systems involved, and the smallest useful next step.
        </p>
        <a href={`mailto:${site.email}`}>
          <MailIcon /> {site.email}
        </a>
        <div className="availability">
          <i />
          {" Private inquiry. No obligation."}
        </div>
      </div>
      <ContactForm source="Website" submitLabel="Request my opportunity map" />
    </section>
  );
}

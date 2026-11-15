import { LayersIcon, ShieldIcon, TargetIcon } from "../Icon";

export function About() {
  return (
    <section className="section proof" id="about">
      <div className="proof-copy">
        <div className="section-kicker">/ FOUNDER CREDIBILITY</div>
        <h2>One accountable owner from first conversation through launch.</h2>
        <p>
          Ocean brings healthcare and operational technology experience to the
          work without pretending every client has the same needs. Strategy,
          design, automation, and implementation stay connected from day one.
        </p>
        <div className="proof-points">
          <span>
            <TargetIcon />
            {" Weekly progress visibility"}
          </span>
          <span>
            <LayersIcon />
            {" Documentation at handoff"}
          </span>
          <span>
            <ShieldIcon />
            {" Human oversight by design"}
          </span>
        </div>
      </div>
      <div className="quote-card">
        <div className="quote-mark">"</div>
        <div className="section-kicker">Operating principle</div>
        <blockquote>
          The best system is not the one with the most AI. It is the one that
          gives your people more time for work only they can do.
        </blockquote>
        <div className="quote-person">
          <span>OC</span>
          <div>
            <strong>Ocean Coldiron</strong>
            <small>Founder, Summit Ridge Digital</small>
          </div>
        </div>
      </div>
    </section>
  );
}

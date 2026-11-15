import { Link } from "react-router-dom";
import { site } from "../data/site";
import { Brand } from "./Brand";

function Copyright() {
  return (
    <span>
      {"Copyright "}
      {new Date().getFullYear()}
      {" Summit Ridge Digital. Founded by "}
      <a href="https://oceancoldiron.com">Ocean Coldiron</a>
    </span>
  );
}

function ContactColumn() {
  return (
    <div>
      <span className="footer-label">Contact</span>
      <a href={`mailto:${site.email}`}>{site.email}</a>
      <span>
        {site.location}
        {" and working in the United States"}
      </span>
    </div>
  );
}

/** `focused` renders the simplified campaign footer used on the landing pages. */
export function Footer({ focused = false }: { focused?: boolean }) {
  if (focused) {
    return (
      <footer className="footer campaign-footer">
        <div className="campaign-footer-grid">
          <div>
            <Brand />
            <p>Practical AI systems for service businesses.</p>
          </div>
          <ContactColumn />
          <div>
            <span className="footer-label">Legal</span>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Use</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <Copyright />
          <span>Founder-led and accountable</span>
        </div>
      </footer>
    );
  }

  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <Brand />
          <p>Practical AI systems for service businesses.</p>
        </div>
        <div>
          <span className="footer-label">Explore</span>
          <a href="/#services">Services</a>
          <a href="/#process">Process</a>
          <a href="/#contact">Request an opportunity map</a>
        </div>
        <div>
          <span className="footer-label">Campaigns</span>
          <Link to="/ai-automation">AI automation</Link>
          <Link to="/ai-lead-systems">AI lead systems</Link>
          <Link to="/ai-websites">AI websites</Link>
        </div>
        <ContactColumn />
      </div>
      <div className="footer-bottom">
        <Copyright />
        <span>
          <Link to="/privacy">Privacy Policy</Link>{" "}
          <Link to="/terms">Terms of Use</Link>
        </span>
      </div>
    </footer>
  );
}

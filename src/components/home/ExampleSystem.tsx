import { BrainIcon, DatabaseIcon, MessageIcon, TargetIcon } from "../Icon";

// Icons for the four checkpoint rows, in order.
const checkpointIcons = [MessageIcon, DatabaseIcon, BrainIcon, TargetIcon];

export function ExampleSystem() {
  return (
    <section className="section systems" id="systems">
      <div className="section-kicker light">/ EXAMPLE SYSTEM</div>
      <div className="section-heading light">
        <h2>A practical system with clear checkpoints.</h2>
        <p>
          Here is a practical lead workflow. It keeps context moving while
          showing where a person reviews, approves, and handles exceptions.
        </p>
      </div>
      <div className="system-showcase">
        <div className="showcase-main">
          <div className="showcase-label">EXAMPLE WORKFLOW</div>
          <h3>From inquiry to the right next conversation.</h3>
          <p>
            Capture the intake, enrich the context, draft an approved response,
            route the handoff, and update the CRM without hiding the work from
            your team.
          </p>
          <div className="metric-row">
            <div>
              <strong>Intake</strong>
              <span>capture context</span>
            </div>
            <div>
              <strong>Approval</strong>
              <span>review responses</span>
            </div>
            <div>
              <strong>Routing</strong>
              <span>update the CRM</span>
            </div>
          </div>
        </div>
        <div className="workflow-demo">
          <div className="workflow-head">
            <span>SYSTEM CHECKPOINTS</span>
            <span className="status">
              <i />
              {" Human checkpoints"}
            </span>
          </div>
          {[
            "New inquiry captured",
            "Context enriched",
            "Approved response drafted",
            "Qualified lead routed",
          ].map((label, index) => {
            const RowIcon = checkpointIcons[index];
            return (
              <div className="workflow-row" key={label}>
                <span className="workflow-icon">
                  <RowIcon />
                </span>
                <span>{label}</span>
                <small>0{index + 1}</small>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

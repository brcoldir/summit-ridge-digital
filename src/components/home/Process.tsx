import { processSteps } from "../../data/site";

export function Process() {
  return (
    <section className="section process-section" id="process">
      <div className="section-kicker">/ PROCESS</div>
      <div className="section-heading">
        <h2>Clarity first. Practical progress next.</h2>
        <p>
          You get direct communication, visible progress, and a build designed
          around how the work actually happens.
        </p>
      </div>
      <div className="steps">
        {processSteps.map((step) => (
          <article key={step.number}>
            <span>{step.number}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

import { ArrowIcon, SparkIcon } from "../Icon";

export function Commitments() {
  return (
    <section className="section reviews">
      <div className="section-kicker">/ BUILD COMMITMENTS</div>
      <div className="review-placeholder">
        <div>
          <SparkIcon />
          <h2>What every build should include.</h2>
        </div>
        <p>
          Defined success criteria, visible human oversight, documented handoff,
          and launch support. We publish proof when it is verified, not as
          anonymous filler.
        </p>
        <a href="#contact">
          {"Request my opportunity map "}
          <ArrowIcon />
        </a>
      </div>
    </section>
  );
}

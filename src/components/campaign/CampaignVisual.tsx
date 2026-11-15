import type { Campaign } from "../../data/types";
import { ArrowIcon, ShieldIcon } from "../Icon";

export function CampaignVisual({ campaign }: { campaign: Campaign }) {
  const { visual } = campaign;
  return (
    <div className="campaign-visual" aria-label={visual.title}>
      <div className="campaign-visual-head">
        <span>{visual.label}</span>
        <i>
          <span />
          {" READY TO MAP"}
        </i>
      </div>
      <h2>{visual.title}</h2>
      <div className="campaign-visual-path">
        {visual.nodes.map((node, index) => (
          <div className="campaign-visual-node" key={node}>
            <span>0{index + 1}</span>
            <strong>{node}</strong>
            {index < visual.nodes.length - 1 && <ArrowIcon />}
          </div>
        ))}
      </div>
      <p>
        <ShieldIcon /> {visual.footer}
      </p>
    </div>
  );
}

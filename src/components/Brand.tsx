import { Link } from "react-router-dom";
import { MountainIcon } from "./Icon";

export function Brand() {
  return (
    <Link className="brand" to="/" aria-label="Summit Ridge Digital home">
      <span className="brand-mark">
        <MountainIcon />
      </span>
      <span>
        SUMMIT RIDGE
        <small>DIGITAL / AI SYSTEMS</small>
      </span>
    </Link>
  );
}

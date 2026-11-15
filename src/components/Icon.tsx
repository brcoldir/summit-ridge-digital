export type IconKind =
  | "arrow"
  | "check"
  | "down"
  | "menu"
  | "x"
  | "mail"
  | "spark"
  | "workflow"
  | "target"
  | "code"
  | "brain"
  | "database"
  | "shield"
  | "layers"
  | "bolt"
  | "message"
  | "mountain";

type IconProps = { kind: IconKind; className?: string };

function paths(kind: IconKind) {
  switch (kind) {
    case "arrow":
      return (
        <>
          <path d="M5 12h14" />
          <path d="m14 7 5 5-5 5" />
        </>
      );
    case "check":
      return <path d="m5 12 4 4L19 6" />;
    case "down":
      return <path d="m6 9 6 6 6-6" />;
    case "menu":
      return <path d="M4 7h16M4 12h16M4 17h16" />;
    case "x":
      return <path d="m6 6 12 12M18 6 6 18" />;
    case "mail":
      return (
        <>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </>
      );
    case "spark":
      return (
        <>
          <path d="m12 3 1.4 4.6L18 9l-4.6 1.4L12 15l-1.4-4.6L6 9l4.6-1.4Z" />
          <path d="m19 15 .7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7Z" />
        </>
      );
    case "workflow":
      return (
        <>
          <rect x="3" y="3" width="6" height="6" rx="1" />
          <rect x="15" y="15" width="6" height="6" rx="1" />
          <path d="M9 6h4a4 4 0 0 1 4 4v5M15 18h-4a4 4 0 0 1-4-4V9" />
        </>
      );
    case "target":
      return (
        <>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="3" />
          <path d="m14 10 6-6" />
        </>
      );
    case "code":
      return <path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 4l-4 16" />;
    case "brain":
      return (
        <path d="M9 5a3 3 0 0 0-5 2v2a3 3 0 0 0 0 6v2a3 3 0 0 0 5 2M15 5a3 3 0 0 1 5 2v2a3 3 0 0 1 0 6v2a3 3 0 0 1-5 2M9 5v14M15 5v14M9 9h6M9 15h6" />
      );
    case "database":
      return (
        <>
          <ellipse cx="12" cy="5" rx="8" ry="3" />
          <path d="M4 5v7c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12v7c0 1.7 3.6 3 8 3s8-1.3 8-3v-7" />
        </>
      );
    case "shield":
      return (
        <>
          <path d="M12 3 20 6v6c0 5-3.4 8-8 9-4.6-1-8-4-8-9V6Z" />
          <path d="m8.5 12 2.2 2.2 4.8-5" />
        </>
      );
    case "layers":
      return (
        <>
          <path d="m12 3 9 5-9 5-9-5Z" />
          <path d="m3 12 9 5 9-5M3 16l9 5 9-5" />
        </>
      );
    case "bolt":
      return <path d="m13 2-9 12h7l-1 8 9-12h-7Z" />;
    case "message":
      return (
        <>
          <path d="M4 4h16v12H8l-4 4Z" />
          <path d="M8 9h8M8 12h5" />
        </>
      );
    case "mountain":
    default:
      return (
        <>
          <path d="M4 17 10 7l3 5 2-3 5 8" />
          <path d="M4 20h16" />
        </>
      );
  }
}

export function Icon({ kind, className = "" }: IconProps) {
  return (
    <svg
      className={`ui-icon ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths(kind)}
    </svg>
  );
}

type NamedIconProps = { className?: string };
const named = (kind: IconKind) => (props: NamedIconProps) => (
  <Icon kind={kind} {...props} />
);

export const ArrowIcon = named("arrow");
export const BrainIcon = named("brain");
export const CheckIcon = named("check");
export const ChevronDownIcon = named("down");
export const DatabaseIcon = named("database");
export const TargetIcon = named("target");
export const LayersIcon = named("layers");
export const MailIcon = named("mail");
export const MenuIcon = named("menu");
export const MessageIcon = named("message");
export const MountainIcon = named("mountain");
export const WorkflowIcon = named("workflow");
export const ShieldIcon = named("shield");
export const SparkIcon = named("spark");
export const CloseIcon = named("x");
export const BoltIcon = named("bolt");

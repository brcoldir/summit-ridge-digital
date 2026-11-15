// First-touch campaign attribution, stored per browser session and sent with contact form submissions.

const STORAGE_KEY = "summit-ridge-first-touch";
const TRACKED_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "fbclid",
];
const MAX_LENGTH = 500;
const ALLOWED_KEYS = new Set([...TRACKED_PARAMS, "landing_path", "referrer"]);

export type Attribution = Record<string, string>;

function clean(value: string | null | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed && trimmed.length <= MAX_LENGTH ? trimmed : undefined;
}

function paramsFrom(search: string): Attribution {
  const params = new URLSearchParams(search);
  return Object.fromEntries(
    TRACKED_PARAMS.flatMap((key) => {
      const value = clean(params.get(key));
      return value ? [[key, value]] : [];
    }),
  );
}

function validate(value: unknown): Attribution | undefined {
  if (!value || typeof value !== "object" || Array.isArray(value)) return;
  const result: Attribution = {};
  for (const [key, raw] of Object.entries(value)) {
    if (!ALLOWED_KEYS.has(key) || typeof raw !== "string") return;
    const trimmed = raw.trim();
    if (trimmed.length > MAX_LENGTH) return;
    if (trimmed || key === "referrer") result[key] = trimmed;
  }
  return result;
}

function readStored(): Attribution | undefined {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    return stored ? validate(JSON.parse(stored)) : undefined;
  } catch {
    return;
  }
}

/** Returns the session's first-touch attribution, capturing it from the current URL on first call. */
export function getFirstTouchAttribution(
  search: string,
  pathname: string,
  referrer: string,
): Attribution {
  const stored = readStored();
  if (stored) return stored;
  const landingPath = clean(pathname);
  const attribution: Attribution = {
    ...paramsFrom(search),
    ...(landingPath ? { landing_path: landingPath } : {}),
    referrer: clean(referrer) || "",
  };
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    // Storage can be unavailable (private mode, blocked cookies). Attribution still goes with this submission.
  }
  return attribution;
}

export function newSubmissionId(): string {
  return `lead_${globalThis.crypto?.randomUUID?.() || `${Date.now()}_${Math.random().toString(36).slice(2)}`}`;
}

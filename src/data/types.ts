import type { IconKind } from "../components/Icon";

export type Service = {
  icon: IconKind;
  number: string;
  title: string;
  text: string;
  tags: string[];
};

export type ProcessStep = { number: string; title: string; text: string };

export type Faq = { question: string; answer: string };

export type Tier = {
  eyebrow: string;
  name: string;
  price: string;
  priceNote: string;
  promise: string;
  deliverables: string[];
  ctaLabel: string;
  raised?: boolean;
};

export type CampaignPath =
  "/ai-automation" | "/ai-lead-systems" | "/ai-websites";

export type Campaign = {
  theme: "automation" | "leads" | "websites";
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  lead: string;
  outcomes: string[];
  problem: { title: string; text: string; points: string[] };
  visual: { label: string; title: string; nodes: string[]; footer: string };
  useCases: { title: string; text: string }[];
  deliverables: string[];
  mechanism: { title: string; text: string }[];
  ctaPrompt: string;
  safeguards: string;
  faqs: Faq[];
  /** Sent with contact form submissions so inquiries show which page they came from. */
  source: string;
};

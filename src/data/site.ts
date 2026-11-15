import type { Faq, ProcessStep, Service, Tier } from "./types";

export const site = {
  email: "ocean@summitridgedigital.com",
  location: "South Bend, Indiana",
  heroTitle: "AI systems that move your service business forward.",
  heroLead:
    "We build practical automations, lead-response systems, and conversion-focused websites around the tools your team already uses.",
} as const;

export const services: Service[] = [
  {
    icon: "workflow",
    number: "01",
    title: "AI workflow automation",
    text: "Remove repetitive work with reliable workflows that connect your tools, move information, and keep your team in control.",
    tags: ["Operations", "Integrations", "Approvals"],
  },
  {
    icon: "target",
    number: "02",
    title: "Lead-response systems",
    text: "Capture, qualify, route, and follow up on inquiries with approved steps your team can trust.",
    tags: ["Intake", "Follow-up", "CRM"],
  },
  {
    icon: "code",
    number: "03",
    title: "Conversion-focused websites",
    text: "Build clear websites and campaign pages around one audience, one offer, and one useful next action.",
    tags: ["Web design", "Landing pages", "Measurement"],
  },
  {
    icon: "brain",
    number: "04",
    title: "Custom internal AI tools",
    text: "Create focused tools for knowledge, service delivery, and internal handoffs when off-the-shelf software is not enough.",
    tags: ["Knowledge", "Portals", "Custom apps"],
  },
];

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Diagnose",
    text: "Map the costly workflow, the people involved, and the handoffs that matter.",
  },
  {
    number: "02",
    title: "Design",
    text: "Define the smallest useful release, clear guardrails, and a practical success measure.",
  },
  {
    number: "03",
    title: "Build and validate",
    text: "Build in focused sprints and validate real scenarios with the people who will use it.",
  },
  {
    number: "04",
    title: "Launch and improve",
    text: "Document the system, support the launch, and improve the next constraint with intent.",
  },
];

export const faqs: Faq[] = [
  {
    question: "Who is a good fit for an opportunity map?",
    answer:
      "Owner-led and operator-led service businesses with recurring administrative work, lead follow-up needs, or disconnected tools are usually a strong fit.",
  },
  {
    question: "What happens in the opportunity map?",
    answer:
      "We identify the strongest first workflow, the manual work or missed handoff it addresses, the systems involved, the smallest useful release, and a practical next step.",
  },
  {
    question: "How long does implementation take?",
    answer:
      "Timing depends on the workflow and integrations. We scope the smallest useful release first, then share a clear plan before work begins.",
  },
  {
    question: "Can you work with the tools we already use?",
    answer:
      "Usually. We start with the tools, data, and habits your team already relies on, then recommend a change only when there is a clear reason.",
  },
  {
    question: "Where does human oversight fit?",
    answer:
      "Important decisions, approvals, and exceptions stay visible. We design human review into the workflow instead of treating it as an afterthought.",
  },
  {
    question: "What support is available after launch?",
    answer:
      "Every build includes documentation and launch support. Ongoing improvement and additional workflow work can continue as a focused partnership.",
  },
];

export const tiers: Tier[] = [
  {
    eyebrow: "Start here",
    name: "AI Opportunity Map",
    price: "Free",
    priceNote: "No obligation. No commitment.",
    promise:
      "We identify your strongest first workflow to improve and map a practical path to automate it.",
    deliverables: [
      "Your highest-value workflow to address first",
      "The manual work, missed handoff, or bottleneck it targets",
      "The systems and data involved",
      "The smallest useful first release and next step",
    ],
    ctaLabel: "Request yours free",
  },
  {
    eyebrow: "Implementation",
    name: "AI Automation Sprint",
    price: "$10,000 to $30,000",
    priceNote: "Pricing varies based on your specific problem.",
    promise: "One clearly defined workflow. Working software. Measured result.",
    deliverables: [
      "Scoped to a single high-value process",
      "4 to 8 week delivery",
      "Human approval and exception handling built in",
      "Documentation and handoff session included",
    ],
    ctaLabel: "Start with the opportunity map",
    raised: true,
  },
  {
    eyebrow: "Ongoing",
    name: "Summit Ridge Managed AI",
    price: "$1,000 to $5,000/month",
    priceNote: "Pricing varies based on scope.",
    promise:
      "We keep your system running, improving, and adapting as your business evolves.",
    deliverables: [
      "Monitoring and failure response",
      "Prompt, model, and API maintenance",
      "Minor enhancements and usage optimization",
      "Monthly progress visibility",
    ],
    ctaLabel: "Ask about ongoing support",
  },
];

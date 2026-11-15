import type { Campaign, CampaignPath } from "./types";

export const campaigns: Record<CampaignPath, Campaign> = {
  "/ai-automation": {
    theme: "automation",
    metaTitle:
      "AI Workflow Automation for Service Businesses | Summit Ridge Digital",
    metaDescription:
      "Turn recurring operations into clear, controlled AI workflows with visible approvals, exception handling, and documented handoffs.",
    eyebrow: "AI automation for service businesses",
    title:
      "Turn recurring operations into a workflow your team can see and control.",
    lead: "Connect the repeatable handoffs, updates, reports, and follow-up work that pull your team away from clients. Keep approvals and exceptions visible.",
    outcomes: [
      "Less manual transfer",
      "Clear exception paths",
      "Visible ownership",
      "Documented handoff",
    ],
    problem: {
      title: "Manual coordination is hiding inside everyday work.",
      text: "A process can look simple from the outside while your team quietly copies data, rebuilds updates, and checks several systems to keep it moving.",
      points: [
        "Information is copied between tools by hand",
        "Routine updates start from scratch each time",
        "Follow-up depends on someone remembering the next step",
      ],
    },
    visual: {
      label: "CONTROLLED WORKFLOW",
      title: "One visible path through the work",
      nodes: [
        "Request received",
        "Rules and context checked",
        "Human approval if needed",
        "Systems updated",
      ],
      footer: "Exceptions route to an owner instead of disappearing.",
    },
    useCases: [
      {
        title: "Move information between the tools you already use",
        text: "Reduce duplicate entry while keeping a clear source of truth.",
      },
      {
        title: "Prepare a routine client update from approved source data",
        text: "Assemble the right inputs into a consistent draft for review.",
      },
      {
        title: "Route internal requests with context attached",
        text: "Send the task, source details, and owner to the same place.",
      },
      {
        title: "Flag exceptions before a handoff stalls",
        text: "Make unusual cases visible so a person can decide what happens next.",
      },
    ],
    deliverables: [
      "The strongest first workflow to improve",
      "The manual handoffs, systems, and data involved",
      "A practical first release with approval points",
    ],
    mechanism: [
      {
        title: "Choose the first workflow",
        text: "Start with work that repeats, has clear inputs, and creates an obvious operational drag.",
      },
      {
        title: "Design the control points",
        text: "Define the rules, owners, approvals, and exceptions before connecting anything.",
      },
      {
        title: "Build and validate the path",
        text: "Test real scenarios with your team, document the workflow, and improve it with intent.",
      },
    ],
    ctaPrompt: "Ocean will help identify the first workflow worth improving.",
    safeguards:
      "Automation does the repeatable coordination. Your team keeps judgment, approval, and exception handling where they belong.",
    faqs: [
      {
        question: "What if our process changes from case to case?",
        answer:
          "We separate the repeatable path from the exceptions. Variable cases can pause for review, route to an owner, or follow a different approved branch.",
      },
      {
        question: "Do we need to replace our current software?",
        answer:
          "Usually not. The opportunity map starts with the tools your team already uses and identifies where a connection or focused change would help.",
      },
      {
        question: "Will automation replace our team?",
        answer:
          "The goal is to remove repetitive coordination so your team can spend more time on judgment, service, and relationships.",
      },
    ],
    source: "AI Automation landing page",
  },
  "/ai-lead-systems": {
    theme: "leads",
    metaTitle:
      "AI Lead-Response Systems for Service Businesses | Summit Ridge Digital",
    metaDescription:
      "Capture, qualify, route, and follow up on service-business inquiries with approved messaging, useful context, and visible human oversight.",
    eyebrow: "AI lead-response systems",
    title: "Give every qualified inquiry a clear, consistent next step.",
    lead: "Create a reliable path from first contact to the right conversation. Keep approved messaging, qualification, routing, and CRM context connected.",
    outcomes: [
      "Consistent first touch",
      "Useful lead context",
      "Clear routing rules",
      "Visible follow-up",
    ],
    problem: {
      title: "Lead follow-up breaks when context lives in too many places.",
      text: "The form is only the beginning. Inquiries lose momentum when details stay in an inbox, ownership is unclear, or the next action depends on manual copying.",
      points: [
        "New inquiries arrive with incomplete context",
        "First responses vary by who sees the message",
        "Routing and CRM updates happen after the fact",
      ],
    },
    visual: {
      label: "SAMPLE LEAD JOURNEY",
      title: "From inquiry to the right owner",
      nodes: [
        "Inquiry captured",
        "Context enriched",
        "Approved response drafted",
        "Qualified lead routed",
      ],
      footer: "A person can approve, edit, or take over at defined points.",
    },
    useCases: [
      {
        title: "Capture the details your team actually needs",
        text: "Shape intake around the questions that affect fit, routing, and next steps.",
      },
      {
        title: "Draft an approved first response with the right context",
        text: "Use your reviewed language while leaving judgment calls visible.",
      },
      {
        title: "Enrich and qualify inquiries for review",
        text: "Bring useful context together before a lead reaches the right owner.",
      },
      {
        title: "Update the CRM and assign follow-up",
        text: "Keep the record, owner, and next task aligned after the handoff.",
      },
    ],
    deliverables: [
      "The lead journey from intake to owner",
      "Approved response, routing, and escalation points",
      "A focused first release using your current stack",
    ],
    mechanism: [
      {
        title: "Map the lead journey",
        text: "Trace what happens from first inquiry through qualification, ownership, and follow-up.",
      },
      {
        title: "Set the response guardrails",
        text: "Define approved language, fit signals, routing rules, and the moments that need a person.",
      },
      {
        title: "Connect and validate the handoff",
        text: "Test real lead scenarios before the system supports live traffic.",
      },
    ],
    ctaPrompt:
      "Ocean will help identify the first lead handoff worth improving.",
    safeguards:
      "Your team controls approved language, qualification signals, routing rules, and every point where a person needs to step in.",
    faqs: [
      {
        question: "Will the system send messages without our approval?",
        answer:
          "Only if that is the approved design. It can draft for review, send a tightly controlled response, or route the inquiry without messaging at all.",
      },
      {
        question: "Can this work with our existing CRM?",
        answer:
          "Often, yes. We first map the CRM, forms, inboxes, scheduling tools, and current handoffs to find the smallest useful connection.",
      },
      {
        question: "Does this guarantee more closed business?",
        answer:
          "No. The system is designed to make response and handoff more consistent. Sales outcomes still depend on fit, offer, market, and the conversations your team has.",
      },
    ],
    source: "AI Lead Systems landing page",
  },
  "/ai-websites": {
    theme: "websites",
    metaTitle:
      "AI Websites and Landing Pages for Service Businesses | Summit Ridge Digital",
    metaDescription:
      "Build message-matched websites and landing pages that connect paid traffic to a focused, measurable path to inquiry.",
    eyebrow: "AI websites and campaign pages",
    title: "Turn paid attention into a measurable path to inquiry.",
    lead: "Build a focused website or landing page around one audience, one offer, and one useful next action. Add the measurement foundation before traffic arrives.",
    outcomes: [
      "Message-matched pages",
      "Focused next action",
      "Useful intake",
      "Measurement foundation",
    ],
    problem: {
      title: "A good-looking site can still leave the next step unclear.",
      text: "Paid traffic needs more than polish. The page has to continue the ad message, explain the offer quickly, answer the right objections, and make response measurable.",
      points: [
        "The headline does not match the ad that earned the click",
        "Several competing actions dilute the main offer",
        "Form submissions arrive without useful campaign context",
      ],
    },
    visual: {
      label: "CAMPAIGN PATH",
      title: "One message from click to inquiry",
      nodes: [
        "Focused ad",
        "Matched landing page",
        "Useful next action",
        "Attributed inquiry",
      ],
      footer: "The page, form, and source data support the same decision.",
    },
    useCases: [
      {
        title: "One clear audience, offer, and next action",
        text: "Give the right prospect a simple path through the page.",
      },
      {
        title: "Match each campaign page to its ad and audience",
        text: "Continue the promise and language that earned the visit.",
      },
      {
        title: "Collect useful intake without adding friction",
        text: "Ask for the context needed to respond and route the inquiry.",
      },
      {
        title: "Create the foundation for measurement",
        text: "Preserve campaign attribution and define the actions worth tracking.",
      },
    ],
    deliverables: [
      "The clearest audience, offer, and page objective",
      "The message, page, form, and measurement gaps",
      "A focused first release for the traffic you plan to run",
    ],
    mechanism: [
      {
        title: "Clarify the conversion path",
        text: "Choose the audience, offer, and single action the page needs to support.",
      },
      {
        title: "Build the message and experience",
        text: "Connect the ad promise, page hierarchy, proof, objections, and intake flow.",
      },
      {
        title: "Launch with measurement ready",
        text: "Validate the responsive page, preserve attribution, and define what to learn next.",
      },
    ],
    ctaPrompt:
      "Ocean will help identify the first page or campaign path worth improving.",
    safeguards:
      "We define the page objective and measurement plan before visual polish, automation, or additional features enter the build.",
    faqs: [
      {
        question: "Do we need a full website rebuild?",
        answer:
          "Not necessarily. A focused landing page can support a campaign while the current site stays in place, or it can become the first part of a broader rebuild.",
      },
      {
        question: "Can you build the page before our ads are final?",
        answer:
          "Yes, as long as the audience and offer are clear enough to align the page. Final ad language should be checked against the landing page before launch.",
      },
      {
        question: "What measurement is included?",
        answer:
          "We establish the page and form structure needed for useful attribution and conversion events. Account IDs and advertising pixels are added only when you provide them.",
      },
    ],
    source: "AI Websites landing page",
  },
};

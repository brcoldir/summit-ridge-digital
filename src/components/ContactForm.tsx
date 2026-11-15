import { useState, type ChangeEvent, type FormEvent } from "react";
import { site } from "../data/site";
import { getFirstTouchAttribution, newSubmissionId } from "../lib/attribution";
import { ArrowIcon, CheckIcon, ShieldIcon } from "./Icon";

// API Gateway endpoint for the contact Lambda (see lambda-contact/). Override with VITE_CONTACT_ENDPOINT.
const CONTACT_ENDPOINT =
  import.meta.env.VITE_CONTACT_ENDPOINT ||
  "https://ipcg6bb9f1.execute-api.us-east-1.amazonaws.com/summitridgecontactstage/contact";

type Status = "idle" | "invalid" | "sending" | "sent" | "error";

type ContactFormProps = {
  compact?: boolean;
  /** Identifies the page the inquiry came from, for example "Website" or "AI Automation landing page". */
  source: string;
  submitLabel: string;
};

const emptyForm = {
  name: "",
  email: "",
  company: "",
  challenge: "",
  website: "",
};

export function ContactForm({
  compact = false,
  source,
  submitLabel,
}: ContactFormProps) {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState<Status>("idle");
  const [attribution] = useState(() =>
    getFirstTouchAttribution(
      window.location.search,
      window.location.pathname,
      document.referrer,
    ),
  );
  const [submissionId] = useState(newSubmissionId);

  const update = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.name || !form.email || !form.challenge)
      return setStatus("invalid");
    setStatus("sending");
    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          business: form.company,
          message: form.challenge,
          source,
          website: form.website, // honeypot: real visitors leave this empty
          attribution,
          submission_id: submissionId,
        }),
      });
      if (!response.ok) throw new Error("Contact request failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="form-success" role="status" aria-live="polite">
        <span>
          <CheckIcon />
        </span>
        <h3>Your request is in.</h3>
        <p>Ocean will review it and reply within one business day.</p>
      </div>
    );
  }

  return (
    <form
      className={compact ? "contact-form compact" : "contact-form"}
      onSubmit={submit}
      onInvalidCapture={() => setStatus("invalid")}
    >
      <div className="form-row">
        <label>
          {"Name "}
          <span aria-hidden="true">(required)</span>
          <input
            name="name"
            aria-label="Name, required"
            required
            value={form.name}
            onChange={update}
            placeholder="Your name"
          />
        </label>
        <label>
          {"Work email "}
          <span aria-hidden="true">(required)</span>
          <input
            name="email"
            aria-label="Work email, required"
            required
            type="email"
            value={form.email}
            onChange={update}
            placeholder="you@company.com"
          />
        </label>
      </div>
      <label>
        {"Company "}
        <span aria-hidden="true">(optional)</span>
        <input
          name="company"
          aria-label="Company, optional"
          value={form.company}
          onChange={update}
          placeholder="Company name"
        />
      </label>
      <label>
        {"What process is costing you the most time, leads, or follow-up? "}
        <span aria-hidden="true">(required)</span>
        <textarea
          name="challenge"
          aria-label="What process is costing you the most time, leads, or follow-up?"
          required
          value={form.challenge}
          onChange={update}
          rows={compact ? 3 : 5}
          placeholder="Tell us where time, leads, or opportunities are getting lost..."
        />
      </label>
      <div aria-hidden="true">
        <input
          className="honeypot"
          name="website"
          aria-hidden="true"
          value={form.website}
          onChange={update}
          tabIndex={-1}
          autoComplete="new-password"
        />
      </div>
      <button className="button primary full" disabled={status === "sending"}>
        {status === "sending" ? (
          "Sending..."
        ) : (
          <>
            {submitLabel} <ArrowIcon />
          </>
        )}
      </button>
      {status === "invalid" && (
        <p className="form-note error" role="alert">
          Please add your name, email, and a short project note.
        </p>
      )}
      {status === "error" && (
        <p className="form-note error" role="alert">
          {"We could not send your request. Email us directly at "}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      )}
      <p className="form-note">
        <ShieldIcon />
        {" Private inquiry. No obligation."}
      </p>
    </form>
  );
}

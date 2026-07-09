import React from "react"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { motion } from "framer-motion"
import {
    ArrowRight,
    Check,
    Mountain,
    Shield,
    Zap,
    Phone,
    Mail,
} from "lucide-react"
import "./App.css"

/* ---------- Contact debug helpers ---------- */
async function readResponseBody(resp: Response) {
    const ct = resp.headers.get("content-type") || ""
    try {
        if (ct.includes("application/json")) return await resp.json()
        return await resp.text()
    } catch (e) {
        return { parseError: String(e) }
    }
}

/* ----------------------------------
   Layout Shell
---------------------------------- */

function Shell({ children }: { children: React.ReactNode }) {
    return (
        <div className="app-shell">
            {/* Ambient glow */}
            <div className="bg-glow" aria-hidden="true">
                <div className="bg-glow__top" />
                <div className="bg-glow__bottom" />
            </div>

            <header className="site-header">
                <div className="container header-inner">
                    <Link to="/" className="brand">
                        <Mountain className="brand__icon" />
                        <span className="brand__text">Summit Ridge Digital</span>
                    </Link>

                    <nav className="nav">
                        <a href="#services" className="nav-link">Services</a>
                        <a href="#work" className="nav-link">Work</a>
                        <a href="#pricing" className="nav-link">Pricing</a>
                        <a href="#about" className="nav-link">About</a>
                        <a href="#contact" className="nav-link">Contact</a>
                    </nav>

                    <a href="#contact" className="btn-primary btn-primary--sm">
                        Get a Quote <ArrowRight className="icon-sm" />
                    </a>
                </div>
            </header>

            <main className="main">{children}</main>

            <footer className="site-footer">
                <div className="container footer-inner">
                    <div className="footer-left">
                        <Mountain className="footer-icon" />
                        <span>
                            © {new Date().getFullYear()} Summit Ridge Digital · Built by{" "}
                            <a
                                className="footer-link"
                                href="https://oceancoldiron.com"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Ocean
                            </a>
                        </span>
                    </div>
                    <div className="footer-links">
                        <a className="footer-link" href="#pricing">Pricing</a>
                        <a className="footer-link" href="#contact">Get Started</a>
                    </div>
                </div>
            </footer>
        </div>
    )
}

/* ----------------------------------
   Home Page
---------------------------------- */

async function submitContact(payload: {
    name: string
    business: string
    email: string
    phone: string
    message: string
}) {
    const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT

    console.log("[contact] endpoint:", endpoint)
    console.log("[contact] payload keys:", Object.keys(payload))

    let resp = null
    try {
        resp = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        })

        const body = await readResponseBody(resp)

        console.log("[contact] status:", resp.status)
        console.log("[contact] response body:", body)

        if (!resp.ok) {
            throw new Error(
                `HTTP ${resp.status}: ${typeof body === "string" ? body : JSON.stringify(body)
                }`
            )
        }

        return body
    } catch (err) {
        console.error("[contact] submit failed:", err)
        throw err
    }
}

function Home() {
    /* ---------- Contact form state ---------- */
    const [form, setForm] = React.useState({
        name: "",
        business: "",
        email: "",
        phone: "",
        message: "",
        website: "", // honeypot
    })

    const [status, setStatus] = React.useState("idle") // idle | sending | sent | error
    const [error, setError] = React.useState("")

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setStatus("sending")
        setError("")

        if (!form.name || !form.email || !form.message) {
            setStatus("error")
            setError("Please include your name, email, and message.")
            return
        }

        // honeypot
        if (form.website) {
            setStatus("sent")
            return
        }

        try {
            const payload = {
                name: form.name.trim(),
                business: form.business.trim(),
                email: form.email.trim(),
                phone: form.phone.trim(),
                message: form.message.trim(),
            }

            console.log("[contact] submitting payload:", {
                ...payload,
                message: payload.message ? "(present)" : "(missing)",
            })

            const data = await submitContact(payload)

            // expect { ok: true } from Lambda
            if (!data?.ok) throw new Error(data?.error || "Request failed")

            setStatus("sent")
            setForm({
                name: "",
                business: "",
                email: "",
                phone: "",
                message: "",
                website: "",
            })
        } catch {
            setStatus("error")
            setError("Could not send. Please email me directly.")
        }
    }

    return (
        <>
            {/* HERO */}
            <section className="section section-hero">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="grid-2 hero-grid"
                    >
                        <div>
                            <div className="pill">
                                <span className="pill-dot" />
                                Built for small business owners who want a real human
                            </div>

                            <h1 className="heading-xl hero-title">
                                Outdoors-grade websites.
                                <span className="hero-title__accent">
                                    Built fast. Cared for monthly.
                                </span>
                            </h1>

                            <p className="hero-subtitle">
                                One person. One plan. Hosting, updates, fixes, and support included
                                in the <strong>$249/mo Care Plan</strong>.
                            </p>

                            <div className="btn-row">
                                <a href="#contact" className="btn-primary">
                                    Get a Quote <ArrowRight className="icon-sm" />
                                </a>
                                <a href="#work" className="btn-secondary">See Work</a>
                            </div>

                            <div className="hero-bullets">
                                <div className="bullet">
                                    <Zap className="icon-sm bullet-icon" /> Fast turnaround
                                </div>
                                <div className="bullet">
                                    <Shield className="icon-sm bullet-icon" /> Secure + maintained
                                </div>
                                <div className="bullet">
                                    <Check className="icon-sm bullet-icon" /> Mobile-first
                                </div>
                                <div className="bullet">
                                    <Check className="icon-sm bullet-icon" /> Real support
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* SERVICES */}
            <section id="services" className="section">
                <div className="container">
                    <div className="section-head">
                        <div>
                            <h2 className="heading-lg">Services</h2>
                            <p className="lead text-muted">
                                Everything you need to launch and keep your site running—without a big agency bill.
                            </p>
                        </div>
                        <a href="#contact" className="link-cta link-cta--hide-mobile">
                            Get a quote <ArrowRight className="icon-sm" />
                        </a>
                    </div>

                    <div className="grid-3 cards">
                        <div className="panel">
                            <div className="card-title">Web Design + Build</div>
                            <p className="card-desc">
                                Clean, modern, mobile-first sites that feel premium and load fast.
                            </p>
                            <div className="mock">
                                Ideal for service businesses, creators, local brands, and startups.
                            </div>
                        </div>

                        <div className="panel">
                            <div className="card-title">Care Plan ($249/mo)</div>
                            <p className="card-desc">
                                Hosting + updates + fixes + backups. Real support from the person who built it.
                            </p>
                            <div className="mock">
                                “Text me, I’ll fix it.” energy — without the chaos.
                            </div>
                        </div>

                        <div className="panel">
                            <div className="card-title">SEO + Performance</div>
                            <p className="card-desc">
                                Hosting, updates, fixes, backups, and direct support, handled for you.
                            </p>

                            <div className="mock">
                                Calm, responsive support from the person responsible for the build.
                            </div>

                        </div>
                    </div>

                    <div className="care-panel">
                        <div className="care-title">Care Plan includes</div>
                        <div className="care-desc">
                            Hosting, SSL, backups, small edits, performance checks, and ongoing support.
                            If something breaks, you’re not stuck.
                        </div>
                    </div>
                </div>
            </section>

            {/* WORK */}
            <section id="work" className="section">
                <div className="container">
                    <h2 className="heading-lg">Work</h2>
                    <p className="lead text-muted">
                        A few recent builds. Want yours to be next?
                    </p>

                    <div className="grid-2 cards">
                        <div className="panel">
                            <div className="card-title">Summit Ridge Digital</div>
                            <p className="card-desc">
                                Agency homepage + contact flow designed for quick conversions.
                            </p>
                            <a className="link-cta" href="#contact">
                                Build something similar <ArrowRight className="icon-sm" />
                            </a>
                        </div>

                        <div className="panel">
                            <div className="card-title">EZ Post Scheduler</div>
                            <p className="card-desc">
                                Product-style landing experience optimized for clarity and trust.
                            </p>
                            <a className="link-cta" href="#contact">
                                Talk through your project <ArrowRight className="icon-sm" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* PRICING */}
            <section id="pricing" className="section">
                <div className="container">
                    <h2 className="heading-lg">Pricing</h2>
                    <p className="lead text-muted">
                        Premium, calm pricing — clear options, zero surprises.
                    </p>


                    <div className="grid-3 cards">
                        <div className="panel panel-muted">
                            <div className="card-title">Starter</div>
                            <p className="card-desc">
                                One-page site or simple landing page. Great for getting online fast.
                            </p>
                            <div className="price">$1,250+</div>
                            <a href="#contact" className="btn-secondary btn-full" style={{ marginTop: 12 }}>
                                Ask for a quote
                            </a>
                        </div>

                        <div className="panel card--featured">
                            <div className="card-title">Care Plan (Most Popular)</div>
                            <p className="card-desc">
                                Managed hosting, updates, and ongoing support — so you don’t have to think about your website.
                            </p>

                            <div className="price">$249 / mo</div>
                            <div className="list">
                                <div className="list-item"><Check className="icon-sm list-icon" /> Hosting + SSL</div>
                                <div className="list-item"><Check className="icon-sm list-icon" /> Backups</div>
                                <div className="list-item"><Check className="icon-sm list-icon" /> Ongoing content updates</div>
                                <div className="list-item"><Check className="icon-sm list-icon" /> Support + fixes</div>
                            </div>
                            <a href="#contact" className="btn-primary btn-full" style={{ marginTop: 16 }}>
                                Start the Care Plan <ArrowRight className="icon-sm" />
                            </a>
                        </div>

                        <div className="panel panel-muted">
                            <div className="card-title">Partner</div>
                            <p className="card-desc">
                                Premium multi-page builds, integrations, and ongoing improvements for growing businesses.
                            </p>

                            <div className="price">$3,500+</div>
                            <a href="#contact" className="btn-secondary btn-full" style={{ marginTop: 12 }}>
                                Let’s scope it
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* ABOUT */}
            <section id="about" className="section">
                <div className="container">
                    <div className="grid-2">
                        <div className="panel">
                            <div className="about-title">About Summit Ridge Digital</div>
                            <p className="about-text text-muted">
                                I build sites the way I build systems: fast, reliable, and easy to maintain.
                                You’re not buying “a website” — you’re buying a setup you can trust, plus support
                                when you need it.
                            </p>
                            <p className="about-text text-muted">
                                If you want a clean Squarespace-level look, but with real performance and a real
                                developer behind it, this is it.
                            </p>
                        </div>

                        <div className="panel process">
                            <div className="card-title">How it works</div>
                            <ul className="process-list">
                                <li className="process-item">
                                    <span className="step">1</span>
                                    <span>Quick call: goals, vibe, and what “done” looks like.</span>
                                </li>
                                <li className="process-item">
                                    <span className="step">2</span>
                                    <span>Build + polish: mobile-first, fast, and conversion-focused.</span>
                                </li>
                                <li className="process-item">
                                    <span className="step">3</span>
                                    <span>Launch + care: managed hosting, updates, and support on the $249/mo Care Plan.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* CONTACT */}
            <section id="contact" className="section">
                <div className="container">
                    <div className="panel contact">
                        <h2 className="heading-lg">Get started</h2>
                        <p className="lead text-muted">
                            Send a few details and I’ll reply personally.
                        </p>

                        <div className="grid-2 contact-grid">
                            <form className="form" onSubmit={onSubmit}>
                                <Field label="Name" name="name" value={form.name} onChange={onChange} />
                                <Field label="Business name" name="business" value={form.business} onChange={onChange} />
                                <Field label="Email" type="email" name="email" value={form.email} onChange={onChange} />
                                <Field label="Phone" name="phone" value={form.phone} onChange={onChange} />

                                <div className="hp">
                                    <input name="website" value={form.website} onChange={onChange} />
                                </div>

                                <div>
                                    <label className="label">What do you need?</label>
                                    <textarea
                                        className="input textarea"
                                        rows={5}
                                        name="message"
                                        value={form.message}
                                        onChange={onChange}
                                    />
                                </div>

                                <button type="submit" className="btn-primary btn-full" disabled={status === "sending"}>
                                    {status === "sending" ? "Sending..." : "Send request"}{" "}
                                    <ArrowRight className="icon-sm" />
                                </button>

                                {status === "sent" && (
                                    <div className="fineprint">✅ Message sent. I’ll reply soon.</div>
                                )}

                                {status === "error" && (
                                    <div className="fineprint">
                                        ❌ {error || "Please email me directly at brcoldir@gmail.com"}
                                    </div>
                                )}
                            </form>

                            <div className="stack">
                                <div className="panel panel-muted">
                                    <div className="card-title">Direct contact</div>

                                    <div className="contact-line">
                                        <Mail className="icon-sm bullet-icon" />
                                        <a href="mailto:brcoldir@gmail.com">brcoldir@gmail.com</a>
                                    </div>

                                    <div className="contact-line">
                                        <Phone className="icon-sm bullet-icon" />
                                        <a href="tel:+15748065895">(574) 806-5895</a>
                                    </div>
                                </div>

                                <div className="panel panel-muted">
                                    <div className="card-title">What you’ll get</div>
                                    <div className="list">
                                        <div className="list-item"><Check className="icon-sm list-icon" /> A clear plan + timeline</div>
                                        <div className="list-item"><Check className="icon-sm list-icon" /> A site that looks premium</div>
                                        <div className="list-item"><Check className="icon-sm list-icon" /> Ongoing support</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="fineprint text-muted" style={{ marginTop: 14 }}>
                            Prefer email/text? Reach me at <a href="mailto:brcoldir@gmail.com">brcoldir@gmail.com</a> or{" "}
                            <a href="tel:+15748065895">(574) 806-5895</a>.
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

/* ----------------------------------
   Reusable Field
---------------------------------- */

function Field(
    { label, name, value, onChange, type = "text" }: {
        label: string
        name: string
        value: string
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
        type?: React.HTMLInputTypeAttribute
    }
) {
    return (
        <div>
            <label className="label">{label}</label>
            <input
                className="input"
                type={type}
                name={name}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}

/* ----------------------------------
   App Root
---------------------------------- */

export default function App() {
    return (
        <BrowserRouter>
            <Shell>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </Shell>
        </BrowserRouter>
    )
}

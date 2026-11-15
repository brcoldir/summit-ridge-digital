import { useState } from "react";
import { site } from "../data/site";
import { Brand } from "./Brand";
import { ArrowIcon, CloseIcon, MenuIcon } from "./Icon";

/** `focused` renders the slim campaign header used on the landing pages. */
export function Header({ focused = false }: { focused?: boolean }) {
  const [open, setOpen] = useState(false);

  if (focused) {
    return (
      <header className="header campaign-header">
        <div className="nav-wrap">
          <Brand />
          <div className="campaign-header-actions">
            <a
              className="campaign-header-email"
              href={`mailto:${site.email}`}
              aria-label="Email Ocean"
            >
              Email Ocean
            </a>
            <a className="nav-cta" href="#campaign-contact">
              {"Request my opportunity map "}
              <ArrowIcon />
            </a>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="header">
      <div className="nav-wrap">
        <Brand />
        <button
          className="menu-button"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
          aria-expanded={open}
          aria-controls="primary-navigation"
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
        <nav
          id="primary-navigation"
          className={open ? "nav-links open" : "nav-links"}
          onClick={() => setOpen(false)}
        >
          <a href="/#services">Services</a>
          <a href="/#systems">Example system</a>
          <a href="/#process">Process</a>
          <a href="/#about">About</a>
          <a className="nav-cta" href="/#contact">
            {"Request my opportunity map "}
            <ArrowIcon />
          </a>
        </nav>
      </div>
    </header>
  );
}

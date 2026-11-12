"use client";

import { useState } from "react";
import { contact } from "@/content/site";
import { ui, type Lang } from "@/content/i18n";
import { ChatIcon, CheckIcon, CopyIcon, DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon } from "./icons";

/** Every way to reach Choco, one action each. Used in the hero and at the close. */
export default function ContactRail({ lang, size = "default" }: { lang: Lang; size?: "default" | "large" }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      window.location.href = `mailto:${contact.email}`;
    }
  };

  return (
    <div className="contact-rail" data-size={size}>
      <div className="contact-primary">
        <span className="contact-email">
          <a className="action action--fire" href={`mailto:${contact.email}`}>
            <MailIcon />
            <span>{ui.emailMe[lang]}</span>
          </a>
          <button
            type="button"
            className="action action--icon"
            onClick={copy}
            aria-label={`${ui.copyEmail[lang]} ${contact.email}`}
            title={copied ? ui.copied[lang] : `${ui.copyEmail[lang]} ${contact.email}`}
          >
            {copied ? <CheckIcon /> : <CopyIcon />}
          </button>
        </span>
        <a className="action" href={contact.whatsapp} target="_blank" rel="noopener noreferrer">
          <ChatIcon />
          <span>WhatsApp</span>
        </a>
        <a className="action" href={contact.resume} download="Fernando-Rojas-Resume.pdf">
          <DownloadIcon />
          <span>{ui.resume[lang]}</span>
        </a>
      </div>
      <ul className="contact-social">
        <li>
          <a className="social" href={contact.linkedin} target="_blank" rel="noopener noreferrer me">
            <LinkedInIcon />
            <span>LinkedIn</span>
          </a>
        </li>
        <li>
          <a className="social" href={contact.github} target="_blank" rel="noopener noreferrer me">
            <GitHubIcon />
            <span>GitHub</span>
          </a>
        </li>
      </ul>
      <span className="visually-hidden" aria-live="polite">
        {copied ? ui.copied[lang] : ""}
      </span>
    </div>
  );
}

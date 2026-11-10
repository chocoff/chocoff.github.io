"use client";

import { useState } from "react";
import { contact } from "@/content/site";
import { ArrowOutIcon, CheckIcon, ChatIcon, CopyIcon, DownloadIcon, MailIcon } from "./icons";

/** Every way to reach Choco, one action each. Used in the hero and at the close. */
export default function ContactRail({ size = "default" }: { size?: "default" | "large" }) {
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
            <span>Email me</span>
          </a>
          <button type="button" className="action action--icon" onClick={copy} aria-label={`Copy ${contact.email}`}>
            {copied ? <CheckIcon /> : <CopyIcon />}
          </button>
        </span>
        <a className="action" href={contact.whatsapp} target="_blank" rel="noopener noreferrer">
          <ChatIcon />
          <span>WhatsApp</span>
        </a>
        <a className="action" href={contact.resume} download="Fernando-Rojas-Resume.pdf">
          <DownloadIcon />
          <span>Résumé</span>
        </a>
      </div>
      <div className="contact-secondary">
        <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn <ArrowOutIcon />
        </a>
        <a href={contact.github} target="_blank" rel="noopener noreferrer">
          GitHub <ArrowOutIcon />
        </a>
        <span className="contact-address" aria-live="polite">
          {copied ? "Address copied" : contact.email}
        </span>
      </div>
    </div>
  );
}

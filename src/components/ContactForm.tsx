"use client";

import { useState } from "react";
import { contact } from "@/data/site";
import { Arrow } from "./Logo";

export default function ContactForm() {
  const [f, setF] = useState({ name: "", email: "", phone: "", message: "" });

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setF((prev) => ({ ...prev, [k]: e.target.value }));

  const mailto = () => {
    const subject = `Enquiry${f.name ? ` — ${f.name}` : ""}`;
    const body = [
      f.name ? `Name: ${f.name}` : null,
      f.email ? `Email: ${f.email}` : null,
      f.phone ? `Phone: ${f.phone}` : null,
      f.message ? `\n${f.message}` : null,
    ]
      .filter(Boolean)
      .join("\n");
    return `mailto:${contact.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  };

  const whatsapp = () => {
    const text = [f.name ? `Hello Mirania, this is ${f.name}.` : "Hello Mirania.", f.message]
      .filter(Boolean)
      .join(" ");
    return `${contact.whatsapp}&text=${encodeURIComponent(text)}`;
  };

  return (
    <form className="form" onSubmit={(e) => e.preventDefault()}>
      <div className="form__row">
        <div className="field">
          <label htmlFor="f-name">Name</label>
          <input id="f-name" value={f.name} onChange={set("name")} placeholder="Full name" />
        </div>
        <div className="field">
          <label htmlFor="f-email">Email</label>
          <input
            id="f-email"
            type="email"
            value={f.email}
            onChange={set("email")}
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="f-phone">Phone</label>
        <input id="f-phone" value={f.phone} onChange={set("phone")} placeholder="+91" />
      </div>

      <div className="field">
        <label htmlFor="f-message">What are you furnishing?</label>
        <textarea
          id="f-message"
          value={f.message}
          onChange={set("message")}
          placeholder="A room, a floor, an office — and roughly when."
        />
      </div>

      <div className="row" style={{ gap: "1.2rem", flexWrap: "wrap" }}>
        <a href={mailto()} className="btn arrow-link">
          Send by email <Arrow className="arrow" />
        </a>
        <a href={whatsapp()} target="_blank" rel="noreferrer" className="btn is-ghost">
          Send on WhatsApp
        </a>
      </div>
      <p className="t-sm muted">
        Both options open your own mail or WhatsApp app with the message filled
        in. Nothing is stored on this site.
      </p>
    </form>
  );
}

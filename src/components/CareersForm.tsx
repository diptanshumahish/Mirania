"use client";

import { useRef, useState } from "react";
import { contact } from "@/data/site";
import { Arrow } from "./Logo";

/**
 * The legacy site posted a resume straight to a PHP handler. With no backend
 * here we compose a pre-filled mail draft and ask the applicant to attach the
 * file — honest about what it does rather than silently dropping the upload.
 */
export default function CareersForm() {
  const [file, setFile] = useState<File | null>(null);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const mailto = () => {
    const subject = `Application${role ? ` — ${role}` : ""}${name ? ` — ${name}` : ""}`;
    const body = [
      name ? `Name: ${name}` : null,
      role ? `Role of interest: ${role}` : null,
      note ? `\n${note}` : null,
      file ? `\n(Attaching: ${file.name})` : "\n(Please attach your CV to this email.)",
    ]
      .filter(Boolean)
      .join("\n");
    return `mailto:${contact.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form className="form" onSubmit={(e) => e.preventDefault()}>
      <div className="form__row">
        <div className="field">
          <label htmlFor="c-name">Your name</label>
          <input
            id="c-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
          />
        </div>
        <div className="field">
          <label htmlFor="c-role">Role of interest</label>
          <input
            id="c-role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Sales, design, logistics…"
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="c-note">Anything we should know</label>
        <textarea
          id="c-note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="A line or two about what you have worked on."
        />
      </div>

      <div>
        <label
          className="filedrop"
          htmlFor="c-file"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
          }}
          tabIndex={0}
        >
          <span className="t-base">{file ? file.name : "Choose your CV — PDF or DOC"}</span>
          <span className="mono-sm muted">{file ? "Change" : "Browse"}</span>
          <input
            ref={inputRef}
            id="c-file"
            type="file"
            accept=".pdf,.doc,.docx"
            className="sr-only"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
        </label>
      </div>

      <div className="formnote">
        <p className="mono-sm muted" style={{ marginBottom: "0.8rem" }}>
          How this works
        </p>
        <p className="t-base">
          Pressing send opens a pre-filled email to {contact.email}. Attach the
          CV there and we will read it — the file is never uploaded to this site.
        </p>
      </div>

      <a href={mailto()} className="btn arrow-link" style={{ alignSelf: "flex-start" }}>
        Send application <Arrow className="arrow" />
      </a>
    </form>
  );
}

"use client";

import { useState } from "react";
import { Arrow } from "./Logo";

export default function Subscribe() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <form
      className="subscribe"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <label className="sr-only" htmlFor="subscribe-email">
        Email address
      </label>
      <input
        id="subscribe-email"
        type="email"
        required
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="subscribe__input"
        disabled={sent}
      />
      <button type="submit" className="subscribe__btn" aria-label="Subscribe" disabled={sent}>
        {sent ? "Thank you" : <Arrow />}
      </button>
    </form>
  );
}

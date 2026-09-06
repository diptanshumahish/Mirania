import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import Media from "@/components/Media";
import { Arrow } from "@/components/Logo";
import { contact } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "K3N Lifestyles, #3 Mirania Gardens, 11F East Topsia Road, Kolkata 700046. Monday to Saturday, 10:00 to 19:30.",
};

export default function ContactPage() {
  return (
    <>
      <header className="phead">
        <p className="mono-sm muted">Index / Contact</p>
        <div className="phead__row">
          <h1 className="h1 balance">Come and sit in it.</h1>
        </div>
        <p className="t-lg phead__lede">
          The showroom is on East Topsia Road, ten minutes from the EM Bypass.
          Walk in, or tell us what you are furnishing and we will have the right
          things on the floor when you arrive.
        </p>
      </header>

      <hr className="rule" />

      <section className="block-pad" style={{ paddingTop: "4.8rem" }}>
        <div className="split">
          <div className="stack" style={{ gap: "3.2rem" }}>
            <div className="deflist">
              <div className="deflist__row">
                <span className="mono-sm muted">Address</span>
                <address className="t-md" style={{ fontStyle: "normal", lineHeight: 1.6 }}>
                  {contact.address.name}
                  <br />
                  {contact.address.lines.map((l) => (
                    <span key={l}>
                      {l}
                      <br />
                    </span>
                  ))}
                </address>
              </div>
              <div className="deflist__row">
                <span className="mono-sm muted">Opening hours</span>
                <div className="stack" style={{ gap: "0.4rem" }}>
                  {contact.hours.map((h) => (
                    <p className="t-md" key={h.days}>
                      {h.days} — <span className="muted">{h.time}</span>
                    </p>
                  ))}
                </div>
              </div>
              <div className="deflist__row">
                <span className="mono-sm muted">Telephone</span>
                <div className="stack" style={{ gap: "0.4rem" }}>
                  {contact.phones.map((p) => (
                    <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="t-md link-u">
                      {p}
                    </a>
                  ))}
                </div>
              </div>
              <div className="deflist__row">
                <span className="mono-sm muted">Email</span>
                <a href={`mailto:${contact.email}`} className="t-md link-u">
                  {contact.email}
                </a>
              </div>
              <div className="deflist__row">
                <span className="mono-sm muted">Social</span>
                <div className="row" style={{ gap: "1.6rem" }}>
                  <a href={contact.social.instagram} target="_blank" rel="noreferrer" className="t-md link-u">
                    Instagram
                  </a>
                  <a href={contact.social.facebook} target="_blank" rel="noreferrer" className="t-md link-u">
                    Facebook
                  </a>
                </div>
              </div>
            </div>

            <a
              href={contact.map}
              target="_blank"
              rel="noreferrer"
              className="btn arrow-link"
              style={{ alignSelf: "flex-start" }}
            >
              Get directions <Arrow className="arrow" />
            </a>
          </div>

          <div className="stack" style={{ gap: "2.4rem" }}>
            <h2 className="h4">Send us a message</h2>
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="block-pad" style={{ paddingTop: "4.8rem", paddingBottom: "6.4rem" }}>
        <Media
          src="/img/site/fabric-mockup.jpg"
          alt="Fabric and finish samples at the Mirania showroom"
          ratio={16 / 6}
          sizes="100vw"
        />
        <p className="mono-sm muted" style={{ paddingTop: "1.2rem" }}>
          Finish and fabric library · available on the floor
        </p>
      </section>
    </>
  );
}

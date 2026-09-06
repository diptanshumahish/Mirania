import type { Metadata } from "next";
import Media from "@/components/Media";
import CareersForm from "@/components/CareersForm";
import { contact } from "@/data/site";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Mirania is hiring across sales, design and logistics at our Kolkata showroom.",
};

const values = [
  {
    title: "You will be on the floor",
    body: "This is not a catalogue business. You will learn a piece by sitting in it, and you will learn a client by listening to the room they describe.",
  },
  {
    title: "You will own the whole arc",
    body: "From first walk-in to final installation. Nobody here hands a job over halfway and hopes.",
  },
  {
    title: "You will be given time",
    body: "Twenty years in, we build long relationships with clients and staff alike. We hire slowly for the same reason we specify slowly.",
  },
];

export default function CareersPage() {
  return (
    <>
      <header className="phead">
        <p className="mono-sm muted">Index / Careers</p>
        <div className="phead__row">
          <h1 className="h1 balance">We are hiring.</h1>
          <span className="tag">Open roles</span>
        </div>
        <p className="t-lg phead__lede">
          If you care about how a room comes together and can hold a client's
          trust across months, we would like to read your CV — whether or not a
          role is posted.
        </p>
      </header>

      <div className="block-pad" style={{ paddingTop: 0 }}>
        <Media
          src="/img/site/career-banner.jpg"
          alt="Mirania team at work"
          ratio={16 / 6}
          sizes="100vw"
          priority
        />
      </div>

      <hr className="rule" />

      <section className="block-pad" style={{ paddingTop: "6.4rem" }}>
        <div className="split--sidebar split">
          <p className="mono-sm muted">What the work is</p>
          <div className="deflist" style={{ width: "100%" }}>
            {values.map((v) => (
              <div className="deflist__row" key={v.title}>
                <h2 className="t-md" style={{ fontWeight: 500 }}>
                  {v.title}
                </h2>
                <p className="t-md muted">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section--warm" style={{ marginTop: "6.4rem" }}>
        <div className="block-pad" style={{ paddingTop: "6.4rem", paddingBottom: "8rem" }}>
          <div className="split">
            <div className="stack" style={{ gap: "1.6rem" }}>
              <h2 className="h2 balance">Drop your resume here.</h2>
              <p className="t-lg muted" style={{ maxWidth: "42rem" }}>
                Or write to us directly at{" "}
                <a href={`mailto:${contact.email}`} className="link-u">
                  {contact.email}
                </a>
                .
              </p>
            </div>
            <CareersForm />
          </div>
        </div>
      </section>
    </>
  );
}

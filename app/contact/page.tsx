import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with Julia Schvarzberg — ${site.email}`,
};

const details = [
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
  { label: "Phone", value: site.phone, href: `tel:${site.phone.replace(/[^\d+]/g, "")}` },
  { label: "LinkedIn", value: site.linkedinHandle, href: site.linkedin, external: true },
  { label: "Based in", value: site.location },
];

export default function ContactPage() {
  return (
    <div className="wrap flex min-h-[70vh] flex-col pt-14 sm:pt-20">
      <p className="label">Contact</p>
      <h1 className="display mt-5 text-[clamp(2.6rem,9vw,7rem)]">
        Let’s work
        <br />
        together.
      </h1>

      <a
        href={`mailto:${site.email}`}
        className="mt-10 w-fit font-serif text-2xl italic text-accent link-underline sm:text-3xl"
      >
        {site.email}
      </a>

      <dl className="mt-16 grid grid-cols-1 gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
        {details.map((d) => (
          <div key={d.label} className="bg-paper p-7">
            <dt className="label">{d.label}</dt>
            <dd className="mt-3 text-lg">
              {d.href ? (
                <a
                  href={d.href}
                  target={d.external ? "_blank" : undefined}
                  rel={d.external ? "noreferrer" : undefined}
                  className="link-underline hover:text-accent"
                >
                  {d.value}
                  {d.external ? " ↗" : ""}
                </a>
              ) : (
                <span>{d.value}</span>
              )}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-12">
        <a
          href={site.resume}
          target="_blank"
          rel="noreferrer"
          className="inline-flex rounded-full border border-line px-6 py-3 text-sm font-medium transition-colors hover:border-ink"
        >
          Download résumé ↗
        </a>
      </div>
    </div>
  );
}

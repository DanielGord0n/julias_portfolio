import Link from "next/link";
import { nav, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-line bg-paper-2/60">
      <div className="wrap py-16 sm:py-20">
        <p className="label">Get in touch</p>
        <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <a
            href={`mailto:${site.email}`}
            className="display w-fit max-w-full break-all text-[clamp(1.6rem,5.5vw,4.25rem)] text-ink link-underline"
          >
            {site.email}
          </a>
          <p className="max-w-xs font-serif text-lg italic text-muted">
            Open to internships, collaborations, and freelance design work.
          </p>
        </div>

        <hr className="hairline my-12" />

        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-wrap gap-x-10 gap-y-3">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="label hover:!text-ink link-underline">
                {item.label}
              </Link>
            ))}
            <a href={site.linkedin} target="_blank" rel="noreferrer" className="label hover:!text-ink link-underline">
              LinkedIn
            </a>
            <a href={site.resume} target="_blank" rel="noreferrer" className="label hover:!text-ink link-underline">
              Résumé ↗
            </a>
          </div>
          <div className="label !normal-case !tracking-normal text-muted">
            <p>{site.location}</p>
            <p className="mt-1">
              © {site.year} {site.name}
            </p>
          </div>
        </div>
      </div>

      {/* build credit */}
      <div className="border-t border-line">
        <div className="wrap flex items-center justify-center py-5">
          <p className="label !text-[0.68rem]">
            Designed &amp; built by{" "}
            {site.credit.url ? (
              <a
                href={site.credit.url}
                target="_blank"
                rel="noreferrer"
                className="!text-ink-soft hover:!text-accent link-underline"
              >
                {site.credit.name}
              </a>
            ) : (
              <span className="!text-ink-soft">{site.credit.name}</span>
            )}
          </p>
        </div>
      </div>
    </footer>
  );
}

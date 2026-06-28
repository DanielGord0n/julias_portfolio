import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { about } from "@/lib/about";
import { site } from "@/lib/site";
import { SkillBars } from "@/components/skill-bars";
import { Reveal } from "@/components/reveal";
import { imgSize } from "@/lib/img";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Julia Schvarzberg — architecture student and designer at Florida Atlantic University.",
};

export default function AboutPage() {
  const portrait = imgSize(about.portrait);

  return (
    <div className="wrap pt-14 sm:pt-20">
      <p className="label">About</p>
      <h1 className="display mt-5 max-w-5xl text-[clamp(2.1rem,5.5vw,4.4rem)]">
        {about.headline}
      </h1>

      {/* Portrait + intro */}
      <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <div className="relative overflow-hidden bg-paper-2">
            <Image
              src={about.portrait}
              alt="Portrait of Julia Schvarzberg"
              width={portrait.w}
              height={portrait.h}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="h-auto w-full grayscale"
              priority
            />
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7">
          <p className="label">Design Philosophy</p>
          <div className="mt-6 space-y-6">
            {about.philosophy.map((para, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "font-serif text-xl italic leading-snug text-ink sm:text-2xl"
                    : "max-w-2xl leading-relaxed text-ink-soft"
                }
              >
                {para}
              </p>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Experience + sidebar */}
      <div className="mt-24 grid gap-12 lg:grid-cols-12 lg:gap-16">
        <section className="lg:col-span-7">
          <h2 className="label mb-8">Experience</h2>
          <ol className="space-y-7">
            {about.experience.map((e) => (
              <li
                key={e.org}
                className="grid gap-2 border-t border-line pt-5 sm:grid-cols-[0.8fr_2fr] sm:gap-8"
              >
                <p className="text-sm text-muted">{e.period}</p>
                <div>
                  <h3 className="font-display text-lg font-bold tracking-tight">
                    {e.role}
                  </h3>
                  <p className="text-sm text-accent">{e.org}</p>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-soft">
                    {e.notes}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <aside className="lg:col-span-5">
          <h2 className="label mb-8">Education</h2>
          <div className="border-t border-line pt-5">
            <h3 className="font-display text-lg font-bold tracking-tight">
              {about.education.degree}
            </h3>
            <p className="text-sm text-accent">{about.education.school}</p>
            <p className="mt-1 text-sm text-muted">
              {about.education.location} · {about.education.graduation}
            </p>
          </div>

          <h2 className="label mb-7 mt-14">Software & Skills</h2>
          <SkillBars />

          <h2 className="label mb-6 mt-14">Awards & Certifications</h2>
          <ul className="space-y-3">
            {about.awards.map((a) => (
              <li
                key={a}
                className="border-t border-line pt-3 text-sm leading-relaxed text-ink-soft"
              >
                {a}
              </li>
            ))}
          </ul>
        </aside>
      </div>

      {/* CTA */}
      <div className="mt-24 flex flex-col gap-5 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
          Let’s build something memorable.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/contact"
            className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-accent"
          >
            Get in touch
          </Link>
          <a
            href={site.resume}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-line px-6 py-3 text-sm font-medium transition-colors hover:border-ink"
          >
            Download résumé ↗
          </a>
        </div>
      </div>
    </div>
  );
}

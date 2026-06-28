import Link from "next/link";
import Image from "next/image";
import { HomeHero } from "@/components/home-hero";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { projects } from "@/lib/projects";
import { about } from "@/lib/about";
import { imgSize } from "@/lib/img";

export default function Home() {
  const portrait = imgSize(about.portrait);

  return (
    <>
      <HomeHero />

      {/* Selected work */}
      <section className="wrap mt-12 sm:mt-20">
        <div className="flex items-baseline justify-between border-t border-line pt-6">
          <h2 className="label">Selected Work</h2>
          <Link href="/work" className="label link-underline hover:!text-ink">
            All work ↗
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2 lg:gap-y-28">
          {projects.map((project, i) => (
            <Reveal
              key={project.slug}
              delay={i % 2 === 1 ? 0.08 : 0}
              className={i % 2 === 1 ? "lg:mt-28" : ""}
            >
              <ProjectCard project={project} priority={i === 0} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Approach / philosophy strip */}
      <section className="wrap mt-32">
        <hr className="hairline" />
        <div className="grid gap-6 py-16 lg:grid-cols-12 lg:gap-10 lg:py-24">
          <p className="label lg:col-span-3">Approach</p>
          <Reveal className="lg:col-span-9">
            <blockquote className="font-serif text-[clamp(1.6rem,3.6vw,2.9rem)] italic leading-[1.22] text-ink-soft">
              “Architecture is not just an object to be viewed, but an experience
              to be felt — a vessel for the memories embedded in its walls,
              light, and atmosphere.”
            </blockquote>
          </Reveal>
        </div>
        <hr className="hairline" />
      </section>

      {/* About teaser */}
      <section className="wrap mt-24 grid items-center gap-10 lg:mt-32 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <div className="relative overflow-hidden bg-paper-2">
            <Image
              src={about.portrait}
              alt="Portrait of Julia Schvarzberg"
              width={portrait.w}
              height={portrait.h}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="h-auto w-full grayscale"
            />
          </div>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
          <p className="label">About</p>
          <p className="mt-6 font-display text-2xl font-bold leading-snug tracking-tight sm:text-3xl">
            {about.headline}
          </p>
          <p className="mt-6 max-w-xl leading-relaxed text-muted">
            {about.philosophy[0]}
          </p>
          <Link
            href="/about"
            className="mt-8 inline-flex items-center gap-2 text-sm font-medium link-underline"
          >
            More about Julia <span aria-hidden>→</span>
          </Link>
        </Reveal>
      </section>
    </>
  );
}

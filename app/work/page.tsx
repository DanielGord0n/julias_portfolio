import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected architectural projects by Julia Schvarzberg — museum, residential, computational, and pavilion design.",
};

export default function WorkIndex() {
  return (
    <div className="wrap pt-14 sm:pt-20">
      <header className="max-w-4xl">
        <p className="label">Work</p>
        <h1 className="display mt-5 text-[clamp(2.4rem,8vw,6rem)]">
          Selected Projects
        </h1>
        <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">
          A range of academic and built work — museum, residential,
          computational, and pavilion design, 2024–2026.
        </p>
      </header>

      <div className="mt-20 space-y-24 sm:mt-24 sm:space-y-32">
        {projects.map((project, i) => {
          const imageLeft = i % 2 === 1;
          return (
            <Reveal key={project.slug}>
              <Link href={`/work/${project.slug}`} className="group block">
                <div className="grid items-center gap-7 lg:grid-cols-12 lg:gap-10">
                  <div
                    className={`lg:col-span-8 ${imageLeft ? "lg:order-1" : "lg:order-2"}`}
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-paper-2">
                      <Image
                        src={project.hero}
                        alt={project.heroAlt}
                        fill
                        sizes="(min-width: 1024px) 66vw, 100vw"
                        priority={i === 0}
                        className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                      />
                      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-ink/5" />
                    </div>
                  </div>

                  <div
                    className={`lg:col-span-4 ${imageLeft ? "lg:order-2" : "lg:order-1"}`}
                  >
                    <span className="label tabular-nums">{project.index}</span>
                    <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                      {project.title}
                    </h2>
                    <p className="mt-2 text-sm text-muted">
                      {project.typology}
                      {project.location ? ` — ${project.location}` : ""} ·{" "}
                      {project.year}
                    </p>
                    <p className="mt-5 max-w-md leading-relaxed text-ink-soft">
                      {project.blurb}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium">
                      <span className="link-underline">View project</span>
                      <span
                        aria-hidden
                        className="transition-transform duration-500 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}

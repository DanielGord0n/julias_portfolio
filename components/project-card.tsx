import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/lib/projects";

export function ProjectCard({
  project,
  priority = false,
  sizes = "(min-width: 1024px) 46vw, 100vw",
}: {
  project: Project;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <Link href={`/work/${project.slug}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden bg-paper-2">
        <Image
          src={project.hero}
          alt={project.heroAlt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
        />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-ink/5" />
      </div>

      <div className="mt-5 flex items-baseline justify-between gap-4">
        <div className="flex items-baseline gap-3">
          <span className="label tabular-nums">{project.index}</span>
          <h3 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
            {project.title}
            <span className="ml-2 inline-block translate-x-0 opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100">
              ↗
            </span>
          </h3>
        </div>
        <span className="label hidden tabular-nums sm:block">{project.year}</span>
      </div>
      <p className="mt-1.5 text-sm text-muted">
        {project.typology}
        {project.location ? <span> — {project.location}</span> : null}
      </p>
    </Link>
  );
}

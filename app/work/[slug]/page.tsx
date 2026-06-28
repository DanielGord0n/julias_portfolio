import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProject, projects, nextProject } from "@/lib/projects";
import { Gallery } from "@/components/gallery";
import { ModelStage } from "@/components/model-stage";
import { Reveal } from "@/components/reveal";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.blurb,
    openGraph: {
      title: project.title,
      description: project.blurb,
      images: [project.hero],
    },
  };
}

function MetaRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="flex flex-col gap-1 border-t border-line py-3">
      <dt className="label">{label}</dt>
      <dd className="text-sm text-ink-soft">{value}</dd>
    </div>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const next = nextProject(slug);

  return (
    <article className="pb-12">
      {/* Title block */}
      <div className="wrap pt-12 sm:pt-16">
        <div className="flex items-center gap-4">
          <span className="label tabular-nums">{project.index}</span>
          <span className="h-px w-10 bg-line" />
          <Link href="/work" className="label link-underline hover:!text-ink">
            ← All work
          </Link>
        </div>
        <h1 className="display mt-7 text-[clamp(2.4rem,8vw,6.5rem)]">
          {project.title}
        </h1>
        {project.subtitle && (
          <p className="mt-5 font-serif text-2xl italic text-muted sm:text-3xl">
            {project.subtitle}
          </p>
        )}
      </div>

      {/* Full-bleed hero */}
      <div className="mt-10 w-full sm:mt-14">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-paper-2">
          <Image
            src={project.hero}
            alt={project.heroAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* Meta + description */}
      <div className="wrap mt-16 grid gap-10 lg:mt-24 lg:grid-cols-12 lg:gap-16">
        <aside className="lg:col-span-4">
          <dl className="lg:sticky lg:top-24">
            <MetaRow label="Year" value={project.year} />
            <MetaRow label="Typology" value={project.typology} />
            <MetaRow label="Location" value={project.location} />
            <MetaRow label="Professor" value={project.professor} />
            <MetaRow label="Collaborators" value={project.collaborators} />
            <MetaRow label="Tools" value={project.tools?.join(", ")} />
          </dl>
        </aside>

        <div className="lg:col-span-8">
          {project.question && (
            <Reveal>
              <p className="font-serif text-[clamp(1.5rem,3.2vw,2.4rem)] italic leading-[1.25] text-ink">
                {project.question}
              </p>
            </Reveal>
          )}
          <div className="mt-8 space-y-6">
            {project.description.map((para, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <p className="max-w-2xl text-lg leading-relaxed text-ink-soft">
                  {para}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive 3D model */}
      {project.model && (
        <section className="wrap mt-20 sm:mt-28">
          <div className="mb-6 flex items-baseline justify-between">
            <h2 className="label">Interactive 3D Model</h2>
            <span className="label hidden sm:block">{project.model.label}</span>
          </div>
          <ModelStage
            src={project.model.src}
            label={project.model.label}
            note={project.model.note}
          />
        </section>
      )}

      {/* Video */}
      {project.video && (
        <section className="wrap mt-20 sm:mt-28">
          <h2 className="label mb-6">{project.video.label ?? "Video"}</h2>
          <video
            src={project.video.src}
            controls
            playsInline
            preload="metadata"
            className="w-full bg-ink"
          />
        </section>
      )}

      {/* Gallery */}
      <section className="wrap mt-20 sm:mt-28">
        <h2 className="label mb-10">Gallery</h2>
        <Gallery items={project.gallery} />
      </section>

      {/* Next project */}
      <section className="wrap mt-28">
        <Link
          href={`/work/${next.slug}`}
          className="group flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="label">Next project</p>
            <p className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-5xl">
              {next.title}
            </p>
          </div>
          <span
            aria-hidden
            className="text-4xl text-muted transition-transform duration-500 group-hover:translate-x-2 group-hover:text-ink sm:text-6xl"
          >
            →
          </span>
        </Link>
      </section>
    </article>
  );
}

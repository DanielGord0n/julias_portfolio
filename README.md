# Julia Schvarzberg — Architecture Portfolio

Editorial portfolio site for architecture student & designer Julia Schvarzberg.
Built with **Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion**,
with an interactive **react-three-fiber** 3D model viewer. Deploys to Vercel.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

## Editing content (no CMS yet)

All copy and image references live in plain typed files under `lib/` — edit these and
the site updates. They are shaped to map 1:1 onto a CMS schema later (see below).

| File | What it controls |
|------|------------------|
| `lib/site.ts` | Name, tagline, email, phone, LinkedIn, résumé link, nav |
| `lib/projects.ts` | The four projects: text, metadata, gallery, video, 3D model |
| `lib/about.ts` | Bio, design philosophy, experience, education, skills, awards |
| `lib/image-sizes.json` | Auto-generated image dimensions (don't edit by hand) |

## Assets

Source files from Julia live in `_source-assets/` (git-ignored — kept locally, not
committed because they're ~600 MB). Optimized, web-ready assets are generated into
`public/`:

- **Images** — `public/images/<project>/*.webp` (resized + compressed; 600 MB → ~3 MB)
- **3D model** — `public/models/duplexes.glb` (Rhino `.3dm` → 602 KB GLB)
- **Video / résumé** — `public/video/`, `public/resume/`

### Re-processing assets

```bash
# Re-optimize images + extract PDF boards (needs poppler's `pdftoppm` installed)
node scripts/optimize-assets.mjs

# Convert a Rhino .3dm to a web GLB (pulls cached render meshes off Breps)
node scripts/inspect-3dm.mjs "<path/to/model.3dm>"   # inspect geometry first
node scripts/convert-3dm.mjs "<path/to/model.3dm>" "public/models/out.glb"
```

> The 3D converter extracts the **cached render meshes** Rhino stores on Brep faces.
> For best fidelity on a new model, ask Julia to export glTF/OBJ directly from Rhino.

## CMS upgrade path (phase 2)

Because content is already isolated in `lib/*.ts` with explicit types, moving to a
headless CMS (Sanity/Payload recommended) is mostly a data-source swap:

1. Mirror the `Project` / `about` types as CMS schemas.
2. Replace the static imports in `lib/` with CMS fetches in Server Components.
3. Move image uploads to the CMS asset pipeline (or Vercel Blob).

The page components don't need to change.

## Deploy

Push to GitHub and import on [Vercel](https://vercel.com) — zero config. Default URL is
`*.vercel.app`; add a custom domain in Project → Settings → Domains.

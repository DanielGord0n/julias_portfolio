// Project content model. Shaped to map 1:1 onto a CMS schema later (Sanity/Payload).
export type GalleryItem = {
  src: string;
  alt: string;
  caption?: string;
  /** spans the full content width instead of sitting in the 2-col grid */
  wide?: boolean;
};

export type Project = {
  slug: string;
  index: string; // display order, e.g. "01"
  title: string;
  subtitle?: string;
  year: string;
  typology: string;
  location?: string;
  professor?: string;
  collaborators?: string;
  /** short line for cards + meta */
  blurb: string;
  /** driving question, shown as a lead-in */
  question?: string;
  /** body paragraphs */
  description: string[];
  tools?: string[];
  hero: string;
  heroAlt: string;
  gallery: GalleryItem[];
  video?: { src: string; label?: string };
  model?: { src: string; label: string; note?: string };
};

export const projects: Project[] = [
  {
    slug: "triptych-museum",
    index: "01",
    title: "The Triptych Museum",
    subtitle: "A museum of art through time",
    year: "Spring 2026",
    typology: "Museum",
    location: "Houston, TX",
    professor: "Dr. Smaro Katsangelou",
    blurb:
      "A museum that moves through three distinct spaces in time, guiding visitors from renaissance to postmodern through structure, circulation, and light.",
    question: "Can a building hold time the way a triptych holds a story?",
    description: [
      "Rather than treating art as something fixed within a single room, the museum moves through three visually distinct spaces in time. Visitors begin among early renaissance sculptures and progress toward futuristic and postmodern experiences, where the art of time itself becomes present.",
      "The project investigates how structure, circulation, and light can guide visitors through a layered architectural experience rather than a static series of galleries. Through shifting spatial conditions and framed moments of transition, the museum encourages movement, reflection, and emotional connection within the built environment.",
    ],
    tools: ["Rhino 3D", "D5 Render", "Adobe Suite"],
    hero: "/images/triptych-museum/hero.webp",
    heroAlt:
      "Atmospheric monochrome render of the Triptych Museum with curved vertical fins and a public plaza",
    gallery: [
      {
        src: "/images/triptych-museum/section-perspective.webp",
        alt: "Section perspective of the museum",
        caption: "Section perspective — the procession through three eras",
        wide: true,
      },
      {
        src: "/images/triptych-museum/site-plan.webp",
        alt: "Site plan",
        caption: "Site plan",
        wide: true,
      },
      {
        src: "/images/triptych-museum/floor-plan-1.webp",
        alt: "First floor plan",
        caption: "First floor plan",
      },
      {
        src: "/images/triptych-museum/floor-plan-2.webp",
        alt: "Second floor plan",
        caption: "Second floor plan",
      },
      {
        src: "/images/triptych-museum/circulation-axon.webp",
        alt: "Exploded axonometric of circulation",
        caption: "Circulation — exploded axonometric",
      },
      {
        src: "/images/triptych-museum/concept-diagram.webp",
        alt: "Concept diagram",
        caption: "Concept diagram",
      },
      {
        src: "/images/triptych-museum/section.webp",
        alt: "Building section",
        caption: "Longitudinal section",
        wide: true,
      },
      {
        src: "/images/triptych-museum/construction.webp",
        alt: "Construction drawing",
        caption: "Construction drawing",
        wide: true,
      },
    ],
    video: { src: "/video/museum-daylight.mp4", label: "Daylight simulation" },
  },
  {
    slug: "ai-in-architecture",
    index: "02",
    title: "AI in Architecture",
    subtitle: "Stigmergy & self-organizing systems",
    year: "Spring 2026",
    typology: "Computational / AI",
    professor: "Prof. Daniel Bolojan & Emmanouil Vermisso",
    blurb:
      "Architecture as a living system — form that emerges from environmental forces and computational logic rather than fixed design.",
    question: "What if architecture behaved more like a living system than an object?",
    description: [
      "This project explores how architecture can operate as a responsive system shaped by environmental forces and computational logic, rather than fixed form alone. Through parametric design, stigmergy-based experimentation, and thermal envelope analysis, it investigates how complex architectural systems can emerge through relationships, behavior, and adaptation.",
      "SOM (Self-Organizing Maps) is used as a computational, AI-based method that organizes data and spatial relationships through adaptive pattern formation. Iterations are evaluated across branching, clustering, directionality, symmetry, porosity, and elegance — letting a form evolve through behavior and interaction rather than a single fixed solution.",
    ],
    tools: ["Grasshopper", "Python", "Rhino 3D"],
    hero: "/images/ai-architecture/hero.webp",
    heroAlt:
      "Dark presentation board titled SOM Technology with a vibrant grid of computational form iterations",
    gallery: [
      {
        src: "/images/ai-architecture/stigmergy-1.webp",
        alt: "Stigmergy visualization board",
        caption: "Stigmergy visualization — emergent aggregation studies",
        wide: true,
      },
      {
        src: "/images/ai-architecture/hero.webp",
        alt: "SOM technology board",
        caption: "Self-Organizing Map — iteration matrix and metrics",
        wide: true,
      },
    ],
  },
  {
    slug: "corte-alta-duplexes",
    index: "03",
    title: "Corte Alta Duplexes",
    subtitle: "Accessibility as experience",
    year: "Fall 2025",
    typology: "Residential",
    location: "Charleston, SC",
    professor: "Dr. Heather Ligler",
    collaborators: "with Julieta Segura",
    blurb:
      "Two homes within one shared structure, joined by a continuous ramp that turns ADA accessibility into the heart of the design.",
    question:
      "How can seeing accessibility as opportunity transform an ADA ramp into an immersive experience?",
    description: [
      "The duplex begins with a simple idea: two homes brought together within one shared structure. Whether placed side by side, stacked, or interwoven, each unit remains its own world while participating in a larger architectural whole.",
      "The design transforms the ADA ramp from a merely functional requirement into a continuous, enjoyable experience. The ramp wraps around the first duplex and leads to a shared roof terrace, becoming an everyday path that invites residents to walk, cycle, or take their dogs along a seamless route. Accessibility is treated not as an add-on, but as a central design choice.",
    ],
    tools: ["Rhino 3D", "D5 Render"],
    hero: "/images/corte-alta-duplexes/hero.webp",
    heroAlt:
      "Warm terracotta render of the Corte Alta duplexes with exposed timber roof and brick lattice",
    gallery: [
      {
        src: "/images/corte-alta-duplexes/render-2.webp",
        alt: "Secondary render of the duplexes",
        caption: "Approach view",
      },
      {
        src: "/images/corte-alta-duplexes/board-1.webp",
        alt: "Design process board",
        caption: "Design priorities, research, and the ramp idea",
        wide: true,
      },
      {
        src: "/images/corte-alta-duplexes/model-1.webp",
        alt: "Physical model photograph",
        caption: "Physical study model",
      },
      {
        src: "/images/corte-alta-duplexes/model-2.webp",
        alt: "Physical model photograph",
        caption: "Physical study model — detail",
      },
      {
        src: "/images/corte-alta-duplexes/model-3.webp",
        alt: "Physical model photograph",
        caption: "Physical study model — aerial",
      },
      {
        src: "/images/corte-alta-duplexes/drawings-1.webp",
        alt: "Technical drawings board",
        caption: "Plans, sections & elevations",
        wide: true,
      },
    ],
    model: {
      src: "/models/duplexes.glb",
      label: "Interactive massing model",
      note: "Built in Rhino 3D — drag to orbit, scroll to zoom.",
    },
  },
  {
    slug: "serpentine-pavilion",
    index: "04",
    title: "Serpentine Pavilion",
    subtitle: "Japanese joinery, no fasteners",
    year: "Fall 2024",
    typology: "Wood Joinery / Pavilion",
    location: "Boca Raton, FL",
    professor: "Prof. Diego Camargo",
    collaborators: "with Keren Magin",
    blurb:
      "A built pavilion exploring the art of Japanese joinery — assembled from 2x2 and 2x4 members using only hand tools, without fasteners or glue.",
    question: "How can we build a structure without fasteners or glue?",
    description: [
      "This project explores the art of Japanese joinery using only hand tools. The pavilion was created through 2x2 and 2x4 wood assemblies, with each connection cut and fitted so the structure holds together through geometry alone.",
      "From catalog to full-scale build, the work moves between careful drawing and the realities of the workshop — testing how traditional joinery logic can shape a contemporary public pavilion.",
    ],
    tools: ["Hand tools", "Japanese joinery", "Rhino 3D"],
    hero: "/images/serpentine-pavilion/hero.webp",
    heroAlt:
      "Soft sepia render of a timber joinery pavilion with a bench and dappled light",
    gallery: [
      {
        src: "/images/serpentine-pavilion/real-photo.webp",
        alt: "Photograph of the built pavilion",
        caption: "The built pavilion — photograph",
        wide: true,
      },
      {
        src: "/images/serpentine-pavilion/money-photo.webp",
        alt: "Pavilion detail",
        caption: "Joinery detail",
      },
      {
        src: "/images/serpentine-pavilion/catalog-1.webp",
        alt: "Joinery catalog board",
        caption: "Joinery catalog",
      },
      {
        src: "/images/serpentine-pavilion/catalog-2.webp",
        alt: "Joinery catalog board",
        caption: "Assembly studies",
      },
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const projectSlugs = projects.map((p) => p.slug);
export const nextProject = (slug: string) => {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
};

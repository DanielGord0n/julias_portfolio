// Central site config. A CMS would later populate these same fields.
export const site = {
  name: "Julia Schvarzberg",
  shortName: "Julia S.",
  role: "Architecture & Design",
  tagline: "Architecture as an experience to be felt — not just an object to be viewed.",
  location: "Fort Lauderdale, FL",
  email: "Julia78002@gmail.com",
  phone: "(954) 758-0180",
  linkedin: "https://www.linkedin.com/in/julia-schvarzberg",
  linkedinHandle: "in/julia-schvarzberg",
  resume: "/resume/Julia-Schvarzberg-Resume.pdf",
  year: new Date().getFullYear(),
  // build credit shown in the footer — set `url` to link it to the DG Devs site
  credit: { name: "DG Devs Inc.", url: "" },
} as const;

export const nav = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

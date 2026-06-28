import sizes from "./image-sizes.json";

type Size = { w: number; h: number };

export function imgSize(src: string): Size {
  return (sizes as Record<string, Size>)[src] ?? { w: 1600, h: 1200 };
}

export function aspect(src: string): number {
  const { w, h } = imgSize(src);
  return w / h;
}

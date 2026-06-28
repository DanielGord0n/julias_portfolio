// One-time asset pipeline: source-assets (huge PNG/JPG/PDF) -> optimized WebP in /public.
// Raster images go through sharp; PDF pages are rasterized with pdftoppm (poppler) then sharp.
// Run: node scripts/optimize-assets.mjs
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, copyFileSync, rmSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import os from "node:os";
import sharp from "sharp";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(ROOT, "_source-assets");
const OUT = join(ROOT, "public");
const TMP = join(os.tmpdir(), "julia-pdf-tmp");

const P1 = "PROJECT 1 (STRONGEST PROJECT) _The Triptych Museum_";
const P2 = "PROJECT 2 (SECOND STRONGEST) _AI in Architecture_";
const P3 = "PROJECT 3 (WEAKEST PROJECT) _Serpentine Pavillion_";
const P4 = "PROJECT 4 (THIRD STRONGEST) _Corte Alta Duplexes_";

// --- raster (sharp) tasks: [srcRelPath, destRelPath, maxWidth] ---
const RASTER = [
  ["ABOUT ME PAGE/Picture of me.png", "images/about/portrait.webp", 1400],

  [`${P1}/MONEY PIECE PHOTO.png`, "images/triptych-museum/hero.webp", 2400],
  [`${P1}/SECTION PERSPECTIVE FOR PRESENTATION FINAL.jpg`, "images/triptych-museum/section-perspective.webp", 2400],
  [`${P1}/SITE PLAN.jpg`, "images/triptych-museum/site-plan.webp", 2400],
  [`${P1}/PUT THIS FOR FIRST FLOOR PLAN.png`, "images/triptych-museum/floor-plan-1.webp", 2200],
  [`${P1}/PUT THIS FOR SECOND FLOOR PLAN.jpg`, "images/triptych-museum/floor-plan-2.webp", 2200],
  [`${P1}/circulation exploded axon.jpg`, "images/triptych-museum/circulation-axon.webp", 2000],
  [`${P1}/section for final museum 2.png`, "images/triptych-museum/section.webp", 2200],
  [`${P1}/cover page.png`, "images/triptych-museum/cover.webp", 2000],

  [`${P3}/money piece render d3.png`, "images/serpentine-pavilion/hero.webp", 2400],
  [`${P3}/real photo of project.png`, "images/serpentine-pavilion/real-photo.webp", 2000],

  [`${P4}/MONEY PIECE IMAGE.png`, "images/corte-alta-duplexes/hero.webp", 2400],
  [`${P4}/MONEY PIECE IMAGE(1).png`, "images/corte-alta-duplexes/render-2.webp", 2400],
  [`${P4}/MODEL IMAGE.jpg`, "images/corte-alta-duplexes/model-1.webp", 1600],
  [`${P4}/MODEL IMAGE2.jpg`, "images/corte-alta-duplexes/model-2.webp", 1600],
  [`${P4}/MODEL IMAGE3.jpg`, "images/corte-alta-duplexes/model-3.webp", 1600],
];

// --- pdf tasks: [srcRelPath, page, destRelPath, maxWidth] ---
const PDF = [
  [`${P1}/concept diagram.pdf`, 1, "images/triptych-museum/concept-diagram.webp", 2200],
  [`${P1}/Construction drawing.pdf`, 1, "images/triptych-museum/construction.webp", 2200],

  [`${P2}/VIZ2_ASSIGNMENT6_JULIA SCHVARZBERG.pdf`, 1, "images/ai-architecture/hero.webp", 2600],
  [`${P2}/STIGMERGY VIZ2 .pdf`, 1, "images/ai-architecture/stigmergy-1.webp", 2600],
  [`${P2}/STIGMERGY VIZ2 .pdf`, 2, "images/ai-architecture/stigmergy-2.webp", 2600],

  [`${P3}/money piece photo.pdf`, 1, "images/serpentine-pavilion/money-photo.webp", 2200],
  [`${P3}/FINAL CATALOG D3 JULIA SCHVARZBERG + KEREN MAGIN (2).pdf`, 1, "images/serpentine-pavilion/catalog-1.webp", 2200],
  [`${P3}/FINAL CATALOG D3 JULIA SCHVARZBERG + KEREN MAGIN (2).pdf`, 2, "images/serpentine-pavilion/catalog-2.webp", 2200],

  [`${P4}/DRAWINGS.pdf`, 1, "images/corte-alta-duplexes/drawings-1.webp", 2400],
  [`${P4}/combined presentation board with additional stuff.pdf`, 1, "images/corte-alta-duplexes/board-1.webp", 2400],
];

// --- straight copies: [srcRelPath, destRelPath] ---
const COPY = [
  ["ABOUT ME PAGE/Julia Schvarzberg_Resume.pdf", "resume/Julia-Schvarzberg-Resume.pdf"],
  [`${P1}/daylight simulation.mp4`, "video/museum-daylight.mp4"],
];

const ensureDir = (file) => mkdirSync(dirname(file), { recursive: true });
let ok = 0, fail = 0;

async function toWebp(srcAbs, destAbs, maxWidth, quality = 80) {
  ensureDir(destAbs);
  await sharp(srcAbs, { limitInputPixels: false })
    .rotate()
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality, effort: 5 })
    .toFile(destAbs);
}

async function run() {
  rmSync(TMP, { recursive: true, force: true });
  mkdirSync(TMP, { recursive: true });

  for (const [src, dest, w] of RASTER) {
    const s = join(SRC, src), d = join(OUT, dest);
    try { await toWebp(s, d, w); console.log("img  ✓", dest); ok++; }
    catch (e) { console.log("img  ✗", dest, "—", e.message); fail++; }
  }

  for (const [src, page, dest, w] of PDF) {
    const s = join(SRC, src), d = join(OUT, dest);
    const prefix = join(TMP, `pg_${ok}_${page}`);
    try {
      execFileSync("pdftoppm", ["-png", "-f", String(page), "-l", String(page),
        "-scale-to", String(w), s, prefix], { stdio: "pipe" });
      const made = readdirSync(TMP).find((f) => f.startsWith(`pg_${ok}_${page}`) && f.endsWith(".png"));
      if (!made) throw new Error("pdftoppm produced no page");
      await toWebp(join(TMP, made), d, w);
      console.log("pdf  ✓", dest); ok++;
    } catch (e) { console.log("pdf  ✗", dest, "—", e.message.split("\n")[0]); fail++; }
  }

  for (const [src, dest] of COPY) {
    const s = join(SRC, src), d = join(OUT, dest);
    try { ensureDir(d); copyFileSync(s, d); console.log("copy ✓", dest); ok++; }
    catch (e) { console.log("copy ✗", dest, "—", e.message); fail++; }
  }

  rmSync(TMP, { recursive: true, force: true });
  console.log(`\nDone. ${ok} ok, ${fail} failed.`);
}
run();

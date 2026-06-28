// Generate brand assets: favicon (app/icon.svg), apple-icon, and the social/OG image.
import sharp from "sharp";
import { writeFileSync } from "node:fs";

const INK = "#17140f";
const PAPER = "#faf9f6";
const MUTED = "#6f685e";
const ACCENT = "#b4583c";

// ---- favicon: ink rounded square + "JS" monogram ----
const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="${INK}"/>
  <text x="32" y="34" font-family="Helvetica, Arial, sans-serif" font-size="33" font-weight="700"
        letter-spacing="-1.5" fill="${PAPER}" text-anchor="middle" dominant-baseline="central">JS</text>
</svg>`;
writeFileSync("app/icon.svg", iconSvg);

// apple-icon (180) — same monogram, larger radius
const appleSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180">
  <rect width="180" height="180" fill="${INK}"/>
  <text x="90" y="98" font-family="Helvetica, Arial, sans-serif" font-size="92" font-weight="700"
        letter-spacing="-4" fill="${PAPER}" text-anchor="middle" dominant-baseline="central">JS</text>
</svg>`;
await sharp(Buffer.from(appleSvg)).png().toFile("app/apple-icon.png");

// ---- OG / social share image (1200x630): text on paper + hero render panel ----
const W = 1200, H = 630, PANEL = 470, PX = W - PANEL;

const render = await sharp("public/images/triptych-museum/hero.webp")
  .resize(PANEL, H, { fit: "cover", position: "centre" })
  .toBuffer();

const textSvg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <text x="72" y="150" font-family="Helvetica, Arial, sans-serif" font-size="21" font-weight="600"
        letter-spacing="3.4" fill="${MUTED}">ARCHITECTURE &amp; DESIGN — PORTFOLIO</text>
  <text x="68" y="300" font-family="Helvetica, Arial, sans-serif" font-size="92" font-weight="800"
        letter-spacing="-3" fill="${INK}">Julia</text>
  <text x="68" y="396" font-family="Helvetica, Arial, sans-serif" font-size="92" font-weight="800"
        letter-spacing="-3" fill="${INK}">Schvarzberg</text>
  <rect x="72" y="452" width="46" height="3" fill="${ACCENT}"/>
  <text x="72" y="512" font-family="Georgia, serif" font-size="29" font-style="italic"
        fill="#3a352e">Architecture as an experience to be felt.</text>
  <line x1="${PX}" y1="0" x2="${PX}" y2="${H}" stroke="#e4ded3" stroke-width="2"/>
</svg>`;

await sharp({ create: { width: W, height: H, channels: 4, background: PAPER } })
  .composite([
    { input: render, left: PX, top: 0 },
    { input: Buffer.from(textSvg), left: 0, top: 0 },
  ])
  .png()
  .toFile("app/opengraph-image.png");

// twitter image = same
await sharp("app/opengraph-image.png").toFile("app/twitter-image.png");

console.log("wrote app/icon.svg, app/apple-icon.png, app/opengraph-image.png, app/twitter-image.png");

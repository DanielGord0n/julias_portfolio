// Rhino .3dm -> web GLB. Pulls cached render meshes off Brep faces (and extrusions
// where present), merges into one clay-material mesh, welds/dedups, writes a GLB.
import rhino3dm from "rhino3dm";
import { Document, NodeIO } from "@gltf-transform/core";
import { weld, dedup, prune } from "@gltf-transform/functions";
import { readFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

const SRC = process.argv[2];
const OUT = process.argv[3] || "public/models/model.glb";

const rhino = await rhino3dm();
const doc3dm = rhino.File3dm.fromByteArray(new Uint8Array(readFileSync(SRC)));
const objs = doc3dm.objects();

const positions = [];
const normals = [];
const indices = [];
let vertOffset = 0;
let meshesFromBrep = 0, meshesFromExt = 0, skipped = 0;

function addMesh(mesh) {
  if (!mesh) return false;
  let json;
  try { json = mesh.toThreejsJSON(); } catch { return false; }
  const attrs = json?.data?.attributes;
  const posArr = attrs?.position?.array;
  if (!posArr || posArr.length === 0) return false;
  const norArr = attrs?.normal?.array;
  const vCount = posArr.length / 3;

  for (let i = 0; i < posArr.length; i++) positions.push(posArr[i]);
  if (norArr && norArr.length === posArr.length) {
    for (let i = 0; i < norArr.length; i++) normals.push(norArr[i]);
  } else {
    for (let i = 0; i < posArr.length; i++) normals.push(0); // filled later by three if needed
  }

  const idx = json?.data?.index?.array;
  if (idx && idx.length) {
    for (let i = 0; i < idx.length; i++) indices.push(idx[i] + vertOffset);
  } else {
    for (let i = 0; i < vCount; i++) indices.push(i + vertOffset); // non-indexed
  }
  vertOffset += vCount;
  return true;
}

for (let i = 0; i < objs.count; i++) {
  const g = objs.get(i).geometry();
  const type = g.constructor.name;
  if (type === "Brep") {
    const faces = g.faces();
    for (let f = 0; f < faces.count; f++) {
      const m = faces.get(f).getMesh(1) || faces.get(f).getMesh(0);
      if (addMesh(m)) meshesFromBrep++;
    }
  } else if (type === "Extrusion") {
    let m = g.getMesh(1) || g.getMesh(0);
    if (!m) { try { const b = g.toBrep(true); if (b) { const fs = b.faces(); for (let f = 0; f < fs.count; f++) { if (addMesh(fs.get(f).getMesh(1) || fs.get(f).getMesh(0))) meshesFromExt++; } } } catch {} }
    else if (addMesh(m)) meshesFromExt++;
    else skipped++;
  }
}

const tris = indices.length / 3;
console.log(`Extracted: ${meshesFromBrep} brep-face meshes, ${meshesFromExt} extrusion meshes, ${skipped} skipped`);
console.log(`Geometry: ${vertOffset} verts, ${tris} triangles`);
if (vertOffset === 0) { console.error("No geometry extracted — aborting."); process.exit(1); }

// Build GLB
const doc = new Document();
const buffer = doc.createBuffer();
const hasNormals = normals.some((n) => n !== 0);
const pos = doc.createAccessor().setType("VEC3").setArray(new Float32Array(positions)).setBuffer(buffer);
const idxArr = vertOffset > 65535 ? new Uint32Array(indices) : new Uint16Array(indices);
const idx = doc.createAccessor().setType("SCALAR").setArray(idxArr).setBuffer(buffer);
const mat = doc.createMaterial("clay")
  .setBaseColorFactor([0.86, 0.84, 0.80, 1]).setRoughnessFactor(0.9).setMetallicFactor(0.0).setDoubleSided(true);
const prim = doc.createPrimitive().setAttribute("POSITION", pos).setIndices(idx).setMaterial(mat);
if (hasNormals) {
  const nor = doc.createAccessor().setType("VEC3").setArray(new Float32Array(normals)).setBuffer(buffer);
  prim.setAttribute("NORMAL", nor);
}
const mesh = doc.createMesh().addPrimitive(prim);
const node = doc.createNode("model").setMesh(mesh);
doc.createScene().addChild(node);

await doc.transform(weld(), dedup(), prune());

mkdirSync(dirname(OUT), { recursive: true });
await new NodeIO().write(OUT, doc);
console.log(`Wrote ${OUT}`);

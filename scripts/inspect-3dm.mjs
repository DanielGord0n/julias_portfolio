// Inspect a Rhino .3dm: tally object/geometry types and count usable meshes.
import rhino3dm from "rhino3dm";
import { readFileSync } from "node:fs";

const path = process.argv[2];
const rhino = await rhino3dm();
const doc = rhino.File3dm.fromByteArray(new Uint8Array(readFileSync(path)));
const objs = doc.objects();
const n = objs.count;

const tally = {};
let meshObjs = 0, meshFaces = 0, meshVerts = 0, extrusions = 0, brepWithMesh = 0;

for (let i = 0; i < n; i++) {
  const geo = objs.get(i).geometry();
  const t = geo.constructor.name;
  tally[t] = (tally[t] || 0) + 1;
  if (t === "Mesh") {
    meshObjs++;
    meshFaces += geo.faces().count;
    meshVerts += geo.vertices().count;
  }
  // Extrusions can be meshed/converted; note them
  if (t === "Extrusion") extrusions++;
}

console.log("Total objects:", n);
console.log("Types:", JSON.stringify(tally, null, 2));
console.log("Mesh objects:", meshObjs, "| total faces:", meshFaces, "| verts:", meshVerts);
console.log("Extrusions:", extrusions);

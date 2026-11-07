// Optimise the raw brain GLB produced by build_brain_mesh.py for the web.
// Usage: node scripts/asset-pipeline/optimize.mjs <in.glb> [out.glb]
import { NodeIO } from "@gltf-transform/core";
import { ALL_EXTENSIONS } from "@gltf-transform/extensions";
import { dedup, meshopt, prune, quantize, simplify, weld } from "@gltf-transform/functions";
import { MeshoptEncoder, MeshoptSimplifier } from "meshoptimizer";

const [input, output = "public/models/brain.glb"] = process.argv.slice(2);
if (!input) {
  console.error("Usage: node scripts/asset-pipeline/optimize.mjs <in.glb> [out.glb]");
  process.exit(1);
}

await MeshoptEncoder.ready;
await MeshoptSimplifier.ready;
const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({
  "meshopt.encoder": MeshoptEncoder,
});

const doc = await io.read(input);
const before = count(doc);

await doc.transform(
  weld(),
  // lockBorder keeps the seams between neighbouring region patches aligned (no cracks).
  simplify({ simplifier: MeshoptSimplifier, ratio: 0.22, error: 0.0008, lockBorder: true }),
  dedup(),
  prune(),
  quantize({ quantizePosition: 14, quantizeNormal: 10 }),
  meshopt({ encoder: MeshoptEncoder, level: "medium" }),
);

await io.write(output, doc);
console.log(`triangles: ${before} -> ${count(doc)}; written ${output}`);
for (const mesh of doc.getRoot().listMeshes()) {
  const tris = mesh.listPrimitives().reduce((n, p) => n + (p.getIndices()?.getCount() ?? 0) / 3, 0);
  console.log(`  ${mesh.getName().padEnd(24)} ${tris}`);
}

function count(d) {
  let n = 0;
  for (const m of d.getRoot().listMeshes())
    for (const p of m.listPrimitives()) n += (p.getIndices()?.getCount() ?? 0) / 3;
  return n;
}

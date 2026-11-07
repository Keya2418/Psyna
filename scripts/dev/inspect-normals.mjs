import { NodeIO } from "@gltf-transform/core";
import { ALL_EXTENSIONS } from "@gltf-transform/extensions";
import { MeshoptDecoder } from "meshoptimizer";
await MeshoptDecoder.ready;
const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({ "meshopt.decoder": MeshoptDecoder });
const doc = await io.read(process.argv[2]);
for (const m of doc.getRoot().listMeshes()) {
  const p = m.listPrimitives()[0]; const n = p.getAttribute("NORMAL"); if (!n) { console.log(m.getName().padEnd(22), "NO NORMALS"); continue; } const pos = p.getAttribute("POSITION");
  let sum = 0, bad = 0, out = 0; const c=[0,0,0]; const N=pos.getCount(); const v=[0,0,0], nn=[0,0,0];
  for (let i=0;i<N;i++){ pos.getElement(i,v); c[0]+=v[0]/N;c[1]+=v[1]/N;c[2]+=v[2]/N; }
  for (let i=0;i<n.getCount();i++){ n.getElement(i,nn); pos.getElement(i,v); const l=Math.hypot(...nn); sum+=l; if(l<0.5) bad++; if((v[0]-c[0])*nn[0]+(v[1]-c[1])*nn[1]+(v[2]-c[2])*nn[2]>0) out++; }
  console.log(m.getName().padEnd(22), n.getArray().constructor.name, "norm", n.getNormalized(), "avgLen", (sum/n.getCount()).toFixed(2), "bad", bad, "outward", (out/n.getCount()).toFixed(2));
}

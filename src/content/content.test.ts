import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  assetMappings,
  citations,
  citationsForClaims,
  claimIdsForRegion,
  claims,
  contextMeshes,
  getCitation,
  lessons,
  referencedCitationIds,
  regions,
} from "@/content";
import { validateContent } from "./validate";

/** Read node/mesh names from the GLB's JSON chunk (no WebGL needed). */
function glbMeshNames(path: string): string[] {
  const buf = readFileSync(path);
  expect(buf.toString("utf8", 0, 4)).toBe("glTF");
  const jsonLength = buf.readUInt32LE(12);
  const json = JSON.parse(buf.toString("utf8", 20, 20 + jsonLength)) as { nodes: { name?: string; mesh?: number }[] };
  return json.nodes.filter((n) => n.mesh !== undefined && n.name).map((n) => n.name!);
}

const bundle = { regions, claims, citations, lessons, assetMappings };

describe("content validation", () => {
  it("has no cross-reference errors", () => {
    expect(validateContent(bundle)).toEqual([]);
  });

  it("asset mappings resolve against the actual 3D model", () => {
    const names = glbMeshNames(join(process.cwd(), "public/models/brain.glb"));
    expect(validateContent(bundle, names)).toEqual([]);
    for (const c of contextMeshes) expect(names).toContain(c.meshName);
  });

  it("detects broken references", () => {
    const broken = {
      ...bundle,
      claims: [...claims, { id: "x-claim", text: "Test", evidence: "anatomy" as const, citationIds: ["does-not-exist"] }],
      lessons: [
        {
          ...lessons[0]!,
          steps: lessons[0]!.steps.map((s, i) => (i === 0 ? { ...s, regionIds: ["nowhere" as never], claimIds: ["missing-claim"] } : s)),
        },
        ...lessons.slice(1),
      ],
    };
    const errors = validateContent(broken, ["L_prefrontal"]);
    expect(errors.some((e) => e.includes('missing citation "does-not-exist"'))).toBe(true);
    expect(errors.some((e) => e.includes('missing region "nowhere"'))).toBe(true);
    expect(errors.some((e) => e.includes('missing claim "missing-claim"'))).toBe(true);
    expect(errors.some((e) => e.includes("not found in model"))).toBe(true);
  });

  it("covers six regions and three lessons of 4–6 steps", () => {
    expect(regions.map((r) => r.id).sort()).toEqual(
      ["amygdala", "hippocampus", "occipital-cortex", "parietal-cortex", "prefrontal-cortex", "temporal-cortex"].sort(),
    );
    expect(lessons).toHaveLength(3);
    for (const l of lessons) {
      expect(l.steps.length).toBeGreaterThanOrEqual(4);
      expect(l.steps.length).toBeLessThanOrEqual(6);
      for (const s of l.steps) expect(citationsForClaims(s.claimIds.slice(0, 1)).length).toBeGreaterThan(0);
    }
  });
});

const factIds = (r: (typeof regions)[number]) => r.facts.flatMap((f) => f.claimIds);

describe("psychology framing", () => {
  it("every brain area explains a distinct psychological trait backed by cited research", () => {
    expect(new Set(regions.map((r) => r.trait)).size).toBe(regions.length);
    for (const r of regions) {
      expect(r.facts.length, r.id).toBeGreaterThan(0);
      for (const f of r.facts) expect(citationsForClaims(f.claimIds).length, `${r.id}: ${f.heading}`).toBeGreaterThan(0);
      // Facts are psychology findings, not neuroscience.
      for (const id of factIds(r)) expect(id, `${r.id}: ${id}`).toMatch(/^(psy|trait)-/);
    }
  });

  it("each lesson step's main claim is a psychology finding", () => {
    for (const l of lessons) for (const s of l.steps) expect(s.claimIds[0], s.id).toMatch(/^psy-/);
  });
});

describe("citations", () => {
  it("every claim citation resolves", () => {
    for (const c of claims) for (const id of c.citationIds) expect(getCitation(id), `${c.id} → ${id}`).toBeDefined();
  });

  it("every region panel has resolvable sources", () => {
    for (const r of regions) {
      const list = citationsForClaims(claimIdsForRegion(r));
      expect(list.length).toBeGreaterThan(0);
    }
  });

  it("records a verification date separate from publication year", () => {
    for (const c of citations) {
      expect(c.verification.checkedOn).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(["abstract", "page-text", "metadata-only"]).toContain(c.verification.checkedAgainst);
    }
  });

  it("has unique DOIs and no unused citation records", () => {
    const dois = citations.map((c) => c.doi).filter(Boolean);
    expect(new Set(dois).size).toBe(dois.length);
    const used = referencedCitationIds();
    expect(citations.filter((c) => !used.has(c.id)).map((c) => c.id)).toEqual([]);
  });
});

describe("editorial guardrails", () => {
  const allText = [
    ...regions.flatMap((r) => [r.trait, r.tagline, r.intro, r.example, r.brainLink.text, ...r.facts.map((f) => f.heading), ...r.keepInMind]),
    ...claims.map((c) => c.text),
    ...lessons.flatMap((l) => l.steps.flatMap((s) => [s.heading, s.body, s.example ?? "", s.brainLink ?? ""])),
  ].join("\n");

  it("avoids single-region overclaims", () => {
    // These phrases may appear only when explicitly negated (e.g. "not a fear center").
    expect(allText).not.toMatch(/\bis the fear cent(er|re)\b/i);
    expect(allText).not.toMatch(/controls (your|the) personality/i);
    expect(allText).not.toMatch(/you are (left|right)-brained/i);
  });

  it("does not offer diagnosis or treatment", () => {
    expect(allText).not.toMatch(/\b(diagnos(e|is)|treatment plan|your brain is)\b/i);
  });
});

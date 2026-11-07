import { assetMappings, contextMeshes } from "./assetMapping";
import { citations } from "./citations";
import { claims } from "./claims";
import { lessons } from "./lessons";
import { regions } from "./regions";
import type {
  BrainAssetMapping,
  BrainRegion,
  Citation,
  EducationalClaim,
  GuidedLesson,
  LessonId,
  RegionId,
} from "./types";

export { assetMappings, citations, claims, contextMeshes, lessons, regions };
export type * from "./types";

const byId = <T extends { id: string }>(items: T[]) => new Map(items.map((i) => [i.id, i]));

const regionMap = byId(regions);
const claimMap = byId(claims);
const citationMap = byId(citations);
const lessonMap = byId(lessons);
const mappingMap = new Map(assetMappings.map((m) => [m.regionId, m]));

export const getRegion = (id: string): BrainRegion | undefined => regionMap.get(id as RegionId);
export const getClaim = (id: string): EducationalClaim | undefined => claimMap.get(id);
export const getCitation = (id: string): Citation | undefined => citationMap.get(id);
export const getLesson = (id: string): GuidedLesson | undefined => lessonMap.get(id as LessonId);
export const getAssetMapping = (id: RegionId): BrainAssetMapping | undefined => mappingMap.get(id);

export const isRegionId = (id: unknown): id is RegionId => typeof id === "string" && regionMap.has(id as RegionId);
export const isLessonId = (id: unknown): id is LessonId => typeof id === "string" && lessonMap.has(id as LessonId);

/** Ordered, de-duplicated citations supporting a list of claims. */
export function citationsForClaims(claimIds: string[]): Citation[] {
  const seen = new Set<string>();
  const out: Citation[] = [];
  for (const cid of claimIds) {
    for (const citeId of getClaim(cid)?.citationIds ?? []) {
      if (seen.has(citeId)) continue;
      const c = getCitation(citeId);
      if (c) {
        seen.add(citeId);
        out.push(c);
      }
    }
  }
  return out;
}

/** All claim ids displayed on a region panel, in display order. */
export function claimIdsForRegion(region: BrainRegion): string[] {
  const ids = [
    ...region.psychology.flatMap((p) => p.claimIds),
    ...region.location.claimIds,
    ...region.worksWith.flatMap((w) => w.claimIds ?? []),
    ...region.functionClaimIds,
    ...region.deeperClaimIds,
  ];
  return [...new Set(ids)];
}

/** Citations actually referenced by educational content (excludes unused records). */
export function referencedCitationIds(): Set<string> {
  const ids = new Set<string>();
  for (const c of claims) c.citationIds.forEach((id) => ids.add(id));
  return ids;
}

export const lessonsForRegion = (id: RegionId) => lessons.filter((l) => regions.find((r) => r.id === id)?.relatedLessonIds.includes(l.id));

export function searchRegions(query: string): BrainRegion[] {
  const q = query.trim().toLowerCase();
  if (!q) return regions;
  return regions.filter((r) =>
    [r.name, r.shortName, r.mindTag, ...r.psychology.map((p) => p.concept), ...r.keywords].some((s) => s.toLowerCase().includes(q)),
  );
}

/** Facts about the app's own content — safe to display as metrics. */
export const contentStats = {
  regions: regions.length,
  lessons: lessons.length,
  lessonSteps: lessons.reduce((n, l) => n + l.steps.length, 0),
  citations: referencedCitationIds().size,
};

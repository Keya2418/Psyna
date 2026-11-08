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

/** A general caveat shown with every trait's brain link. */
export const TRAIT_BRAIN_CAVEAT_ID = "trait-brain-structure-caveat";

/** Claim ids for a region's research facts (the psychology). */
export const factClaimIdsForRegion = (region: BrainRegion): string[] => [...new Set(region.facts.flatMap((f) => f.claimIds))];

/** Claim ids for the brief brain-connection note, including the general caveat. */
export const brainClaimIdsForRegion = (region: BrainRegion): string[] =>
  [...new Set([...region.brainLink.claimIds, TRAIT_BRAIN_CAVEAT_ID])].filter((id) => !factClaimIdsForRegion(region).includes(id));

/** All claim ids displayed on a region panel, in display order. */
export function claimIdsForRegion(region: BrainRegion, { includeBrain = true } = {}): string[] {
  return [...new Set([...factClaimIdsForRegion(region), ...(includeBrain ? brainClaimIdsForRegion(region) : [])])];
}

/** Citations actually referenced by educational content (excludes unused records). */
export function referencedCitationIds(): Set<string> {
  const ids = new Set<string>();
  for (const c of claims) c.citationIds.forEach((id) => ids.add(id));
  return ids;
}

/** Facts about the app's own content — safe to display as metrics. */
export const contentStats = {
  traits: regions.length,
  lessons: lessons.length,
  lessonSteps: lessons.reduce((n, l) => n + l.steps.length, 0),
  citations: referencedCitationIds().size,
};

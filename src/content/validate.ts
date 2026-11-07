import type {
  BrainAssetMapping,
  BrainRegion,
  Citation,
  EducationalClaim,
  GuidedLesson,
} from "./types";

export interface ContentBundle {
  regions: BrainRegion[];
  claims: EducationalClaim[];
  citations: Citation[];
  lessons: GuidedLesson[];
  assetMappings: BrainAssetMapping[];
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Validate cross-references in the content. Returns a list of human-readable problems;
 * an empty list means the content is consistent.
 *
 * `availableMeshNames` (optional) lets callers check mappings against the actual model.
 */
export function validateContent(content: ContentBundle, availableMeshNames?: Iterable<string>): string[] {
  const errors: string[] = [];
  const dupes = (label: string, ids: string[]) => {
    const seen = new Set<string>();
    for (const id of ids) {
      if (seen.has(id)) errors.push(`Duplicate ${label} id "${id}"`);
      seen.add(id);
    }
  };

  dupes("region", content.regions.map((r) => r.id));
  dupes("claim", content.claims.map((c) => c.id));
  dupes("citation", content.citations.map((c) => c.id));
  dupes("lesson", content.lessons.map((l) => l.id));
  dupes("lesson step", content.lessons.flatMap((l) => l.steps.map((s) => s.id)));

  const regionIds = new Set<string>(content.regions.map((r) => r.id));
  const claimIds = new Set(content.claims.map((c) => c.id));
  const citationIds = new Set(content.citations.map((c) => c.id));
  const lessonIds = new Set<string>(content.lessons.map((l) => l.id));

  for (const c of content.citations) {
    if (!c.title.trim()) errors.push(`Citation "${c.id}" has no title`);
    if (!/^https:\/\//.test(c.url)) errors.push(`Citation "${c.id}" URL must be https`);
    if (c.fullTextUrl && !/^https:\/\//.test(c.fullTextUrl)) errors.push(`Citation "${c.id}" full-text URL must be https`);
    if (c.doi && !c.url.includes(c.doi)) errors.push(`Citation "${c.id}" URL does not match DOI`);
    if (!c.note.trim()) errors.push(`Citation "${c.id}" needs a relevance note`);
    if (!ISO_DATE.test(c.verification.checkedOn)) errors.push(`Citation "${c.id}" verification date must be YYYY-MM-DD`);
    if (c.year !== undefined && (c.year < 1800 || c.year > new Date().getFullYear() + 1))
      errors.push(`Citation "${c.id}" has an implausible year ${c.year}`);
  }

  for (const claim of content.claims) {
    if (!claim.text.trim()) errors.push(`Claim "${claim.id}" has no text`);
    if (claim.citationIds.length === 0) errors.push(`Claim "${claim.id}" has no citations`);
    for (const cid of claim.citationIds)
      if (!citationIds.has(cid)) errors.push(`Claim "${claim.id}" references missing citation "${cid}"`);
  }

  const checkClaims = (owner: string, ids: string[]) => {
    for (const id of ids) if (!claimIds.has(id)) errors.push(`${owner} references missing claim "${id}"`);
  };

  for (const r of content.regions) {
    const owner = `Region "${r.id}"`;
    if (!r.intro.trim()) errors.push(`${owner} has no introduction`);
    if (r.intro.split(/\s+/).length > 90) errors.push(`${owner} introduction is too long for a ~30 second read`);
    if (r.location.claimIds.length === 0) errors.push(`${owner} location needs a supporting claim`);
    if (r.functionClaimIds.length === 0) errors.push(`${owner} needs at least one function claim`);
    if (r.psychology.length === 0) errors.push(`${owner} needs at least one psychology concept`);
    for (const p of r.psychology) {
      if (!p.concept.trim()) errors.push(`${owner} has a psychology item without a concept name`);
      if (p.claimIds.length === 0) errors.push(`${owner} psychology "${p.concept}" needs a supporting claim`);
      checkClaims(`${owner} psychology "${p.concept}"`, p.claimIds);
    }
    if (r.simplifies.length === 0) errors.push(`${owner} needs a "what this simplifies" list`);
    checkClaims(owner, [...r.location.claimIds, ...r.functionClaimIds, ...r.deeperClaimIds]);
    for (const w of r.worksWith) {
      if (w.regionId && !regionIds.has(w.regionId)) errors.push(`${owner} works-with references missing region "${w.regionId}"`);
      checkClaims(`${owner} works-with "${w.label}"`, w.claimIds ?? []);
    }
    for (const l of r.relatedLessonIds)
      if (!lessonIds.has(l)) errors.push(`${owner} references missing lesson "${l}"`);
  }

  for (const lesson of content.lessons) {
    const owner = `Lesson "${lesson.id}"`;
    if (lesson.steps.length < 4 || lesson.steps.length > 6)
      errors.push(`${owner} must have 4–6 steps (has ${lesson.steps.length})`);
    for (const step of lesson.steps) {
      const so = `${owner} step "${step.id}"`;
      if (!step.heading.trim()) errors.push(`${so} has no heading`);
      if (!step.body.trim()) errors.push(`${so} has no explanation`);
      if (step.regionIds.length === 0) errors.push(`${so} highlights no regions`);
      if (step.claimIds.length === 0) errors.push(`${so} needs a main claim with a source`);
      for (const rid of step.regionIds)
        if (!regionIds.has(rid)) errors.push(`${so} references missing region "${rid}"`);
      checkClaims(so, step.claimIds);
    }
  }

  const meshSet = availableMeshNames ? new Set(availableMeshNames) : undefined;
  for (const m of content.assetMappings) {
    if (!regionIds.has(m.regionId)) errors.push(`Asset mapping references missing region "${m.regionId}"`);
    if (m.isolation !== "not-isolated" && m.meshNames.length === 0)
      errors.push(`Asset mapping "${m.regionId}" has no mesh names`);
    if (meshSet)
      for (const name of m.meshNames)
        if (!meshSet.has(name)) errors.push(`Asset mapping "${m.regionId}" mesh "${name}" not found in model`);
  }
  for (const r of content.regions)
    if (!content.assetMappings.some((m) => m.regionId === r.id))
      errors.push(`Region "${r.id}" has no asset mapping (add one with isolation "not-isolated" if needed)`);

  return errors;
}

/**
 * Content model for Mind Atlas.
 *
 * Educational content (regions, claims, lessons, citations) is plain typed data,
 * kept separate from presentation components. Validation lives in ./validate.ts.
 */

export type RegionId =
  | "prefrontal-cortex"
  | "parietal-cortex"
  | "temporal-cortex"
  | "occipital-cortex"
  | "hippocampus"
  | "amygdala";

export type LessonId = "memory" | "attention" | "emotion";

/** What kind of evidence a claim rests on. Shown to readers as a badge. */
export type EvidenceKind =
  /** Where something is / what it is made of. */
  | "anatomy"
  /** Activity or structure observed to co-occur with a function (e.g. imaging). Not proof of cause. */
  | "association"
  /** Evidence from damage, stimulation or experimental manipulation. Stronger, but still has limits. */
  | "causal"
  /** A behavioural (psychology) experiment comparing conditions, or a synthesis of such experiments. */
  | "experiment"
  /** A scientific model or interpretation that organises the evidence. Researchers may disagree. */
  | "interpretation";

export type SourceType =
  | "educational"
  | "review"
  | "meta-analysis"
  | "primary-research"
  | "case-study"
  | "dataset";

export interface CitationVerification {
  /** ISO date this project checked the source. Distinct from the source's publication year. */
  checkedOn: string;
  /** What was checked. Only record checks that were actually performed. */
  checkedAgainst: "abstract" | "page-text" | "metadata-only";
  method: string;
}

export interface Citation {
  id: string;
  title: string;
  /** Authors (short form) or publishing organisation. */
  authors: string;
  year?: number;
  /** Journal, website, or publisher. */
  publisher: string;
  /** Canonical link (DOI resolver or page URL). */
  url: string;
  doi?: string;
  /** Public full text, when available (e.g. PubMed Central). */
  fullTextUrl?: string;
  sourceType: SourceType;
  /** Short original note on why this source is relevant. */
  note: string;
  /** Set when key findings come from non-human animal research. */
  animalResearch?: "primarily" | "partly";
  verification: CitationVerification;
}

export interface EducationalClaim {
  id: string;
  /** Plain-language statement, written so the cited sources support its wording. */
  text: string;
  evidence: EvidenceKind;
  citationIds: string[];
  /** Plain-language limitation or uncertainty. */
  caveat?: string;
}

export interface BrainRegion {
  id: RegionId;
  name: string;
  /** Short label for markers and chips. */
  shortName: string;
  /** One-word psychology tag shown on list cards and panels, e.g. "Memory". */
  mindTag: string;
  /** Explains that this is a broad educational grouping. */
  groupingNote: string;
  /** ~30-second plain-language introduction, framed around psychology (mind and behaviour). */
  intro: string;
  /**
   * The psychology this area helps support: named concepts, each backed by claims.
   * Shown first on the panel; the neuroscience (function + deeper claims) sits behind an expander.
   */
  psychology: { concept: string; claimIds: string[] }[];
  /** "Surface" or "Deep" — governs how the viewer reveals it. */
  depth: "surface" | "deep";
  location: { text: string; claimIds: string[] };
  /** Neuroscience claims about functions this region contributes to (shown under "The brain side"). */
  functionClaimIds: string[];
  example: string;
  worksWith: { label: string; text: string; regionId?: RegionId; claimIds?: string[] }[];
  simplifies: string[];
  /** Deeper-detail claims, shown behind an explicit expansion control. */
  deeperClaimIds: string[];
  relatedLessonIds: LessonId[];
  /** Search keywords (synonyms, sub-areas). */
  keywords: string[];
}

export interface LessonStep {
  id: string;
  heading: string;
  body: string;
  example?: string;
  /** One or two sentences connecting the psychology to the highlighted brain areas (supported by the step's claims). */
  brainLink?: string;
  /** Regions highlighted while this step is shown. */
  regionIds: RegionId[];
  /** The first claim is the step's main claim; its sources are shown with the step. */
  claimIds: string[];
  /** Reveal deep structures (fade the outer surface) during this step. */
  revealInternal?: boolean;
}

export interface GuidedLesson {
  id: LessonId;
  topic: "Memory" | "Attention" | "Emotion";
  title: string;
  summary: string;
  /** Reminder that steps organise ideas, not a fixed processing sequence. */
  sequenceNote: string;
  estimatedMinutes: number;
  steps: LessonStep[];
}

export type Vec3 = [number, number, number];

export interface MarkerAnchor {
  side: "left" | "right";
  position: Vec3;
  /** Outward surface normal; zero vector for deep structures. */
  normal: Vec3;
}

/** Central mapping between content regions and the 3D asset. */
export interface BrainAssetMapping {
  regionId: RegionId;
  /** Mesh/node names in public/models/brain.glb. */
  meshNames: string[];
  /** How faithfully the asset isolates this grouping. */
  isolation: "segmented" | "approximate" | "not-isolated";
  isolationNote: string;
  markers: MarkerAnchor[];
  camera: { direction: Vec3; distance: number };
}

export interface ContextMeshMapping {
  meshName: string;
  label: string;
  kind: "cortex-context" | "cerebellum" | "brainstem";
  hemisphere: "left" | "right" | "midline";
}

export interface AnatomyView2D {
  id: string;
  width: number;
  height: number;
  anteriorSide: "left" | "right";
  viewBox: [number, number, number, number] | number[];
  outline: string[];
  regions: { group: string; regionId: string | null; paths: string[]; label: number[] | null }[];
  sulci: string[];
  deep: { regionId: string; paths: string[]; label: number[] | null }[];
}

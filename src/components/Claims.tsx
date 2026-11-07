import { citationsForClaims, getCitation, getClaim } from "@/content";
import type { Citation, EvidenceKind } from "@/content/types";
import { Icon } from "./ui";

export const EVIDENCE_LABEL: Record<EvidenceKind, { label: string; title: string; className: string }> = {
  anatomy: {
    label: "Anatomy",
    title: "Describes where a structure is.",
    className: "bg-[#e6eef5] text-[#25445c]",
  },
  association: {
    label: "Observed link",
    title: "Activity or structure observed together with a function. Does not by itself show cause.",
    className: "bg-[#e3f3ee] text-[#1d5446]",
  },
  causal: {
    label: "Causal evidence",
    title: "From effects of damage or experimental manipulation. Stronger, but still has limits.",
    className: "bg-[#f6ead3] text-[#6d4700]",
  },
  experiment: {
    label: "Experiment",
    title: "From psychology experiments that compare conditions (or reviews of many such experiments).",
    className: "bg-[#efe6fb] text-[#4b2d7a]",
  },
  interpretation: {
    label: "Interpretation",
    title: "A scientific model or theory organising the evidence. Researchers may disagree.",
    className: "bg-[#ece8f4] text-[#46386b]",
  },
};

export function EvidenceBadge({ kind }: { kind: EvidenceKind }) {
  const e = EVIDENCE_LABEL[kind];
  return (
    <span className={`inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-[0.6875rem] font-semibold tracking-wide ${e.className}`} title={e.title}>
      {e.label}
    </span>
  );
}

/**
 * A single claim with evidence badge and numbered citation references.
 * `numbering` maps citation id → display number for the surrounding source list.
 */
export function ClaimItem({ claimId, numbering, idPrefix }: { claimId: string; numbering: Map<string, number>; idPrefix: string }) {
  const claim = getClaim(claimId);
  if (!claim) return null;
  return (
    <li className="space-y-1.5">
      <p className="text-[0.9375rem] leading-relaxed text-ink-soft">
        {claim.text}{" "}
        {claim.citationIds.map((cid) => {
          const n = numbering.get(cid);
          const c = getCitation(cid);
          if (!n || !c) return null;
          return (
            <a
              key={cid}
              href={`#${idPrefix}-src-${cid}`}
              className="ml-0.5 align-super text-[0.6875rem] font-semibold text-teal-strong underline-offset-2 hover:underline"
              aria-label={`Source ${n}: ${c.title}`}
            >
              [{n}]
            </a>
          );
        })}
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <EvidenceBadge kind={claim.evidence} />
        {claim.caveat && <span className="text-[0.8125rem] leading-snug text-muted">{claim.caveat}</span>}
      </div>
    </li>
  );
}

export function numberCitations(claimIds: string[]): { list: Citation[]; numbering: Map<string, number> } {
  const list = citationsForClaims(claimIds);
  return { list, numbering: new Map(list.map((c, i) => [c.id, i + 1])) };
}

const TYPE_LABEL: Record<Citation["sourceType"], string> = {
  educational: "Educational resource",
  review: "Review article",
  "meta-analysis": "Meta-analysis",
  "primary-research": "Research study",
  "case-study": "Case study",
  dataset: "Dataset / atlas",
};

export function CitationEntry({ citation, n, id }: { citation: Citation; n?: number; id?: string }) {
  const c = citation;
  return (
    <li id={id} className="scroll-mt-24 text-[0.8125rem] leading-relaxed text-ink-soft">
      <div className="flex gap-2">
        {n !== undefined && <span className="w-5 shrink-0 font-semibold text-muted">{n}.</span>}
        <div className="min-w-0 space-y-0.5">
          <a href={c.url} target="_blank" rel="noopener noreferrer" className="font-medium text-ink underline decoration-ink/25 underline-offset-2 hover:decoration-teal-strong">
            {c.title}
            <Icon.External className="ml-1 inline-block align-[-1px]" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <p className="text-muted">
            {c.authors}
            {c.year ? ` (${c.year})` : ""}. {c.publisher}. <span className="whitespace-nowrap">{TYPE_LABEL[c.sourceType]}</span>
            {c.animalResearch && (
              <span className="ml-1 whitespace-nowrap rounded bg-amber-soft px-1.5 py-px text-[0.6875rem] font-semibold text-amber-strong">
                {c.animalResearch === "primarily" ? "Mainly animal research" : "Includes animal research"}
              </span>
            )}
          </p>
          <p className="text-muted">{c.note}</p>
          {c.fullTextUrl && (
            <a href={c.fullTextUrl} target="_blank" rel="noopener noreferrer" className="inline-block font-medium text-teal-strong underline-offset-2 hover:underline">
              Free full text<span className="sr-only"> for {c.title} (opens in a new tab)</span>
            </a>
          )}
        </div>
      </div>
    </li>
  );
}

export function SourceList({ citations, idPrefix, heading = "Sources" }: { citations: Citation[]; idPrefix: string; heading?: string }) {
  if (!citations.length) return null;
  return (
    <section aria-labelledby={`${idPrefix}-sources-h`} className="space-y-3">
      <h3 id={`${idPrefix}-sources-h`} className="eyebrow">{heading}</h3>
      <ol className="space-y-3">
        {citations.map((c, i) => (
          <CitationEntry key={c.id} citation={c} n={i + 1} id={`${idPrefix}-src-${c.id}`} />
        ))}
      </ol>
    </section>
  );
}

import { citations, referencedCitationIds, regions } from "@/content";
import { CitationEntry, ClaimItem, EVIDENCE_LABEL, numberCitations, SourceList } from "./Claims";
import { RegionDetails } from "./RegionDetails";
import { Wordmark } from "./ui";

export function AboutSection() {
  const { list, numbering } = numberCitations(["myth-reverse-inference", "myth-decoding", "model-source", "individual-variability"]);
  return (
    <section id="about" aria-labelledby="about-h" className="scroll-mt-6">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <div className="glass-strong space-y-5 rounded-[var(--radius-glass)] p-6 sm:p-8">
          <p className="eyebrow">About</p>
          <h2 id="about-h" className="display text-[2.25rem] text-ink sm:text-[2.75rem]">About Psyna</h2>
          <p className="text-[1rem] leading-relaxed text-ink-soft">
            Psyna is an educational exhibit for curious beginners. Each part of the brain opens a psychological trait,
            such as self-control, empathy, or nostalgia, explained through findings from published research. The brain is
            a way in, not an explanation: traits emerge from many brain areas working together, not from isolated
            “centers”.
          </p>
          <div role="note" className="rounded-2xl border border-amber/40 bg-amber-soft/70 p-4">
            <p className="text-[0.9375rem] font-semibold text-ink">Educational purpose only</p>
            <p className="mt-1 text-[0.875rem] leading-relaxed text-ink-soft">
              Psyna does not diagnose, assess, or score anyone, and it does not give medical or treatment advice.
              Nothing here describes your own brain. If you have concerns about your health, please talk to a qualified
              professional.
            </p>
          </div>
          <div role="note" className="rounded-2xl border border-white/80 bg-white/60 p-4">
            <p className="text-[0.9375rem] font-semibold text-ink">Review status</p>
            <p className="mt-1 text-[0.875rem] leading-relaxed text-ink-soft">
              The text was written from the cited sources, and each source&apos;s details were checked (see dates in Sources).
              It has <strong>not</strong> been reviewed by an independent psychologist, neuroscientist, or clinician.
            </p>
          </div>
        </div>

        <div className="glass-strong space-y-5 rounded-[var(--radius-glass)] p-6 sm:p-8">
          <h3 className="text-[1.25rem] font-semibold tracking-[-0.01em] text-ink">How to read what you see</h3>
          <ul className="space-y-3 text-[0.9375rem] leading-relaxed text-ink-soft">
            <li><strong className="font-semibold text-ink">A simplified selection.</strong> Only six broad region groups are selectable, each paired with one trait. Every trait draws on many other brain areas too.</li>
            <li><strong className="font-semibold text-ink">Illustrations, not recordings.</strong> Highlights, transitions, glass, and colour are explanatory styling. They do not show measured brain activity or the timing of signals.</li>
            <li><strong className="font-semibold text-ink">General anatomy.</strong> Boundaries and functions differ between people. The model represents an average adult brain.</li>
            <li><strong className="font-semibold text-ink">Deep structures are inside.</strong> The hippocampus and amygdala are revealed through a faded outer surface; they are not on the brain&apos;s exterior.</li>
          </ul>
          <div>
            <p className="eyebrow mb-2">Kinds of evidence</p>
            <dl className="grid gap-2 sm:grid-cols-2">
              {Object.entries(EVIDENCE_LABEL).map(([k, v]) => (
                <div key={k} className="rounded-xl bg-white/60 p-3">
                  <dt><span className={`inline-flex rounded-full px-2 py-0.5 text-[0.6875rem] font-semibold ${v.className}`}>{v.label}</span></dt>
                  <dd className="mt-1 text-[0.8125rem] leading-snug text-muted">{v.title}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <p className="eyebrow mb-2">Brain scans and the mind</p>
            <ul className="space-y-3">
              {["myth-reverse-inference", "myth-decoding"].map((id) => (
                <ClaimItem key={id} claimId={id} numbering={numbering} idPrefix="about" />
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-2">The 3D model</p>
            <ul className="space-y-3">
              {["model-source", "individual-variability"].map((id) => (
                <ClaimItem key={id} claimId={id} numbering={numbering} idPrefix="about" />
              ))}
            </ul>
            <p className="mt-2 text-[0.8125rem] leading-snug text-muted">
              See ASSET_CREDITS.md in the project for licences and processing details.
            </p>
          </div>
          <SourceList citations={list} idPrefix="about" />
        </div>
      </div>
    </section>
  );
}

export function SourcesSection() {
  const used = referencedCitationIds();
  const list = citations.filter((c) => used.has(c.id));
  const edu = list.filter((c) => c.sourceType === "educational");
  const research = list.filter((c) => c.sourceType !== "educational").sort((a, b) => a.authors.localeCompare(b.authors));
  return (
    <section id="sources" aria-labelledby="sources-h" className="scroll-mt-6">
      <div className="glass-strong space-y-6 rounded-[var(--radius-glass)] p-6 sm:p-8">
        <div className="max-w-2xl space-y-2">
          <p className="eyebrow">Sources</p>
          <h2 id="sources-h" className="display text-[2.25rem] text-ink sm:text-[2.75rem]">Where the claims come from</h2>
          <p className="text-[0.9375rem] leading-relaxed text-ink-soft">
            Introductory explanations draw on educational resources; specific claims cite peer-reviewed reviews or studies.
            Publication years belong to each source. Separately, this project recorded when it checked each source: all{" "}
            {list.length} were checked between 4 and 7 November 2026 — research papers against their published abstracts and
            metadata (Crossref and PubMed), and web pages against their text. Animal research is labelled.
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
          <div>
            <h3 className="eyebrow mb-3">Educational resources</h3>
            <ul className="space-y-4">{edu.map((c) => <CitationEntry key={c.id} citation={c} id={`all-src-${c.id}`} />)}</ul>
          </div>
          <div>
            <h3 className="eyebrow mb-3">Research literature</h3>
            <ul className="grid gap-4 md:grid-cols-2">{research.map((c) => <CitationEntry key={c.id} citation={c} id={`all-src-${c.id}`} />)}</ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/** The psychology behind every trait as plain, readable text (works without WebGL or JavaScript). */
export function TextGuide() {
  return (
    <section id="text-guide" aria-labelledby="guide-h" className="scroll-mt-6">
      <div className="glass-strong space-y-6 rounded-[var(--radius-glass)] p-6 sm:p-8">
        <div className="max-w-2xl space-y-2">
          <p className="eyebrow">Psychology facts</p>
          <h2 id="guide-h" className="display text-[2.25rem] text-ink sm:text-[2.75rem]">Every trait, as readable text</h2>
          <p className="text-[0.9375rem] leading-relaxed text-ink-soft">
            The research behind each psychological trait, drawn from peer-reviewed studies and reviews. Every fact links
            to its source.
          </p>
        </div>
        <div className="grid gap-3 lg:grid-cols-2 lg:items-start">
          {regions.map((r) => (
            <details key={r.id} className="group rounded-2xl border border-white/80 bg-white/55 open:bg-white/75">
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 rounded-2xl px-4 py-3 text-[1rem] font-medium text-ink">
                <span>
                  {r.trait}
                  <span className="block text-[0.8125rem] font-normal text-muted">{r.tagline}</span>
                </span>
                <span aria-hidden="true" className="text-muted transition-transform group-open:rotate-45">+</span>
              </summary>
              <div className="px-4 pb-5">
                <RegionDetails region={r} idPrefix={`guide-${r.id}`} headingLevel={3} showBrainLink={false} />
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="flex flex-col items-start justify-between gap-3 px-2 pb-8 pt-2 text-[0.8125rem] text-muted sm:flex-row sm:items-center">
      <Wordmark />
      <p>An educational project. Not medical advice. Brain model derived from the CerebrA atlas (CC0) and MNI ICBM152 2009c template.</p>
    </footer>
  );
}

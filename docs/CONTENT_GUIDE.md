# Content maintenance guide

All educational content is typed data in `src/content/`. Components only render it, so most content changes need no component edits.

**Framing:** Mind Atlas is psychology-first. Region panels and lesson steps lead with what people experience and do, as shown by behavioural research, and then link that to brain areas. Keep neuroscience detail in `functionClaimIds` / `deeperClaimIds` (shown behind the “deeper detail” expander) and in a lesson step's `brainLink`.

```
src/content/
  types.ts          BrainRegion, EducationalClaim, Citation, GuidedLesson, LessonStep, BrainAssetMapping
  citations.ts      every source (with verification record)
  claims.ts         short factual statements, each citing sources
  regions.ts        the six region panels (reference claims by id)
  lessons.ts        the three guided lessons (reference regions + claims by id)
  assetMapping.ts   region ↔ mesh names, marker anchors, camera presets
  validate.ts       cross-reference checks (run by `npm test`)
  generated/        2D anatomy paths (generated — do not hand-edit)
```

## Editorial rules

1. **Write claims, then cite them.** Every factual statement belongs in `claims.ts` with at least one `citationIds` entry. Panels and lessons point to claims; they never embed uncited facts.
2. **Check the wording against the source.** Read at least the abstract (for papers) or the relevant passage (for web pages). If the source supports a weaker statement, weaken the claim.
3. **Label the evidence** with `evidence`:
   - `anatomy`: where something is.
   - `association`: seen together (most imaging). Not proof of cause.
   - `causal`: from lesions, stimulation, or manipulation. Add a `caveat` if it comes from one case or from animals.
   - `experiment`: a behavioural (psychology) experiment comparing conditions, or a meta-analysis of such experiments.
   - `interpretation`: a model or theory. Say so in the text ("one influential proposal…").
4. **Use contribution language:** "contributes to", "is involved in", "works with". Never assign a trait, emotion, or condition to a single region. `npm test` blocks a few known overclaims ("is the fear center", "controls your personality", "you are left-brained").
5. **Flag animal research** with `animalResearch: "primarily" | "partly"` on the citation, and say so in the claim or caveat.
6. **No diagnosis, scoring, treatment advice, or claims about the reader's own brain.**
7. **Never invent** papers, authors, DOIs, quotations, or reviewer credentials. Never state that content was professionally reviewed unless that review actually happened, and record who did it and when.

## Adding a citation

```ts
{
  id: "author-year",               // stable, kebab-case
  title: "…", authors: "Surname AB, Surname CD, et al.", year: 2020,
  publisher: "Journal or site",
  url: "https://doi.org/10.xxxx/…", doi: "10.xxxx/…",
  fullTextUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC…/", // if public
  sourceType: "review",            // educational | review | meta-analysis | primary-research | case-study | dataset
  note: "One original sentence on why this source matters.",
  verification: { checkedOn: "YYYY-MM-DD", checkedAgainst: "abstract", method: "What you actually checked." },
}
```

- `year` is the **publication** year. `verification.checkedOn` is the date **you** checked it. Keep them separate.
- Record only checks you performed. If you only confirmed metadata, use `checkedAgainst: "metadata-only"`.
- Tip: confirm metadata at `https://api.crossref.org/works/<doi>` and find the abstract and PMC ID through PubMed.

## Adding or editing a lesson step

```ts
{
  id: "memory-7",                         // unique across all lessons
  heading: "Short heading",
  body: "Two or three plain sentences.",
  example: "Optional everyday example.",
  brainLink: "One sentence linking the finding to the highlighted areas.", // must be supported by a claim below
  regionIds: ["hippocampus", "prefrontal-cortex"],  // only the regions this step discusses
  claimIds: ["psy-main-finding", "brain-claim"],     // first = the psychology finding (id starts with psy-); its sources are shown
  revealInternal: true,                   // fade the outer surface (use for deep structures)
}
```

Lessons must have 4–6 steps. Describe overlapping contributions; don't invent a fixed processing sequence.

## Adding a region

1. Add the id to the `RegionId` union in `types.ts`.
2. Add claims, then a `BrainRegion` entry in `regions.ts` with a one-word `mindTag` and a `psychology` list (`{ concept, claimIds }`) that leads the panel. Only list a concept under a region if a claim on the same panel links that area to it, or add a note under `simplifies`.
3. Add a `BrainAssetMapping` in `assetMapping.ts`:
   - If the model has meshes for it, list `meshNames`, `markers` (position + outward normal, model frame), and a `camera` preset.
   - If it **can't be isolated** visually, use `isolation: "not-isolated"`, `meshNames: []`, and an `isolationNote` explaining why. The text panel, list, and lessons still work, and the note appears under "What this explanation simplifies".
4. Run `npm test`. Validation fails on missing regions, claims, citations, or mesh names, and checks mappings against the real GLB.

## Checks

```bash
npm run validate:content   # content + citation + asset-mapping validation
npm test                   # all unit/component tests
npm run check              # typecheck, lint, tests, production build
```

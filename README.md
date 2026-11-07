# Mind Atlas

An educational web app for curious beginners: explore the **psychology of memory, attention, and emotion** — classic findings about how people remember, focus, and feel — on an interactive 3D glass brain that shows the brain areas linked to them. Every claim links to a source.

- **Explore:** rotate and zoom a 3D brain built from open atlas data, and select six broad region groups (prefrontal, parietal, temporal, occipital, hippocampus, amygdala) by marker, by clicking the surface, or from a searchable list. Each panel leads with the psychology (e.g. working memory limits, inattentional blindness, the testing effect, emotion regulation); the neuroscience sits behind a “deeper detail” expander.
- **Guided lessons:** three six-step psychology lessons (*How does memory really work?*, *Why can't we pay attention to everything?*, *What are emotions, and how do we manage them?*). Each step pairs a behavioural finding with an everyday example and a short “brain link”, and highlights the related areas. Back / Next / Replay / Exit.
- **Readable everywhere:** a complete text guide, a labelled 2D anatomy view, and a solid-material view. All content works without WebGL.

> Educational use only. Mind Atlas does not diagnose, assess, or give medical advice.

## Quick start

Requires Node.js 22 (tested on 22.20) and npm.

```bash
npm install
npm run dev          # http://localhost:3000
```

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build / serve |
| `npm test` | Unit and component tests (Vitest + Testing Library) |
| `npm run validate:content` | Content, citation, and asset-mapping validation only |
| `npm run typecheck` / `npm run lint` | TypeScript / ESLint |
| `npm run check` | All of the above plus a production build |
| `npx playwright test` | End-to-end tests in Chromium (desktop + mobile). Starts `npm start` on port 3311, so run `npm run build` first. First run: `npx playwright install chromium` |

`.npmrc` sets `legacy-peer-deps=true` because npm 10's resolver crashes on Vitest's optional peer chain. All required peers are pinned explicitly in `package.json`.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · React Three Fiber 9 + Drei 10 (three.js 0.186) · GSAP 3 for camera and hemisphere transitions.

## Project layout

```
src/app/                 layout, page, global styles (glass design tokens)
src/components/          UI: panels, region list, controls, 2D map, sections
src/components/viewer/   WebGL viewer (lazy-loaded): BrainCanvas, materials, BrainViewer wrapper
src/content/             typed educational content + validation (see docs/CONTENT_GUIDE.md)
src/lib/                 state reducer, storage, hooks
public/models/brain.glb  3D model (see ASSET_CREDITS.md)
scripts/asset-pipeline/  how the model and 2D views were generated
e2e/                     Playwright tests
```

## How it works

- **State** lives in one reducer (`src/lib/atlasState.ts`). Highlighted regions are *derived* from the current panel (selected region or lesson step), so content, list, and 3D highlights can't drift apart. Each camera move is a keyed request; a new request cancels the previous transition, and any user drag interrupts it.
- **The viewer** is a client-only dynamic import, so three.js lives in its own lazily loaded chunk. Rendering is on demand (`frameloop="demand"`): nothing renders while the scene is idle or the tab is hidden. Pixel ratio is capped at 1.75, and there is no post-processing. Materials and geometry are shared. Markers are real `<button>`s positioned each rendered frame without React re-renders.
- **Glass material:** a clear-coated `MeshPhysicalMaterial` whose opacity rises at grazing angles (Fresnel-like), with a depth pre-pass so only the front-most surface is shaded, which avoids transparency sorting artifacts. Deep structures render opaque inside. Selected surface regions also get a dark outline (their mesh boundary edges) and a persistent label, so selection doesn't rely on colour alone.
- **Accessibility:** every function is available through HTML controls (region list with search, toolbar, lesson buttons) with visible focus rings. There is a skip link, live-region announcements, and reduced-motion support (system setting or the in-app toggle). Contrast is checked against the frosted surfaces, and there is a solid fallback when `backdrop-filter` is unsupported or `prefers-contrast: more` is set.
- **Storage:** completed lessons and preferences (material, motion) are saved in `localStorage`. Unavailable, full, or malformed storage falls back to defaults.

## Verification performed

- `npm run typecheck`, `npm run lint`, and `npm run build` pass.
- `npm test`: 35 tests. Content/citation/mapping validation (including mesh names read from the GLB, and that every panel and lesson step leads with a cited psychology finding), reducer behaviour (selection, lesson navigation, exit restoring state), storage failure modes, app-level selection and lesson flows with persistence, and the WebGL-unavailable 2D fallback.
- `npx playwright test`: 6 end-to-end tests in headless Chromium with software WebGL (SwiftShader):
  - the model loads; keyboard selection works and focus is visible
  - dragging rotates without selecting, and a click selects
  - marker click and lesson highlight sync, and Exit restores the explore view
  - model-load failure shows an error, retry works, and content stays usable
  - 2D view, solid view, and reduced motion work
  - mobile (Pixel 7): stacked layout, tap selection, no horizontal scroll
- Layouts were inspected visually at 1440×900 and 390×844.

## Known limitations

**Scientific review**
- The content was researched and written from the cited sources. Each source's metadata was confirmed via Crossref/PubMed (papers) or by reading the page (websites): neuroscience sources on 2026-11-04, psychology sources on 2026-11-05. Claim wording was checked against **abstracts**, not full texts, except for the web pages. Three psychology abstracts came from OpenAlex because PubMed has none (Posner 1980, MacLeod 1991, Godden & Baddeley 1975). Moors et al. 2013 has no abstract, so its claim was checked against the article's opening section.
- The content has **not** been reviewed by an independent psychologist, neuroscientist, or clinician. A domain-expert review is recommended before wider publication.
- Several classic psychology studies are small or unusual (e.g. single-person forgetting-curve studies, one cohort for flashbulb memories, divers in context-dependent memory). Their caveats are shown next to each claim.
- Psychology concepts are listed under the brain area most often linked to them. Behavioural findings such as the testing effect or switch costs are not properly attributed to one area, and the panels say so under “What this explanation simplifies”.
- One source (Scoville & Milner 1957) has no abstract in PubMed. The claim citing it is also supported by a verified review (Squire & Wixted 2011).

**Asset and rendering**
- The model is an average adult brain (MNI ICBM152 2009c), so folds are softer than in an individual brain. Region boundaries are approximate atlas groupings; "prefrontal" includes some premotor cortex. See ASSET_CREDITS.md.
- Structures named in the text but not modelled (thalamus, basal ganglia, hypothalamus, white-matter tracts) are not shown.
- Rendering was verified with software WebGL (SwiftShader) in headless Chromium, not on physical GPUs or real iOS/Android devices. Glass appearance and performance on low-end phones should be checked on hardware.
- The glass appearance is a stylised Fresnel transparency, not true refraction (transmission was avoided for performance and predictability).
- Not yet manually tested with screen readers (VoiceOver/NVDA), in Safari or Firefox, or under Windows High Contrast.

## Credits

Brain surfaces are derived from the **CerebrA** atlas (Manera et al., 2020; CC0) and the **MNI ICBM152 2009c** template (© McConnell Brain Imaging Centre, MNI; see `public/models/LICENSE-ICBM152.txt`). Full details are in [ASSET_CREDITS.md](ASSET_CREDITS.md).

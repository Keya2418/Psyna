# Asset credits

## 3D brain model — `public/models/brain.glb`

This model was **built by this project** from open neuroimaging data, not downloaded as a ready-made 3D asset. That choice gave verifiable licensing and genuinely separate anatomical structures.

| | |
|---|---|
| File | `public/models/brain.glb` (glTF 2.0 binary, `EXT_meshopt_compression` + `KHR_mesh_quantization`) |
| Size | ~1.3 MB, ~180,000 triangles, 19 named meshes |
| Served from | the app itself (no third-party runtime URL) |
| Build scripts | `scripts/asset-pipeline/build_brain_mesh.py`, `scripts/asset-pipeline/optimize.mjs` |

### Source data

1. **CerebrA atlas** — Manera AL, Dadar M, Fonov V, Collins DL (2020). *CerebrA, registration and manual label correction of Mindboggle-101 atlas for MNI-ICBM152 template.* Scientific Data 7:237. https://doi.org/10.1038/s41597-020-0557-9
   - Dataset DOI: https://doi.org/10.12751/g-node.be5e62
   - **Licence: Creative Commons CC0 1.0 Public Domain Dedication.** We checked this on the G-Node DOI landing page on 2026-11-04.
   - File used: `mni_icbm152_CerebrA_tal_nlin_sym_09c.nii` and `CerebrA_LabelDetails.csv` from https://packages.bic.mni.mcgill.ca/mni-models/icbm152/mni_icbm152_nlin_sym_09c_CerebrA_nifti.zip
   - Attribution is not required under CC0, but we credit the authors.

2. **MNI ICBM152 2009c Nonlinear Symmetric template** — grey- and white-matter probability maps (`mni_icbm152_gm_tal_nlin_sym_09c.nii`, `mni_icbm152_wm_tal_nlin_sym_09c.nii`) from https://packages.bic.mni.mcgill.ca/mni-models/icbm152/mni_icbm152_nlin_sym_09c_nifti.zip (project page: https://nist.mni.mcgill.ca/icbm-152-nonlinear-atlases-2009/).
   - Reference: Fonov V, Evans AC, Botteron K, et al. (2011). *Unbiased average age-appropriate atlases for pediatric studies.* NeuroImage 54:313–327. https://doi.org/10.1016/j.neuroimage.2010.07.033
   - **Licence** (from the `COPYING` file distributed with the template), reproduced in full as required:

     > Copyright (C) 1993-2004 Louis Collins, McConnell Brain Imaging Centre, Montreal Neurological Institute, McGill University. Permission to use, copy, modify, and distribute this software and its documentation for any purpose and without fee is hereby granted, provided that the above copyright notice appear in all copies. The authors and McGill University make no representations about the suitability of this software for any purpose. It is provided "as is" without express or implied warranty. The authors are not responsible for any data loss, equipment damage, property loss, or injury to subjects or patients resulting from the use or misuse of this software package.

   - The same notice ships next to the model in `public/models/LICENSE-ICBM152.txt`.

### How the model was made

1. **Orientation.** Both volumes share a 1 mm RAS grid (checked from the NIfTI affine: axes R, A, S). Right-hemisphere CerebrA labels sit at +x. As a sanity check, the mean position of the right superior frontal label is anterior and superior (+34 mm A, +37 mm S).
2. **Outer surface.** For each hemisphere we took the grey + white matter probability, restricted it to voxels whose nearest CerebrA label belongs to that hemisphere's cerebrum, smoothed it lightly (σ = 0.5 mm), and extracted an isosurface (marching cubes at 0.5). We then applied Taubin smoothing. This preserves the template's sulci.
3. **Region painting.** Each surface vertex takes the nearest CerebrA *cortical* label. Faces are split into separate meshes by educational grouping (table below). Surface far from any cortical label, such as the cut through the midline, joins the cingulate/insula context mesh.
4. **Deep structures.** The hippocampus and amygdala were each extracted from their CerebrA label (σ = 0.8 mm smoothing) as closed meshes, one per hemisphere. The cerebellum (from tissue maps, so its folia are kept) and brainstem were extracted the same way.
5. **Web optimisation.** Weld, then meshoptimizer simplification to ~22 % with borders locked (so patches still meet without cracks), then 14-bit position / 10-bit normal quantisation and Meshopt compression.
6. **Marker anchors and camera presets** were generated from the mesh (`scripts/asset-pipeline/anchors.generated.json`). They are stored centrally in `src/content/assetMapping.ts`.

Output frame: x = subject right, y = superior, z = posterior (anterior is −z); 1 unit = 100 mm.

### Mesh → content mapping

| Content region | Meshes | CerebrA labels (DKT protocol) |
|---|---|---|
| Prefrontal cortex | `L_prefrontal`, `R_prefrontal` | superior frontal, rostral & caudal middle frontal, pars opercularis/triangularis/orbitalis, lateral & medial orbitofrontal |
| Parietal cortex | `L_parietal`, `R_parietal` | postcentral, superior & inferior parietal, supramarginal, precuneus |
| Temporal cortex | `L_temporal`, `R_temporal` | superior/middle/inferior temporal, transverse temporal, fusiform, parahippocampal, entorhinal |
| Occipital cortex | `L_occipital`, `R_occipital` | lateral occipital, cuneus, lingual, pericalcarine |
| Hippocampus | `L_hippocampus`, `R_hippocampus` | hippocampus |
| Amygdala | `L_amygdala`, `R_amygdala` | amygdala |
| *(context, not selectable)* | `L/R_motor` | precentral, paracentral |
| *(context)* | `L/R_cingulate_insula` | cingulate labels, insula, midline cut surface |
| *(context)* | `L/R_cerebellum`, `brainstem` | cerebellar grey/white matter & vermis; brainstem + 4th ventricle |

Mesh names were assigned by us from atlas labels. We did not rely on names to establish accuracy: orientation and grouping were checked against atlas coordinates and by visual inspection in the app.

### Known visual limitations

- **Average brain.** The template is an average of many adult MRI scans, so folds are softer than in any individual brain and fine sulci are blurred. It represents general anatomy, not any particular person.
- **Approximate boundaries.** Atlas labels follow sulcal landmarks, and boundaries vary between people. "Prefrontal" has no explicit atlas boundary. Our grouping uses labels anterior to the precentral and paracentral gyri, which includes some premotor cortex (caudal middle frontal, posterior superior frontal).
- **Simplified deep structures.** The hippocampus and amygdala are smoothed single shapes; subfields and nuclei are not shown. They are revealed through a faded outer surface, never drawn on the exterior.
- **Not modelled:** white-matter tracts, thalamus, basal ganglia, hypothalamus, and other structures mentioned in the text.
- **Surface resolution.** Surfaces come from a 1 mm grid and are then decimated; very small details are lost.
- **Illustrative styling.** Glass, colours (including the mint-to-lavender height tint), and transparency are styling choices. They do not represent tissue appearance or activity.

## 2D anatomy views — `src/content/generated/anatomy2d.ts`

Generated by `scripts/asset-pipeline/build_2d_views.py` from the same CerebrA and ICBM152 data. Each view is an orthographic projection of the left hemisphere (lateral and medial), coloured by the same groupings. Deep structures are projected through the surface and drawn as dashed outlines.

## Rebuilding the assets

```bash
python3 -m venv .venv && .venv/bin/pip install -r scripts/asset-pipeline/requirements.txt
# download and unzip the two archives above, then:
.venv/bin/python scripts/asset-pipeline/build_brain_mesh.py <template_dir> <CerebrA.nii> <out_dir>
node scripts/asset-pipeline/optimize.mjs <out_dir>/brain-raw.glb public/models/brain.glb
.venv/bin/python scripts/asset-pipeline/build_2d_views.py <template_dir> <CerebrA.nii> src/content/generated/anatomy2d.ts
node scripts/dev/inspect-normals.mjs public/models/brain.glb   # sanity check: every mesh has outward normals
npm test                                                        # verifies mappings resolve against the model
```

## Fonts and icons

- Typography uses the operating system's font stack (SF Pro on Apple devices, with platform fallbacks). No font files are bundled.
- Icons are simple inline SVGs drawn for this project.

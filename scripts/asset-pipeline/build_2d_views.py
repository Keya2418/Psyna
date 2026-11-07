"""
Generate labelled 2D anatomy views (SVG path data) from the same open atlas data used
for the 3D model, so the 2D fallback matches the 3D grouping.

Views (left hemisphere):
  - lateral: seen from the left side, anterior to the LEFT of the image
  - medial : seen from the midline, anterior to the RIGHT of the image
Deep structures (hippocampus, amygdala) are projected through the surface and drawn
as dashed outlines - they are NOT on the surface.

Usage: python build_2d_views.py <template_dir> <cerebra_nii> <out_ts>
"""
import json
import sys
from pathlib import Path

import nibabel as nib
import numpy as np
from scipy import ndimage
from skimage import measure

template_dir, cerebra_path, out_ts = map(Path, sys.argv[1:4])
lab = np.rint(np.asarray(nib.load(str(cerebra_path)).dataobj)).astype(np.int16)
gm = np.asarray(nib.load(str(template_dir / "mni_icbm152_gm_tal_nlin_sym_09c.nii")).dataobj, dtype=np.float32)
wm = np.asarray(nib.load(str(template_dir / "mni_icbm152_wm_tal_nlin_sym_09c.nii")).dataobj, dtype=np.float32)
tissue = gm + wm

LEFT = {  # left-hemisphere CerebrA ids grouped
    "prefrontal": [89, 52, 93, 83, 73, 95, 58, 66],
    "motor": [86, 67],
    "parietal": [64, 60, 61, 102, 82],
    "temporal": [96, 79, 54, 65, 75, 69, 87],
    "occipital": [85, 63, 94, 57],
    "cingulate_insula": [81, 84, 98, 59, 74],
}
CEREBELLUM = [97, 90, 101, 53, 71]
BRAINSTEM = [62, 11, 88, 37]
HIPPO, AMYG = 99, 70
REGION_ID = {"prefrontal": "prefrontal-cortex", "parietal": "parietal-cortex",
             "temporal": "temporal-cortex", "occipital": "occipital-cortex"}

labelled = lab > 0
_, idx = ndimage.distance_transform_edt(~labelled, return_indices=True)
lab_full = lab[tuple(idx)]
cort_ids = [i for v in LEFT.values() for i in v]
cmask = np.isin(lab, cort_ids)
cdist, cidx = ndimage.distance_transform_edt(~cmask, return_indices=True)
clab = lab[tuple(cidx)]
id_to_group = {i: g for g, ids in LEFT.items() for i in ids}
near = ndimage.binary_dilation(labelled, iterations=3)

left_all = set(cort_ids) | {i for i in range(52, 103)}  # CerebrA LH ids are 52..102
cerebral_left = np.isin(lab_full, list(left_all - set(CEREBELLUM) - set(BRAINSTEM))) & near & (tissue > 0.5)
cereb_left = np.isin(lab_full, CEREBELLUM) & near & (tissue > 0.5)
stem = np.isin(lab, BRAINSTEM)

nx, ny, nz = lab.shape
mid = 96  # voxel index of x = 0 mm


def project(view):
    """Return group image (ny x nz), depth image."""
    G = np.full((ny, nz), "", dtype=object)
    D = np.full((ny, nz), np.nan)
    xs = range(0, mid + 1) if view == "lateral" else range(mid, -1, -1)
    for j in range(ny):
        for k in range(nz):
            for i in xs:
                if cerebral_left[i, j, k]:
                    g = id_to_group.get(int(clab[i, j, k]), "cingulate_insula") if cdist[i, j, k] <= 4 else "other"
                    G[j, k] = g
                    D[j, k] = abs(i - (0 if view == "lateral" else mid))
                    break
                if cereb_left[i, j, k]:
                    G[j, k] = "cerebellum"; D[j, k] = abs(i - (0 if view == "lateral" else mid)); break
                if stem[i, j, k]:
                    G[j, k] = "brainstem"; D[j, k] = abs(i - (0 if view == "lateral" else mid)); break
    return G, D


SCALE = 2.0


def to_img_coords(contour, view):
    # contour rows = y index (posterior->anterior), cols = z index (inferior->superior)
    y, z = contour[:, 0], contour[:, 1]
    X = (ny - 1 - y) if view == "lateral" else y  # lateral: anterior on the left
    Y = (nz - 1 - z)
    return np.c_[X, Y] * SCALE


def paths_for(mask, view, sigma=0.8, tol=0.6, min_len=12):
    m = ndimage.gaussian_filter(mask.astype(float), sigma)
    out = []
    for c in measure.find_contours(np.pad(m, 1), 0.5):
        c = c - 1
        if len(c) < min_len:
            continue
        c = measure.approximate_polygon(c, tolerance=tol)
        pts = to_img_coords(c, view)
        out.append("M" + " L".join(f"{x:.1f},{y:.1f}" for x, y in pts) + " Z")
    return out


def label_point(mask, view):
    if not mask.any():
        return None
    lbl, n = ndimage.label(mask)
    sizes = ndimage.sum(mask, lbl, range(1, n + 1))
    biggest = lbl == (np.argmax(sizes) + 1)
    d = ndimage.distance_transform_edt(biggest)
    j, k = np.unravel_index(np.argmax(d), d.shape)
    p = to_img_coords(np.array([[j, k]], dtype=float), view)[0]
    return [round(float(p[0]), 1), round(float(p[1]), 1)]


views = []
for view in ["lateral", "medial"]:
    G, D = project(view)
    occupied = G != ""
    js, ks = np.nonzero(occupied)
    regions = []
    for g in ["prefrontal", "motor", "parietal", "temporal", "occipital", "cingulate_insula", "other",
              "cerebellum", "brainstem"]:
        mask = G == g
        if mask.sum() < 30:
            continue
        regions.append({"group": g, "regionId": REGION_ID.get(g), "paths": paths_for(mask, view),
                        "label": label_point(mask, view)})
    # sulci from depth: deeper than local surroundings
    Dz = np.where(np.isnan(D), np.nanmax(D), D)
    local = ndimage.gaussian_filter(Dz, 4)
    sulc = (Dz - local > 2.2) & occupied
    sulc = ndimage.binary_opening(sulc, iterations=1)
    sulci = paths_for(sulc, view, sigma=0.6, tol=0.7, min_len=34)
    # deep structures projected through the hemisphere
    deep = []
    for rid, lid in [("hippocampus", HIPPO), ("amygdala", AMYG)]:
        pm = np.isin(lab[: mid + 1], [lid]).any(axis=0)
        deep.append({"regionId": rid, "paths": paths_for(pm, view, sigma=1.0), "label": label_point(pm, view)})
    outline = paths_for(occupied, view, sigma=1.0)
    views.append({
        "id": view,
        "width": int(ny * SCALE), "height": int(nz * SCALE),
        "anteriorSide": "left" if view == "lateral" else "right",
        "outline": outline, "regions": regions, "sulci": sulci, "deep": deep,
    })
    print(view, {r["group"]: len(r["paths"]) for r in regions}, "sulci", len(sulci))

# crop viewBox to content
for v in views:
    allpts = []
    for p in v["outline"]:
        for tok in p.replace("M", "").replace("Z", "").split(" L"):
            x, y = tok.strip().split(",")
            allpts.append((float(x), float(y)))
    a = np.array(allpts)
    pad = 12
    v["viewBox"] = [round(a[:, 0].min() - pad, 1), round(a[:, 1].min() - pad, 1),
                    round(np.ptp(a[:, 0]) + 2 * pad, 1), round(np.ptp(a[:, 1]) + 2 * pad, 1)]

header = ("// AUTO-GENERATED by scripts/asset-pipeline/build_2d_views.py — do not edit by hand.\n"
          "// Source: CerebrA atlas (CC0) + MNI ICBM152 2009c sym tissue maps. Left hemisphere.\n"
          "import type { AnatomyView2D } from \"../types\";\n\n")
out_ts.write_text(header + "export const anatomyViews2D: AnatomyView2D[] = " + json.dumps(views) + ";\n")
print("wrote", out_ts, out_ts.stat().st_size, "bytes")

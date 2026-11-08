"""
Build the Psyna brain model from open neuroimaging data.

Inputs (download separately, see ASSET_CREDITS.md):
  - MNI ICBM 2009c Nonlinear Symmetric template (GM/WM probability maps)
  - CerebrA atlas label volume (CC0) on the same template grid

Output:
  - brain-raw.glb      : named meshes in a Y-up coordinate frame
  - anchors.json       : per-mesh marker anchors and centroids (model units)

Coordinate frame of the output:
  x = subject Right, y = Superior, z = Posterior (i.e. anterior is -z)
  1 model unit = 100 mm, centred on the cerebrum bounding-box centre.

Usage:
  python build_brain_mesh.py <template_dir> <cerebra_nii> <out_dir>
"""
import json
import sys
from pathlib import Path

import nibabel as nib
import numpy as np
import trimesh
from scipy import ndimage
from skimage import measure

template_dir, cerebra_path, out_dir = map(Path, sys.argv[1:4])
out_dir.mkdir(parents=True, exist_ok=True)

lab_img = nib.load(str(cerebra_path))
lab = np.rint(np.asarray(lab_img.dataobj)).astype(np.int16)
affine = lab_img.affine
gm = np.asarray(nib.load(str(template_dir / "mni_icbm152_gm_tal_nlin_sym_09c.nii")).dataobj, dtype=np.float32)
wm = np.asarray(nib.load(str(template_dir / "mni_icbm152_wm_tal_nlin_sym_09c.nii")).dataobj, dtype=np.float32)
assert gm.shape == lab.shape, (gm.shape, lab.shape)
tissue = gm + wm

# CerebrA label ids: (right, left) from CerebrA_LabelDetails.csv
L = {
    "superior_frontal": (38, 89), "rostral_middle_frontal": (1, 52), "caudal_middle_frontal": (42, 93),
    "pars_opercularis": (32, 83), "pars_triangularis": (22, 73), "pars_orbitalis": (44, 95),
    "lateral_orbitofrontal": (7, 58), "medial_orbitofrontal": (15, 66),
    "precentral": (35, 86), "paracentral": (16, 67),
    "postcentral": (13, 64), "superior_parietal": (9, 60), "inferior_parietal": (10, 61),
    "supramarginal": (51, 102), "precuneus": (31, 82),
    "superior_temporal": (45, 96), "middle_temporal": (28, 79), "inferior_temporal": (3, 54),
    "transverse_temporal": (14, 65), "fusiform": (24, 75), "parahippocampal": (18, 69), "entorhinal": (36, 87),
    "lateral_occipital": (34, 85), "lingual": (12, 63), "cuneus": (43, 94), "pericalcarine": (6, 57),
    "caudal_anterior_cingulate": (30, 81), "isthmus_cingulate": (33, 84), "posterior_cingulate": (47, 98),
    "rostral_anterior_cingulate": (8, 59), "insula": (23, 74),
    "hippocampus": (48, 99), "amygdala": (19, 70),
    "brainstem": (11, 62),
    "cerebellum_gm": (46, 97), "cerebellum_wm": (39, 90),
    "vermis_1_5": (50, 101), "vermis_6_7": (2, 53), "vermis_8_10": (20, 71),
    "third_ventricle": (29, 80), "fourth_ventricle": (37, 88), "optic_chiasm": (17, 68),
    "lateral_ventricle": (41, 92), "inf_lateral_ventricle": (5, 56), "thalamus": (40, 91),
    "caudate": (49, 100), "putamen": (21, 72), "pallidum": (27, 78), "accumbens": (4, 55),
    "ventral_dc": (26, 77), "basal_forebrain": (25, 76),
}

# Broad educational groupings of cortical surface labels.
CORTEX_GROUPS = {
    # Approximation: DKT has no explicit prefrontal boundary. Caudal middle frontal and the
    # posterior superior frontal gyrus include premotor territory. Documented in ASSET_CREDITS.md.
    "prefrontal": ["superior_frontal", "rostral_middle_frontal", "caudal_middle_frontal", "pars_opercularis",
                   "pars_triangularis", "pars_orbitalis", "lateral_orbitofrontal", "medial_orbitofrontal"],
    "motor": ["precentral", "paracentral"],
    "parietal": ["postcentral", "superior_parietal", "inferior_parietal", "supramarginal", "precuneus"],
    "temporal": ["superior_temporal", "middle_temporal", "inferior_temporal", "transverse_temporal",
                 "fusiform", "parahippocampal", "entorhinal"],
    "occipital": ["lateral_occipital", "lingual", "cuneus", "pericalcarine"],
    "cingulate_insula": ["caudal_anterior_cingulate", "isthmus_cingulate", "posterior_cingulate",
                         "rostral_anterior_cingulate", "insula"],
}
CEREBELLUM = ["cerebellum_gm", "cerebellum_wm", "vermis_1_5", "vermis_6_7", "vermis_8_10"]
NON_CEREBRAL = CEREBELLUM + ["brainstem", "fourth_ventricle"]
SIDES = {"R": 0, "L": 1}


def ids(names, side):
    return [L[n][SIDES[side]] for n in names]


labelled = lab > 0
# Nearest-label propagation so every voxel near the brain has a label.
_, nearest_idx = ndimage.distance_transform_edt(~labelled, return_indices=True)
lab_full = lab[tuple(nearest_idx)]

right_ids = {v[0] for v in L.values()}
left_ids = {v[1] for v in L.values()}
non_cerebral_ids = {L[n][0] for n in NON_CEREBRAL} | {L[n][1] for n in NON_CEREBRAL}

# Cortical-only nearest label map (for painting surface vertices).
cortical_ids = set()
for g in CORTEX_GROUPS.values():
    for s in SIDES:
        cortical_ids |= set(ids(g, s))
cortical_mask = np.isin(lab, list(cortical_ids))
cort_dist, cort_idx = ndimage.distance_transform_edt(~cortical_mask, return_indices=True)
cort_lab = lab[tuple(cort_idx)]

label_to_group = {}
for gname, names in CORTEX_GROUPS.items():
    for s in SIDES:
        for i in ids(names, s):
            label_to_group[i] = gname

brain_region = ndimage.binary_dilation(labelled, iterations=3)


def vox_to_model(v):
    """voxel ijk -> RAS mm -> model frame (x=R, y=S, z=-A)."""
    ras = (affine @ np.c_[v, np.ones(len(v))].T).T[:, :3]
    return np.c_[ras[:, 0], ras[:, 2], -ras[:, 1]]


def iso_mesh(field, level=0.5, smooth_iters=8):
    field = np.pad(field, 1)
    verts, faces, _, _ = measure.marching_cubes(field, level=level)
    verts -= 1
    m = trimesh.Trimesh(vertices=verts, faces=faces[:, ::-1], process=True)
    # keep the largest connected component(s) to drop speckle
    parts = m.split(only_watertight=False)
    parts = sorted(parts, key=lambda p: len(p.faces), reverse=True)
    keep = [p for p in parts if len(p.faces) > 0.02 * len(parts[0].faces)]
    m = trimesh.util.concatenate(keep)
    trimesh.smoothing.filter_taubin(m, lamb=0.5, nu=-0.53, iterations=smooth_iters)
    return m


meshes = {}  # name -> (vertices_model, faces, normals)
anchors = {}


def add_mesh(name, verts_vox, faces, normals_vox=None):
    vm = vox_to_model(verts_vox)
    meshes[name] = (vm, faces)


# ---- Cerebral hemispheres, painted by lobe groups --------------------------------
for side in SIDES:
    side_ids = right_ids if side == "R" else left_ids
    cerebral = np.isin(lab_full, list(side_ids - non_cerebral_ids)) & brain_region
    field = ndimage.gaussian_filter(tissue * cerebral, 0.5)
    m = iso_mesh(field)
    v = m.vertices
    vi = np.clip(np.rint(v).astype(int), 0, np.array(lab.shape) - 1)
    vlab = cort_lab[vi[:, 0], vi[:, 1], vi[:, 2]]
    vdist = cort_dist[vi[:, 0], vi[:, 1], vi[:, 2]]
    vgroup = np.array([label_to_group.get(int(x), "cingulate_insula") for x in vlab], dtype=object)
    vgroup[vdist > 4] = "core"  # medial cut surface far from any cortical label
    # face group = majority vote of its vertices
    fg = vgroup[m.faces]
    face_group = np.where(fg[:, 1] == fg[:, 2], fg[:, 1], fg[:, 0])
    for g in list(CORTEX_GROUPS) + ["core"]:
        sel = face_group == g
        if not sel.any():
            continue
        sub = m.submesh([np.nonzero(sel)[0]], append=True)
        target = "cingulate_insula" if g == "core" else g
        key = f"{side}_{target}"
        if key in meshes:
            pv, pf = meshes[key]
            nv = vox_to_model(sub.vertices)
            meshes[key] = (np.vstack([pv, nv]), np.vstack([pf, sub.faces + len(pv)]))
        else:
            add_mesh(key, sub.vertices, sub.faces)
    print(side, "hemisphere faces", len(m.faces))

# ---- Internal structures ------------------------------------------------------------
for name in ["hippocampus", "amygdala"]:
    for side in SIDES:
        mask = np.isin(lab, ids([name], side)).astype(np.float32)
        field = ndimage.gaussian_filter(mask, 0.8)
        m = iso_mesh(field, level=0.45, smooth_iters=10)
        add_mesh(f"{side}_{name}", m.vertices, m.faces)

# ---- Cerebellum (with folia from tissue map) and brainstem --------------------------
for side in SIDES:
    cb = np.isin(lab_full, ids(CEREBELLUM, side)) & brain_region
    m = iso_mesh(ndimage.gaussian_filter(tissue * cb, 0.6))
    add_mesh(f"{side}_cerebellum", m.vertices, m.faces)
bs = np.isin(lab, [L["brainstem"][0], L["brainstem"][1], L["fourth_ventricle"][0], L["fourth_ventricle"][1]])
m = iso_mesh(ndimage.gaussian_filter(bs.astype(np.float32), 1.0), level=0.45, smooth_iters=10)
add_mesh("brainstem", m.vertices, m.faces)

# ---- Normalise to model units -------------------------------------------------------
cerebrum_pts = np.vstack([v for k, (v, f) in meshes.items() if k[2:] in CORTEX_GROUPS])
center = (cerebrum_pts.min(0) + cerebrum_pts.max(0)) / 2
SCALE = 0.01  # mm -> model units (1 unit = 100 mm)

scene = trimesh.Scene()
for name, (v, f) in meshes.items():
    vm = (v - center) * SCALE
    tm = trimesh.Trimesh(vertices=vm, faces=f, process=True)
    tm.fix_normals()
    _ = tm.vertex_normals  # compute & cache so normals are exported for every mesh
    tm.metadata["name"] = name
    scene.add_geometry(tm, node_name=name, geom_name=name)
    # anchor: vertex closest to the centroid's outward projection (surface patches) or centroid (internal)
    c = tm.vertices.mean(0)
    sx = 1.0 if c[0] >= 0 else -1.0
    # Preferred outward directions (x sign follows hemisphere) for placing surface markers.
    pref = {"prefrontal": (0.45, 0.35, -1.0), "parietal": (0.55, 0.9, 0.55), "temporal": (1.0, -0.35, -0.1),
            "occipital": (0.3, 0.05, 1.0), "motor": (0.5, 1.0, 0.0), "cingulate_insula": (1.0, 0.0, -0.2),
            "cerebellum": (0.5, -0.6, 1.0)}
    normal = [0.0, 0.0, 0.0]
    if name.endswith(("hippocampus", "amygdala")) or name == "brainstem":
        anchor = c
    else:
        key = name[2:]
        d = np.array(pref.get(key, (1, 0, 0)), dtype=float)
        d[0] *= sx
        d /= np.linalg.norm(d)
        score = tm.vertices.dot(d)
        i = int(np.argmax(score))
        anchor = tm.vertices[i]
        normal = tm.vertex_normals[i].round(4).tolist()
    anchors[name] = {"anchor": [round(float(x), 4) for x in anchor],
                     "normal": normal,
                     "centroid": [round(float(x), 4) for x in c],
                     "faces": int(len(tm.faces))}
    print(f"{name:28s} faces={len(tm.faces):7d}")

scene.export(str(out_dir / "brain-raw.glb"))
bb = np.vstack([(v - center) * SCALE for v, f in meshes.values()])
anchors["_bounds"] = {"min": bb.min(0).round(4).tolist(), "max": bb.max(0).round(4).tolist()}
anchors["_frame"] = "x=Right, y=Superior, z=Posterior (anterior is -z); 1 unit = 100 mm; source MNI ICBM152 2009c sym"
(out_dir / "anchors.json").write_text(json.dumps(anchors, indent=2))
print("done", out_dir)

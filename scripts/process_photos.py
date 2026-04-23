#!/usr/bin/env python3
"""Curate and resize photos for christianmillerfilm.com website."""
from pathlib import Path
from PIL import Image
import os, sys

SITE_DIR = Path("/sessions/dreamy-zealous-cori/mnt/Bryan & Amy Pregnancy Shoot Miami/christianmillerfilm-site")
IMG_OUT = SITE_DIR / "public" / "images"

# (source_folder, filename_prefix, slug, picks_count)
# "picks_count" is how many photos we want in the curated set
SHOOTS = [
    ("/sessions/dreamy-zealous-cori/mnt/Bryan & Amy Pregnancy Shoot Miami",
     "Miami, South Beath, Bryan And Amy Preganncy Shoot-",
     "bryan-and-amy", 14),
    ("/sessions/dreamy-zealous-cori/mnt/Miami Shoot 1",
     "MiamiShoot1-",
     "vizcaya", 14),
    ("/sessions/dreamy-zealous-cori/mnt/Miami Shoot 2",
     "MiamiShoot2-",
     "miami-portraits", 14),
    ("/sessions/dreamy-zealous-cori/mnt/Miami Shoot 3",
     "MiamiShoot3-",
     "koi-gardens", 14),
    ("/sessions/dreamy-zealous-cori/mnt/MEYLY GRAD FINAL",
     "Meyly&FriendsGrad-",
     "meyly-graduation", 14),
]

MAX_WIDTH = 1800
QUALITY = 80

def get_numbered_files(folder, prefix):
    """Return list of (number, filepath) sorted by number."""
    folder = Path(folder)
    files = []
    for f in folder.glob("*.jpg"):
        name = f.name
        if not name.startswith(prefix):
            continue
        num_str = name[len(prefix):].split(".")[0]
        try:
            num = int(num_str)
            files.append((num, f))
        except ValueError:
            continue
    files.sort(key=lambda x: x[0])
    return files

def pick_indices(total, count):
    """Pick `count` evenly-spaced indices from range [0, total)."""
    if total <= count:
        return list(range(total))
    # Always include first and last, space the rest evenly
    step = (total - 1) / (count - 1)
    return [round(i * step) for i in range(count)]

def resize_to_jpeg(src_path, dst_path, max_w=MAX_WIDTH, quality=QUALITY):
    im = Image.open(src_path)
    im = im.convert("RGB")
    w, h = im.size
    if w > max_w:
        new_h = round(h * (max_w / w))
        im = im.resize((max_w, new_h), Image.LANCZOS)
    dst_path.parent.mkdir(parents=True, exist_ok=True)
    im.save(dst_path, "JPEG", quality=quality, optimize=True, progressive=True)
    return dst_path.stat().st_size

total_bytes = 0
manifest = {}  # slug -> list of relative image paths

for folder, prefix, slug, count in SHOOTS:
    print(f"\n=== {slug} ===", flush=True)
    files = get_numbered_files(folder, prefix)
    print(f"  found {len(files)} source photos", flush=True)
    indices = pick_indices(len(files), count)
    picks = [files[i] for i in indices]
    manifest[slug] = []
    out_dir = IMG_OUT / slug
    for i, (num, src) in enumerate(picks, start=1):
        dst_name = f"{slug}-{i:02d}.jpg"
        dst = out_dir / dst_name
        size = resize_to_jpeg(src, dst)
        total_bytes += size
        manifest[slug].append(f"/images/{slug}/{dst_name}")
        print(f"  [{i:02d}] from #{num} -> {dst_name} ({size//1024}KB)", flush=True)

print(f"\nTotal output size: {total_bytes // 1024 // 1024} MB")

# Save manifest for the Next.js app to import
import json
manifest_path = SITE_DIR / "data" / "photos.json"
manifest_path.parent.mkdir(parents=True, exist_ok=True)
with open(manifest_path, "w") as f:
    json.dump(manifest, f, indent=2)
print(f"\nManifest written to {manifest_path}")

"""Make publishable enemy images and gameplay from the originals in resources/.

Dependencies: python -m pip install Pillow imageio-ffmpeg
The source files stay untouched. Run this script after replacing them.
"""

from pathlib import Path
import subprocess

import imageio_ffmpeg
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "resources"
GAME = ROOT / "public" / "media" / "game"
OPTIMIZED = ROOT / "public" / "media" / "optimized"
FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()

GAME.mkdir(parents=True, exist_ok=True)
OPTIMIZED.mkdir(parents=True, exist_ok=True)

images = {
    "piranha.png": "pirana.webp",
    "lamprea.png": "lamprea.webp",
    "pez_linterna2.png": "pez-linterna-2.webp",
    "pez_ciego.png": "pez-ciego.webp",
    "tiburonres.png": "tiburon.webp",
    "orca.png": "orca.webp",
    "bloop.png": "bloop.webp",
}

for source_name, target_name in images.items():
    with Image.open(SOURCE / source_name) as image:
        image.convert("RGB").save(GAME / target_name, "WEBP", quality=86, method=6)
    print(f"Imagen: {target_name}", flush=True)


def run(*arguments):
    subprocess.run([FFMPEG, "-hide_banner", "-loglevel", "error", "-y", *arguments], check=True)


original = SOURCE / "anadromo_gameplay.mp4"
target = OPTIMIZED / "anadromo-gameplay.mp4"
poster = OPTIMIZED / "anadromo-gameplay.webp"
temporary = OPTIMIZED / "anadromo-gameplay.partial.mp4"
try:
    run(
        "-i", str(original), "-map", "0:v:0", "-map", "0:a:0?",
        "-vf", "scale=854:480:force_original_aspect_ratio=decrease:force_divisible_by=2,fps=24",
        "-c:v", "libx264", "-preset", "veryfast", "-threads", "2",
        "-b:v", "850k", "-maxrate", "850k", "-bufsize", "1700k", "-pix_fmt", "yuv420p",
        "-c:a", "aac", "-b:a", "64k", "-ac", "2", "-movflags", "+faststart",
        str(temporary),
    )
    if temporary.stat().st_size > 90_000_000:
        raise RuntimeError("El gameplay optimizado supera el límite de 90 MB")
    temporary.replace(target)
    run("-ss", "60", "-i", str(target), "-frames:v", "1", "-q:v", "80", str(poster))
finally:
    temporary.unlink(missing_ok=True)

print(f"Gameplay: {target.stat().st_size / 1e6:.1f} MB", flush=True)

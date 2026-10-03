"""Create web copies without changing the source recordings or PDFs.

Install optional tools locally: python -m pip install --target .cache/tools imageio-ffmpeg pymupdf
Run: python scripts/prepare-media.py
"""
from pathlib import Path
import concurrent.futures
import json
import re
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / '.cache' / 'tools'))
import imageio_ffmpeg
import pymupdf

FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
DEST = ROOT / 'public' / 'media' / 'optimized'
DEST.mkdir(parents=True, exist_ok=True)
config = json.loads((ROOT / 'content' / 'media.json').read_text(encoding='utf-8'))

def run(args):
    result = subprocess.run([FFMPEG, '-hide_banner', '-loglevel', 'error', '-y', *args], capture_output=True, text=True)
    if result.returncode:
        raise RuntimeError(result.stderr[-2500:])

def encode(name):
    source = ROOT / 'public' / 'media' / 'videos' / f'{name}.mp4'
    target = DEST / f'{name}.mp4'
    poster = DEST / f'{name}.webp'
    if not source.exists():
        raise FileNotFoundError(source)
    with source.open('rb') as handle:
        if handle.read(50).startswith(b'version https://git-lfs'):
            raise RuntimeError(f'Descarga primero el original LFS: {source.name}')
    if target.exists() and poster.exists() and target.stat().st_mtime > source.stat().st_mtime:
        print(f'Conservado: {name}', flush=True)
        return
    probe = subprocess.run([FFMPEG, '-hide_banner', '-i', str(source)], capture_output=True, text=True)
    match = re.search(r'Duration: (\d+):(\d+):(\d+\.\d+)', probe.stderr)
    if not match:
        raise RuntimeError(f'No se pudo leer la duración: {name}')
    h, m, s = map(float, match.groups())
    duration = h * 3600 + m * 60 + s
    # Budget at most ~70 MB per full recording; preserve the entire duration.
    rate = int(min(850, 70_000_000 * 8 / duration / 1000 - 64))
    if rate < 120:
        raise RuntimeError(f'{name}: demasiado largo para el presupuesto local; usar alojamiento externo.')
    temporary = DEST / f'{name}.partial.mp4'
    print(f'Optimizando {name}: {duration:.0f}s, {rate} kb/s', flush=True)
    try:
        run(['-i', str(source), '-map', '0:v:0', '-map', '0:a:0?', '-vf', "scale=640:480:force_original_aspect_ratio=decrease:force_divisible_by=2,fps=24", '-c:v', 'libx264', '-preset', 'veryfast', '-threads', '2', '-b:v', f'{rate}k', '-maxrate', f'{rate}k', '-bufsize', f'{rate * 2}k', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '64k', '-ac', '2', '-movflags', '+faststart', str(temporary)])
        if temporary.stat().st_size > 90_000_000:
            raise RuntimeError(f'Copia demasiado grande: {name}')
        temporary.replace(target)
        run(['-ss', str(min(3, duration / 2)), '-i', str(target), '-frames:v', '1', '-q:v', '80', str(poster)])
        print(f'Listo: {name} ({target.stat().st_size / 1e6:.1f} MB)', flush=True)
    finally:
        if temporary.exists():
            temporary.unlink()

for source, target in [('Anadromo_bocetos.pdf', 'bocetos-preview.webp'), ('Anadromo_storyboard.pdf', 'storyboard-preview.webp')]:
    directory = ROOT / 'public' / 'media' / 'storyboard'
    with pymupdf.open(directory / source) as doc:
        page = doc[0]
        pix = page.get_pixmap(matrix=pymupdf.Matrix(1400 / page.rect.width, 1400 / page.rect.width), alpha=False)
        from PIL import Image
        image = Image.frombytes('RGB', [pix.width, pix.height], pix.samples)
        image.save(directory / target, 'WEBP', quality=88)
        print(f'PDF: {source}, {len(doc)} páginas', flush=True)

names = [part for video in config['videos'] for part in video['parts']]
with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:
    list(pool.map(encode, names))
print('Medios preparados. Los originales se han conservado.', flush=True)

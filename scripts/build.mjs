import { readFile, writeFile, mkdir, cp, stat, open, rm } from 'node:fs/promises';
import { resolve, dirname, relative, sep } from 'node:path';
import { marked } from 'marked';

const root = resolve(import.meta.dirname, '..');
const output = resolve(root, 'dist');
// Only this generated directory may be cleared; source files stay outside it.
if (dirname(output) !== root || relative(root, output) !== 'dist') throw new Error('Directorio de salida no seguro');
await rm(output, { recursive: true, force: true });
const text = p => readFile(resolve(root, p), 'utf8');
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
async function document(name) {
  const tokens = marked.lexer(await text(`content/${name}.md`));
  const result = { title: '', intro: '', sections: [] };
  let block = [];
  let current = null;
  const flush = () => { const html = marked.parser(block); if (current) current.html = html; else result.intro = html; block = []; };
  for (const token of tokens) {
    if (token.type === 'heading' && token.depth === 1) result.title = token.text;
    else if (token.type === 'heading' && token.depth === 2) { flush(); current = { title: token.text }; result.sections.push(current); }
    else block.push(token);
  }
  flush();
  return result;
}
const [overview, story, ideation, storyboard, mechanics, experience, playtests, credits] = await Promise.all(['overview', 'story', 'ideation', 'storyboard', 'mechanics', 'experience', 'playtests', 'credits'].map(document));
const media = JSON.parse(await text('content/media.json'));
const arrow = '<span aria-hidden="true">↗</span>';
const external = (url, label, cls = 'text-link') => `<a class="${cls}" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${label} ${arrow}<span class="sr-only"> (abre otra pestaña)</span></a>`;
const heading = (number, label, doc) => `<div class="section-heading"><p class="eyebrow"><span>${number}</span> ${label}</p><h2>${esc(doc.title)}</h2><div class="lead">${doc.intro}</div></div>`;
const icons = {
  swim: '<path d="M3 16q5-7 10 0t10 0M3 22q5-7 10 0t10 0M8 9l5-5 7 6M13 4v12"/>',
  compass: '<circle cx="14" cy="14" r="11"/><path d="m18 9-3 8-6 3 3-8Z"/>',
  hunger: '<path d="M14 3c1 6 8 8 8 14a8 8 0 0 1-16 0c0-6 7-8 8-14Z"/><path d="M10 18q0 4 4 4"/>',
  shake: '<path d="m5 5-3 5 4 4M23 23l3-5-4-4M10 22V10a2 2 0 0 1 4 0v6-9a2 2 0 0 1 4 0v12l-4 5Z"/>'
};
const icon = name => `<svg viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]}</svg>`;
const files = new Set(['favicon.svg', 'media/ocean.svg', 'media/storyboard/Anadromo_bocetos.pdf', 'media/storyboard/Anadromo_storyboard.pdf', 'media/storyboard/bocetos-preview.webp', 'media/storyboard/storyboard-preview.webp']);
const mediaAsset = path => { if (!path.startsWith('media/') || path.includes('..') || path.includes('\\')) throw new Error(`Ruta de medio no válida: ${path}`); files.add(path); return esc(path); };
const gallery = media.gallery.length ? `<section id="galeria" class="section shell">${heading('06', 'EN EL JUEGO', { title: 'Postales del viaje.', intro: '<p>Una mirada a los escenarios de Anadromo.</p>' })}<div class="gallery">${media.gallery.map(g => `<figure><a href="${mediaAsset(g.src)}" target="_blank" rel="noopener"><img src="${mediaAsset(g.src)}" alt="${esc(g.alt)}" loading="lazy" width="1200" height="675"></a><figcaption>${esc(g.caption)}</figcaption></figure>`).join('')}</div></section>` : '';
const videos = media.videos.map(v => {
  const first = mediaAsset(`media/optimized/${v.parts[0]}.mp4`);
  const poster = mediaAsset(`media/optimized/${v.parts[0]}.webp`);
  return `<article class="video-card" data-group="${esc(v.group)}"><div class="video-frame"><video controls playsinline preload="none" poster="${poster}" aria-label="${esc(v.title)}" data-title="${esc(v.title)}"><source src="${first}" type="video/mp4">Tu navegador no puede reproducir este video. <a href="${first}">Abrir video</a></video></div><div class="video-info"><p class="eyebrow">${v.group === 'final' ? 'REGISTRO FINAL' : 'PRUEBA CON USUARIOS'}</p><h3>${esc(v.title)}</h3><p>${esc(v.description)}</p><div class="video-parts" aria-label="Partes de ${esc(v.title)}">${v.parts.map((p, i) => `<a href="${mediaAsset(`media/optimized/${p}.mp4`)}" data-video-src="${esc(`media/optimized/${p}.mp4`)}" data-poster="${mediaAsset(`media/optimized/${p}.webp`)}" ${i === 0 ? 'aria-current="true"' : ''}>${p.includes('feedback') ? 'Comentarios' : `Parte ${i + 1}`}</a>`).join('')}</div><p class="video-status sr-only" aria-live="polite"></p></div></article>`;
}).join('');

const html = `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#071f28"><meta name="description" content="Anadromo: el viaje de un salmón a su río natal. Explora el desarrollo de una experiencia marina en realidad virtual, sus mecánicas y pruebas con usuarios."><meta property="og:title" content="Anadromo — El instinto de volver"><meta property="og:description" content="Un viaje de regreso al origen. Explora la historia y el desarrollo de Anadromo, una experiencia marina en realidad virtual."><meta property="og:type" content="website"><title>Anadromo — El instinto de volver</title><link rel="icon" href="favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="assets/site.css"><script src="assets/site.js" defer></script></head>
<body><a class="skip-link" href="#contenido">Saltar al contenido</a>
<header class="header"><div class="header-inner"><a class="brand" href="#inicio" aria-label="Anadromo, inicio"><img src="favicon.svg" width="34" height="34" alt=""><span>ANADROMO<span class="brand-dot" aria-hidden="true">·</span></span></a><button class="menu-toggle" aria-expanded="false" aria-controls="navigation">Menú <span aria-hidden="true">☰</span></button><nav id="navigation" aria-label="Navegación principal"><a href="#historia">El viaje</a><a href="#proceso">El proceso</a><a href="#mecanicas">Cómo se juega</a><a href="#experiencia">La experiencia</a><a href="#pruebas">Pruebas <span aria-hidden="true">↗</span></a></nav></div></header>
<main id="contenido">
<section id="inicio" class="hero"><div class="hero-art" aria-hidden="true"></div><div class="hero-grid shell"><div class="hero-copy"><p class="eyebrow"><span class="status-dot"></span> UN VIAJE EN REALIDAD VIRTUAL</p><h1>El instinto<br>de <em>volver.</em></h1><p class="hero-description">${overview.intro.replace(/<\/?p>/g, '').trim()}</p><div class="hero-actions"><a href="#historia" class="button primary">Explora el viaje <span aria-hidden="true">↓</span></a><a href="#pruebas" class="hero-secondary"><span class="play-icon" aria-hidden="true">▷</span> Ver las pruebas</a></div><div class="hero-tags"><span>UNITY</span><span>OCULUS QUEST 2</span><span>EXPLORACIÓN · SUPERVIVENCIA</span></div></div><div class="hero-note"><span class="coordinate">01 / EL RETORNO</span><span>La corriente cambia.<br>El destino permanece.</span><span class="art-label">Ilustración del viaje</span></div></div><div class="hero-bottom shell"><span>DEL OCÉANO AL ORIGEN</span><a href="#proyecto">CONOCE EL PROYECTO <span aria-hidden="true">↙</span></a><span class="scroll-mark" aria-hidden="true">↓</span></div></section>
<section id="proyecto" class="intro section shell"><p class="eyebrow">EL PROYECTO</p><div><h2>${esc(overview.sections[0].title)}</h2><div class="prose intro-columns">${overview.sections[0].html}</div></div></section>
<section id="historia" class="story-section section"><div class="shell">${heading('01', 'EL VIAJE', story)}<div class="journey">${story.sections.slice(0, 4).map((s, i) => `<article class="journey-step"><div class="journey-point"><span>${String(i + 1).padStart(2, '0')}</span><span class="journey-line"></span></div><h3>${esc(s.title.replace(/^\d+ · /, ''))}</h3>${s.html}</article>`).join('')}</div><details class="ending"><summary>El final del viaje <span>Contiene spoilers <span aria-hidden="true">＋</span></span></summary><div class="prose">${story.sections[4].html}</div></details></div></section>
<section id="proceso" class="section shell"><div class="split-heading">${heading('02', 'EL PROCESO', ideation)}${external(media.miro, 'Explorar el tablero en Miro')}</div><div class="process-grid"><article class="process-copy">${ideation.sections.map(s => `<h3>${esc(s.title)}</h3>${s.html}`).join('')}${external(media.project, 'Seguir el desarrollo')}</article><div class="sketch-preview"><img src="media/storyboard/bocetos-preview.webp" loading="lazy" width="1000" height="700" alt="Vista previa de los bocetos originales de Anadromo"><span>CUADERNO DE EXPLORACIÓN / ANADROMO</span></div></div><div class="document-heading"><h3>${esc(storyboard.title)}</h3>${storyboard.intro}</div><div class="document-grid">${[{ title: 'Bocetos', file: 'Anadromo_bocetos.pdf', image: 'bocetos-preview.webp', body: storyboard.sections[0].html }, { title: 'Storyboard', file: 'Anadromo_storyboard.pdf', image: 'storyboard-preview.webp', body: storyboard.sections[1].html }].map((d, i) => `<a class="document-card" href="media/storyboard/${d.file}" target="_blank" rel="noopener"><div class="document-image"><img src="media/storyboard/${d.image}" loading="lazy" alt="Vista previa: ${d.title}" width="1000" height="700"><span>0${i + 1} / PDF</span></div><div class="document-body"><h4>${d.title} ${arrow}</h4>${d.body}<span class="small-label">ABRIR DOCUMENTO <span class="sr-only">en otra pestaña</span></span></div></a>`).join('')}</div></section>
<section id="mecanicas" class="mechanics-section section"><div class="shell">${heading('03', 'CÓMO SE JUEGA', mechanics)}<div class="mechanics-grid">${mechanics.sections.slice(0, 4).map((s, i) => `<article class="mechanic"><div class="mechanic-top">${icon(['swim', 'compass', 'hunger', 'shake'][i])}<span>0${i + 1}</span></div><h3>${esc(s.title)}</h3>${s.html}</article>`).join('')}</div><div class="bestiary"><div><p class="eyebrow">NO ESTÁS SOLO</p><h3>El peligro tiene<br>muchas formas.</h3><p>Observa antes de avanzar.<br>Cada encuentro exige una respuesta distinta.</p></div><div class="creatures">${mechanics.sections.slice(4).map(s => `<details><summary>${esc(s.title)}<span aria-hidden="true">＋</span></summary><div>${s.html}</div></details>`).join('')}</div></div></div></section>
<section id="experiencia" class="section shell">${heading('04', 'DISEÑAR LA EXPERIENCIA', experience)}<div class="experience-grid">${experience.sections.slice(0, 4).map((s, i) => `<article><p class="small-label">${['APRENDIZAJE GRADUAL', 'SEÑALES Y RESPUESTAS', 'ORIENTACIÓN', 'COMODIDAD'][i]}</p><h3>${esc(s.title)}</h3>${s.html}</article>`).join('')}</div><article class="evolution"><div><p class="eyebrow">UNA MECÁNICA, VARIAS ITERACIONES</p><h3>${esc(experience.sections[4].title)}</h3><ol class="iteration-list"><li>Mandos del visor</li><li>Primer gesto con las cámaras</li><li>Cámara externa + Python</li><li>Regreso al visor, algoritmo mejorado</li></ol></div><div class="prose">${experience.sections[4].html}</div></article></section>
<section id="pruebas" class="tests-section section"><div class="shell">${heading('05', 'PRUEBAS CON PERSONAS', playtests)}<div class="tests-toolbar"><span>REGISTROS DEL DESARROLLO</span><div class="filters" role="group" aria-label="Filtrar videos"><button data-filter="all" aria-pressed="true">Todos</button><button data-filter="sesiones" aria-pressed="false">Sesiones</button><button data-filter="final" aria-pressed="false">Prueba final</button></div></div><div class="video-grid">${videos}</div><div class="test-learning"><h3>${esc(playtests.sections[0].title)}</h3>${playtests.sections[0].html}</div></div></section>
${gallery}
<section id="equipo" class="section shell team">${heading('↗', 'EL EQUIPO', credits)}<div class="team-grid">${credits.sections.slice(0, 3).map((s, i) => `<article><span class="team-number">0${i + 1}</span><h3>${esc(s.title)}</h3>${s.html}</article>`).join('')}</div><details class="credits"><summary>Recursos y créditos <span aria-hidden="true">＋</span></summary>${credits.sections[3].html}</details></section>
</main><footer class="footer"><div class="shell"><div class="footer-top"><a class="brand" href="#inicio">ANADROMO</a><p>Todo viaje de regreso<br>empieza con un impulso.</p><a class="back-top" href="#inicio" aria-label="Volver al inicio">↑</a></div><div class="footer-bottom"><span>UN PROYECTO DE EXPLORACIÓN E INTERACCIÓN</span><div>${external(media.repository, 'GitHub')}${external(media.project, 'Projects')}${external(media.miro, 'Miro')}</div><span>HECHO PARA VOLVER.</span></div></div></footer>
</body></html>`;

await mkdir(output, { recursive: true });
await mkdir(resolve(output, 'assets'), { recursive: true });
await writeFile(resolve(output, 'index.html'), html);
await writeFile(resolve(output, '.nojekyll'), '');
await cp(resolve(root, 'src/styles/site.css'), resolve(output, 'assets/site.css'));
await cp(resolve(root, 'src/site.js'), resolve(output, 'assets/site.js'));
let bytes = Buffer.byteLength(html);
for (const path of files) {
  const source = resolve(root, 'public', path);
  const destination = resolve(output, path);
  if (!destination.startsWith(output + sep)) throw new Error('Ruta fuera del directorio de publicación');
  const info = await stat(source).catch(() => { throw new Error(`Falta ${relative(root, source)}. Ejecuta la preparación de medios según docs/deployment.md.`); });
  const handle = await open(source, 'r');
  const buffer = Buffer.alloc(50);
  let header;
  try { await handle.read(buffer, 0, 50, 0); header = buffer.toString(); } finally { await handle.close(); }
  if (header.startsWith('version https://git-lfs')) throw new Error(`Puntero LFS sin descargar: ${path}`);
  bytes += info.size;
  await mkdir(dirname(destination), { recursive: true });
  await cp(source, destination);
}
if (bytes > 900_000_000) throw new Error('El sitio supera el presupuesto de 900 MB para GitHub Pages. Optimiza los medios.');
console.log(`Web generada en dist/ · ${(bytes / 1e6).toFixed(1)} MB · ${files.size} recursos públicos`);

const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() { menu.setAttribute('aria-expanded', 'false'); navigation.classList.remove('is-open'); }
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-open', open);
});
navigation.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); } });
document.addEventListener('click', event => { if (!event.target.closest('.header')) closeMenu(); });
matchMedia('(min-width: 901px)').addEventListener('change', closeMenu);

const videos = [...document.querySelectorAll('video')];
videos.forEach(video => {
  video.addEventListener('play', () => videos.forEach(other => { if (other !== video) other.pause(); }));
  video.addEventListener('error', () => {
    const status = video.closest('.video-card').querySelector('.video-status');
    status.classList.remove('sr-only');
    status.textContent = 'No se pudo cargar el video. Puedes abrirlo con el enlace de la parte seleccionada.';
  });
});
document.querySelectorAll('[data-video-src]').forEach(link => link.addEventListener('click', event => {
  if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  const card = link.closest('.video-card');
  const video = card.querySelector('video');
  video.pause();
  card.querySelectorAll('[data-video-src]').forEach(part => part.removeAttribute('aria-current'));
  link.setAttribute('aria-current', 'true');
  video.src = link.dataset.videoSrc;
  video.poster = link.dataset.poster;
  video.setAttribute('aria-label', `${video.dataset.title}, ${link.textContent}`);
  video.load();
  const status = card.querySelector('.video-status');
  status.classList.add('sr-only');
  status.textContent = `${link.textContent} seleccionada. Pulsa reproducir para ver el video.`;
}));
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
  document.querySelectorAll('.video-card').forEach(card => {
    card.hidden = button.dataset.filter !== 'all' && button.dataset.filter !== card.dataset.group;
    if (card.hidden) card.querySelector('video').pause();
  });
}));
if ('IntersectionObserver' in window) {
  const links = [...navigation.querySelectorAll('a')];
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) links.forEach(link => {
        if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-15% 0px -65% 0px' });
  links.forEach(link => observer.observe(document.querySelector(link.hash)));
}

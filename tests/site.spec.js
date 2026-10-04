import { test, expect } from '@playwright/test';

test('La publicación bajo la ruta del repositorio carga sus recursos', async ({ page, request }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('./');
  await expect(page).toHaveTitle(/Anadromo/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('volver');
  for (const selector of ['link[rel="stylesheet"]', 'script[src]', 'img']) {
    const links = await page.locator(selector).evaluateAll(elements => elements.map(el => el.href || el.src));
    for (const url of links) expect((await request.get(url)).ok(), url).toBeTruthy();
  }
  expect(await page.locator('body').innerText()).not.toMatch(/Estado:|Pendiente|Registro interno/);
  expect(errors).toEqual([]);
});

test('Las partes, filtros y acordeones funcionan', async ({ page }) => {
  await page.goto('./');
  await page.getByRole('button', { name: 'Prueba final', exact: true }).click();
  await expect(page.locator('.video-card:visible')).toHaveCount(1);
  await page.getByRole('button', { name: 'Todos', exact: true }).click();
  await expect(page.locator('.video-card:visible')).toHaveCount(4);
  const first = page.locator('.video-card').first();
  await first.getByRole('link', { name: 'Parte 2', exact: true }).click();
  await expect(first.locator('video')).toHaveAttribute('src', /usuario1-2.mp4$/);
  await expect(first.getByRole('link', { name: 'Parte 2', exact: true })).toHaveAttribute('aria-current', 'true');
  await page.locator('.ending summary').click();
  await expect(page.locator('.ending')).toHaveAttribute('open', '');
  await page.locator('.creatures summary').filter({ hasText: 'Peces linterna' }).click();
  await expect(page.locator('.creatures details[open]')).toContainText('quedarse quieto');
});

test('Los videos responden a solicitudes parciales', async ({ request }) => {
  for (const name of ['usuario1', 'anadromo-gameplay']) {
    const response = await request.get(`media/optimized/${name}.mp4`, { headers: { Range: 'bytes=0-1023' } });
    expect(response.status()).toBe(206);
    expect(response.headers()['content-type']).toBe('video/mp4');
    expect((await response.body()).length).toBe(1024);
  }
});

test('Las capturas identifican los enemigos y el gameplay se reproduce', async ({ page }) => {
  await page.goto('./');
  for (const name of ['Pirañas', 'Lampreas', 'Peces linterna', 'Tiburones y orcas', 'Bloop']) {
    const card = page.locator('.creatures details').filter({ hasText: name });
    await card.locator('summary').click();
    expect(await card.locator('img').count()).toBeGreaterThan(0);
    await expect.poll(() => card.locator('img').first().evaluate(image => image.complete && image.naturalWidth > 0)).toBeTruthy();
  }
  const linternaImages = page.locator('.creatures details').filter({ hasText: 'Peces linterna' }).locator('img');
  await expect(linternaImages).toHaveCount(2);
  await expect(linternaImages.nth(0)).toHaveAttribute('src', /pez-linterna-2\.webp$/);
  await expect(linternaImages.nth(1)).toHaveAttribute('src', /pez-ciego\.webp$/);
  await expect.poll(() => linternaImages.nth(1).evaluate(image => image.complete && image.naturalWidth > 0)).toBeTruthy();
  const gameplay = page.locator('.gameplay-video video');
  await gameplay.evaluate(async element => { element.muted = true; await element.play(); });
  await expect.poll(() => gameplay.evaluate(element => element.currentTime), { timeout: 15000 }).toBeGreaterThan(0.2);
  expect(await gameplay.evaluate(element => element.videoWidth)).toBeGreaterThan(0);
});

test('El navegador decodifica y reproduce la grabación optimizada', async ({ page }) => {
  await page.goto('./');
  const video = page.locator('.video-card video').first();
  await video.evaluate(async element => {
    element.muted = true;
    await element.play();
  });
  await expect.poll(() => video.evaluate(element => element.currentTime), { timeout: 15000 }).toBeGreaterThan(0.2);
  expect(await video.evaluate(element => element.videoWidth)).toBeGreaterThan(0);
  await page.getByRole('button', { name: 'Prueba final', exact: true }).click();
  expect(await video.evaluate(element => element.paused)).toBeTruthy();
});

test('La navegación móvil es accesible y no desborda', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./');
  const menu = page.getByRole('button', { name: /Menú/ });
  await menu.click();
  await expect(menu).toHaveAttribute('aria-expanded', 'true');
  await page.locator('#navigation').getByRole('link', { name: 'Cómo se juega' }).click();
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await menu.click();
  await page.keyboard.press('Escape');
  await expect(menu).toBeFocused();
  for (const width of [320, 390, 768]) {
    await page.setViewportSize({ width, height: 844 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  }
});

test('Los documentos están disponibles', async ({ request }) => {
  for (const name of ['Anadromo_bocetos.pdf', 'Anadromo_storyboard.pdf']) {
    const response = await request.get(`media/storyboard/${name}`);
    expect(response.ok()).toBeTruthy();
    expect((await response.body()).subarray(0, 4).toString()).toBe('%PDF');
  }
});

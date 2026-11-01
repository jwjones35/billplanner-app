// Retired. The app used to live at this address and kept its offline copy here; it now lives in app/ with its
// own offline helper. This version removes the old helper and its saved copies from phones that had it, so the
// web page at this address always loads fresh. (Only this app's old copies are removed, never anything else's.)
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => /^bpa-\d/.test(k)).map(k => caches.delete(k)));
    await self.registration.unregister();
  })());
});

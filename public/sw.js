/* Retire the Scalo Portal PWA previously installed on this domain.
 * Keep this exact URL: existing browsers check it for updates on navigation.
 * No fetch handler: all subsequent requests go directly to the current site.
 * Cookies, localStorage, sessionStorage and IndexedDB are left untouched.
 */
self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    await self.clients.claim();
    const windows = await self.clients.matchAll({ type: "window" });
    await self.registration.unregister();
    await Promise.allSettled(windows.map((client) => {
      const url = new URL(client.url);
      if (url.origin !== self.location.origin) return;
      // The portal has moved away from this origin; recover the requested page.
      if (url.pathname === "/" || url.pathname === "/a") url.pathname = "/b";
      if (url.pathname === "/b-leadmagnet") url.pathname = "/a-leadmagnet";
      // Bypass any cached HTML once, even if the previous server cached it.
      url.searchParams.set("scalo_version", "landing-20260921");
      return client.navigate(url.href);
    }));
  })());
});

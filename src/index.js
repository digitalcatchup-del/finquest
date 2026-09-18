export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.hostname === 'app.butterflydynamixllc.com') {
      // Let actual asset files (JS, CSS, images, fonts, etc.) resolve
      // normally — bookkeeping.html references these by absolute path
      // (e.g. /bookkeeping-app.js), so they must pass through unchanged.
      // Only page-level requests get redirected to the bookkeeping app.
      const isAssetFile = /\.(js|css|png|jpg|jpeg|svg|ico|json|woff2?|ttf|map|webmanifest)$/i.test(url.pathname);
      if (!isAssetFile) {
        // No .html extension here on purpose — an existing zone-wide
        // Redirect Rule strips .html from /bookkeeping.html requests
        // and 301s to /bookkeeping, which would otherwise fire here
        // too and visibly change the address bar. Requesting the
        // extension-less path directly avoids ever triggering that
        // rule, while still resolving to the same file (proven by the
        // main site already serving /bookkeeping this exact way).
        url.pathname = '/bookkeeping';
        return env.ASSETS.fetch(new Request(url, request));
      }
    }

    // Every other hostname (the main site) is untouched — normal
    // static asset serving, exactly as it already works today.
    return env.ASSETS.fetch(request);
  },
};

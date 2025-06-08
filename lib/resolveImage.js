// lib/resolveImage.js
export function resolveProfileThumb(featured) {
  const sizes = featured?.media_details?.sizes || {};
  return (
    sizes.thumbnail?.source_url ||      // 150×150 default
    sizes.medium?.source_url   ||      // fallback
    featured?.source_url               // last resort
  );
}

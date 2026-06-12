// Static example galleries, keyed by catalogue item slug. Web-optimized images
// live in /public/camp/web-43 (full-res twins in /public/camp/full). Add more
// slugs as real photos arrive; later this can graduate to a DB `images` column
// managed from the admin panel.

const CAMP_IMAGES = [
  "camp-tents-first-day",
  "camp-forest-sea-path",
  "camp-hillside-sea",
  "camp-coast-view",
  "camp-forest-glow",
  "camp-sunset-trees",
  "camp-sunset-cliffs",
  "camp-dusk-silhouette",
  "camp-campfire",
  "camp-bbq-night",
].map((name) => `/camp/web-43/${name}.jpg`);

const GALLERIES: Record<string, string[]> = {
  "adventure-camp": CAMP_IMAGES,
};

/** Ordered gallery images for an item slug (empty array if none). */
export function getGalleryImages(slug: string): string[] {
  return GALLERIES[slug] ?? [];
}

/** Cover image for cards: an explicit DB image_url wins, else the first gallery image. */
export function getCoverImage(slug: string, imageUrl: string | null): string | null {
  return imageUrl ?? getGalleryImages(slug)[0] ?? null;
}

// Reuse the Open Graph image for Twitter/X cards (summary_large_image).
// `runtime` must be a direct string-literal export (Next can't read a re-export).
export const runtime = "edge";
export { default, alt, size, contentType } from "./opengraph-image";

// src/lib/slugs.js
export function slugForType(t) {
  const s = String(t ?? "")
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return s || "other";
}

export function slugForNeighborhood(n) {
  return String(n ?? "")
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

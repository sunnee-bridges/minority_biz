export interface RawBusiness {
  name: string;
  slug?: string;
  type?: string;
  website?: string;
  phone?: string;
  yearEstablished?: number;
  businessCategories?: string[] | string;
  cuisineTypes?: string[] | string;
  entertainmentTypes?: string[] | string;
  artTypes?: string[] | string;
  neighborhoods?: string[] | string;
  microfilters?: string[] | string;
  latitude?: number;
  longitude?: number;
  notes?: string;
  featured?: boolean;
  featuredOrder?: number;
}

export interface Business {
  name: string;
  slug: string;
  type?: string;
  website?: string;
  phone?: string;
  yearEstablished?: number;
  businessCategories: string[];
  cuisineTypes: string[];
  entertainmentTypes: string[];
  artTypes: string[];
  neighborhoods: string[];
  microfilters: string[];
  latitude?: number;
  longitude?: number;
  notes?: string;
  featured?: boolean;
  featuredOrder?: number;
}

function toArray(value: string[] | string | undefined): string[] {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function slugFromPath(path: string): string {
  const file = path.split("/").pop() || "";
  return file.replace(/\.json$/i, "");
}

const modules = import.meta.glob("/src/content/businesses/*.json", {
  eager: true,
  import: "default",
}) as Record<string, RawBusiness>;

export const businesses: Business[] = Object.entries(modules).map(
  ([path, raw]) => {
    const slug = raw.slug ?? slugFromPath(path);
    return {
      name: raw.name,
      slug,
      type: raw.type,
      website: raw.website,
      phone: raw.phone,
      yearEstablished: raw.yearEstablished,
      businessCategories: toArray(raw.businessCategories),
      cuisineTypes: toArray(raw.cuisineTypes),
      entertainmentTypes: toArray(raw.entertainmentTypes),
      artTypes: toArray(raw.artTypes),
      neighborhoods: toArray(raw.neighborhoods),
      microfilters: toArray(raw.microfilters),
      latitude: raw.latitude,
      longitude: raw.longitude,
      notes: raw.notes,
      featured: raw.featured,
      featuredOrder: raw.featuredOrder,
    };
  }
);

export function getBusinessBySlug(slug: string): Business | undefined {
  return businesses.find((b) => b.slug === slug);
}
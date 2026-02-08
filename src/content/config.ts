import { defineCollection, z } from 'astro:content';

const businesses = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    type: z.string(),
    specialties: z.array(z.string()).optional(),
    businessCategories: z.array(z.string()).optional(),
    neighborhoods: z.array(z.string()),
    latitude: z.number().nullable().optional(),
    longitude: z.number().nullable().optional(),
    microfilters: z.array(z.string()).optional(),
    website: z.string().optional(),
    phone: z.string().optional(),
    yearEstablished: z.number().nullable().optional(), // Added .nullable()
    notes: z.string().optional(),
  }),
});

export const collections = { businesses };
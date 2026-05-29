import { z } from 'zod';

export const LeadScoringSchema = z.object({
  id: z.string(),
  prospectoId: z.string(),
  scoreTotal: z.number(),
  nivel: z.enum(['Frio', 'Tibio', 'Caliente']),
  logins7d: z.number(),
  featuresUsadas: z.number(),
  ultimaActividad: z.string().nullable(),
  updatedAt: z.string(),
});

export type LeadScoringType = z.infer<typeof LeadScoringSchema>;
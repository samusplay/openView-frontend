import { z } from 'zod';

export const CreateTrialSchema = z.object({
  prospectoId: z
    .string({ message: 'El prospecto es obligatorio' })
    .regex(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
      'Debe ser un UUID válido',
    ),

  versionPlan: z.enum(['Basic', 'Professional', 'Enterprise'], {
    message: 'Selecciona un plan válido',
  }),
});

export type CreateTrialType = z.infer<typeof CreateTrialSchema>;
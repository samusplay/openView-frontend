import { z } from 'zod';

export const CreateProspectoSchema = z.object({
  email: z
    .string({ message: 'El email es obligatorio' })
    .email('Debe ser un email válido')
    .max(150, 'Máximo 150 caracteres'),

  nombre: z
    .string({ message: 'El nombre es obligatorio' })
    .min(2, 'Mínimo 2 caracteres')
    .max(150, 'Máximo 150 caracteres'),

  cargo: z
    .string({ message: 'El cargo es obligatorio' })
    .min(2, 'Mínimo 2 caracteres')
    .max(100, 'Máximo 100 caracteres'),

  fuenteOrigen: z.enum(['Google_Ads', 'Email', 'Referido', 'Organico'], {
    message: 'Selecciona una fuente de origen válida',
  }),

  empresaId: z
    .string({ message: 'La empresa es obligatoria' })
    .regex(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
      'Debe ser un UUID válido',
    ),
});

export type CreateProspectoType = z.infer<typeof CreateProspectoSchema>;
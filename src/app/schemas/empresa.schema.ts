import { z } from 'zod';

export const CreateEmpresaSchema = z.object({
  nombre: z
    .string({ message: 'El nombre es obligatorio' })
    .min(2, 'Mínimo 2 caracteres')
    .max(150, 'Máximo 150 caracteres'),

  industria: z
    .string({ message: 'La industria es obligatoria' })
    .min(2, 'Mínimo 2 caracteres')
    .max(100, 'Máximo 100 caracteres'),

  pais: z
    .string({ message: 'El país es obligatorio' })
    .min(2, 'Mínimo 2 caracteres')
    .max(100, 'Máximo 100 caracteres'),

  numeroEmpleados: z
    .number({ message: 'Debe ser un número' })
    .int('Debe ser un número entero')
    .positive('Debe ser mayor a 0'),

  tier: z.enum(['SMB', 'Mid-Market', 'Enterprise'], {
    message: 'Selecciona un tier válido',
  }),
});

export type CreateEmpresaType = z.infer<typeof CreateEmpresaSchema>;
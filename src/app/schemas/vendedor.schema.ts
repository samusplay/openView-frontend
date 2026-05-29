import { z } from 'zod';

export const CreateVendedorSchema = z.object({
  nombre: z
    .string({ message: 'El nombre es obligatorio' })
    .min(1, 'El nombre no puede estar vacío')
    .max(100, 'Máximo 100 caracteres'),

  email: z
    .email('Email inválido')
    .max(100, 'Máximo 100 caracteres'),

  region: z
    .string({ message: 'La región es obligatoria' })
    .min(1, 'La región no puede estar vacía')
    .max(50, 'Máximo 50 caracteres'),
});

export type CreateVendedorType = z.infer<typeof CreateVendedorSchema>;
import { z } from 'zod';

export const CreateOrdenSchema = z.object({
  prospecto_id: z.string().uuid('Selecciona un prospecto válido'),
  vendedor_id:  z.string().uuid('Selecciona un vendedor válido'),
  monto:        z.number({ message: 'El monto es obligatorio' }).positive('Debe ser mayor a 0'),
  moneda:       z.string().min(1).default('USD'),
});

// Este tipo fuerza moneda como string siempre
export type CreateOrdenType = {
  prospecto_id: string;
  vendedor_id:  string;
  monto:        number;
  moneda:       string;
};

export const CreatePagoSchema = z.object({
  orden_id:           z.string().uuid('orden_id inválido'),
  monto:              z.number({ message: 'El monto es obligatorio' }).positive('Debe ser mayor a 0'),
  metodo:             z.string({ message: 'El método es obligatorio' }).min(1),
  referencia_externa: z.string().optional(),
});

export type CreatePagoType = z.infer<typeof CreatePagoSchema>;
import { z } from 'zod';

export const CreateEventoSchema = z.object({
  prospectoId: z
    .string({ message: 'El prospecto es obligatorio' })
    .regex(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
      'Debe ser un UUID válido',
    ),

  tipoEvento: z.enum(
    [
      'Login',
      'Ver_Precios',
      'Configurar_VoIP',
      'Invitar_Colega',
      'Usar_Calendario',
      'Descargar_Trial',
    ],
    { message: 'Selecciona un tipo de evento válido' },
  ),

  metadata: z.record(z.string(), z.unknown()).optional(),
});

export type CreateEventoType = z.infer<typeof CreateEventoSchema>;
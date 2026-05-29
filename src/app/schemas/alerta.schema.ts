import { z } from 'zod';

// Estados válidos del ciclo de vida de una alerta
export const ESTADOS_ALERTA = [
  'Pendiente',
  'En_Contacto',
  'Cerrado_Ganado',
  'Cerrado_Perdido',
] as const;

// Schema para actualizar una alerta (lo que envía el dashboard)
export const UpdateAlertaSchema = z.object({
  estado: z.enum(ESTADOS_ALERTA, { message: 'Estado inválido' }),
  notas: z.string().max(500, 'Máximo 500 caracteres').optional(),
});

export type UpdateAlertaType = z.infer<typeof UpdateAlertaSchema>;

// Tipo de la alerta que devuelve el backend (para tipar el dashboard)
export interface Alerta {
  id: string;
  tipo: 'Score_Caliente' | 'Trial_Vencimiento';
  prospectoId: string;
  prospectoNombre?: string;
  vendedorId: string;
  vendedorNombre?: string;
  scoreDisparador: number | null;
  diasRestantes: number | null;
  estado: string;
  notas: string | null;
  createdAt: string;
  updatedAt: string;
}
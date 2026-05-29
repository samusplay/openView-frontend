'use server';

import { revalidatePath } from 'next/cache';
import {
  updateEstadoAlerta,
  verificarVencimientos,
} from '@/lib/api-client';
import {
  UpdateEstadoSchema,
  EstadoAlerta,
} from '@/schemas/alerta-venta.schema';

export async function updateEstadoAction(id: string, estado: EstadoAlerta) {
  const parsed = UpdateEstadoSchema.safeParse({ estado });
  if (!parsed.success) {
    return { error: 'Estado inválido' };
  }
  try {
    const result = await updateEstadoAlerta(id, estado);
    revalidatePath('/alertas-ventas');
    return { data: result };
  } catch (e) {
    return { error: 'No se pudo actualizar el estado' };
  }
}

export async function verificarVencimientosAction(region?: string) {
  try {
    const result = await verificarVencimientos(region);
    revalidatePath('/alertas-ventas');
    return { data: result };
  } catch (e) {
    return { error: 'No se pudo ejecutar la verificación' };
  }
}

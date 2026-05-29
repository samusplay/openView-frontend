'use server';

import { apiClient } from '../config/apiClient';
import { CreateOrdenType, CreatePagoType } from '../schemas/orden.schema';

export async function crearOrden(data: CreateOrdenType) {
  return await apiClient('/ordenes-compra', {
    method: 'POST',
    body: data,
  });
}

export async function procesarPago(data: CreatePagoType) {
  return await apiClient('/pagos', {
    method: 'POST',
    body: data,
  });
}

export async function obtenerLicencia(prospectoId: string) {
  return await apiClient(`/licencias/${prospectoId}`);
}

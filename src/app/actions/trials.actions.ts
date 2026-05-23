'use server';

import { apiClient } from '../config/apiClient';
import { CreateTrialType } from '../schemas/trial.schema';

export async function crearTrial(data: CreateTrialType) {
  return await apiClient('/trials', {
    method: 'POST',
    body: data,
  });
}

export async function obtenerTrialPorProspecto(prospectoId: string) {
  return await apiClient(`/trials/prospecto/${prospectoId}`);
}

export async function actualizarTrial(id: string, estado: string) {
  return await apiClient(`/trials/${id}`, {
    method: 'PATCH',
    body: { estado },
  });
}
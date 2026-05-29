'use server';

import { apiClient } from '../config/apiClient';
import { CreateProspectoType } from '../schemas/prospecto.schema';

export async function crearProspecto(data: CreateProspectoType) {
  return await apiClient('/prospectos', {
    method: 'POST',
    body: data,
  });
}

export async function obtenerProspectos() {
  return await apiClient('/prospectos');
}

export async function obtenerProspecto(id: string) {
  return await apiClient(`/prospectos/${id}`);
}

export async function obtenerScorePorProspecto(prospectoId: string) {
  return await apiClient(`/leads-scoring/${prospectoId}`);
}
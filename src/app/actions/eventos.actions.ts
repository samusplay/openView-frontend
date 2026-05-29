'use server';

import { apiClient } from '../config/apiClient';
import { CreateEventoType } from '../schemas/evento.schema';

export async function crearEvento(data: CreateEventoType) {
  return await apiClient('/eventos-tracking', {
    method: 'POST',
    body: data,
  });
}

export async function obtenerEventosPorProspecto(prospectoId: string) {
  return await apiClient(`/eventos-tracking/${prospectoId}`);
}
'use server';

import { apiClient } from '../config/apiClient';
import { CreateVendedorType } from '../schemas/vendedor.schema';

export async function crearVendedor(data: CreateVendedorType) {
  return await apiClient('/vendedores', {
    method: 'POST',
    body: data,
  });
}

export async function obtenerVendedores() {
  return await apiClient('/vendedores');
}

export async function obtenerVendedor(id: string) {
  return await apiClient(`/vendedores/${id}`);
}
'use server';

import { apiClient } from "../config/apiClient";
import { CreateEmpresaType } from "../schemas/empresa.schema";


//Metodos del backend con el action
export async function crearEmpresa(data: CreateEmpresaType) {
  return await apiClient('/empresas', {
    method: 'POST',
    body: data,
  });
}

export async function obtenerEmpresas() {
  return await apiClient('/empresas');
}

export async function obtenerEmpresa(id: string) {
  return await apiClient(`/empresas/${id}`);
}
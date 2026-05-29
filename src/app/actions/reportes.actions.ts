'use server';

import { apiClient } from '../config/apiClient';

export async function obtenerProspectosCalientes() {
  return await apiClient('/licencias/reportes/calientes');
}

export async function obtenerResumenVendedores() {
  return await apiClient('/licencias/reportes/vendedores');
}

export async function obtenerLicenciasActivas() {
  return await apiClient('/licencias/reportes/activas');
}

export async function obtenerFunnelConversion() {
  return await apiClient('/licencias/reportes/funnel');
}
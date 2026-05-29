'use server';

import { apiClient } from '../config/apiClient';

export async function obtenerAlertas() {
    return await apiClient('/alertas-ventas');
}

export async function obtenerAlertasPorVendedor(vendedorId: string) {
    return await apiClient(`/alertas-ventas?vendedor_id=${vendedorId}`);
}

export async function actualizarAlerta(
    id: string,
    data: { estado: string; notas?: string },
) {
    return await apiClient(`/alertas-ventas/${id}`, {
        method: 'PATCH',
        body: data,
    });
}
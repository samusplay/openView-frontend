const BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:4000';

// ---------- Tipos ----------
export type EstadoAlerta =
  | 'Pendiente'
  | 'En_Contacto'
  | 'Cerrado_Ganado'
  | 'Cerrado_Perdido';

export interface AlertaVenta {
  id: string;
  prospectoId: string;
  vendedorId: string | null;
  motivo: string;
  scoreMomento: number;
  estado: EstadoAlerta;
  creadaEn: string;
  prospecto: {
    id: string;
    nombre: string;
    email: string;
    cargo: string;
    // Opcional: solo si el backend lo devuelve (para mostrar dias restantes)
    trial?: { fecha_fin: string } | null;
  };
  vendedor: {
    id: string;
    nombre: string;
    region: string;
  } | null;
}

export interface VerificacionResult {
  message: string;
  alertas_creadas: number;
  prospectos: string[];
}

// ---------- Funciones ----------
export async function getAlertas(vendedorId?: string): Promise<AlertaVenta[]> {
  const params = vendedorId ? `?vendedor_id=${vendedorId}` : '';
  const res = await fetch(`${BASE_URL}/alertas-ventas${params}`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Error al obtener alertas');
  const data = await res.json();
  return data;
}

export async function getAlertaById(id: string): Promise<AlertaVenta> {
  const res = await fetch(`${BASE_URL}/alertas-ventas/${id}`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Error al obtener alerta');
  return res.json();
}

export async function updateEstadoAlerta(
  id: string,
  estado: EstadoAlerta,
): Promise<AlertaVenta> {
  const res = await fetch(`${BASE_URL}/alertas-ventas/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ estado }),
  });
  if (!res.ok) throw new Error('Error al actualizar estado');
  return res.json();
}

export async function verificarVencimientos(
  region?: string,
): Promise<VerificacionResult> {
  const res = await fetch(`${BASE_URL}/alertas-ventas/verificar-vencimientos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(region ? { region } : {}),
  });
  if (!res.ok) throw new Error('Error al verificar vencimientos');
  return res.json();
}

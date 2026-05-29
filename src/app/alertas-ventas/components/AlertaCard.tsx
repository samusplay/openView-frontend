'use client';

import { useState, useTransition } from 'react';
import { AlertaVenta, EstadoAlerta } from '@/schemas/alerta-venta.schema';
import { updateEstadoAction } from '../actions';

interface Props {
  alerta: AlertaVenta;
}

const ESTADOS_SIGUIENTES: Record<EstadoAlerta, EstadoAlerta[]> = {
  Pendiente: ['En_Contacto', 'Cerrado_Ganado', 'Cerrado_Perdido'],
  En_Contacto: ['Cerrado_Ganado', 'Cerrado_Perdido'],
  Cerrado_Ganado: [],
  Cerrado_Perdido: [],
};

const ESTADO_LABELS: Record<EstadoAlerta, string> = {
  Pendiente: 'Pendiente',
  En_Contacto: 'En contacto',
  Cerrado_Ganado: 'Ganado',
  Cerrado_Perdido: 'Perdido',
};

export default function AlertaCard({ alerta }: Props) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  // Solo se calcula si el backend devuelve el trial. Si no, queda en null
  // y no se renderiza (evita el "NaN" que daba la version original).
  const fechaFin = alerta.prospecto?.trial?.fecha_fin;
  const diasRestantes = fechaFin
    ? Math.ceil(
        (new Date(fechaFin).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
      )
    : null;

  function handleEstado(nuevoEstado: EstadoAlerta) {
    setError(null);
    startTransition(async () => {
      const result = await updateEstadoAction(alerta.id, nuevoEstado);
      if (result.error) setError(result.error);
    });
  }

  const siguientes = ESTADOS_SIGUIENTES[alerta.estado as EstadoAlerta] ?? [];
  const terminado =
    alerta.estado === 'Cerrado_Ganado' || alerta.estado === 'Cerrado_Perdido';

  return (
    <div style={{ opacity: terminado ? 0.6 : 1 }}>
      <p>{alerta.prospecto.nombre}</p>
      <p>{alerta.prospecto.email}</p>
      <p>Score: {alerta.scoreMomento}</p>
      {diasRestantes !== null && <p>Días restantes: {diasRestantes}</p>}
      <p>Estado actual: {ESTADO_LABELS[alerta.estado as EstadoAlerta]}</p>
      <p>Motivo: {alerta.motivo}</p>
      {alerta.vendedor && <p>Vendedor: {alerta.vendedor.nombre}</p>}

      {!terminado && (
        <div>
          {siguientes.map((estado) => (
            <button
              key={estado}
              onClick={() => handleEstado(estado)}
              disabled={isPending}
            >
              {isPending ? 'Guardando...' : `Marcar como ${ESTADO_LABELS[estado]}`}
            </button>
          ))}
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

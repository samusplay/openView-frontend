'use client';

import { actualizarAlerta, obtenerAlertas, obtenerAlertasPorVendedor } from '@/app/actions/alertas.actions';
import { Alerta, UpdateAlertaSchema } from '@/app/schemas/alerta.schema';
import { useCallback, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import GestionarAlertaModal from './GestionarAlertaModal';

interface Vendedor {
  id: string;
  nombre: string;
  email: string;
  region: string;
}

interface Props {
  vendedores: Vendedor[];
}

const ESTADO_STYLES: Record<string, string> = {
  Pendiente: 'bg-blue-50 text-blue-700 border-blue-200',
  En_Contacto: 'bg-amber-50 text-amber-700 border-amber-200',
  Cerrado_Ganado: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Cerrado_Perdido: 'bg-zinc-100 text-zinc-600 border-zinc-200',
};

const REFRESH_MS = 30000;

export default function DashboardVendedor({ vendedores }: Props) {
  const [vendedorId, setVendedorId] = useState<string>('todos');
  const [alertas, setAlertas] = useState<Alerta[]>([]);
  const [loading, setLoading] = useState(false);
  const [ultimaActualizacion, setUltimaActualizacion] = useState<Date | null>(null);
  const [alertaGestion, setAlertaGestion] = useState<Alerta | null>(null);

  const cargarAlertas = useCallback(async (silencioso = false) => {
    if (!silencioso) setLoading(true);
    try {
      const res =
        vendedorId === 'todos'
          ? ((await obtenerAlertas()) as { data: Alerta[] })
          : ((await obtenerAlertasPorVendedor(vendedorId)) as { data: Alerta[] });
      setAlertas(res.data);
      setUltimaActualizacion(new Date());
    } catch {
      setAlertas([]);
    } finally {
      setLoading(false);
    }
  }, [vendedorId]);

  useEffect(() => {
    cargarAlertas();
  }, [cargarAlertas]);

  useEffect(() => {
    const intervalo = setInterval(() => cargarAlertas(true), REFRESH_MS);
    return () => clearInterval(intervalo);
  }, [cargarAlertas]);

  const handleGuardar = async (id: string, data: { estado: string; notas?: string }) => {
    const validacion = UpdateAlertaSchema.safeParse(data);
    if (!validacion.success) {
      await Swal.fire({
        title: 'Datos inválidos',
        text: validacion.error.issues[0]?.message ?? 'Revisa los campos',
        icon: 'error',
        confirmButtonColor: '#18181b',
      });
      return;
    }

    try {
      await actualizarAlerta(id, validacion.data);
      setAlertaGestion(null);
      await Swal.fire({
        title: 'Alerta actualizada',
        icon: 'success',
        confirmButtonColor: '#18181b',
        timer: 1400,
        showConfirmButton: false,
      });
      cargarAlertas();
    } catch (err) {
      await Swal.fire({
        title: 'Error',
        text: err instanceof Error ? err.message : 'No se pudo actualizar',
        icon: 'error',
        confirmButtonColor: '#18181b',
      });
    }
  };

  const alertasOrdenadas = [...alertas].sort((a, b) => {
    if (a.estado === 'Pendiente' && b.estado !== 'Pendiente') return -1;
    if (a.estado !== 'Pendiente' && b.estado === 'Pendiente') return 1;
    return (b.scoreDisparador ?? 0) - (a.scoreDisparador ?? 0);
  });

  const pendientes = alertas.filter((a) => a.estado === 'Pendiente').length;
  const enContacto = alertas.filter((a) => a.estado === 'En_Contacto').length;
  const cerradas = alertas.filter((a) => a.estado.startsWith('Cerrado')).length;

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Encabezado */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-200/60 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-zinc-950 tracking-tight">Dashboard de ventas</h1>
            <p className="text-sm text-zinc-500 mt-1.5 font-medium flex items-center gap-2">
              Alertas de leads calientes y trials por vencer
              {ultimaActualizacion && (
                <span className="inline-flex items-center gap-1 text-xs text-zinc-400">
                  · <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {ultimaActualizacion.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </span>
              )}
            </p>
          </div>

          <select
            value={vendedorId}
            onChange={(e) => setVendedorId(e.target.value)}
            className="bg-white border border-zinc-200 rounded-lg px-3.5 py-2.5 text-sm font-semibold text-zinc-900 shadow-sm focus:outline-none focus:ring-4 focus:ring-zinc-950/5 focus:border-zinc-950 cursor-pointer"
          >
            <option value="todos">Todos los vendedores</option>
            {vendedores.map((v) => (
              <option key={v.id} value={v.id}>{v.nombre} — {v.region}</option>
            ))}
          </select>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-sm">
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Total</p>
            <p className="text-3xl font-bold text-zinc-950 mt-1">{alertas.length}</p>
          </div>
          <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-sm">
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Pendientes</p>
            <p className="text-3xl font-bold text-blue-600 mt-1">{pendientes}</p>
          </div>
          <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-sm">
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">En contacto</p>
            <p className="text-3xl font-bold text-amber-600 mt-1">{enContacto}</p>
          </div>
          <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-sm">
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Cerradas</p>
            <p className="text-3xl font-bold text-zinc-700 mt-1">{cerradas}</p>
          </div>
        </div>

        {/* Lista */}
        {loading ? (
          <div className="bg-white border border-zinc-200 rounded-xl p-12 text-center shadow-sm">
            <p className="text-sm font-medium text-zinc-400">Cargando alertas...</p>
          </div>
        ) : alertasOrdenadas.length === 0 ? (
          <div className="bg-white border border-zinc-200 rounded-xl p-12 text-center shadow-sm">
            <p className="text-sm font-medium text-zinc-400">No hay alertas para este filtro.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {alertasOrdenadas.map((a) => {
              const esCaliente = a.tipo === 'Score_Caliente';
              const inicial = (a.prospectoNombre ?? '?').charAt(0).toUpperCase();
              return (
                <div
                  key={a.id}
                  className="bg-white border border-zinc-200 rounded-xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-center gap-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="h-10 w-10 rounded-lg bg-zinc-950 text-white font-bold text-sm flex items-center justify-center shrink-0 select-none">
                      {inicial}
                    </div>
                    <div>
                      <p className="font-semibold text-zinc-900">{a.prospectoNombre ?? 'Prospecto'}</p>
                      <p className="text-xs text-zinc-500 font-medium">Asignado a {a.vendedorNombre ?? '—'}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {esCaliente ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-200">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                        Score {a.scoreDisparador} pts
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                        ⏰ Trial · {a.diasRestantes} días
                      </span>
                    )}
                  </div>

                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${ESTADO_STYLES[a.estado] ?? 'bg-zinc-100 text-zinc-600 border-zinc-200'}`}>
                    {a.estado.replace(/_/g, ' ')}
                  </span>

                  <span className="text-xs text-zinc-400 font-medium hidden md:block">
                    {new Date(a.createdAt).toLocaleDateString('es-CO')}
                  </span>

                  <button
                    onClick={() => setAlertaGestion(a)}
                    className="inline-flex items-center justify-center gap-1.5 bg-zinc-950 hover:bg-zinc-800 text-white px-3.5 py-2 rounded-lg text-xs font-semibold shadow-sm transition-all active:scale-[0.98] shrink-0"
                  >
                    Gestionar
                  </button>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Modal de gestión */}
      <GestionarAlertaModal
        alerta={alertaGestion}
        onClose={() => setAlertaGestion(null)}
        onGuardar={handleGuardar}
      />
    </main>
  );
}
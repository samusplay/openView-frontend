'use client';

import { crearOrden, procesarPago } from '@/app/actions/ordenes.actions';
import { CreateOrdenSchema, CreateOrdenType } from '@/app/schemas/orden.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface Prospecto { id: string; nombre: string; email: string; }
interface Vendedor { id: string; nombre: string; }
interface Orden {
    id: string;
    prospectoId: string;
    vendedorId: string;
    monto: number;
    moneda: string;
    estado: string;
    fechaOrden: string;
}

interface Props {
    prospectos: Prospecto[];
    vendedores: Vendedor[];
}

export default function OrdenesTable({ prospectos, vendedores }: Props) {
    const [ordenes, setOrdenes] = useState<Orden[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [claveActivacion, setClaveActivacion] = useState<string | null>(null);
    const [ordenPagando, setOrdenPagando] = useState<Orden | null>(null);
    const [loadingPago, setLoadingPago] = useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateOrdenType>({
        resolver: zodResolver(CreateOrdenSchema) as any,
        defaultValues: { moneda: 'USD' },
    });

    // Crear orden
    const onSubmit = async (data: CreateOrdenType) => {
        setLoading(true);
        setError(null);
        try {
            const nueva = await crearOrden(data) as Orden;
            setOrdenes(prev => [nueva, ...prev]);
            reset();
            setShowForm(false);
        } catch (e: any) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    // Procesar pago
    const handlePago = async (orden: Orden) => {
        setLoadingPago(true);
        setError(null);
        try {
            const res = await procesarPago({
                orden_id: orden.id,
                monto: orden.monto,
                metodo: 'Tarjeta',
                referencia_externa: `TXN-${Date.now()}`,
            }) as any;
            setClaveActivacion(res.clave_activacion);
            setOrdenes(prev =>
                prev.map(o => o.id === orden.id ? { ...o, estado: 'Completada' } : o)
            );
        } catch (e: any) {
            setError(e.message);
        } finally {
            setLoadingPago(false);
            setOrdenPagando(null);
        }
    };

    return (
        <div className="space-y-5">

            {/* Botón nueva orden */}
            <div className="flex justify-end">
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="inline-flex items-center gap-2 bg-zinc-950 hover:bg-zinc-800 text-white px-4 py-2.5 rounded-lg text-sm font-semibold shadow-sm transition-all active:scale-[0.98]"
                >
                    <svg className="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Nueva orden
                </button>
            </div>

            {/* Formulario crear orden */}
            {showForm && (
                <div className="bg-white border border-zinc-200 rounded-xl shadow-sm p-6">
                    <h2 className="text-sm font-bold text-zinc-900 mb-4">Registrar nueva orden</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                        {/* Prospecto */}
                        <div>
                            <label className="block text-xs font-semibold text-zinc-700 mb-1">Prospecto</label>
                            <select
                                {...register('prospecto_id')}
                                className="w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm text-zinc-900 bg-white focus:outline-none focus:ring-2 focus:ring-zinc-950"
                            >
                                <option value="">Selecciona un prospecto</option>
                                {prospectos.map(p => (
                                    <option key={p.id} value={p.id}>{p.nombre} — {p.email}</option>
                                ))}
                            </select>
                            {errors.prospecto_id && <p className="text-xs text-red-500 mt-1">{errors.prospecto_id.message}</p>}
                        </div>

                        {/* Vendedor */}
                        <div>
                            <label className="block text-xs font-semibold text-zinc-700 mb-1">Vendedor</label>
                            <select
                                {...register('vendedor_id')}
                                className="w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm text-zinc-900 bg-white focus:outline-none focus:ring-2 focus:ring-zinc-950"
                            >
                                <option value="">Selecciona un vendedor</option>
                                {vendedores.map(v => (
                                    <option key={v.id} value={v.id}>{v.nombre}</option>
                                ))}
                            </select>
                            {errors.vendedor_id && <p className="text-xs text-red-500 mt-1">{errors.vendedor_id.message}</p>}
                        </div>

                        {/* Monto */}
                        <div>
                            <label className="block text-xs font-semibold text-zinc-700 mb-1">Monto (USD)</label>
                            <input
                                type="number"
                                step="0.01"
                                {...register('monto', { valueAsNumber: true })}
                                placeholder="299.99"
                                className="w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-950"
                            />
                            {errors.monto && <p className="text-xs text-red-500 mt-1">{errors.monto.message}</p>}
                        </div>

                        {error && <p className="text-xs text-red-500">{error}</p>}

                        <div className="flex gap-3 pt-1">
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-zinc-950 hover:bg-zinc-800 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all disabled:opacity-50"
                            >
                                {loading ? 'Creando...' : 'Crear orden'}
                            </button>
                            <button
                                type="button"
                                onClick={() => { setShowForm(false); reset(); setError(null); }}
                                className="border border-zinc-200 text-zinc-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-zinc-50 transition-colors"
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Clave de activación generada */}
            {claveActivacion && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 flex items-start gap-4">
                    <div className="h-9 w-9 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
                        <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-bold text-emerald-900">¡Licencia activada exitosamente!</p>
                        <p className="text-xs text-emerald-700 mt-0.5">Clave de activación generada:</p>
                        <p className="mt-2 font-mono text-lg font-bold text-emerald-800 tracking-widest">{claveActivacion}</p>
                    </div>
                    <button onClick={() => setClaveActivacion(null)} className="text-emerald-400 hover:text-emerald-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            )}

            {/* Tabla de órdenes */}
            {ordenes.length === 0 ? (
                <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-12 text-center flex flex-col items-center justify-center">
                    <div className="h-11 w-11 rounded-lg bg-zinc-50 flex items-center justify-center border border-zinc-200 mb-4 text-zinc-400 shadow-sm">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                        </svg>
                    </div>
                    <h3 className="text-sm font-bold text-zinc-900">No hay órdenes registradas</h3>
                    <p className="text-xs text-zinc-400 max-w-[280px] mt-1 leading-relaxed">
                        Crea una nueva orden para iniciar el proceso de pago y activación de licencia.
                    </p>
                </div>
            ) : (
                <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left border-collapse">
                            <thead className="bg-zinc-50/75 border-b border-zinc-200/60 text-xs font-bold text-zinc-500 uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-4">Prospecto</th>
                                    <th className="px-6 py-4">Monto</th>
                                    <th className="px-6 py-4">Estado</th>
                                    <th className="px-6 py-4">Fecha</th>
                                    <th className="px-6 py-4 text-right">Acción</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-100">
                                {ordenes.map((orden) => {
                                    const prospecto = prospectos.find(p => p.id === orden.prospectoId);
                                    const inicial = prospecto?.nombre.charAt(0).toUpperCase() ?? 'O';
                                    const isPendiente = orden.estado === 'Pendiente';

                                    return (
                                        <tr key={orden.id} className="hover:bg-zinc-50/50 transition-colors group">

                                            {/* Prospecto */}
                                            <td className="px-6 py-3.5">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-8 w-8 rounded-md bg-zinc-100 text-zinc-600 font-semibold text-xs flex items-center justify-center border border-zinc-200/60 shadow-sm shrink-0 uppercase">
                                                        {inicial}
                                                    </div>
                                                    <span className="font-semibold text-zinc-900 truncate">
                                                        {prospecto?.nombre ?? orden.prospectoId}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Monto */}
                                            <td className="px-6 py-3.5 font-semibold text-zinc-900">
                                                ${Number(orden.monto).toFixed(2)} {orden.moneda}
                                            </td>

                                            {/* Estado */}
                                            <td className="px-6 py-3.5">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold border ${orden.estado === 'Completada'
                                                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                                        : orden.estado === 'Cancelada'
                                                            ? 'bg-red-50 text-red-700 border-red-200'
                                                            : 'bg-amber-50 text-amber-700 border-amber-200'
                                                    }`}>
                                                    {orden.estado}
                                                </span>
                                            </td>

                                            {/* Fecha */}
                                            <td className="px-6 py-3.5 text-zinc-500 text-xs">
                                                {new Date(orden.fechaOrden).toLocaleDateString('es-CO')}
                                            </td>

                                            {/* Acción */}
                                            <td className="px-6 py-3.5 text-right">
                                                {isPendiente ? (
                                                    <button
                                                        onClick={() => setOrdenPagando(orden)}
                                                        className="inline-flex items-center gap-1.5 bg-zinc-950 hover:bg-zinc-800 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                                                    >
                                                        Procesar pago
                                                    </button>
                                                ) : (
                                                    <span className="text-xs text-zinc-400 font-medium">Completada</span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Modal confirmar pago */}
            {ordenPagando && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 space-y-4">
                        <h3 className="text-base font-bold text-zinc-900">Confirmar pago</h3>
                        <p className="text-sm text-zinc-500">
                            ¿Confirmas el pago de{' '}
                            <span className="font-bold text-zinc-900">${Number(ordenPagando.monto).toFixed(2)} USD</span>?
                            Esto activará la licencia automáticamente.
                        </p>
                        {error && <p className="text-xs text-red-500">{error}</p>}
                        <div className="flex gap-3 pt-1">
                            <button
                                onClick={() => handlePago(ordenPagando)}
                                disabled={loadingPago}
                                className="flex-1 bg-zinc-950 hover:bg-zinc-800 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-all disabled:opacity-50"
                            >
                                {loadingPago ? 'Procesando...' : 'Confirmar pago'}
                            </button>
                            <button
                                onClick={() => { setOrdenPagando(null); setError(null); }}
                                className="flex-1 border border-zinc-200 text-zinc-700 px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-zinc-50 transition-colors"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
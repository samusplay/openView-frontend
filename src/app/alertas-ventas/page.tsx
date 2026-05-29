'"'"'use client'"'"'

import { useCallback, useEffect, useState } from 'react'
import { AlertaVenta, getAlertas } from '@/lib/api-client'
import VerificarButton from './components/VerificarButton'
import AlertasList from './components/AlertasList'

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:4000'

export default function AlertasVentasPage() {
  const [alertas, setAlertas] = useState<AlertaVenta[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const cargar = useCallback(async () => {
    try { const data = await getAlertas(); setAlertas(data); setError(null) }
    catch { setError(`No se pudo conectar con el backend. ¿Está corriendo en ${BACKEND}?`) }
    finally { setLoading(false) }
  }, [])

  useEffect(() => { cargar() }, [cargar])

  const soloVencimiento = alertas.filter((a) => a.motivo === 'Trial_Por_Vencer')

  return (
    <div className="min-h-screen bg-stone-950 font-mono text-stone-100">
      <header className="border-b border-stone-800 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-xs tracking-widest text-stone-400 uppercase">Sistema de Ventas</span>
          <span className="text-stone-700">·</span>
          <span className="text-xs tracking-widest text-amber-400 uppercase">HU-07</span>
        </div>
        <span className="text-xs text-stone-600">Alertas por vencimiento de trial</span>
      </header>
      <div className="max-w-3xl mx-auto px-6 py-10 space-y-8">
        <div>
          <h1 className="text-xl font-medium text-stone-100 mb-1">Alertas por vencimiento de trial</h1>
          <p className="text-xs text-stone-500">Prospectos con score mayor a 50 pts y trial que vence en 5 días o menos.</p>
        </div>
        <VerificarButton onVerificado={cargar} />
        <div className="space-y-3">
          <div className="text-xs text-stone-500 uppercase tracking-wider">Alertas generadas ({soloVencimiento.length})</div>
          {error && <p className="text-xs text-red-400 border border-red-900/40 rounded p-3">{error}</p>}
          {loading ? <p className="text-xs text-stone-600">Cargando...</p> : <AlertasList alertas={soloVencimiento} onActualizado={cargar} />}
        </div>
      </div>
    </div>
  )
}
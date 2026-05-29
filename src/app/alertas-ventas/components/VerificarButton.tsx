'"'"'use client'"'"'

import { useState, useTransition } from 'react'
import { verificarVencimientos } from '@/lib/api-client'

interface Props { onVerificado: () => void }
const REGIONES = ['TODAS', 'LATAM', 'NA', 'EMEA'] as const

export default function VerificarButton({ onVerificado }: Props) {
  const [isPending, startTransition] = useTransition()
  const [region, setRegion] = useState<(typeof REGIONES)[number]>('TODAS')
  const [resultado, setResultado] = useState<string | null>(null)

  function handleClick() {
    setResultado(null)
    startTransition(async () => {
      try {
        const r = await verificarVencimientos(region === 'TODAS' ? undefined : region)
        setResultado(r.alertas_creadas > 0 ? `Se generaron ${r.alertas_creadas} alerta(s) nueva(s).` : 'No hay nuevos trials por vencer con score calificado.')
        onVerificado()
      } catch { setResultado('No se pudo ejecutar la verificación') }
    })
  }

  return (
    <div className="border border-stone-800 rounded p-4 space-y-3">
      <div className="text-xs text-stone-500 uppercase tracking-wider">Ejecutar verificación</div>
      <div className="flex items-center gap-2">
        <select value={region} onChange={(e) => setRegion(e.target.value as (typeof REGIONES)[number])}
          className="bg-stone-900 border border-stone-800 rounded px-3 py-2 text-sm text-stone-100 focus:outline-none focus:border-amber-700">
          {REGIONES.map((r) => (<option key={r} value={r}>{r === 'TODAS' ? 'Todas las regiones' : r}</option>))}
        </select>
        <button onClick={handleClick} disabled={isPending}
          className="flex-1 py-2 bg-amber-500 text-stone-950 text-sm font-medium tracking-wider uppercase rounded hover:bg-amber-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
          {isPending ? 'Verificando...' : 'Verificar vencimientos'}
        </button>
      </div>
      {resultado && <p className="text-xs text-amber-400">{resultado}</p>}
    </div>
  )
}
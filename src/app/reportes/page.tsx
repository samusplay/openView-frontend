import {
    obtenerFunnelConversion,
    obtenerLicenciasActivas,
    obtenerProspectosCalientes,
    obtenerResumenVendedores,
} from '@/app/actions/reportes.actions';

interface ProspectoCaliente {
  prospecto_id: string;
  nombre: string;
  email: string;
  empresa: string;
  tier: string;
  score: number;
  nivel: string;
  logins_7d: number;
  features_usadas: number;
  plan_trial: string;
  dias_restantes: number;
  estado_trial: string;
}

interface ResumenVendedor {
  vendedor_id: string;
  vendedor: string;
  region: string;
  total_alertas: number;
  alertas_pendientes: number;
  cierres_ganados: number;
  cierres_perdidos: number;
  revenue_total_usd: number;
}

interface LicenciaActiva {
  licencia_id: string;
  clave_activacion: string;
  plan: string;
  max_usuarios: number;
  fecha_inicio: string;
  fecha_expiracion: string;
  dias_vigencia: number;
  estado: string;
  prospecto: string;
  email: string;
  empresa: string;
}

interface FunnelEtapa {
  etapa: string;
  total: number;
}

export default async function ReportesPage() {
  const [calientes, vendedores, licencias, funnel] = await Promise.all([
    obtenerProspectosCalientes() as Promise<ProspectoCaliente[]>,
    obtenerResumenVendedores()   as Promise<ResumenVendedor[]>,
    obtenerLicenciasActivas()    as Promise<LicenciaActiva[]>,
    obtenerFunnelConversion()    as Promise<FunnelEtapa[]>,
  ]);

  // Métrica del funnel para las tarjetas superiores
  const totalProspectos  = funnel.find(f => f.etapa === 'Prospectos registrados')?.total ?? 0;
  const trialsActivos    = funnel.find(f => f.etapa === 'Trials activos')?.total ?? 0;
  const pagosCompletados = funnel.find(f => f.etapa === 'Pagos completados')?.total ?? 0;
  const licenciasActivas = funnel.find(f => f.etapa === 'Licencias activas')?.total ?? 0;

  return (
    <main className="min-h-screen bg-zinc-50/60 text-zinc-900 antialiased py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* Encabezado */}
        <div className="border-b border-zinc-200/60 pb-5">
          <h1 className="text-2xl font-bold text-zinc-950 tracking-tight">Reportes</h1>
          <p className="text-sm text-zinc-500 mt-1">
            Visión general del pipeline comercial, conversiones y licencias activas.
          </p>
        </div>

        {/* KPIs superiores — Funnel */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Prospectos',       value: totalProspectos,  color: 'text-zinc-900' },
            { label: 'Trials activos',   value: trialsActivos,    color: 'text-blue-600' },
            { label: 'Pagos exitosos',   value: pagosCompletados, color: 'text-emerald-600' },
            { label: 'Licencias activas',value: licenciasActivas, color: 'text-amber-600' },
          ].map((kpi) => (
            <div key={kpi.label} className="bg-white border border-zinc-200 rounded-xl p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">{kpi.label}</p>
              <p className={`text-3xl font-bold mt-1 ${kpi.color}`}>{kpi.value}</p>
            </div>
          ))}
        </div>

        {/* Funnel completo */}
        <div className="bg-white border border-zinc-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-100">
            <h2 className="text-sm font-bold text-zinc-900">Funnel de conversión</h2>
            <p className="text-xs text-zinc-400 mt-0.5">De prospecto registrado a licencia activa</p>
          </div>
          <div className="divide-y divide-zinc-100">
            {funnel.map((etapa, i) => {
              const max = funnel[0]?.total ?? 1;
              const pct = Math.round((etapa.total / max) * 100);
              return (
                <div key={i} className="px-6 py-3.5 flex items-center gap-4">
                  <span className="text-xs font-semibold text-zinc-500 w-44 shrink-0">{etapa.etapa}</span>
                  <div className="flex-1 bg-zinc-100 rounded-full h-2">
                    <div
                      className="bg-zinc-950 h-2 rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-zinc-900 w-8 text-right">{etapa.total}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Resumen por vendedor */}
        <div className="bg-white border border-zinc-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-100">
            <h2 className="text-sm font-bold text-zinc-900">Rendimiento por vendedor</h2>
            <p className="text-xs text-zinc-400 mt-0.5">Alertas, cierres y revenue generado</p>
          </div>
          {vendedores.length === 0 ? (
            <p className="px-6 py-8 text-sm text-zinc-400 text-center">Sin datos de vendedores</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead className="bg-zinc-50/75 border-b border-zinc-200/60 text-xs font-bold text-zinc-500 uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Vendedor</th>
                    <th className="px-6 py-4">Región</th>
                    <th className="px-6 py-4 text-center">Alertas</th>
                    <th className="px-6 py-4 text-center">Ganados</th>
                    <th className="px-6 py-4 text-center">Perdidos</th>
                    <th className="px-6 py-4 text-right">Revenue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {vendedores.map((v) => (
                    <tr key={v.vendedor_id} className="hover:bg-zinc-50/50 transition-colors group">
                      <td className="px-6 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-md bg-zinc-100 text-zinc-600 font-semibold text-xs flex items-center justify-center border border-zinc-200/60 uppercase">
                            {v.vendedor.charAt(0)}
                          </div>
                          <span className="font-semibold text-zinc-900">{v.vendedor}</span>
                        </div>
                      </td>
                      <td className="px-6 py-3.5">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-zinc-50 text-zinc-700 border border-zinc-200">
                          {v.region}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 text-center font-semibold text-zinc-700">{v.total_alertas}</td>
                      <td className="px-6 py-3.5 text-center">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {v.cierres_ganados}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 text-center">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold bg-red-50 text-red-700 border border-red-200">
                          {v.cierres_perdidos}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 text-right font-bold text-zinc-900">
                        ${Number(v.revenue_total_usd).toLocaleString('es-CO')} USD
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Prospectos calientes */}
        <div className="bg-white border border-zinc-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-100">
            <h2 className="text-sm font-bold text-zinc-900">Prospectos calientes</h2>
            <p className="text-xs text-zinc-400 mt-0.5">Score mayor a 70 pts con trial activo</p>
          </div>
          {calientes.length === 0 ? (
            <p className="px-6 py-8 text-sm text-zinc-400 text-center">Sin prospectos calientes activos</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead className="bg-zinc-50/75 border-b border-zinc-200/60 text-xs font-bold text-zinc-500 uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Prospecto</th>
                    <th className="px-6 py-4">Empresa</th>
                    <th className="px-6 py-4 text-center">Score</th>
                    <th className="px-6 py-4 text-center">Logins 7d</th>
                    <th className="px-6 py-4 text-center">Días restantes</th>
                    <th className="px-6 py-4">Plan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {calientes.map((c) => (
                    <tr key={c.prospecto_id} className="hover:bg-zinc-50/50 transition-colors group">
                      <td className="px-6 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-md bg-red-50 text-red-600 font-semibold text-xs flex items-center justify-center border border-red-200/60 uppercase">
                            {c.nombre.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-zinc-900">{c.nombre}</p>
                            <p className="text-xs text-zinc-400">{c.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-3.5">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-zinc-50 text-zinc-700 border border-zinc-200">
                          {c.empresa}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 text-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold bg-red-50 text-red-700 border border-red-200">
                          🔥 {c.score} pts
                        </span>
                      </td>
                      <td className="px-6 py-3.5 text-center font-semibold text-zinc-700">{c.logins_7d}</td>
                      <td className="px-6 py-3.5 text-center">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold border ${
                          c.dias_restantes <= 5
                            ? 'bg-red-50 text-red-700 border-red-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}>
                          {c.dias_restantes}d
                        </span>
                      </td>
                      <td className="px-6 py-3.5 text-xs font-medium text-zinc-600">{c.plan_trial}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Licencias activas */}
        <div className="bg-white border border-zinc-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-100">
            <h2 className="text-sm font-bold text-zinc-900">Licencias activas</h2>
            <p className="text-xs text-zinc-400 mt-0.5">Claves generadas y su vigencia</p>
          </div>
          {licencias.length === 0 ? (
            <p className="px-6 py-8 text-sm text-zinc-400 text-center">Sin licencias activas</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead className="bg-zinc-50/75 border-b border-zinc-200/60 text-xs font-bold text-zinc-500 uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Cliente</th>
                    <th className="px-6 py-4">Clave</th>
                    <th className="px-6 py-4">Plan</th>
                    <th className="px-6 py-4 text-center">Usuarios</th>
                    <th className="px-6 py-4 text-center">Días vigencia</th>
                    <th className="px-6 py-4">Vence</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {licencias.map((l) => (
                    <tr key={l.licencia_id} className="hover:bg-zinc-50/50 transition-colors group">
                      <td className="px-6 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-md bg-emerald-50 text-emerald-600 font-semibold text-xs flex items-center justify-center border border-emerald-200/60 uppercase">
                            {l.prospecto.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-zinc-900">{l.prospecto}</p>
                            <p className="text-xs text-zinc-400">{l.empresa}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-3.5">
                        <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-md">
                          {l.clave_activacion}
                        </span>
                      </td>
                      <td className="px-6 py-3.5">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-zinc-50 text-zinc-700 border border-zinc-200">
                          {l.plan}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 text-center font-semibold text-zinc-700">{l.max_usuarios}</td>
                      <td className="px-6 py-3.5 text-center">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold border ${
                          l.dias_vigencia <= 30
                            ? 'bg-red-50 text-red-700 border-red-200'
                            : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        }`}>
                          {l.dias_vigencia}d
                        </span>
                      </td>
                      <td className="px-6 py-3.5 text-xs text-zinc-500">
                        {new Date(l.fecha_expiracion).toLocaleDateString('es-CO')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
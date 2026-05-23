import { obtenerEmpresas } from '@/app/actions/empresas.actions';
import Link from 'next/link';

interface Empresa {
  id: string;
  nombre: string;
  industria: string;
}

interface ResponseEmpresas {
  message: string;
  data: Empresa[];
}

export default async function EmpresasPage() {
  const response = await obtenerEmpresas() as ResponseEmpresas;
  const empresas = response.data;

  return (
    <main className="min-h-screen bg-zinc-50/60 text-zinc-900 antialiased py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-7">
        
        {/* Encabezado Principal */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-200/60 pb-5">
          <div>
            <h1 className="text-2xl font-bold text-zinc-950 tracking-tight">Empresas</h1>
            <p className="text-sm text-zinc-500 mt-1">
              Administra las organizaciones y sectores vinculados a tus campañas.
            </p>
          </div>
          
          <Link
            href="/empresas/nueva"
            className="inline-flex items-center gap-2 bg-zinc-950 hover:bg-zinc-800 text-white px-4 py-2.5 rounded-lg text-sm font-semibold shadow-sm transition-all self-start sm:self-auto active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950"
          >
            <svg className="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Nueva empresa
          </Link>
        </div>

        {/* Métrica rápida / Contador superior */}
        {empresas.length > 0 && (
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
            <span>Listado general</span>
            <span className="h-1 w-1 rounded-full bg-zinc-300" />
            <span className="text-zinc-600 normal-case font-medium">
              {empresas.length} {empresas.length === 1 ? 'registro encontrado' : 'registros encontrados'}
            </span>
          </div>
        )}

        {/* Sección Principal */}
        {empresas.length === 0 ? (
          
          /* Estado Vacío Pulido */
          <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-12 text-center flex flex-col items-center justify-center transition-all">
            <div className="h-11 w-11 rounded-lg bg-zinc-50 flex items-center justify-center border border-zinc-200 mb-4 text-zinc-400 shadow-sm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 16.5h1.5M13.5 16.5H15" />
              </svg>
            </div>
            <h3 className="text-sm font-bold text-zinc-900 tracking-tight">No tienes empresas registradas</h3>
            <p className="text-xs text-zinc-400 max-w-[300px] mt-1 mb-5 leading-relaxed balance">
              Crea tu primera organización para asociar cargos, flujos de trabajo y segmentar tus prospectos adecuadamente.
            </p>
            <Link
              href="/empresas/nueva"
              className="inline-flex items-center gap-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-200/80 px-4 py-2 rounded-lg text-xs font-semibold shadow-sm transition-colors"
            >
              Registrar empresa inicial
            </Link>
          </div>
        ) : (
          
          /* Tabla Premium de Datos */
          <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead className="bg-zinc-50/75 border-b border-zinc-200/60 text-xs font-bold text-zinc-500 uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4 font-bold">Nombre de la Empresa</th>
                    <th className="px-6 py-4 font-bold">Industria / Sector</th>
                    <th className="relative px-6 py-4 w-0">
                      <span className="sr-only">Acciones</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {empresas.map((empresa) => {
                    // Inicial de la empresa para el mini avatar
                    const inicial = empresa.nombre.charAt(0).toUpperCase();

                    return (
                      <tr 
                        key={empresa.id} 
                        className="hover:bg-zinc-50/50 transition-colors group cursor-pointer"
                      >
                        {/* Celda de Nombre con Avatar Incorporado */}
                        <td className="px-6 py-3.5 max-w-xs sm:max-w-sm">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-md bg-zinc-100 text-zinc-600 font-semibold text-xs flex items-center justify-center border border-zinc-200/60 shadow-sm shrink-0 uppercase group-hover:bg-zinc-200/50 group-hover:text-zinc-900 transition-colors">
                              {inicial}
                            </div>
                            <span className="font-semibold text-zinc-900 group-hover:text-zinc-950 transition-colors truncate">
                              {empresa.nombre}
                            </span>
                          </div>
                        </td>
                        
                        {/* Celda de Industria */}
                        <td className="px-6 py-3.5">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-zinc-50 text-zinc-700 border border-zinc-200 shadow-sm group-hover:bg-white transition-colors">
                            {empresa.industria}
                          </span>
                        </td>

                        {/* Indicador de Acción sutil al hacer Hover */}
                        <td className="px-6 py-3.5 text-right whitespace-nowrap">
                          <div className="flex justify-end opacity-0 group-hover:opacity-100 transform translate-x-1 group-hover:translate-x-0 transition-all duration-200">
                            <svg className="w-4 h-4 text-zinc-400 group-hover:text-zinc-900" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
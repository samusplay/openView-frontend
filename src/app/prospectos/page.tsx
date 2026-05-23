import { obtenerProspectos } from '@/app/actions/prospectos.actions';
import Link from 'next/link';

interface Prospecto {
  id: string;
  email: string;
  nombre: string;
  cargo: string;
  fuenteOrigen: string;
  empresaId: string;
}

interface ResponseProspectos {
  message: string;
  data: Prospecto[];
}

export default async function ProspectosPage() {
  const response = (await obtenerProspectos()) as ResponseProspectos;
  const prospectos = response.data;

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Encabezado Principal */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Prospectos
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {prospectos.length} {prospectos.length === 1 ? 'prospecto registrado' : 'prospectos registrados'} en total
            </p>
          </div>
          
          <Link
            href="/prospectos/nueva"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 self-start sm:self-auto"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            Nuevo prospecto
          </Link>
        </div>

        {/* Renderizado Condicional */}
        {prospectos.length === 0 ? (
          /* Estado Vacío Premium (Empty State) */
          <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center shadow-sm max-w-md mx-auto mt-12">
            <div className="h-12 w-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mx-auto mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-base font-bold text-gray-900">No hay prospectos</h3>
            <p className="text-sm text-gray-500 mt-1 mb-6">
              Comienza por añadir tu primer cliente potencial para hacerle seguimiento comercial.
            </p>
            <Link
              href="/prospectos/nueva"
              className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-100 transition-colors"
            >
              Crear primer prospecto
            </Link>
          </div>
        ) : (
          /* Contenedor de la Tabla con scroll y sombra suave */
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3.5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Nombre
                    </th>
                    <th className="px-6 py-3.5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3.5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Cargo
                    </th>
                    <th className="px-6 py-3.5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Fuente
                    </th>
                    <th className="relative px-6 py-3.5">
                      <span className="sr-only">Acciones</span>
                    </th>
                  </tr>
                </thead>
                
                <tbody className="divide-y divide-gray-100 bg-white">
                  {prospectos.map((p) => (
                    <tr 
                      key={p.id} 
                      className="hover:bg-gray-50/70 transition-colors duration-150 group"
                    >
                      {/* Nombre con tipografía más pesada */}
                      <td className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap">
                        {p.nombre}
                      </td>
                      
                      <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                        {p.email}
                      </td>
                      
                      <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                        {p.cargo}
                      </td>
                      
                      {/* Fuente con estilo de Badge/Píldora */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                          {p.fuenteOrigen}
                        </span>
                      </td>
                      
                      {/* Enlace de Acción limpio */}
                      <td className="px-6 py-4 text-right whitespace-nowrap text-sm font-medium">
                        <Link
                          href={`/prospectos/${p.id}`}
                          className="text-blue-600 hover:text-blue-900 font-semibold inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform duration-150"
                        >
                          Ver
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
      </div>
    </main>
  );
}
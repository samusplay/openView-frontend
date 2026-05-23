import { obtenerProspecto } from '@/app/actions/prospectos.actions';
import Link from 'next/link';

interface Prospecto {
  id: string;
  email: string;
  nombre: string;
  cargo: string;
  fuenteOrigen: string;
  empresaId: string;
}

interface ResponseProspecto {
  message: string;
  data: Prospecto;
}

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProspectoDetallePage({ params }: Props) {
  const { id } = await params;
  const response = (await obtenerProspecto(id)) as ResponseProspecto;
  const prospecto = response.data;

  // Generamos iniciales para un avatar (ej: "Juan Perez" -> "JP")
  const initials = prospecto.nombre
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Navegación Back - Clave para la UX */}
        <div className="mb-6">
          <Link 
            href="/prospectos" 
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver a prospectos
          </Link>
        </div>

        {/* Tarjeta Principal */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          
          {/* Cabecera del Perfil */}
          <div className="px-6 py-8 sm:px-8 border-b border-gray-100 flex items-center gap-5 bg-white">
            <div className="h-16 w-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xl font-bold flex-shrink-0">
              {initials}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                {prospecto.nombre}
              </h1>
              <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {prospecto.email}
              </p>
            </div>
          </div>

          {/* Sección de Detalles usando listas de descripción (dl) */}
          <div className="px-6 py-6 sm:px-8">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-6">
              Información Profesional
            </h2>
            
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Cargo</dt>
                <dd className="mt-1 text-sm text-gray-900 font-medium">
                  {prospecto.cargo}
                </dd>
              </div>

              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Fuente de origen</dt>
                <dd className="mt-1.5">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-200">
                    {prospecto.fuenteOrigen}
                  </span>
                </dd>
              </div>

              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">ID de Empresa Vinculada</dt>
                <dd className="mt-1 text-sm text-gray-600 font-mono bg-gray-50 px-3 py-1.5 rounded border border-gray-200 inline-block">
                  {prospecto.empresaId}
                </dd>
              </div>
            </dl>
          </div>
          
        </div>
      </div>
    </main>
  );
}
import { obtenerProspecto } from '@/app/actions/prospectos.actions';
import { obtenerTrialPorProspecto } from '@/app/actions/trials.actions';
import Link from 'next/link';

interface Prospecto {
  id: string;
  email: string;
  nombre: string;
  cargo: string;
  fuenteOrigen: string;
  empresaId: string;
}

interface Trial {
  id: string;
  prospectoId: string;
  fechaInicio: string;
  fechaVencimiento: string;
  estado: string;
  versionPlan: string;
}

interface Props {
  params: Promise<{ id: string }>;
}

function diasRestantes(fechaVencimiento: string): number {
  const hoy = new Date();
  const vencimiento = new Date(fechaVencimiento);
  const diff = vencimiento.getTime() - hoy.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export default async function ProspectoDetallePage({ params }: Props) {
  const { id } = await params;

  const responseProspecto = await obtenerProspecto(id) as { message: string; data: Prospecto };
  const prospecto = responseProspecto.data;

  let trial: Trial | null = null;
  try {
    const responseTrial = await obtenerTrialPorProspecto(id) as { message: string; data: Trial };
    trial = responseTrial.data;
  } catch {
    trial = null;
  }

  const dias = trial ? diasRestantes(trial.fechaVencimiento) : null;

  // Iniciales para el Avatar de la cabecera
  const initials = prospecto.nombre.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();

  return (
    <main className="min-h-screen bg-gray-50/50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Barra de Navegación Superior */}
        <div>
          <Link 
            href="/prospectos" 
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver a listado
          </Link>
        </div>

        {/* Header con Perfil del Prospecto */}
        <div className="flex items-center gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="h-14 w-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-lg font-bold border border-blue-100 flex-shrink-0">
            {initials}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{prospecto.nombre}</h1>
            <p className="text-sm text-gray-500 mt-0.5 flex items-center gap-1.5">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {prospecto.email}
            </p>
          </div>
        </div>

        {/* Grid de Información Principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">

          {/* Tarjeta 1: Datos del Prospecto */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Datos de contacto</h2>
            </div>
            <dl className="divide-y divide-gray-100 px-6 py-2">
              <div className="py-3.5 flex justify-between items-center gap-4">
                <dt className="text-sm font-medium text-gray-500">Nombre completo</dt>
                <dd className="text-sm font-semibold text-gray-900 text-right">{prospecto.nombre}</dd>
              </div>
              <div className="py-3.5 flex justify-between items-center gap-4">
                <dt className="text-sm font-medium text-gray-500">Email corporativo</dt>
                <dd className="text-sm text-gray-700 text-right font-medium">{prospecto.email}</dd>
              </div>
              <div className="py-3.5 flex justify-between items-center gap-4">
                <dt className="text-sm font-medium text-gray-500">Cargo / Rol</dt>
                <dd className="text-sm text-gray-700 text-right">{prospecto.cargo}</dd>
              </div>
              <div className="py-3.5 flex justify-between items-center gap-4">
                <dt className="text-sm font-medium text-gray-500">Origen de captación</dt>
                <dd className="text-sm text-right">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-800 border border-gray-200">
                    {prospecto.fuenteOrigen}
                  </span>
                </dd>
              </div>
            </dl>
          </div>

          {/* Tarjeta 2: Estado del Trial */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between gap-4">
              <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Suscripción Trial</h2>
              
              {/* Botón superior si tiene trial para gestionar, o link limpio */}
              {!trial && (
                <Link
                  href="/trials/nueva"
                  className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                  </svg>
                  Iniciar trial
                </Link>
              )}
            </div>

            {trial ? (
              <dl className="divide-y divide-gray-100 px-6 py-2">
                <div className="py-3.5 flex justify-between items-center gap-4">
                  <dt className="text-sm font-medium text-gray-500">Versión del Plan</dt>
                  <dd className="text-sm font-semibold text-gray-900 bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-md border border-blue-100">
                    {trial.versionPlan}
                  </dd>
                </div>
                
                <div className="py-3.5 flex justify-between items-center gap-4">
                  <dt className="text-sm font-medium text-gray-500">Estado actual</dt>
                  <dd className="text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                      trial.estado === 'Activo' 
                        ? 'bg-green-50 text-green-700 border-green-200' 
                        : trial.estado === 'Expirado' 
                        ? 'bg-red-50 text-red-700 border-red-200' 
                        : 'bg-gray-50 text-gray-600 border-gray-200'
                    }`}>
                      {trial.estado}
                    </span>
                  </dd>
                </div>

                <div className="py-3.5 flex justify-between items-center gap-4">
                  <dt className="text-sm font-medium text-gray-500">Fecha de inicio</dt>
                  <dd className="text-sm text-gray-700 font-medium">
                    {new Date(trial.fechaInicio).toLocaleDateString('es-CO', { dateStyle: 'medium' })}
                  </dd>
                </div>

                <div className="py-3.5 flex justify-between items-center gap-4">
                  <dt className="text-sm font-medium text-gray-500">Vencimiento</dt>
                  <dd className="text-sm text-gray-700 font-medium">
                    {new Date(trial.fechaVencimiento).toLocaleDateString('es-CO', { dateStyle: 'medium' })}
                  </dd>
                </div>

                <div className="py-3.5 flex justify-between items-center gap-4">
                  <dt className="text-sm font-medium text-gray-500">Tiempo restante</dt>
                  <dd className="text-sm">
                    {dias !== null ? (
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold border ${
                        dias <= 5 
                          ? 'bg-amber-50 text-amber-700 border-amber-200 animate-pulse' 
                          : 'bg-gray-100 text-gray-700 border-gray-200'
                      }`}>
                        {dias <= 0 ? 'Expirado' : `${dias} días restantes`}
                      </span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </dd>
                </div>
              </dl>
            ) : (
              /* State Vacío dentro de la tarjeta */
              <div className="p-8 text-center">
                <p className="text-sm text-gray-400 mb-4">
                  Este prospecto no tiene un periodo de prueba configurado actualmente.
                </p>
                <Link
                  href="/trials/nueva"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-sm hover:bg-blue-700 transition-colors"
                >
                  Configurar plan Demo
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}
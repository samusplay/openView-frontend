import { obtenerEventosPorProspecto } from '@/app/actions/eventos.actions';
import { obtenerProspecto, obtenerScorePorProspecto } from '@/app/actions/prospectos.actions';
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

interface Evento {
  id: string;
  prospectoId: string;
  tipoEvento: string;
  puntos: number;
  createdAt: string;
}

interface Score {
  scoreTotal: number;
  nivel: string;
  logins7d: number;
  featuresUsadas: number;
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

  let eventos: Evento[] = [];
  try {
    const responseEventos = await obtenerEventosPorProspecto(id) as { message: string; data: Evento[] };
    eventos = responseEventos.data;
  } catch {
    eventos = [];
  }

  let score: Score | null = null;
  try {
    const responseScore = await obtenerScorePorProspecto(id) as { message: string; data: Score };
    score = responseScore.data;
  } catch {
    score = null;
  }

  const dias = trial ? diasRestantes(trial.fechaVencimiento) : null;
  const inicial = prospecto.nombre.charAt(0).toUpperCase();

  return (
    <main className="min-h-screen bg-zinc-50/60 text-zinc-900 antialiased py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">

        <Link
          href="/prospectos"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-800 transition-colors group"
        >
          <svg className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Volver a prospectos
        </Link>

        {/* Encabezado */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-200/60 pb-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-zinc-950 text-white font-bold text-lg flex items-center justify-center shadow-md shrink-0 select-none">
              {inicial}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-zinc-950 tracking-tight leading-none">{prospecto.nombre}</h1>
              <p className="text-sm text-zinc-500 mt-1.5 font-medium">{prospecto.email}</p>
            </div>
          </div>
          <Link
            href="/eventos"
            className="inline-flex items-center gap-2 bg-zinc-950 hover:bg-zinc-800 text-white px-4 py-2.5 rounded-lg text-sm font-semibold shadow-sm transition-all self-start sm:self-auto active:scale-[0.98]"
          >
            <svg className="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Registrar evento
          </Link>
        </div>

        {/* Score banner */}
        {score && (
          <div className="bg-white border border-zinc-200 shadow-sm rounded-xl p-5 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Lead Score</p>
              <p className="text-3xl font-bold text-zinc-950">{score.scoreTotal} pts</p>
              <p className="text-xs text-zinc-500">{score.logins7d} logins últimos 7 días · {score.featuresUsadas} features usadas</p>
            </div>
            <span className={`text-sm font-bold px-4 py-2 rounded-full border ${
              score.nivel === 'Caliente' ? 'bg-red-50 text-red-700 border-red-200' :
              score.nivel === 'Tibio' ? 'bg-amber-50 text-amber-700 border-amber-200' :
              'bg-blue-50 text-blue-700 border-blue-200'
            }`}>
              {score.nivel}
            </span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

          {/* Izquierda */}
          <div className="lg:col-span-2 space-y-6">

            {/* Datos generales */}
            <div className="bg-white border border-zinc-200 shadow-sm rounded-xl overflow-hidden">
              <div className="px-5 py-4 bg-zinc-50/50 border-b border-zinc-200/60">
                <h2 className="text-sm font-bold text-zinc-800 tracking-tight">Datos generales</h2>
              </div>
              <div className="divide-y divide-zinc-100 text-sm">
                <div className="flex flex-col sm:flex-row px-5 py-3.5 gap-1 sm:gap-0">
                  <span className="text-zinc-400 sm:w-44 shrink-0 font-medium">Nombre completo</span>
                  <span className="font-semibold text-zinc-900">{prospecto.nombre}</span>
                </div>
                <div className="flex flex-col sm:flex-row px-5 py-3.5 gap-1 sm:gap-0">
                  <span className="text-zinc-400 sm:w-44 shrink-0 font-medium">Email corporativo</span>
                  <span className="text-zinc-700 font-medium select-all">{prospecto.email}</span>
                </div>
                <div className="flex flex-col sm:flex-row px-5 py-3.5 gap-1 sm:gap-0">
                  <span className="text-zinc-400 sm:w-44 shrink-0 font-medium">Cargo</span>
                  <span className="text-zinc-700 font-medium">{prospecto.cargo}</span>
                </div>
                <div className="flex flex-col sm:flex-row px-5 py-3.5 gap-1 sm:gap-0">
                  <span className="text-zinc-400 sm:w-44 shrink-0 font-medium">Fuente de origen</span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold bg-zinc-100 text-zinc-800 border border-zinc-200/40 w-fit">
                    {prospecto.fuenteOrigen}
                  </span>
                </div>
              </div>
            </div>

            {/* Trial */}
            <div className="bg-white border border-zinc-200 shadow-sm rounded-xl overflow-hidden">
              <div className="px-5 py-4 bg-zinc-50/50 border-b border-zinc-200/60 flex items-center justify-between">
                <h2 className="text-sm font-bold text-zinc-800 tracking-tight">Estatus de suscripción (Trial)</h2>
                {!trial && (
                  <Link
                    href="/trials/nueva"
                    className="inline-flex items-center gap-1 text-xs font-bold text-zinc-600 hover:text-zinc-950 transition-colors bg-zinc-100 border border-zinc-200 px-2.5 py-1 rounded-md"
                  >
                    + Iniciar trial
                  </Link>
                )}
              </div>
              {trial ? (
                <div className="divide-y divide-zinc-100 text-sm">
                  <div className="flex px-5 py-3.5 items-center">
                    <span className="text-zinc-400 w-44 font-medium">Plan asignado</span>
                    <span className="font-bold text-zinc-900 bg-zinc-50 border border-zinc-200 px-2 py-0.5 rounded text-xs">{trial.versionPlan}</span>
                  </div>
                  <div className="flex px-5 py-3.5 items-center">
                    <span className="text-zinc-400 w-44 font-medium">Estado</span>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      trial.estado === 'Activo'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-red-50 text-red-700 border border-red-200'
                    }`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${trial.estado === 'Activo' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                      {trial.estado}
                    </span>
                  </div>
                  <div className="flex px-5 py-3.5 items-center">
                    <span className="text-zinc-400 w-44 font-medium">Vencimiento</span>
                    <span className="text-zinc-700 font-medium">{new Date(trial.fechaVencimiento).toLocaleDateString('es-CO', { dateStyle: 'long' })}</span>
                  </div>
                  <div className="flex px-5 py-3.5 items-center">
                    <span className="text-zinc-400 w-44 font-medium">Días restantes</span>
                    <span className={`font-semibold text-xs px-2 py-0.5 rounded ${
                      dias !== null && dias <= 5
                        ? 'bg-red-50 text-red-700 border border-red-100 font-bold animate-pulse'
                        : 'bg-zinc-100 text-zinc-800'
                    }`}>
                      {dias !== null ? `${dias} días corridos` : '—'}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="p-6 text-center">
                  <p className="text-xs font-medium text-zinc-400">Sin período de prueba activo.</p>
                </div>
              )}
            </div>

          </div>

          {/* Derecha: historial */}
          <div className="bg-white border border-zinc-200 shadow-sm rounded-xl overflow-hidden">
            <div className="px-5 py-4 bg-zinc-50/50 border-b border-zinc-200/60">
              <h2 className="text-sm font-bold text-zinc-800 tracking-tight">
                Historial de eventos ({eventos.length})
              </h2>
            </div>
            <div className="p-5 max-h-[460px] overflow-y-auto">
              {eventos.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-xs font-medium text-zinc-400">Sin interacciones registradas aún.</p>
                </div>
              ) : (
                <div className="relative border-l border-zinc-200 pl-4 space-y-6 ml-2">
                  {eventos.map((e) => (
                    <div key={e.id} className="relative group">
                      <span className="absolute -left-[21px] top-1 bg-white border-2 border-zinc-400 group-hover:border-zinc-950 h-3 w-3 rounded-full transition-colors duration-150" />
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-xs font-bold text-zinc-900">{e.tipoEvento.replace(/_/g, ' ')}</h4>
                          <span className="text-[11px] text-zinc-400 block mt-0.5 font-medium">
                            {new Date(e.createdAt).toLocaleDateString('es-CO')} a las {new Date(e.createdAt).toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <span className="text-xs font-bold text-zinc-950 shrink-0 bg-zinc-50 border border-zinc-200 px-1.5 py-0.5 rounded">
                          +{e.puntos}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
import { obtenerProspectos } from '@/app/actions/prospectos.actions';
import Link from 'next/link';
import EventoForm from './components/EventoForm';

interface Prospecto {
  id: string;
  nombre: string;
  email: string;
  cargo: string;
  fuenteOrigen: string;
  empresaId: string;
}

interface ResponseProspectos {
  message: string;
  data: Prospecto[];
}

export default async function NuevoEventoPage() {
  const response = await obtenerProspectos() as ResponseProspectos;
  const prospectos = response.data;

  return (
    <main className="min-h-screen bg-zinc-50/60 text-zinc-900 antialiased py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      
      <div className="w-full max-w-lg space-y-8">
        
        {/* Enlace de retorno */}
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
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-zinc-950 tracking-tight leading-none">
            Registrar interacción
          </h1>
          <p className="text-sm font-medium text-zinc-500 leading-relaxed">
            Añade un nuevo evento de tracking. Esto disparará automáticamente el recálculo del <span className="text-zinc-800 font-bold">Lead Score</span> del prospecto.
          </p>
        </div>

        {/* Contenedor del Formulario (Tarjeta) */}
        <div className="bg-white border border-zinc-200 shadow-sm rounded-xl p-6 sm:p-8">
          <EventoForm prospectos={prospectos} />
        </div>

      </div>

    </main>
  );
}
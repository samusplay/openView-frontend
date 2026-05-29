import { obtenerProspectos } from '@/app/actions/prospectos.actions';
import Link from 'next/link';
import TrialForm from '../components/TrialForm';

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

export default async function NuevoTrialPage() {
  const response = await obtenerProspectos() as ResponseProspectos;
  const prospectos = response.data;

  return (
    <main className="min-h-screen bg-zinc-50/60 text-zinc-900 antialiased py-12 px-4 sm:px-6 lg:px-8">
      {/* Contenedor reducido a max-w-2xl ideal para formularios */}
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* Enlace sutil de retorno */}
        <Link 
          href="/trials" 
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-800 transition-colors group"
        >
          <svg 
            className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform duration-200" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Volver a trials
        </Link>

        {/* Encabezado del Formulario */}
        <div className="border-b border-zinc-200/60 pb-5">
          <h1 className="text-2xl font-bold text-zinc-950 tracking-tight">Iniciar trial</h1>
          <p className="text-sm text-zinc-500 mt-1">
            Registra el período de prueba de 60 días para un prospecto calificado.
          </p>
        </div>

        {/* Contenedor del Formulario (Card Premium) */}
        <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6 sm:p-8 transition-all">
          <TrialForm prospectos={prospectos} />
        </div>

      </div>
    </main>
  );
}
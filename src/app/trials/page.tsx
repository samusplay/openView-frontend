import Link from 'next/link';

export default function TrialsPage() {
  return (
    <main className="min-h-screen bg-zinc-50/60 text-zinc-900 antialiased py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-7">
        
        {/* Encabezado de la Sección */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-200/60 pb-5">
          <div>
            <h1 className="text-2xl font-bold text-zinc-950 tracking-tight">Trials</h1>
            <p className="text-sm text-zinc-500 mt-1">
              Gestiona los períodos de prueba de los prospectos.
            </p>
          </div>
          
          <Link
            href="/trials/nueva"
            className="inline-flex items-center gap-2 bg-zinc-950 hover:bg-zinc-800 text-white px-4 py-2.5 rounded-lg text-sm font-semibold shadow-sm transition-all self-start sm:self-auto active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950"
          >
            <svg className="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Iniciar trial
          </Link>
        </div>

        {/* Tarjeta de Guía de Flujo (Workflow Hub) */}
        <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-8 sm:p-12 text-center flex flex-col items-center justify-center max-w-xl mx-auto mt-10 transition-all">
          
          {/* Ícono de Reloj/Tiempo Estilizado */}
          <div className="h-12 w-12 rounded-xl bg-zinc-50 flex items-center justify-center border border-zinc-200/80 mb-5 text-zinc-400 shadow-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <h2 className="text-base font-bold text-zinc-900 tracking-tight">
            Acceso desde el detalle del prospecto
          </h2>
          
          <p className="text-sm text-zinc-500 max-w-sm mt-2 mb-6 leading-relaxed balance">
            Para consultar, editar o realizar el seguimiento del período de prueba de un cliente específico, ingresa directamente a su ficha técnica.
          </p>
          
          {/* Botón de Acción Principal a Prospectos */}
          <Link
            href="/prospectos"
            className="inline-flex items-center gap-2 bg-zinc-100 hover:bg-zinc-200/80 text-zinc-800 border border-zinc-200 px-5 py-2.5 rounded-lg text-sm font-semibold shadow-sm transition-colors group"
          >
            Ir a listado de prospectos
            <svg 
              className="w-4 h-4 text-zinc-500 group-hover:text-zinc-900 group-hover:translate-x-0.5 transition-transform duration-200" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>

      </div>
    </main>
  );
}
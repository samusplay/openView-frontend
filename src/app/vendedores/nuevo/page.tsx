import Link from 'next/link';
import VendedorForm from '../components/VendedorForm';

export default function NuevoVendedorPage() {
  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="w-full max-w-lg space-y-8">

        <Link
          href="/vendedores"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-800 transition-colors group"
        >
          <svg className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Volver a vendedores
        </Link>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-zinc-950 tracking-tight leading-none">
            Registrar nuevo vendedor
          </h1>
          <p className="text-sm font-medium text-zinc-500 leading-relaxed">
            Asigna un nuevo representante al equipo de ventas. La <span className="text-zinc-800 font-bold">región</span> determina qué leads calientes recibirá automáticamente.
          </p>
        </div>

        <div className="bg-white border border-zinc-200 shadow-sm rounded-xl p-6 sm:p-8">
          <VendedorForm />
        </div>

      </div>
    </main>
  );
}
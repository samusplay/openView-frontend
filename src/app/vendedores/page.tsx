import { obtenerVendedores } from '@/app/actions/vendedores.actions';
import Link from 'next/link';

interface Vendedor {
  id: string;
  nombre: string;
  email: string;
  region: string;
  activo: boolean;
}

export default async function VendedoresPage() {
  const response = await obtenerVendedores() as { message: string; data: Vendedor[] };
  const vendedores = response.data;

  // Agrupar por región
  const regiones = Array.from(new Set(vendedores.map((v) => v.region)));

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Encabezado */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-200/60 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-zinc-950 tracking-tight">Equipo de ventas</h1>
            <p className="text-sm text-zinc-500 mt-1.5 font-medium">
              {vendedores.length} vendedor{vendedores.length !== 1 ? 'es' : ''} activo{vendedores.length !== 1 ? 's' : ''} distribuido{vendedores.length !== 1 ? 's' : ''} en {regiones.length} región{regiones.length !== 1 ? 'es' : ''}
            </p>
          </div>
          <Link
            href="/vendedores/nuevo"
            className="inline-flex items-center gap-2 bg-zinc-950 hover:bg-zinc-800 text-white px-4 py-2.5 rounded-lg text-sm font-semibold shadow-sm transition-all self-start sm:self-auto active:scale-[0.98]"
          >
            <svg className="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Nuevo vendedor
          </Link>
        </div>

        {/* Métricas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-sm">
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Total vendedores</p>
            <p className="text-3xl font-bold text-zinc-950 mt-1">{vendedores.length}</p>
          </div>
          <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-sm">
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Regiones cubiertas</p>
            <p className="text-3xl font-bold text-zinc-950 mt-1">{regiones.length}</p>
          </div>
          <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-sm">
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Activos</p>
            <p className="text-3xl font-bold text-emerald-600 mt-1">{vendedores.filter(v => v.activo).length}</p>
          </div>
        </div>

        {/* Lista agrupada por región */}
        {vendedores.length === 0 ? (
          <div className="bg-white border border-zinc-200 rounded-xl p-12 text-center shadow-sm">
            <p className="text-sm font-medium text-zinc-400">No hay vendedores registrados aún.</p>
            <Link
              href="/vendedores/nuevo"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-700 hover:text-zinc-950 mt-3"
            >
              Registrar el primero →
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {regiones.map((region) => {
              const delaRegion = vendedores.filter((v) => v.region === region);
              return (
                <div key={region} className="bg-white border border-zinc-200 rounded-xl shadow-sm overflow-hidden">
                  <div className="px-5 py-3.5 bg-zinc-50/50 border-b border-zinc-200/60 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                      <h2 className="text-sm font-bold text-zinc-800 tracking-tight">{region}</h2>
                    </div>
                    <span className="text-xs font-semibold text-zinc-400">
                      {delaRegion.length} vendedor{delaRegion.length !== 1 ? 'es' : ''}
                    </span>
                  </div>
                  <div className="divide-y divide-zinc-100">
                    {delaRegion.map((v) => {
                      const inicial = v.nombre.charAt(0).toUpperCase();
                      return (
                        <div key={v.id} className="px-5 py-4 flex items-center justify-between hover:bg-zinc-50/40 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-zinc-950 text-white font-bold text-sm flex items-center justify-center shrink-0 select-none">
                              {inicial}
                            </div>
                            <div>
                              <p className="font-semibold text-zinc-900 text-sm">{v.nombre}</p>
                              <p className="text-xs text-zinc-500 font-medium">{v.email}</p>
                            </div>
                          </div>
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                            v.activo
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-zinc-100 text-zinc-500 border border-zinc-200'
                          }`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${v.activo ? 'bg-emerald-500' : 'bg-zinc-400'}`} />
                            {v.activo ? 'Activo' : 'Inactivo'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </main>
  );
}
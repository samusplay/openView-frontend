import { obtenerProspectos } from '@/app/actions/prospectos.actions';
import { obtenerVendedores } from '@/app/actions/vendedores.actions';
import OrdenesTable from './components/OrdenesTable';

interface Prospecto {
  id: string;
  nombre: string;
  email: string;
}

interface Vendedor {
  id: string;
  nombre: string;
}

export default async function OrdenesCompraPage() {
  const [prospectosRes, vendedoresRes] = await Promise.all([
    obtenerProspectos() as any,
    obtenerVendedores() as any,
  ]);

  const prospectos: Prospecto[] = prospectosRes?.data ?? [];
  const vendedores: Vendedor[]  = vendedoresRes?.data ?? [];

  return (
    <main className="min-h-screen bg-zinc-50/60 text-zinc-900 antialiased py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-7">

        {/* Encabezado */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-200/60 pb-5">
          <div>
            <h1 className="text-2xl font-bold text-zinc-950 tracking-tight">Órdenes y Pagos</h1>
            <p className="text-sm text-zinc-500 mt-1">
              Registra órdenes de compra y procesa pagos para activar licencias.
            </p>
          </div>
        </div>

        {/* Tabla con lógica cliente */}
        <OrdenesTable prospectos={prospectos} vendedores={vendedores} />

      </div>
    </main>
  );
}
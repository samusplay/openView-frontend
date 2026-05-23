import { obtenerEmpresas } from '@/app/actions/empresas.actions';
import Link from 'next/link';

interface Empresa {
  id: string;
  nombre: string;
  industria: string;
}

interface ResponseEmpresas {
  message: string;
  data: Empresa[];
}

export default async function EmpresasPage() {
  const response = await obtenerEmpresas() as ResponseEmpresas;
  const empresas = response.data;

  return (
    <main className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold">Empresas</h1>
          <p className="text-sm text-gray-500 mt-1">
            {empresas.length} empresa{empresas.length !== 1 ? 's' : ''} registrada{empresas.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Link
          href="/empresas/nueva"
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700"
        >
          + Nueva empresa
        </Link>
      </div>

      {empresas.length === 0 ? (
        <p className="text-sm text-gray-400">No hay empresas registradas aún.</p>
      ) : (
        <div className="border rounded overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-4 py-3 font-medium text-gray-600">Nombre</th>
                <th className="px-4 py-3 font-medium text-gray-600">Industria</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {empresas.map((empresa) => (
                <tr key={empresa.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{empresa.nombre}</td>
                  <td className="px-4 py-3 text-gray-500">{empresa.industria}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
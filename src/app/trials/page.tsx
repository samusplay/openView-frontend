import Link from 'next/link';

export default function TrialsPage() {
  return (
    <main className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold">Trials</h1>
          <p className="text-sm text-gray-500 mt-1">
            Gestiona los períodos de prueba de los prospectos.
          </p>
        </div>
        <Link
          href="/trials/nueva"
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700"
        >
          + Iniciar trial
        </Link>
      </div>

      <p className="text-sm text-gray-400">
        Para ver el trial de un prospecto específico, consulta el detalle del prospecto.
      </p>

      <Link
        href="/prospectos"
        className="inline-block mt-4 text-sm text-blue-600 hover:underline"
      >
        → Ver prospectos
      </Link>
    </main>
  );
}
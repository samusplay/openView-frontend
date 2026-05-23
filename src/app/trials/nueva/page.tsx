import { obtenerProspectos } from '@/app/actions/prospectos.actions';
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
    <main className="p-6">
      <div className="mb-6">
        <h1 className="text-xl font-semibold">Iniciar trial</h1>
        <p className="text-sm text-gray-500 mt-1">
          Registra el período de prueba de 60 días para un prospecto.
        </p>
      </div>
      <TrialForm prospectos={prospectos} />
    </main>
  );
}
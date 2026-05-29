import { obtenerEmpresas } from '@/app/actions/empresas.actions';
import ProspectoForm from '../components/ProspectoForm';

interface Empresa {
  id: string;
  nombre: string;
  industria: string;
}

interface ResponseEmpresas {
  message: string;
  data: Empresa[];
}

export default async function NuevoProspectoPage() {
  const response = (await obtenerEmpresas()) as ResponseEmpresas;
  const empresas = response.data;

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
      
      {/* Contenedor tipo Tarjeta consistente con NuevaEmpresaPage */}
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-sm border border-gray-200 p-8 sm:p-10">
        
        {/* Encabezado e Instrucción de Contexto */}
        <div className="mb-8 border-b border-gray-100 pb-6">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Registrar prospecto
          </h1>
          
          {/* Pequeña alerta informativa integrada de forma sutil en la descripción */}
          <p className="text-sm text-gray-500 mt-2 flex items-start gap-2">
            <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              Completa los datos personales. Recuerda que el prospecto debe estar vinculado a una empresa previamente registrada.
            </span>
          </p>
        </div>

        {/* Formulario que inyecta la data de las empresas */}
        <ProspectoForm empresas={empresas} />
        
      </div>
    </main>
  );
}
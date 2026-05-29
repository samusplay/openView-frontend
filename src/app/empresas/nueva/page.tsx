import EmpresaForm from "./components/EmpresaForm";

export default function EmpresaNewView(){
   return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-sm border border-gray-200 p-8 sm:p-10">
        <div className="mb-8 border-b border-gray-100 pb-6">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Registrar empresa
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Completa los datos a continuación para dar de alta una nueva empresa en el sistema.
          </p>
        </div>
        
        <EmpresaForm />
      </div>
    </main>
  );
    
}
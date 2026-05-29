import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-1 w-full max-w-5xl mx-auto py-12 px-6 sm:px-8">

      <div className="mb-12 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-950">
          OpenView Workspace
        </h1>
        <p className="text-zinc-500 font-medium max-w-2xl">
          Panel de control central. Selecciona el módulo al que deseas acceder para gestionar el ciclo de vida de los clientes de Zimbra.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Módulo 1: Captación */}
        <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-zinc-900">1. Captación</h2>
          </div>
          <p className="text-sm text-zinc-500 mb-5">Gestión del directorio base de organizaciones y sus contactos comerciales.</p>
          <div className="space-y-2">
            <Link href="/empresas" className="flex items-center justify-between p-3 rounded-lg bg-zinc-50 hover:bg-zinc-100 text-sm font-semibold text-zinc-700 transition-colors group">
              Directorio de Empresas
              <span className="text-zinc-400 group-hover:text-zinc-900 transition-colors">→</span>
            </Link>
            <Link href="/prospectos" className="flex items-center justify-between p-3 rounded-lg bg-zinc-50 hover:bg-zinc-100 text-sm font-semibold text-zinc-700 transition-colors group">
              Listado de Prospectos
              <span className="text-zinc-400 group-hover:text-zinc-900 transition-colors">→</span>
            </Link>
          </div>
        </div>

        {/* Módulo 2: Rastreo & Trials */}
        <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-purple-50 text-purple-600 rounded-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-zinc-900">2. Rastreo & Trials</h2>
          </div>
          <p className="text-sm text-zinc-500 mb-5">Suscripciones de prueba y simulador de comportamiento en el producto.</p>
          <div className="space-y-2">
            <Link href="/trials" className="flex items-center justify-between p-3 rounded-lg bg-zinc-50 hover:bg-zinc-100 text-sm font-semibold text-zinc-700 transition-colors group">
              Iniciar Trial (Suscripción)
              <span className="text-zinc-400 group-hover:text-zinc-900 transition-colors">→</span>
            </Link>
            <Link href="/eventos" className="flex items-center justify-between p-3 rounded-lg bg-zinc-50 hover:bg-zinc-100 text-sm font-semibold text-zinc-700 transition-colors group">
              Simular Interacción (Tracking)
              <span className="text-zinc-400 group-hover:text-zinc-900 transition-colors">→</span>
            </Link>
          </div>
        </div>

        {/* Módulo 3: Ventas (CRM) */}
        <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-zinc-900">3. Ventas (CRM)</h2>
          </div>
          <p className="text-sm text-zinc-500 mb-5">Gestión de alertas automáticas y equipo comercial de Zimbra.</p>
          <div className="space-y-2">
            <Link href="/dashboard" className="flex items-center justify-between p-3 rounded-lg bg-zinc-50 hover:bg-zinc-100 text-sm font-semibold text-zinc-700 transition-colors group">
              Dashboard de Alertas
              <span className="text-zinc-400 group-hover:text-zinc-900 transition-colors">→</span>
            </Link>
            <Link href="/vendedores" className="flex items-center justify-between p-3 rounded-lg bg-zinc-50 hover:bg-zinc-100 text-sm font-semibold text-zinc-700 transition-colors group">
              Equipo de Vendedores
              <span className="text-zinc-400 group-hover:text-zinc-900 transition-colors">→</span>
            </Link>
          </div>
        </div>

        {/* Módulo 4: Transaccional */}
        <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-amber-50 text-amber-600 rounded-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-zinc-900">4. Transaccional</h2>
          </div>
          <p className="text-sm text-zinc-500 mb-5">Cierre de negocios, registro de pagos y activación de licencias de software.</p>
          <div className="space-y-2">
            <Link href="/ordenes-compra" className="flex items-center justify-between p-3 rounded-lg bg-zinc-50 hover:bg-zinc-100 text-sm font-semibold text-zinc-700 transition-colors group">
              Órdenes y Pagos
              <span className="text-zinc-400 group-hover:text-zinc-900 transition-colors">→</span>
            </Link>
          </div>
        </div>

        {/* Módulo 5: Reportes — full width */}
        <div className="md:col-span-2 bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-rose-50 text-rose-600 rounded-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-zinc-900">5. Reportes</h2>
          </div>
          <p className="text-sm text-zinc-500 mb-5">Visión general del pipeline comercial, conversiones y métricas de rendimiento del equipo.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <Link href="/reportes" className="flex items-center justify-between p-3 rounded-lg bg-zinc-50 hover:bg-zinc-100 text-sm font-semibold text-zinc-700 transition-colors group">
              Funnel de conversión
              <span className="text-zinc-400 group-hover:text-zinc-900 transition-colors">→</span>
            </Link>
            <Link href="/reportes" className="flex items-center justify-between p-3 rounded-lg bg-zinc-50 hover:bg-zinc-100 text-sm font-semibold text-zinc-700 transition-colors group">
              Licencias activas
              <span className="text-zinc-400 group-hover:text-zinc-900 transition-colors">→</span>
            </Link>
            <Link href="/reportes" className="flex items-center justify-between p-3 rounded-lg bg-zinc-50 hover:bg-zinc-100 text-sm font-semibold text-zinc-700 transition-colors group">
              Pipeline comercial
              <span className="text-zinc-400 group-hover:text-zinc-900 transition-colors">→</span>
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
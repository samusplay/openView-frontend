import { obtenerVendedores } from '@/app/actions/vendedores.actions';
import DashboardVendedor from './components/DashboardVendedor';

interface Vendedor {
  id: string;
  nombre: string;
  email: string;
  region: string;
  activo: boolean;
}

export default async function DashboardPage() {
  const res = (await obtenerVendedores()) as { message: string; data: Vendedor[] };
  const vendedores = res.data;

  return <DashboardVendedor vendedores={vendedores} />;
}
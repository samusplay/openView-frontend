import { getAlertas } from '@/lib/api-client';
import { AlertasListSchema } from '@/schemas/alerta-venta.schema';
import AlertasList from './components/AlertasList';
import VerificarButton from './components/VerificarButton';

export const dynamic = 'force-dynamic';
export const revalidate = 30;

export default async function AlertasVentasPage() {
  const raw = await getAlertas();
  const parsed = AlertasListSchema.safeParse(raw);

  if (!parsed.success) {
    return <p>Error al cargar las alertas.</p>;
  }

  const soloVencimiento = parsed.data.filter(
    (a) => a.motivo === 'Trial_Por_Vencer',
  );

  return (
    <main>
      <h1>Alertas por vencimiento de trial</h1>
      <p>Prospectos con score mayor a 50 pts y trial que vence en 5 días o menos.</p>
      <VerificarButton />
      <AlertasList alertas={soloVencimiento} />
    </main>
  );
}

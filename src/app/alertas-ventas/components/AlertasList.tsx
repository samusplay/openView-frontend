import { AlertaVenta } from '@/schemas/alerta-venta.schema';
import AlertaCard from './AlertaCard';

interface Props {
  alertas: AlertaVenta[];
}

export default function AlertasList({ alertas }: Props) {
  if (alertas.length === 0) {
    return <p>No hay alertas de vencimiento por el momento.</p>;
  }

  return (
    <div>
      {alertas.map((alerta) => (
        <AlertaCard key={alerta.id} alerta={alerta} />
      ))}
    </div>
  );
}

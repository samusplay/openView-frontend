'use client';

import { useState, useTransition } from 'react';
import { verificarVencimientosAction } from '../actions';

export default function VerificarButton() {
  const [isPending, startTransition] = useTransition();
  const [resultado, setResultado] = useState<string | null>(null);

  function handleClick() {
    setResultado(null);
    startTransition(async () => {
      const result = await verificarVencimientosAction();
      if (result.data) {
        setResultado(
          result.data.alertas_creadas > 0
            ? `Se generaron ${result.data.alertas_creadas} alerta(s) nueva(s).`
            : 'No hay nuevos trials por vencer con score calificado.',
        );
      }
      if (result.error) {
        setResultado(result.error);
      }
    });
  }

  return (
    <div>
      <button onClick={handleClick} disabled={isPending}>
        {isPending ? 'Verificando...' : 'Verificar vencimientos'}
      </button>
      {resultado && <p>{resultado}</p>}
    </div>
  );
}

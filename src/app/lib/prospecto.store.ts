import { create } from 'zustand';

interface Prospecto {
  id: string;
  nombre: string;
  email: string;
}

interface ProspectoStore {
  prospectoSeleccionado: Prospecto | null;
  setProspectoSeleccionado: (prospecto: Prospecto) => void;
  limpiarProspecto: () => void;
}

export const useProspectoStore = create<ProspectoStore>((set) => ({
  prospectoSeleccionado: null,
  setProspectoSeleccionado: (prospecto) =>
    set({ prospectoSeleccionado: prospecto }),
  limpiarProspecto: () => set({ prospectoSeleccionado: null }),
}));
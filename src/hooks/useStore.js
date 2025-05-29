import { create } from 'zustand'

export const useUpdateKeyStore = create((set) => ({
  updateKey: 0,
  incrementUpdateKey: () =>
    set((state) => ({ updateKey: state.updateKey + 1 })),
}))

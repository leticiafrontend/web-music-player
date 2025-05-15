import { create } from 'zustand'

// Define the store state interface
interface BearState {
  bears: number
  increasePopulation: () => void
  removeAllBears: () => void
  updateBears: (newBears: number) => void
}

// Create the store with proper type annotations
export const useStore = create<BearState>((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears: number) => set({ bears: newBears }),
}))

import { create } from 'zustand'

interface BoardState {
    selectedCrewId: string
    setSelectedCrewId: (id: string) => void
}

export const useBoardStore = create<BoardState>((set) => ({
    selectedCrewId: '1',
    setSelectedCrewId: (crewId) => set({ selectedCrewId: crewId || '1' }),
}))

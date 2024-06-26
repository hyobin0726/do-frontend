import { create } from 'zustand'

interface CrewState {
    clicked: string
    setClicked: (id: string) => void
}

export const useCrewStore = create<CrewState>((set) => ({
    clicked: '1',
    setClicked: (crewId) => set({ clicked: crewId || '1' }),
}))

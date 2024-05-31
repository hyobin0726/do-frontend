import { create } from 'zustand'

interface RegionState {
    region1: {
        addressName: string
        legalCode: string
        latitude: number
        longitude: number
        currentSelectedRange: number
    }
    region2: {
        addressName: string
        legalCode: string
        latitude: number
        longitude: number
        currentSelectedRange: number
    }
    region3: {
        addressName: string
        legalCode: string
        latitude: number
        longitude: number
        currentSelectedRange: number
    }
    setRegion1: (region1: {
        addressName: string
        legalCode: string
        latitude: number
        longitude: number
        currentSelectedRange: number
    }) => void
    setRegion2: (region2: {
        addressName: string
        legalCode: string
        latitude: number
        longitude: number
        currentSelectedRange: number
    }) => void
    setRegion3: (region3: {
        addressName: string
        legalCode: string
        latitude: number
        longitude: number
        currentSelectedRange: number
    }) => void
}

export const useRegionStore = create<RegionState>((set) => ({
    region1: {
        addressName: '',
        legalCode: '',
        latitude: 0,
        longitude: 0,
        currentSelectedRange: 0,
    },
    region2: {
        addressName: '',
        legalCode: '',
        latitude: 0,
        longitude: 0,
        currentSelectedRange: 0,
    },
    region3: {
        addressName: '',
        legalCode: '',
        latitude: 0,
        longitude: 0,
        currentSelectedRange: 0,
    },
    setRegion1: (region1) => set({ region1 }),
    setRegion2: (region2) => set({ region2 }),
    setRegion3: (region3) => set({ region3 }),
}))

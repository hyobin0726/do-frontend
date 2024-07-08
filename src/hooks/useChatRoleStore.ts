import { create } from 'zustand'

interface ChatRoomState {
    userRole: number | null
    setUserRole: (role: number | null) => void
}

export const useChatRoomStore = create<ChatRoomState>((set) => ({
    userRole: null,
    setUserRole: (role: number | null) => set({ userRole: role }),
}))

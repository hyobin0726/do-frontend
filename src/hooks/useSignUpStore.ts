import { create } from 'zustand'

interface SignUpState {
    name: string
    id: string
    password: string
    confirmPassword: string
    phoneNumber: string
    email: string
    gender: string
    birthDate: string
    externalId: string
    setName: (name: string) => void
    setId: (id: string) => void
    setPassword: (password: string) => void
    setConfirmPassword: (confirmPassword: string) => void
    setPhoneNumber: (phoneNumber: string) => void
    setEmail: (email: string) => void
    setGender: (gender: string) => void
    setBirthDate: (birthDate: string) => void
    setExternalId: (externalId: string) => void
}

export const useSignUpStore = create<SignUpState>((set) => ({
    name: '',
    id: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    email: '',
    gender: '',
    birthDate: '',
    externalId: '',
    setName: (name) => set({ name }),
    setId: (id) => set({ id }),
    setPassword: (password) => set({ password }),
    setConfirmPassword: (confirmPassword) => set({ confirmPassword }),
    setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
    setEmail: (email) => set({ email }),
    setGender: (gender) => set({ gender }),
    setBirthDate: (birthDate) => set({ birthDate }),
    setExternalId: (externalId) => set({ externalId }),
}))

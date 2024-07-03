'use client'
import CrewCreateForm from '@/components/pages/crew/CrewCreateForm'
import CrewCreateSelect from '@/components/pages/crew/CrewCreateSelect'
import CrewImageUpload from '@/components/pages/crew/CrewImageUpload'
import CrewCreateButton from '@/components/pages/crew/CrewCreateButton'
import { createCrewFormAction } from '@/actions/createCrew'
import { useRef, useState } from 'react'
import { CreateCrewSchema } from '@/schemas/CreateCrewSchema'
import { useRouter } from 'next/navigation'

export interface zodError {
    crewName: string
    introduction: string
}

export default function CreateCrew() {
    const formRef = useRef<HTMLFormElement>(null)
    const router = useRouter()
    const [zodError, setZodError] = useState<zodError>({
        crewName: '',
        introduction: '',
    })
    const [introductionLength, setIntroductionLength] = useState<number>(0)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!formRef.current) return
        const checkZod = CreateCrewSchema.safeParse(Object.fromEntries(new FormData(formRef.current).entries()))
        if (checkZod && checkZod.success === false) {
            console.log(checkZod.error.errors)
            setZodError({
                crewName: checkZod.error.errors.find((error) => error.path[0] === 'crewName')?.message || '',
                introduction: checkZod.error.errors.find((error) => error.path[0] === 'introduction')?.message || '',
            })
            return
        }
        const payloadFormData = new FormData(formRef.current)
        const res = await createCrewFormAction(payloadFormData)
        if (res.isSuccess) {
            router.push('/crew')
        }
    }

    const handleChanger = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!formRef.current) return
        setIntroductionLength(formRef.current.introduction.value.length)
        const checkZod = CreateCrewSchema.safeParse(Object.fromEntries(new FormData(formRef.current).entries()))
        if (checkZod && checkZod.success === false) {
            console.log(checkZod.error.errors)
            setZodError({
                crewName: checkZod.error.errors.find((error) => error.path[0] === 'crewName')?.message || '',
                introduction: checkZod.error.errors.find((error) => error.path[0] === 'introduction')?.message || '',
            })
            return
        }
    }

    return (
        <form
            ref={formRef}
            className="flex flex-col items-center space-y-5 p-5"
            onSubmit={handleSubmit}
            onChange={handleChanger}
        >
            <CrewImageUpload />
            <CrewCreateSelect />
            <CrewCreateForm zodError={zodError} introLength={introductionLength} />
            <CrewCreateButton />
        </form>
    )
}

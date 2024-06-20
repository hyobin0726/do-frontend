'use client'
import CrewCreateForm from '@/components/pages/crew/CrewCreateForm'
import CrewCreateSelect from '@/components/pages/crew/CrewCreateSelect'
import CrewImageUpload from '@/components/pages/crew/CrewImageUpload'
import CrewCreateButton from '@/components/pages/crew/CrewCreateButton'
import { useState } from 'react'

export default function CreateCrew() {
    return (
        <section className="flex flex-col items-center space-y-5 p-5">
            <CrewImageUpload />
            <CrewCreateSelect />
            <CrewCreateForm />
            <CrewCreateButton />
        </section>
    )
}

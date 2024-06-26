import { handleCreateCrew } from '@/api/crew/createCrew'
import CreateCrew from '@/components/pages/crew/CrewCreate'
import { redirect } from 'next/navigation'

function CrewCreate() {
    async function handleSubmit(formData: FormData) {
        'use server'
        const hashTagList = formData.get('hashTagList') as string | null
        const rowFormData = {
            profileUrl: formData.get('profileUrl') || null,
            regionId: parseInt(formData.get('regionId') as string),
            hobbyId: parseInt(formData.get('hobbyId') as string),
            name: formData.get('crewName'),
            introduction: formData.get('introduction'),
            hashTagList: hashTagList ? hashTagList.split(',') : [],
            joinType: parseInt(formData.get('joinType') as string),
        }
        await handleCreateCrew(rowFormData)
        redirect('/crew')
    }

    return (
        <form action={handleSubmit}>
            <CreateCrew />
        </form>
    )
}
export default CrewCreate

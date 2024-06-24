import { CrewInfoType } from '@/type/CrewType'
import CrewUpdateForm from './CrewUpdateForm'
import CrewImageUpdateForm from './CrewImage'
import CrewCreateButton from './CrewCreateButton'
import { PutCrew } from '@/api/crew/putCrew'
import { redirect } from 'next/navigation'

export default function CrewUpdatePage({ data, crewId }: { data: CrewInfoType; crewId: string }) {
    async function handleCrewSubmit(formData: FormData) {
        'use server'
        const hashTagList = formData.get('hashTagList') as string | null
        const rowFormData = {
            profileUrl: formData.get('profileUrl') || null,
            introduction: formData.get('introduction'),
            hashTagList: hashTagList ? hashTagList.split(',') : [],
            joinType: parseInt(formData.get('joinType') as string),
        }
        await PutCrew(rowFormData, crewId)
        redirect(`/crewsetting/${crewId}`)
    }

    return (
        <form action={handleCrewSubmit} className="max-w-lg mx-auto bg-white p-5 space-y-5">
            <div className="text-center">
                <h1 className="text-xl font-medium  border-b-[1px] border-hobbing-pink pb-2">{data.name}</h1>
            </div>
            <div className="flex justify-center">
                <CrewImageUpdateForm initialImageUrl={data.profileUrl} />
            </div>
            <CrewUpdateForm data={data} />
            <CrewCreateButton />
        </form>
    )
}

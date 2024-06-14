import CrewCreateForm from '@/components/pages/crew/CrewCreateForm'
import CrewCreateSelect from '@/components/pages/crew/CrewCreateSelect'
import CrewImageUpload from '@/components/pages/crew/CrewImageUpload'

function CrewCreate() {
    return (
        <div className="flex flex-col items-center space-y-4 p-4">
            <CrewImageUpload />
            <CrewCreateSelect />
            <CrewCreateForm />
        </div>
    )
}
export default CrewCreate

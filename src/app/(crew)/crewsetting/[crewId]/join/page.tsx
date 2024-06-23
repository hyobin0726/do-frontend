export default function CrewMemberList({ params }: { params: { crewId: string } }) {
    const { crewId } = params
    console.log(crewId, '???')
    return (
        <div>
            <h1>크루원 목록</h1>
        </div>
    )
}

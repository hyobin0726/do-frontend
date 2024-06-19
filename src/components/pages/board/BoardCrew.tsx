import { CrewType } from '@/type/CrewType'

export default function BoardCrew({
    profile,
    isClicked,
    onClick,
}: {
    profile: CrewType
    isClicked: boolean
    onClick?: () => void
}) {
    // console.log(isClicked, 'isClicked')
    return (
        <>
            <li className="flex flex-col items-center " onClick={onClick}>
                <div
                    className={`w-16 h-16 rounded-full border-[2.5px] p-[2.5px] bg-hobbing-light-pink ${isClicked ? 'border-hobbing-red' : ' '}`}
                >
                    <img
                        src={profile.profileUrl}
                        alt={profile.name}
                        className="rounded-full w-full h-full object-cover"
                    />
                </div>
                <span className="text-xs mt-2 text-gray-800">{profile.name}</span>
            </li>
        </>
    )
}

import RightArrow from '@/components/images/RightArrow'

export default function CrewCreateButton() {
    return (
        <button
            type="submit"
            className="bg-hobbing-red h-[60px] w-full rounded-xl flex flex-row justify-between items-center px-8 text-[15px] font-bold text-white"
        >
            <span>소모임 생성</span>
            <RightArrow width={15} height={15} />
        </button>
    )
}

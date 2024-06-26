'use client'
import deleteMyJoinForms from '@/api/crew/deleteMyJoinForms'

export default function MyJoinFormDelete({ joinFormId }: { joinFormId: string }) {
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await deleteMyJoinForms({ joinFormId })
    }
    return (
        <form className="w-full h-[30px]" onSubmit={handleSubmit}>
            <button type="submit" className="w-full h-full bg-hobbing-red rounded-xl">
                <p className="text-[13px] sm:text-[11px] md:text-[15px] text-white">취소</p>
            </button>
        </form>
    )
}

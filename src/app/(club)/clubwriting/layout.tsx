import ClubWritingBottom from '@/components/pages/club/ClubWritingBottom'

export default function ClubWritingLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <header className="border-b-2 py-4 bg-red-200 relative">
                <div className="container mx-auto px-4 flex items-center">
                    <div className="absolute left-1/2 transform -translate-x-1/2">
                        <h1 className="font-bold">소모임 이름</h1>
                    </div>
                    <div className="ml-auto">
                        <button className="bg-red-300  py-2 px-4 rounded ">발행</button>
                    </div>
                </div>
                <div className="flex items-center justify-start px-4">
                    <input type="checkbox" className="mr-2" />
                    <div>공지</div>
                </div>
            </header>
            {children}
            <ClubWritingBottom />
        </>
    )
}

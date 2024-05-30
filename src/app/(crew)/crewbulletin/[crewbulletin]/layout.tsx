import ClubBulletinBottom from '@/components/pages/club/ClubBulletinBottom'

export default function ClubBulletinLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <header className="border-b-2 py-4 bg-red-200 relative">
                <div className="container mx-auto px-4 flex items-center">
                    <div className="absolute left-1/2 transform -translate-x-1/2">
                        <h1 className="font-bold">소모임 이름</h1>
                    </div>
                    <img
                        width="25"
                        height="25"
                        src="https://img.icons8.com/ios-glyphs/30/more.png"
                        alt="수정삭제하기"
                        className="absolute right-2 bg-red-300"
                    />
                </div>
            </header>
            {children}
            <ClubBulletinBottom />
        </>
    )
}

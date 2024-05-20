import ClubBulletinBottom from '@/components/pages/club/ClubBulletinBottom'

export default function ClubWritingLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className=" flex justify-center">소모임</div>
            {children}
            <ClubBulletinBottom />
        </>
    )
}

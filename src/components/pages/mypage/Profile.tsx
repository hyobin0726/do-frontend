import getMyProfile from '@/api/auth/getMyProfile'
import Edit from '@/components/images/Edit'
import Image from 'next/image'
import Link from 'next/link'

export default async function Profile() {
    const profileData = await getMyProfile()

    return (
        <>
            <section className="relative w-full h-auto bg-white rounded-2xl drop-shadow py-5 flex items-center flex-col">
                <Link
                    href={'/mypage/edit'}
                    scroll={false}
                    className="absolute top-0 right-2 w-[50px] h-[50px] flex justify-center items-center"
                >
                    <Edit />
                </Link>
                <div className="w-full h-full flex flex-col items-center space-y-2">
                    <div className="w-[100px] h-[100px]">
                        <Image
                            src={profileData.profileImageUrl}
                            alt="profile image"
                            width={100}
                            height={100}
                            className="rounded-full"
                            style={{
                                width: '100px',
                                height: '100px',
                            }}
                            priority={true}
                        />
                    </div>
                    <div className="w-full h-full">
                        <p className="font-bold text-[20px] text-center">{profileData.name}</p>
                    </div>
                    {profileData.profileMessage && (
                        <div className="w-[80%] h-full">
                            <p className="font-medium text-[13px] text-center text-text-gray">
                                {profileData.profileMessage}
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}

import Edit from '@/components/images/Edit'
import Image from 'next/image'
import Link from 'next/link'

export default function Profile() {
    const profileData = {
        profileImage:
            'https://hobbiedo-bucket.s3.ap-northeast-2.amazonaws.com/image_1718266148717_Frame%201000004039.png',
        name: '김하빙',
        // message: '',
        // message: '여기상메와야함',
        message: '안녕하세요 반가워요 잘있어요 다시만나요 아침해가 뜨면 아침해가 뜨면 - 아따맘마OST',
        // message = 공백포함 50자임
    }

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
                            src={profileData.profileImage}
                            alt="profile image"
                            width={100}
                            height={100}
                            className="rounded-full"
                            style={{
                                width: '100px',
                                height: '100px',
                            }}
                        />
                    </div>
                    <div className="w-full h-full">
                        <p className="font-bold text-[20px] text-center">{profileData.name}</p>
                    </div>
                    {profileData.message && (
                        <div className="w-[80%] h-full">
                            <p className="font-medium text-[13px] text-center text-text-gray">{profileData.message}</p>
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}

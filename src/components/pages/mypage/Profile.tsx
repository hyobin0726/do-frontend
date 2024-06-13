import DefaultProfileImage from '@/components/images/DefaultProfileImage'
import Edit from '@/components/images/Edit'
import Image from 'next/image'

export default function Profile() {
    const profileData = {
        // profileImage: 'https://despbukkit.s3.ap-northeast-2.amazonaws.com/RPGCLASS_BELPHEGOR.png',
        profileImage: '',
        name: '김하빙',
        message: '',
        // message: '여기상메와야함',
        // message: '안녕하세요 반가워요 잘있어요 다시만나요 아침해가 뜨면 아침해가 뜨면 - 아따맘마OST',
        // message = 공백포함 50자임
    }

    return (
        <>
            <div className="w-full h-auto bg-white rounded-2xl drop-shadow p-3 flex items-center flex-col">
                <div className="w-full h-[24px] flex justify-end items-end pr-3">
                    <Edit />
                </div>
                <div className="w-full h-full flex flex-col items-center space-y-2">
                    <div className="w-[100px] h-[100px]">
                        {/* 프로필 이미지 확인해서 있는경우 없는경우 분기처리하기 */}
                        {profileData.profileImage ? (
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
                        ) : (
                            <DefaultProfileImage />
                        )}
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
            </div>
        </>
    )
}

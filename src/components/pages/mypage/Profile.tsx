import DefaultProfileImage from '@/components/images/DefaultProfileImage'
import Edit from '@/components/images/Edit'

export default function Profile() {
    return (
        <>
            <div className="w-full h-[200px] bg-white mt-5 rounded-2xl drop-shadow p-2 flex items-center justify-center flex-col">
                <div className="w-full h-[30px] bg-green-200 flex justify-end items-end">
                    {/* <Edit /> */}
                    머고이게
                    <Edit />
                </div>
                <div className="w-1/3 h-auto border-4 border-hobbing-red rounded-full">
                    {/* 프로필 이미지 확인해서 있는경우 없는경우 분기처리하기 */}
                    <DefaultProfileImage />
                </div>
                <div>프로필 구간</div>
            </div>
        </>
    )
}

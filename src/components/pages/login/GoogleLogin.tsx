import GoogleLogo from '@/components/images/GoogleLogo'
import RightArrow from '@/components/images/RightArrow'

export default function GoogleLogin() {
    return (
        <>
            <div className="bg-white h-[60px] w-full rounded-xl border-[1px] border-gray-100  flex flex-row justify-between items-center px-5">
                <div className="flex flex-row space-x-2">
                    <GoogleLogo />
                    <p className="font-Pretendard text-[#757575] text-[15px] font-bold">구글 로그인</p>
                </div>
                <RightArrow width={15} height={15} color={'#757575'} />
            </div>
        </>
    )
}

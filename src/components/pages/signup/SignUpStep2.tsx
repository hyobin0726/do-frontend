import BasicNextButton from '@/components/common/BasicNextButton'
import ProgressBar from '@/components/common/ProgressBar'
import ButterMonster from '@/components/images/monsters/ButterMonster'

export default function SignUpStep2() {
    return (
        <div className="w-full " style={{ height: 'calc(100vh - 60px)' }}>
            <div className="w-full h-1/4 flex flex-col justify-end pb-10 px-10 relative overflow-x-clip ">
                <div className="w-1/2 h-5/6  absolute -top-10 -right-20 ">
                    <ButterMonster />
                </div>
                <p className=" font-Pretendard text-[30px] font-extrabold">SIGNUP</p>
                <p className=" font-Pretendard text-[15px] text-[#646464]">나의 취미를 찾기 위한 여행을 시작합니다.</p>
            </div>
            <div className="w-full h-2/4 px-10 bg-blue-200">input 내용물 들어와야함</div>
            <div className="w-full h-1/4 px-10 bg-blue-300 flex flex-col justify-around">
                <BasicNextButton path="/signup?step=3" text="NEXT" />
                <ProgressBar step={2} total={3} />
            </div>
        </div>
    )
}

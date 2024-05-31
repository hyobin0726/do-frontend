'use client'

// import { useSignUpStore } from '@/hooks/useSignUpStore'
// import { useRegionStore } from '@/hooks/useRegionStore'

import RightArrow from '@/components/images/RightArrow'
import ProgressBar from '@/components/common/ProgressBar'
// import Input from '@/components/common/Input'

export default function SignUpRegionRegistration() {
    // const { name, id, password, confirmPassword, phoneNumber, email, gender, birthDate } = useSignUpStore()
    // const { region1, regoin2, region3, setRegion1, setRegion2, setRegion3 } = useRegionStore()

    // console.log('name:', name)
    // console.log('id:', id)
    // console.log('password:', password)
    // console.log('confirmPassword:', confirmPassword)
    // console.log('phoneNumber:', phoneNumber)
    // console.log('email:', email)
    // console.log('gender:', gender)
    // console.log('birthDate:', birthDate)

    return (
        <div className="w-full" style={{ height: 'calc(100svh - 60px)' }}>
            <div className="w-full h-[20%] flex flex-col justify-end pb-5 px-10 bg-blue-200">
                <p className=" font-Pretendard text-[28px] sm:text-[25px] md:text-[30px] font-extrabold">
                    활동하려는 지역을
                    <br />
                    추가해보세요!
                </p>
                <p className=" font-Pretendard text-[13px] sm:text-[12px] md:text-[15px] text-[#646464]">
                    내 활동 지역은 최대 3개까지 등록할 수 있어요!
                </p>
            </div>
            {/* <div className="w-full h-[55%] bg-green-100 px-10">
                <Input
                    id="region1"
                    name="region1"
                    type="text"
                    placeholder="활동지역을 입력해주세요"
                    // value={}
                    onChange={(e) => console.log(e)}
                    onFocus={() => console.log('focus')}
                />
            </div> */}
            <div className="w-full h-[25%] px-10 flex flex-col justify-around items-center">
                <form
                    // onSubmit={handleSubmit(onSubmit)}
                    className="space-y-3 w-full h-auto"
                >
                    <button
                        type="submit"
                        className="bg-hobbing-red h-[60px] w-full rounded-xl flex flex-row justify-between items-center px-8"
                    >
                        <p className="font-Pretendard text-white text-[15px] font-bold">NEXT</p>
                        <RightArrow width={15} height={15} />
                    </button>
                </form>
                <div className="w-5/6 h-auto">
                    <ProgressBar step={3} total={5} />
                </div>
            </div>
        </div>
    )
}

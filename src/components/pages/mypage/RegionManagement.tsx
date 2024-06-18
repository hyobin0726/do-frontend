import RightArrow from '@/components/images/RightArrow'
import RegionDelete from '../region/RegionDelete'
import RegionModify from '../region/RegionModify'
import RegionAdd from '../region/RegionAdd'
import Link from 'next/link'

import Location from '@/components/images/Location'

interface RegionManagementProps {
    data: regionData[]
}

interface regionData {
    regionId: number
    addressName: string
}

export default function RegionManagement({ data }: RegionManagementProps) {
    return (
        <main className="w-full" style={{ height: 'calc(100svh - 60px)' }}>
            <section className="w-full h-[30%] flex flex-col justify-end pb-5 px-10 space-y-3">
                <p className=" font-Pretendard text-[28px] sm:text-[25px] md:text-[30px] font-extrabold">
                    활동 지역을
                    <br />
                    추가해보세요!
                </p>
                <p className=" font-Pretendard text-[13px] sm:text-[12px] md:text-[15px] text-[#646464]">
                    내 활동 지역은 최대 3개까지 등록할 수 있습니다.
                    <br />
                    기본 활동지역은 삭제 또는 수정이 불가능합니다.
                    <br />
                    변경 후 다시 이용해주세요.
                </p>
            </section>
            <section className="w-full h-[40%] px-10 flex flex-col items-center">
                {data.map((region) => (
                    <div key={region.regionId} className=" w-full flex flex-row items-center space-x-3 my-3">
                        <div className="w-3/5 h-[40px] bg-white flex flex-row items-center border-b-[1px] border-hobbing-red">
                            <div className="flex flex-row items-center px-3">
                                <Location />
                            </div>
                            {region.addressName}
                        </div>
                        <RegionModify />
                        <RegionDelete regionId={region.regionId} />
                    </div>
                ))}
                {data.length < 3 && <RegionAdd />}
            </section>
            <section className="w-full h-[25%] px-10 flex flex-col justify-center items-center">
                <Link
                    href={'/mypage'}
                    className="bg-hobbing-red h-[60px] w-full rounded-xl flex flex-row justify-between items-center px-8"
                >
                    <p className="font-Pretendard text-white text-[15px] font-bold">확인</p>
                    <RightArrow width={15} height={15} />
                </Link>
            </section>
        </main>
    )
}

import Link from 'next/link'

import MainHeader from '@/components/layouts/MainHeader'
import MainNavigation from '@/components/layouts/MainNavigation'
import RightArrow from '@/components/images/RightArrow'
import Profile from '@/components/pages/mypage/Profile'

import { MypageData } from '@/lib/MypageData'

export default function MypagePage() {
    return (
        <>
            <MainHeader title="마이페이지" />
            <div className="w-full h-[calc(100dvh-120px)] bg-hobbing-bg-gray p-5 overflow-y-scroll space-y-3 scrollbar-hide">
                <Profile />
                {MypageData.map((category, index) => (
                    <div key={index} className="bg-white rounded-2xl drop-shadow py-3 px-4 flex flex-col space-y-2">
                        <div className="w-full border-b-[1px] border-hobbing-gray p-1">
                            <p className="font-bold text-[18px]">{category.category}</p>
                        </div>
                        {category.data.map((data, index) => (
                            <div key={index} className="flex flex-row justify-between items-center px-1 py-2">
                                {data.path ? (
                                    <Link
                                        key={index}
                                        href={data.path}
                                        scroll={false}
                                        className="w-full h-full flex flex-row justify-between items-center"
                                    >
                                        <p className="text-[15px]">{data.name}</p>
                                        <RightArrow width={12} height={12} color="#FF8595" />
                                    </Link>
                                ) : (
                                    // 로그아웃 기능 추가
                                    <>
                                        <p className="text-[15px]">{data.name}</p>
                                        <RightArrow width={12} height={12} color="#FF8595" />
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <MainNavigation />
        </>
    )
}

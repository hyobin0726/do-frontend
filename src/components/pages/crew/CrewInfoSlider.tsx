'use client'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'

import Link from 'next/link'
import RightArrow from '@/components/images/RightArrow'
import Crewinfo from '@/components/pages/crew/CrewInfo'

interface suggestionCrewId {
    crewId: number
    crewName: string
    addressName: string
    introduction: string
    currentParticipant: number
    joinType: number
    profileUrl: string
    hashTagList: string[]
}

export default function CrewInfoSlider({
    suggestionCrewIdList,
    token,
}: {
    suggestionCrewIdList: suggestionCrewId[]
    token: string | undefined
}) {
    return (
        <>
            <section className="w-full h-[55px]">
                <Link
                    href={'/crewcreate'}
                    passHref
                    scroll={false}
                    className="w-full h-full bg-hobbing-red flex justify-between items-center px-5"
                >
                    <p className="text-white text-[11px]">
                        원하시는 소모임이 없으신가요?
                        <br />내 취미에 맞는 소모임을 직접 만들어보세요!
                    </p>
                    <RightArrow />
                </Link>
            </section>
            <section className="w-full h-[calc(100%-110px)] bg-hobbing-bg-pink bg-gradient-to-t from-black/50 to-40%">
                <Swiper
                    direction={'vertical'}
                    slidesPerView={1}
                    loop={suggestionCrewIdList?.length > 1 ? true : false}
                    pagination={true}
                    modules={[Pagination]}
                    className="w-full h-full "
                >
                    {suggestionCrewIdList?.map((crew, index) => (
                        <SwiperSlide key={index}>
                            <Crewinfo crewInfo={crew} token={token} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>
        </>
    )
}

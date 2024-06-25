'use client'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

import { Pagination } from 'swiper/modules'

interface HobbyCardType {
    hobbyId: number
    hobbyName: string
    description: string
    imageUrl: string
    fitRate: number
}

export default function HomeUserHobbySwiper({ hobbyCardsData }: { hobbyCardsData: HobbyCardType[] }) {
    const tempImageUrl = 'https://hobbiedo-bucket.s3.ap-northeast-2.amazonaws.com/image_1718327243910_crew.png'

    return (
        <div className="w-full h-[calc(100%-150px)] py-5">
            <Swiper
                slidesPerView={'auto'}
                centeredSlides={true}
                spaceBetween={20}
                pagination={{
                    clickable: true,
                }}
                loop={true}
                className="w-full h-full"
            >
                {hobbyCardsData.map((hobbyCard: HobbyCardType, idx: number) => (
                    <SwiperSlide
                        key={idx}
                        className="flex-none bg-center bg-cover bg-no-repeat relative rounded-xl overflow-hidden"
                        style={{
                            width: '70%',
                            backgroundImage: hobbyCard.imageUrl.startsWith('https://hobbiedo-bucket')
                                ? `url(${hobbyCard.imageUrl})`
                                : `url(${tempImageUrl})`,
                            // backgroundImage: `url(${hobbyCard.imageUrl})`,
                        }}
                    >
                        <div className="absolute top-0 w-full h-full bg-black opacity-30"></div>
                        <div className="absolute top-0 w-full h-full flex flex-col justify-between items-end px-6 pb-5 pt-1">
                            <p className="w-full h-auto font-black text-[50px] text-white">{idx + 1}</p>
                            <div className="w-full h-auto flex flex-col justify-end">
                                <p className="font-black text-[30px] text-white">{hobbyCard.hobbyName}</p>
                                <p className="w-fit h-auto text-[13px] px-3 py-2 flex justify-center items-center text-white bg-hobbing-red rounded-xl">
                                    적합도 {hobbyCard.fitRate}%
                                </p>
                                <p className="w-full h-[14px] text-[12px] text-white text-ellipsis overflow-hidden mt-2">
                                    {hobbyCard.description}
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

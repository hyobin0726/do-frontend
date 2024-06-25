'use client'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'

interface HobbyCardType {
    hobbyId: number
    hobbyName: string
    description: string
    imageUrl: string
    fitRate: number
}

export default function SurveyResult({ hobbyCardsData }: { hobbyCardsData: HobbyCardType[] }) {
    const tempImageUrl = 'https://hobbiedo-bucket.s3.ap-northeast-2.amazonaws.com/image_1718327243910_crew.png'

    return (
        <Swiper
            direction={'vertical'}
            slidesPerView={1}
            loop={true}
            pagination={true}
            modules={[Pagination]}
            className="w-full h-full "
        >
            {hobbyCardsData.map((hobbyCard: HobbyCardType, idx: number) => (
                <SwiperSlide key={hobbyCard.hobbyId}>
                    <div
                        className="w-full h-full bg-center bg-cover bg-no-repeat relative flex justify-between items-center"
                        style={{
                            backgroundImage: hobbyCard.imageUrl.startsWith('https://hobbiedo-bucket')
                                ? `url(${hobbyCard.imageUrl})`
                                : `url(${tempImageUrl})`,
                            // backgroundImage: `url(${hobbyCard.imageUrl})`,
                        }}
                    >
                        <div className="absolute top-0 w-full h-full bg-black opacity-30"></div>
                        <div className="absolute top-0 w-full h-full flex flex-col justify-between items-end py-10 px-8">
                            <p className="w-full h-auto font-black text-[70px] text-white">{idx + 1}</p>
                            <div className="w-full h-auto flex flex-col justify-end space-y-3">
                                <p className="font-black text-[50px] text-white">{hobbyCard.hobbyName}</p>
                                <p className="w-[120px] h-[40px] text-[18px] px-3 flex justify-center items-center font-medium text-white bg-hobbing-red rounded-xl">
                                    적합도 {hobbyCard.fitRate}%
                                </p>
                                <p className="w-full h-[50px] text-[18px] text-white text-ellipsis overflow-hidden">
                                    {hobbyCard.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

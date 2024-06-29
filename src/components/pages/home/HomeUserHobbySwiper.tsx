'use client'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'
import { Autoplay } from 'swiper/modules'
import { HobbyCardType } from '@/type/DataType'

export default function HomeUserHobbySwiper({ hobbyCardsData }: { hobbyCardsData: HobbyCardType[] }) {
    const tempImageUrl = 'https://hobbiedo-bucket.s3.ap-northeast-2.amazonaws.com/image_1718327243910_crew.png'

    return (
        <div className="w-full h-[55vh] py-5">
            <Swiper
                modules={[Autoplay]}
                slidesPerView={1.3}
                centeredSlides={true}
                autoplay={{
                    delay: 1500,
                    disableOnInteraction: false,
                }}
                spaceBetween={25}
                pagination={{
                    clickable: true,
                }}
                loop={true}
                className="w-auto h-full"
            >
                {hobbyCardsData &&
                    hobbyCardsData.map((hobbyCard: HobbyCardType, idx: number) => (
                        <SwiperSlide
                            key={idx}
                            className="flex-none bg-center bg-cover bg-no-repeat relative rounded-2xl"
                            style={{
                                backgroundImage: hobbyCard.imageUrl.startsWith('https://hobbiedo-bucket')
                                    ? `url(${hobbyCard.imageUrl})`
                                    : `url(${tempImageUrl})`,
                                // backgroundImage: `url(${hobbyCard.imageUrl})`,
                            }}
                        >
                            <div className="absolute top-0 w-full h-full bg-black opacity-30 rounded-2xl"></div>
                            <div className="absolute top-0 w-full h-full flex flex-col justify-between items-end px-6 pb-5 pt-1">
                                <p className="w-full h-auto font-black text-[50px] text-white">{idx + 1}</p>
                                <div className="w-full h-auto flex flex-col justify-end">
                                    <p className="font-black text-[30px] text-white">{hobbyCard.hobbyName}</p>
                                    <p className="w-fit h-auto text-[13px] px-3 py-2 flex justify-center items-center text-white bg-hobbing-red rounded-xl">
                                        적합도 {hobbyCard.fitRate}%
                                    </p>
                                    <p className="w-full h-[40px] text-[12px] text-white mt-2">
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

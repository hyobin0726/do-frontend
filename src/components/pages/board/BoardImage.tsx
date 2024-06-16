'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

export default function BoardImage({ imageUrls }: { imageUrls: string[] }) {
    return (
        <div>
            <Swiper pagination={{ clickable: true }} modules={[Pagination]} className="w-full max-w-lg">
                {imageUrls?.map((img, index) => (
                    <SwiperSlide key={index}>
                        <img
                            className="h-[50svh] w-[50svh] max-w-full object-cover"
                            src={img}
                            alt={`이미지${index + 1}`}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

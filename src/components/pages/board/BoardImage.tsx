'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import Image from 'next/image'

export default function BoardImage({ imageUrls }: { imageUrls: string[] }) {
    return (
        <section>
            <Swiper pagination={{ clickable: true }} modules={[Pagination]} className="w-full max-w-lg">
                {imageUrls?.map((img, index) => (
                    <SwiperSlide key={index}>
                        <Image
                            className="h-[50svh] w-[50svh] max-w-full object-cover"
                            src={img}
                            alt={`이미지${index + 1}`}
                            width={500}
                            height={500}
                            priority
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    )
}

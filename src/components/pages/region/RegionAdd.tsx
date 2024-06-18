'use client'

import { useState } from 'react'

import Add from '@/components/images/Add'
import RegionAddModal from './RegionAddModal'

export default function RegionAdd() {
    const [locationModalOpen, setLocationModalOpen] = useState<boolean>(false)

    const handleLocationModalOpen = () => {
        setLocationModalOpen(!locationModalOpen)
    }

    return (
        <>
            <button
                onClick={handleLocationModalOpen}
                className="bg-white h-[50px] w-1/2 flex flex-row justify-center space-x-2 items-center mt-5"
            >
                <Add />
                <p className="font-Pretendard text-hobbing-red text-[15px] font-bold underline">지역 추가하기</p>
            </button>
            {locationModalOpen && <RegionAddModal handleLocationModalOpen={handleLocationModalOpen} />}
        </>
    )
}

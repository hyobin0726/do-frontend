'use client'

import { useGetClientToken } from '@/actions/useGetClientToken'

export default function RegionDelete({ regionId }: { regionId: number }) {
    const auth = useGetClientToken()
    const handleRegionDelete = async () => {
        const res = await fetch(`${process.env.BASE_URL}/crew-service/v1/users/region/${regionId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `${auth.token}`,
                'Content-Type': 'application/json',
            },
        })
        const data = await res.json()
        console.log(data)
        window.location.reload()
    }

    return (
        <button
            onClick={handleRegionDelete}
            className="w-1/5 h-[40px] bg-hobbing-red rounded-xl flex justify-center items-center"
        >
            <p className="font-Pretendard text-white text-[13px] font-bold">삭제</p>
        </button>
    )
}

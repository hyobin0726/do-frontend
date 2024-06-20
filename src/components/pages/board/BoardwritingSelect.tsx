'use client'
import { useGetClientToken } from '@/actions/useGetClientToken'
import { CrewType } from '@/type/CrewType'
import { useEffect, useState } from 'react'

export default function BoardwritingSelect() {
    const [crewList, setCrewList] = useState([])
    const auth = useGetClientToken()

    useEffect(() => {
        const getCrew = async () => {
            const response = await fetch(`${process.env.BASE_URL}/crew-service/v1/users/crew/list/profile`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${auth.token}`,
                },
            })
            const data = await response.json()
            if (data.isSuccess === true) {
                console.log('소모임 목록을 불러왔습니다.', data.data)
                setCrewList(data.data)
            }
            return data.data
        }
        getCrew()
    }, [])
    return (
        <section className="flex space-x-1 p-4">
            {crewList.map((crew: CrewType) => (
                <div key={crew.crewId}>
                    <p className=" inline-block bg-hobbing-red text-white  px-3 py-1 rounded-full">{crew.name}</p>
                </div>
            ))}
        </section>
    )
}

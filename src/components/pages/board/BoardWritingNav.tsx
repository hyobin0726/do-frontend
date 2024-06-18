'use client'
import RouterBackArrowButton from '@/components/common/RouterBackArrowButton'
import BoardPost from './BoardPost'
import { useEffect, useState } from 'react'
import { useGetClientToken } from '@/actions/useGetClientToken'

export default function BoardWritingNav({ handleUpload }: { handleUpload: () => void }) {
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
        <>
            <div className="drop-shadow-sm bg-white py-4 w-full z-[1000] h-[60px]">
                <div className="relative px-4 flex items-center justify-between ">
                    <RouterBackArrowButton />
                    <p className="font-semibold">게시글 작성</p>
                    <button>
                        <BoardPost />
                    </button>
                </div>
            </div>
        </>
    )
}

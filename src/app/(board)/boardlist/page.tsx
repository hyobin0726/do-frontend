// import { useGetServerToken } from '@/actions/useGetServerToken'
import BoardList from '@/components/pages/board/BoardList'
import BoardNav from '@/components/pages/board/BoardNav'
const crew = [
    {
        crewId: '1',
        name: '해운대 크루',
        profileUrl: 'https://hobbiedo-bucket.s3.ap-northeast-2.amazonaws.com/image_1718327243910_crew.png',
    },
    {
        crewId: '2',
        name: '광안리 크루',
        profileUrl: 'https://hobbiedo-bucket.s3.ap-northeast-2.amazonaws.com/image_1718327243910_crew.png',
    },
    {
        crewId: '3',
        name: '괴정 크루',
        profileUrl: 'https://hobbiedo-bucket.s3.ap-northeast-2.amazonaws.com/image_1718327243910_crew.png',
    },
]

// async function getCrewt() {
//     const auth = await useGetServerToken()
//     console.log('auth', auth)
//     const response = await fetch(`${process.env.BASE_URL}/crew-service/v1/users/crew/list/profile`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             Authorization: `${auth.token}`,
//         },
//     })
//     const data = await response.json()
//     if (data.isSuccess === true) {
//         console.log('소모임 목록을 불러왔습니다.', data.data)
//     }
//     return data.data
// }

export default async function BoardPage() {
    // await getCrewt()
    return (
        <div>
            <BoardNav crew={crew} />
            <BoardList />
        </div>
    )
}

import getLatestBoard from '@/api/board/getLatestBoard'

import Monster5 from '@/components/images/monsters/Monster5'

interface topCrew {
    crewId: number
    name: string
}

interface board {
    boardId: number
    crewId: number
    content: string
    writerUuid: string
    writerName: string
    writerProfileImageUrl: string
    createdAt: string
    thumbnailUrl: string
    likeCount: number
    commentCount: number
}

interface latestBoard {
    crewName: string
    board: board
}

export default async function HomeSection3({ topCrew }: { topCrew: topCrew[] }) {
    console.log('topCrew: ', topCrew)

    const latestBoards = await Promise.all(
        topCrew.map(async (crew) => {
            const board = await getLatestBoard(crew.crewId)
            return { crewName: crew.name, board: board }
        }),
    )
    console.log('latestBoards: ', latestBoards)
    return (
        <>
            <section className="w-full h-[550px] bg-green-100 px-8">
                <div className=" w-full h-[120px] flex flex-row items-end">
                    <p className="text-black font-extrabold text-[35px] z-[10]">
                        우리동네에서 <br /> 가장 HOT한 소식
                    </p>
                    <div className="w-[50px] h-[50px]">
                        <Monster5 />
                    </div>
                </div>

                <div className="w-full h-[calc(100%-140px)] bg-yellow-200 divide-y-2">
                    {latestBoards.map((board: latestBoard, idx: number) => (
                        <div key={idx} className="bg-blue-50 w-full h-[100px]">
                            <p>{board.crewName}</p>
                            <p>{board.board.content}</p>
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}

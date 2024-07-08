import Image from 'next/image'

import getLatestBoard from '@/api/board/getLatestBoard'

import Monster5 from '@/components/images/monsters/Monster5'
import BoardLike from '@/components/images/BoardLike'
import BoardComment from '@/components/images/BoardCommet'
import Link from 'next/link'

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

export default async function HomeSection3({ topCrew, token }: { topCrew: topCrew[]; token: string }) {
    if (topCrew.length === 0) {
        return (
            <section className="w-full h-auto pt-8 pb-14">
                <div className=" w-full h-[120px] flex flex-row items-end px-8">
                    <p className="text-black font-extrabold text-[35px] z-[10]">
                        우리동네에서 <br /> 가장 HOT한 소식
                    </p>
                    <div className="w-[50px] h-[50px]">
                        <Monster5 />
                    </div>
                </div>
                <div className="w-full px-7">
                    <div className="bg-white w-full h-[200px] py-3 px-3 flex flex-col justify-center items-center drop-shadow my-4 rounded-lg space-y-5">
                        <p className="text-[16px] font text-center line-clamp-2">
                            우리동네에는 소모임 소식이 없어요😭
                            <br />
                            다른 동네를 추가해볼까요?
                        </p>
                        <Link href="/mypage/region" passHref scroll={false}>
                            <button className="w-auto h-[40px] bg-hobbing-red text-white rounded-xl px-5 text-[13px]">
                                동네 추가하기
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        )
    }

    const latestBoards = await Promise.all(
        topCrew.map(async (crew) => {
            const board = await getLatestBoard(crew.crewId, token)
            return { crewName: crew.name, board: board }
        }),
    )
    return (
        <>
            <section className="w-full h-auto pt-8 pb-14">
                <div className=" w-full h-[120px] flex flex-row items-end px-8">
                    <p className="text-black font-extrabold text-[35px] z-[10]">
                        우리동네에서 <br /> 가장 HOT한 소식
                    </p>
                    <div className="w-[50px] h-[50px]">
                        <Monster5 />
                    </div>
                </div>
                <div className="w-full px-7">
                    {latestBoards.map((board: latestBoard, idx: number) => (
                        <Link
                            href={`/board/${board.board.boardId}`}
                            passHref
                            scroll={false}
                            key={idx}
                            className={`bg-white w-full 
                                ${board.board.thumbnailUrl.length > 0 ? 'h-[200px]' : 'h-[170px]'}
                                py-3 px-3 flex flex-col drop-shadow my-4 rounded-lg`}
                        >
                            <div className="flex flex-row w-full h-[40px] items-center px-1">
                                <p className="text-[25px] font-bold">{board.crewName}</p>
                            </div>
                            <div className="w-full h-[calc(100%-70px)] flex flex-row justify-between items-center px-1">
                                <div
                                    className={`${board.board.thumbnailUrl.length > 0 ? 'w-2/3' : 'w-full'} h-full py-2`}
                                >
                                    <div className="w-full h-[25px] flex flex-row items-center space-x-2">
                                        <div className="w-[20px] h-[20px] flex justify-center rounded-full overflow-hidden">
                                            <Image
                                                className="object-cover"
                                                src={board.board.writerProfileImageUrl}
                                                alt="writerProfileImageUrl"
                                                width={20}
                                                height={20}
                                                style={{
                                                    width: '20px',
                                                    height: '20px',
                                                }}
                                            />
                                        </div>
                                        <p className="text-[15px] text-gray-600">{board.board.writerName}</p>
                                    </div>
                                    <div className="w-full h-[calc(100%-25px)] text-clip overflow-hidden">
                                        <p className="text-[15px]">{board.board.content}</p>
                                    </div>
                                </div>
                                {board.board.thumbnailUrl.length > 0 && (
                                    <div className="w-[80px] h-[80px] flex justify-center">
                                        <Image
                                            className="object-cover rounded-lg"
                                            src={board.board.thumbnailUrl[0]}
                                            alt="thumbnail"
                                            width={80}
                                            height={80}
                                            style={{
                                                width: '80px',
                                                height: '80px',
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-row justify-between w-full h-[30px] items-center px-1">
                                <p className="text-[14px] text-gray-400">
                                    {new Date(board.board.createdAt).toLocaleTimeString('ko-KR', {
                                        year: 'numeric',
                                        month: 'numeric',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </p>
                                <div className="flex flex-row space-x-2 items-center justify-center">
                                    <div className="w-[17px] h-[17px]">
                                        <BoardLike />
                                    </div>
                                    <p className="text-[15px]">{board.board.likeCount}</p>
                                    <div className="w-[17px] h-[17px]">
                                        <BoardComment />
                                    </div>
                                    <p className="text-[15px]">{board.board.commentCount}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </>
    )
}

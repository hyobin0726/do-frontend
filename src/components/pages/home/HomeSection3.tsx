import getLatestBoard from '@/api/board/getLatestBoard'

import Monster5 from '@/components/images/monsters/Monster5'

interface topCrew {
    crewId: number
    name: string
}

export default async function HomeSection3({ topCrew }: { topCrew: topCrew[] }) {
    // console.log('topCrew: ', topCrew)
    // const latestBoard = await getLatestBoard(topCrew[0].crewId)
    // // console.log('latestBoard: ', latestBoard)
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
                <div className="w-full h-[calc(100%-140px)] bg-yellow-200">test</div>
            </section>
        </>
    )
}

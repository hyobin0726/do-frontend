import PageHeader from '@/components/common/PageHeader'
import Image from 'next/image'
interface Chat {
    uuid: string
    imageUrl: string
    createdAt: string
}

interface CrewImgList {
    date: string
    chats: Chat[]
}

async function getCrewImgList(crewId: string) {
    try {
        const response = await fetch(`${process.env.BASE_URL}/crew-service/v1/users/chat/image/${crewId}`, {
            cache: 'no-cache',
        })
        const data = await response.json()
        return data.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

export default async function ChatImgList({ params }: { params: { crewId: string } }) {
    const crewId: string = params.crewId
    const crewImgList: CrewImgList[] = await getCrewImgList(crewId)

    return (
        <>
            <PageHeader />
            <div className="p-4">
                {crewImgList &&
                    crewImgList.map((crewImg) => (
                        <div key={crewImg.date}>
                            {new Date(crewImg.date).toLocaleDateString('ko-KR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                weekday: 'long',
                            })}

                            <div className="grid grid-cols-3 ">
                                {crewImg.chats.map((chat, idx) => (
                                    <div key={idx} className="m-1">
                                        <Image
                                            src={chat.imageUrl}
                                            alt="chat image"
                                            sizes="100vw"
                                            style={{
                                                width: '150px',
                                                height: '150px',
                                            }}
                                            width={61}
                                            height={61}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
            </div>
        </>
    )
}

import Album from '@/components/images/Album'

export default function ChatMenuModal({
    chatMenuModal,
    setChatMenuModal,
}: {
    chatMenuModal: boolean
    setChatMenuModal: React.Dispatch<React.SetStateAction<boolean>>
}) {
    const crew = [
        {
            id: 1,
            name: '박효빈',
            role: 1,
        },
        {
            id: 2,
            name: '김예진',
            role: 0,
        },
        {
            id: 3,
            name: '김선욱',
            role: 0,
        },
        {
            id: 4,
            name: '홍준표',
            role: 0,
        },
        {
            id: 5,
            name: '이선주',
            role: 0,
        },
    ]

    return (
        <>
            {chatMenuModal && (
                <div className="fixed top-0 z-[1]  w-screen h-screen  bg-black bg-opacity-30 ">
                    <div className="bg-white w-2/3  fixed right-0 h-screen p-4">
                        <button className="absolute top-2 right-2" onClick={() => setChatMenuModal(false)}>
                            <img
                                width="25"
                                height="25"
                                src="https://img.icons8.com/fluent-systems-regular/48/000000/close-window.png"
                                alt="모달 닫기"
                            />
                        </button>
                        <div className="flex">
                            <div className="font-bold text-lg">해운대 크루 서랍</div>
                        </div>
                        <div className="flex items-center space-x-2 mt-2">
                            <div className="w-5">
                                <Album />
                            </div>
                            <div className="text-[#869AA9] ml-2">사진</div>
                        </div>
                        <ul>
                            <div className="flex items-center space-x-2 mt-2">
                                <div className="w-5"></div>
                                <div className="text-[#869AA9]">참여자</div>
                            </div>
                            <div>
                                {crew.map((member) => (
                                    <div key={member.id} className="flex items-center p-1 ">
                                        <div className="bg-[#D9D9D9] rounded-full w-14 h-14 flex items-center justify-center text-sm">
                                            프로필
                                        </div>
                                        <div className="ml-4 flex">
                                            <div className="font-bold text-lg">{member.name}</div>
                                            {member.role === 1 && (
                                                <span className="text-white text-sm bg-[#FFB7B3] rounded-lg px-2 py-1 ml-2">
                                                    방장
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ul>
                    </div>
                </div>
            )}
        </>
    )
}

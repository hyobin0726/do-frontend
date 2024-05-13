export default function ChatRoomListModal({
    chatListModal,
    setChatListModal,
}: {
    chatListModal: boolean
    setChatListModal: React.Dispatch<React.SetStateAction<boolean>>
}) {
    return (
        <>
            {chatListModal && (
                <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-70 z-[2]">
                    <div className=" p-4 ">
                        <button className="absolute top-2 right-2" onClick={() => setChatListModal(false)}>
                            <img
                                width="25"
                                height="25"
                                src="https://img.icons8.com/fluent-systems-regular/48/000000/close-window.png"
                                alt="모달 닫기"
                            />
                        </button>
                        <ul className=" space-y-4">
                            <li className=" bg-gray-400 rounded-full w-24 h-24 flex items-center justify-center">
                                채팅방1
                            </li>
                            <li className=" bg-gray-400 rounded-full w-24 h-24 flex items-center justify-center">
                                채팅방2
                            </li>
                            <li className=" bg-gray-400 rounded-full w-24 h-24 flex items-center justify-center">
                                채팅방3
                            </li>
                            <li className=" bg-gray-400 rounded-full w-24 h-24 flex items-center justify-center">
                                채팅방4
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </>
    )
}

export default function ChatMoreModal({
    chatMoreModal,
    setChatMoreModal,
}: {
    chatMoreModal: boolean
    setChatMoreModal: React.Dispatch<React.SetStateAction<boolean>>
}) {
    return (
        <>
            {chatMoreModal && (
                <div className="fixed top-0 z-[1]  w-screen h-screen  bg-black bg-opacity-30">
                    <div className="bg-gray-300 w-1/2  fixed right-0 h-screen">
                        <button className="absolute top-2 right-2" onClick={() => setChatMoreModal(false)}>
                            <img
                                width="25"
                                height="25"
                                src="https://img.icons8.com/fluent-systems-regular/48/000000/close-window.png"
                                alt="모달 닫기"
                            />
                        </button>
                        <div>사진</div>
                        <div>참여자</div>
                    </div>
                </div>
            )}
        </>
    )
}

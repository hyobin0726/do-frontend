import Link from 'next/link'

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
                <div className="fixed  right-0 top-0 w-40 h-screen bg-gray-300 z-[1]">
                    <div className=" p-4 ">
                        <button className="absolute top-2 right-2" onClick={() => setChatMoreModal(false)}>
                            <img
                                width="25"
                                height="25"
                                src="https://img.icons8.com/fluent-systems-regular/48/000000/close-window.png"
                                alt="모달 닫기"
                            />
                        </button>
                        <Link href={'/clubdetail/clubhome'}>게시물</Link>
                        <div>사진</div>
                        <div>참여자</div>
                    </div>
                </div>
            )}
        </>
    )
}

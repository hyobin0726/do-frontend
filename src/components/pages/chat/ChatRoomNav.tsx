import RouterBackArrowButton from '@/components/common/RouterBackArrowButton'

export default function ChatRoomNav() {
    return (
        <>
            <div className="bg-white bg-opacity-50 py-4 px-2">
                <div className="container mx-auto px-2 flex items-center">
                    <RouterBackArrowButton />
                    <div className="absolute left-1/2 transform -translate-x-1/2">
                        <p className="font-semibold">채팅방 이름</p>
                    </div>
                    <img
                        width="25"
                        height="25"
                        src="https://img.icons8.com/ios-glyphs/30/more.png"
                        alt="더보기"
                        className="ml-auto"
                    />
                </div>
            </div>
        </>
    )
}

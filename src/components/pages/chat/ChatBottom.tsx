export default function ChatBottom() {
    return (
        <form className=" absolute bottom-0 h-12 flex w-full p-1 bg-gray-300">
            <button className="p-1">
                <img width="30" src="https://img.icons8.com/forma-light-filled/24/image.png" alt="이미지 업로드" />
            </button>

            <input type="text" className="p-2 flex-grow rounded-xl" placeholder="메시지를 입력하세요." />
            <button className=" p-1">
                <img width="25" src="https://img.icons8.com/ios-filled/50/sent.png" alt="전송" />
            </button>
        </form>
    )
}

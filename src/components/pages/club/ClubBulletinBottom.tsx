function ClubBulletinBottom() {
    return (
        <form className=" absolute bottom-0 h-12 flex w-full p-1 bg-gray-300">
            <div className="flex-grow">
                <input type="text" className="p-2 flex-grow rounded-xl w-full" placeholder="메시지를 입력하세요." />
            </div>
            <button className=" p-1">
                <img width="25" src="https://img.icons8.com/ios-filled/50/sent.png" alt="전송" />
            </button>
        </form>
    )
}
export default ClubBulletinBottom

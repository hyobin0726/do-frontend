import ClubBulletinComment from '@/components/pages/club/ClubBulletinComment'

function clubbulletin() {
    return (
        <div className="p-4 bg-red-300 h-[calc(100svh-5rem)] ">
            <div className="flex items-center mb-4">
                <div className="bg-gray-400 rounded-full w-12 h-12 flex items-center justify-center text-sm">
                    프로필
                </div>
                <div className="ml-3">
                    <p>작성자 이름</p>
                    <p>2024년 5월 21일</p>
                </div>
            </div>
            <div className="mb-4">
                <p>게시글 내용</p>
            </div>
            <div className="flex items-center  border-t-2 mb-4">
                <button className="flex items-center text-gray-500 mt-3">
                    <div className="bg-gray-400 rounded-full w-7 h-7 flex items-center justify-center text-sm">굳</div>
                    <span>좋아요 1000개</span>
                </button>
                <button className="flex items-center text-gray-500 mt-3">
                    <div className="bg-gray-400 rounded-full w-7 h-7 flex items-center justify-center text-sm">댓</div>
                    <span>댓글 1000개</span>
                </button>
            </div>
            <ClubBulletinComment />
        </div>
    )
}
export default clubbulletin

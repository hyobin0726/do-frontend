import Send from '@/components/images/Send'

function BoardBottom() {
    return (
        <form className="fixed bottom-0 w-full  z-[100]">
            <div className="flex justify-between items-center px-3 py-2">
                <input
                    type="text"
                    className="flex-grow p-2 rounded-full border border-hobbing-gray focus:outline-none"
                    placeholder="메시지를 입력하세요."
                />
                <button
                    type="button"
                    className="w-9 h-9 bg-hobbing-red rounded-full flex items-center justify-center ml-2"
                >
                    <div className="w-6">
                        <Send />
                    </div>
                </button>
            </div>
        </form>
    )
}

export default BoardBottom

export default function ChatDate({ date }: { date: string }) {
    return (
        <div className="flex justify-center">
            <div className="bg-[#D8D8D8] rounded-3xl px-3 py-1 text-white text-sm">
                {new Date(date).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    weekday: 'long',
                })}
            </div>
        </div>
    )
}

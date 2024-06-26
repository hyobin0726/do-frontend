export default function BoardProfile({ writerUuid, createdAt }: { writerUuid: string; createdAt: string }) {
    return (
        <section className="flex items-center ">
            <div className="bg-gray-400 rounded-full w-12 h-12 flex items-center justify-center text-sm">프로필</div>
            <div className="ml-3 ">
                <p className="">작성자</p>
                <p className="text-sm">
                    {new Date(createdAt).toLocaleTimeString('ko-KR', {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </p>
            </div>
        </section>
    )
}

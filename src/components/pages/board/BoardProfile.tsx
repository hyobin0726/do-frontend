export default function BoardProfile({
    createdAt,
    writerName,
    writerProfileImageUrl,
    updated,
}: {
    createdAt: string
    writerName: string
    writerProfileImageUrl: string
    updated?: boolean
}) {
    return (
        <section className="flex items-center ">
            <img src={writerProfileImageUrl} className="rounded-xl w-12 h-12" />
            <div className="ml-3 ">
                <p className="font-medium">{writerName}</p>
                <div className="flex space-x-1">
                    <p className="text-sm">
                        {new Date(createdAt).toLocaleTimeString('default', {
                            year: 'numeric',
                            month: 'numeric',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                        })}
                    </p>
                    {updated && <p className="text-xs mt-0.5">(수정됨)</p>}
                </div>
            </div>
        </section>
    )
}

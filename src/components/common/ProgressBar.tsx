export default function ProgressBar({ step, total }: { step: number; total: number }) {
    return (
        <>
            <div className="bg-white w-full h-auto flex flex-row space-x-3">
                {Array.from({ length: total }, (_, i) => (
                    <div
                        key={i}
                        className={`w-1/2 h-[5px] rounded-full bg-hobbing-orange ${i + 1 === step ? 'opacity-100' : 'opacity-25'}`}
                    ></div>
                ))}
            </div>
        </>
    )
}

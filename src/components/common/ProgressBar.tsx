export default function ProgressBar({ step, total }: { step: number; total: number }) {
    const progress = (step / total) * 100

    return (
        <div className="bg-white w-full h-auto mt-10">
            <div
                className="h-[5px] rounded-full bg-hobbing-orange transition-width duration-500 ease-out"
                style={{ width: `${progress}%` }}
            ></div>
        </div>
    )
}

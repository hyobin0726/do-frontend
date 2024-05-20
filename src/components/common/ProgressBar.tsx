export default function ProgressBar({ step, total }: { step: number; total: number }) {
    return (
        <>
            <div className="bg-white w-full h-[20px]">
                {step}/{total}
            </div>
        </>
    )
}

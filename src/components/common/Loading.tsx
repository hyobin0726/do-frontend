import LoadingMark from '@/components/images/LoadingMark'

export default function Loading() {
    return (
        <div className="fixed flex justify-center items-center top-0 left-0 z-[8000] w-dvw h-svh  bg-black bg-opacity-40">
            <LoadingMark width="80" height="80" />
        </div>
    )
}

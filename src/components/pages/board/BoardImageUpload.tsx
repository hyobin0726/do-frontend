import Camera from '@/components/images/Camera'

export default function BoardImageUpload({
    multiRef,
    multiFileHandler,
}: {
    multiRef: React.RefObject<HTMLInputElement>
    multiFileHandler: (event: React.ChangeEvent<HTMLInputElement>) => void
}) {
    return (
        <div className=" w-10">
            <label htmlFor="inputFile">
                <Camera />
            </label>
            <input
                type="file"
                id="inputFile"
                style={{ display: 'none' }}
                multiple
                ref={multiRef}
                onChange={(e) => multiFileHandler(e)}
            />
        </div>
    )
}

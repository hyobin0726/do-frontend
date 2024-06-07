import RouterBackArrowButton from './RouterBackArrowButton'

export default function PageHeader({ title }: { title?: string }) {
    return (
        <div className="relative w-full h-[60px] flex items-center px-5 bg-white drop-shadow-sm">
            <RouterBackArrowButton className="z-[10] absolute left-5 h-[60px] w-[50px] flex items-center" />
            {title && (
                <p className="w-full text-center font-Pretendard text-[20px] sm:text-[18px] md:text-[23px] font-bold ">
                    {title}
                </p>
            )}
        </div>
    )
}

import RouterBackArrowButton from '@/components/common/RouterBackArrowButton'

export default function SurveyHeader() {
    return (
        <header className="bg-white drop-shadow-sm sticky top-0 z-[400]">
            <nav className="relative w-full h-[60px] flex items-center">
                <RouterBackArrowButton className="z-[10] absolute left-5 h-[60px] w-[50px] flex items-center" />
                <h1 className="w-full text-center font-Pretendard text-[20px] sm:text-[18px] md:text-[23px] font-bold ">
                    설문조사
                </h1>
            </nav>
        </header>
    )
}

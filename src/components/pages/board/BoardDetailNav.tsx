'use client'
import RouterBackArrowButton from '@/components/common/RouterBackArrowButton'

export default function BoardDetailNav() {
    return (
        <nav className="bg-white drop-shadow-sm bg-opacity-50 py-4 px-2 h-[60px]">
            <div className="relative  mx-auto px-2 flex items-center">
                <RouterBackArrowButton />
                <div className="flex-1 text-center ">
                    <p className="font-semibold">test</p>
                </div>
                <img
                    width="25"
                    height="25"
                    src="https://img.icons8.com/ios-glyphs/30/more.png"
                    alt="더보기"
                    className="ml-auto"
                />
            </div>
        </nav>
    )
}

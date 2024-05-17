import Link from 'next/link'
import RightArrow from '../images/RightArrow'

interface BasicNextButtonProps {
    path: string
    text: string
}

export default function BasicNextButton({ path, text }: BasicNextButtonProps) {
    return (
        <Link
            href={path}
            className="bg-hobbing-red h-[60px] w-full rounded-xl flex flex-row justify-between items-center px-5"
        >
            <p className="font-Pretendard text-white text-[15px] font-bold">{text}</p>
            <RightArrow width={15} height={15} />
        </Link>
    )
}

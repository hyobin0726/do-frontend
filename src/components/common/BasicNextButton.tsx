import Link from 'next/link'
import RightArrow from '../images/RightArrow'

interface BasicNextButtonProps {
    path: string
    text: string
    color?: string
}

export default function BasicNextButton({ path, text, color }: BasicNextButtonProps) {
    return (
        <Link
            href={path}
            className={`${color ? color : 'bg-hobbing-red'} h-[60px] w-full rounded-xl flex flex-row justify-between items-center px-8`}
        >
            <p className={`${color ? 'text-hobbing-red' : 'text-white'} font-Pretendard  text-[15px] font-bold`}>
                {text}
            </p>
            <RightArrow width={15} height={15} color={`${color ? '#F76D67' : '#ffffff'}`} />
        </Link>
    )
}

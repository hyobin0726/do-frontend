import Link from 'next/link'
import RightArrow from '../images/RightArrow'

interface BasicNextButtonProps {
    path: string
    text: string
    theme: 'red' | 'white'
}

export default function BasicNextButton({ path, text, theme }: BasicNextButtonProps) {
    return (
        <Link
            href={path}
            className={`${theme == 'white' ? 'bg-white drop-shadow' : 'bg-hobbing-red'} h-[60px] w-full rounded-xl flex flex-row justify-between items-center px-8`}
        >
            <p
                className={`${theme == 'white' ? 'text-hobbing-red' : 'text-white'} font-Pretendard  text-[15px] font-bold`}
            >
                {text}
            </p>
            <RightArrow width={15} height={15} color={`${theme == 'white' ? '#F76D67' : '#ffffff'}`} />
        </Link>
    )
}

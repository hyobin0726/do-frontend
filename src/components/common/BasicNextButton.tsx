import Link from 'next/link'
import RightArrow from '../images/RightArrow'

interface BasicNextButtonProps {
    path?: string
    text: string
    theme: 'red' | 'white'
}

export default function BasicNextButton({ path, text, theme }: BasicNextButtonProps) {
    const baseClasses = `${theme === 'white' ? 'bg-white drop-shadow' : 'bg-hobbing-red'} h-[60px] w-full rounded-xl flex flex-row justify-between items-center px-8`
    const textClasses = `${theme === 'white' ? 'text-hobbing-red' : 'text-white'} font-Pretendard text-[15px] font-bold`
    const arrowColor = theme === 'white' ? '#F76D67' : '#ffffff'

    const Content = () => (
        <>
            <p className={textClasses}>{text}</p>
            <RightArrow width={15} height={15} color={arrowColor} />
        </>
    )

    return (
        <>
            {path ? (
                <Link href={path} passHref scroll={false} className={baseClasses}>
                    <Content />
                </Link>
            ) : (
                <div className={baseClasses}>
                    <Content />
                </div>
            )}
        </>
    )
}

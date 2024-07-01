import HobbieDoLogo from '../images/HobbieDoLogo'

interface MainHeaderProps {
    title?: string
    children?: React.ReactNode
}

export default function MainHeader({ title, children }: MainHeaderProps) {
    return (
        <header className="bg-white sticky top-0 w-full h-[60px] flex justify-between items-center drop-shadow z-[1000] px-4 py-3">
            <div className="w-[30%] h-full flex items-center">
                {!title ? <HobbieDoLogo /> : <p className="text-lg font-bold">{title}</p>}
            </div>
            <div className="w-[70%] h-full flex justify-end items-center space-x-5">{children}</div>
        </header>
    )
}

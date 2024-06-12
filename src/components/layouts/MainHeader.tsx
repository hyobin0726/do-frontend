interface MainHeaderProps {
    title: string
    children?: React.ReactNode
}

export default function MainHeader({ title, children }: MainHeaderProps) {
    return (
        <header className="bg-white sticky top-0 w-full h-[60px] py-4 drop-shadow-sm">
            <div className="mx-auto px-4 flex justify-between items-center">
                <div className="w-[30%] h-full">
                    <p className="text-lg font-bold">{title}</p>
                </div>
                <div className="w-[70%] h-full flex justify-end items-center space-x-5">{children}</div>
            </div>
        </header>
    )
}

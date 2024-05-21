interface InputProps {
    title?: string
    required?: boolean
    index?: number
    focusedIndex?: number
    children: React.ReactNode
}

export default function Input({ title, required, index, focusedIndex, children }: InputProps) {
    return (
        <div
            className={`w-full h-[50px] px-3 rounded-xl border-[1px] flex flex-col justify-center 
                    ${
                        index === focusedIndex
                            ? 'bg-hobbing-light-pink border-hobbing-pink'
                            : 'bg-white border-hobbing-gray'
                    }`}
        >
            {title && (
                <label htmlFor="input" className="text-[#646464] text-[11px] font-Pretendard">
                    {title}
                    {required && <span className="text-hobbing-red"> *</span>}
                </label>
            )}
            {children}
        </div>
    )
}

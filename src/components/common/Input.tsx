import React, { forwardRef, RefObject } from 'react'

interface InputProps {
    title?: string
    required?: boolean
    index?: number
    focusedIndex?: number
    id: string
    name?: string // name 속성 추가
    type: string
    placeholder: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onFocus: () => void
    ref?: ((instance: HTMLInputElement | null) => void) | RefObject<HTMLInputElement>
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ title, required, index, focusedIndex, id, name, type, placeholder, value, onChange, onFocus }, ref) => {
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
                    <label htmlFor={id} className="text-[#646464] text-[11px] font-Pretendard">
                        {title}
                        {required && <span className="text-hobbing-red"> *</span>}
                    </label>
                )}
                <input
                    id={id}
                    name={name} // name 속성 추가
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onFocus={onFocus}
                    ref={ref}
                    className="w-full h-auto outline-none border-none bg-transparent caret-hobbing-pink text-[13px] sm:text-[12px] md:text-[15px] font-Pretendard font-medium  "
                />
            </div>
        )
    },
)

Input.displayName = 'Input'

export default Input

import React, { useState, forwardRef } from 'react'
import SliderModal from '@/components/common/SliderModal'

interface InputProps {
    index: number
    focusedIndex: number
    value: string
    onChange: (gender: string) => void
    onFocus: () => void
}

const SignUpGenderSelecter = forwardRef<HTMLInputElement, InputProps>(
    ({ index, focusedIndex, value, onChange, onFocus }, ref) => {
        const [selectedGender, setSelectedGender] = useState<string>(value)
        const [isModalOpen, setIsModalOpen] = useState<boolean>(false) // 모달창을 열고 닫는 상태

        const modalController = () => {
            setIsModalOpen(!isModalOpen)
        }

        const handleGenderChange = (gender: string) => {
            setSelectedGender(gender)
            onChange(gender)
            setIsModalOpen(!isModalOpen)
        }

        return (
            <>
                <div
                    className={`w-full h-[50px] px-3 rounded-xl border-[1px] flex flex-col justify-center 
                        ${index === focusedIndex ? 'bg-hobbing-light-pink border-hobbing-pink' : 'bg-white border-hobbing-gray'}`}
                    onClick={modalController}
                >
                    <label htmlFor="gender" className="text-[#646464] text-[11px] font-Pretendard">
                        성별
                        <span className="text-hobbing-red"> *</span>
                    </label>
                    <input
                        id="gender"
                        name="gender"
                        type="text"
                        placeholder="성별을 입력해주세요"
                        value={selectedGender}
                        onFocus={onFocus}
                        readOnly
                        ref={ref}
                        className="w-full h-auto outline-none border-none bg-transparent caret-hobbing-pink text-[13px] sm:text-[12px] md:text-[15px] font-Pretendard font-medium"
                    />
                </div>

                <SliderModal isModalOpen={isModalOpen} onChangeModal={modalController} backgroundClose={true}>
                    <div className="bg-white h-[30svh] w-[80%] flex flex-col items-center pt-10 space-y-10">
                        <p className="text-[20px] font-Pretendard text-black font-medium">성별을 선택해주세요</p>
                        <div className="w-[100%] flex flex-row bg-hobbing-light-pink p-2 rounded-full space-x-2 relative">
                            <div
                                onClick={() => handleGenderChange('여성')}
                                className={`w-[50%] h-[50px] rounded-full flex justify-center items-center cursor-pointer font-Pretendard text-[18px]
                                            ${selectedGender === '여성' ? 'text-hobbing-red font-bold border-2 border-hobbing-red' : selectedGender === '' ? 'text-hobbing-red font-bold' : 'text-text-pink-gray'}`}
                            >
                                여성
                            </div>
                            <div
                                onClick={() => handleGenderChange('남성')}
                                className={`w-[50%] h-[50px] rounded-full flex justify-center items-center cursor-pointer font-Pretendard text-[18px]
                                ${selectedGender === '남성' ? 'text-hobbing-red font-bold border-2 border-hobbing-red' : selectedGender === '' ? 'text-hobbing-red font-bold' : 'text-text-pink-gray'}`}
                            >
                                남성
                            </div>
                        </div>
                    </div>
                </SliderModal>
            </>
        )
    },
)

export default SignUpGenderSelecter

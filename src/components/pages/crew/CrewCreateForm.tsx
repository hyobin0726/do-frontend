'use client'
import { useState } from 'react'
import { zodError } from './CrewCreate'
export default function CrewCreateForm({ zodError, introLength }: { zodError: zodError; introLength: number }) {
    const [inputHashTag, setInputHashTag] = useState('')
    const [hashTags, setHashTags] = useState<string[]>([])
    const [selectedJoinType, setSelectedJoinType] = useState<number>(0)

    const isEmptyValue = (value: string) => {
        return value.trim().length === 0
    }
    const addHashTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const allowedCommand = ['Comma', 'Enter', 'Space']
        if (!allowedCommand.includes(e.code)) return

        let newHashTag = e.currentTarget.value.trim()

        if (newHashTag.includes(',')) {
            newHashTag = newHashTag.split(',').join('')
        }

        if (isEmptyValue(newHashTag)) return

        setHashTags((prevHashTags) => {
            if (prevHashTags.includes(newHashTag)) {
                return prevHashTags
            }
            return [...prevHashTags, newHashTag]
        })
        setInputHashTag('')
    }

    const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code !== 'Enter') return
        e.preventDefault()

        const regExp = /^[a-z|A-Z|가-힣|ㄱ-ㅎ|ㅏ-ㅣ|0-9| \t|]+$/g
        if (!regExp.test(e.currentTarget.value)) {
            setInputHashTag('')
        }
    }

    const changeHashTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value
        if (value.length <= 10) {
            setInputHashTag(value)
        } else {
            setInputHashTag(value.substring(0, 10))
        }
    }
    const handleJoinTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedJoinType(Number(e.target.value))
    }

    const handleHashTagDelete = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
        e.preventDefault()
        setHashTags((prevTags) => prevTags.filter((_, idx) => idx !== index))
    }
    return (
        <>
            <div className="w-full h-auto space-y-5">
                <div className="space-y-3">
                    <div className="flex justify-between mb-2">
                        <p className="text-gray-600 text-sm ml-1 font-semibold">소모임 이름</p>
                    </div>
                    <input
                        type="text"
                        name="crewName"
                        placeholder="소모임 이름을 입력해주세요. (최대 20자)"
                        className="w-full h-[50px] px-3 rounded-xl border-[1px] flex flex-row justify-center outline-none bg-white border-hobbing-gra"
                        maxLength={20}
                    />
                    {zodError && zodError.crewName !== '' && (
                        <p className="text-hobbing-red text-[11px] font-medium ">{`* ${zodError.crewName}`}</p>
                    )}
                </div>
                <div className="space-y-3">
                    <div className="flex justify-between mb-2">
                        <p className="text-gray-600 text-sm ml-1 font-semibold">소모임 소개글</p>
                        <p className="text-gray-600 text-sm">{introLength}자 / 200자</p>
                    </div>
                    <textarea
                        placeholder="소모임 소개글 작성해주세요."
                        className="w-full h-[80px] p-3 rounded-xl border-[1px] flex flex-row justify-center outline-none bg-white border-hobbing-gray"
                        maxLength={200}
                        name="introduction"
                    />
                    {zodError && zodError.introduction !== '' && (
                        <p className="text-hobbing-red text-[11px] font-medium ">{`* ${zodError.introduction}`}</p>
                    )}
                </div>

                <div className="space-y-3 w-full mt-4">
                    <div className="space-x-1 mb-2">
                        {hashTags.length > 0 &&
                            hashTags.map((hashTag, idx) => {
                                return (
                                    <div
                                        key={idx}
                                        className="inline-block bg-hobbing-red text-white px-4 py-2 rounded-md relative"
                                    >
                                        # {hashTag}
                                        <button
                                            className="absolute top-0  right-1 text-white rounded-full"
                                            onClick={(e) => handleHashTagDelete(e, idx)}
                                        >
                                            <p className="text-xs">X</p>
                                        </button>
                                    </div>
                                )
                            })}
                    </div>

                    <input
                        value={inputHashTag}
                        onChange={changeHashTagInput}
                        onKeyUp={addHashTag}
                        onKeyDown={keyDownHandler}
                        placeholder="#해시태그를 등록해보세요. (최대 5개)"
                        className="w-full h-[50px] px-3 rounded-xl border-[1px] flex flex-row justify-center outline-none bg-white border-hobbing-gray"
                        disabled={hashTags.length >= 5}
                    />
                    {hashTags.length > 5 && (
                        <p className="text-hobbing-red text-[11px] font-medium ">
                            * 해시태그는 최대 5개까지 등록 가능합니다.
                        </p>
                    )}
                    <input type="hidden" name="hashTagList" value={hashTags} />
                </div>
                <div className="space-y-3">
                    <p className="text-gray-600 text-sm ml-1 font-semibold mb-2">소모임 가입 형식</p>
                    <div className="flex flex-col gap-5 w-full p-5 border rounded-lg bg-white ">
                        <div className="flex items-center gap-x-5">
                            <input
                                type="radio"
                                id="public"
                                name="joinType"
                                value={0}
                                checked={selectedJoinType === 0}
                                onChange={handleJoinTypeChange}
                            />
                            <label htmlFor="public" className="text-sm text-gray-700">
                                자유 가입
                            </label>
                        </div>
                        <div className="flex items-center gap-x-5">
                            <input
                                type="radio"
                                id="private"
                                name="joinType"
                                value={1}
                                checked={selectedJoinType === 1}
                                onChange={handleJoinTypeChange}
                            />
                            <label htmlFor="private" className="text-sm text-gray-700">
                                신청 가입
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

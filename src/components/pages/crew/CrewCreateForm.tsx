'use client'
import { useState } from 'react'
export default function CrewCreateForm({
    onCrewName,
    onIntroduction,
    onHashTagList,
    onJoinType,
}: {
    onCrewName: (crewName: string) => void
    onIntroduction: (crewDescription: string) => void
    onHashTagList: (hashTags: string[]) => void
    onJoinType: (joinType: string) => void
}) {
    const [crewName, setCrewName] = useState('')
    const [crewNameValue, setCrewNameValue] = useState('')
    const [crewDescription, setCrewDescription] = useState('')
    const [crewDescriptionValue, setCrewDescriptionValue] = useState('')
    const [inputHashTag, setInputHashTag] = useState('')
    const [hashTags, setHashTags] = useState<string[]>([])
    const [selectedJoinType, setSelectedJoinType] = useState<string>('public')

    const handleCrewName = (event: React.ChangeEvent<HTMLInputElement>) => {
        const crewName = event.target.value
        setCrewName(crewName)
        onCrewName(crewName)
        if (crewName.trim().length < 1) {
            setCrewNameValue('1자 이상 입력해주세요')
        } else {
            setCrewNameValue('')
        }
    }
    const handleCrewDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        let crewDescription = event.target.value
        if (crewDescription.trim().length > 200) {
            alert('200자 이하로 입력해주세요')
            crewDescription = crewDescription.substring(0, 200)
        }
        setCrewDescription(crewDescription)
        onIntroduction(crewDescription)
        if (crewDescription.trim().length < 1) {
            setCrewDescriptionValue('1자 이상 입력해주세요')
        } else setCrewDescriptionValue('')
    }
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
        onHashTagList([...hashTags, newHashTag])
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
        setSelectedJoinType(e.target.value)
        onJoinType(e.target.value)
    }

    return (
        <>
            <div className="w-full h-auto space-y-2">
                <div className="space-y-1">
                    <div className="flex justify-between mb-2">
                        <p className="text-gray-600 text-sm ml-1 font-semibold">소모임 이름</p>
                    </div>
                    <input
                        type="text"
                        placeholder="소모임 이름을 입력해주세요. (최대 20자)"
                        className={`w-full h-[50px] px-3 rounded-xl border-[1px] flex flex-row justify-center outline-none
                    ${crewNameValue ? 'border-hobbing-pink bg-hobbing-light-pink' : 'bg-white border-hobbing-gray'}`}
                        maxLength={20}
                        value={crewName}
                        onChange={handleCrewName}
                    />
                    {crewNameValue && <p className="text-hobbing-red text-[11px] font-medium ">* {crewNameValue}</p>}
                </div>
                <div className="space-y-1">
                    <div className="flex justify-between mb-2">
                        <p className="text-gray-600 text-sm ml-1 font-semibold">소모임 소개글</p>
                        <p className="text-gray-600 text-sm">{crewDescription.length}자 / 200자</p>
                    </div>
                    <textarea
                        placeholder="소모임 소개글 작성해주세요."
                        className={`w-full h-[80px] p-3 rounded-xl border-[1px] flex flex-row justify-center outline-none
                     ${crewDescription.length > 200 || crewDescriptionValue ? 'border-hobbing-pink bg-hobbing-light-pink' : 'bg-white border-hobbing-gray'}`}
                        maxLength={200}
                        value={crewDescription}
                        onChange={handleCrewDescription}
                    />
                    {crewDescriptionValue && (
                        <p className="text-hobbing-red text-[11px] font-medium ">* {crewDescriptionValue}</p>
                    )}
                </div>
                <div className="space-y-1">
                    <div className=" space-x-1 mb-2">
                        {hashTags.length > 0 &&
                            hashTags.map((hashTag, idx) => {
                                return (
                                    <div
                                        key={idx}
                                        className="inline-block bg-hobbing-red text-white  px-3 py-1 rounded-full"
                                    >
                                        # {hashTag}
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
                </div>
                <div>
                    <div className="text-gray-600 text-sm ml-1 font-semibold mb-2">소모임 가입 형식</div>
                    <div className="flex flex-col gap-4 w-full p-4 border rounded-lg bg-white ">
                        <div className="flex items-center gap-x-5">
                            <input
                                type="radio"
                                id="public"
                                name="joinType"
                                value="public"
                                checked={selectedJoinType === 'public'}
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
                                value="private"
                                checked={selectedJoinType === 'private'}
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

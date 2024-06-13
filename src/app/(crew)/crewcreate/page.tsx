'use client'

import Album from '@/components/images/Album'
import Folder from '@/components/images/Folder'
import Location from '@/components/images/Location'
import CrewImage from '@/components/images/crewImage'
import { useEffect, useState } from 'react'

interface HobbyType {
    hobbyId: number
    hobbyName: string
}
interface AddressType {
    regionId: string
    addressName: string
}
function CrewCreate() {
    const [addressOpen, setAddressOpen] = useState(false)
    const [hobbyOpen, setHobbyOpen] = useState(false)
    const [selectedAddress, setSelectedAddress] = useState<string | null>(null)
    const [selectedHobby, setSelectedHobby] = useState<string | null>(null)
    const [hobby, setHobby] = useState<HobbyType[]>([])
    const [address, setAddress] = useState<AddressType[]>([])
    const [crewName, setCrewName] = useState('')
    const [crewNameValue, setCrewNameValue] = useState('')
    const [crewDescription, setCrewDescription] = useState('')
    const [crewDescriptionValue, setCrewDescriptionValue] = useState('')
    const [inputHashTag, setInputHashTag] = useState('')
    const [hashTags, setHashTags] = useState<string[]>([])
    const [selectedJoinType, setSelectedJoinType] = useState<string>('public')

    const handleAddressClick = (addressName: string) => {
        setSelectedAddress(addressName)
        setAddressOpen(false)
    }
    const handleHobbyClick = (hobbyName: string) => {
        setSelectedHobby(hobbyName)
        setHobbyOpen(false)
    }
    const handleCrewName = (event: React.ChangeEvent<HTMLInputElement>) => {
        const crewName = event.target.value
        setCrewName(crewName)
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
    }

    useEffect(() => {
        const getHobby = async () => {
            try {
                const response = await fetch(`${process.env.BASE_URL}/survey-service/v1/users/hobbies`, {
                    headers: {
                        Uuid: 'uuid1234',
                    },
                })
                if (response.ok) {
                    const data = await response.json()
                    setHobby(data.data)
                } else {
                    console.error('error')
                }
            } catch (error) {
                console.error(error)
            }
        }
        getHobby()
    }, [])
    console.log(hobby)
    useEffect(() => {
        const getAddress = async () => {
            try {
                const response = await fetch(`${process.env.BASE_URL}/crew-service/v1/users/region/address-names`, {
                    headers: {
                        Uuid: 'uuid1234',
                    },
                })
                if (response.ok) {
                    const data = await response.json()
                    setAddress(data.data)
                } else {
                    console.error('error')
                }
            } catch (error) {
                console.error(error)
            }
        }
        getAddress()
    }, [])

    return (
        <div className="flex flex-col items-center space-y-4  p-4">
            <div className="relative w-40 bg-red-400">
                <CrewImage />
                <div className="absolute bottom-2 right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center">
                    <div>
                        <label htmlFor="inputFile">
                            <div className="w-5">
                                <Album />
                            </div>
                        </label>
                        <input type="file" id="inputFile" style={{ display: 'none' }} />
                    </div>
                </div>
            </div>

            <div className="flex justify-center gap-x-2 w-full">
                <div className="flex items-center justify-center">
                    <Location width="30" height="35" />
                </div>
                <div className="flex w-full">
                    <button
                        className="w-full border-[1px] px-5 py-2.5 flex items-center justify-center whitespace-nowrap border-hobbing-gray"
                        type="button"
                        onClick={() => setAddressOpen(!addressOpen)}
                    >
                        {selectedAddress || '활동지역'}
                        <svg
                            className="w-2.5 h-2.5 ml-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 6"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 4 4 4-4"
                            />
                        </svg>
                    </button>
                    {addressOpen && (
                        <div id="dropdown" className="z-10 bg-white rounded-lg shadow  border absolute mt-12  ">
                            <div>
                                {address.map((address) => (
                                    <div key={address.regionId}>
                                        <ul className="py-2 text-sm text-gray-700 ">
                                            <li>
                                                <span
                                                    className="block px-4 py-2 hover:bg-gray-100"
                                                    onClick={() => handleAddressClick(address.addressName)}
                                                >
                                                    {address.addressName}
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex items-center justify-center">
                    <div className="w-[30px]">
                        <Folder isActive={true} />
                    </div>
                </div>
                <div className="flex w-full">
                    <button
                        className="w-full border-[1px] px-5 py-2.5 flex items-center justify-center whitespace-nowrap border-hobbing-gray"
                        type="button"
                        onClick={() => setHobbyOpen(!hobbyOpen)}
                    >
                        {selectedHobby || '추천취미'}
                        <svg
                            className="w-2.5 h-2.5 ml-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 6"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 4 4 4-4"
                            />
                        </svg>
                    </button>
                    {hobbyOpen && (
                        <div id="dropdown" className=" z-10 bg-white rounded-lg shadow w-40 border absolute mt-12">
                            <div>
                                {hobby.map((hobby) => (
                                    <div key={hobby.hobbyId}>
                                        <ul className="py-2 text-sm text-gray-700">
                                            <li>
                                                <span
                                                    className="block px-4 py-2 hover:bg-gray-100"
                                                    onClick={() => handleHobbyClick(hobby.hobbyName)}
                                                >
                                                    {hobby.hobbyName}
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="w-full h-auto space-y-3">
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
                        className={`w-full h-[100px] p-3 rounded-xl border-[1px] flex flex-row justify-center outline-none
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
        </div>
    )
}
export default CrewCreate

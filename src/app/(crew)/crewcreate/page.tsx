'use client'

import Album from '@/components/images/Album'
import CrewImage from '@/components/images/crewImage'
import { useState } from 'react'

function CrewCreate() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [selectedOption, setSelectedOption] = useState('')

    const handleOptionClick = (option: string) => {
        setSelectedOption(option)
        setIsDropdownOpen(false)
    }

    return (
        <div className="flex flex-col items-center space-y-4  p-4">
            <div className="relative w-1/2 bg-red-400">
                <CrewImage />
                <div className="absolute bottom-2 right-2 w-5 bg-red-500  rounded-full">
                    <Album />
                </div>
            </div>

            <input type="file" />
            <button
                id="dropdownDefaultButton"
                className="text-white bg-blue-700 hover:bg-blue-500  px-5 py-2.5 text-center inline-flex items-center "
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
                {selectedOption || '활동지역'}
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

            {isDropdownOpen && (
                <div
                    id="dropdown"
                    className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                >
                    <ul
                        className="py-2 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownDefaultButton"
                    >
                        <li>
                            <a
                                href="#"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={() => handleOptionClick('Dashboard')}
                            >
                                Dashboard
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={() => handleOptionClick('Settings')}
                            >
                                Settings
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={() => handleOptionClick('Earnings')}
                            >
                                Earnings
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={() => handleOptionClick('Sign out')}
                            >
                                Sign out
                            </a>
                        </li>
                    </ul>
                </div>
            )}
            <button
                id="dropdownDefaultButton"
                className="text-white bg-blue-700 hover:bg-blue-500  px-5 py-2.5 text-center inline-flex items-center  "
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
                {selectedOption || '추천취미'}
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

            {isDropdownOpen && (
                <div
                    id="dropdown"
                    className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                >
                    <ul
                        className="py-2 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownDefaultButton"
                    >
                        <li>
                            <a
                                href="#"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={() => handleOptionClick('Dashboard')}
                            >
                                Dashboard
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={() => handleOptionClick('Settings')}
                            >
                                Settings
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={() => handleOptionClick('Earnings')}
                            >
                                Earnings
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={() => handleOptionClick('Sign out')}
                            >
                                Sign out
                            </a>
                        </li>
                    </ul>
                </div>
            )}
            <input type="text" placeholder="소모임 이름" className="border-2 border-gray-300 p-2 flex" />
            <textarea placeholder="소모임 소개글 작성해주세요." className="border-2 border-gray-300 p-2 flex" />
            <div>해시태그</div>
            <input type="text" placeholder="해시태그 입력" className="border-2 border-gray-300 p-2 flex" />
            <div>소모임 가입 형식</div>
            <div>
                <input type="radio" id="public" name="joinType" value="public" />
                <label htmlFor="public">공개</label>
                <input type="radio" id="private" name="joinType" value="private" />
                <label htmlFor="private">비공개</label>
            </div>
        </div>
    )
}
export default CrewCreate

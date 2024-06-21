'use client'
import Location from '@/components/images/Location'
import Folder from '@/components/images/Folder'
import { useEffect, useState } from 'react'
import getRegionNames from '@/api/crew/getRegionNames'
import getHobbies from '@/api/survey/getHobbies'

interface HobbyType {
    hobbyId: number
    hobbyName: string
}
interface AddressType {
    regionId: number
    addressName: string
}
export default function CrewCreateSelect() {
    const [addressOpen, setAddressOpen] = useState(false)
    const [hobbyOpen, setHobbyOpen] = useState(false)
    const [selectedAddress, setSelectedAddress] = useState<{ regionId: number; addressName: string } | null>(null)
    const [selectedHobby, setSelectedHobby] = useState<{ hobbyId: number; hobbyName: string } | null>(null)
    const [hobby, setHobby] = useState<HobbyType[]>([])
    const [address, setAddress] = useState<AddressType[]>([])

    useEffect(() => {
        const getAddress = async () => {
            const address: AddressType[] = await getRegionNames()
            setAddress(address)
        }
        getAddress()
    }, [])

    useEffect(() => {
        const getHobby = async () => {
            const hobby: HobbyType[] = await getHobbies()
            setHobby(hobby)
        }
        getHobby()
    }, [])

    const handleAddressClick = (addressName: string, regionId: number) => {
        setSelectedAddress({ addressName, regionId })
        setAddressOpen(false)
    }
    const handleHobbyClick = (hobbyName: string, hobbyId: number) => {
        setSelectedHobby({ hobbyName, hobbyId })
        setHobbyOpen(false)
    }
    // console.log(selectedAddress, 'address')
    return (
        <section className="flex justify-center gap-x-2 w-full">
            <div className="flex w-full">
                <button
                    className="w-full border-[1px] px-2 py-2.5 flex items-center justify-between  whitespace-nowrap border-hobbing-gray"
                    type="button"
                    onClick={() => setAddressOpen(!addressOpen)}
                >
                    <div className="flex items-center justify-center">
                        <Location width="20" height="25" />
                    </div>
                    <p>{selectedAddress?.addressName || '활동지역'}</p>
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
                {selectedAddress && <input type="hidden" name="regionId" value={selectedAddress.regionId} />}
                {addressOpen && (
                    <div id="dropdown" className="z-10 bg-white rounded-lg shadow  border absolute mt-12 w-[40dvw]  ">
                        <div>
                            {address?.map((address) => (
                                <div key={address.regionId}>
                                    <ul className="py-2 text-sm text-gray-700 ">
                                        <li>
                                            <span
                                                className="block px-4 py-2 hover:bg-gray-100"
                                                onClick={() =>
                                                    handleAddressClick(address.addressName, address.regionId)
                                                }
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

            <div className="flex w-full">
                <button
                    className="w-full border-[1px] px-2 py-2.5 flex items-center justify-between whitespace-nowrap border-hobbing-gray"
                    type="button"
                    onClick={() => setHobbyOpen(!hobbyOpen)}
                >
                    <div className="w-[23px]">
                        <Folder isActive={true} />
                    </div>
                    <p> {selectedHobby?.hobbyName || '추천취미'}</p>
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
                {selectedHobby && <input type="hidden" name="hobbyId" value={selectedHobby.hobbyId} />}
                {hobbyOpen && (
                    <div id="dropdown" className=" z-10 bg-white rounded-lg shadow border absolute mt-12 w-[40dvw] ">
                        <div>
                            {hobby?.map((hobby) => (
                                <div key={hobby.hobbyId}>
                                    <ul className="py-2 text-sm text-gray-700">
                                        <li>
                                            <span
                                                className="block px-4 py-2 hover:bg-gray-100"
                                                onClick={() => handleHobbyClick(hobby.hobbyName, hobby.hobbyId)}
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
        </section>
    )
}

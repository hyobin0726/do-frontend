'use client'
import Location from '@/components/images/Location'
import Folder from '@/components/images/Folder'
import { useState } from 'react'
interface HobbyType {
    hobbyId: number
    hobbyName: string
}
interface AddressType {
    regionId: string
    addressName: string
}
export default function CrewCreateSelect() {
    const [addressOpen, setAddressOpen] = useState(false)
    const [hobbyOpen, setHobbyOpen] = useState(false)
    const [selectedAddress, setSelectedAddress] = useState<string | null>(null)
    const [selectedHobby, setSelectedHobby] = useState<string | null>(null)
    const [hobby, setHobby] = useState<HobbyType[]>([])
    const [address, setAddress] = useState<AddressType[]>([])

    // useEffect(() => {
    //     const getHobby = async () => {
    //         try {
    //             const response = await fetch(`${process.env.BASE_URL}/survey-service/v1/users/hobbies`, {
    //                 headers: {
    //                     Uuid: 'uuid1234',
    //                 },
    //             })
    //             if (response.ok) {
    //                 const data = await response.json()
    //                 setHobby(data.data)
    //             } else {
    //                 console.error('error')
    //             }
    //         } catch (error) {
    //             console.error(error)
    //         }
    //     }
    //     getHobby()
    // }, [])
    // console.log(hobby)
    // useEffect(() => {
    //     const getAddress = async () => {
    //         try {
    //             const response = await fetch(`${process.env.BASE_URL}/crew-service/v1/users/region/address-names`, {
    //                 headers: {
    //                     Uuid: 'uuid1234',
    //                 },
    //             })
    //             if (response.ok) {
    //                 const data = await response.json()
    //                 setAddress(data.data)
    //             } else {
    //                 console.error('error')
    //             }
    //         } catch (error) {
    //             console.error(error)
    //         }
    //     }
    //     getAddress()
    // }, [])

    const handleAddressClick = (addressName: string) => {
        setSelectedAddress(addressName)
        setAddressOpen(false)
    }
    const handleHobbyClick = (hobbyName: string) => {
        setSelectedHobby(hobbyName)
        setHobbyOpen(false)
    }
    return (
        <>
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
        </>
    )
}

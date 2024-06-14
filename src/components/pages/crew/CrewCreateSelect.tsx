'use client'
import Location from '@/components/images/Location'
import Folder from '@/components/images/Folder'
import { useEffect, useState } from 'react'
import { useGetClientToken } from '@/actions/useGetClientToken'
interface HobbyType {
    hobbyId: string
    hobbyName: string
}
interface AddressType {
    regionId: string
    addressName: string
}
export default function CrewCreateSelect({
    onAddressSelect,
    onHobbySelected,
}: {
    onAddressSelect: (addressId: string) => void
    onHobbySelected: (hobbyId: string) => void
}) {
    const auth = useGetClientToken()
    const [addressOpen, setAddressOpen] = useState(false)
    const [hobbyOpen, setHobbyOpen] = useState(false)
    const [selectedAddress, setSelectedAddress] = useState<string | null>(null)
    const [selectedHobby, setSelectedHobby] = useState<string | null>(null)
    const [hobby, setHobby] = useState<HobbyType[]>([])
    const [address, setAddress] = useState<AddressType[]>([])

    useEffect(() => {
        const getHobby = async () => {
            try {
                const response = await fetch(`${process.env.BASE_URL}/survey-service/v1/users/hobbies`, {
                    headers: {
                        Authorization: `${auth.token}`,
                        'Content-Type': 'application/json',
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
    // console.log(hobby)
    useEffect(() => {
        const getAddress = async () => {
            try {
                const response = await fetch(`${process.env.BASE_URL}/crew-service/v1/users/region/address-names`, {
                    headers: {
                        Authorization: `${auth.token}`,
                        'Content-Type': 'application/json',
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

    const handleAddressClick = (addressName: string, regionId: string) => {
        setSelectedAddress(addressName)
        onAddressSelect(regionId)
        setAddressOpen(false)
    }
    const handleHobbyClick = (hobbyName: string, hobbyId: string) => {
        setSelectedHobby(hobbyName)
        onHobbySelected(hobbyId)
        setHobbyOpen(false)
    }
    // console.log(selectedAddress, 'address')
    return (
        <>
            <div className="flex justify-center gap-x-2 w-full">
                <div className="flex w-full">
                    <button
                        className="w-full border-[1px] px-2 py-2.5 flex items-center justify-between  whitespace-nowrap border-hobbing-gray"
                        type="button"
                        onClick={() => setAddressOpen(!addressOpen)}
                    >
                        <div className="flex items-center justify-center">
                            <Location width="20" height="25" />
                        </div>
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
                        <div
                            id="dropdown"
                            className="z-10 bg-white rounded-lg shadow  border absolute mt-12 w-[40dvw]  "
                        >
                            <div>
                                {address.map((address) => (
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
                <div className="flex items-center justify-center"></div>
                <div className="flex w-full">
                    <button
                        className="w-full border-[1px] px-2 py-2.5 flex items-center justify-between whitespace-nowrap border-hobbing-gray"
                        type="button"
                        onClick={() => setHobbyOpen(!hobbyOpen)}
                    >
                        <div className="w-[23px]">
                            <Folder isActive={true} />
                        </div>
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
                        <div
                            id="dropdown"
                            className=" z-10 bg-white rounded-lg shadow border absolute mt-12 w-[40dvw] "
                        >
                            <div>
                                {hobby.map((hobby) => (
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
            </div>
        </>
    )
}

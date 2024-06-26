'use client'

import { useState, useEffect, use } from 'react'
import Link from 'next/link'

import getNewCrew from '@/api/crew/getNewCrew'
import SquidMonster from '@/components/images/monsters/SquidMonster '

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

import { Pagination } from 'swiper/modules'
import Location from '@/components/images/Location'
import HomeNewCrewFreeJoinModal from './HomeNewCrewFreeJoinModal'
import HomeNewCrewFormJoinModal from './HomeNewCrewFormJoinModal'

interface HobbyType {
    hobbyId: number
    hobbyName: string
    description: string
    imageUrl: string
    fitRate: number
}

interface baseRegion {
    regionId: number
    addressName: string
}

interface crewInfo {
    crewId: number
    crewName: string
    addressName: string
    currentParticipant: number
    joinType: number
    profileUrl: string
    hashTagList: string[]
}

export default function HomeSection2({
    hobbies,
    baseRegion,
    newCrew,
}: {
    hobbies: HobbyType[]
    baseRegion: baseRegion
    newCrew: crewInfo[]
}) {
    const [focusedHobbyId, setFocusedHobbyId] = useState<number>(hobbies[0].hobbyId)
    const [focysedHobbyIdx, setFocysedHobbyIdx] = useState<number>(0)
    const [newCrewInfo, setNewCrewInfo] = useState<crewInfo[]>(newCrew)
    const [isFreeJoinModalOpen, setIsFreeJoinModalOpen] = useState<boolean>(false)
    const [isFormJoinModalOpen, setIsFormJoinModalOpen] = useState<boolean>(false)
    const [joinModalCrewId, setJoinModalCrewId] = useState<number>(0)
    const [joinModalCrewName, setJoinModalCrewName] = useState<string>('')

    const tempImageUrl = 'https://hobbiedo-bucket.s3.ap-northeast-2.amazonaws.com/image_1718327243910_crew.png'

    const JoinModalController = (joinType?: 'free' | 'form', crewId?: number, crewName?: string) => {
        if (!joinType) {
            console.log('다닫아')
            setIsFreeJoinModalOpen(false)
            setIsFormJoinModalOpen(false)
        } else if (joinType === 'free') {
            setIsFreeJoinModalOpen(!isFreeJoinModalOpen)
        } else if (joinType === 'form') {
            setIsFormJoinModalOpen(!isFormJoinModalOpen)
        }

        if (crewId && crewName) {
            console.log('crewId', crewId)
            console.log('crewName', crewName)
            setJoinModalCrewId(crewId)
            setJoinModalCrewName(crewName)
        } else {
            setJoinModalCrewId(0)
            setJoinModalCrewName('')
        }
    }

    useEffect(() => {
        setNewCrewInfo(newCrew)
        setFocusedHobbyId(hobbies[0].hobbyId)
        setFocysedHobbyIdx(0)
        setIsFreeJoinModalOpen(false)
        setIsFormJoinModalOpen(false)
        setJoinModalCrewId(0)
        setJoinModalCrewName('')
    }, [newCrew])

    const fetchData = async () => {
        const res = await getNewCrew(focusedHobbyId, baseRegion.regionId)
        if (res.isSuccess) {
            setNewCrewInfo(res.data)
        }
    }

    useEffect(() => {
        fetchData()
    }, [focusedHobbyId])

    return (
        <>
            <section className="w-full h-[500px]">
                <div className="w-full h-[120px] flex flex-col justify-end px-8">
                    <div className="flex flex-row items-end">
                        <p className="text-black font-extrabold text-[35px] z-[10]">
                            우리동네 <br /> NEW 소모임
                        </p>
                        <div className="w-[50px] h-[50px]">
                            <SquidMonster />
                        </div>
                    </div>
                </div>
                <div className="w-full h-[55px] flex items-center">
                    <div className="w-full h-[35px] space-x-3 flex flex-row px-8 overflow-x-scroll scroll-smooth scrollbar-hide">
                        {hobbies.map((hobby: HobbyType, idx: number) => (
                            <div
                                key={idx}
                                onClick={() => {
                                    setFocusedHobbyId(hobby.hobbyId)
                                    setFocysedHobbyIdx(idx)
                                }}
                                className={`flex-none w-auto px-5 flex justify-center items-center rounded-xl ${focusedHobbyId == hobby.hobbyId ? 'bg-hobbing-red' : 'bg-white border-[1px] border-hobbing-red'} `}
                            >
                                <p
                                    className={`${focusedHobbyId == hobby.hobbyId ? 'text-white' : 'text-hobbing-red '} text-[13px]`}
                                >
                                    {hobby.hobbyName}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-full h-[calc(100%-175px)] flex items-center px-8 py-3">
                    {newCrewInfo.length == 0 ? (
                        <div
                            className="w-full h-full flex-none bg-center bg-cover bg-no-repeat relative rounded-xl overflow-hidden drop-shadow-lg"
                            style={{
                                backgroundImage: hobbies[focysedHobbyIdx].imageUrl.startsWith('https://hobbiedo-bucket')
                                    ? `url(${hobbies[focysedHobbyIdx].imageUrl})`
                                    : `url(${tempImageUrl})`,
                                // backgroundImage: `url(${hobbies[focysedHobbyIdx].imageUrl})`,
                            }}
                        >
                            <div className="relative w-full h-full bg-black/30 backdrop-blur-sm">
                                <div className="absolute top-0 w-full h-full flex flex-col items-center px-6">
                                    <p className="text-white text-[18px] font-medium text-center h-full flex  items-center">
                                        아직 등록된 소모임이 없어요! <br /> 직접 만들어보시겠어요?
                                    </p>
                                    <Link
                                        href={'/crewcreate'}
                                        className="absolute bottom-10 w-1/2 h-[50px] bg-hobbing-red flex justify-center items-center px-5 rounded-full"
                                    >
                                        <p className="text-white text-[15px]">소모임 만들기</p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <Swiper
                            spaceBetween={30}
                            pagination={{
                                clickable: true,
                            }}
                            loop={newCrewInfo.length > 1 ? true : false}
                            modules={[Pagination]}
                            className="w-full h-full drop-shadow-lg"
                        >
                            {newCrewInfo.map((crewInfo: crewInfo, idx: number) => (
                                <SwiperSlide
                                    key={idx}
                                    className="w-full h-[100%] flex-none rounded-xl overflow-hidden bg-white"
                                >
                                    <div
                                        className="w-full h-[60%] flex-none bg-center bg-cover bg-no-repeat relative overflow-hidden text-transparent"
                                        style={{
                                            backgroundImage: `url(${crewInfo.profileUrl})`,
                                        }}
                                    >
                                        crewImage
                                    </div>
                                    <div className="w-full h-[40%] px-4 pt-3 pb-5 flex flex-col">
                                        <div className="w-full h-auto flex flex-row justify-between items-center">
                                            <div className="w-fit flex flex-row space-x-3">
                                                <div className="flex flex-row space-x-1">
                                                    <Location />
                                                    <p className="text-hobbing-red text-[14px] ">
                                                        {crewInfo.addressName}
                                                    </p>
                                                </div>
                                                <div className="flex flex-row space-x-1">
                                                    <svg
                                                        width="20"
                                                        height="16"
                                                        viewBox="0 0 20 16"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M10.5072 6.55242C8.90992 5.31353 8.61939 3.01435 9.85828 1.41707C11.0972 -0.180208 13.3963 -0.470739 14.9936 0.768154C16.5909 2.00705 16.8814 4.30622 15.6425 5.9035C14.4037 7.50078 12.1045 7.79131 10.5072 6.55242ZM19.2597 14.8573C19.2597 15.1752 19.0125 15.4353 18.6999 15.456L18.6999 15.467H6.79991L6.79992 15.456C6.48712 15.4355 6.23975 15.1753 6.23975 14.8573C6.23975 14.2112 6.33422 13.5868 6.51008 12.9973H0.70996C0.674313 13.0039 0.63756 13.0074 0.6 13.0074C0.268629 13.0074 0 12.7387 0 12.4074C0 9.796 2.11863 7.67737 4.73 7.67737C6.37446 7.67737 7.82045 8.51295 8.66757 9.78853C9.78467 8.88728 11.205 8.34729 12.7497 8.34729C16.3411 8.34729 19.2597 11.2659 19.2597 14.8573ZM3.43322 7.00031C2.09944 6.28545 1.5977 4.62468 2.31256 3.2909C3.02743 1.95711 4.68819 1.45537 6.02198 2.17024C7.35576 2.8851 7.8575 4.54586 7.14264 5.87965C6.42777 7.21344 4.76701 7.71517 3.43322 7.00031Z"
                                                            fill="#F76D67"
                                                        />
                                                    </svg>
                                                    <span className="text-hobbing-red text-[14px] ">
                                                        {crewInfo.currentParticipant} / 100
                                                    </span>
                                                </div>
                                            </div>
                                            {crewInfo.joinType == 1 ? (
                                                <button
                                                    onClick={() => {
                                                        JoinModalController('form', crewInfo.crewId, crewInfo.crewName)
                                                    }}
                                                    className="bg-white border-[1px] border-hobbing-red w-fit h-fit px-3 py-2 rounded-lg"
                                                >
                                                    <p className="text-hobbing-red text-[13px]">가입신청</p>
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => {
                                                        JoinModalController('free', crewInfo.crewId, crewInfo.crewName)
                                                    }}
                                                    className="bg-hobbing-red w-fit h-fit px-4 py-2 rounded-lg"
                                                >
                                                    <p className="text-white text-[13px]">가입</p>
                                                </button>
                                            )}
                                        </div>
                                        <p className="text-[30px] font-bold">{crewInfo.crewName}</p>
                                        {crewInfo.hashTagList.length > 0 && (
                                            <div className="flex flex-row space-x-2 items-center text-ellipsis overflow-hidden">
                                                {crewInfo.hashTagList.map((hashTag: string, index: number) => (
                                                    <span key={index} className="text-[13px] flex-none">
                                                        #{hashTag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )}
                </div>
            </section>
            <HomeNewCrewFreeJoinModal
                crewId={joinModalCrewId}
                crewName={joinModalCrewName}
                isModalOpen={isFreeJoinModalOpen}
                modalController={() => {
                    JoinModalController()
                }}
            />
            <HomeNewCrewFormJoinModal
                crewId={joinModalCrewId}
                crewName={joinModalCrewName}
                isModalOpen={isFormJoinModalOpen}
                modalController={() => {
                    JoinModalController()
                }}
            />
        </>
    )
}

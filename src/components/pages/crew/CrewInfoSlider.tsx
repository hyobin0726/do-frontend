import Link from 'next/link'
import RightArrow from '@/components/images/RightArrow'

interface suggestionCrewId {
    crewId: number
    crewName: string
    addressName: string
    introduction: string
    currentParticipant: number
    joinType: number
    profileUrl: string
    hashTagList: string[]
}

export default async function CrewInfoSlider({ suggestionCrewIdList }: { suggestionCrewIdList: suggestionCrewId[] }) {
    return (
        <>
            <section className="w-full h-[50px]">
                <Link
                    href={'/crewcreate'}
                    className="w-full h-full bg-hobbing-red flex justify-between items-center px-5"
                >
                    <p className="text-white text-[11px]">
                        원하시는 소모임이 없으신가요?
                        <br />내 취미에 맞는 소모임을 직접 만들어보세요!
                    </p>
                    <RightArrow />
                </Link>
            </section>
            <section className="w-full h-[calc(100%-100px)]">
                <div
                    className="w-full h-full bg-center bg-cover bg-no-repeat flex items-end"
                    style={{
                        backgroundImage: `url(${suggestionCrewIdList[0].profileUrl})`,
                    }}
                >
                    <div className="w-full h-2/3 bg-gradient-to-t from-black/90 flex flex-col justify-end p-5 space-y-4">
                        <div className="space-y-1">
                            <p className="text-white text-[18px] font-bold">{suggestionCrewIdList[0].crewName}</p>
                            <div className="flex flex-row space-x-3">
                                <svg
                                    width="13"
                                    height="16"
                                    viewBox="0 0 15 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M15 7.5C15 3.35786 11.6421 0 7.5 0C3.35786 0 0 3.35786 0 7.5C0 10.0287 1.3518 12.507 3.58054 14.8596C4.34475 15.6662 5.16131 16.4011 5.97812 17.0516C6.12128 17.1656 6.25947 17.2729 6.39187 17.3735L6.77084 17.6544L7.08397 17.874C7.3359 18.042 7.6641 18.042 7.91602 17.874L8.22916 17.6544L8.60813 17.3735C8.74053 17.2729 8.87872 17.1656 9.02188 17.0516C9.83869 16.4011 10.6553 15.6662 11.4195 14.8596C13.6482 12.507 15 10.0287 15 7.5ZM10.5 7.5C10.5 5.84315 9.15684 4.5 7.49998 4.5C5.84313 4.5 4.49998 5.84315 4.49998 7.5C4.49998 9.15685 5.84313 10.5 7.49998 10.5C9.15684 10.5 10.5 9.15685 10.5 7.5Z"
                                        fill="white"
                                    />
                                </svg>
                                <p className="text-white text-[13px]">{suggestionCrewIdList[0].addressName}</p>
                            </div>
                            <div className="flex flex-row space-x-3">
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
                                        fill="white"
                                    />
                                </svg>
                                <p className="text-white text-[12px]">
                                    {suggestionCrewIdList[0].currentParticipant}/100
                                </p>
                            </div>
                            <p className="text-white text-[12px] text-ellipsis overflow-hidden">
                                {suggestionCrewIdList[0].introduction}
                            </p>
                            {suggestionCrewIdList[0].hashTagList?.length > 0 && (
                                <div className="flex flex-row space-x-3">
                                    {suggestionCrewIdList[0].hashTagList.map((hashTag, index) => (
                                        <span key={index} className="text-white text-[12px] italic font-medium">
                                            #{hashTag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="h-[40px] w-full rounded-xl flex flex-row justify-between items-center px-5 bg-hobbing-red">
                            <p className="text-white text-[13px]">가입하기</p>
                            <RightArrow />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

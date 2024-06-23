import Image from 'next/image'
import MyJoinFormDelete from './MyJoinFormDelete'

interface MyJoinForm {
    joinFormId: string
    crewName: string
    crewUrl: string
    joinMessage: string
    createdAt: string
}

function formatDate(dateString: string) {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}.${month}.${day}`
}

export default function MyJoinForm({ myJoinForms }: { myJoinForms: MyJoinForm[] }) {
    return (
        <>
            <main className="w-full h-[calc(80dvh-60px)] flex flex-col items-center">
                {myJoinForms.length === 0 ? (
                    <section className="w-full h-[calc(80dvh-60px)] flex justify-center items-center">
                        <p className="text-[15px] sm:text-[13px] md:text-[17px] text-text-gray">
                            가입 신청한 소모임이 없습니다.
                        </p>
                    </section>
                ) : (
                    <>
                        <section className="w-full h-auto flex flex-col items-center">
                            {myJoinForms.map((form) => (
                                <div
                                    key={form.joinFormId}
                                    className="w-full h-[120px] flex flex-row justify-between items-center px-5 border-b-[1px]"
                                >
                                    <div className="w-[80px] h-[80px] flex justify-center">
                                        <Image
                                            src={form.crewUrl}
                                            alt="크루 로고"
                                            width={80}
                                            height={80}
                                            className="object-cover rounded-lg"
                                            priority={true}
                                        />
                                    </div>
                                    <div className="w-[calc(100%-100px)] h-[80px] flex flex-col justify-between">
                                        <p className="font-bold text-[15px] sm:text-[13px] md:text-[17px] w-full border-b-[1px] pb-1">
                                            {form.crewName}
                                        </p>
                                        <div className="flex flex-row justify-between h-full">
                                            <div className="flex flex-col w-[80%] h-full justify-evenly">
                                                <div className="flex flex-row items-center w-full space-x-2">
                                                    <div>
                                                        <svg
                                                            width="18"
                                                            height="18"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M21.6632 7.93127C21.1374 6.67626 20.3724 5.53554 19.4109 4.57268C18.4523 3.60816 17.3135 2.8413 16.0593 2.31565C14.7745 1.77454 13.3941 1.49718 12 1.50002H11.9531C10.5351 1.50705 9.16403 1.7883 7.87262 2.34143C6.6292 2.87247 5.50115 3.64069 4.55153 4.60315C3.59933 5.56384 2.8431 6.70057 2.32496 7.95002C1.78711 9.24931 1.51458 10.6431 1.5234 12.0492C1.53043 13.6758 1.91949 15.2906 2.64606 16.7344V20.2969C2.64606 20.8922 3.12887 21.375 3.72184 21.375H7.27965C8.73013 22.107 10.3308 22.4921 11.9554 22.5H12.0047C13.4062 22.5 14.7632 22.2281 16.0429 21.6961C17.2908 21.1767 18.4253 20.4188 19.3828 19.4649C20.3484 18.5063 21.1078 17.386 21.6398 16.1367C22.1906 14.843 22.4718 13.4672 22.4789 12.0469C22.4836 10.6196 22.207 9.2344 21.6632 7.93127ZM7.32184 13.125C6.70309 13.125 6.19918 12.6211 6.19918 12C6.19918 11.3789 6.70309 10.875 7.32184 10.875C7.94059 10.875 8.44449 11.3789 8.44449 12C8.44449 12.6211 7.94293 13.125 7.32184 13.125ZM12 13.125C11.3812 13.125 10.8773 12.6211 10.8773 12C10.8773 11.3789 11.3812 10.875 12 10.875C12.6187 10.875 13.1226 11.3789 13.1226 12C13.1226 12.6211 12.6187 13.125 12 13.125ZM16.6781 13.125C16.0593 13.125 15.5554 12.6211 15.5554 12C15.5554 11.3789 16.0593 10.875 16.6781 10.875C17.2968 10.875 17.8007 11.3789 17.8007 12C17.8007 12.6211 17.2968 13.125 16.6781 13.125Z"
                                                                fill="#F76D67"
                                                            />
                                                        </svg>
                                                    </div>
                                                    <p className="text-[13px] sm:text-[11px] md:text-[15px] text-ellipsis overflow-hidden">
                                                        {form.joinMessage}
                                                    </p>
                                                </div>
                                                <p className="text-[10px] sm:text-[9px] md:text-[13px] text-hobbing-red">
                                                    신청일 : {formatDate(form.createdAt)}
                                                </p>
                                            </div>
                                            <div className="w-[20%] h-full px-1 flex items-center">
                                                <MyJoinFormDelete joinFormId={form.joinFormId} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </section>
                        <section className="w-full h-[100px] flex justify-center items-center px-5">
                            <p className="text-[10px] sm:text-[9px] md:text-[11px] text-hobbing-red">
                                신청일로부터 10일 이내에 가입 승인이 이루어지지 않으면 자동으로 취소됩니다.
                            </p>
                        </section>
                    </>
                )}
            </main>
        </>
    )
}

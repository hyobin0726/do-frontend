import Image from 'next/image'
import profile from '@/assets/images/profile.jpeg'

export default function ChatMessage() {
    return (
        <section className="bg-gray-200 h-[100vh] ">
            <div className=" px-2 py-1">
                <div className="flex justify-center ">2024년 5월 9일 목요일</div>
                <div className="flex mb-4 justify-end mt-2">
                    <div className="text-gray-500 text-sm mr-2 self-end">12:34 PM</div>
                    <div className="bg-gray-500 text-white py-2 px-4 rounded-lg">안녕하세요!</div>
                </div>
                <div className="mb-4">
                    <div className="flex items-center">
                        <Image src={profile} alt="프로필 사진" width={40} height={40} className="rounded-full " />
                        <p className="text-sm text-gray-600 ml-2">사용자1</p>
                    </div>
                    <div className="flex mt-2 ml-2">
                        <div className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg">안녕하세요! 반가워요.</div>
                        <div className="text-gray-500 text-sm ml-2 self-end">12:35 PM</div>
                    </div>
                </div>
            </div>
        </section>
    )
}

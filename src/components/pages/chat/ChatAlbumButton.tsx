import Album from '@/components/images/Album'
import RightArrow from '@/components/images/RightArrow'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function ChatAlbumButton({ crewId }: { crewId: string }) {
    const router = useRouter()
    return (
        <Link href={`/chatimglist/${crewId}`} className="flex flex-row justify-between items-center space-x-2 w-full">
            <div className="flex ">
                <div className="w-5">
                    <Album />
                </div>
                <p className="text-[#869AA9] ml-2">사진</p>
            </div>
            <RightArrow width={15} height={15} color="#FF8595" />
        </Link>
    )
}

'use client'
import Link from 'next/link'
import { MainNavigationData } from '@/lib/MainNavigation'
import { usePathname } from 'next/navigation'
const MainNavigation = () => {
    const pathname = usePathname()

    return (
        <nav className="z-[1] fixed bottom-0 w-full ">
            <div className="flex flex-2  justify-around items-center p-2">
                {MainNavigationData.map((item) => {
                    const isActive = pathname === item.url
                    const activeColor = isActive ? 'text-[#F76D67]' : 'text-[#7A849C]'

                    return (
                        <div key={item.id}>
                            <Link href={item.url} className="flex flex-col items-center ">
                                <div className="w-6">
                                    <item.icon isActive={isActive} />
                                </div>
                                <div className={`mt-1 whitespace-nowrap text-xs ${activeColor}`}>{item.title}</div>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </nav>
    )
}

export default MainNavigation

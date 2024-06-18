'use client'
import Link from 'next/link'
import { MainNavigationData } from '@/lib/MainNavigation'
import { usePathname } from 'next/navigation'
const MainNavigation = () => {
    const pathname = usePathname()

    return (
        <nav className="bg-white z-[1000] fixed bottom-0 w-full h-[60px]">
            <div className="flex flex-2  justify-around items-center p-2">
                {MainNavigationData.map((item) => {
                    let isActive = false

                    if (pathname === item.url) {
                        isActive = true
                    } else if (item.url === '/boardlist' && pathname.startsWith('/boardlist')) {
                        isActive = true
                    }
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

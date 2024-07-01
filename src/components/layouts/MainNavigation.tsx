'use client'
import Link from 'next/link'
import { MainNavigationData } from '@/lib/MainNavigation'
import { usePathname } from 'next/navigation'
const MainNavigation = () => {
    const pathname = usePathname()

    return (
        <nav className="bg-white z-[1000] fixed bottom-0 w-full h-[80px]">
            <div className="flex justify-around items-center py-3 px-1">
                {MainNavigationData.map((item) => {
                    let isActive = false
                    if (pathname === item.url) {
                        isActive = true
                    } else if (item.url === '/boardlist' && pathname.startsWith('/boardlist')) {
                        isActive = true
                    } else if (item.url === '/crew?hobbyId=' && pathname.startsWith('/crew')) {
                        isActive = true
                    }
                    const activeColor = isActive ? 'text-[#F76D67]' : 'text-[#7A849C]'

                    return (
                        <div key={item.id} className="w-1/6">
                            <Link
                                href={item.url}
                                passHref
                                scroll={false}
                                className="flex flex-col justify-center items-center"
                            >
                                <div className="w-6">
                                    <item.icon isActive={isActive} />
                                </div>
                                <div className={`mt-1 whitespace-nowrap text-sm  ${activeColor}`}>{item.title}</div>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </nav>
    )
}

export default MainNavigation

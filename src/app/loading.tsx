import HOBBINGLogo from '@/components/images/HOBBINGLogo'
import Monster1 from '@/components/images/monsters/Monster1'

export default function Loading() {
    return (
        <main className="w-full h-dvh bg-hobbing-bg-pink px-10 flex flex-col justify-between space-y-10">
            <section className="w-full h-[50dvh] flex justify-center items-end">
                <div className="w-2/3 h-2/3 mb-10">
                    <HOBBINGLogo />
                </div>
            </section>
            <section className="w-full h-[30dvh] overflow-hidden flex justify-center relative">
                <div className="w-full h-full absolute -bottom-10">
                    <Monster1 />
                </div>
            </section>
        </main>
    )
}

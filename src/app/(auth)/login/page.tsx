import MainLogin from '@/components/pages/login/MainLogin'

export default function LoginPage({ searchParams }: { searchParams: { [key: string]: string } }) {
    const error = searchParams.error ? true : false

    return (
        <main className="w-full h-svh bg-hobbing-bg-pink px-10">
            <MainLogin loginError={error} />
        </main>
    )
}

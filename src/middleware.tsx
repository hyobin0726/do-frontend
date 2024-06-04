import { withAuth } from 'next-auth/middleware'
import { pages } from 'next/dist/build/templates/app-page'

export default withAuth({
    pages: {
        signIn: '/login',
        error: '/error',
    },
})
// `withAuth` augments your `Request` with the user's token.

export const config = {
    macher: ['/', '/*'],
}

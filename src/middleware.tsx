import withAuth from 'next-auth/middleware';
import { pagesOptions } from './app/api/auth/[...nextauth]/page-options';

export default withAuth({
  pages: {
    ...pagesOptions,
  },
});

export const config = {
  // restricted routes
  matcher: [
    '/',
    '/:path*',
  ],
};

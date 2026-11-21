import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // next-intl rewrites default-locale URLs through /en for the [locale] route.
  // Skip that internal destination so it cannot redirect back to the same public URL.
  matcher: ['/((?!api|_next|_vercel|en(?:/|$)|.*\\..*).*)'],
};

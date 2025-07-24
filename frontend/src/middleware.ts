import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { jwtDecode } from 'jwt-decode';
import { ROUTES, STORAGE_KEYS } from './lib/constants';

export type JWTPayload = {
  sub: string;
  email?: string;
  role?: string;
  exp: number;
  iat: number;
};

const AUTH_ROUTES = [ROUTES.AUTH.LOGIN, ROUTES.AUTH.SIGNUP];

const PUBLIC_ROUTES = [ROUTES.HOME];

const IGNORE_ROUTES = [
  '/_next/static',
  '/_next/image',
  '/favicon.ico',
  '/robots.txt',
  '/sitemap.xml',
  '/public/',
  '/fonts/',
];

const PROTECTED_ROUTES = [ROUTES.DASHBOARD, ROUTES.ANALYTICS, ROUTES.TASKS];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(STORAGE_KEYS.USER_ACCESS_TOKEN)?.value;

  console.log('token ', token);

  // static files and internal routes
  if (
    pathname.startsWith('/public/') ||
    IGNORE_ROUTES.some((route) => pathname.startsWith(route)) ||
    pathname.match(/\.(png|jpg|jpeg|gif|svg|ico|css|js|webp|otf)$/)
  ) {
    return NextResponse.next();
  }

  //public routes (always accessible)
  if (PUBLIC_ROUTES.some((route) => pathname === route)) {
    if (token && isTokenValid(token)) {
      return NextResponse.redirect(new URL(ROUTES.DASHBOARD, request.url));
    }
    return NextResponse.redirect(new URL(ROUTES.HOME, request.url));
  }

  // authentication routes
  if (AUTH_ROUTES.some((route) => pathname.startsWith(route))) {
    if (token && isTokenValid(token)) {
      return NextResponse.redirect(new URL(ROUTES.DASHBOARD, request.url));
    }
    return NextResponse.next();
  }

  //protected routes
  if (PROTECTED_ROUTES.some((route) => pathname.startsWith(route))) {
    console.log('routes ', token);
    if (!token || !isTokenValid(token)) {
      return NextResponse.redirect(new URL(ROUTES.AUTH.LOGIN, request.url));
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

function isTokenValid(token: string): boolean {
  try {
    const decoded = jwtDecode<JWTPayload>(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp > currentTime;
  } catch {
    return false;
  }
}

// Middleware matcher configuration
export const config = {
  matcher: [
    // Match all routes except API routes and static files
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

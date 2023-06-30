import { URL } from 'next/dist/compiled/@edge-runtime/primitives/url';
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value;
  const userFirstName = request.cookies.get('userFirstName')?.value;
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!token) return NextResponse.redirect(new URL('/', request.url));
    NextResponse.next();
  }
  if (request.nextUrl.pathname.startsWith('/login')) {
    if (token) return NextResponse.redirect(new URL('/dashboard', request.url));
    NextResponse.next();
  }
  // if (request.nextUrl.pathname.startsWith('/checkout')) {
  //   if (!userFirstName) {
  //     return NextResponse.redirect(new URL('/login', request.url));
  //   } else if (userFirstName) {
  //     return NextResponse.next();
  //   }
  // }
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};

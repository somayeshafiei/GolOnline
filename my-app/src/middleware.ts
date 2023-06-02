import { URL } from 'next/dist/compiled/@edge-runtime/primitives/url';
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value;
  if (request.nextUrl.pathname.startsWith('/adminPanel')) {
    if (!token) return NextResponse.redirect(new URL('/', request.url));
    NextResponse.next();
  }
  if (request.nextUrl.pathname.startsWith('/login')) {
    if (token)
      return NextResponse.redirect(new URL('/adminPanel', request.url));
    NextResponse.next();
  }
}

export const config = {
  matcher: ['/adminPanel', '/login'],
};

import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Hide navbar and footer on auth pages
  if (pathname.startsWith('/auth')) {
    // Add data attribute to body for CSS targeting
    const response = NextResponse.next({
      request,
      headers: {
        'x-hide-navbar-footer': 'true',
      },
    });
    
    return response;
  }
  
  return NextResponse.next({
    request,
  });
}

export const config = {
  matcher: ['/auth/:path*'],
};
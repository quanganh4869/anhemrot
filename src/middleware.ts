import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  // Protect Admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!token) {
      // Not authenticated, redirect to login
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
    // We let the frontend AuthStore handle role-based redirection to avoid querying the backend on every request from Edge Middleware.
    // However, if we wanted strict edge protection, we could decode the JWT here (without verifying signature if it's edge) and check role.
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};

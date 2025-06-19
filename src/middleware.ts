import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define public routes that don't require authentication
const publicRoutes = ['/login', '/register', '/forgot-password']
const onboardingRoutes = ['/onboarding']

export function middleware(request: NextRequest) {
  const userDataCookie = request.cookies.get('user_data')?.value
  const { pathname } = request.nextUrl

  let userData = null;
  if (userDataCookie) {
    try {
      userData = JSON.parse(userDataCookie);
    } catch (e) {
      console.error("Failed to parse user data cookie:", e);
      // Optionally clear the invalid cookie
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('user_data');
      return response;
    }
  }


  // If user is logged in, prevent access to login/register/forgot-password pages
  if (userData && publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // If user is not logged in and trying to access protected routes (like dashboard or onboarding),
  // redirect to login.
  const protectedRoutes = ['/dashboard', ...onboardingRoutes];
  if (!userData && protectedRoutes.some(route => pathname.startsWith(route))) {
      return NextResponse.redirect(new URL('/login', request.url));
  }

  // If user is logged in but onboarding is not completed, redirect to onboarding
  // unless they are already on an onboarding route
  // if (userData && !userData.onboardingCompleted && !onboardingRoutes.some(route => pathname.startsWith(route))) {
  //   return NextResponse.redirect(new URL('/partner/onboarding', request.url));
  // }

  return NextResponse.next()
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/onboarding/:path*',
    '/login',
    '/register',
    '/forgot-password'
  ]
} 
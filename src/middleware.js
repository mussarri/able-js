import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function middleware(req) {
  const token = req.cookies.get('token')?.value;
  // Login/Register hariç her sayfa auth istiyor
  const isPublicPath =
    req.nextUrl.pathname.startsWith('/login') ||
    req.nextUrl.pathname.startsWith('/register') ||
    req.nextUrl.pathname.startsWith('/register-therapist');

  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (token) {
    try {
      // Role endpoint'inden doğrulama (opsiyonel)
      const meRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const me = await meRes.json();

      if (req.nextUrl.pathname.startsWith('/user') && me.data.role !== 3) {
        return NextResponse.redirect(new URL('/error?type=unauthorized', req.url));
      }
      if (req.nextUrl.pathname.startsWith('/therapist') && me.data.role !== 2) {
        return NextResponse.redirect(new URL('/error?type=unauthorized', req.url));
      }
      if (req.nextUrl.pathname.startsWith('/admin') && me.data.role !== 1) {
        return NextResponse.redirect(new URL('/error?type=unauthorized', req.url));
      }
    } catch (err) {
      console.error('Auth error:', err);
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  // '/nopage'
  matcher: ['/((?!api|_next/static|favicon.ico).*)'] // api rotalarını exclude et
};

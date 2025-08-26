import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function middleware(req) {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;

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
        headers: {
          Authorization: `Bearer ${token}`
        },
        cache: 'no-store' // her seferinde güncel veri çekmek için
      });

      let me = null;

      if (!meRes.ok) {
        return NextResponse.redirect(new URL('/login', req.url));
      }

      try {
        me = await meRes.json();
      } catch (err) {
        console.error('Invalid JSON response from /me:', err);
        return NextResponse.redirect(new URL('/login', req.url));
      }

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

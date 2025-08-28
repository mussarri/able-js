import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { Next } from '@wandersonalwes/iconsax-react';

export async function middleware(req) {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;

  // Login/Register hariç her sayfa auth istiyor

  const meRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    cache: 'no-store' // her seferinde güncel veri çekmek için
  });

  let me = null;

  const publicPaths = ['/login', '/register', '/register-therapist', '/forgot-password'];

  if (publicPaths.some((path) => req.nextUrl.pathname.startsWith(path))) {
    return NextResponse.next(); // Public path ise middleware'i geç
  }

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // token varsa ve API fetch başarısızsa
  if (!meRes.ok) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (token) {
    try {
      // Role endpoint'inden doğrulama (opsiyonel)

      try {
        me = await meRes.json();
        if (me.data.boardLevel < 6) return NextResponse.redirect(new URL('/login', req.url));
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

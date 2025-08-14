import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function middleware(req) {
  const token = req.cookies.get('token')?.value;
  console.log('middleware');

  // Login/Register hariç her sayfa auth istiyor
  const isPublicPath = req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname.startsWith('/register');

  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (token) {
    try {
      // Burada sadece decode yapıyoruz (secret istemiyorsan jwt.decode kullan)
      const decoded = jwt.decode(token);

      // Role endpoint'inden doğrulama (opsiyonel)
      const meRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const me = await meRes.json();

      // Role bazlı koruma
      if (req.nextUrl.pathname.startsWith('/therapist') && me.role !== 'therapist') {
        return NextResponse.redirect(new URL('/maintenance/401', req.url));
      }
      if (req.nextUrl.pathname.startsWith('/admin') && me.role !== 'admin') {
        return NextResponse.redirect(new URL('/maintenance/401', req.url));
      }
    } catch (err) {
      console.error('Auth error:', err);
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/nopage'
    // '/((?!_next/static|_next/image|favicon.ico).*)' // tüm sayfaları kapsa
  ]
};

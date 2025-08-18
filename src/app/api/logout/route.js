import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;
  const logout = await fetch(process.env.API_URL + 'api/Auth/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
  });

  if (!logout.ok) {
    return NextResponse.json({ message: 'Çıkış yapılamadı' });
  }
  const response = NextResponse.json({ message: 'Çıkış yapıldı' });
  // Token cookie'yi sil
  response.cookies.set('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 0 // hemen geçersiz
  });

  return response;
}

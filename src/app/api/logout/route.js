import { NextResponse } from 'next/server';

export async function POST() {
  const logout = await fetch(process.env.API_URL + 'api/auth/logout', { method: 'POST' });
  console.log(logout);

  if (logout?.data?.success != true) {
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

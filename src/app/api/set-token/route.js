import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req) {
  console.log('reg');

  const { token } = await req.json();

  cookies().set({
    name: 'token',
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/'
  });

  return NextResponse.json({ success: true });
}

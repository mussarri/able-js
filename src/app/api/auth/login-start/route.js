import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { phoneNumber } = await req.json();
    // 1. Backend API’ye istek at
    const res = await fetch(`${process.env.API_URL}api/Auth/start-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phoneNumber })
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const data = await res.json();
    // Beklenen response örneği: { token: 'jwt...', role: 'admin' }
    const {
      data: { isExistingUser, boardLevel, token, message }
    } = data;

    console.log(data);

    if (!isExistingUser) {
      return NextResponse.json({ isExistingUser: false });
    }

    // 2. Token + role cookie yaz
    // if (token) {
    //   const cookie = await cookies();
    //   cookie.set('token', token, {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === 'production',
    //     sameSite: 'strict',
    //     path: '/'
    //   });
    // }

    if (boardLevel !== 6) {
      throw new Error(message);
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

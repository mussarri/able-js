import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { phoneNumber, password } = await req.json();
    // 1. Backend API’ye istek at
    const res = await fetch(`${process.env.API_URL}api/Auth/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phoneNumber, password })
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const data = await res.json();
    // Beklenen response örneği: { token: 'jwt...', role: 'admin' }
    const { data: token } = data;

    // 2. Token + role cookie yaz
    const cookie = await cookies();
    cookie.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/'
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

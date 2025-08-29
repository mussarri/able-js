import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;

  try {
    const { newPassword, phoneNumber } = await req.json();
    // 1. Backend API’ye istek at
    const res = await fetch(`${process.env.API_URL}api/Auth/set-new-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ phoneNumber, newPassword, confirmedNewPassword: newPassword })
    });

    console.log(res);

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: data.message }, { status: 401 });
    }

    const cookie = await cookies();
    cookie.set('token', data.data.token, {
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

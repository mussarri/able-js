import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;

  try {
    const { password } = await req.json();
    // 1. Backend API’ye istek at
    const res = await fetch(`${process.env.API_URL}api/Auth/set-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ password })
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

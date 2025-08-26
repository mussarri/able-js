import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;
  try {
    // 1. Backend API’ye istek at
    const res = await fetch(`${process.env.API_URL}api/Auth/me`, {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const data = await res.json();
    // Beklenen response örneği: { token: 'jwt...', role: 'admin' }

    return NextResponse.json({ success: true, data: data });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

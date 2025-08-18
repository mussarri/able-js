import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;

  try {
    const { firstName, lastName, userName, birthDate, gender } = await req.json();
    // 1. Backend API’ye istek at
    const res = await fetch(`${process.env.API_URL}api/Auth/set-user-info`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        firstName: 'string',
        lastName: 'string',
        userName: 'string',
        birthDate: '2025-08-16T17:35:39.099Z',
        gender: 0
      })
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

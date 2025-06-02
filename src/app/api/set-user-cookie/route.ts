import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { userData } = await req.json();

  const response = NextResponse.json({ success: true });

  response.cookies.set({
    name: 'user_data',
    value: JSON.stringify(userData),
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 10, // 10 days
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });

  return response;
}

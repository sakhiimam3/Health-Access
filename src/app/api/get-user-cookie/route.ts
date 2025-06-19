import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const cookieHeader = req.headers.get('cookie');
  let userData = null;
  
  if (cookieHeader) {
    const cookies = cookieHeader.split(';').map(cookie => cookie.trim());
    const userDataCookie = cookies.find(cookie => cookie.startsWith('user_data='));
    
    if (userDataCookie) {
      try {
        const encodedValue = userDataCookie.split('=')[1];
        const decodedValue = decodeURIComponent(encodedValue);
        userData = JSON.parse(decodedValue);
      } catch (error) {
        console.error('Error parsing user data cookie:', error);
      }
    }
  }

  return NextResponse.json({ userData });
} 
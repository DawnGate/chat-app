import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest, response: NextResponse) {
  // init data
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  // get session data
  const session = request.cookies.get('session');

  if (!session) {
    return NextResponse.redirect(new URL('/login', baseUrl));
  }

  const responseAPI = await fetch(`${baseUrl}/api/login`, {
    headers: {
      Cookie: `session=${session?.value}`,
    },
  });

  if (responseAPI.status !== 200) {
    return NextResponse.redirect(new URL('/login', baseUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/chat', '/chat/:chatId*'],
};

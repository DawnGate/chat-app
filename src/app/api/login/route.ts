import { auth } from 'firebase-admin';

import { NextRequest, NextResponse } from 'next/server';
import { headers, cookies } from 'next/headers';

import firebaseAdminInitApp from '@/lib/firebase-admin-config';
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

firebaseAdminInitApp();

export async function POST(request: NextRequest, response: NextResponse) {
  const authorization = headers().get('Authorization');
  if (authorization?.startsWith('Bearer')) {
    const idToken = authorization.split('Bearer ')[1];
    const decodedToken = await auth().verifyIdToken(idToken);

    const isProduction = process.env.NODE_ENV === 'production';

    if (decodedToken) {
      const expiresIn = 60 * 60 * 24 * 7 * 1000;
      const expiresInSecond = Math.floor(expiresIn / 1000);
      const sessionCookie = await auth().createSessionCookie(idToken, {
        expiresIn,
      });
      const options: ResponseCookie = {
        name: 'session',
        value: sessionCookie,
        maxAge: expiresInSecond,
        httpOnly: true,
        sameSite: 'lax',
        ...(isProduction && {
          secure: true,
        }),
      };
      cookies().set(options);

      const res = NextResponse.json({ isLogged: true }, { status: 200 });
      return res;
    }

    return NextResponse.json({ isLogged: false }, { status: 400 });
  }
}

export async function GET(request: NextRequest) {
  const session = cookies().get('session')?.value || null;

  if (!session) {
    return NextResponse.json({ isLogged: false }, { status: 401 });
  }

  const decodedClaims = await auth().verifySessionCookie(session, true);

  if (!decodedClaims) {
    return NextResponse.json({ isLogged: false }, { status: 401 });
  }

  return NextResponse.json({ isLogged: true }, { status: 200 });
}

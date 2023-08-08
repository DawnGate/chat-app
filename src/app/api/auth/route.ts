import { auth } from 'firebase-admin';

import { NextRequest, NextResponse } from 'next/server';
import { headers, cookies } from 'next/headers';

import firebaseAdminInitApp from '@/lib/firebase-admin-config';

firebaseAdminInitApp();

export async function POST(request: NextRequest, response: NextResponse) {
  const authorization = headers().get('Authorization');
  if (authorization?.startsWith('Bearer')) {
    const idToken = authorization.split('Bearer')[1];
    const decodedToken = await auth().verifyIdToken(idToken);

    if (decodedToken) {
      const expiresIn = 1000 * 60 * 60 * 24 * 5;
      const sessionCookie = await auth().createSessionCookie(idToken, {
        expiresIn,
      });
      const options = {
        name: 'session',
        value: sessionCookie,
        expiresIn,
        httpOnly: true,
        secure: true,
      };
      cookies().set(options);
    }

    return NextResponse.json({}, { status: 200 });
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

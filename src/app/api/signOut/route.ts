import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

// eslint-disable-next-line import/prefer-default-export
export async function POST(request: NextRequest) {
  const options = {
    name: 'session',
    value: '',
    maxAge: -1,
  };
  cookies().set(options);
  return NextResponse.json({}, { status: 200 });
}

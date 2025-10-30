import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
  // 데모 계정 정보
  const demoUser = {
    user_id: 'user-001',
    email: 'demo@ets-zero.com',
    name: '박철수',
    role: 'manager',
    organization: 'HMM',
  }

  // 간단한 세션 토큰 생성 (데모용)
  const sessionToken = Buffer.from(JSON.stringify(demoUser)).toString('base64')

  // 쿠키에 세션 토큰 저장
  const cookieStore = await cookies()
  cookieStore.set('session', sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7일
    path: '/',
  })

  // 대시보드로 리다이렉트
  return NextResponse.redirect(new URL('/dashboard', process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'))
}

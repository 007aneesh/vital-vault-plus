import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { ROLES } from '@/configs/constant'

export function middleware(req: NextRequest) {
  const user = req.cookies.get('user')?.value
    ? JSON.parse(req.cookies.get('user')?.value || '')
    : null

  const pathname = req.nextUrl.pathname

  if (!user && pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  if (user) {
    if (user?.type === ROLES.ORGANISATION && !pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/admin', req.url))
    }

    if (user?.type === ROLES.EMPLOYEE && !pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/admin', req.url))
    }

    if (user?.type === ROLES.PATIENT && !pathname.startsWith('/user')) {
      return NextResponse.redirect(new URL('/user', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/*', '/user/*'],
}

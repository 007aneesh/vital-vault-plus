'use client'

import { Button } from '@/components/ui/button'
import Loading from '@/components/ui/loading'
import { getDefaultRedirect } from '@/lib/auth'
import { IconArrowLeft } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { useEffect, Suspense } from 'react'
import { useAuthStore } from '@/store/authStore'

function AuthLayoutContent({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const user = useAuthStore((s) => s.user)
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)

  useEffect(() => {
    if (isAuthenticated) {
      // Get redirect from URL if present
      const params = new URLSearchParams(window.location.search)
      const redirectTo = params.get('redirect')
      
      if (
        redirectTo &&
        (redirectTo.startsWith('/admin') || redirectTo.startsWith('/user'))
      ) {
        router.replace(redirectTo)
      } else {
        router.replace(getDefaultRedirect(user))
      }
    }
  }, [isAuthenticated, user, router])

  if (isAuthenticated) return <Loading message="Redirecting..." />
  
  return (
    <div className='min-h-screen h-full w-full flex flex-col items-center md:justify-center p-10 dark:bg-grid-white/[0.2] bg-grid-black/[0.02] relative'>
      <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
        <div className='h-full w-full bg-white  [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]' />
      </div>
      <div className='w-full relative z-10'>{children}</div>
      <Button
        variant={'link'}
        onClick={() => router.back()}
        className='absolute top-5 left-5 cursor-pointer'
      >
        <IconArrowLeft />
      </Button>
    </div>
  )
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Suspense fallback={<Loading />}>
      <AuthLayoutContent>{children}</AuthLayoutContent>
    </Suspense>
  )
}

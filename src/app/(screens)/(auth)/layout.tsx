'use client'

import { Button } from '@/components/ui/button'
import Loading from '@/components/ui/loading'
import { ROLES } from '@/configs/constant'
import { useAuthStore } from '@/store/authStore'
import { IconArrowLeft } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { user, isAuthenticated } = useAuthStore()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isAuthenticated) {
      if (user?.type == ROLES.ORGANISATION || user?.type == ROLES.EMPLOYEE) {
        router.push('/admin')
      } else if (user?.type == ROLES.PATIENT) {
        router.push('/user')
      }
    } else {
      setLoading(false)
    }
  }, [isAuthenticated])

  if (isAuthenticated || loading) return <Loading />
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

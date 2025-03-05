'use client'

import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const ProtectedAdminRoute = ({ children }: any) => {
  const { isAuthenticated, fetchUser, user } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    } else if (!user) {
      fetchUser()
    }
  }, [isAuthenticated, user])

  return isAuthenticated ? <>{children}</> : null
}

export default ProtectedAdminRoute

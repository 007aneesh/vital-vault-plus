'use client'

import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const ProtectedAdminRoute = ({ children }: any) => {
  const { isAuthenticated, fetchUser } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login') 
    } else {
      fetchUser()
    }
  }, [isAuthenticated])

  return isAuthenticated ? <>{children}</> : null
}

export default ProtectedAdminRoute

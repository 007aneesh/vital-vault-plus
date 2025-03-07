'use client'

import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Loading from '../ui/loading'

const ProtectedAdminRoute = ({ children }: any) => {
  const { isAuthenticated, fetchUser, user } = useAuthStore()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      if (!isAuthenticated) {
        router.push('/login')
      } else if (!user) {
        try {
          await fetchUser()
        } finally {
          setLoading(false)
        }
      } else {
        setLoading(false)  
      }
    }

    checkAuth()
  }, [isAuthenticated, user, router, fetchUser])

  if (loading) {
    return <Loading />
  }
  return isAuthenticated ? <>{children}</> : null
}

export default ProtectedAdminRoute

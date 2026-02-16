'use client'

import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Loading from '@/components/ui/loading'

export default function LogoutPage() {
  const logout = useAuthStore((state) => state.logout)
  const router = useRouter()

  useEffect(() => {
    logout()
    router.replace('/login')
  }, [logout, router])

  return <Loading message="Logging out..." />
}

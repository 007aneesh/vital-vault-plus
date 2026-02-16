'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import Loading from '@/components/ui/loading'

/**
 * AuthGate: Protects routes by ensuring auth is initialized and user is authenticated.
 * Replaces ProtectedAdminRoute and AuthProvider.
 * - Calls store.initialize() on mount
 * - Shows loading until isInitialized
 * - Redirects to login if not authenticated
 * - Renders children if authenticated
 */
export function AuthGate({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const isInitialized = useAuthStore((s) => s.isInitialized)
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const initialize = useAuthStore((s) => s.initialize)

  useEffect(() => {
    if (!isInitialized) {
      initialize()
    }
  }, [isInitialized, initialize])

  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname || '/admin')}`)
    }
  }, [isInitialized, isAuthenticated, pathname, router])

  if (!isInitialized) {
    return <Loading message="Checking authentication..." />
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}

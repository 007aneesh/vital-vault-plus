'use client'

import { AuthGate } from '@/components/auth/AuthGate'

/** Protected routes: auth required. AuthGate initializes store and redirects if not authenticated. */
export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AuthGate>{children}</AuthGate>
}

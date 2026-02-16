'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

interface ErrorBoundaryContentProps {
  error: Error & { digest?: string }
  reset: () => void
  message?: string
}

export default function ErrorBoundaryContent({
  error,
  reset,
  message = 'Something went wrong. Please try again.',
}: ErrorBoundaryContentProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className='flex flex-col items-center justify-center py-24 gap-4 min-h-[200px]'>
      <p className='text-red-600'>{message}</p>
      <Button variant='secondary' onClick={reset}>
        Try again
      </Button>
    </div>
  )
}

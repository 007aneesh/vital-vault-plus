'use client'

import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function PasswordResetSent() {
  const router = useRouter()

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-100 px-4'>
      <div className='max-w-md w-full bg-white rounded-2xl shadow-lg p-6 text-center'>
        <CheckCircle className='mx-auto text-green-500' size={64} />
        <h2 className='text-2xl font-semibold mt-4'>
          Password Reset Mail Sent!
        </h2>
        <p className='text-gray-600 mt-2'>
          Your password has been successfully reset. You can now proceed to
          login.
        </p>
        <Button
          type='button'
          variant='secondary'
          onClick={() => router.push('/login')}
          className='w-full mt-5'
        >
          Continue to Login
        </Button>
      </div>
    </div>
  )
}

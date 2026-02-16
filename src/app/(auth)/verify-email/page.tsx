'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { IconMail, IconArrowLeft } from '@/lib/icons'
import { Suspense } from 'react'

function VerifyEmailContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const email = searchParams.get('email')

  return (
    <div className='w-full flex flex-col items-center justify-center min-h-[60vh]'>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='flex flex-col items-center gap-6 max-w-md'
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
          className='w-24 h-24 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center shadow-lg'
        >
          <IconMail className='w-12 h-12 text-white' />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className='text-center space-y-4'
        >
          <h1 className='text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>
            Check Your Email
          </h1>
          <p className='text-gray-600 text-lg'>
            We've sent a verification link to
          </p>
          {email && (
            <p className='text-secondary font-semibold text-lg break-all'>
              {email}
            </p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className='bg-blue-50 border border-blue-200 rounded-lg p-6 text-center space-y-3'
        >
          <p className='text-gray-700 text-sm'>
            Please click the verification link in the email to activate your account.
          </p>
          <p className='text-gray-600 text-xs'>
            Didn't receive the email? Check your spam folder or contact support.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className='flex gap-4 w-full'
        >
          <Button
            variant='outline'
            onClick={() => router.push('/login')}
            className='flex-1 h-12'
          >
            <IconArrowLeft className='w-4 h-4 mr-2' />
            Back to Login
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  )
}

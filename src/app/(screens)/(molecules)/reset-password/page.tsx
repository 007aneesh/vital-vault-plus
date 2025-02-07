'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'next/navigation'
import { FormBuilder } from '@/components/ui/form'
import { useState } from 'react'

const schema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirm_password: z
      .string()
      .min(8, 'Password must be at least 8 characters'),
  })
  .superRefine(({ password, confirm_password }, ctx) => {
    if (password !== confirm_password) {
      ctx.addIssue({
        code: 'custom',
        path: ['confirm_password'],
        message: 'Passwords do not match',
      })
    }
  })

export default function ResetPassword() {
  const searchParams = useSearchParams()
  const code = searchParams.get('code')
  const [loading, setLoading] = useState(false)
  console.log(code)

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(payload: z.infer<typeof schema>) {
    setLoading(true)
    try {
      console.log(payload)
      setLoading(false)
      console.log('Password reset successful')
    } catch (err) {
      console.error('Internal Server Error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            Reset your password
          </h2>
        </div>
        <FormBuilder
          form={form}
          fields={[
            {
              name: 'password',
              label: 'New Password',
              type: 'password',
              placeholder: 'Enter new password',
            },
            {
              name: 'confirm_password',
              label: 'Confirm Password',
              type: 'password',
              placeholder: 'Confirm new password',
            },
          ]}
          onSubmit={onSubmit}
          buttonLabel='Reset Password'
          loading={loading}
        />
      </div>
    </div>
  )
}

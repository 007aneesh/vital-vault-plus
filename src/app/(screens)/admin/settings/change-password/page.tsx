'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { FormBuilder } from '@/components/ui/form'
import {
  change_password_form_config,
  change_password_schema,
} from '@/configs/ChangePasswordConfig'

const ChangePasswordPage: React.FC = () => {
  const form = useForm<z.infer<typeof change_password_schema>>({
    resolver: zodResolver(change_password_schema),
  })

  async function onSubmit(values: z.infer<typeof change_password_schema>) {
    try {
      console.log('Password successfully changed', values)
    } catch (err) {
      console.error('Invalid')
    }
  }

  return (
    <div className='h-full w-full flex flex-col items-center'>
      <h1 className='mb-4 text-xl font-bold w-full'>Change Password</h1>
      <div className='w-full md:max-w-[50%]'>
        <FormBuilder
          form={form}
          fields={change_password_form_config?.fields}
          onSubmit={onSubmit}
          buttonLabel='Change Password'
        />
      </div>
    </div>
  )
}

export default ChangePasswordPage

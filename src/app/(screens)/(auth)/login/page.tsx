'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { LoginFormFields } from '@/@types/auth'
import { LoginConfig } from '@/data/FomData'
import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'next/navigation'
import { ROLES } from '@/configs/constant'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { IconShieldCheckFilled, IconUserFilled } from '@/lib/icons'

const schema = z.object({
  username: z.string().min(3, 'Please enter a valid username'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

const LoginPage = () => {
  const login = useAuthStore((state) => state.login)
  const { user } = useAuthStore()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(values: z.infer<typeof schema>) {
    setIsLoading(true)
    setError('')
    try {
      await login(values.username, values.password)
      if (user?.type == ROLES.ORGANISATION || user?.type == ROLES.EMPLOYEE) {
        router.push('/admin')
      } else if (user?.type == ROLES.PATIENT) {
        router.push('/user')
      }
    } catch (err) {
      setError('Invalid credentials. Please try again.')
      console.error('Invalid Credentials')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='w-full flex flex-col items-center justify-center'>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='py-8 gap-3 flex flex-col items-center'
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
          className='w-20 h-20 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center shadow-lg mb-2'
        >
          <IconUserFilled className='w-10 h-10 text-white' />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className='text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'
        >
          Welcome back
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className='text-gray-600 text-center'
        >
          Sign in to your managed data storage
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className='w-full md:max-w-md bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-gray-100'
      >
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className='mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm'
          >
            {error}
          </motion.div>
        )}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-6 flex flex-col justify-center w-full'
          >
            {LoginConfig.map((data, index) => (
              <motion.div
                key={data.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <FormField
                  control={form.control}
                  name={data.id as keyof LoginFormFields}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-700 font-medium'>
                        {data.name}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type={data.type}
                          className='bg-gray-50 border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all h-12'
                          placeholder={data.placeholder}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Button
                type='submit'
                variant='secondary'
                className='w-full h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all'
                loading={isLoading}
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </motion.div>
          </form>
        </Form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className='mt-6 pt-6 border-t border-gray-200'
        >
          <div className='flex items-center justify-center gap-2 text-sm text-gray-600'>
            <IconShieldCheckFilled className='w-4 h-4 text-secondary' />
            <span>Secured with enterprise-grade encryption</span>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className='mt-8 text-center text-sm text-gray-600'
      >
        <p>
          Don&apos;t have an account?{' '}
          <button
            onClick={() => router.push('/register')}
            className='text-secondary font-semibold hover:underline'
          >
            Sign up
          </button>
        </p>
      </motion.div>
    </div>
  )
}

export default LoginPage

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

const schema = z.object({
  username: z.string().min(3, 'Please enter a valid username'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

const LoginPage = () => {
  const login = useAuthStore((state) => state.login)
  const { user } = useAuthStore()
  const router = useRouter()

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(values: z.infer<typeof schema>) {
    try {
      await login(values.username, values.password)
      if (user?.type == ROLES.ORGANISATION || user?.type == ROLES.EMPLOYEE) {
        router.push('/admin')
      } else if (user?.type == ROLES.PATIENT) {
        router.push('/user')
      }
    } catch (err) {
      console.error('Invalid Credentials')
    }
  }

  return (
    <div className='w-full flex flex-col items-center justify-center'>
      <div className='py-8 gap-2 flex flex-col items-center'>
        <h1 className='heading'>Welcome back</h1>
        <p className='sub-heading'>Sign in to your managed data storage</p>
      </div>
      <div className='w-full md:max-w-sm'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-5 flex flex-col justify-center w-full'
          >
            {LoginConfig.map((data) => (
              <FormField
                key={data.id}
                control={form.control}
                name={data.id as keyof LoginFormFields}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{data.name}</FormLabel>
                    <FormControl>
                      <Input
                        type={data.type}
                        className='bg-gray-200'
                        placeholder={data.placeholder}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button
              type='submit'
              variant={'secondary'}
              className='border-border'
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default LoginPage

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
import { login } from '@/actions/auth'
import { PatientFormFields } from '@/@types/auth'
import { patientLoginConfig as formConfig } from '@/data/FomData'

const schema = z.object({
  aadhar_card: z
    .string()
    .length(12, 'Aadhar must be 12 digits')
    .transform((val) => parseInt(val, 10)),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

const LoginPage = () => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(values: z.infer<typeof schema>) {
    try {
      await login(values, 'patient')
      console.log('Login successful')
    } catch (err) {
      console.error('Invalid Credentials')
    }
  }

  return (
    <div className='w-full flex flex-col items-center justify-center'>
      <div className='py-8 gap-2 flex flex-col items-center'>
        <h1 className='heading'>Welcome back</h1>
        <p className='sub-heading'>Sign in as a Patient</p>
      </div>
      <div className='w-full md:max-w-sm'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-5 flex flex-col justify-center w-full'
          >
            {formConfig.map((fieldConfig) => (
              <FormField
                key={fieldConfig.id}
                control={form.control}
                name={fieldConfig.id as keyof PatientFormFields}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{fieldConfig.name}</FormLabel>
                    <FormControl>
                      <Input
                        type={fieldConfig.type}
                        className='bg-gray-200'
                        placeholder={fieldConfig.placeholder}
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

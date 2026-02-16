/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import {
  FormField,
  FormItem,
  FormLabel,
  useFormField,
} from '@/components/ui/form'
import React, { useState } from 'react'
import { z } from 'zod'
import { FormProvider, useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { FormFieldNames } from '@/@types/auth'
import { registerFieldConfigs as fieldConfigs } from '@/data/FomData'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { IconUserFilled, IconCheck } from '@/lib/icons'

const getDefaultValues = () => ({
  userName: '',
  email: '',
  contactNo: '',
  password: '',
  confirm_password: '',
  orgName: '',
  address: '',
  city: '',
  state: '',
  pinCode: '',
  planSelected: '',
})

const schema = z
  .object({
    userName: z.string().min(5, 'Username is required'),
    email: z.string().email('Invalid email'),
    contactNo: z.string().min(10, 'Contact is required'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirm_password: z
      .string()
      .min(6, 'Password must be at least 6 characters'),
    orgName: z.string().min(1, 'Organization name required'),
    address: z.string().min(5, 'Address is required'),
    city: z.string().min(2, 'City is required'),
    state: z.string().min(2, 'State is required'),
    pinCode: z.string().min(6, 'Pin code must be at least 6 characters'),
    planSelected: z.string().min(1, 'Plan is required'),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords must match',
    path: ['confirm_password'],
  })

const steps = [
  {
    id: 1,
    title: 'Account Details',
    fields: ['userName', 'email', 'contactNo'],
  },
  {
    id: 2,
    title: 'Security',
    fields: ['password', 'confirm_password'],
  },
  {
    id: 3,
    title: 'Organization Info',
    fields: ['orgName', 'planSelected'],
  },
  {
    id: 4,
    title: 'Location',
    fields: ['address', 'city', 'state', 'pinCode'],
  },
]

const RegisterPage = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: getDefaultValues(),
    mode: 'onChange',
  })

  const onSubmit = async (payload: any) => {
    setIsLoading(true)
    try {
      const data = {
        ...payload,
      }
      console.log(data)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      // Auth layout will handle redirect after registration
      // For now, redirect to login
      router.push('/login')
    } catch (error) {
      console.error('Registration failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const nextStep = async () => {
    const currentFields = steps[currentStep].fields
    const isValid = await form.trigger(currentFields as any)

    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const isLastStep = currentStep === steps.length - 1

  const renderStepIndicator = () => {
    return (
      <div className='flex items-center justify-center gap-2 mb-8'>
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <motion.div
              initial={false}
              animate={{
                scale: currentStep === index ? 1.2 : 1,
              }}
              className='flex flex-col items-center gap-2'
            >
              <motion.div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                  currentStep > index
                    ? 'bg-green-500 text-white'
                    : currentStep === index
                      ? 'bg-secondary text-white shadow-lg'
                      : 'bg-gray-200 text-gray-400'
                }`}
                whileHover={{ scale: 1.1 }}
              >
                {currentStep > index ? (
                  <IconCheck className='w-5 h-5' />
                ) : (
                  step.id
                )}
              </motion.div>
              <span
                className={`text-xs font-medium hidden md:block ${
                  currentStep === index
                    ? 'text-secondary'
                    : 'text-gray-400'
                }`}
              >
                {step.title}
              </span>
            </motion.div>
            {index < steps.length - 1 && (
              <motion.div
                className={`h-1 w-8 md:w-16 rounded transition-all ${
                  currentStep > index ? 'bg-green-500' : 'bg-gray-200'
                }`}
                initial={false}
                animate={{
                  scaleX: currentStep > index ? 1 : 0.5,
                }}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    )
  }

  const render_form = () => {
    const currentFields = steps[currentStep].fields
    const fieldsToRender = fieldConfigs.filter((field) =>
      currentFields.includes(field.name),
    )

    return (
      <AnimatePresence mode='wait'>
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full'
        >
          {fieldsToRender.map(({ name, label, placeholder, type }) => {
            return (
              <FormField
                key={name}
                control={form.control}
                name={name as FormFieldNames}
                render={({ field }) => {
                  const { error } = useFormField()
                  return (
                    <FormItem
                      className={
                        fieldsToRender.length % 2 !== 0 &&
                        name === fieldsToRender[fieldsToRender.length - 1].name
                          ? 'md:col-span-2'
                          : ''
                      }
                    >
                      <FormLabel className='text-gray-700 font-medium'>
                        {label}
                      </FormLabel>
                      <Input
                        type={type}
                        placeholder={placeholder}
                        {...field}
                        className={`bg-gray-50 border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all h-12 ${error ? 'border-red-500' : ''}`}
                      />
                      {error && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className='text-sm text-red-500 mt-1'
                        >
                          {error.message}
                        </motion.p>
                      )}
                    </FormItem>
                  )
                }}
              />
            )
          })}
        </motion.div>
      </AnimatePresence>
    )
  }

  return (
    <div className='w-full flex flex-col items-center justify-center'>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='py-8 flex flex-col items-center gap-3'
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
          className='text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent text-center'
        >
          Ready to Manage Your Data?
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className='text-gray-600 text-center'
        >
          Create your account in a few simple steps
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className='w-full md:max-w-3xl bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-gray-100'
      >
        {renderStepIndicator()}

        <FormProvider {...form}>
          <form
            className='relative w-full flex flex-col gap-8 items-center justify-center'
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className='w-full'
            >
              <h2 className='text-xl font-semibold mb-6 text-gray-800'>
                {steps[currentStep].title}
              </h2>
              {render_form()}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className='flex gap-4 w-full justify-between mt-4'
            >
              {currentStep > 0 && (
                <Button
                  type='button'
                  variant='ghost'
                  onClick={prevStep}
                  className='flex-1'
                >
                  Previous
                </Button>
              )}

              {!isLastStep ? (
                <Button
                  type='button'
                  variant='secondary'
                  onClick={nextStep}
                  className='flex-1 h-12 font-semibold shadow-lg hover:shadow-xl transition-all'
                >
                  Next Step
                </Button>
              ) : (
                <Button
                  type='submit'
                  variant='secondary'
                  className='flex-1 h-12 font-semibold shadow-lg hover:shadow-xl transition-all'
                  loading={isLoading}
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Button>
              )}
            </motion.div>
          </form>
        </FormProvider>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className='mt-6 pt-6 border-t border-gray-200'
        >
          <p className='text-center text-sm text-gray-600'>
            Step {currentStep + 1} of {steps.length}
          </p>
          <div className='mt-4 bg-gray-200 h-2 rounded-full overflow-hidden'>
            <motion.div
              className='h-full bg-gradient-to-r from-secondary to-primary'
              initial={{ width: '0%' }}
              animate={{
                width: `${((currentStep + 1) / steps.length) * 100}%`,
              }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default RegisterPage

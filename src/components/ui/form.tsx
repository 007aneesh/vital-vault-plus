/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { Slot } from '@radix-ui/react-slot'
import {
  Controller,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from 'react-hook-form'
import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'
import { Button } from './button'
import { Input } from './input'

const Form = FormProvider

// Context for Form Field
type FormFieldContextValue<TFieldValues extends FieldValues> = {
  name: FieldPath<TFieldValues>
}

const FormFieldContext = React.createContext<FormFieldContextValue<any> | null>(
  null,
)

const FormField = <TFieldValues extends FieldValues>({
  control,
  name,
  render,
}: {
  control: any
  name: FieldPath<TFieldValues>
  render: ({
    field,
    fieldState,
    formState,
  }: {
    field: any
    fieldState: any
    formState: any
  }) => React.ReactElement
}) => {
  return (
    <FormFieldContext.Provider value={{ name }}>
      <Controller control={control} name={name} render={render} />
    </FormFieldContext.Provider>
  )
}

// Hook for Form Field
const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const { getFieldState, formState } = useFormContext()

  if (!fieldContext) {
    throw new Error('useFormField must be used inside <FormField>')
  }

  return {
    name: fieldContext.name,
    ...getFieldState(fieldContext.name, formState),
  }
}

// Form Components
const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('space-y-2 w-full', className)} {...props} />
))
FormItem.displayName = 'FormItem'

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error } = useFormField()
  return (
    <Label
      ref={ref}
      className={cn(error && 'text-destructive', className)}
      {...props}
    />
  )
})
FormLabel.displayName = 'FormLabel'

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error } = useFormField()
  return <Slot ref={ref} aria-invalid={!!error} {...props} />
})
FormControl.displayName = 'FormControl'

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error } = useFormField()
  const message = error?.message ? String(error.message) : children
  return message ? (
    <p
      ref={ref}
      className={cn('text-sm font-medium text-destructive', className)}
      {...props}
    >
      {message}
    </p>
  ) : null
})
FormMessage.displayName = 'FormMessage'

// ✅ **Reusable `FormBuilder` Component**
export type FormBuilderProps<T extends FieldValues> = {
  form: any
  fields: {
    name: string
    label?: string
    placeholder?: string
    type?: string
    required?: boolean
  }[]
  onSubmit: (data: T) => void
  buttonLabel?: string
  loading?: boolean
}

const FormBuilder = <T extends FieldValues>({
  form,
  fields,
  onSubmit,
  buttonLabel = 'Submit',
  loading,
}: FormBuilderProps<T>) => {
  const {
    formState: { errors },
  } = form
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-5 flex flex-col justify-center w-full'
      >
        {fields.map(({ name, label, placeholder, type = 'text', required }) => (
          <FormField
            key={name}
            control={form.control}
            name={name}
            render={({ field }) => (
              <FormItem>
                {label && <FormLabel>{label}</FormLabel>}
                <FormControl>
                  <Input
                    type={type}
                    className={`bg-gray-200 ${errors[name] ? 'border-red-500' : ''} outline-none`}
                    placeholder={placeholder}
                    value={field.value || ''} 
                    onChange={field.onChange} 
                    onBlur={field.onBlur}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button
          type='submit'
          variant='secondary'
          className='border-border mt-2 py-2 px-4 rounded-md'
          loading={loading}
        >
          {buttonLabel}
        </Button>
      </form>
    </Form>
  )
}

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
  FormBuilder,
}

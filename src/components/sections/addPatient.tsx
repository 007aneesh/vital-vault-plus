import { z } from 'zod'
import { Button } from '../ui/button'
import {
  FormField,
  FormItem,
  // FormLabel,
  // FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { add_patient } from '@/data/PatientConfig'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const AddPatient = () => {
  const schema = z.object({
    aadharNumber: z.string().min(1, 'Aadhar Number is required'),
    email: z.string().email('Invalid email address'),
    guardianName: z.string().min(1, 'Guardian Name is required'),
    name: z.string().min(1, 'Full Name is required'),
    gender: z.string().min(1, 'Gender is required'),
    contact: z.string().min(1, 'Contact Number is required'),
    image: z.string().optional(),
    emergencyContact: z.string().optional(),
    address: z.string().min(1, 'Address is required'),
  })

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(values: z.infer<typeof schema>) {
    try {
      console.log('Add Patient successfull', values)
    } catch (err) {
      console.error('Invalid')
    }
  }

  const render_form = () => {
    return (
      <div className='flex flex-col md:grid grid-cols-2 gap-5 md:gap-x-16 items-center w-full justify-center'>
        {add_patient
          .sort((a, b) => a.priority - b.priority)
          .map((fieldConfig: any) => (
            <FormField
              key={fieldConfig.id}
              control={form.control}
              name={fieldConfig.name}
              render={({ field }: any) => (
                <>
                  <FormItem>
                    <Input
                      type={fieldConfig.type}
                      className=''
                      placeholder={fieldConfig.placeholder}
                      {...field}
                    />
                  </FormItem>
                </>
              )}
            />
          ))}
      </div>
    )
  }

  return (
    <div className='mb-20'>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=''>
          {render_form()}

          <Button
            type='submit'
            variant={'secondary'}
            className='border-border mt-5'
          >
            Add Patient
          </Button>
        </form>
      </FormProvider>
    </div>
  )
}

export default AddPatient

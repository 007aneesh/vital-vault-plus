'use client'

import Footer from '@/components/ui/footer'
import { FormBuilder } from '@/components/ui/form'
import IconComponent from '@/components/ui/iconComponent'
import Navbar from '@/components/ui/navbar'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type NavItem = {
  text: string
  link: string
}
export default function Page() {
  const router = useRouter()

  const navItems: NavItem[] = [
    { text: 'Home', link: '/' },
    { text: 'About Us', link: '/about-us' },
    { text: 'Contact Us', link: '/contact-us' },
  ]

  const fields = [
    {
      name: 'name',
      type: 'text',
      placeholder: 'Your name',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      placeholder: 'Your email',
      required: true,
    },
    {
      name: 'organisation',
      type: 'text',
      placeholder: 'Your Organisation',
      required: true,
    },
    {
      name: 'date',
      type: 'date',
      placeholder: 'DD/MM/YYYY',
      required: true,
    },
  ]


  const schema = z.object({
    name: z
      .string()
      .min(1, 'Name is required')
      .min(3, 'Name must be at least 3 characters')
      .max(50, 'Name must be at most 50 characters'),

    email: z
      .string()
      .min(1, 'Email is required')
      .email('Please enter a valid email address'),

    organisation: z
      .string()
      .min(1, 'Please enter your organisation name')
      .min(3, 'Organisation name must be at least 3 characters')
      .max(100, 'Organisation name must be at most 100 characters'),

    date: z.string().min(1, 'Date is required'),
  })


  type FormData = z.infer<typeof schema>

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: FormData) => {
    console.log('Contact Us Form Data:', data)
    form.reset()
  }

  const contact_details = [
    {
      icon: 'IconMail',
      text: 'noreplyvitalvault@gmail.com',
      link: 'mailto:noreplyvitalvault@gmail.com',
    },
  ]

  return (
    <>
      <Navbar navItems={navItems} style='bg-white/70 shadow-md' />
      <div className='pt-24 lg:pt-36 pb-12 lg:pb-16 flex flex-col lg:flex-row items-center lg:items-start justify-center'>
        <div className='flex-1 flex items-start justify-center gap-4 w-[90%] md:w-full md:max-w-[60%] mb-8'>
          <div className='flex flex-col items-start w-full lg:w-auto'>
            <h1 className='text-2xl md:text-3xl font-semibold text-left'>
              Book a Demo
            </h1>
            <p className='text-base text-left mt-1 text-wrap'>
              A step towards greatness. We will share the details with you soon.
            </p>
            <div className='flex gap-4 mt-2 pt-3 border-t-2 border-black/10 w-full'>
              <div className='flex items-center gap-2'>
                {contact_details.map((detail, index) => (
                  <a
                    key={index}
                    href={detail.link}
                    className='flex items-center gap-2 no-underline'
                  >
                    <IconComponent iconName={detail.icon} className='w-6 h-6' />
                    <p className='text-blue-500 cursor-pointer'>
                      {detail.text}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className='flex-1 flex flex-col items-center justify-center gap-4 w-[90%] md:w-full'>
          <div className='w-full md:max-w-[60%]'>
            <FormBuilder
              form={form}
              fields={fields}
              onSubmit={onSubmit}
              buttonLabel='Book Slot'
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

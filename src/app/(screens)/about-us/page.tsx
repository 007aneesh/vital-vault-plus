'use client'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export default function Page() {
  const sections = [
    {
      title: 'Our Mission',
      subtitle: 'About Vital Vault',
      content:
        'At Vital Vault, our mission is to revolutionize healthcare by providing cutting-edge solutions for patient data management. We are committed to ensuring that patient data is not only efficiently organized but also kept secure and accessible when needed. Our dedication to this mission is driven by the following core principles - Patient-Centric Care, Data Security Above All, Empowering Patients, Growth and Adaptation, and Support and Collaboration.',
      imageSrc: '',
      reverse: false,
    },
    {
      title: 'Our Vision and Goal',
      subtitle: 'Why Choose Vital Vault',
      content:
        "At Vital Vault, our vision is to be the driving force behind a healthcare revolution where data becomes a catalyst for improved patient outcomes, enhanced care quality, and streamlined processes. We envision a healthcare ecosystem where data is seamlessly harnessed, securely managed, and used intelligently for the betterment of all stakeholders. Vital Vault's primary goal is to set new standards in patient data management.",
      imageSrc: '',
      reverse: true,
    },
    {
      title: 'Welcome to the Future of Healthcare',
      subtitle: '',
      content:
        "Where you're in control of your health data and well-being. Are you ready to experience a new era of personalized care and seamless management of your health records? Sign up today and embark on a journey of empowerment, security, and excellence in healthcare.",
      imageSrc: '',
      reverse: false,
    },
  ]

  return (
    <div>
      <div className='text-center py-12 bg-dashboard-background'>
        <h1 className='text-4xl font-bold text-primary'>About Us</h1>
        <p className='text-primary text-sm md:text-base mt-4 relative inline-block'>
          <span className='absolute inset-x-0 top-1/2 transform -translate-y-1/2 border-b-2 border-primary w-full sm:w-[120%] md:w-[130%] lg:w-[150%] sm:left-[-15%] md:left-[-20%]'></span>
          <span className='relative z-10 bg-dashboard-background px-2'>
            Who We Are
          </span>
        </p>
      </div>

      {sections.map((section, index) => (
        <div
          key={index}
          className={`flex flex-col lg:flex-row items-center justify-center py-8 lg:px-28 gap-y-4 ${
            index % 2 === 0 ? '' : 'lg:flex-row-reverse'
          }`}
        >
          <div className='flex flex-col items-center justify-center w-full lg:w-1/2 text-center space-y-4 mb-12'>
            <h2 className='text-base text-primary sm:text-lg'>
              {section?.subtitle}
            </h2>
            <h1 className='font-bold lg:text-2xl pt-1 pb-2 md:pb-3 text-lg md:text-xl'>
              {section?.title}
            </h1>
            <p className='max-w-2xl text-sm md:text-base font-medium text-center'>
              {section?.content}
            </p>
          </div>

          <div className='flex justify-center items-center w-full lg:w-1/2 mt-4 lg:mt-0 lg:ml-6 lg:mr-6'>
            <Image
              src={section?.imageSrc}
              alt={section?.title}
              width={500}
              height={300}
              className='object-cover rounded-lg shadow-md w-full max-w-md mx-auto'
            />
          </div>
        </div>
      ))}

      <div className='flex flex-col p-8 lg:px-28 w-full items-center justify-center text-center'>
        <h1 className='font-bold md:text-xl pt-1 pb-2 md:pb-3 text-center text-lg'>
          Welcome to the future of healthcare.
        </h1>
        <p className='text-center max-w-xl text-xs md:text-sm'>
          Where you&apos;re in control of your health data and well-being. Are
          you ready to experience a new era of personalized care and seamless
          management of your health records? Sign up today and embark on a
          journey of empowerment, security, and excellence in healthcare.
        </p>
        <Link href='/register'>
          <Button className='mt-6 px-8 py-3 bg-primary font-bold rounded-xl shadow-lg hover:scale-105 transition duration-300 ease-in-out'>
            Sign Up
          </Button>
        </Link>
      </div>
    </div>
  )
}

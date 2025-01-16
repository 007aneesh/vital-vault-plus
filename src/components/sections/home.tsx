'use client'
import { ImageLinks } from '@/lib/imageLinks'
import {
  IconClock,
  IconCloudUp,
  IconShieldCheckFilled,
  IconShieldLock,
} from '@/lib/icons'
import React from 'react'
import Image from 'next/image'
import { Grid } from '../ui/grid'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { Card } from '../ui/card'

function Demo() {
  const steps = [
    {
      step: 1,
      title: 'Fill the Details',
      description: 'Fill the details like Name, Email, Contact Number, etc.',
      image: ImageLinks.demo.step1,
    },
    {
      step: 2,
      title: 'Login',
      description: 'Check your email for the login credentials and login',
      image: ImageLinks.demo.step2,
    },
    {
      step: 3,
      title: 'Understand the platform',
      description:
        'Follow the steps provided on the dashboard to understand the platform',
      image: ImageLinks.demo.step3,
    },
    {
      step: 4,
      title: 'Keep exploring',
      description:
        'Experience the potential of our healthcare data management system through our demo account',
      image: ImageLinks.demo.step4,
    },
  ]

  return (
    <div className='relative py-16 bg-dashboard-background px-8'>
      <div className='text-center max-w-2xl mx-auto mb-8'>
        <h2 className='text-xl md:text-4xl font-bold'>Book a Demo with us</h2>
        <p className='text-primary text-sm md:text-base mt-4 relative inline-block'>
          <span className='absolute inset-x-0 top-1/2 transform -translate-y-1/2 border-b-2 border-primary w-full sm:w-[120%] md:w-[130%] lg:w-[150%] sm:left-[-15%] md:left-[-25%]'></span>
          <span className='relative z-10 bg-dashboard-background px-2'>
            How Demo Works
          </span>
        </p>
      </div>

      <Grid
        data={steps}
        sort_by='priority'
        container_styles='[&]:gap-8 [&]:md:grid-cols-2 [&]:lg:grid-cols-4'
        item_styles='flex flex-col items-center'
        item_renderer={(item) => (
          <>
            <div className='w-36 h-36 flex items-center justify-center'>
              <Image
                src={item.image}
                width={2000}
                height={2000}
                alt={`item-image-${item?.step}`}
                className='w-36 h-28'
              />
            </div>
            <h3 className='text-lg font-semibold mb-3'>{item.title}</h3>
            <p className='text-sm text-gray-700 text-center'>
              {item.description}
            </p>
          </>
        )}
      />
    </div>
  )
}

function Features() {
  const features = [
    {
      title: 'Centralized Data Storage',
      description:
        'Unified repository for electronic health records, medical imaging, prescriptions, lab results, and more, accessible across various departments and facilities.',
      image: ImageLinks.features.centralizedDataStorage,
    },
    {
      title: 'Data Security and Compliance',
      description:
        'Adheres to regulations such as HIPAA (Health Insurance Portability and Accountability Act) and GDPR (General Data Protection Regulation).',
      image: ImageLinks.features.dataSecurity,
    },
    {
      title: 'Interoperability',
      description:
        'Integrates with various healthcare systems like EHR, laboratory management, and billing software. Facilitates seamless data exchange between healthcare providers.',
      image: ImageLinks.features.interoperability,
    },
    {
      title: 'Data Analytics and Insights',
      description:
        'Provides tools for analyzing patient trends and operational efficiency. Helps optimize resource allocation, and improve overall healthcare delivery.',
      image: ImageLinks.features.dataInsights,
    },
    {
      title: 'Data Backup and Recovery',
      description:
        'Ensures data integrity with regular backups. Offers disaster recovery mechanisms to prevent data loss during emergencies.',
      image: ImageLinks.features.dataBackup,
    },
    {
      title: 'Patient Data Access',
      description:
        'Enables real-time access to accurate patient data, leading to better diagnosis and treatment decisions. Supports functionalities like test result viewing.',
      image: ImageLinks.features.patientDataAccess,
    },
  ]

  return (
    <div className='py-10 px-8 md:py-20 bg-dashboard-background text-center'>
      <div className='text-center max-w-2xl mx-auto mb-8'>
        <h2 className='text-xl md:text-4xl font-bold'>Features</h2>
        <p className='text-primary text-sm md:text-base mt-4 relative inline-block'>
          <span className='absolute inset-x-0 top-1/2 transform -translate-y-1/2 border-b-2 border-primary w-full sm:w-[120%] md:w-[130%] lg:w-[150%] sm:left-[-15%] md:left-[-25%]'></span>
          <span className='relative z-10 bg-dashboard-background px-2'>
            What We Provide
          </span>
        </p>
      </div>
      <Grid
        data={features}
        sort_by='priority'
        container_styles='[&]:gap-8 [&]:md:grid-cols-2 [&]:lg:grid-cols-3'
        item_styles='flex flex-col items-center'
        item_renderer={(feature) => (
          <>
            <div className='flex flex-col items-center text-center flex-grow'>
              <Image
                src={feature?.image}
                alt={feature?.title}
                className='w-24 h-24 bg-cover mb-4 mx-auto'
                width={24}
                height={24}
              />
              <h3 className='font-semibold text-xl mb-2'>{feature?.title}</h3>
              <p className='text-gray-600'>{feature.description}</p>
            </div>
          </>
        )}
      />
    </div>
  )
}

function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Dr. Sarah Chen',
      statement:
        'This software streamlined our patient data management. The HIPAA compliance features give us peace of mind.',
      imageUrl: ImageLinks.testimonials.temp,
    },
    {
      name: 'Mike Thompson',
      statement:
        'As a clinic administrator, the real-time sync and secure access have improved our workflow efficiency by 40%.',
      imageUrl: ImageLinks.testimonials.temp,
    },
    {
      name: 'Nurse Rachel Adams',
      statement:
        'The intuitive interface makes accessing patient records quick and easy. Perfect for our busy emergency department.',
      imageUrl: ImageLinks.testimonials.temp,
    },
  ]

  return (
    <div className='py-10 md:py-20 bg-popover text-center'>
      <h2 className='heading text-2xl md:text-3xl'>Testimonials</h2>
      <p className='text-primary text-sm md:text-base mt-4 relative inline-block'>
        <span className='absolute inset-x-0 top-1/2 transform -translate-y-1/2 border-b-2 border-primary w-full sm:w-[120%] md:w-[130%] lg:w-[150%] sm:left-[-15%] md:left-[-20%]'></span>
        <span className='relative z-10 bg-popover px-2'>
          What people say about us
        </span>
      </p>
      <div className='overflow-x-auto mt-8 scrollbar-hidden'>
        <div className='flex space-x-6 md:space-x-8 flex-nowrap p-10 mr-10 md:justify-center'>
          {testimonials.map((testimonial, idx) => (
            <Card
              key={idx}
              className='w-80 min-w-[300px] flex-shrink-0 shadow-xl'
            >
              <div className='flex flex-col items-center text-center '>
                <Image
                  src={testimonial?.imageUrl}
                  alt={testimonial?.name}
                  className='w-24 h-24 rounded-full object-cover'
                  width={2000}
                  height={2000}
                />
                <h3 className='font-semibold text-lg mt-1'>
                  {testimonial?.name}
                </h3>
                <p className='text-sm text-muted-foreground mt-3'>
                  {testimonial?.statement}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

function Home() {
  const router = useRouter()

  const support = [
    {
      id: 1,
      icon: <IconClock />,
      title: '24/7 Access & Support',
    },
    {
      id: 2,
      icon: <IconShieldLock />,
      title: 'Enterprise-Grade Encryption',
    },
    {
      id: 3,
      icon: <IconShieldCheckFilled />,
      title: 'HIPAA & GDPR Compliant',
    },
    {
      id: 4,
      icon: <IconCloudUp />,
      title: 'Real-Time Data Sync',
    },
  ]

  return (
    <>
      <div className='min-h-[50vh] md:min-h-[60vh] lg:min-h-screen bg-popover px-5 md:px-16 relative'>
        <div className='flex h-full items-center justify-center md:justify-start pt-28 md:pt-36 md:max-w-[400px] lg:max-w-[800px]'>
          <div className='flex items-center md:items-start flex-col w-full'>
            <Image
              src={ImageLinks?.temp?.mobile_landing}
              width={200}
              height={200}
              alt='mobile_landing_image'
              className='pointer-events-none select-none md:hidden mb-10'
            />
            <h1 className='text-xl text-center md:text-left md:text-2xl lg:text-6xl text-primary font-extrabold'>
              Empowering Healthcare Through Smarter Data Management
            </h1>
            <p className='text-base text-center md:text-left text-gray-500 mt-5'>
              Say goodbye to data chaos. Our smart, secure platform puts you in
              control of patient care with precision and ease.
            </p>
            <Card className='pointer-events-none select-none my-5 w-full shadow-2xl'>
              <div className='grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-x-0 lg:divide-y-0 divide-border'>
                {support.map((item) => (
                  <div
                    key={item.id}
                    className='flex flex-col items-center gap-2 p-4'
                  >
                    {item.icon}
                    <span className='text-center'>{item.title}</span>
                  </div>
                ))}
              </div>
            </Card>
            <Button
              variant='secondary'
              className='mt-2 md:text-lg py-5 mb-16'
              onClick={() => router.push('/register')}
            >
              Get Started!
            </Button>
          </div>
        </div>
        <div className='absolute bottom-0 right-0 hidden md:flex items-end justify-end'>
          <div className='relative flex justify-center items-center'>
            <div
              className='relative md:w-[380px] lg:w-[550px] rounded-full'
              style={{
                backgroundImage:
                  'radial-gradient(circle, rgba(59, 130, 246, 0.7), transparent 70%)',
              }}
            >
              <Image
                src={ImageLinks.temp.doc_landing}
                width={550}
                height={550}
                alt='doc_landing_image'
                className='pointer-events-none select-none md:w-[380px] lg:w-[550px]'
              />
            </div>
          </div>
        </div>
      </div>
      {Features()}
      {TestimonialsSection()}
      {Demo()}
    </>
  )
}

export default Home

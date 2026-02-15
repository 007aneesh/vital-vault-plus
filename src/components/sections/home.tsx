'use client'
import { ImageLinks } from '@/lib/imageLinks'
import {
  IconClock,
  IconCloudUp,
  IconShieldCheckFilled,
  IconShieldLock,
} from '@/lib/icons'
import React, { useRef } from 'react'
import Image from 'next/image'
import { Grid } from '../ui/grid'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { Card } from '../ui/card'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

function Demo() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

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
    <div ref={ref} className='relative py-16 bg-dashboard px-8 overflow-hidden'>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className='text-center max-w-2xl mx-auto mb-12'
      >
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='text-3xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'
        >
          Book a Demo with us
        </motion.h2>
        <p className='text-primary text-sm md:text-base mt-6 relative inline-block'>
          <span className='absolute inset-x-0 top-1/2 transform -translate-y-1/2 border-b-2 border-primary w-full sm:w-[120%] md:w-[130%] lg:w-[150%] sm:left-[-15%] md:left-[-25%]'></span>
          <span className='relative z-10 bg-dashboard px-2'>
            How Demo Works
          </span>
        </p>
      </motion.div>

      <Grid
        data={steps}
        sort_by='priority'
        container_styles='[&]:gap-8 [&]:md:grid-cols-2 [&]:lg:grid-cols-4'
        item_styles='flex flex-col items-center'
        item_renderer={(item, index) => (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 * (index || 0) }}
            className='relative'
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -10 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className='flex flex-col items-center'
            >
              <div className='relative w-36 h-36 flex items-center justify-center mb-4'>
                <motion.div
                  className='absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full'
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <Image
                  src={item.image}
                  width={2000}
                  height={2000}
                  alt={`item-image-${item?.step}`}
                  className='relative w-32 h-28 z-10'
                />
              </div>
              <div className='absolute -top-2 -right-2 w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center font-bold shadow-lg'>
                {item.step}
              </div>
              <h3 className='text-lg font-semibold mb-3'>{item.title}</h3>
              <p className='text-sm text-gray-700 text-center'>
                {item.description}
              </p>
            </motion.div>
          </motion.div>
        )}
      />
    </div>
  )
}

function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

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
    <div ref={ref} className='py-16 px-8 md:py-24 bg-dashboard text-center overflow-hidden'>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className='text-center max-w-2xl mx-auto mb-12'
      >
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='text-3xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'
        >
          Features
        </motion.h2>
        <p className='text-primary text-sm md:text-base mt-6 relative inline-block'>
          <span className='absolute inset-x-0 top-1/2 transform -translate-y-1/2 border-b-2 border-primary w-full sm:w-[120%] md:w-[130%] lg:w-[150%] sm:left-[-15%] md:left-[-25%]'></span>
          <span className='relative z-10 bg-dashboard px-2'>
            What We Provide
          </span>
        </p>
      </motion.div>

      <Grid
        data={features}
        sort_by='priority'
        container_styles='[&]:gap-8 [&]:md:grid-cols-2 [&]:lg:grid-cols-3'
        item_styles='flex flex-col items-center h-full'
        item_renderer={(feature, index) => (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 * (index || 0) }}
            className='h-full'
          >
            <motion.div
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className='flex flex-col items-center text-center h-full p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow relative overflow-hidden group'
            >
              <motion.div
                className='absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300'
              />
              <motion.div
                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
                className='relative z-10'
              >
                <Image
                  src={feature?.image}
                  alt={feature?.title}
                  className='w-24 h-24 bg-cover mb-6 mx-auto'
                  width={96}
                  height={96}
                />
              </motion.div>
              <h3 className='font-semibold text-xl mb-4 relative z-10'>
                {feature?.title}
              </h3>
              <p className='text-gray-600 relative z-10 flex-grow'>
                {feature.description}
              </p>
            </motion.div>
          </motion.div>
        )}
      />
    </div>
  )
}

function TestimonialsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

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
    <div ref={ref} className='py-16 md:py-24 bg-popover text-center overflow-hidden'>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='text-3xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'
        >
          Testimonials
        </motion.h2>
        <p className='text-primary text-sm md:text-base mt-6 relative inline-block'>
          <span className='absolute inset-x-0 top-1/2 transform -translate-y-1/2 border-b-2 border-primary w-full sm:w-[120%] md:w-[130%] lg:w-[150%] sm:left-[-15%] md:left-[-20%]'></span>
          <span className='relative z-10 bg-popover px-2'>
            What people say about us
          </span>
        </p>
      </motion.div>

      <div className='overflow-x-auto mt-12 scrollbar-hidden'>
        <div className='flex space-x-6 md:space-x-8 flex-nowrap p-10 mr-10 md:justify-center'>
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 * idx }}
              whileHover={{ y: -10 }}
            >
              <Card className='w-80 min-w-[300px] flex-shrink-0 shadow-xl hover:shadow-2xl transition-shadow bg-white'>
                <div className='flex flex-col items-center text-center relative'>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Image
                      src={testimonial?.imageUrl}
                      alt={testimonial?.name}
                      className='w-24 h-24 rounded-full object-cover border-4 border-secondary shadow-lg'
                      width={96}
                      height={96}
                    />
                  </motion.div>
                  <h3 className='font-semibold text-lg mt-4'>
                    {testimonial?.name}
                  </h3>
                  <div className='flex gap-1 my-3'>
                    {[...Array(5)].map((_, i) => (
                      <motion.svg
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        className='w-5 h-5 fill-yellow-400'
                        viewBox='0 0 20 20'
                      >
                        <path d='M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z' />
                      </motion.svg>
                    ))}
                  </div>
                  <p className='text-sm text-muted-foreground mt-3 italic'>
                    &ldquo;{testimonial?.statement}&rdquo;
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Home() {
  const router = useRouter()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

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

  const stats = [
    { value: '10K+', label: 'Active Users' },
    { value: '99.9%', label: 'Uptime' },
    { value: '500K+', label: 'Records Managed' },
    { value: '24/7', label: 'Support' },
  ]

  return (
    <>
      <div
        ref={ref}
        className='min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50 px-5 md:px-16 relative overflow-hidden'
      >
        <motion.div
          className='absolute inset-0 opacity-30'
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                             radial-gradient(circle at 80% 80%, rgba(37, 99, 235, 0.1) 0%, transparent 50%)`,
          }}
        />

        <motion.div
          style={{ y, opacity }}
          className='flex h-full items-center justify-center md:justify-start pt-32 md:pt-44 md:max-w-[500px] lg:max-w-[900px] relative z-10'
        >
          <div className='flex items-center md:items-start flex-col w-full'>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className='md:hidden mb-10'
            >
              <Image
                src={ImageLinks?.temp?.mobile_landing}
                width={200}
                height={200}
                alt='mobile_landing_image'
                className='pointer-events-none select-none drop-shadow-2xl'
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className='inline-block mb-6'
            >
              <motion.span
                className='px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-semibold inline-flex items-center gap-2'
                whileHover={{ scale: 1.05 }}
              >
                <span className='w-2 h-2 bg-secondary rounded-full animate-pulse' />
                Trusted by 10,000+ Healthcare Professionals
              </motion.span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className='text-3xl text-center md:text-left md:text-4xl lg:text-7xl text-primary font-extrabold leading-tight'
            >
              Empowering Healthcare Through{' '}
              <span className='bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent'>
                Smarter Data Management
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className='text-lg text-center md:text-left text-gray-600 mt-6 max-w-2xl'
            >
              Say goodbye to data chaos. Our smart, secure platform puts you in
              control of patient care with precision and ease.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className='w-full'
            >
              <Card className='pointer-events-none select-none my-8 w-full shadow-2xl backdrop-blur-sm bg-white/90 border-2 border-secondary/20'>
                <div className='grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-x-0 lg:divide-y-0 divide-border'>
                  {support.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className='flex flex-col items-center gap-3 p-6 cursor-default'
                    >
                      <motion.div
                        className='text-secondary'
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        {item.icon}
                      </motion.div>
                      <span className='text-center text-sm font-medium'>
                        {item.title}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className='flex flex-col sm:flex-row gap-5 items-center mt-4 mb-16'
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant='secondary'
                  className='md:text-lg py-6 px-8 shadow-lg hover:shadow-xl transition-all'
                  onClick={() => router.push('/login')}
                >
                  Get Started
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant='ghost'
                  onClick={() => router.push('/book-a-demo')}
                  className='md:text-lg py-6 px-8'
                >
                  Book a Demo
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className='grid grid-cols-2 md:grid-cols-4 gap-6 w-full mb-16'
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  className='text-center'
                >
                  <motion.h3
                    className='text-3xl md:text-4xl font-bold text-secondary'
                    whileHover={{ scale: 1.1 }}
                  >
                    {stat.value}
                  </motion.h3>
                  <p className='text-sm text-gray-600 mt-2'>{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className='absolute bottom-0 right-0 hidden md:flex items-end justify-end'
        >
          <div className='relative flex justify-center items-center'>
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className='relative md:w-[380px] lg:w-[550px] rounded-full'
              style={{
                backgroundImage:
                  'radial-gradient(circle, rgba(59, 130, 246, 0.3), transparent 70%)',
              }}
            >
              <Image
                src={ImageLinks.temp.doc_landing}
                width={550}
                height={550}
                alt='doc_landing_image'
                className='pointer-events-none select-none md:w-[380px] lg:w-[550px] drop-shadow-2xl'
              />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {Features()}
      {TestimonialsSection()}
      {Demo()}
    </>
  )
}

export default Home

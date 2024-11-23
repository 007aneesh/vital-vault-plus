'use client'
import { imageLinks } from '@/lib/imageLinks'
import React from 'react'
import Image from 'next/image'
import { LampContainer } from '../ui/lamp'
import { motion } from 'framer-motion'
import { Grid } from '../ui/grid'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

function Demo() {
  const steps = [
    {
      step: 1,
      title: 'Fill the Details',
      description: 'Fill the details like Name, Email, Contact Number, etc.',
      image: imageLinks.demo.step1,
    },
    {
      step: 2,
      title: 'Login',
      description: 'Login with your given Demo Email Id and Password',
      image: imageLinks.demo.step2,
    },
    {
      step: 3,
      title: 'Understand the platform',
      description:
        'Follow the steps provided on the site to understand the platform',
      image: imageLinks.demo.step3,
    },
    {
      step: 4,
      title: 'Enjoy yourself',
      description:
        'Enjoy your time exploring the demo account and their features',
      image: imageLinks.demo.step4,
    },
  ]

  return (
    <div className='relative py-16 bg-popover px-8'>
      <div className='text-center max-w-2xl mx-auto mb-12'>
        <h2 className='text-4xl font-bold'>Book a Demo with us</h2>
        <p className='text-primary text-sm md:text-base mt-4 relative inline-block'>
          <span className='absolute inset-x-0 top-1/2 transform -translate-y-1/2 border-b-2 border-primary w-full sm:w-[120%] md:w-[130%] lg:w-[150%] sm:left-[-15%] md:left-[-25%]'></span>
          <span className='relative z-10 bg-popover px-2'>How Demo Works</span>
        </p>
      </div>

      <Grid
        data={steps}
        sort_by='priority'
        container_styles='gap-4'
        item_styles='flex flex-col items-center'
        item_renderer={(item) => (
          <>
            <div className='w-36 h-36 flex items-center justify-center'>
              <Image
                src={item.image}
                width={100}
                height={100}
                alt={`item-image-${item?.step}`}
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

// function Features() {
//     const features = [
//         {
//             title: "Centralized Data Storage",
//             description:
//                 "Unified repository for electronic health records, medical imaging, prescriptions, lab results, and more, accessible across various departments and facilities.",
//             image: imageLinks.features.centralizedDataStorage,
//         },
//         {
//             title: "Data Security and Compliance",
//             description:
//                 "Adheres to regulations such as HIPAA (Health Insurance Portability and Accountability Act) and GDPR (General Data Protection Regulation).",
//             image: imageLinks.features.dataSecurity,
//         },
//         {
//             title: "Interoperability",
//             description:
//                 "Integrates with various healthcare systems like EHR, laboratory management, and billing software. Facilitates seamless data exchange between healthcare providers.",
//             image: imageLinks.features.interoperability,
//         },
//         {
//             title: "Data Analytics and Insights",
//             description:
//                 "Provides tools for analyzing patient trends and operational efficiency. Helps optimize resource allocation, and improve overall healthcare delivery.",
//             image: imageLinks.features.dataInsights,
//         },
//         {
//             title: "Data Backup and Recovery",
//             description:
//                 "Ensures data integrity with regular backups. Offers disaster recovery mechanisms to prevent data loss during emergencies.",
//             image: imageLinks.features.dataBackup,
//         },
//         {
//             title: "Patient Data Access",
//             description:
//                 "Enables real-time access to accurate patient data, leading to better diagnosis and treatment decisions. Supports functionalities like test result viewing.",
//             image: imageLinks.features.patientDataAccess,
//         },
//     ];

//     return (
//         <div className="py-10 px-8 md:py-20 bg-dashboard-background text-center">
//             <h2 className="text-2xl md:text-3xl font-semibold">Features</h2>
//             <p className="text-primary text-sm md:text-base mt-4 relative inline-block">
//                 <span className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 border-b-2 border-primary w-full sm:w-[120%] md:w-[130%] lg:w-[150%] sm:left-[-15%] md:left-[-20%]"></span>
//                 <span className="relative z-10 bg-dashboard-background px-2">What We Provide</span>
//             </p>
//             <div className="flex flex-wrap justify-center gap-8 mt-8 mx-2 md:mx-4 w-full">
//                 {features.map((feature, index) => (
//                     <Card
//                         key={index}
//                         className="flex w-full md:w-80 p-6 bg-popover rounded-lg shadow-md hover:shadow-lg transition flex-col h-full"
//                     >
//                         <div className="flex flex-col items-center text-center flex-grow">
//                             <Image
//                                 src={feature.image}
//                                 alt={feature.title}
//                                 className="w-24 h-24 bg-cover mb-4 mx-auto"
//                             />
//                             <h3 className="font-semibold text-xl mb-2">{feature.title}</h3>
//                             <p className="text-gray-600">{feature.description}</p>
//                         </div>
//                     </Card>
//                 ))}
//             </div>
//         </div>
//     );
// };

// function TestimonialsSection() {
//     const testimonials = [
//         { name: '', statement: '', imageUrl: '' },
//         { name: '', statement: '', imageUrl: '' },
//         { name: '', statement: '', imageUrl: '' },
//     ];

//     return (
//         <div className="py-10 md:py-20 bg-popover text-center">
//             <h2 className="heading text-2xl md:text-3xl">Testimonials</h2>
//             <p className="text-primary text-sm md:text-base mt-4 relative inline-block">
//                 <span className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 border-b-2 border-primary w-full sm:w-[120%] md:w-[130%] lg:w-[150%] sm:left-[-15%] md:left-[-20%]"></span>
//                 <span className="relative z-10 bg-popover px-2">What people say about us</span>
//             </p>
//             <div className="overflow-x-auto mt-8 scrollbar-hidden">
//                 <div className="flex space-x-6 md:space-x-8 flex-nowrap p-10">
//                     {testimonials.map((testimonial, idx) => (
//                         <Card key={idx} className="w-80 min-w-[300px] flex-shrink-0">
//                             <div className="flex flex-col items-center text-center">
//                                 <Image
//                                     src={testimonial?.imageUrl}
//                                     alt={testimonial?.name}
//                                     className="w-20 h-20 rounded-full mb-4 border-4 border-secondary object-cover"
//                                 />
//                                 <h3 className="font-semibold text-lg mt-1">{testimonial?.name}</h3>
//                                 <p className="text-sm text-muted-foreground mt-3">{testimonial?.statement}</p>
//                             </div>
//                         </Card>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }

function Home() {
  const router = useRouter()
  return (
    <>
      <LampContainer>
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut',
          }}
          className='mt-8 bg-gradient-to-b from-white flex flex-col items-center to-slate-300 py-4 bg-clip-text text-center text-2xl font-medium tracking-tight text-transparent md:text-4xl'
        >
          <div className='flex items-center flex-col'>
            Empowering Healthcare Through Smarter Data Management <br />
            <p className='max-w-screen-md text-xl text-gray-400'>
              Say goodbye to data chaos. Our smart, secure platform puts you in
              control of patient care with precision and ease.
            </p>
            <Button
              variant='secondary'
              className='mt-10'
              onClick={() => router.push('/register')}
            >
              Get Started!
            </Button>
          </div>
        </motion.h1>
      </LampContainer>

      {/* {Features()} */}
      {/* {TestimonialsSection()} */}
      {Demo()}
    </>
  )
}

export default Home

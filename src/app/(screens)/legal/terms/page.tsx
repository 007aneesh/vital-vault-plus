'use client'
import Footer from '@/components/ui/footer'
import Navbar from '@/components/ui/navbar'

type NavItem = {
  text: string
  link: string
}

export default function Page() {
  const navItems: NavItem[] = [
    { text: 'Home', link: '/' },
    { text: 'About Us', link: '/about-us' },
  ]

  const sections = [
    {
      title: 'Healthcare Data Management Terms',
      subtitle: 'Service Agreement',
      content:
        'By accessing Vital Vault, you acknowledge and agree to these terms governing the use of our healthcare data management platform. These terms ensure compliance with healthcare regulations and protect patient data integrity.',
    },
    {
      title: 'Data Privacy & Security',
      subtitle: 'Your Information Security',
      content:
        'We implement industry-standard security measures to protect your healthcare data. All information is encrypted, and access is strictly controlled in compliance with HIPAA and other relevant healthcare regulations.',
    },
    {
      title: 'User Responsibilities',
      subtitle: 'Account Management',
      content:
        'Users are responsible for maintaining the confidentiality of their login credentials, ensuring accurate data entry, and promptly reporting any unauthorized access or security concerns.',
    },
    {
      title: 'Service Availability',
      subtitle: 'System Access',
      content:
        'While we strive for 24/7 availability, we may occasionally perform maintenance or updates. We reserve the right to modify, suspend, or discontinue any part of the service with reasonable notice.',
    },
    {
      title: 'Liability & Disclaimers',
      subtitle: 'Legal Protection',
      content:
        'Vital Vault provides this service "as is" without warranties. We are not liable for any direct, indirect, or consequential damages arising from system use or data interpretation.',
    },
  ]

  return (
    <>
      <Navbar navItems={navItems} />
      <div className='mb-10'>
        <div className='text-center pt-24 pb-12 bg-dashboard'>
          <h1 className='text-4xl font-bold text-primary'>Terms of service</h1>
          <p className='text-primary text-sm md:text-base mt-4 relative inline-block'>
            <span className='absolute inset-x-0 top-1/2 transform -translate-y-1/2 border-b-2 border-primary w-full sm:w-[120%] md:w-[130%] lg:w-[150%] sm:left-[-15%] md:left-[-20%]'></span>
            <span className='relative z-10 bg-dashboard px-2'>Who We Are</span>
          </p>
        </div>

        {sections.map((section, index) => (
          <div
            key={index}
            className={`flex flex-col lg:flex-row items-center justify-center p-8 lg:px-28 gap-y-4 ${index % 2 !== 0 ? 'bg-dashboard' : ''} `}
          >
            <div className='flex flex-col items-center justify-center w-full lg:w-1/2 text-center space-y-4 mb-12'>
              <h2 className='text-base text-primary sm:text-lg'>
                {section?.subtitle}
              </h2>
              <h1 className='font-bold lg:text-2xl pt-1 pb-2 md:pb-3 text-lg md:text-xl'>
                {section?.title}
              </h1>
              <p className='max-w-md md:max-w-2xl text-sm md:text-base font-medium text-center'>
                {section?.content}
              </p>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  )
}

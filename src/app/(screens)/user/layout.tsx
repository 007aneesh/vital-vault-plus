/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState } from 'react'
import ProtectedUserRoute from '@/components/protected/protected-user'
import { Sidebar, SidebarBody, SidebarLink } from '@/components/ui/sidebar'
import {
  IconArrowLeft,
  IconBrandTabler,
  IconUserFilled,
  IconCalendarClock,
  IconReportMedical,
  IconPillFilled,
  IconBrandVisa,
  IconReport,
  IconAmbulance,
  IconHelp,
  IconSettings,
} from '@/lib/icons'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import LogoImg from '@/app/favicon.ico'

export default function Layout({ children }: { children: React.ReactNode }) {
  const links = [
    {
      label: 'Dashboard',
      href: '/user',
      icon: (
        <IconBrandTabler className='text-neutral-200 h-5 w-5 flex-shrink-0' />
      ),
    },
    {
      label: 'My Profile',
      href: '/user/profile',
      icon: (
        <IconUserFilled className='text-neutral-200 h-5 w-5 flex-shrink-0' />
      ),
    },
    {
      label: 'My Appointments',
      href: '/user/appointments',
      icon: (
        <IconCalendarClock className='text-neutral-200 h-5 w-5 flex-shrink-0' />
      ),
    },
    {
      label: 'My Medical History',
      href: '/user/medical-history',
      icon: <IconReport className='text-neutral-200 h-5 w-5 flex-shrink-0' />,
    },
    {
      label: 'Prescriptions',
      href: '/user/prescriptions',
      icon: (
        <IconPillFilled className='text-neutral-200 h-5 w-5 flex-shrink-0' />
      ),
    },
    {
      label: 'Reports and Diagnostics',
      href: '/user/reports',
      icon: (
        <IconReportMedical className='text-neutral-200 h-5 w-5 flex-shrink-0' />
      ),
    },
    {
      label: 'Billing & Payments',
      href: '/user/payment-history',
      icon: (
        <IconBrandVisa className='text-neutral-200 h-5 w-5 flex-shrink-0' />
      ),
    },
    {
      label: 'Health Insurance',
      href: '/user/health-insurance',
      icon: (
        <IconAmbulance className='text-neutral-200 h-5 w-5 flex-shrink-0' />
      ),
    },
    {
      label: 'Support & Help',
      href: '/user/help',
      icon: <IconHelp className='text-neutral-200 h-5 w-5 flex-shrink-0' />,
    },
    {
      label: 'Settings',
      href: '/user/settings',
      icon: <IconSettings className='text-neutral-200 h-5 w-5 flex-shrink-0' />,
    },
    {
      label: 'Logout',
      href: '/logout',
      icon: (
        <IconArrowLeft className='text-neutral-200 h-5 w-5 flex-shrink-0' />
      ),
    },
  ]

  const [open, setOpen] = useState(false)

  return (
    <ProtectedUserRoute>
      <div
        className={cn(
          'flex flex-col md:flex-row w-full mx-auto overflow-hidden',
          'h-screen',
        )}
      >
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className='justify-between gap-10 black-gradient'>
            <div className='flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
              {open ? <Logo /> : <LogoIcon />}
              <div className='mt-8 flex flex-col gap-2'>
                {links.map((link, idx) => (
                  <SidebarLink key={idx} link={link} />
                ))}
              </div>
            </div>
            <div>
              <SidebarLink
                link={{
                  label: 'Vital Vault',
                  href: '/',
                  icon: (
                    <Image
                      src={LogoImg}
                      className='h-7 w-7 flex-shrink-0 rounded-full'
                      width={50}
                      height={50}
                      alt='Avatar'
                    />
                  ),
                }}
              />
            </div>
          </SidebarBody>
        </Sidebar>
        <div className='flex-1 overflow-y-auto scrollbar-hidden bg-dashboard px-6 py-8'>
          {children}
        </div>
      </div>
    </ProtectedUserRoute>
  )
}

export const Logo = (data?: any) => {
  const { name, logo } = data
  return (
    <Link
      href='/user'
      className='font-normal flex space-x-2 items-center text-sm text-white py-1 relative z-20'
    >
      <Image src={logo} alt='' className='h-6 w-6 rounded-sm ' />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className='font-medium text-white whitespace-pre'
      >
        {name ? name : 'User'}
      </motion.span>
    </Link>
  )
}

export const LogoIcon = (data?: any) => {
  const { logo } = data
  return (
    <Link
      href='/user'
      className='font-normal flex space-x-2 items-center text-sm text-white py-1 relative z-20'
    >
      <Image src={logo} alt='' className='h-6 w-6 rounded-sm' />
    </Link>
  )
}

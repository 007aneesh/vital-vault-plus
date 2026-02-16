/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState, useEffect } from 'react'
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
import { useRouter, usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import LogoImg from '@/app/favicon.ico'
import { useAuthStore } from '@/store/authStore'
import { isAdmin, isEmployee } from '@/lib/auth'

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = useAuthStore((s) => s.user)
  const router = useRouter()
  const pathname = usePathname()

  // Redirect admin/employee to /admin
  useEffect(() => {
    if (user && (isAdmin(user) || isEmployee(user))) {
      router.replace('/admin')
    }
  }, [user, router])

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
    <div
      className={cn(
        'flex flex-col md:flex-row w-full mx-auto overflow-hidden',
        'h-screen'
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className='justify-between gap-10 black-gradient'>
          <div className='flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
            {open ? <Logo logo={LogoImg} /> : <LogoIcon logo={LogoImg} />}
            <div className='mt-8 flex flex-col gap-2'>
              {links.map((link, idx) => (
                <SidebarLink
                  key={idx}
                  link={link}
                  active={
                    pathname === link.href ||
                    (link.href !== '/user' && pathname?.startsWith(link.href))
                  }
                />
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

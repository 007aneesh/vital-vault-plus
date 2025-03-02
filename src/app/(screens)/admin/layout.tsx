/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState } from 'react'
import ProtectedAdminRoute from '@/components/protected/protected-admin'
import { Sidebar, SidebarBody, SidebarLink } from '@/components/ui/sidebar'
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from '@/lib/icons'
import { Logo, LogoIcon } from '@/components/ui/logo'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import LogoImg from '@/app/favicon.ico'

export default function Layout({ children }: { children: React.ReactNode }) {
  const is_admin = true

  const baseLinks = [
    {
      label: 'Dashboard',
      href: '/admin',
      icon: (
        <IconBrandTabler className='text-neutral-200 h-5 w-5 flex-shrink-0' />
      ),
    },
    {
      label: 'Patient List',
      href: '/admin/patient-list',
      icon: <IconUserBolt className='text-neutral-200 h-5 w-5 flex-shrink-0' />,
    },
  ]

  const adminLinks = [
    {
      label: 'Employee Access',
      href: '/admin/employee',
      icon: <IconUserBolt className='text-neutral-200 h-5 w-5 flex-shrink-0' />,
    },
    {
      label: 'Settings',
      href: '/admin/settings',
      icon: <IconSettings className='text-neutral-200 h-5 w-5 flex-shrink-0' />,
    },
  ]

  const logoutLink = [
    {
      label: 'Logout',
      href: '/logout',
      icon: (
        <IconArrowLeft className='text-neutral-200 h-5 w-5 flex-shrink-0' />
      ),
    },
  ]

  const links = is_admin
    ? [...baseLinks, ...adminLinks, ...logoutLink]
    : [...baseLinks, ...logoutLink]

  const [open, setOpen] = useState(false)

  return (
    <ProtectedAdminRoute>
      <div
        className={cn(
          'flex flex-col md:flex-row w-full mx-auto overflow-hidden',
          'h-screen',
        )}
      >
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className='justify-between gap-10 black-gradient'>
            <div className='flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
              {open ? (
                <Logo is_admin={is_admin} logo={LogoImg.src} />
              ) : (
                <LogoIcon logo={LogoImg.src} />
              )}
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
                  href: '/admin',
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
    </ProtectedAdminRoute>
  )
}

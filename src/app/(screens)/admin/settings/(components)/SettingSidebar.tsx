/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const settingsTabs = [
  { id: 'general', label: 'General', path: '/admin/settings' },
  { id: 'password', label: 'Password', path: '/admin/settings/change-password' },
  { id: 'exchange', label: 'Import / Export', path: '/admin/settings/exchange' },
  {
    id: 'access-management',
    label: 'Access Management',
    path: '/admin/settings/access-management',
  },
  {
    id: 'setting_configuration',
    label: 'Setting Configuration',
    path: '/admin/settings/setting-configuration',
  },
  {
    id: 'role_management',
    label: 'Role Management',
    path: '/admin/settings/role-management',
  },
]

export default function SettingsSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div>
      <div className='block lg:hidden'>
        <Accordion type='single' collapsible>
          <AccordionItem value='settings-menu'>
            <AccordionTrigger className='p-3 bg-gray-200 rounded-md'>
              Open Settings
            </AccordionTrigger>
            <AccordionContent>
              <div className='mt-2 border-t flex flex-col space-y-2 pt-2'>
                {settingsTabs.map((tab) => (
                  <Link
                    key={tab.id}
                    href={tab.path}
                    onClick={() => setIsOpen(false)}
                  >
                    <Button
                      variant='ghost'
                      className={`w-full justify-start ${pathname === tab.path ? 'bg-secondary text-white' : ''}`}
                    >
                      {tab.label}
                    </Button>
                  </Link>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <nav className='hidden lg:block space-y-2'>
        {settingsTabs.map((tab) => (
          <Link key={tab.id} href={tab.path}>
            <button
              className={`block w-full p-3 text-left rounded ${
                pathname === tab.path ? 'bg-gray-200' : 'hover:bg-muted'
              }`}
            >
              {tab.label}
            </button>
          </Link>
        ))}
      </nav>
    </div>
  )
}

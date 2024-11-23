'use client'

import { useState } from 'react'
import SettingsSidebar from '@/components/sections/settings/SettingSidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState('general')
  return (
    <section className='flex flex-col md:flex-row'>
      <aside className='w-full h-full md:w-1/4 bg-popover p-4 border-r rounded-lg'>
        <SettingsSidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          content={children}
        />
      </aside>

      <main className='flex-1 pl-6 hidden md:block'>{children}</main>
    </section>
  )
}

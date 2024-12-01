'use client'

import SettingsSidebar from '@/components/sections/settings/SettingSidebar'
import { TabProvider } from './context'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <TabProvider>
      <section className='flex flex-col md:flex-row'>
        <aside className='w-full h-full md:w-1/4 bg-popover p-4 border-r rounded-lg'>
          <SettingsSidebar content={children} />
        </aside>

        <main className='flex-1 p-4 hidden md:block bg-popover ml-4 rounded-md'>
          {children}
        </main>
      </section>
    </TabProvider>
  )
}

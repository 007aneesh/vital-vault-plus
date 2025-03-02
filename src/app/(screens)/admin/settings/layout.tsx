'use client'

import SettingsSidebar from '@/app/(screens)/admin/settings/(components)/SettingSidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
      <section className='flex flex-col lg:flex-row'>
        <aside className='w-full h-full lg:w-1/4 bg-popover p-4 border-r rounded-lg'>
          <SettingsSidebar />
        </aside>

        <main className='flex-1 p-4 block bg-popover lg:ml-4 mt-4 lg:mt-0 rounded-md'>
          {children}
        </main>
      </section>
  )
}

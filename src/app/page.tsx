import React, { ReactNode } from 'react'
import Home from '@/components/sections/home'

import Navbar from '@/components/ui/navbar'
import { IconHome, IconUser, IconInfoCircleFilled } from '@tabler/icons-react'

import Footer from '@/components/ui/footer'

type NavItem = {
  text: string
  link: string
  icon?: ReactNode
}

const navItems: NavItem[] = [
  { text: 'Home', link: '/', icon: <IconHome /> },
  { text: 'About', link: '/about-us', icon: <IconInfoCircleFilled /> },
  { text: 'Blogs', link: '/blogs', icon: <IconUser /> },
]

export default function Page() {
  return (
    <div className='bg-sky-50 min-h-screen'>
      <Navbar navItems={navItems} />
      <Home />
      <Footer />
    </div>
  )
}

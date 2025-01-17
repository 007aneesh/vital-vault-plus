import Home from '@/components/sections/home'

import Navbar from '@/components/ui/navbar'

import Footer from '@/components/ui/footer'

type NavItem = {
  text: string
  link: string
}

const navItems: NavItem[] = [
  { text: 'Home', link: '/' },
  { text: 'About Us', link: '/about-us' },
  { text: 'Contact Us', link: '/contact-us' },
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

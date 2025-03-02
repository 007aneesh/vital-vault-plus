'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { IconMenu2, IconX } from '@tabler/icons-react'
import _ from 'lodash'
import { Button } from './button'
import Image from 'next/image'
import { ImageLinks } from '@/lib/imageLinks'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'

type NavItem = {
  text: string
  link: string
}

type NavbarProps = {
  navItems: NavItem[]
  style?: string
}

const Navbar = ({ navItems, style }: NavbarProps) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const toggleDrawer = () => setIsOpen((prev) => !prev)

  return (
    <>
      <nav
        className={clsx(`fixed top-0 left-0 w-full z-20 p-4 md:px-16 flex items-center justify-between md:justify-start ${
          isScrolled ? 'bg-white/70 backdrop-blur-md shadow-md' : ''
        }`, style)}
      >
        <div className='font-bold text-xl md:flex-shrink-0 min-w-44 justify-start'>
          <Link href='/' className='flex items-center gap-1'>
            <Image
              src={ImageLinks?.black_logo}
              alt='logo'
              height={500}
              width={500}
              className='w-16 h-8'
            />
            Vital Vault
          </Link>
        </div>

        <div className='hidden md:flex md:flex-grow md:justify-center'>
          <ul className='flex space-x-8 items-center justify-center'>
            {_.map(navItems, (item) => (
              <li key={item.link}>
                <Link href={item.link} className='text-lg  hover:underline'>
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className='hidden md:flex gap-4 min-w-44 justify-end'>
          <Button variant='secondary' onClick={() => {
            router.push('/book-a-demo')
          }}>
            Book a Demo
          </Button>
        </div>

        <div className='md:hidden'>
          <Button onClick={toggleDrawer} variant={'link'} className=''>
            <IconMenu2 size={28} />
          </Button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100%', opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className='fixed inset-0 z-30 black-gradient dark:bg-neutral-900 text-white p-6 flex flex-col md:hidden'
          >
            <div className='flex flex-col justify-between h-full'>
              <div>
                <div className='flex w-full justify-between items-center mb-10 '>
                  <Link href='/'>Vital Vault</Link>
                  <Button
                    onClick={toggleDrawer}
                    variant={'link'}
                    className='text-neutral-200'
                  >
                    <IconX size={28} />
                  </Button>
                </div>
                <ul className='space-y-4'>
                  {_.map(navItems, (item) => (
                    <li key={item.link}>
                      <Link
                        href={item.link}
                        className='text-lg text-neutral-200 hover:text-blue-500'
                        onClick={toggleDrawer}
                      >
                        {item.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className='text-gray-300 text-sm break-words'>
                  © Powered By VitalCare Private Ltd.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar

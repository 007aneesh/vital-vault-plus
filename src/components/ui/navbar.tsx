'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { IconMenu2, IconX } from '@tabler/icons-react'
import _ from 'lodash'
import { Button } from './button'
import { useRouter } from 'next/navigation'

type NavItem = {
  text: string
  link: string
}

type NavbarProps = {
  navItems: NavItem[]
}

const Navbar = ({ navItems }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const toggleDrawer = () => setIsOpen((prev) => !prev)

  return (
    <>
      <nav className='fixed bg-black text-white shadow-lg top-0 left-0 w-full z-20 bg-black-gradient p-4 md:px-16 flex items-center justify-between md:justify-start'>
        <div className='font-bold text-xl md:flex-shrink-0'>
          <Link href='/'>Vital Vault</Link>
        </div>

        <div className='hidden md:flex md:flex-grow md:justify-center'>
          <ul className='flex space-x-8 items-center justify-center'>
            {_.map(navItems, (item) => (
              <li key={item.link}>
                <Link href={item.link} className='text-lg  hover:text-blue-500'>
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className='hidden md:flex '>
          <Button variant='secondary' onClick={() => router.push('/login')}>
            Login
          </Button>
        </div>

        <div className='md:hidden'>
          <Button
            onClick={toggleDrawer}
            variant={'link'}
            className='text-white'
          >
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar

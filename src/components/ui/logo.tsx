import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'

export const Logo = ({
  is_admin,
  name,
  logo,
}: {
  is_admin: boolean
  name?: string
  logo: string
}) => {
  return (
    <Link
      href='/admin'
      className='font-normal flex space-x-2 items-center text-sm text-white py-1 relative z-20'
    >
      <Image
        src={logo}
        alt='Company logo'
        className='h-6 w-6 rounded-sm'
        width={6}
        height={6}
      />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className='font-medium text-white whitespace-pre'
      >
        {name ? name : 'PGI Chandigarh'} | {is_admin ? 'Admin' : 'Employee'}
      </motion.span>
    </Link>
  )
}

export const LogoIcon = ({ logo }: { logo: string }) => {
  return (
    <Link
      href='/admin'
      className='font-normal flex space-x-2 items-center text-sm text-white py-1 relative z-20'
    >
      <Image
        src={logo}
        alt='Vital Vault logo'
        className='h-6 w-6 rounded-sm'
        width={6}
        height={6}
      />
    </Link>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

export default function ClientLoader() {
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    setLoading(true) // Show loader on navigation
    const timer = setTimeout(() => setLoading(false), 1500) // Show for 1.5s
    return () => clearTimeout(timer)
  }, [pathname]) // Runs when route changes

  if (!loading) return null // Hide when done

  return (
    <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-white z-50'>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className='w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full'
      />
    </div>
  )
}

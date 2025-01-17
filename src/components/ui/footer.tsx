import { footer_section } from '@/data/FooterConfig'
import { ImageLinks } from '@/lib/imageLinks'
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconX,
  IconBrandGithub,
  IconBrandYoutubeFilled,
} from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className='bg-gray-900 text-white pt-5 pb-10'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='w-full h-full flex flex-col lg:flex-row justify-between'>
          <div>
            <Image
              src={ImageLinks?.white_logo}
              alt='logo'
              width={100}
              height={100}
              className='mb-5 md:mb-0'
            />
          </div>
          <div className='grid grid-cols-2 sm:grid-cols-3 gap-8 mb-10 flex-[0.8] items-start'>
            {footer_section?.map((section, index) => (
              <div key={index}>
                <h3 className='popover font-semibold mb-4 text-base sm:text-lg lg:text-xl'>
                  {section?.title}
                </h3>
                <ul className='space-y-2'>
                  {section?.links.map((link, i) => (
                    <li key={i}>
                      <Link
                        href={link?.href}
                        className='text-gray-400 hover:text-gray-200 text-sm sm:text-base'
                      >
                        {link?.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className='border-t border-gray-700 pt-8 flex flex-col sm:flex-row items-center justify-between'>
          <p className='text-secondary-grey hidden md:flex text-sm text-center sm:text-left mt-6 sm:mb-0 max-w-full sm:max-w-md lg:max-w-lg break-words'>
            © Powered By VitalCare Private Ltd. All rights reserved.
          </p>
          <div className='flex space-x-6'>
            <a href='#' className='text-gray-500 hover:text-gray-400'>
              <IconBrandFacebook />
            </a>
            <a href='#' className='text-gray-500 hover:text-gray-400'>
              <IconBrandInstagram />
            </a>
            <a href='#' className='text-gray-500 hover:text-gray-400'>
              <IconX />
            </a>
            <a href='#' className='text-gray-500 hover:text-gray-400'>
              <IconBrandGithub />
            </a>
            <a href='#' className='text-gray-500 hover:text-gray-400'>
              <IconBrandYoutubeFilled />
            </a>
          </div>
        </div>

        <div className='mt-8 flex flex-col sm:flex-row items-center justify-between'>
          <p className='text-gray-400 text-sm text-center sm:text-left mb-4 sm:mb-0 max-w-full sm:max-w-md lg:max-w-lg break-words'>
            Subscribe to our newsletter
          </p>
          <form className='flex flex-col sm:flex-row sm:space-x-2 w-full sm:w-auto'>
            <input
              type='email'
              placeholder='Enter your email'
              className='w-full sm:w-auto px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none text-gray-200 mb-4 sm:mb-0 text-sm sm:text-base'
            />
            <button
              type='submit'
              className='px-6 py-2 bg-secondary hover:bg-primary text-white rounded-md w-full sm:w-auto text-sm sm:text-base transition duration-150'
            >
              Subscribe
            </button>
          </form>
        </div>
        <div className='md:hidden'>
          <p className='text-gray-500 text-sm text-center sm:text-left mt-6 sm:mb-0 max-w-full sm:max-w-md lg:max-w-lg break-words'>
            © Powered By VitalCare Private Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

import type { Metadata } from 'next'
import { Roboto_Mono } from 'next/font/google'
import './globals.css'
import Toast from '@/components/ui/toast'
import { SWRConfigProvider } from '@/components/providers/SWRConfigProvider'

const robotoMono = Roboto_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Vital Vault',

  description:
    "Vital Vault, where healthcare data management meets innovation. Vital Vault is more than just a healthcare data system; it's a solution designed to streamline the complexities of healthcare data, making it secure, accessible, and efficient.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${robotoMono.className} font-sans antialiased`}>
        <SWRConfigProvider>
          <Toast />
          {children}
        </SWRConfigProvider>
      </body>
    </html>
  )
}

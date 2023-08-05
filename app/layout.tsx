import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Modal from '@/Components/Modal';


export const metadata: Metadata = {
  title: 'My Productivity App',
  description: 'Developed by Keshav & Mallika',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='bg-[#F5F5F8]'>
        {children}
        <Modal />
      </body>
    </html>
  )
}

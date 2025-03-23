import '@/styles/globals.css';
import {Metadata, Viewport} from 'next';
import clsx from 'clsx';
import {Kanit} from 'next/font/google';
import {Toaster} from 'react-hot-toast';

import {Providers} from './providers';

import {siteConfig} from '@/config/site';
import {fontSans} from '@/config/fonts';
import {Navbar} from '@/components/navbar';

export const metadata: Metadata = {
  // manifest: '/manifest.json',
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: [
    {media: '(prefers-color-scheme: light)', color: 'white'},
    {media: '(prefers-color-scheme: dark)', color: 'black'},
  ],
};

export const kanit = Kanit({
  weight: ['200', '300'],
  style: ['normal', 'italic'],
  subsets: ['thai'],
  display: 'swap',
});

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html
      suppressHydrationWarning
      lang='en'>
      <head />
      <body className={clsx('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
        <Providers themeProps={{attribute: 'class', defaultTheme: 'dark'}}>
          <Toaster
            position='top-center'
            containerClassName={clsx(kanit.className)}
          />
          <div className='relative flex flex-col h-screen'>
            <Navbar />
            <main className={clsx(kanit.className, 'container mx-auto max-w-7xl p-6 flex-grow')}>{children}</main>
            <footer className='w-full flex items-center justify-center py-3'>
              <span className='text-xs text-default-600 pr-2'>Copyright © 2025</span>
              <p className='text-xs text-cyan-700'>DevGotGun all rights reserved</p>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}

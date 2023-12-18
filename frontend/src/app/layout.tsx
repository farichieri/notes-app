import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';
import { CustomProvider } from '@/components/CustomProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ensolvers Challenge',
  description: 'By Fabricio Richieri',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <CustomProvider>{children}</CustomProvider>
      </body>
    </html>
  );
}

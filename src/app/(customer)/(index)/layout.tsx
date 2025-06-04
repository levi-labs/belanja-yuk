import React from 'react';
import { Poppins } from 'next/font/google';
const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin-ext'],
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <body className={poppins.className}>{children}</body>;
}

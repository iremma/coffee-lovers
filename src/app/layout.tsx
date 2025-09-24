import '../styles/globals.css';
import { Montserrat, Open_Sans } from 'next/font/google';
import type { Metadata } from 'next';

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-open-sans',
});

export const metadata: Metadata = {
  title: 'Coffee Lovers Meet Up!',
  description: 'Join us for a day of coffee tastings, yoga classes, bakery treats, and live music at Bermondsey Street.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${openSans.variable}`}>
      <body className="font-sans bg-cream">
        {children}
      </body>
    </html>
  );
}